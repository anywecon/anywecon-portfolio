// Server-side only: called from app/page.tsx during build / ISR revalidation.
import { ossRepos, repoKey, type OssRepo, type RepoStatsMap } from "./oss";

const REVALIDATE_SECONDS = 60 * 60 * 6;
const TIMEOUT_MS = 5000;

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const toStars = (v: unknown): number =>
  typeof v === "number" && Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0;

const toDate = (v: unknown): string | null =>
  typeof v === "string" && !Number.isNaN(Date.parse(v)) ? v : null;

async function getJson(url: string, headers: Record<string, string>): Promise<unknown> {
  const res = await fetch(url, {
    headers,
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

/** One request per GitHub owner: the public repo list covers every allowlisted repo. */
async function fetchGitHub(owner: string, repos: OssRepo[]): Promise<RepoStatsMap> {
  const data = await getJson(
    `https://api.github.com/users/${encodeURIComponent(owner)}/repos?per_page=100&type=owner`,
    {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "anywecon-portfolio",
    },
  );
  if (!Array.isArray(data)) throw new Error("GitHub: unexpected response shape");

  const wanted = new Set(repos.map((r) => r.repo.toLowerCase()));
  const out: RepoStatsMap = {};
  for (const item of data) {
    if (!isRecord(item) || item.private === true || typeof item.name !== "string") continue;
    if (!wanted.has(item.name.toLowerCase())) continue;
    out[repoKey({ host: "github", owner, repo: item.name })] = {
      stars: toStars(item.stargazers_count),
      pushedAt: toDate(item.pushed_at),
    };
  }
  return out;
}

async function fetchGitLab(repo: OssRepo): Promise<RepoStatsMap> {
  const id = encodeURIComponent(`${repo.owner}/${repo.repo}`);
  const data = await getJson(`https://gitlab.com/api/v4/projects/${id}`, {
    Accept: "application/json",
  });
  if (!isRecord(data) || data.visibility !== "public") return {};
  return {
    [repoKey(repo)]: {
      stars: toStars(data.star_count),
      pushedAt: toDate(data.last_activity_at),
    },
  };
}

/**
 * Fetches live stats for the allowlisted repos. Never throws: a failed host
 * just yields no stats, and the UI falls back to the curated metadata.
 */
export async function fetchRepoStats(): Promise<RepoStatsMap> {
  const githubByOwner = new Map<string, OssRepo[]>();
  const tasks: Promise<RepoStatsMap>[] = [];

  for (const r of ossRepos) {
    if (r.host === "github") {
      const list = githubByOwner.get(r.owner) ?? [];
      list.push(r);
      githubByOwner.set(r.owner, list);
    } else {
      tasks.push(fetchGitLab(r));
    }
  }
  for (const [owner, repos] of githubByOwner) tasks.push(fetchGitHub(owner, repos));

  const results = await Promise.allSettled(tasks);
  const stats: RepoStatsMap = {};
  for (const res of results) {
    if (res.status === "fulfilled") Object.assign(stats, res.value);
    else console.warn("[repoStats] fetch failed:", res.reason);
  }
  return stats;
}

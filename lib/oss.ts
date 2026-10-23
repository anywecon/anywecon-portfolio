import type { Locale } from "./projects";

export type RepoHost = "github" | "gitlab";

export interface CodeProfile {
  host: RepoHost;
  label: string;
  handle: string;
  url: string;
}

export interface OssRepo {
  host: RepoHost;
  /** Owner/namespace on the host, e.g. "Fiouri" or "anywecon". */
  owner: string;
  /** Repository path on the host. */
  repo: string;
  name: string;
  tagline: Record<Locale, string>;
  language: string;
  license: string;
  topics: string[];
  homepage?: string;
}

/** Live stats fetched from the host API; absent when the fetch fails. */
export interface RepoStats {
  stars: number;
  pushedAt: string | null;
}

export type RepoStatsMap = Record<string, RepoStats>;

export const repoKey = (r: Pick<OssRepo, "host" | "owner" | "repo">): string =>
  `${r.host}:${r.owner}/${r.repo}`.toLowerCase();

export const repoUrl = (r: Pick<OssRepo, "host" | "owner" | "repo">): string =>
  r.host === "github"
    ? `https://github.com/${r.owner}/${r.repo}`
    : `https://gitlab.com/${r.owner}/${r.repo}`;

export const profiles: CodeProfile[] = [
  { host: "github", label: "GitHub", handle: "Fiouri", url: "https://github.com/Fiouri" },
  { host: "gitlab", label: "GitLab", handle: "anywecon", url: "https://gitlab.com/anywecon" },
];

/**
 * Curated allowlist. Only repos listed here are shown — never auto-list
 * an account, so a repo that is not meant to be featured can't leak in.
 */
export const ossRepos: OssRepo[] = [
  {
    host: "github",
    owner: "Fiouri",
    repo: "selis",
    name: "Selis",
    tagline: {
      el: "Δωρεάν open-source PDF editor για το κινητό: ανάγνωση, σχόλια, υπογραφή, σάρωση, OCR και αποστολή από συσκευή σε συσκευή. Χωρίς λογαριασμό, cloud ή tracking.",
      en: "Free, open-source PDF editor for your phone: read, annotate, sign, scan, OCR and send device to device. No account, no cloud, no tracking.",
    },
    language: "TypeScript · Rust",
    license: "Apache-2.0",
    topics: ["Tauri", "React", "P2P", "OCR"],
    homepage: "https://fiouri.github.io/selis/",
  },
  {
    host: "github",
    owner: "Fiouri",
    repo: "skepi",
    name: "S.K.E.P.I.",
    tagline: {
      el: "Survival Knowledge & Emergency Pocket Intelligence: offline εγκυκλοπαίδειες (ZIM), χάρτες (PMTiles) και on-device AI που απαντά με πηγές.",
      en: "Survival Knowledge & Emergency Pocket Intelligence: offline encyclopedias (ZIM), maps (PMTiles) and source-grounded on-device AI.",
    },
    language: "TypeScript",
    license: "GPL-3.0",
    topics: ["Offline", "ZIM", "PMTiles", "On-device AI"],
  },
  {
    host: "github",
    owner: "Fiouri",
    repo: "privacy-suite",
    name: "Privacy Suite",
    tagline: {
      el: "Εργαλεία ιδιωτικότητας που τρέχουν μόνο τοπικά: κρυπτογράφηση αρχείων, κωδικοί και έλεγχος hash. Χωρίς λογαριασμούς, uploads ή analytics.",
      en: "Local-only privacy toolkit: encrypt files, generate passwords and verify hashes offline. No accounts, uploads or analytics.",
    },
    language: "TypeScript",
    license: "MIT",
    topics: ["PWA", "Offline", "Privacy"],
  },
];

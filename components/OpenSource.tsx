"use client";

import { motion } from "motion/react";
import type { Locale } from "@/lib/projects";
import type { Dict } from "@/lib/i18n";
import {
  ossRepos,
  profiles,
  repoKey,
  repoUrl,
  type OssRepo,
  type RepoStats,
  type RepoStatsMap,
} from "@/lib/oss";

// Formatted from UTC parts with static month names so server and client
// renders always match (no Intl/ICU differences, no hydration mismatch).
function formatMonth(iso: string, months: readonly string[]): string {
  const d = new Date(iso);
  return `${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function RepoCard({
  repo,
  stats,
  locale,
  t,
  index,
}: {
  repo: OssRepo;
  stats: RepoStats | undefined;
  locale: Locale;
  t: Dict;
  index: number;
}) {
  const hostLabel = repo.host === "github" ? "GitHub" : "GitLab";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col rounded-lg border border-line bg-surface/80 p-6 backdrop-blur-sm transition-colors hover:border-lime/60"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
          {hostLabel} · {repo.owner}/{repo.repo}
        </span>
        {stats && stats.stars > 0 && (
          <span className="font-mono text-xs text-lime" aria-label={`${stats.stars} ${t.oss.stars}`}>
            ★ {stats.stars}
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">{repo.name}</h3>
      <p className="frost mt-3 flex-1 text-sm leading-relaxed text-fog/70">
        {repo.tagline[locale]}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {repo.topics.map((topic) => (
          <span
            key={topic}
            className="rounded border border-line bg-ink px-2 py-0.5 font-mono text-[10px] text-fog/60"
          >
            {topic}
          </span>
        ))}
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded border border-line bg-line">
        <div className="bg-surface px-3 py-2">
          <dt className="font-mono text-[9px] uppercase tracking-wider text-steel">Stack</dt>
          <dd className="mt-0.5 font-mono text-[11px] font-bold text-lime">{repo.language}</dd>
        </div>
        <div className="bg-surface px-3 py-2">
          <dt className="font-mono text-[9px] uppercase tracking-wider text-steel">License</dt>
          <dd className="mt-0.5 font-mono text-[11px] font-bold text-lime">{repo.license}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <a
          href={repoUrl(repo)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm font-bold text-lime hover:underline"
        >
          {t.oss.source} ↗
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm font-bold text-fog/80 hover:text-lime hover:underline"
          >
            {t.oss.site} ↗
          </a>
        )}
        {stats?.pushedAt && (
          <span className="ml-auto font-mono text-[11px] text-steel">
            {t.oss.updated} {formatMonth(stats.pushedAt, t.oss.months)}
          </span>
        )}
      </div>
    </motion.article>
  );
}

export function ProfileLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {profiles.map((p) => (
        <a
          key={p.host}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-xs text-fog/80 transition-colors hover:border-lime hover:text-lime"
        >
          <span className="font-bold">{p.label}</span>
          <span className="text-steel">@{p.handle}</span>
          <span aria-hidden>↗</span>
        </a>
      ))}
    </div>
  );
}

export default function OpenSource({
  locale,
  t,
  stats,
}: {
  locale: Locale;
  t: Dict;
  stats: RepoStatsMap;
}) {
  return (
    <section id="oss" className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-lime">
              {t.oss.eyebrow}
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
              {t.oss.title}
            </h2>
            <p className="frost mt-5 max-w-xl font-body text-base text-steel">{t.oss.sub}</p>
          </div>
          <ProfileLinks />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ossRepos.map((repo, i) => (
            <RepoCard
              key={repoKey(repo)}
              repo={repo}
              stats={stats[repoKey(repo)]}
              locale={locale}
              t={t}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

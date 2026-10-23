"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/projects";
import { dict } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Contact from "@/components/Contact";
import OpenSource from "@/components/OpenSource";
import InteractiveBackdrop from "@/components/InteractiveBackdrop";
import type { RepoStatsMap } from "@/lib/oss";

export default function HomeClient({ repoStats }: { repoStats: RepoStatsMap }) {
  const [locale, setLocale] = useState<Locale>("en");
  const t = dict[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <main className="relative min-h-screen">
      <InteractiveBackdrop />
      <Header
        locale={locale}
        onToggle={() => setLocale((l) => (l === "el" ? "en" : "el"))}
        t={t}
      />

      <Hero t={t} />

      <section id="work" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-16 md:mb-24">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-lime">
            {t.work.eyebrow}
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
            {t.work.title}
          </h2>
        </div>

        <div className="space-y-28 md:space-y-40">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} locale={locale} t={t} index={i} />
          ))}
        </div>
      </section>

      <OpenSource locale={locale} t={t} stats={repoStats} />

      <Contact t={t} />

      <footer className="border-t border-line px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 md:flex-row md:items-center">
          <p className="font-mono text-xs text-steel">
            © {new Date().getFullYear()} Any WeCon
          </p>
          <p className="font-mono text-xs text-steel">{t.footer}</p>
        </div>
      </footer>
    </main>
  );
}

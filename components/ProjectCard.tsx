"use client";

import { motion } from "motion/react";
import type { Locale, Project } from "@/lib/projects";
import type { Dict } from "@/lib/i18n";
import TiltZone from "@/components/TiltZone";
import ShotCarousel from "@/components/ShotCarousel";

export default function ProjectCard({
  project,
  locale,
  t,
  index,
}: {
  project: Project;
  locale: Locale;
  t: Dict;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-10 md:grid-cols-12 md:gap-12"
    >
      {/* Left: meta + copy */}
      <div className="md:col-span-5">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm text-lime">{num}</span>
          <span className="h-px flex-1 bg-line" />
          <span className="font-mono text-xs text-steel">{project.year}</span>
        </div>

        <h3 className="mt-5 font-display text-3xl font-bold tracking-tight md:text-4xl">
          {project.name}
        </h3>
        <p className="frost mt-3 font-body text-base text-fog/80">
          {project.tagline[locale]}
        </p>

        <dl className="mt-8 space-y-5">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
              {t.project.problem}
            </dt>
            <dd className="frost mt-1.5 text-sm leading-relaxed text-fog/70">
              {project.problem[locale]}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
              {t.project.solution}
            </dt>
            <dd className="frost mt-1.5 text-sm leading-relaxed text-fog/70">
              {project.solution[locale]}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
              {t.project.role}
            </dt>
            <dd className="frost mt-1.5 text-sm leading-relaxed text-fog/70">
              {project.role[locale]}
            </dd>
          </div>
        </dl>

        {/* stack badges */}
        <div className="mt-7 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-fog/70"
            >
              {s}
            </span>
          ))}
        </div>

        {(project.liveUrl || project.storeUrl) && (
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm font-bold text-lime hover:underline"
              >
                {t.project.live} ↗
              </a>
            )}
            {project.storeUrl && (
              <a
                href={project.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm font-bold text-lime hover:underline"
              >
                {t.project.store} ↗
              </a>
            )}
          </div>
        )}
      </div>

      {/* Right: screenshots + spec datasheet */}
      <div className="md:col-span-7">
        {/* spec datasheet — single unified panel */}
        <TiltZone className="mb-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
          {project.specs.map((spec) => (
            <div key={spec.label.en} className="bg-surface p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-steel">
                {spec.label[locale]}
              </p>
              <p className="mt-1 font-mono text-xs font-bold text-lime">{spec.value}</p>
            </div>
          ))}
        </TiltZone>

        {/* screenshot carousel */}
        <ShotCarousel
          slug={project.slug}
          name={project.name}
          total={project.shots}
          aspect={project.shotAspect}
        />
      </div>
    </motion.article>
  );
}

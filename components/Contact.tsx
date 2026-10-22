"use client";

import { motion } from "motion/react";
import type { Dict } from "@/lib/i18n";

const EMAIL = "anywecon@gmail.com";

export default function Contact({ t }: { t: Dict }) {
  return (
    <section id="contact" className="border-t border-line">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-6xl px-6 py-24 md:py-32"
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-lime">
          {t.contact.eyebrow}
        </p>
        <h2 className="max-w-2xl font-display text-4xl font-bold tracking-tight md:text-6xl">
          {t.contact.title}
        </h2>
        <p className="mt-5 max-w-md font-body text-base text-steel">{t.contact.sub}</p>

        <a
          href={`mailto:${EMAIL}`}
          className="group mt-10 inline-flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-fog transition-colors hover:text-lime md:text-3xl"
        >
          {EMAIL}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </motion.div>
    </section>
  );
}

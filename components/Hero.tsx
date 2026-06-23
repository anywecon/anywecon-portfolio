"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Dict } from "@/lib/i18n";

export default function Hero({ t }: { t: Dict }) {
  const reduce = useReducedMotion();
  const words = t.hero.lineRotate;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [reduce, words.length]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="top" className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/40 to-ink" />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 md:pb-32 md:pt-40"
      >
        <motion.p
          variants={item}
          className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-lime"
        >
          {t.hero.role}
        </motion.p>

        <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          <motion.span variants={item} className="block">
            {t.hero.line1}{" "}
          </motion.span>
          <motion.span variants={item} className="relative block text-lime">
            <span
              key={idx}
              className="inline-block animate-fade-up"
              style={{ willChange: "transform, opacity" }}
            >
              {words[idx]}
            </span>
          </motion.span>
          <motion.span variants={item} className="block">
            {t.hero.line2}
          </motion.span>
        </h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl font-body text-base text-steel md:text-lg"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div variants={item} className="mt-10">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-mono text-sm font-bold text-ink transition-transform hover:scale-[1.03]"
          >
            {t.hero.cta}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

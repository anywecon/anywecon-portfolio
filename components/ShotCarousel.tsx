"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import TiltZone from "@/components/TiltZone";

const WINDOW = 3; // always-visible count

export default function ShotCarousel({
  slug,
  name,
  total,
  aspect,
}: {
  slug: string;
  name: string;
  total: number;
  /** Native screenshot ratio, e.g. "9 / 16". Defaults to the 9:19.5 phone ratio. */
  aspect?: string;
}) {
  // Without an explicit ratio the thumbnails keep their slightly tighter 9:19 crop.
  const thumbAspect = aspect ?? "9 / 19";
  const fullAspect = aspect ?? "9 / 19.5";
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState(0); // index of leftmost visible shot (0-based)
  const [lightbox, setLightbox] = useState<number | null>(null); // 1-based file number

  const maxOffset = Math.max(0, total - WINDOW);
  const canPrev = offset > 0;
  const canNext = offset < maxOffset;

  // visible file numbers (1-based)
  const visible = Array.from({ length: Math.min(WINDOW, total) }, (_, i) => offset + i + 1);

  const src = (n: number) => `/shots/${slug}/${String(n).padStart(2, "0")}.png`;

  const next = useCallback(() => setOffset((o) => Math.min(o + 1, maxOffset)), [maxOffset]);
  const prev = useCallback(() => setOffset((o) => Math.max(o - 1, 0)), []);

  // lightbox navigation
  const lbNext = useCallback(
    () => setLightbox((n) => (n === null ? n : Math.min(n + 1, total))),
    [total]
  );
  const lbPrev = useCallback(
    () => setLightbox((n) => (n === null ? n : Math.max(n - 1, 1))),
    []
  );

  // keyboard: ESC closes, arrows navigate lightbox
  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
      else if (e.key === "ArrowRight") lbNext();
      else if (e.key === "ArrowLeft") lbPrev();
    }
    window.addEventListener("keydown", onKey);
    // lock scroll while lightbox open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, lbNext, lbPrev]);

  // portal exit: leftmost slides further left, shrinks, blurs, fades (theatrical)
  const variants = {
    enter: { x: 90, opacity: 0, scale: 0.88, filter: "blur(5px)" },
    center: { x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { x: -130, opacity: 0, scale: 0.55, filter: "blur(12px)" },
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((n) => (
            <motion.div
              key={`${slug}-${n}`}
              layout={!reduce}
              variants={reduce ? undefined : variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "transform, opacity, filter" }}
            >
              <TiltZone
                className="group relative cursor-none overflow-hidden rounded-xl border border-line bg-surface"
                style={{ aspectRatio: thumbAspect }}
              >
                <button
                  onClick={() => setLightbox(n)}
                  aria-label={`Open ${name} screenshot ${n}`}
                  className="absolute inset-0 z-10"
                />
                <Image
                  src={src(n)}
                  alt={`${name} screenshot ${n}`}
                  fill
                  sizes="(max-width: 768px) 33vw, 200px"
                  className="object-cover"
                />
              </TiltZone>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* controls */}
      {total > WINDOW && (
        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-[11px] text-steel">
            {offset + 1}–{offset + WINDOW} / {total}
          </span>
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={!canPrev}
              aria-label="Previous screenshot"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fog transition-colors enabled:hover:border-lime enabled:hover:text-lime disabled:opacity-30"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={!canNext}
              aria-label="Next screenshot"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fog transition-colors enabled:hover:border-lime enabled:hover:text-lime disabled:opacity-30"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/80 backdrop-blur-md"
          >
            {/* prev */}
            {lightbox > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); lbPrev(); }}
                aria-label="Previous"
                className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-ink/60 text-fog transition-colors hover:border-lime hover:text-lime md:left-10"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
            )}

            <motion.div
              key={lightbox}
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[80vh] w-auto overflow-hidden rounded-2xl border border-line shadow-2xl"
              style={{ aspectRatio: fullAspect }}
            >
              <Image
                src={src(lightbox)}
                alt={`${name} screenshot ${lightbox}`}
                fill
                sizes="40vh"
                className="object-cover"
                priority
              />
            </motion.div>

            {/* next */}
            {lightbox < total && (
              <button
                onClick={(e) => { e.stopPropagation(); lbNext(); }}
                aria-label="Next"
                className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-ink/60 text-fog transition-colors hover:border-lime hover:text-lime md:right-10"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            )}

            {/* close */}
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ink/60 text-fog transition-colors hover:border-lime hover:text-lime"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>

            <span className="absolute bottom-5 font-mono text-xs text-steel">
              {name} · {lightbox} / {total}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

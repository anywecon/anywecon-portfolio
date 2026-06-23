"use client";

import type { Locale } from "@/lib/projects";
import type { Dict } from "@/lib/i18n";

export default function Header({
  locale,
  onToggle,
  t,
}: {
  locale: Locale;
  onToggle: () => void;
  t: Dict;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm font-bold tracking-tight text-fog">
          any<span className="text-lime">.</span>wecon
        </a>

        <nav className="flex items-center gap-6">
          <a
            href="#work"
            className="hidden font-mono text-xs uppercase tracking-widest text-steel transition-colors hover:text-fog sm:inline"
          >
            {t.nav.work}
          </a>
          <a
            href="#contact"
            className="hidden font-mono text-xs uppercase tracking-widest text-steel transition-colors hover:text-fog sm:inline"
          >
            {t.nav.contact}
          </a>
          <button
            onClick={onToggle}
            aria-label="Toggle language"
            className="flex items-center gap-1 rounded-full border border-line px-3 py-1.5 font-mono text-xs font-medium transition-colors hover:border-lime hover:text-lime"
          >
            <span className={locale === "el" ? "text-lime" : "text-steel"}>EL</span>
            <span className="text-line">/</span>
            <span className={locale === "en" ? "text-lime" : "text-steel"}>EN</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

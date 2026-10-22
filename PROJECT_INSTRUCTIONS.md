# Any WeCon Portfolio — Project Instructions

## Τι είναι
Production portfolio site του brand "Any WeCon" (solo freelance dev, Πάτρα).
Live: https://anywecon.dev (+ www → apex redirect). Repo: github.com/Fiouri/anywecon-portfolio (private).
Local path: F:\Projects\Portofolio\anywecon-portfolio

## Stack
- Next.js 14 (App Router) + TypeScript strict
- Tailwind (custom theme: ink #0A0A0B, surface #121214, line #26262A, fog #EDEDED, steel #6B7280, lime #C8FF00)
- Motion (framer-motion `motion/react`) για animations
- Self-hosted fonts via @fontsource (Space Grotesk display, Inter body, JetBrains Mono mono) — ΟΧΙ next/font/google (proxy issue)
- Bilingual EN/EL, default EN; client-side locale toggle (no i18n routing). <html lang> = "en" στο layout, συγχρονίζεται με το locale μέσω useEffect στο page.tsx
- Static-ish: μόνο το /opengraph-image είναι dynamic (edge)

## Deploy / CI-CD
- Vercel, Git-connected: κάθε `git push origin main` → auto production deploy
- ΔΕΝ χρειάζεται χειροκίνητο redeploy ποτέ
- Custom domain anywecon.dev via Cloudflare DNS (CNAME → vercel-dns-017, DNS only / proxy OFF)

## Δομή
- app/page.tsx — orchestrator (locale state, default "en", syncs document lang, sections)
- app/layout.tsx — metadata, fonts, metadataBase=https://anywecon.dev, <html lang="en">
- app/opengraph-image.tsx — dynamic OG (1200x630, dark/lime branding)
- app/globals.css — base, cursor rules, .frost, .tilt-zone, reduced-motion
- components/Header.tsx — sticky top, locale toggle
- components/Hero.tsx — rotating word, page-load stagger
- components/InteractiveBackdrop.tsx — canvas gravity grid + custom lime cursor (z-100)
- components/ProjectCard.tsx — per-project layout, frosted text, spec datasheet, carousel
- components/ShotCarousel.tsx — sliding-window (1-by-1) + portal exit + lightbox
- components/TiltZone.tsx — 3D tilt + lime edge glow + emits awc:calm events (pause gravity)
- components/Contact.tsx — contact section (EMAIL constant)
- lib/projects.ts — ΟΛΟ το project content (specs, stack, copy EL/EN, shots count)
- lib/i18n.ts — UI strings EL/EN
- public/shots/<slug>/NN.png — screenshots (9:19 phone ratio)

## Τα 4 projects (slugs)
myshift (8 shots) · parousio (4) · kratiseis (13) · pame-parea (7, Beta, live link)

## Πώς δουλεύω εδώ
- Εκτελώ μόνος μέσω Windows MCP: edits, typecheck, build, git, deploy verify. Δεν δίνω βήματα για ό,τι μπορώ να κάνω.
- ΠΑΝΤΑ `git fetch` + `git status -sb` πριν από κάθε αλλαγή — το main αλλάζει και από άλλα sessions.
- Verify gate ΠΑΝΤΑ πριν push: `npm run typecheck` + `npm run build` (σταματάω dev server & καθαρίζω .next πρώτα, αλλιώς EPERM lock).
- Git auth σε non-interactive shell: `git -c credential.helper= -c "credential.helper=!gh auth git-credential" push origin main` (ή μία φορά `gh auth setup-git`). Ο GCM ζητάει διάλογο και αποτυγχάνει σιωπηλά.
- Verify live μετά το push: το Vercel θέλει ~30s, μετά grep στο https://anywecon.dev.
- Dev server: `Start-Process cmd '/c npm run dev'` detached, check http://localhost:3000.
- Νέο project: πρόσθεσε entry στο lib/projects.ts + screenshots σε public/shots/<slug>/ + shots count.
- Code/commits: αγγλικά. Συνομιλία: ελληνικά, συνοπτικά, λύση πρώτα.

## Επαφή στο site
anywecon@gmail.com (components/Contact.tsx)

# anywecon-portfolio

Production portfolio site of the **Any WeCon** brand (solo freelance developer, Patras, GR).

- Live: https://anywecon.dev (www redirects to apex)
- Repo: github.com/anywecon/anywecon-portfolio — **PUBLIC**. Never commit secrets, tokens, private emails or private info.
- Single page, bilingual EN/EL (default EN, client-side toggle, no i18n routing).

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript 5 (strict)
- Tailwind CSS 3.4 via PostCSS (custom theme: ink `#0A0A0B`, surface `#121214`, line `#26262A`, fog `#EDEDED`, steel `#6B7280`, lime `#C8FF00`)
- Motion (`motion/react`) — the only animation/UI library
- Fonts: self-hosted via `@fontsource` CSS imports in `app/layout.tsx` (Space Grotesk display, Inter body, JetBrains Mono mono). Do not use `next/font/google`.
- ESLint 9 flat config (`eslint.config.mjs`, `eslint-config-next` core-web-vitals + typescript)
- Playwright E2E (`e2e/`)
- Node >= 20.9 (local: 22)

## Structure

| Path | What |
| --- | --- |
| `app/page.tsx` | Server component. `revalidate = 21600` (ISR, 6h), fetches repo stats, renders `HomeClient` |
| `app/layout.tsx` | Metadata (`metadataBase` = https://anywecon.dev), font imports, `<html lang="en">` |
| `app/opengraph-image.tsx` | OG image (1200x630 PNG, `next/og`, Node runtime, static) |
| `app/globals.css` | Base styles, custom cursor, `.frost`, `.tilt-zone`, reduced-motion rules |
| `components/HomeClient.tsx` | Client orchestrator: locale state, syncs `document.documentElement.lang`, sections `#top` `#work` `#oss` `#contact` |
| `components/Header.tsx` | Sticky header, nav anchors, EL/EN toggle |
| `components/Hero.tsx` | Rotating word, load stagger |
| `components/InteractiveBackdrop.tsx` | Canvas gravity grid + custom lime cursor |
| `components/ProjectCard.tsx` | Project layout: copy, stack badges, spec datasheet, carousel |
| `components/ShotCarousel.tsx` | 3-up sliding carousel + lightbox (Escape / arrows) |
| `components/TiltZone.tsx` | 3D tilt + edge glow, emits `awc:calm-*` events |
| `components/OpenSource.tsx` | Open-source repo cards + `ProfileLinks` |
| `components/Contact.tsx` | Contact section (`EMAIL` constant) |
| `lib/projects.ts` | All project content |
| `lib/oss.ts` | OSS allowlist + code-host profiles |
| `lib/repoStats.ts` | Server-only GitHub/GitLab stats fetch (5s timeout, never throws) |
| `lib/i18n.ts` | UI strings EL/EN |
| `public/shots/<slug>/NN.png` | Screenshots |
| `e2e/` | Playwright specs |
| `scripts/start-standalone.mjs` | Copies static assets into `.next/standalone` and starts `server.js` |

## Editing content

- **Projects** — `lib/projects.ts`. Each entry: `slug`, copy (EL/EN), `stack`, `specs`, `shots` (count of `public/shots/<slug>/01.png`..`NN.png`).
  - `shotAspect` — set (e.g. `"9 / 16"`) when screenshots are not the default 9:19.5 phone ratio.
  - `storeUrl` — Google Play listing link. `liveUrl` — live demo link.
- **Open source** — `lib/oss.ts`. Only repos in `ossRepos` are shown (curated allowlist, never auto-listed). `profiles` holds the GitHub/GitLab profile links.
- **UI strings** — `lib/i18n.ts` (both `el` and `en` must have the same keys).
- **Contact email** — `EMAIL` constant in `components/Contact.tsx`.
- E2E tests read `lib/projects.ts` and `lib/i18n.ts`, so content edits are covered automatically.

## Commands

```bash
npm run dev              # http://localhost:3000
npm run typecheck        # tsc --noEmit
npm run lint             # eslint .
npm run build            # next build (Turbopack, output: standalone)
npm run start            # next start
npm run start:standalone # copy assets + node .next/standalone/server.js (PORT env, default 3000)
npm run test:e2e         # Playwright: builds, serves standalone on :3100, runs e2e/
PLAYWRIGHT_BASE_URL=https://<preview> npm run test:e2e   # run against a deployed URL
npx playwright test --grep-invert @external              # skip external-link checks
```

## Deploy

- **Now:** Vercel (Hobby), Git-connected. Push to `main` = production deploy. PRs get Preview deployments.
- **Later:** VPS (Docker + Caddy) using `output: "standalone"` (`node .next/standalone/server.js`). Keep the app free of Vercel-only runtime deps/config.

## Rules

- Always `git fetch` + `git status -sb` before changing anything; `main` is also changed from other sessions.
- Work on a branch and open a PR. Never push directly to `main` without an explicit go-ahead.
- Public repo: no secrets, tokens, personal data.
- Verification gate before push: `npm run typecheck`, `npm run lint`, `npm run build`, `npm run test:e2e`, `osv-scanner scan source -r .` (0 HIGH/CRITICAL), `gitleaks git .`.
- Code, comments, commits: English.

## Windows notes

- Stop the dev server and delete `.next` before `npm run build`, otherwise builds fail with EPERM file locks.
- Non-interactive push (GCM pops a dialog and fails silently):
  `git -c credential.helper= -c "credential.helper=!gh auth git-credential" push`
- A stray lockfile exists in `F:\Projects`; `outputFileTracingRoot` in `next.config.mjs` pins the root to this repo.

## Next.js docs for agents

See `AGENTS.md` — it points at the version-matched docs in `node_modules/next/dist/docs/`.

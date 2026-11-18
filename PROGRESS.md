**Current:** Next.js 16 upgrade + Playwright E2E (branch `chore/next-16`) — PR open, awaiting owner review
**Next step:** Owner reviews the PR and the Vercel preview, decides on the picomatch advisory, then merges
**Last session:** 2026-11-18 — Next 16.4.6, ESLint 10 flat config, standalone output, Playwright suite; typecheck/lint/build/E2E green

## 2026-11-18 — Next.js 16 upgrade

Done:
- Remote moved to github.com/anywecon/anywecon-portfolio
- CLAUDE.md + AGENTS.md added, README rewritten
- Next 15.5.29 → 16.4.6, React 19.3.1, TypeScript 5.9.3, ESLint 10 flat config
- OG image on the Node runtime (static), same look (Noto Sans embedded)
- `output: "standalone"` + `npm run start:standalone` (VPS-ready)
- package.json overrides removed (no longer needed)
- Playwright E2E: desktop + mobile Chromium, 46 tests

Open risks:
- picomatch ReDoS advisory (GHSA-fc5q-39xc-vjpf), dev dependencies only, no fixed release yet
- Local Windows: Playwright runs with 1 worker (firewall driver stalls parallel runs)

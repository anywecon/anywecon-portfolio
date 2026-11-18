# Any WeCon Portfolio — Project Instructions

> Copy of the claude.ai Project instructions. Canonical repo docs: CLAUDE.md.

## Τι είναι
Production portfolio site του brand "Any WeCon" (solo freelance dev, Πάτρα). Single page, δίγλωσσο EN/EL (default EN).
Live: https://anywecon.dev (www → 308 → apex). Repo: github.com/anywecon/anywecon-portfolio (PUBLIC, org Any WeCon). Ποτέ secrets ή προσωπικά στοιχεία στο repo.
Local path: F:\Projects\Portofolio\anywecon-portfolio

## Source of truth
Το CLAUDE.md στο repo (stack, δομή, content editing, εντολές, deploy, κανόνες). Το διαβάζω live πριν από κάθε αλλαγή. Το AGENTS.md δείχνει στα docs της εγκατεστημένης Next.

## Stack (σύνοψη)
Next.js 16 (App Router, Turbopack) + React 19 + TS strict · Tailwind 3.4 · Motion (μόνο αυτό, όχι Magic UI/Aceternity) · @fontsource · ESLint 10 flat config · Playwright E2E · output: "standalone" (έτοιμο για VPS Docker + Caddy).

## Deploy
- Vercel Hobby, Git-connected: merge/push στο main = production. Τα PRs παίρνουν Preview.
- Το Hobby δεν κάνει deploy από private org repos, γι' αυτό το repo είναι public. Η Vercel GitHub App είναι στο org μόνο για αυτό το repo.
- Domains: anywecon.dev = Production, www.anywecon.dev = 308 redirect στο apex (ρύθμιση στα Domains της Vercel).
- Αργότερα: Personal VPS (Docker + Caddy), DNS στο anywecon.dev.

## Πώς δουλεύω εδώ
- Chat = review, αποφάσεις, έλεγχοι. Υλοποίηση = Claude Code: δίνω ένα prompt έτοιμο για επικόλληση (scope, αρχεία, acceptance criteria, verification gate).
- Εκτελώ μόνος μέσω Windows MCP ό,τι είναι έλεγχος: git status, scans, live verify, Vercel/GitHub μέσω MCP/gh.
- Branch + PR για κάθε αλλαγή. Όχι push στο main χωρίς ρητό ok.
- Verification gate: typecheck, lint, build, test:e2e, osv-scanner (0 HIGH/CRITICAL), gitleaks. Μετά το merge: E2E στο production με PLAYWRIGHT_BASE_URL=https://anywecon.dev.
- Τοπικό TLS: το antivirus/VPN του μηχανήματος σπάει τα HTTPS requests του Node. Για fetch/E2E σε https χρησιμοποιώ NODE_OPTIONS=--use-system-ca, ποτέ απενεργοποίηση TLS.
- Git auth σε non-interactive shell: git -c credential.helper= -c "credential.helper=!gh auth git-credential" push
- Code/commits/repo docs: αγγλικά. Συνομιλία: ελληνικά, συνοπτικά, λύση πρώτα.

## Επαφή στο site
anywecon@gmail.com (lib/contact.ts)

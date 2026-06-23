# Any WeCon — Portfolio

Bold/dark, animation-heavy portfolio. Next.js 14 (App Router) + Tailwind + Motion. Bilingual EL/EN.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # strict TS check
npm run build      # production build
```

## Add your screenshots

Drop real device screenshots into:

```
public/shots/myshift/01.png   02.png   03.png
public/shots/parousio/01.png  02.png   03.png
public/shots/kratiseis/01.png 02.png   03.png
public/shots/pame-parea/01.png 02.png  03.png
```

Aspect ratio is `9:19` (phone). Use clean device frames or raw screenshots.
To change how many shots per project, edit `shots` in `lib/projects.ts`.

## Edit content

- Project copy / specs / stack → `lib/projects.ts`
- UI strings (nav, hero, contact) → `lib/i18n.ts`
- Contact email → `components/Contact.tsx` (`EMAIL` const)
- Pame Parea live demo → uncomment `liveUrl` in `lib/projects.ts`

## Deploy (Vercel)

```bash
git init && git add . && git commit -m "init portfolio"
# push to GitHub, then import on vercel.com — zero config needed
```

Point your domain (`anywecon.com`) at it in Vercel → Settings → Domains.

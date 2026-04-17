# EM Consulting

Bilingual (zh-CN / en) marketing site for EM Consulting, a boutique US university admissions advisory firm. Single-page editorial layout with locale-based routing (`/` → zh-CN, `/en` → English).

## Stack

- Next.js 16 (App Router) · TypeScript · Tailwind v4
- Framer Motion (LazyMotion, strict `m.*`) for scroll-reveal motion
- `next/font` with Italiana + Noto Serif SC for bilingual display type
- Vercel deploy · Calendly booking integration

## Develop

```bash
npm install
npm run dev    # http://localhost:3000
npm run lint
npm run build
```

Copy lives in `messages/{en,zh-CN}.json`. UI sections are in `src/components/`. Design tokens (gold ladder, spacing, type scale) live in `src/app/globals.css`.

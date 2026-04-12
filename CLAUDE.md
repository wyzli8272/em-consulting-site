# EM Consulting Website

## What this is
Premium college admissions consulting site for wealthy Chinese international families.
Single-page app, bilingual (zh-CN default, English toggle), deployed on Vercel.

## Design System (do not deviate)
- Oxford Navy: #003566 (primary text, headings, nav, footer bg)
- Gold: #FFD60A (CTAs, accent lines, hover states — NEVER for text on light backgrounds)
- Ink Black: #000814 (hero section, footer, dramatic contrast)
- Warm Cream: #FAF8F5 (page background)
- White: #FFFFFF (card backgrounds, content containers)
- Display font: The Seasons (H1–H2 only). Fallback: Playfair Display.
- Body font: Helvetica Now Display. Fallback: Helvetica Neue, Helvetica, Arial, sans-serif.
- Chinese font: Noto Sans SC from Google Fonts with unicode-range subsetting.
- 8px spacing grid. Max content width: 1200px. Mobile padding: 24px.

## Font files
The Seasons and Helvetica Now Display are commercial fonts. Self-host from /public/fonts/.
If TTF/WOFF2 files are not yet in that directory, use the fallback fonts and leave TODO comments.
Do NOT load commercial fonts from any CDN.

## i18n
Default locale: zh-CN (served at /). English at /en.
All strings in messages/zh-CN.json and messages/en.json. No inline hardcoded text.
Chinese is the primary version — write Chinese first, then natural English (not literal translation).

## Anti-AI rules (non-negotiable)
### Banned English words/phrases
leverage, unlock, empower, elevate, seamless, holistic, transformative, groundbreaking,
delve, tapestry, landscape, pivotal, testament, underscore, showcase, foster, cultivate,
bolster, garner, meticulous, vibrant, intricate, "not just X but Y", "in today's [adj] landscape",
"at [Company] we believe", "your journey/story/path", "whether you're X or Y",
"ready to [verb]?", triadic structures, sentences starting with "With" + gerund

### Banned Chinese patterns
赋能, 助力 (as buzzwords), 一站式, 保录取, 梦想 (as cliché), 不仅仅是X更是Y,
four-character idiom stacking for literary effect

### Banned visual patterns
Gradient meshes, glassmorphism, blob animations, bento grids, pill-shaped everything,
gradient text, shimmer effects, parallax on every section, SVG wave dividers,
testimonial carousels, "trusted by" logo bars, progress bar counters, sticky side dots,
generic icon-set decoration, any "built with" footer badge

### Copy test
Every sentence must pass: "Would a smart 22-year-old Wharton student say this to a parent in a meeting?"

## Performance targets
Lighthouse: Performance 95+, Accessibility 100, Best Practices 100, SEO 100.
FCP < 1.2s, LCP < 2.5s, CLS < 0.1. Page weight < 500KB (excl. fonts).

## Deployment
GitHub repo → Vercel. Auto-deploy on push to main. Preview deploys for PRs.
Custom domain config documented but not activated (domain TBD).

## Out of scope
No blog/CMS, no login/portal, no payments, no chatbot, no testimonials,
no case studies, no multi-page routing beyond i18n, no backend/DB, no email capture.
Add Google Analytics and Baidu Tongji tracking code only.

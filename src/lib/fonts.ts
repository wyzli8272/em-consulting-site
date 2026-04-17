import { Italiana, Public_Sans } from "next/font/google";

// Display: Italiana — tall, hairline editorial serif (free twin of The Seasons).
// Single weight (400) by design — elegance comes from the forms, not the weight variation.
export const displayFont = Italiana({
  subsets: ["latin"],
  variable: "--font-display-serif",
  display: "swap",
  weight: "400",
});

// Body: Public Sans — US Design System sans, Helvetica-adjacent neutral grotesque.
export const bodyFont = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

// NOTE: no Google-hosted CJK web fonts at all.
//
// Round 4 attempted to bundle Noto Serif SC via next/font/google for
// zh-CN display headlines. Under Next 16 / Turbopack it silently emitted
// zero @font-face rules, invalidating the --font-display var() chain
// and taking Italiana down on both locales (fixed in f67453f by switching
// display to OS-native CJK serifs).
//
// Round 5's Evidence Collector then measured the body-text side of the
// equation: Noto Sans SC via next/font/google was still loading ~1 MB
// of woff2 shards on every zh-CN cold visit. Google ships CJK Noto as
// ~100 unicode-range chunks per weight; `preload: false` only removes
// the `<link rel="preload">` hint — the moment any CJK glyph renders,
// CSS references the family name and the browser fetches shards on
// demand. With most of the zh-CN page in Chinese, most shards get
// fetched. Lighthouse Performance on zh-CN: 37.
//
// The fix mirrors the Round 4 Noto Serif SC fix: drop the Google
// binding entirely and fall through to OS-native CJK sans — PingFang SC
// on Apple, Microsoft YaHei on Windows, Noto Sans CJK SC on modern
// Linux. Every target device ships one. Zero runtime download, zero
// FOIT, zero unicode-range fragmentation.
//
// The fallback stack lives on --font-body and --font-chinese in
// globals.css.

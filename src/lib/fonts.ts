import { Italiana, Public_Sans, Noto_Sans_SC } from "next/font/google";

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

// Chinese body (grotesque). Used for body copy in zh-CN.
// preload: false — Google ships Noto Sans SC as ~100 per-unicode-range
// woff2 shards per weight (219 @font-face rules in dev). Without
// preload:false Next would inject <link rel="preload"> for every one of
// them, slowing first paint on EVERY locale. With preload:false the CSS
// is emitted but the browser only downloads a shard when a glyph in that
// unicode-range is actually rendered — so /en (all-Latin content) never
// fetches a single CJK woff2.
export const chineseFont = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  display: "swap",
  weight: ["400", "700"],
  preload: false,
});

// NOTE: no Google-hosted CJK serif.
//
// We tried Noto_Serif_SC via next/font/google. Under Next 16 / Turbopack
// it silently emitted zero @font-face rules regardless of weight config
// (["300","400"], "400" alone — same null result). That left
// `chineseSerifFont.variable` as the empty string, so the `--font-display`
// var() chain in globals.css contained an unresolved reference and the
// entire custom property went invalid-at-computed-value time — taking
// Italiana down with it on BOTH locales.
//
// The right answer turned out to be simpler than fighting the font
// loader: for zh-CN headlines, use the CJK serifs that already ship with
// every target OS (PingFang SC on Apple, Microsoft YaHei / SimSun on
// Windows, Noto Serif CJK SC on modern Linux). They render instantly,
// download nothing, and are conventional Chinese editorial serifs.
// The fallback stack lives in globals.css on the `--font-display` chain.

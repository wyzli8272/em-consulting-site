import { Italiana, Public_Sans, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";

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
export const chineseFont = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  display: "swap",
  weight: ["400", "700"],
});

// Chinese display (serif). Restores editorial serif voice for zh-CN headlines,
// closing the cohesion gap where Italiana has zero CJK coverage and zh-CN H1
// was falling through to the Sans grotesque.
export const chineseSerifFont = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-noto-serif-sc",
  display: "swap",
  weight: ["300", "400"],
});

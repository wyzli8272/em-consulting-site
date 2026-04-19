import Link from "next/link";
import type { Metadata } from "next";
import { displayFont, bodyFont } from "@/lib/fonts";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

/**
 * App-level 404 — catches BOTH top-level unmatched URLs (`/garbage`) and
 * invalid-locale segments (the `notFound()` call in `[locale]/layout.tsx`
 * when `hasLocale()` rejects).
 *
 * Round 7 Commit 2 fixed a CRITICAL regression that shipped in Round 6
 * Commit 2 (`d28756a`): the original app-level 404 declared its own
 * `<html>` / `<body>` but didn't import `globals.css` or attach the
 * font-variable classes — so on the live site every unmatched URL
 * rendered in browser-default Times New Roman on transparent background.
 * Evidence Collector confirmed: `document.styleSheets.length === 0` on
 * `/garbage`. Four independent audit agents (Frontend, Code Review,
 * Brand Guardian, Evidence Collector) caught it in Round 7.
 *
 * The fix: import `./globals.css` at the top, attach
 * `${displayFont.variable} ${bodyFont.variable}` to `<html>` so the
 * `--font-display-serif` / `--font-body-sans` custom properties are
 * defined, and carry the SITE_URL-based `metadataBase` so any
 * metadata-referenced assets (og images) resolve absolutely.
 *
 * Bilingual copy is presented with per-block `lang` attributes so
 * screen readers switch voice profiles between zh and en mid-page
 * (WCAG 3.1.2 Language of Parts). Adds the Italiana wordmark above
 * the 404 tag so the brand asserts even on the error page (Brand
 * Guardian Round 7 MEDIUM — every other surface carries the
 * wordmark; the 404 shouldn't be the exception). Sizing reduced from
 * stacked `text-title` (~112 px block at desktop) to a fixed mid-tier
 * `text-[2.25rem] md:text-[2.75rem]` so the bilingual headline reads
 * like a terse error page, not a hero landing.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Not found — EM Consulting",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <html
      lang="zh-CN"
      dir="ltr"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body className="font-body bg-cream text-navy antialiased">
        <main
          id="main-content"
          className="flex min-h-[100dvh] flex-col items-center justify-center bg-ink px-6 text-center"
        >
          {/* Wordmark — brand asserts on every surface, 404 included. */}
          <span className="font-display text-xl tracking-tight text-white/80">
            EM Consulting
          </span>

          <span className="section-tag text-gold mt-8">404</span>
          <div className="accent-rule mt-4 mx-auto" aria-hidden="true" />

          {/* Bilingual headline with per-block `lang` so VoiceOver / NVDA
              switch voice profiles mid-page. Size capped at a fixed
              mid-tier so the two-line stack doesn't balloon at desktop
              clamps. */}
          <h1 className="mt-6 font-display text-[2.25rem] leading-tight text-white md:text-[2.75rem]">
            <span lang="zh-CN">页面未找到</span>
            <span
              lang="en"
              className="mt-2 block text-white/75"
            >
              Not found.
            </span>
          </h1>

          <p
            lang="zh-CN"
            className="mt-6 max-w-[520px] text-body-lg text-white/75"
          >
            此页面不存在，或已更改链接。
          </p>
          <p
            lang="en"
            className="mt-2 max-w-[520px] text-body-lg text-white/75"
          >
            This page does not exist or has moved.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <Link
              href="/"
              lang="zh-CN"
              className="inline-block bg-gold px-8 py-3.5 text-base font-medium text-ink transition-colors duration-200 hover:bg-gold-hover"
            >
              返回首页
            </Link>
            <Link
              href="/en"
              lang="en"
              className="inline-block border border-white/45 px-8 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-white/10"
            >
              Return home (English)
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}

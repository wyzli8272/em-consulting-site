import Link from "next/link";
import type { Metadata } from "next";

/**
 * App-level 404 — catches BOTH top-level unmatched URLs (`/garbage`) and
 * invalid-locale segments (the `notFound()` call in `[locale]/layout.tsx`
 * when `hasLocale()` rejects). Pre-Round-6 only `[locale]/not-found.tsx`
 * existed, which meant:
 *
 *   1. Top-level unmatched URLs fell through to Next.js's bare default
 *      404 page (white bg, system-ui, black/white divider) — visibly
 *      broken brand. Every deep-link with a typo hit an amateur page.
 *   2. `[locale]/not-found.tsx` used `await headers()` + `await cookies()`
 *      to infer locale for a bilingual render — which escalates the
 *      entire `[locale]` segment to Dynamic. Round 6 measured `Cache-
 *      Control: no-store` and `X-Vercel-Cache: MISS` on every request;
 *      no edge caching, direct TTFB hit.
 *
 * Moving the 404 to the app root fixes both: top-level URLs are now
 * caught, AND `[locale]` no longer uses dynamic APIs so Next can
 * prerender it statically. Bilingual copy handles both audiences
 * without needing to know which locale the visitor expected — a
 * parent who typoed `/en/pric ing` doesn't care whether EM shows the
 * message in zh or en, only that it looks like the same firm.
 */
export const metadata: Metadata = {
  title: "Not found — EM Consulting",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <html lang="en" dir="ltr" className="font-body bg-cream text-navy antialiased">
      <body>
        <main
          id="main-content"
          className="flex min-h-[100dvh] flex-col items-center justify-center bg-ink px-6 text-center"
        >
          <span className="section-tag text-gold">404</span>
          <div className="accent-rule mt-4 mx-auto" aria-hidden="true" />

          {/* Bilingual on one page — parent sees both the Chinese and
              English messages without the server needing to guess which
              locale they came in on (which would force Dynamic rendering). */}
          <h1 className="mt-6 font-display text-title text-white">
            页面未找到
            <span className="mt-2 block text-title text-white/75">
              Not found.
            </span>
          </h1>

          <p className="mt-6 max-w-[520px] text-body-lg text-white/70">
            您访问的页面已移动，或从未存在。
          </p>
          <p className="mt-2 max-w-[520px] text-body-lg text-white/70">
            The page you are looking for has moved or never existed.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <Link
              href="/"
              className="inline-block bg-gold px-8 py-3.5 text-base font-medium text-ink transition-colors duration-200 hover:bg-gold-hover"
            >
              返回首页
            </Link>
            <Link
              href="/en"
              className="inline-block border border-white/30 px-8 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-white/10"
            >
              Return home (English)
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}

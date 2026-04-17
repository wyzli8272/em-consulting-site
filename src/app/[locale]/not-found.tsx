import Link from "next/link";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { getDictionary, hasLocale, type Locale } from "@/lib/dictionaries";

export const metadata: Metadata = {
  title: "Not found — EM Consulting",
  robots: { index: false, follow: false },
};

/**
 * Next.js 16 resolves [locale]/not-found.tsx without passing the route
 * params, so we recover the active locale from the rewritten URL header
 * that `proxy.ts` forwards (defaults to zh-CN).
 */
async function resolveLocale(): Promise<Locale> {
  const h = await headers();
  const path =
    h.get("x-invoke-path") ??
    h.get("next-url") ??
    h.get("x-matched-path") ??
    "";
  if (path.startsWith("/en")) return "en";

  // Fallback: honor NEXT_LOCALE cookie if a user has switched locales.
  const c = await cookies();
  const cookieLocale = c.get("NEXT_LOCALE")?.value;
  if (cookieLocale && hasLocale(cookieLocale)) return cookieLocale;

  return "zh-CN";
}

export default async function LocaleNotFound() {
  const locale = await resolveLocale();
  const dict = await getDictionary(locale);
  const isZh = locale === "zh-CN";

  return (
    <main
      id="main-content"
      className="flex min-h-[100dvh] flex-col items-center justify-center bg-ink px-6 text-center"
    >
      <span className="section-tag text-gold">404</span>
      <div className="accent-rule mt-4 mx-auto" aria-hidden="true" />
      <h1 className="mt-6 font-display text-title text-white">
        {isZh ? "页面未找到。" : "Not found."}
      </h1>
      <p className="mt-4 max-w-[480px] text-body-lg text-white/70">
        {isZh
          ? "您访问的页面已移动，或从未存在。"
          : "The page you are looking for has moved or never existed."}
      </p>
      <Link
        href={isZh ? "/" : "/en"}
        className="mt-10 inline-block bg-gold px-8 py-3.5 text-base font-medium text-ink transition-colors duration-200 hover:bg-gold/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        {dict.nav.cta /* reuses the primary CTA label so the 404 stays on-brand */}
      </Link>
      <Link
        href={isZh ? "/" : "/en"}
        className="mt-6 text-sm text-white/60 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white/90"
      >
        {isZh ? "或返回首页" : "Or return home"}
      </Link>
    </main>
  );
}

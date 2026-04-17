import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16 renamed the `middleware.ts` file convention to `proxy.ts`.
// Functionally identical — this file rewrites `/` → `/zh-CN` so the default
// Chinese locale is served without a visible path prefix, while `/en` stays
// explicit for the English variant.

const locales = ["zh-CN", "en"];
const defaultLocale = "zh-CN";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  // Negative lookahead skips: internals, API, and any path with a dot (assets, maps, favicon, sitemap, robots)
  matcher: ["/((?!_next|_vercel|api|.*\\..*).*)"],
};

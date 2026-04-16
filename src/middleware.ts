import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["zh-CN", "en"];
const defaultLocale = "zh-CN";

export function middleware(request: NextRequest) {
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

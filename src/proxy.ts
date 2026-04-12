import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
  matcher: [
    "/((?!_next|api|fonts|images|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)",
  ],
};

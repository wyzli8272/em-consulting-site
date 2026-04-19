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
  // Negative lookahead skips:
  //   - Next internals (_next) and Vercel internals (_vercel)
  //   - API routes (api) — prefix match keeps /api and /api/xyz both skipped.
  //   - App-root metadata routes that are NOT nested under [locale]
  //     (opengraph-image, icon, apple-icon) — these live at
  //     `src/app/*` and would otherwise be rewritten to
  //     `/zh-CN/opengraph-image` (nonexistent → 404). This is the bug
  //     that was silently breaking every WeChat/LinkedIn/Twitter
  //     share preview on the live deploy. These three are `$`-anchored
  //     inside the lookahead so a future `/iconography` or
  //     `/opengraph-image-v2` route isn't over-excluded (Round 9 Code
  //     Review L3 — currently no collision, but cheap to future-proof).
  //   - Any path with a dot in it (asset filenames, sourcemaps, favicon.ico,
  //     sitemap.xml, robots.txt). The .*\.  clause catches those.
  matcher: [
    "/((?!_next|_vercel|api|opengraph-image$|icon$|apple-icon$|.*\\..*).*)",
  ],
};

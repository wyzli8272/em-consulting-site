export const CALENDLY_URL =
  "https://calendly.com/lishaorui82/em-consulting-diagnostic-session";

/**
 * Production origin for the site.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL env var (override in `.env.local` or Vercel project
 *     settings if the site moves to a custom domain).
 *  2. Vercel-injected preview deployment URL (for staged branches).
 *  3. The current Vercel production URL as a hard fallback.
 *
 * Used as `metadataBase` for absolute OG/Twitter image URLs, inside the
 * ProfessionalService JSON-LD block, and by robots.ts / sitemap.ts.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "production" && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://em-consulting-site.vercel.app");

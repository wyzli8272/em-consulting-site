export const CALENDLY_URL =
  "https://calendly.com/lishaorui82/em-consulting-diagnostic-session";

/**
 * Canonical origin for the site.
 *
 * Resolution order:
 *  1. `NEXT_PUBLIC_SITE_URL` env var — single source of truth. Set in Vercel
 *     project settings to the canonical public URL (currently the
 *     `em-consulting-site.vercel.app` alias; swap to the custom domain when
 *     it's ready). This is the only variable that should ever need editing.
 *  2. Hard-coded canonical fallback — used during local dev and as a safety
 *     net if the env var isn't set on Vercel.
 *
 * `VERCEL_URL` is intentionally NOT consulted: that variable resolves to the
 * per-deployment hashed alias (`em-consulting-site-abc123-…-projects.vercel.app`),
 * which is exactly what you don't want in `metadataBase`, JSON-LD `url`,
 * `robots.txt` Host, or `sitemap.xml` `<loc>` entries — those must point at
 * the stable public URL, not at an ephemeral deploy. The previous revision
 * of this file used `VERCEL_URL` on production deploys and silently leaked
 * preview-alias hostnames into robots + sitemap + hreflang; a search engine
 * discovering that would treat the canonical host as the short-lived alias.
 *
 * Used as `metadataBase` for absolute OG/Twitter image URLs, inside the
 * ProfessionalService JSON-LD block, and by `robots.ts` / `sitemap.ts`.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://em-consulting-site.vercel.app";

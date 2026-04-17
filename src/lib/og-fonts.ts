import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Loads Italiana Regular (weight 400, Latin full) for use in Next.js
 * metadata image routes (`opengraph-image`, `icon`, `apple-icon`).
 *
 * The TTF is bundled in the repo at `src/lib/fonts/italiana-400.ttf`
 * (32 KB, full Latin set, pulled from google/fonts repo under OFL). Reading
 * it from disk — rather than fetching from fonts.gstatic.com at runtime —
 * makes the metadata routes deterministic and removes three classes of
 * failure that were silently 404-ing them on the deployed site:
 *
 *   1. Next 16 + Turbopack has a bug where `runtime = "edge"` metadata
 *      routes can compile without a valid entrypoint
 *      (`"app-edge-has-no-entrypoint"` in the middleware manifest) —
 *      which returns 404, not the expected PNG fallback.
 *   2. AbortSignal.timeout(2000) against Google Fonts was flakier than
 *      expected under Vercel's edge runtime, and the module-level
 *      `attempted = true` memo poisoned every subsequent request in
 *      the same isolate.
 *   3. Any Google Fonts URL / CSS schema change would silently break the
 *      icon pipeline (Google has quietly changed the `src: url(...)` CSS
 *      shape before; keeping a regex parser in the critical path for
 *      branded imagery was fragile).
 *
 * TTF, not woff2, because @vercel/og's Satori renderer only accepts
 * OpenType signatures (TTF/OTF) — passing woff2 throws
 * "Unsupported OpenType signature wOF2" at build time.
 *
 * Re-downloading a new version of the font is a deliberate act: replace
 * the TTF and note the source commit. That's the correct cadence for a
 * brand asset — not a silent runtime fetch.
 */
const ITALIANA_PATH = join(
  process.cwd(),
  "src",
  "lib",
  "fonts",
  "italiana-400.ttf",
);

let cached: Buffer | null = null;

export function loadItalianaFont(): Buffer | null {
  if (cached) return cached;
  try {
    cached = readFileSync(ITALIANA_PATH);
    return cached;
  } catch {
    // Fall back to Georgia in the calling route if the file can't be read.
    // Should only ever happen in a broken build; log path so it's diagnosable.
    console.warn(`[og-fonts] Failed to read ${ITALIANA_PATH}`);
    return null;
  }
}

import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Loads Italiana Regular (weight 400, Latin full) for use in Next.js
 * metadata image routes (`opengraph-image`, `icon`, `apple-icon`).
 *
 * The TTF is bundled in the repo at `src/lib/fonts/italiana-400.ttf`
 * (32 KB, full Latin set, pulled from google/fonts repo under OFL).
 * Reading it from disk — rather than fetching fonts.gstatic.com at
 * runtime — makes the metadata routes deterministic: the bundled file
 * can't 404, time out, or return a different shape after a silent
 * Google Fonts CDN change. Re-downloading is a deliberate act: replace
 * the TTF and note the source commit; that's the right cadence for a
 * brand asset, not a silent runtime fetch.
 *
 * TTF, not woff2: @vercel/og's Satori renderer only accepts OpenType
 * signatures (TTF/OTF) — passing woff2 throws
 * "Unsupported OpenType signature wOF2" at build time.
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

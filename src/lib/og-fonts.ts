/**
 * Loads Italiana weight 400 from Google Fonts for use in next/og ImageResponse
 * routes (opengraph-image, icon, apple-icon).
 *
 * Runs on the edge runtime, so the fetch is bounded with AbortSignal.timeout
 * (2 s) — if Google Fonts is unreachable, the caller falls back to Georgia
 * so the card still renders.
 *
 * Module-level cache survives within a single edge isolate, which means
 * warm invocations skip the network call entirely.
 */
let cached: ArrayBuffer | null = null;
let attempted = false;

export async function loadItalianaFont(): Promise<ArrayBuffer | null> {
  if (cached) return cached;
  if (attempted) return null; // previously failed — don't retry in same isolate
  attempted = true;

  try {
    const cssRes = await fetch(
      "https://fonts.googleapis.com/css2?family=Italiana&display=swap",
      { signal: AbortSignal.timeout(2000) },
    );
    const cssText = await cssRes.text();
    const match = cssText.match(
      /src: url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2?)\)/,
    );
    if (!match?.[1]) return null;

    const fontRes = await fetch(match[1], {
      signal: AbortSignal.timeout(2000),
    });
    cached = await fontRes.arrayBuffer();
    return cached;
  } catch {
    return null;
  }
}

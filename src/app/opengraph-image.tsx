import { ImageResponse } from "next/og";
import { loadItalianaFont } from "@/lib/og-fonts";

export const runtime = "edge";
export const alt = "EM Consulting — College Admissions Strategy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview card. Pure editorial wordmark — Italiana on ink-navy with a
 * single gold rule. No subtitle, no photo, no gradient, no marketing copy.
 *
 * Keeping the card to just a wordmark is a deliberate brand choice: it scales
 * cleanly at WeChat's aggressive thumbnail sizes, avoids the system-ui
 * fallback that plagued the previous build's tagline, and signals confidence.
 */
export default async function OpenGraphImage() {
  const italianaFont = await loadItalianaFont();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000814",
          padding: "80px",
          fontFamily: italianaFont ? "Italiana" : "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 156,
            color: "#FAF8F5",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          EM Consulting
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            width: 72,
            height: 3,
            backgroundColor: "#FFD60A",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: italianaFont
        ? [
            {
              name: "Italiana",
              data: italianaFont,
              style: "normal",
              weight: 400,
            },
          ]
        : undefined,
    },
  );
}

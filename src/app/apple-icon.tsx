import { ImageResponse } from "next/og";
import { loadItalianaFont } from "@/lib/og-fonts";

// Default (Node) runtime — see opengraph-image.tsx / lib/og-fonts.ts for why.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple touch icon — what iOS shows on the home screen when a parent adds
 * the site to their phone. Same Italiana "EM" monogram as the browser
 * favicon, with a small gold rule below the wordmark so the icon reads as
 * a branded artifact at 180×180, not a flat placeholder.
 */
export default async function AppleIcon() {
  const italianaFont = loadItalianaFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#003566",
          color: "#FAF8F5",
          fontFamily: italianaFont ? "Italiana" : "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 400,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          EM
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 14,
            width: 28,
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

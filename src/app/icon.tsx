import { ImageResponse } from "next/og";
import { loadItalianaFont } from "@/lib/og-fonts";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Browser tab favicon. Italiana "EM" monogram on ink-navy — same typeface as
 * the OG wordmark, so the brand reads consistently from social preview to
 * browser tab. Falls back to Georgia if the Google Fonts fetch times out.
 *
 * fontSize 20 with letter-spacing -0.06em is the sweet spot: readable at the
 * 16×16 downsample Chrome/Safari apply, and still looks intentional at 32×32.
 */
export default async function Icon() {
  const italianaFont = await loadItalianaFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#003566",
          color: "#FAF8F5",
          fontSize: 20,
          fontFamily: italianaFont ? "Italiana" : "Georgia, serif",
          fontWeight: 400,
          letterSpacing: "-0.06em",
          lineHeight: 1,
        }}
      >
        EM
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

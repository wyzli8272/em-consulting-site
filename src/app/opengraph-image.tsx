import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "EM Consulting — College Admissions Strategy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  // Inline Italiana from Google Fonts for the wordmark. Falls back to Georgia
  // if the fetch fails so the card still renders in serif.
  let italianaFont: ArrayBuffer | null = null;
  try {
    const res = await fetch(
      "https://fonts.googleapis.com/css2?family=Italiana&display=swap",
    );
    const cssText = await res.text();
    const match = cssText.match(
      /src: url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2?)\)/,
    );
    if (match?.[1]) {
      const fontRes = await fetch(match[1]);
      italianaFont = await fontRes.arrayBuffer();
    }
  } catch {
    italianaFont = null;
  }

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
            fontSize: 132,
            color: "#FAF8F5",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          EM Consulting
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            width: 96,
            height: 4,
            backgroundColor: "#FFD60A",
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 28,
            color: "#FAF8F5",
            opacity: 0.75,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          Wharton Huntsman · MIT · Structured admissions strategy
        </div>
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

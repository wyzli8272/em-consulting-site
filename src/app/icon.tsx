import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 17,
          fontFamily: "Georgia, serif",
          fontWeight: 400,
          letterSpacing: "-0.03em",
        }}
      >
        EM
      </div>
    ),
    size,
  );
}

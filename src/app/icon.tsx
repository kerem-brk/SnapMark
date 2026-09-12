import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
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
          background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
          borderRadius: "16px",
          color: "white",
          fontWeight: 800,
          fontSize: "36px",
          fontFamily: "system-ui, sans-serif",
          boxShadow: "0 8px 16px rgba(99, 102, 241, 0.4)",
        }}
      >
        {"<S>"}
      </div>
    ),
    {
      ...size,
    }
  );
}

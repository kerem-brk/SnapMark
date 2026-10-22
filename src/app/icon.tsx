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
          background: "linear-gradient(145deg, #1E293B 0%, #090D16 100%)",
          borderRadius: "16px",
          border: "2px solid rgba(16, 185, 129, 0.4)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Viewfinder corners */}
          <path
            d="M 5 11 V 7 A 2 2 0 0 1 7 5 H 11"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 21 5 H 25 A 2 2 0 0 1 27 7 V 11"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 5 21 V 25 A 2 2 0 0 0 7 27 H 11"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 21 27 H 25 A 2 2 0 0 0 27 25 V 21"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Syntax Code brackets */}
          <path
            d="M 13.5 11.5 L 9.5 16 L 13.5 20.5"
            stroke="#34D399"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 18.5 11.5 L 22.5 16 L 18.5 20.5"
            stroke="#34D399"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 17.5 11.5 L 14.5 20.5"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="16" cy="16" r="1.5" fill="#A7F3D0" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}

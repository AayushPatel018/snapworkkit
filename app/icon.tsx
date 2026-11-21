import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

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
          borderRadius: 16,
          background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
          boxShadow: "0 8px 20px rgba(37, 99, 235, 0.28)",
        }}
      >
        <svg
          width="38"
          height="38"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 2L5 13H11.5L10.5 22L19 11H12.5L13.5 2Z"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="19" cy="5" r="2" fill="#93C5FD" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
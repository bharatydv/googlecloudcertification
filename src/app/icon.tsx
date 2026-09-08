import { ImageResponse } from "next/og";

/*
 * 96px = 2 x 48. Google only considers a favicon for search results if it
 * is square and a multiple of 48px, so 32x32 would be ignored there. 96 also
 * renders crisply on high-DPI tab bars.
 */
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

/**
 * Browser-tab icon, generated from the same three-tier geometry as the Logo
 * component so the two can never drift apart.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 6,
          paddingBottom: 24,
          background: "#0e2a5f",
          borderRadius: 24,
        }}
      >
        <div
          style={{
            width: 12,
            height: 18,
            borderRadius: 6,
            background: "rgba(255,255,255,0.5)",
          }}
        />
        <div
          style={{
            width: 12,
            height: 30,
            borderRadius: 6,
            background: "rgba(255,255,255,0.78)",
          }}
        />
        <div
          style={{
            width: 12,
            height: 45,
            borderRadius: 6,
            background: "#8ab0f6",
          }}
        />
      </div>
    ),
    size,
  );
}

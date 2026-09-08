import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Home-screen icon for iOS. Same geometry as the Logo, scaled up — iOS applies
 * its own corner mask, so this fills the square rather than rounding itself.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 11,
          paddingBottom: 45,
          background: "#0e2a5f",
        }}
      >
        <div
          style={{
            width: 22,
            height: 34,
            borderRadius: 11,
            background: "rgba(255,255,255,0.5)",
          }}
        />
        <div
          style={{
            width: 22,
            height: 59,
            borderRadius: 11,
            background: "rgba(255,255,255,0.78)",
          }}
        />
        <div
          style={{
            width: 22,
            height: 84,
            borderRadius: 11,
            background: "#8ab0f6",
          }}
        />
      </div>
    ),
    size,
  );
}

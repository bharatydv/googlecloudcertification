import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social card. Deliberately typographic and brand-neutral — no vendor
 * marks, no borrowed imagery.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(140deg, #0e2a5f 0%, #123882 60%, #1546a6 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#ffffff",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: 4,
              paddingBottom: 14,
            }}
          >
            <div style={{ width: 7, height: 11, borderRadius: 4, background: "#8ab0f6" }} />
            <div style={{ width: 7, height: 18, borderRadius: 4, background: "#2f6fe4" }} />
            <div style={{ width: 7, height: 26, borderRadius: 4, background: "#0e2a5f" }} />
          </div>
          <div style={{ color: "#ffffff", fontSize: 28, fontWeight: 600 }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 900,
            }}
          >
            Prepare for cloud certification with confidence
          </div>
          <div
            style={{
              color: "#b6cffb",
              fontSize: 26,
              marginTop: 24,
              maxWidth: 880,
              lineHeight: 1.4,
            }}
          >
            Independent study guides, practice questions, mock exams and cloud
            learning resources.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              color: "#8ab0f6",
              fontSize: 19,
              borderTop: "1px solid rgba(138,176,246,0.35)",
              paddingTop: 18,
              width: "100%",
            }}
          >
            {`${site.domain} · Independent educational resource · Not affiliated with Google Cloud`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

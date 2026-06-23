import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Any WeCon — Freelance Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0B",
          padding: "72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* dotted grid hint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, #1c1c20 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px",
            display: "flex",
          }}
        />

        {/* top row: wordmark */}
        <div style={{ display: "flex", alignItems: "center", zIndex: 1 }}>
          <span
            style={{
              fontSize: 30,
              fontFamily: "monospace",
              color: "#EDEDED",
              fontWeight: 700,
            }}
          >
            any
          </span>
          <span style={{ fontSize: 30, fontFamily: "monospace", color: "#C8FF00", fontWeight: 700 }}>
            .
          </span>
          <span
            style={{
              fontSize: 30,
              fontFamily: "monospace",
              color: "#EDEDED",
              fontWeight: 700,
            }}
          >
            wecon
          </span>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#EDEDED",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>From idea to</span>
            <span style={{ color: "#C8FF00" }}>ready to ship.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: "#6B7280",
              display: "flex",
            }}
          >
            Custom web, mobile & desktop apps · Offline-first
          </div>
        </div>

        {/* bottom row: stack chips */}
        <div style={{ display: "flex", gap: 14, zIndex: 1 }}>
          {["Next.js", "React Native", "Expo", "Supabase", "Tauri"].map((s) => (
            <div
              key={s}
              style={{
                display: "flex",
                border: "1px solid #26262A",
                borderRadius: 8,
                padding: "10px 18px",
                fontSize: 22,
                fontFamily: "monospace",
                color: "#EDEDED",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}

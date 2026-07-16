interface OgCardProps {
  kicker: string;
  title: string;
  subtitle?: string;
}

/**
 * Shared OG image layout, rendered via `next/og`'s ImageResponse (satori).
 * Satori only supports flexbox layouts with inline styles — no Tailwind classes here.
 */
export function OgCard({ kicker, title, subtitle }: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0A0A0A",
        color: "#EDEDED",
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: "#FFB000",
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        {kicker}
      </div>

      <div
        style={{
          display: "flex",
          fontSize: subtitle ? 54 : 64,
          lineHeight: 1.25,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>

      {subtitle && (
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#9A9A9A",
            maxWidth: 900,
          }}
        >
          {subtitle}
        </div>
      )}

      <div style={{ display: "flex", fontSize: 22, color: "#9A9A9A" }}>
        praxeosys.com
      </div>
    </div>
  );
}

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

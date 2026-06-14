import { ImageResponse } from "next/og";

/*
  Shared renderer for the OpenGraph and Twitter card images. Both
  app/opengraph-image.tsx and app/twitter-image.tsx re-export the route config
  below and call renderInstrumentImage(), so the link preview is generated once.

  The image is a miniature of the hero readout: slate-blue ground, a bordered
  "session_audit.log" panel, three mono scan lines (one per offer) each carrying
  a severity badge and its fixed price, signed off with the STACKCLINIC wordmark.
*/

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "StackClinic — your SaaS, audited and fixed. Cold email £750, security audit £500, infrastructure cost audit £600.";

// Tokens mirror app/globals.css. ImageResponse can't read CSS vars, so the
// locked palette is restated here as literal hex.
const GROUND = "#0e1a24";
const SURFACE = "#142430";
const TEXT = "#e8eef2";
const DIM = "#8fa3b0";
const AMBER = "#ffb224";
const CRITICAL = "#ff4d4d";
const PASS = "#3ddc97";
const BORDER = "rgba(143,163,176,0.22)";
const LEADER = "rgba(143,163,176,0.4)";

type Sev = "warn" | "critical";
const SEV_COLOR: Record<Sev, string> = { warn: AMBER, critical: CRITICAL };

const LINES: { label: string; price: string; sev: Sev; tag: string }[] = [
  { label: "cold email setup", price: "£750", sev: "warn", tag: "WARN" },
  { label: "security audit", price: "£500", sev: "critical", tag: "CRITICAL" },
  { label: "infra cost audit", price: "£600", sev: "warn", tag: "WARN" },
];

/* IBM Plex Mono, fetched from the Google Fonts mirror so the card matches the
   site's instrument typography. If the network is unavailable (offline dev or a
   sandboxed build) we fall back to ImageResponse's bundled font — the layout is
   flex-driven, so alignment survives the swap. */
async function loadFonts() {
  const base =
    "https://github.com/google/fonts/raw/main/ofl/ibmplexmono";
  const weights = [
    { file: "IBMPlexMono-Regular.ttf", weight: 400 as const },
    { file: "IBMPlexMono-Medium.ttf", weight: 500 as const },
    { file: "IBMPlexMono-SemiBold.ttf", weight: 600 as const },
  ];
  try {
    return await Promise.all(
      weights.map(async (w) => {
        const res = await fetch(`${base}/${w.file}`);
        if (!res.ok) throw new Error(`font ${w.file}: ${res.status}`);
        return {
          name: "IBM Plex Mono",
          data: await res.arrayBuffer(),
          weight: w.weight,
          style: "normal" as const,
        };
      }),
    );
  } catch {
    return [];
  }
}

function Badge({ sev, tag }: { sev: Sev; tag: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderRadius: 999,
        border: `1px solid ${BORDER}`,
        backgroundColor: "rgba(20,36,48,0.6)",
        padding: "8px 16px",
        fontSize: 20,
        fontWeight: 500,
        letterSpacing: "0.12em",
        color: TEXT,
      }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: 999,
          backgroundColor: SEV_COLOR[sev],
          boxShadow: `0 0 8px ${SEV_COLOR[sev]}`,
        }}
      />
      {tag}
    </div>
  );
}

export async function renderInstrumentImage() {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: GROUND,
          color: TEXT,
          padding: 56,
          fontFamily: "IBM Plex Mono, monospace",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            border: `1px solid ${BORDER}`,
            borderRadius: 24,
            backgroundColor: SURFACE,
          }}
        >
          {/* titlebar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "22px 36px",
              borderBottom: `1px solid ${BORDER}`,
              fontSize: 22,
              letterSpacing: "0.16em",
              color: DIM,
            }}
          >
            <div style={{ display: "flex" }}>session_audit.log</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  backgroundColor: PASS,
                  boxShadow: `0 0 8px ${PASS}`,
                }}
              />
              complete
            </div>
          </div>

          {/* readout body */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 26,
              padding: "28px 40px",
            }}
          >
            <div style={{ display: "flex", fontSize: 26, color: DIM }}>
              &gt; SCANNING VISITOR SESSION...
            </div>

            {LINES.map((line) => (
              <div
                key={line.label}
                style={{ display: "flex", alignItems: "center", gap: 22 }}
              >
                <div style={{ display: "flex", fontSize: 34, color: TEXT }}>
                  &gt; {line.label}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 0,
                    borderBottom: `3px dashed ${LEADER}`,
                    marginBottom: 8,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    fontSize: 44,
                    fontWeight: 600,
                    color: AMBER,
                  }}
                >
                  {line.price}
                </div>
                <Badge sev={line.sev} tag={line.tag} />
              </div>
            ))}
          </div>

          {/* sign-off band */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "26px 40px",
              borderTop: `1px solid ${BORDER}`,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 46,
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              <div style={{ display: "flex", color: TEXT }}>STACK</div>
              <div style={{ display: "flex", color: AMBER }}>CLINIC</div>
            </div>
            <div style={{ display: "flex", fontSize: 24, color: DIM }}>
              your SaaS, audited and fixed.
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    },
  );
}

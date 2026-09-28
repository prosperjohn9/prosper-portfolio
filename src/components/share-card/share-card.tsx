import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/** What a share card shows. Pages build one from their own content. */
export interface ShareCard {
  /** The yellow tag, such as "Note" or "Case study". */
  label: string;
  title: string;
  detail?: string;
  /** The line under the rule. */
  footer: string;
  /** Puts the site's name above the title; off when the title is the name. */
  byline?: string;
  /** Shows the portrait beside the title. */
  portrait?: boolean;
}

/** The size link previews expect, and the format they all read. */
export const shareCardSize = { width: 1200, height: 630 };
export const shareCardType = "image/png";

// The night theme's colours, from globals.css.
const color = {
  night: "#0f1a2e",
  chalk: "#e6eaf2",
  graphite: "#9aa5bd",
  rule: "#2a3650",
  marker: "#ffd84a",
  onMarker: "#14213d",
};

const asset = (path: string) => readFile(join(process.cwd(), "src/assets", path));

// The image renderer cannot read variable fonts, so these are static cuts of
// the site's Archivo: wide at weight 800 for headings, normal width for text.
let assets: ReturnType<typeof loadAssets> | undefined;
async function loadAssets() {
  const [wide, regular, portrait] = await Promise.all([
    asset("fonts/Archivo-Wide-ExtraBold.ttf"),
    asset("fonts/Archivo-Regular.ttf"),
    asset("portrait.jpg"),
  ]);
  return {
    fonts: [
      { name: "Archivo Wide", data: wide, weight: 800 as const },
      { name: "Archivo", data: regular, weight: 400 as const },
    ],
    portrait: `data:image/jpeg;base64,${portrait.toString("base64")}`,
  };
}

/** Longer titles get smaller type, so every card keeps the same margins. */
export function titleSize(title: string): number {
  if (title.length <= 24) return 88;
  if (title.length <= 44) return 80;
  return 68;
}

function Label({ text }: { text: string }) {
  return (
    <div
      style={{
        display: "flex",
        background: color.marker,
        color: color.onMarker,
        fontFamily: "Archivo Wide",
        fontSize: 24,
        lineHeight: 1,
        padding: "9px 14px",
        borderRadius: 4,
      }}
    >
      {text}
    </div>
  );
}

export async function renderShareCard(card: ShareCard): Promise<ImageResponse> {
  const { fonts, portrait } = await (assets ??= loadAssets());
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: color.night,
        color: color.chalk,
        fontFamily: "Archivo",
        padding: "60px 72px 56px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {card.byline ? (
          <div style={{ fontFamily: "Archivo Wide", fontSize: 30 }}>{card.byline}</div>
        ) : null}
        <Label text={card.label} />
      </div>

      <div
        style={{ display: "flex", flexGrow: 1, alignItems: "flex-end", gap: 48, paddingTop: 32 }}
      >
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, flexShrink: 1 }}>
          <div
            style={{
              fontFamily: "Archivo Wide",
              fontSize: card.portrait ? 112 : titleSize(card.title),
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
            }}
          >
            {card.title}
          </div>
          {card.detail ? (
            <div
              style={{
                marginTop: 24,
                fontSize: 31,
                lineHeight: 1.4,
                color: color.graphite,
                maxWidth: 900,
              }}
            >
              {card.detail}
            </div>
          ) : null}
        </div>
        {card.portrait ? (
          // eslint-disable-next-line @next/next/no-img-element -- drawn into a PNG, not a page
          <img src={portrait} alt="" width={232} height={232} style={{ borderRadius: 4 }} />
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 40,
          paddingTop: 22,
          borderTop: `2px solid ${color.rule}`,
          fontSize: 28,
          color: color.graphite,
        }}
      >
        {card.footer}
      </div>
    </div>,
    { ...shareCardSize, fonts },
  );
}

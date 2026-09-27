import { ImageResponse } from "next/og";

/**
 * Default social preview for every route (1200×630). No page ships its own
 * image, so without this a shared link renders as bare text on LinkedIn,
 * WhatsApp and X. Rendered once at build time — nothing here is dynamic.
 *
 * Colours are literal hex because CSS variables do not exist inside Satori.
 */
export const alt = "CrossBorder: ecommerce growth and cross-border selling";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0a0908";
const FG = "#f8f5f3";
const MUTED = "#a9a09b";
const BRAND = "#f0562d";
const BRAND_3 = "#e8b06a";

/**
 * Archivo is the site's display face; Satori's built-in font has no bold, so
 * the headline would render at 400. Fetched once at build time. Asking the CSS
 * API without a browser user agent returns TTF, which Satori can read (it
 * cannot read woff2). On any failure fall back to the default font rather than
 * failing the build.
 */
async function loadArchivo(weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Archivo:wght@${weight}&display=swap`
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [bold, regular] = await Promise.all([loadArchivo(800), loadArchivo(500)]);
  const fonts = [
    ...(bold ? [{ name: "Archivo", data: bold, weight: 800 as const, style: "normal" as const }] : []),
    ...(regular ? [{ name: "Archivo", data: regular, weight: 500 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: BG,
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(240,86,45,0.35), transparent 55%), radial-gradient(circle at 10% 110%, rgba(232,176,106,0.18), transparent 50%)",
          color: FG,
          fontFamily: fonts.length ? "Archivo" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(135deg, ${BRAND}, ${BRAND_3})`,
              color: BG,
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            CB
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 700 }}>CrossBorder</span>
            <span style={{ fontSize: 14, letterSpacing: 6, color: BRAND_3 }}>BUSINESS SOLUTIONS</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>
            We run your storefront
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2,
              backgroundImage: `linear-gradient(90deg, ${FG}, ${BRAND})`,
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            everywhere.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, fontWeight: 500, color: MUTED, maxWidth: 900 }}>
            Marketplaces, ads and Shopify, plus import, tax and compliance in every market you sell
            into.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #3f3431",
            paddingTop: 24,
            fontSize: 20,
            color: MUTED,
            letterSpacing: 2,
          }}
        >
          <span>100+ BRANDS · 15+ MARKETPLACES · 8+ COUNTRIES</span>
          <span style={{ color: FG }}>cbbusinesssolution.com</span>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}

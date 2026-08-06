import { ImageResponse } from "next/og";

import { locales, isLocale, defaultLocale } from "@/i18n/config";
import en from "@/i18n/dictionaries/en";
import { logoDataUri } from "@/lib/brand-image";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = en.meta.title;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * The social card.
 *
 * Deliberately Latin-only: `next/og` ships a single Latin face (Geist Regular)
 * and this route may not fetch a font over the network, so Persian and Arabic
 * copy would rasterise as empty boxes. The card therefore carries the Latin
 * lockup for all three locales and marks the language with an ISO chip; the
 * localized title still travels in the `og:title` meta tag beside it.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const iso = (isLocale(locale) ? locale : defaultLocale).toUpperCase();
  const logo = await logoDataUri("light");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 72px",
          backgroundColor: "#041624",
          backgroundImage:
            "radial-gradient(1100px 700px at 6% -16%, rgba(23,162,191,0.30), rgba(4,22,36,0)), radial-gradient(760px 600px at 98% 8%, rgba(15,59,92,0.85), rgba(4,22,36,0))",
          color: "#ffffff",
        }}
      >
        {/* ── lockup + language chip ───────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <img
              src={logo}
              alt=""
              width={86}
              height={86}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 42,
                  letterSpacing: 3,
                  color: "#ffffff",
                }}
              >
                TarianaOxin
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 17,
                  letterSpacing: 6,
                  color: "#94adc1",
                }}
              >
                DISPOSABLE TABLEWARE
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 46,
              padding: "0 20px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.26)",
              fontSize: 20,
              letterSpacing: 5,
              color: "#d6e4ef",
            }}
          >
            {iso}
          </div>
        </div>

        {/* ── the claim ────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 26,
            maxWidth: 1010,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 62,
              lineHeight: 1.14,
              letterSpacing: -1.4,
              color: "#ffffff",
            }}
          >
            {en.meta.title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              letterSpacing: 0.2,
              color: "#94adc1",
            }}
          >
            {en.brand.tagline}
          </div>
        </div>

        {/* ── the machine marking ──────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 320,
              height: 6,
              backgroundColor: "#17a2bf",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 21,
              letterSpacing: 2,
              color: "#94adc1",
            }}
          >
            tarianaoxin.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

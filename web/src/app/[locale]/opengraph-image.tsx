import { ImageResponse } from "next/og";

import { locales, isLocale, defaultLocale } from "@/i18n/config";
import en from "@/i18n/dictionaries/en";

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
            <svg width="86" height="86" viewBox="0 0 48 48">
              <rect width="48" height="48" rx="13" fill="#0d3552" />
              <path
                d="M15.2 8.5 L32.8 19.5"
                stroke="#4fd6ea"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M32.8 8.5 L15.2 19.5"
                stroke="#4fd6ea"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M13.6 17.8 H34.4 L31.1 36.2 A3.4 3.4 0 0 1 27.75 39 H20.25 A3.4 3.4 0 0 1 16.9 36.2 Z"
                fill="#ffffff"
              />
            </svg>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 42,
                  letterSpacing: 3,
                  color: "#ffffff",
                }}
              >
                TARIANAOXIN
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

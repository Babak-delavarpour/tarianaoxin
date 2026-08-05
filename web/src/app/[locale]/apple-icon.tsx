import { ImageResponse } from "next/og";

import { locales } from "@/i18n/config";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Lives under `[locale]` rather than at the app root because `src/proxy.ts`
 * redirects any extension-less root path into a locale — a root `/apple-icon`
 * would never resolve.
 *
 * iOS masks and shines this itself, so it ships square, full-bleed and with a
 * 20px safe inset: the same simplified mark as `public/icon.svg`, with no
 * stroke thin enough to vanish when the home screen scales it down.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#041624",
        }}
      >
        <svg width="140" height="140" viewBox="0 0 48 48">
          <path d="M10.4 10 H37.6 L36.6 15 H11.4 Z" fill="#4fd6ea" />
          <path
            d="M11.4 15 H36.6 L32.7 33.1 A3.8 3.8 0 0 1 28.9 36 H19.1 A3.8 3.8 0 0 1 15.3 33.1 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";

import { locales } from "@/i18n/config";
import { logoDataUri } from "@/lib/brand-image";

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
 * The installed icon uses the exact approved generated PNG.
 */
export default async function AppleIcon() {
  const logo = await logoDataUri();

  return new ImageResponse(
    (
      <img
        src={logo}
        alt=""
        width={180}
        height={180}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    ),
    { ...size },
  );
}

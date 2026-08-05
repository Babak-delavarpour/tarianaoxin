import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { SITE_URL } from "@/components/seo/JsonLd";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The cart is per-visitor state, not a document.
        disallow: ["/cart", ...locales.map((l) => `/${l}/cart`)],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

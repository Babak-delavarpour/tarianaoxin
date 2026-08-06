import type { MetadataRoute } from "next";

import { defaultLocale, localePath } from "@/i18n/config";
import en from "@/i18n/dictionaries/en";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${en.brand.name} — ${en.brand.tagline}`,
    short_name: en.brand.name,
    description: en.meta.description,
    // Farsi is the primary language, so an installed app opens there.
    start_url: localePath(defaultLocale),
    scope: "/",
    display: "standalone",
    theme_color: "#08243b",
    background_color: "#041624",
    orientation: "portrait-primary",
    categories: ["business", "shopping"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { products } from "@/lib/catalog";
import { localeUrl, languageAlternates } from "@/components/seo/JsonLd";

/** Locale-agnostic paths, ordered by importance. `/cart` is deliberately absent. */
const staticPaths = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/shop", priority: 0.9, changeFrequency: "weekly" },
  { path: "/products", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const paths = [
    ...staticPaths,
    ...products.map((p) => ({
      path: `/shop/${p.slug}`,
      priority: 0.7,
      changeFrequency: "weekly" as const,
    })),
  ];

  // Every locale gets its own entry, each carrying the full hreflang set so
  // Google can cluster the three language versions of the same document.
  return paths.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => ({
      url: localeUrl(locale, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}

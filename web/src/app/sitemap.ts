import type { MetadataRoute } from "next";

import { defaultLocale, locales, localeMeta } from "@/i18n/config";
import { products } from "@/lib/catalog";
import { localeUrl, languageAlternates } from "@/components/seo/JsonLd";

/** Locale-agnostic paths, ordered by importance. `/cart` is deliberately absent. */
const staticPaths = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/products", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const informationalEntries = staticPaths.flatMap(
    ({ path, priority, changeFrequency }) =>
      locales.map((locale) => ({
        url: localeUrl(locale, path),
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages: languageAlternates(path) },
      })),
  );

  const commercePaths = [
    { path: "/shop", priority: 0.9, changeFrequency: "weekly" as const },
    ...products.map((p) => ({
      path: `/shop/${p.slug}`,
      priority: 0.7,
      changeFrequency: "weekly" as const,
    })),
  ];

  const commerceEntries = commercePaths.map(
    ({ path, priority, changeFrequency }) => ({
      url: localeUrl(defaultLocale, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          [localeMeta[defaultLocale].htmlLang]: localeUrl(defaultLocale, path),
          "x-default": localeUrl(defaultLocale, path),
        },
      },
    }),
  );

  return [...informationalEntries, ...commerceEntries];
}

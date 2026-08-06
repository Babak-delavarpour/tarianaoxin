import type { Metadata } from "next";

import {
  locales,
  localeMeta,
  defaultLocale,
  localePath,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { getCategory, type Product } from "@/lib/catalog";

/* ------------------------------------------------------------------ *
 * Canonical origin + URL helpers
 * ------------------------------------------------------------------ */

/** Absolute origin. Kept here so every canonical/alternate/JSON-LD @id agrees. */
export const SITE_URL = "https://tarianaoxin.com";

/** Latin-locked constants used by both the metadata and the JSON-LD graph. */
export const ORG = {
  email: "sales@tarianaoxin.com",
  telephone: "+986132215923",
  street: "Industrial Zone 2",
  city: "Ahvaz",
  region: "Khuzestan",
  country: "IR",
} as const;

/** Converts a locale-aware public path to an absolute URL. */
export function localeUrl(locale: Locale, path = "") {
  return `${SITE_URL}${localePath(locale, path)}`;
}

/**
 * hreflang map for a locale-agnostic path. `x-default` points at Farsi,
 * which is the site's primary language and the proxy's fallback.
 */
export function languageAlternates(path = "") {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeMeta[l].htmlLang] = localeUrl(l, path);
  languages["x-default"] = localeUrl(defaultLocale, path);
  return languages;
}

/**
 * The single place page-level `generateMetadata` builds its object, so
 * canonical, hreflang and Open Graph can never drift apart.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const t = getDictionary(locale);
  const url = localeUrl(locale, path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: t.brand.name,
      locale: localeMeta[locale].htmlLang,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ------------------------------------------------------------------ *
 * The emitter
 * ------------------------------------------------------------------ */

/**
 * Server-only. `<` is escaped so a stray character in catalogue copy can
 * never terminate the script element early.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/* ------------------------------------------------------------------ *
 * Graph nodes
 * ------------------------------------------------------------------ */

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

function organizationNode(locale: Locale) {
  const t = getDictionary(locale);
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: t.brand.name,
    legalName: t.brand.legal,
    alternateName: locale === "en" ? "تاریانا اکسین" : "TarianaOxin",
    url: localeUrl(locale),
    description: t.meta.description,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/brand/tarianaoxin-to-concept.png`,
      width: 1254,
      height: 1254,
    },
    image: `${SITE_URL}${localePath(locale, "/opengraph-image")}`,
    email: ORG.email,
    telephone: ORG.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: ORG.street,
      addressLocality: ORG.city,
      addressRegion: ORG.region,
      addressCountry: ORG.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: ORG.telephone,
        email: ORG.email,
        availableLanguage: ["fa", "en", "ar"],
      },
    ],
  };
}

function websiteNode(locale: Locale) {
  const t = getDictionary(locale);
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: localeUrl(locale),
    name: t.brand.name,
    description: t.meta.description,
    inLanguage: localeMeta[locale].htmlLang,
    publisher: { "@id": ORG_ID },
  };
}

/**
 * Organization + WebSite. Rendered on every page: the `@id`s are stable, so
 * consumers treat repeated appearances as one entity rather than many.
 */
export function SiteJsonLd({ locale }: { locale: Locale }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [organizationNode(locale), websiteNode(locale)],
      }}
    />
  );
}

export type Crumb = { name: string; path: string };

/** `crumbs` are locale-agnostic paths; the home crumb is prepended here. */
export function BreadcrumbJsonLd({
  locale,
  crumbs,
}: {
  locale: Locale;
  crumbs: Crumb[];
}) {
  const t = getDictionary(locale);
  const all: Crumb[] = [{ name: t.nav.home, path: "" }, ...crumbs];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: all.map((crumb, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: crumb.name,
          item: localeUrl(locale, crumb.path),
        })),
      }}
    />
  );
}

const availability: Record<Product["stock"], string> = {
  in: "https://schema.org/InStock",
  low: "https://schema.org/LimitedAvailability",
  out: "https://schema.org/OutOfStock",
};

/** Product + Offer + AggregateRating, driven entirely by `src/lib/catalog.ts`. */
export function ProductJsonLd({
  locale,
  product,
}: {
  locale: Locale;
  product: Product;
}) {
  const t = getDictionary(locale);
  const category = getCategory(product.category);
  const url = localeUrl(locale, `/shop/${product.slug}`);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${url}#product`,
        name: product.name[locale],
        description: product.description[locale],
        sku: product.sku,
        mpn: product.sku,
        url,
        image: `${SITE_URL}${localePath(locale, "/opengraph-image")}`,
        inLanguage: localeMeta[locale].htmlLang,
        category: category?.name[locale],
        material: product.material[locale],
        brand: { "@type": "Brand", name: t.brand.name },
        manufacturer: { "@id": ORG_ID },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: t.common.capacity,
            value: product.capacity[locale],
          },
          {
            "@type": "PropertyValue",
            name: t.common.packSize,
            value: product.packSize[locale],
          },
          {
            "@type": "PropertyValue",
            name: t.common.moq,
            value: product.moq[locale],
          },
        ],
        offers: {
          "@type": "Offer",
          url,
          price: product.price.toFixed(2),
          priceCurrency: "USD",
          availability: availability[product.stock],
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": ORG_ID },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviews,
          bestRating: 5,
          worstRating: 1,
        },
      }}
    />
  );
}

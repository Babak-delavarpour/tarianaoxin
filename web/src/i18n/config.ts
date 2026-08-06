/** Farsi leads: it is the site's primary language and the fallback. */
export const locales = ["fa", "en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fa";

export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  fa: "rtl",
  ar: "rtl",
};

export const localeMeta: Record<
  Locale,
  { name: string; englishName: string; flag: string; htmlLang: string }
> = {
  en: { name: "English", englishName: "English", flag: "🇬🇧", htmlLang: "en" },
  fa: { name: "فارسی", englishName: "Persian", flag: "🇮🇷", htmlLang: "fa-IR" },
  ar: { name: "العربية", englishName: "Arabic", flag: "🇦🇪", htmlLang: "ar" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Builds the public URL for a locale. Persian owns the clean, unprefixed
 * routes; secondary languages keep an explicit locale segment.
 */
export function localePath(locale: Locale, path = "/") {
  const suffix =
    path === "" || path === "/"
      ? ""
      : path.startsWith("/")
        ? path
        : `/${path}`;
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  return `${prefix}${suffix}` || "/";
}

/** Converts an internal `/fa/...` rewrite path back to its public form. */
export function publicPathname(pathname: string) {
  const prefix = `/${defaultLocale}`;
  if (pathname === prefix) return "/";
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  return pathname;
}

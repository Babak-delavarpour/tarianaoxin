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

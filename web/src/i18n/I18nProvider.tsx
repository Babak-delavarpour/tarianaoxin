"use client";

import { createContext, useContext, useMemo } from "react";
import type { Locale } from "./config";
import { localeDirection } from "./config";
import type { Dictionary } from "./dictionaries/en";

type I18nValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  isRtl: boolean;
  t: Dictionary;
  /** Prefixes an app path with the active locale. */
  href: (path: string) => string;
  /** Formats a number using the locale's native digits. */
  num: (value: number) => string;
  /** Formats a price with the locale's currency label. */
  price: (value: number) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

const numberLocale: Record<Locale, string> = {
  en: "en-US",
  fa: "fa-IR",
  ar: "ar-EG",
};

export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo<I18nValue>(() => {
    const dir = localeDirection[locale];
    const num = (v: number) =>
      new Intl.NumberFormat(numberLocale[locale], {
        maximumFractionDigits: 2,
      }).format(v);

    return {
      locale,
      dir,
      isRtl: dir === "rtl",
      t: dictionary,
      href: (path: string) =>
        `/${locale}${path === "/" ? "" : path.startsWith("/") ? path : `/${path}`}`,
      num,
      price: (v: number) =>
        locale === "fa"
          ? `${num(Math.round(v * 1000))} ${dictionary.common.currency}`
          : `${dictionary.common.currency}${num(v)}`,
    };
  }, [locale, dictionary]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

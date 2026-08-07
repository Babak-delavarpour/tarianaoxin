"use client";

import { CtaBand } from "./CtaBand";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Section 11 of the home chapter plan. The band itself lives in
 * `CtaBand` (shared with /about and /products) so the page's closing
 * statement is identical everywhere it appears; this only binds the
 * home dictionary to it.
 */
export function HomeCta() {
  const { t, locale } = useI18n();
  if (locale !== "fa") return null;

  return (
    <CtaBand
      title={t.home.cta.title}
      body={t.home.cta.body}
      primary={t.home.cta.primary}
      primaryHref="/contact"
      secondary={t.home.cta.secondary}
      secondaryHref="/shop"
    />
  );
}

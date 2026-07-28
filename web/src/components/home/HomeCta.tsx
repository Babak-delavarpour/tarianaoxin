"use client";

import { CtaBand } from "./CtaBand";
import { useI18n } from "@/i18n/I18nProvider";

export function HomeCta() {
  const { t } = useI18n();
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

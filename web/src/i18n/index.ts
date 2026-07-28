import { defaultLocale, type Locale } from "./config";
import en, { type Dictionary } from "./dictionaries/en";
import fa from "./dictionaries/fa";
import ar from "./dictionaries/ar";

/** English defines the shape; Farsi is what an unknown locale falls back to. */
const dictionaries: Record<Locale, Dictionary> = { fa, en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export type { Dictionary };

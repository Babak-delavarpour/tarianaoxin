import { Outfit, Vazirmatn, Cairo } from "next/font/google";
import type { Locale } from "@/i18n/config";

/**
 * All three faces are loaded as CSS variables on the locale root;
 * `[data-locale]` in globals.css decides which one `--font-locale` resolves
 * to. Shared so the locale layout and the standalone 404 shell stay in sync.
 */
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const fontVariables = `${outfit.variable} ${vazirmatn.variable} ${cairo.variable}`;

/**
 * Apply the active face directly as well as through the CSS variable. This
 * prevents a missing or temporarily unresolved custom property from silently
 * falling back to an OS font, which is especially noticeable for Persian.
 */
export const localeFontClassName: Record<Locale, string> = {
  fa: vazirmatn.className,
  en: outfit.className,
  ar: cairo.className,
};

import { Outfit, Vazirmatn, Cairo } from "next/font/google";
import type { Locale } from "@/i18n/config";

/**
 * All three faces are loaded as CSS variables on the locale root;
 * `[data-locale]` in globals.css decides which one `--font-locale` resolves
 * to. Shared so the locale layout and the standalone 404 shell stay in sync.
 *
 * All three are variable fonts, so the full 100–900 axis ships in one file —
 * which the type registers need: `font-extrabold` (800) is used by the home
 * hero h1 and by `fs-numeral`, and `font-semibold` (600) carries every card
 * and row title.
 *
 * `fallback` names only faces that actually exist on the target platforms —
 * a fallback that never resolves silently drops to the browser default and
 * makes the metric adjustment `adjustFontFallback` computes meaningless.
 */
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  fallback: ["Segoe UI", "system-ui", "Helvetica Neue", "Arial", "sans-serif"],
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
  fallback: ["Tahoma", "Segoe UI", "Noto Naskh Arabic", "Arial", "sans-serif"],
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  fallback: ["Tahoma", "Segoe UI", "Noto Naskh Arabic", "Arial", "sans-serif"],
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

import { Outfit, Vazirmatn, Lalezar, Cairo } from "next/font/google";
import localFont from "next/font/local";
import type { Locale } from "@/i18n/config";

/**
 * Locale typography is loaded as CSS variables on the document root;
 * `[data-locale]` in globals.css assigns body, heading and display roles.
 * Persian deliberately uses three faces, while English and Arabic keep their
 * existing single-family systems. Shared so the locale layout and standalone
 * 404 shell stay in sync.
 *
 * The body and heading families are variable fonts, so their full weight axes
 * ship efficiently. Lalezar is intentionally limited to its native 400 weight
 * in the large display registers, where synthetic bolding is disabled in CSS.
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

const estedad = localFont({
  src: "./font-assets/Estedad-Variable.woff2",
  variable: "--font-estedad",
  weight: "100 900",
  style: "normal",
  display: "swap",
  preload: false,
  fallback: [
    "Tahoma",
    "Segoe UI",
    "Noto Naskh Arabic",
    "Arial",
    "sans-serif",
  ],
});

const lalezar = Lalezar({
  weight: "400",
  subsets: ["arabic", "latin"],
  variable: "--font-lalezar",
  display: "swap",
  preload: false,
  fallback: [
    "Tahoma",
    "Segoe UI",
    "Noto Naskh Arabic",
    "Arial",
    "sans-serif",
  ],
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  fallback: ["Tahoma", "Segoe UI", "Noto Naskh Arabic", "Arial", "sans-serif"],
});

export const fontVariables = `${outfit.variable} ${vazirmatn.variable} ${estedad.variable} ${lalezar.variable} ${cairo.variable}`;

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

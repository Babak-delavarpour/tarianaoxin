import { Outfit, Vazirmatn, Cairo } from "next/font/google";

/**
 * All three faces are loaded as CSS variables on <body>; `[data-locale]` in
 * globals.css decides which one `--font-locale` resolves to. Shared so the
 * locale layout and the standalone 404 shell stay in sync.
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

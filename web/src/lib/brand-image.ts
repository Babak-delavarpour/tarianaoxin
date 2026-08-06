import { readFile } from "node:fs/promises";
import { join } from "node:path";

const LOGO_FILES = {
  dark: "tarianaoxin-logo-512.png",
  light: "tarianaoxin-logo-light-512.png",
} as const;

/** Data URI for server-rendered ImageResponse routes. */
export async function logoDataUri(tone: keyof typeof LOGO_FILES = "dark") {
  const logoPath = join(process.cwd(), "public", "brand", LOGO_FILES[tone]);
  const bytes = await readFile(logoPath);
  return `data:image/png;base64,${bytes.toString("base64")}`;
}

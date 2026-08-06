import { readFile } from "node:fs/promises";
import { join } from "node:path";

const LOGO_PATH = join(
  process.cwd(),
  "public",
  "brand",
  "tarianaoxin-to-concept.png",
);

/** Data URI for server-rendered ImageResponse routes. */
export async function logoDataUri() {
  const bytes = await readFile(LOGO_PATH);
  return `data:image/png;base64,${bytes.toString("base64")}`;
}

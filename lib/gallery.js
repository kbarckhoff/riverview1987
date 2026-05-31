import fs from "fs";
import path from "path";

// Files in public/gallery that are NOT throwback photos (logos, posters, etc.)
const EXCLUDE = new Set([
  "oaks-marquee.jpg",
  "oaks-poster-final-1.jpeg",
  "oaks-poster-final-1-horizontal.jpeg",
  "Oaks Reunion.png",
  "screenshot-2026-05-31-at-32014pm.png",
  "README.txt",
]);
const IMG = /\.(jpe?g|png|gif|webp)$/i;

export function getGalleryImages() {
  try {
    const dir = path.join(process.cwd(), "public", "gallery");
    return fs
      .readdirSync(dir)
      .filter((f) => IMG.test(f) && !EXCLUDE.has(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => `/gallery/${encodeURIComponent(f)}`);
  } catch {
    return [];
  }
}

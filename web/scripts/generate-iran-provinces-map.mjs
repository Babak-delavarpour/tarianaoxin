import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(
  here,
  "../../-resources/map/geoBoundaries-IRN-ADM1 (1).geojson",
);
const output = resolve(here, "../public/iran-provinces.svg");

const geojson = JSON.parse(await readFile(source, "utf8"));
const tolerance = 0.018;

function squaredSegmentDistance(point, start, end) {
  let x = start[0];
  let y = start[1];
  let dx = end[0] - x;
  let dy = end[1] - y;

  if (dx !== 0 || dy !== 0) {
    const t =
      ((point[0] - x) * dx + (point[1] - y) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      x = end[0];
      y = end[1];
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }

  dx = point[0] - x;
  dy = point[1] - y;
  return dx * dx + dy * dy;
}

function simplifySection(points, first, last, squaredTolerance, kept) {
  let maxDistance = squaredTolerance;
  let index = 0;

  for (let i = first + 1; i < last; i += 1) {
    const distance = squaredSegmentDistance(points[i], points[first], points[last]);
    if (distance > maxDistance) {
      index = i;
      maxDistance = distance;
    }
  }

  if (!index) return;
  if (index - first > 1) {
    simplifySection(points, first, index, squaredTolerance, kept);
  }
  kept.push(points[index]);
  if (last - index > 1) {
    simplifySection(points, index, last, squaredTolerance, kept);
  }
}

function simplifyRing(ring) {
  if (ring.length <= 5) return ring;
  const points = ring.slice(0, -1);
  const kept = [points[0]];
  simplifySection(points, 0, points.length - 1, tolerance ** 2, kept);
  kept.push(points.at(-1));
  if (kept.length < 3) return ring;
  return [...kept, kept[0]];
}

function polygonsOf(geometry) {
  return geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
}

let minLongitude = Infinity;
let maxLongitude = -Infinity;
let minLatitude = Infinity;
let maxLatitude = -Infinity;
for (const feature of geojson.features) {
  for (const polygon of polygonsOf(feature.geometry)) {
    for (const ring of polygon) {
      for (const [longitude, latitude] of ring) {
        minLongitude = Math.min(minLongitude, longitude);
        maxLongitude = Math.max(maxLongitude, longitude);
        minLatitude = Math.min(minLatitude, latitude);
        maxLatitude = Math.max(maxLatitude, latitude);
      }
    }
  }
}

const meanLatitude = (minLatitude + maxLatitude) / 2;
const longitudeScale = Math.cos((meanLatitude * Math.PI) / 180);
const projectedWidth = (maxLongitude - minLongitude) * longitudeScale;
const projectedHeight = maxLatitude - minLatitude;
const padding = 18;
const width = 720;
const scale = (width - padding * 2) / projectedWidth;
const height = Math.round(projectedHeight * scale + padding * 2);
const fills = ["#d6e4ef", "#a6e6f0", "#6bd3e5", "#b3c8d9", "#35bad5"];

function project([longitude, latitude]) {
  const x = padding + (longitude - minLongitude) * longitudeScale * scale;
  const y = padding + (maxLatitude - latitude) * scale;
  return `${x.toFixed(2)} ${y.toFixed(2)}`;
}

function pathFor(feature) {
  return polygonsOf(feature.geometry)
    .flatMap((polygon) =>
      polygon.map((ring) => {
        const points = simplifyRing(ring);
        return `M ${points.map(project).join(" L ")} Z`;
      }),
    )
    .join(" ");
}

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

const provinces = new Map();
for (const feature of geojson.features) {
  const name = feature.properties.shapeName || "Unnamed province";
  const parts = provinces.get(name) || [];
  parts.push(feature);
  provinces.set(name, parts);
}

const provincePaths = [...provinces.entries()]
  .map(([rawName, features], index) => {
    const name = escapeXml(rawName);
    const paths = features.map(pathFor).join(" ");
    return `  <path data-province="${name}" d="${paths}" fill="${fills[index % fills.length]}" tabindex="0" focusable="true" role="img" aria-label="${name}"><title>${name}</title></path>`;
  })
  .join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="iran-map-title iran-map-description">
  <title id="iran-map-title">Iran province map</title>
  <desc id="iran-map-description">Iran with the boundaries of all thirty-one provinces.</desc>
  <g fill-rule="evenodd" stroke="#08243b" stroke-width="1.35" stroke-linejoin="round" vector-effect="non-scaling-stroke">
${provincePaths}
  </g>
</svg>
`;

await mkdir(dirname(output), { recursive: true });
await writeFile(output, svg, "utf8");
console.log(`Generated ${output} (${Buffer.byteLength(svg)} bytes)`);

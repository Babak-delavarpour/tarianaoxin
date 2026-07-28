import type { ArtKey } from "@/lib/catalog";

/**
 * Vector product illustrations. Every SKU in the catalogue is drawn rather
 * than photographed, so the shop stays perfectly consistent and weightless.
 * Gradient ids are keyed per art so repeated instances share one definition.
 */

type Props = { art: ArtKey; className?: string };

function Defs({ k }: { k: string }) {
  return (
    <defs>
      <linearGradient id={`${k}-body`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="55%" stopColor="#eef4f9" />
        <stop offset="100%" stopColor="#c6d5e0" />
      </linearGradient>
      <linearGradient id={`${k}-accent`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0f3b5c" />
        <stop offset="100%" stopColor="#17a2bf" />
      </linearGradient>
      <linearGradient id={`${k}-aqua`} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#0b7a96" />
        <stop offset="100%" stopColor="#6bd3e5" />
      </linearGradient>
      <linearGradient id={`${k}-kraft`} x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stopColor="#f3d3a8" />
        <stop offset="100%" stopColor="#dc9d51" />
      </linearGradient>
      <linearGradient id={`${k}-shine`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.15" />
      </linearGradient>
    </defs>
  );
}

const shadow = (
  <ellipse cx="80" cy="139" rx="42" ry="7" fill="#0b2e4a" opacity="0.1" />
);

function Art({ art }: { art: ArtKey }) {
  const k = `pa-${art}`;
  switch (art) {
    case "cup":
      return (
        <>
          <Defs k={k} />
          {shadow}
          <path
            d="M46 40 h68 l-9 88 a8 8 0 0 1 -8 7.4 h-34 a8 8 0 0 1 -8 -7.4 Z"
            fill={`url(#${k}-body)`}
          />
          <path d="M46 40 h68 l-1.6 15 h-64.8 Z" fill={`url(#${k}-accent)`} />
          <ellipse cx="80" cy="40" rx="34" ry="7.5" fill="#f7fafc" />
          <ellipse
            cx="80"
            cy="40"
            rx="34"
            ry="7.5"
            fill="none"
            stroke="#0f3b5c"
            strokeWidth="2.4"
            opacity="0.5"
          />
          <path
            d="M58 58 l-4 68"
            stroke={`url(#${k}-shine)`}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M52 88 h56"
            stroke="#17a2bf"
            strokeWidth="3"
            opacity="0.35"
            strokeLinecap="round"
          />
        </>
      );

    case "paperCup":
      return (
        <>
          <Defs k={k} />
          {shadow}
          <path
            d="M42 34 c8 -4 68 -4 76 0 l-11 96 a9 9 0 0 1 -9 8 h-36 a9 9 0 0 1 -9 -8 Z"
            fill={`url(#${k}-body)`}
          />
          <path
            d="M48.6 92 h62.8 l-4.4 38 a9 9 0 0 1 -9 8 h-36 a9 9 0 0 1 -9 -8 Z"
            fill={`url(#${k}-accent)`}
          />
          <path
            d="M50 74 h60"
            stroke="#17a2bf"
            strokeWidth="3.4"
            opacity="0.4"
            strokeLinecap="round"
          />
          <ellipse cx="80" cy="34" rx="38" ry="8.5" fill="#ffffff" />
          <ellipse
            cx="80"
            cy="34"
            rx="38"
            ry="8.5"
            fill="none"
            stroke="#0f3b5c"
            strokeWidth="2.6"
            opacity="0.45"
          />
          <ellipse cx="80" cy="34" rx="30" ry="5.6" fill="#d3f4fb" />
          <path
            d="M66 18 q6 -8 0 -16 M80 14 q6 -9 0 -18 M94 18 q6 -8 0 -16"
            stroke="#35bad5"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
        </>
      );

    case "plate":
      return (
        <>
          <Defs k={k} />
          <ellipse cx="80" cy="126" rx="52" ry="10" fill="#0b2e4a" opacity="0.1" />
          <ellipse cx="80" cy="86" rx="62" ry="34" fill={`url(#${k}-body)`} />
          <ellipse
            cx="80"
            cy="82"
            rx="62"
            ry="34"
            fill="#ffffff"
            stroke="#c6d5e0"
            strokeWidth="1.6"
          />
          <ellipse
            cx="80"
            cy="82"
            rx="47"
            ry="25"
            fill="none"
            stroke={`url(#${k}-accent)`}
            strokeWidth="2.6"
            opacity="0.55"
          />
          <ellipse cx="80" cy="82" rx="33" ry="17" fill="#eef4f9" />
          <path
            d="M34 70 q22 -14 46 -14"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.9"
            fill="none"
          />
        </>
      );

    case "bowl":
      return (
        <>
          <Defs k={k} />
          {shadow}
          <path
            d="M26 62 h108 a54 54 0 0 1 -54 68 a54 54 0 0 1 -54 -68 Z"
            fill={`url(#${k}-body)`}
          />
          <path
            d="M32 96 h96 a54 54 0 0 1 -48 34 a54 54 0 0 1 -48 -34 Z"
            fill={`url(#${k}-accent)`}
            opacity="0.9"
          />
          <ellipse cx="80" cy="62" rx="54" ry="13" fill="#ffffff" />
          <ellipse
            cx="80"
            cy="62"
            rx="54"
            ry="13"
            fill="none"
            stroke="#0f3b5c"
            strokeWidth="2.4"
            opacity="0.4"
          />
          <ellipse cx="80" cy="62" rx="44" ry="9" fill="#d3f4fb" />
          <path
            d="M44 78 q10 16 26 20"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
        </>
      );

    case "cutlery":
      return (
        <>
          <Defs k={k} />
          {shadow}
          <g transform="rotate(-14 80 80)">
            {/* spoon */}
            <ellipse cx="46" cy="42" rx="15" ry="21" fill={`url(#${k}-body)`} />
            <ellipse cx="46" cy="42" rx="9" ry="14" fill="#c6d5e0" opacity="0.5" />
            <rect x="41" y="60" width="10" height="70" rx="5" fill={`url(#${k}-accent)`} />
          </g>
          <g transform="rotate(4 80 80)">
            {/* fork */}
            <path
              d="M74 22 v26 M82 22 v26 M90 22 v26"
              stroke={`url(#${k}-body)`}
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M68 46 q14 14 28 0 v10 q0 8 -9 10 v56 a5 5 0 0 1 -10 0 v-56 q-9 -2 -9 -10 Z"
              fill={`url(#${k}-accent)`}
            />
          </g>
          <g transform="rotate(20 80 80)">
            {/* knife */}
            <path
              d="M116 22 q13 22 8 46 l-11 0 Z"
              fill={`url(#${k}-body)`}
            />
            <rect x="107" y="66" width="10" height="64" rx="5" fill={`url(#${k}-aqua)`} />
          </g>
        </>
      );

    case "container":
      return (
        <>
          <Defs k={k} />
          {shadow}
          {/* lid */}
          <path
            d="M24 52 h112 l-6 16 h-100 Z"
            fill={`url(#${k}-accent)`}
          />
          <path d="M30 44 h100 l6 8 h-112 Z" fill={`url(#${k}-aqua)`} />
          {/* base */}
          <path
            d="M30 70 h100 l-9 56 a9 9 0 0 1 -9 8 h-64 a9 9 0 0 1 -9 -8 Z"
            fill={`url(#${k}-body)`}
          />
          <path
            d="M40 84 h80"
            stroke="#c6d5e0"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M42 100 l-3 26"
            stroke={`url(#${k}-shine)`}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <rect x="66" y="52" width="28" height="16" rx="4" fill="#ffffff" opacity="0.4" />
        </>
      );

    case "tray":
      return (
        <>
          <Defs k={k} />
          <ellipse cx="80" cy="128" rx="56" ry="9" fill="#0b2e4a" opacity="0.1" />
          <path
            d="M18 60 h124 l-16 62 h-92 Z"
            fill={`url(#${k}-body)`}
          />
          <path d="M18 60 h124 l-4 15 h-116 Z" fill={`url(#${k}-accent)`} />
          <path
            d="M30 82 h44 l-8 32 h-44 Z"
            fill="#eef4f9"
            stroke="#c6d5e0"
            strokeWidth="1.6"
          />
          <path
            d="M84 82 h44 l-8 32 h-44 Z"
            fill="#d3f4fb"
            stroke="#a6e6f0"
            strokeWidth="1.6"
          />
          <path
            d="M18 60 h124"
            stroke="#ffffff"
            strokeWidth="3"
            opacity="0.6"
          />
        </>
      );

    case "lid":
      return (
        <>
          <Defs k={k} />
          {shadow}
          <path
            d="M22 104 a58 46 0 0 1 116 0 Z"
            fill={`url(#${k}-body)`}
            opacity="0.95"
          />
          <path
            d="M34 96 a46 36 0 0 1 92 0"
            fill="none"
            stroke="#ffffff"
            strokeWidth="6"
            opacity="0.8"
          />
          <rect x="18" y="102" width="124" height="16" rx="8" fill={`url(#${k}-accent)`} />
          <path
            d="M74 52 h12 v22 h-12 Z"
            fill={`url(#${k}-aqua)`}
          />
          <path
            d="M80 42 l16 26 M80 42 l-16 26"
            stroke="#0f3b5c"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.35"
          />
        </>
      );

    case "straw":
      return (
        <>
          <Defs k={k} />
          {shadow}
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`rotate(${-16 + i * 16} 80 80)`}>
              <rect
                x={64 + i * 16}
                y="16"
                width="13"
                height="118"
                rx="6.5"
                fill={i === 1 ? `url(#${k}-accent)` : `url(#${k}-body)`}
              />
              {[0, 1, 2, 3, 4].map((s) => (
                <rect
                  key={s}
                  x={64 + i * 16}
                  y={26 + s * 22}
                  width="13"
                  height="9"
                  fill={i === 1 ? "#a6e6f0" : "#17a2bf"}
                  opacity={i === 1 ? 0.9 : 0.5}
                />
              ))}
            </g>
          ))}
        </>
      );

    case "napkin":
      return (
        <>
          <Defs k={k} />
          {shadow}
          <path d="M26 106 h108 l-8 22 h-92 Z" fill="#c6d5e0" />
          <path d="M26 88 h108 l-6 20 h-96 Z" fill="#eef4f9" />
          <path
            d="M30 30 h100 a4 4 0 0 1 4 4 v56 h-108 v-56 a4 4 0 0 1 4 -4 Z"
            fill={`url(#${k}-body)`}
          />
          <path
            d="M80 30 v60"
            stroke="#c6d5e0"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <path
            d="M44 46 h32 M44 60 h32"
            stroke={`url(#${k}-accent)`}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M92 46 q14 10 0 20 q-14 -10 0 -20 Z"
            fill={`url(#${k}-aqua)`}
            opacity="0.75"
          />
        </>
      );

    case "glove":
      return (
        <>
          <Defs k={k} />
          {shadow}
          <path
            d="M40 84 v-32 a7 7 0 0 1 14 0 v20 v-40 a7 7 0 0 1 14 0 v38 v-46 a7 7 0 0 1 14 0 v46 v-34 a7 7 0 0 1 14 0 v52 q0 34 -28 34 q-28 0 -28 -38 Z"
            fill={`url(#${k}-body)`}
          />
          <path
            d="M44 96 q24 12 52 0"
            stroke="#a6e6f0"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <rect x="98" y="70" width="44" height="60" rx="6" fill={`url(#${k}-accent)`} />
          <rect x="106" y="82" width="28" height="14" rx="4" fill="#ffffff" opacity="0.85" />
          <path
            d="M112 106 q10 -8 18 0"
            stroke="#a6e6f0"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );

    case "kraft":
      return (
        <>
          <Defs k={k} />
          {shadow}
          <path
            d="M30 56 h100 l-11 70 a9 9 0 0 1 -9 8 h-60 a9 9 0 0 1 -9 -8 Z"
            fill={`url(#${k}-kraft)`}
          />
          <ellipse cx="80" cy="56" rx="50" ry="11" fill="#f3d3a8" />
          <ellipse
            cx="80"
            cy="56"
            rx="50"
            ry="11"
            fill="none"
            stroke="#b57e3c"
            strokeWidth="2.2"
            opacity="0.5"
          />
          <ellipse cx="80" cy="56" rx="40" ry="7.5" fill="#dc9d51" opacity="0.55" />
          <path
            d="M44 92 h72"
            stroke="#b57e3c"
            strokeWidth="2.6"
            opacity="0.35"
            strokeLinecap="round"
          />
          <path
            d="M80 108 q-16 -4 -18 -22 q18 2 18 22 Z"
            fill="#1f8f74"
          />
          <path
            d="M80 108 q16 -6 16 -24 q-16 4 -16 24 Z"
            fill="#5cc9a7"
          />
        </>
      );
  }
}

export function ProductArt({ art, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <Art art={art} />
    </svg>
  );
}

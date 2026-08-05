import type { Locale } from "@/i18n/config";

/**
 * `tone` follows the system convention: it names the colour of the TYPE.
 *   "dark"  → dark lockup on PAPER / BOARD / glass
 *   "light" → light lockup on the INK chapter
 */
type Tone = "dark" | "light";

/**
 * THE MARK — a tapered vessel drawn in three values: a deep gradient
 * body, a bright aqua rim band, and the dark opening you look into.
 *
 * The app-icon tile is gone. The mark stands free, which is what lets it
 * sit on glass, on ink and on paper without a container fighting the
 * header. The crossing "X" arms are gone too: they were sub-pixel at
 * favicon size and the redrawn `/icon.svg` already dropped them, so the
 * lockup now matches the favicon exactly.
 *
 * This SVG gradient is the one accent the chrome spends — §1.3 names the
 * mark as a permitted signature surface. Nothing else in the header,
 * footer, page hero or language menu is gradient-painted.
 */
export function LogoMark({
  className = "h-10 w-10",
  tone = "dark",
}: {
  className?: string;
  tone?: Tone;
}) {
  const onInk = tone === "light";
  // Two stable ids, one per tone. Repeated instances of the same tone
  // redeclare an identical gradient, which is harmless; a hook-generated
  // id would force this module to become a client component.
  const id = onInk ? "txm-l" : "txm-d";

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="1">
          {onInk ? (
            <>
              <stop offset="0%" stopColor="#0b7a96" />
              <stop offset="45%" stopColor="#17a2bf" />
              <stop offset="100%" stopColor="#6bd3e5" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#08243b" />
              <stop offset="52%" stopColor="#0f3b5c" />
              <stop offset="100%" stopColor="#17a2bf" />
            </>
          )}
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={onInk ? "#a6e6f0" : "#35bad5"} />
          <stop offset="100%" stopColor="#6bd3e5" />
        </linearGradient>
      </defs>

      {/* Body: the rim's underside sweeps down, the walls taper, the base
          is radiused. One camera — the rim ellipse is rx × 0.26. */}
      <path
        d="M7.5 11 A16.5 4.3 0 0 0 40.5 11 L34.5 37.1 A4.6 4.6 0 0 1 29.9 41 H18.1 A4.6 4.6 0 0 1 13.5 37.1 Z"
        fill={`url(#${id}-body)`}
      />
      {/* Rim band, then the opening cut out of it */}
      <ellipse cx="24" cy="11" rx="16.5" ry="4.3" fill={`url(#${id}-rim)`} />
      <ellipse
        cx="24"
        cy="11"
        rx="12.6"
        ry="3.28"
        fill={onInk ? "#041624" : "#0b2e4a"}
      />
      {/* One graduation — the machine marking */}
      <path
        d="M15 25.6 H33"
        stroke="#ffffff"
        strokeOpacity="0.34"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * THE LOCKUP. The wordmark no longer carries the gradient — its terminal
 * stop measured 2.21:1 on glass. It is now solid `ink-900` on light and
 * solid `white` on ink, and the mark alone carries the ramp.
 *
 * Latin locales lead with TARIANAOXIN over an English descriptor; RTL
 * locales lead with the native lockup and keep the Latin transliteration
 * as a tracked, `dir="ltr"` sub-line. The descriptor string is untranslated
 * English, so it is gated to `locale === "en"` (§9).
 */
export function Logo({
  locale,
  tone = "dark",
  className = "",
  compact = false,
}: {
  locale: Locale;
  tone?: Tone;
  className?: string;
  compact?: boolean;
}) {
  const rtl = locale !== "en";
  const native = locale === "ar" ? "تاريانا أوكسين" : "تاریانا اکسین";
  const onInk = tone === "light";

  const wordTone = onInk ? "text-white" : "text-ink-900";
  const subTone = onInk ? "text-onink-300" : "text-mist-600";
  // The one accented syllable. Solid, tone-matched, AA at display size.
  const accentTone = onInk ? "text-aqua-300" : "text-aqua-700";
  const wordStep = compact ? "fs-h4" : "fs-h3";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark
        tone={tone}
        className={compact ? "h-9 w-9 shrink-0" : "h-11 w-11 shrink-0"}
      />
      {/* Compact is the chrome lockup: mark + wordmark, no descriptor, and
          below 26rem the mark stands entirely alone so a 320px header row
          never has to compress its controls to fit a name. */}
      <span
        className={`flex-col justify-center ${
          compact ? "hidden min-[26rem]:flex" : "flex"
        }`}
      >
        <span
          className={`${wordStep} ${wordTone} font-bold transition-colors duration-500 ease-out-expo`}
          style={{ lineHeight: rtl ? 1.28 : 1.02 }}
        >
          {rtl ? (
            native
          ) : (
            <>
              TARIANA<span className={accentTone}>OXIN</span>
            </>
          )}
        </span>

        {compact ? null : rtl ? (
          // Latin-locked by nature: the tracking is legal here (§2.3).
          <span
            dir="ltr"
            className={`${subTone} fs-micro mt-1 font-semibold tracking-[0.26em] uppercase transition-colors duration-500 ease-out-expo`}
          >
            Tarianaoxin
          </span>
        ) : (
          <span
            className={`${subTone} eyebrow mt-1.5 transition-colors duration-500 ease-out-expo`}
          >
            Disposable Tableware
          </span>
        )}
      </span>
    </span>
  );
}

/**
 * Oversized decorative wordmark. Kept as an export because About and the
 * home hero still place it; the chrome no longer does — a repeated giant
 * wordmark is decoration standing in for structure, which is exactly what
 * this direction removes.
 */
export function LogoWatermark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      dir="ltr"
      className={`pointer-events-none select-none font-bold tracking-[-0.045em] ${className}`}
    >
      TARIANAOXIN
    </span>
  );
}

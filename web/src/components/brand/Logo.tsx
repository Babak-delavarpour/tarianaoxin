import type { Locale } from "@/i18n/config";

type Tone = "dark" | "light";

/**
 * The mark: a tapered vessel whose two walls continue past the rim and
 * cross — the "X" of OXIN drawn as the object we make.
 */
export function LogoMark({
  className = "h-10 w-10",
  tone = "dark",
}: {
  className?: string;
  tone?: Tone;
}) {
  const id = tone === "light" ? "txm-l" : "txm-d";
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#08243b" />
          <stop offset="52%" stopColor="#0f3b5c" />
          <stop offset="100%" stopColor="#17a2bf" />
        </linearGradient>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.34" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="48" height="48" rx="14" fill={`url(#${id}-bg)`} />
      <rect width="48" height="48" rx="14" fill={`url(#${id}-sheen)`} />

      {/* crossing arms — the X */}
      <path
        d="M15.2 8.5 L32.8 19.5 M32.8 8.5 L15.2 19.5"
        stroke="#a6e6f0"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* the vessel */}
      <path
        d="M13.6 17.8 H34.4 L31.1 36.2 A3.4 3.4 0 0 1 27.75 39 H20.25 A3.4 3.4 0 0 1 16.9 36.2 Z"
        fill="#ffffff"
        fillOpacity="0.96"
      />
      <path
        d="M18.6 24.4 H29.4"
        stroke="#0f3b5c"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

/**
 * The wordmark. Latin locales lead with TARIANAOXIN; RTL locales lead with
 * the native lockup and keep the Latin form as a tracked sub-line.
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

  const primaryTone =
    tone === "light" ? "text-brand-gradient-light" : "text-brand-gradient";
  const subTone = tone === "light" ? "text-aqua-200/70" : "text-mist-500";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark
        tone={tone}
        className={compact ? "h-9 w-9 shrink-0" : "h-11 w-11 shrink-0"}
      />
      <span className="flex flex-col justify-center leading-none">
        {rtl ? (
          <>
            <span
              className={`${primaryTone} font-extrabold ${
                compact ? "text-[1.15rem]" : "text-[1.35rem]"
              }`}
            >
              {native}
            </span>
            <span
              className={`${subTone} mt-1 text-[0.58rem] font-semibold tracking-[0.34em] uppercase`}
              dir="ltr"
            >
              Tarianaoxin
            </span>
          </>
        ) : (
          <>
            <span
              className={`${primaryTone} font-extrabold tracking-[-0.02em] ${
                compact ? "text-[1.2rem]" : "text-[1.42rem]"
              }`}
            >
              TARIANA
              <span className="relative">
                O
                <span className="mx-[0.02em] inline-block">X</span>
                IN
              </span>
            </span>
            <span
              className={`${subTone} mt-1 text-[0.55rem] font-semibold tracking-[0.3em] uppercase`}
            >
              Disposable Tableware
            </span>
          </>
        )}
      </span>
    </span>
  );
}

/** Oversized decorative wordmark used as a section watermark. */
export function LogoWatermark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      dir="ltr"
      className={`pointer-events-none select-none font-extrabold tracking-[-0.045em] ${className}`}
    >
      TARIANAOXIN
    </span>
  );
}

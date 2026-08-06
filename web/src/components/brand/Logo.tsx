import Image from "next/image";
import type { Locale } from "@/i18n/config";

/**
 * `tone` follows the system convention: it names the colour of the TYPE.
 *   "dark"  → dark lockup on PAPER / BOARD / glass
 *   "light" → light lockup on the INK chapter
 */
type Tone = "dark" | "light";

const LOGO_IMAGE = "/brand/tarianaoxin-to-concept.png";

/** The approved generated PNG is the single visual source of truth. */
export function LogoMark({
  className = "h-10 w-10",
}: {
  className?: string;
  tone?: Tone;
}) {
  return (
    <Image
      src={LOGO_IMAGE}
      alt=""
      width={1254}
      height={1254}
      sizes="56px"
      className={className}
      aria-hidden="true"
    />
  );
}

/**
 * THE LOCKUP. The wordmark no longer carries the gradient — its terminal
 * stop measured 2.21:1 on glass. It is now solid `ink-900` on light and
 * solid `white` on ink, and the mark alone carries the ramp.
 *
 * Latin locales lead with TarianaOxin over an English descriptor; RTL
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
        className={
          compact
            ? "h-11 w-11 shrink-0 rounded-[0.35rem]"
            : "h-14 w-14 shrink-0 rounded-[0.45rem]"
        }
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
              Tariana<span className={accentTone}>Oxin</span>
            </>
          )}
        </span>

        {compact ? null : rtl ? (
          // Latin-locked by nature: the tracking is legal here (§2.3).
          <span
            dir="ltr"
            className={`${subTone} fs-micro mt-1 font-semibold tracking-[0.26em] uppercase transition-colors duration-500 ease-out-expo`}
          >
            TarianaOxin
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
      TarianaOxin
    </span>
  );
}

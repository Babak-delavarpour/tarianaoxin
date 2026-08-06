import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import {
  locales,
  localeMeta,
  defaultLocale,
  localeDirection,
  localePath,
} from "@/i18n/config";
import fa from "@/i18n/dictionaries/fa";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata = { title: "صفحه پیدا نشد · تاریانا اکسین" };

/** No I18nProvider exists above this route, so the default dictionary is
 *  imported directly and the digits are formatted the same way `num()`
 *  would format them. */
const code = new Intl.NumberFormat("fa-IR").format(404);

const PHONE_DISPLAY = "+98 61 3221 5923";
const PHONE_TEL = "+986132215923";

const destinations = [
  { label: fa.nav.shop, path: "/shop" },
  { label: fa.nav.products, path: "/products" },
  { label: fa.nav.about, path: "/about" },
  { label: fa.nav.contact, path: "/contact" },
];

function ArrowMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 shrink-0 opacity-50 flip-rtl"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

/**
 * The root layout lives under [locale], so Next renders this one inside a
 * bare document shell of its own. Direction, language and fonts therefore
 * ride on the wrapper rather than on <html> — in the site's default
 * language. Composed as an off-spec sheet: the plate, the code, and the
 * two ways back (a destination or a language).
 */
export default function NotFound() {
  return (
    <div
      lang={localeMeta[defaultLocale].htmlLang}
      dir={localeDirection[defaultLocale]}
      data-locale={defaultLocale}
      className={`${fontVariables} mesh-dark relative isolate min-h-dvh text-white antialiased`}
    >
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden
        className="grain-layer pointer-events-none absolute inset-0 opacity-[0.08]"
      />

      <div className="relative flex min-h-dvh items-center py-[clamp(3rem,9vw,6rem)]">
        <div className="shell-narrow enter flex flex-col items-center gap-9 text-center">
          <LogoMark tone="light" className="h-12 w-12" />

          {/* the plate — a sheet that came off the line out of spec */}
          <figure className="w-full max-w-[24rem] overflow-hidden rounded-panel border border-hairline-inverse bg-inverse-2">
            <div
              aria-hidden
              className="tick-rule h-4 w-full border-b border-hairline-inverse"
            />
            <div className="grid place-items-center px-6 py-7">
              <span className="fs-numeral num font-extrabold text-onink-200">
                {code}
              </span>
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-t border-hairline-inverse px-5 py-3.5">
              <span className="eyebrow text-onink-300">{fa.brand.legal}</span>
              <span aria-hidden className="flex shrink-0 gap-1">
                <i className="block h-1.5 w-1.5 rounded-chip bg-aqua-400/80" />
                <i className="block h-1.5 w-1.5 rounded-chip bg-onink-400/60" />
                <i className="block h-1.5 w-1.5 rounded-chip bg-onink-400/60" />
              </span>
            </figcaption>
          </figure>

          <div className="flex flex-col items-center gap-4">
            <h1 className="fs-h2 font-bold text-white">
              این صفحه روی قفسه نیست.
            </h1>
            <p className="fs-lead max-w-[44ch] text-onink-200">
              صفحه‌ای که دنبال آن بودید جابه‌جا شده یا هرگز وجود نداشته است.
              یکی از مسیرهای زیر را انتخاب کنید.
            </p>
          </div>

          {/* real destinations, in the default language */}
          <nav
            aria-label={fa.common.menu}
            className="w-full max-w-[30rem]"
          >
            <ul className="plate-rule-ink overflow-hidden rounded-card border border-hairline-inverse min-[26rem]:grid-cols-2">
              {destinations.map((d) => (
                <li key={d.path} className="bg-inverse-2">
                  <Link
                    href={localePath(defaultLocale, d.path)}
                    className="hover-rule flex h-full items-center justify-between gap-3 px-5 py-4 fs-caption font-semibold text-white hover:bg-white/[0.06] hover:text-aqua-300"
                  >
                    {d.label}
                    <ArrowMark />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={`tel:${PHONE_TEL}`}
            className="hover-rule fs-caption inline-flex items-center gap-2.5 rounded-ctrl px-4 py-3 font-semibold text-onink-200 hover:text-aqua-300"
          >
            {fa.contact.info.phoneLabel}
            <span className="num text-white">{PHONE_DISPLAY}</span>
          </a>

          <div className="flex w-full flex-col items-center gap-3.5">
            <span aria-hidden className="h-px w-10 bg-hairline-inverse" />
            <div className="flex flex-wrap justify-center gap-2.5">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={localePath(l)}
                  lang={localeMeta[l].htmlLang}
                  dir={localeDirection[l]}
                  className="hover-rule fs-caption inline-flex items-center gap-2.5 rounded-ctrl border border-hairline-inverse-strong bg-white/[0.06] px-5 py-3 font-semibold text-white hover:border-aqua-400 hover:bg-white/[0.12]"
                >
                  <span
                    dir="ltr"
                    aria-hidden
                    className="eyebrow text-aqua-300"
                  >
                    {l.toUpperCase()}
                  </span>
                  {localeMeta[l].name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

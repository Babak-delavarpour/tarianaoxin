import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import {
  locales,
  localeMeta,
  defaultLocale,
  localeDirection,
} from "@/i18n/config";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata = { title: "صفحه پیدا نشد · تاریانا اکسین" };

/**
 * The root layout lives under [locale], so Next renders this one inside a
 * bare document shell of its own. Direction, language and fonts therefore
 * ride on the wrapper rather than on <html> — in the site's default language.
 */
export default function NotFound() {
  return (
    <div
      lang={localeMeta[defaultLocale].htmlLang}
      dir={localeDirection[defaultLocale]}
      data-locale={defaultLocale}
      className={`${fontVariables} mesh-dark relative min-h-screen antialiased`}
    >
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.14]" />

      <div className="relative grid min-h-screen place-items-center px-6 py-20">
        <div className="flex max-w-xl flex-col items-center gap-7 text-center">
          <LogoMark tone="light" className="h-16 w-16" />

          <span className="text-brand-gradient-light num text-[6rem] leading-none font-extrabold sm:text-[8rem]">
            ۴۰۴
          </span>

          <h1 className="text-[1.75rem] font-extrabold text-white sm:text-[2.25rem]">
            این صفحه روی قفسه نیست.
          </h1>
          <p className="text-[1rem] leading-relaxed text-ink-100/60">
            صفحه‌ای که دنبال آن بودید جابه‌جا شده یا هرگز وجود نداشته است. یک
            زبان را انتخاب کنید تا شما را به کاتالوگ برگردانیم.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                lang={localeMeta[l].htmlLang}
                dir={localeDirection[l]}
                className="sheen group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-[0.9rem] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-aqua-400/60 hover:bg-white/10"
              >
                <span aria-hidden>{localeMeta[l].flag}</span>
                {localeMeta[l].name}
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover:opacity-100 flip-rtl"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

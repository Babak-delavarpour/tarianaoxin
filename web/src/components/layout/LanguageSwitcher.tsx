"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiOutlineGlobeAlt, HiChevronDown } from "react-icons/hi2";
import { locales, localeMeta, isLocale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

export function LanguageSwitcher({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { locale, t } = useI18n();
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Swap only the locale segment so the visitor stays on the same page.
  const swap = (next: string) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length && isLocale(segments[0])) segments[0] = next;
    else segments.unshift(next);
    return `/${segments.join("/")}`;
  };

  const trigger =
    tone === "light"
      ? "text-white/85 hover:text-white hover:bg-white/10"
      : "text-ink-700 hover:text-ink-900 hover:bg-ink-50";

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t.common.language}
        className={`flex h-10 items-center gap-1.5 rounded-full px-3 text-[0.82rem] font-semibold transition-colors duration-300 ${trigger}`}
      >
        <HiOutlineGlobeAlt className="h-[1.15rem] w-[1.15rem]" />
        <span className="hidden sm:inline">{localeMeta[locale].name}</span>
        <HiChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute end-0 top-[calc(100%+0.6rem)] z-50 w-52 origin-top overflow-hidden rounded-2xl border border-white/60 bg-white/95 p-1.5 shadow-[0_24px_60px_-20px_rgba(8,36,59,0.45)] backdrop-blur-xl"
          style={{ animation: "tx-scale-in .22s var(--ease-spring)" }}
        >
          {locales.map((l) => {
            const active = l === locale;
            return (
              <Link
                key={l}
                href={swap(l)}
                onClick={() => setOpen(false)}
                role="menuitem"
                lang={localeMeta[l].htmlLang}
                dir={l === "en" ? "ltr" : "rtl"}
                className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[0.88rem] font-semibold transition-colors ${
                  active
                    ? "brand-gradient text-white"
                    : "text-ink-700 hover:bg-ink-50"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span aria-hidden className="text-base">
                    {localeMeta[l].flag}
                  </span>
                  {localeMeta[l].name}
                </span>
                <span
                  className={`text-[0.62rem] font-bold tracking-[0.14em] uppercase ${
                    active ? "text-white/70" : "text-mist-400"
                  }`}
                  dir="ltr"
                >
                  {l}
                </span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

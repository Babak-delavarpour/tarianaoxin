"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiOutlineGlobeAlt, HiChevronDown, HiCheck } from "react-icons/hi2";
import { locales, localeMeta, isLocale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Three languages, two directions, one control.
 *
 * Flags are gone: they render as bare letter boxes on Windows and they
 * conflate a language with a nationality. The identifier is the ISO code,
 * Latin-locked in `dir="ltr"` — which is also the one place raw
 * `uppercase` is legal on this site.
 */
export function LanguageSwitcher({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { locale, t } = useI18n();
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Opening a menu puts focus on the current choice, not on the list edge.
  useEffect(() => {
    if (!open) return;
    const index = Math.max(locales.indexOf(locale), 0);
    itemRefs.current[index]?.focus();
  }, [open, locale]);

  const onMenuKey = (e: React.KeyboardEvent) => {
    const items = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
    if (!items.length) return;
    const at = items.indexOf(document.activeElement as HTMLAnchorElement);
    const go = (i: number) => {
      e.preventDefault();
      items[(i + items.length) % items.length]?.focus();
    };
    if (e.key === "ArrowDown") go(at + 1);
    else if (e.key === "ArrowUp") go(at - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(items.length - 1);
    else if (e.key === "Tab") setOpen(false);
  };

  // Swap only the locale segment so the visitor stays on the same page.
  const swap = (next: string) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length && isLocale(segments[0])) segments[0] = next;
    else segments.unshift(next);
    return `/${segments.join("/")}`;
  };

  const onInk = tone === "light";

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t.common.language}
        className={`hover-rule fs-caption flex h-11 items-center gap-2 rounded-ctrl px-2.5 font-semibold ${
          onInk
            ? "text-onink-100 hover:bg-white/10 hover:text-white"
            : "text-ink-800 hover:bg-mist-100 hover:text-ink-900"
        }`}
      >
        <HiOutlineGlobeAlt aria-hidden className="h-[1.15rem] w-[1.15rem]" />
        <span className="hidden sm:inline">{localeMeta[locale].name}</span>
        <span
          dir="ltr"
          className="fs-micro font-bold uppercase opacity-70 sm:hidden"
        >
          {locale}
        </span>
        <HiChevronDown
          aria-hidden
          className={`h-3.5 w-3.5 transition-transform duration-300 ease-out-expo ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <div
          role="menu"
          aria-label={t.common.language}
          onKeyDown={onMenuKey}
          // min-w is 44 rather than the recipe's 52: at 320px the trigger
          // sits ~206px from the leading edge and a 13rem panel clips.
          className="absolute end-0 top-[calc(100%+0.5rem)] w-max min-w-44 max-w-[calc(100vw-2.5rem)] rounded-card border border-hairline bg-page p-1.5 shadow-e3 z-[var(--z-popover)]"
        >
          {locales.map((l, i) => {
            const active = l === locale;
            return (
              <Link
                key={l}
                href={swap(l)}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                onClick={() => setOpen(false)}
                role="menuitem"
                aria-current={active ? "true" : undefined}
                lang={localeMeta[l].htmlLang}
                dir={l === "en" ? "ltr" : "rtl"}
                className={`hover-rule fs-body flex items-center justify-between gap-3 rounded-ctrl px-3 py-2.5 font-semibold ${
                  active
                    ? "bg-ink-900 text-white"
                    : "text-ink-800 hover:bg-mist-100 hover:text-ink-900"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <HiCheck
                    aria-hidden
                    className={`h-4 w-4 shrink-0 ${
                      active ? "text-aqua-300" : "opacity-0"
                    }`}
                  />
                  {localeMeta[l].name}
                </span>
                <span
                  dir="ltr"
                  className={`fs-micro font-bold uppercase ${
                    active ? "text-onink-300" : "text-mist-600"
                  }`}
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

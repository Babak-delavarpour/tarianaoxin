"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  HiOutlineShoppingBag,
  HiBars3,
  HiXMark,
  HiOutlinePhone,
  HiOutlineClock,
  HiArrowUpRight,
  HiChevronRight,
} from "react-icons/hi2";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "@/i18n/I18nProvider";
import { useCart } from "@/components/shop/CartProvider";

/** One number, one format. Latin-locked, so it always carries dir/.num. */
const PHONE_DISPLAY = "+98 61 3221 5923";
const PHONE_TEL = "+986132215923";

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * The header is ALWAYS exactly `--nav-h` tall. Nothing about the scroll
 * state changes its height, so every page's `nav-clear` is exact and no
 * page top can ever jump. What changes is what fills that band:
 *
 *   at rest  → a masthead: utility rail on top, nav row beneath, both
 *              over a soft ink scrim so the transparent state is legible
 *              on any hero, dark or not
 *   scrolled → the rail collapses, the row takes the full band, a glass
 *              plate and its hairline fade in, the reading rule appears
 *
 * The two grounds are separate cross-fading layers rather than a class
 * swap on the header, so `backdrop-filter` is never transitioned.
 */
export function Header() {
  const { t, href, locale, num } = useI18n();
  const pathname = usePathname() || "";
  const { count, open } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [rule, setRule] = useState<{ x: number; w: number } | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  /* ── scroll state ─────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  /* ── the sheet: scroll lock, Esc, focus trap, focus restore ───── */
  useEffect(() => {
    if (!menuOpen) return;
    const sheet = sheetRef.current;
    const previous = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(sheet?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
        (el) => el.offsetParent !== null,
      );

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = !!sheet && sheet.contains(active);
      if (e.shiftKey && (active === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previous?.focus?.();
    };
  }, [menuOpen]);

  /* Rotating past the lg breakpoint hides the sheet in CSS — close it
     so the body lock cannot survive its own overlay. */
  useEffect(() => {
    if (!menuOpen || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => mq.matches && setMenuOpen(false);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [menuOpen]);

  const links = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.about, path: "/about" },
    { label: t.nav.products, path: "/products" },
    { label: t.nav.shop, path: "/shop" },
    { label: t.nav.contact, path: "/contact" },
  ];

  const isActive = (path: string) => {
    const full = href(path);
    return path === "/" ? pathname === full : pathname.startsWith(full);
  };

  const activeIndex = links.findIndex((l) => isActive(l.path));
  const target = hovered ?? (activeIndex >= 0 ? activeIndex : null);

  /* ── the sliding rule under the desktop nav ───────────────────────
     Measured in physical pixels from the nav's own padding box, which
     is what `offsetLeft` reports in both directions — so a single
     translateX lands correctly in LTR and RTL without a mirror case. */
  useEffect(() => {
    let live = true;
    const measure = () => {
      if (!live) return;
      const nav = navRef.current;
      const el = target === null ? null : itemRefs.current[target];
      // offsetWidth is 0 while the nav is display:none (below lg).
      if (!nav || !el || el.offsetWidth === 0) {
        setRule(null);
        return;
      }
      setRule({ x: el.offsetLeft, w: el.offsetWidth });
    };

    measure();
    // Webfonts land after first paint and change every label's width.
    document.fonts?.ready.then(measure).catch(() => {});

    const nav = navRef.current;
    const ro =
      nav && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    ro?.observe(nav!);
    return () => {
      live = false;
      ro?.disconnect();
    };
  }, [target, locale]);

  const solid = scrolled;
  const tone = solid ? "dark" : "light";
  const closeMenu = () => setMenuOpen(false);

  /* Locale digits, padded through num() so fa/ar never show a Latin 0. */
  const pad2 = (n: number) => (n < 10 ? `${num(0)}${num(n)}` : num(n));

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 isolate h-[var(--nav-h)] z-[var(--z-header)]"
        data-tone={solid ? "paper" : "ink"}
      >
        {/* Ground A — the ink scrim. Keeps the transparent state legible
            over any masthead, and reads as a vignette over a dark one. */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+3rem)] bg-gradient-to-b from-ink-950/55 via-ink-950/18 to-transparent transition-opacity duration-500 ease-out-expo ${
            solid ? "opacity-0" : "opacity-100"
          }`}
        />
        {/* Ground B — the glass plate. Cross-faded, never class-swapped,
            so `backdrop-filter` is not a transitioned property. */}
        <div
          aria-hidden
          className={`glass pointer-events-none absolute inset-0 -z-10 border-b border-hairline shadow-e1 transition-opacity duration-500 ease-out-expo ${
            solid ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="flex h-full flex-col">
          {/* Utility rail — the masthead strip. Desktop only: below lg the
              band is short and the sheet carries these affordances. */}
          <div
            className={`hidden shrink-0 overflow-hidden border-b border-hairline-inverse transition-[height,opacity] duration-500 ease-out-expo lg:block ${
              solid ? "h-0 opacity-0" : "h-9 opacity-100"
            }`}
          >
            <div className="shell flex h-9 items-center gap-6">
              <span className="hidden items-center gap-2 xl:inline-flex">
                <HiOutlineClock
                  aria-hidden
                  className="h-3.5 w-3.5 shrink-0 text-aqua-400"
                />
                <span className="eyebrow text-onink-300">
                  {t.contact.info.hours}
                </span>
              </span>

              <a
                href={`tel:${PHONE_TEL}`}
                className="hover-rule inline-flex h-full items-center gap-2 text-onink-200 hover:text-white"
              >
                <HiOutlinePhone
                  aria-hidden
                  className="h-3.5 w-3.5 shrink-0 text-aqua-400"
                />
                <span className="num eyebrow">{PHONE_DISPLAY}</span>
              </a>

              <Link
                href={href("/contact")}
                className="hover-rule ms-auto inline-flex h-full items-center gap-1.5 text-onink-200 hover:text-white"
              >
                <span className="eyebrow">{t.common.getQuote}</span>
                <HiArrowUpRight aria-hidden className="h-3 w-3 flip-rtl" />
              </Link>
            </div>
          </div>

          {/* Nav row */}
          <div className="shell flex min-h-0 flex-1 items-center justify-between gap-3 sm:gap-5">
            {/* The lockup cross-fades between tones with the ground, so the
                state change reads as one gesture rather than a flicker. */}
            <Link
              href={href("/")}
              aria-label={t.brand.name}
              className="relative flex shrink-0 items-center"
            >
              <span
                aria-hidden
                className={`block transition-opacity duration-500 ease-out-expo ${
                  solid ? "opacity-0" : "opacity-100"
                }`}
              >
                <Logo locale={locale} tone="light" compact />
              </span>
              <span
                aria-hidden
                className={`absolute inset-0 flex items-center transition-opacity duration-500 ease-out-expo ${
                  solid ? "opacity-100" : "opacity-0"
                }`}
              >
                <Logo locale={locale} tone="dark" compact />
              </span>
            </Link>

            <nav
              ref={navRef}
              aria-label={t.common.menu}
              className="relative hidden h-full items-center lg:flex"
              onPointerLeave={() => setHovered(null)}
            >
              {links.map((l, i) => {
                const active = isActive(l.path);
                return (
                  <Link
                    key={l.path}
                    href={href(l.path)}
                    aria-current={active ? "page" : undefined}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    onPointerEnter={(e) =>
                      e.pointerType === "mouse" && setHovered(i)
                    }
                    className={`fs-caption relative flex h-full items-center px-4 font-semibold transition-colors duration-300 ${
                      solid
                        ? active
                          ? "text-ink-900"
                          : "text-mist-600 hover:text-ink-900"
                        : active
                          ? "text-white"
                          : "text-onink-200 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}

              {/* One rule that slides between items — it follows the pointer
                  on a mouse and returns to the current page on leave. */}
              <span
                aria-hidden
                className={`pointer-events-none absolute bottom-0 h-0.5 transition-[translate,width,opacity,background-color] duration-500 ease-out-expo ${
                  solid ? "bg-aqua-700" : "bg-aqua-300"
                } ${rule ? "opacity-100" : "opacity-0"}`}
                style={{
                  left: 0,
                  width: `${rule?.w ?? 0}px`,
                  translate: `${rule?.x ?? 0}px 0`,
                }}
              />
            </nav>

            <div className="flex items-center gap-1">
              <LanguageSwitcher tone={tone} />

              <button
                type="button"
                onClick={open}
                aria-label={t.common.cart}
                className={`hover-rule relative flex h-11 w-11 items-center justify-center rounded-ctrl ${
                  solid
                    ? "text-ink-800 hover:bg-mist-100 hover:text-ink-900"
                    : "text-onink-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <HiOutlineShoppingBag className="h-[1.3rem] w-[1.3rem]" />
                {count > 0 ? (
                  <span
                    aria-hidden
                    className={`fs-micro absolute -top-0.5 -end-0.5 flex h-5 min-w-5 items-center justify-center rounded-chip bg-aqua-700 px-1 font-bold text-white ring-2 ${
                      solid ? "ring-page" : "ring-ink-950"
                    }`}
                  >
                    <span className="num">{num(count)}</span>
                  </span>
                ) : null}
              </button>
              {/* The count is announced here, once, rather than from a badge
                  that only exists after the first item is added. */}
              <span role="status" aria-live="polite" className="sr-only">
                {`${t.common.cart}: ${num(count)}`}
              </span>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={t.common.menu}
                aria-expanded={menuOpen}
                aria-controls="site-menu"
                className={`hover-rule flex h-11 w-11 items-center justify-center rounded-ctrl lg:hidden ${
                  solid
                    ? "text-ink-800 hover:bg-mist-100 hover:text-ink-900"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {menuOpen ? (
                  <HiXMark className="h-[1.4rem] w-[1.4rem]" />
                ) : (
                  <HiBars3 className="h-[1.4rem] w-[1.4rem]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Reading rule — CSS scroll timeline, no listener, no reflow. */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-500 ${
            solid ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="scroll-progress block h-full w-full bg-aqua-500" />
        </span>
      </header>

      {/* ── Mobile sheet ────────────────────────────────────────────
          A docked panel, not a dropdown: thumb-reachable, radiused only
          on its top edge, and built as a ruled index rather than a stack
          of pills. */}
      <div
        aria-hidden
        onClick={closeMenu}
        className={`fixed inset-0 bg-ink-950/60 backdrop-blur-[2px] transition-opacity duration-300 z-[var(--z-scrim)] lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id="site-menu"
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.common.menu}
        inert={!menuOpen || undefined}
        aria-hidden={!menuOpen || undefined}
        className={`pb-safe ease-out-expo fixed inset-x-0 bottom-0 flex max-h-[86dvh] flex-col rounded-t-panel bg-page shadow-e3 transition-transform duration-400 z-[var(--z-drawer)] lg:hidden ${
          menuOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <span
          aria-hidden
          className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-chip bg-mist-300"
        />

        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-hairline px-5 py-3.5">
          <span className="eyebrow text-mist-600">{t.common.menu}</span>
          <button
            type="button"
            onClick={closeMenu}
            aria-label={t.common.close}
            className="hover-rule flex h-11 w-11 items-center justify-center rounded-ctrl border border-hairline text-ink-800 hover:border-ink-900 hover:text-ink-900"
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>

        {/* The index scrolls; the handle and the close bar never do. */}
        <div className="scroll-pane min-h-0 flex-1 overflow-y-auto">
          {/* A ruled index, not a stack of pills: a numeral column, the
              label, and one direction-aware chevron. */}
          <nav aria-label={t.common.menu}>
            <ul className="divide-y divide-hairline border-b border-hairline">
              {links.map((l, i) => {
                const active = isActive(l.path);
                return (
                  <li key={l.path}>
                    <Link
                      href={href(l.path)}
                      aria-current={active ? "page" : undefined}
                      className={`hover-rule fs-h4 grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-s-2 px-5 py-4 font-semibold ${
                        active
                          ? "border-aqua-600 bg-sunken text-aqua-700"
                          : "border-transparent text-ink-900 hover:bg-mist-100"
                      }`}
                    >
                      <span
                        className={`num fs-micro font-bold ${
                          active ? "text-aqua-700" : "text-mist-600"
                        }`}
                      >
                        {pad2(i + 1)}
                      </span>
                      {l.label}
                      <HiChevronRight
                        aria-hidden
                        className="h-4 w-4 text-mist-500 flip-rtl"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 px-5 py-5">
            <a
              href={`tel:${PHONE_TEL}`}
              className="hover-rule fs-body flex h-12 items-center justify-center gap-2.5 rounded-ctrl border border-hairline-strong font-semibold text-ink-900 hover:border-ink-900"
            >
              <HiOutlinePhone aria-hidden className="h-4 w-4 text-aqua-700" />
              <span className="num">{PHONE_DISPLAY}</span>
            </a>
            <ButtonLink
              href={href("/contact")}
              variant="solid"
              size="lg"
              className="w-full"
            >
              {t.common.getQuote}
              <HiArrowUpRight aria-hidden className="h-4 w-4 flip-rtl" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}

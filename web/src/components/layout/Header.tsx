"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HiOutlineShoppingBag,
  HiBars3,
  HiXMark,
  HiOutlinePhone,
  HiArrowUpRight,
} from "react-icons/hi2";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "@/i18n/I18nProvider";
import { useCart } from "@/components/shop/CartProvider";

export function Header() {
  const { t, href, locale, num } = useI18n();
  const pathname = usePathname() || "";
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
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

  // Solid once the visitor leaves the hero; transparent while over it.
  const solid = scrolled || menuOpen;
  const tone = solid ? "dark" : "light";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "glass border-b border-ink-100/70 shadow-[0_10px_40px_-24px_rgba(8,36,59,0.5)]"
            : "border-b border-transparent"
        }`}
      >
        {/* Announcement rail — only while at the top of the page */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            solid ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <div className="brand-gradient">
            <div className="mx-auto flex max-w-[80rem] items-center justify-center gap-3 px-5 py-2 text-[0.72rem] font-semibold tracking-wide text-white/90 sm:px-8">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-aqua-300 opacity-75 [animation:tx-pulse-ring_1.8s_ease-out_infinite]" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <span>{t.home.hero.eyebrow}</span>
              <span className="hidden opacity-50 sm:inline">·</span>
              <Link
                href={href("/contact")}
                className="link-underline hidden items-center gap-1 sm:inline-flex"
              >
                {t.common.getQuote}
                <HiArrowUpRight className="h-3 w-3 flip-rtl" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto flex h-[4.5rem] max-w-[80rem] items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href={href("/")}
            aria-label={t.brand.name}
            className="shrink-0 transition-transform duration-500 hover:scale-[1.02]"
          >
            <Logo locale={locale} tone={tone} compact />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => {
              const active = isActive(l.path);
              return (
                <Link
                  key={l.path}
                  href={href(l.path)}
                  className={`relative rounded-full px-4 py-2 text-[0.88rem] font-semibold transition-colors duration-300 ${
                    solid
                      ? active
                        ? "text-aqua-700"
                        : "text-ink-600 hover:text-ink-900"
                      : active
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full transition-transform duration-500 ${
                      solid ? "brand-gradient" : "bg-aqua-300"
                    } ${active ? "scale-x-100" : "scale-x-0"}`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <a
              href="tel:+986132215923"
              dir="ltr"
              className={`hidden h-10 items-center gap-2 rounded-full px-3 text-[0.82rem] font-semibold transition-colors duration-300 xl:flex ${
                solid
                  ? "text-ink-700 hover:bg-ink-50 hover:text-ink-900"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              <HiOutlinePhone className="h-[1.05rem] w-[1.05rem]" />
              061 3221 5923
            </a>

            <LanguageSwitcher tone={tone} />

            <button
              type="button"
              onClick={open}
              aria-label={t.common.cart}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                solid
                  ? "text-ink-700 hover:bg-ink-50 hover:text-ink-900"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              <HiOutlineShoppingBag className="h-[1.3rem] w-[1.3rem]" />
              {count > 0 ? (
                <span className="absolute -top-0.5 end-0 flex h-[1.15rem] min-w-[1.15rem] items-center justify-center rounded-full bg-aqua-500 px-1 text-[0.62rem] font-bold text-white shadow-[0_0_0_2px_rgba(255,255,255,0.9)]">
                  {num(count)}
                </span>
              ) : null}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={t.common.menu}
              aria-expanded={menuOpen}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 lg:hidden ${
                solid
                  ? "text-ink-800 hover:bg-ink-50"
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
      </header>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-ink-950/50 backdrop-blur-sm transition-opacity duration-400 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-x-0 top-[4.5rem] mx-3 rounded-3xl border border-white/70 bg-white/95 p-3 shadow-[0_30px_80px_-30px_rgba(8,36,59,0.6)] backdrop-blur-2xl transition-all duration-500 ${
            menuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <nav className="flex flex-col">
            {links.map((l, i) => (
              <Link
                key={l.path}
                href={href(l.path)}
                style={{ transitionDelay: `${menuOpen ? i * 45 : 0}ms` }}
                className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[1.02rem] font-semibold transition-all duration-500 ${
                  isActive(l.path)
                    ? "brand-gradient text-white"
                    : "text-ink-800 hover:bg-ink-50"
                } ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
              >
                {l.label}
                <HiArrowUpRight className="h-4 w-4 opacity-50 flip-rtl" />
              </Link>
            ))}
          </nav>
          <a
            href="tel:+986132215923"
            dir="ltr"
            className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-ink-50 px-4 py-3.5 text-[0.9rem] font-bold text-ink-800"
          >
            <HiOutlinePhone className="h-4 w-4" />
            061 3221 5923
          </a>
        </div>
      </div>
    </>
  );
}

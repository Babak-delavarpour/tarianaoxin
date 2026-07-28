"use client";

import Link from "next/link";
import { useState } from "react";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiArrowUpRight,
  HiCheckCircle,
} from "react-icons/hi2";
import {
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa";
import { Logo, LogoWatermark } from "@/components/brand/Logo";
import { useI18n } from "@/i18n/I18nProvider";
import { categories } from "@/lib/catalog";

export function Footer() {
  const { t, locale, href } = useI18n();
  const [subscribed, setSubscribed] = useState(false);

  const columns = [
    {
      title: t.footer.company,
      links: [
        { label: t.nav.about, path: "/about" },
        { label: t.footer.links.quality, path: "/about#quality" },
        { label: t.footer.links.careers, path: "/contact" },
        { label: t.footer.links.distributors, path: "/contact" },
      ],
    },
    {
      title: t.footer.catalogue,
      links: categories.slice(0, 5).map((c) => ({
        label: c.name[locale],
        path: `/products#${c.slug}`,
      })),
    },
    {
      title: t.footer.support,
      links: [
        { label: t.nav.contact, path: "/contact" },
        { label: t.footer.links.shipping, path: "/contact" },
        { label: t.footer.links.faq, path: "/contact" },
        { label: t.footer.links.terms, path: "/contact" },
      ],
    },
  ];

  const socials = [
    { Icon: FaInstagram, label: "Instagram", url: "https://instagram.com" },
    { Icon: FaWhatsapp, label: "WhatsApp", url: "https://wa.me/989160611093" },
    { Icon: FaTelegramPlane, label: "Telegram", url: "https://telegram.org" },
    { Icon: FaLinkedinIn, label: "LinkedIn", url: "https://linkedin.com" },
  ];

  return (
    <footer className="mesh-dark relative overflow-hidden text-ink-100">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.16]" />

      {/* Watermark bleeding off the bottom edge */}
      <LogoWatermark className="absolute inset-x-0 -bottom-6 text-center text-[19vw] leading-none text-white/[0.028]" />

      <div className="relative mx-auto max-w-[80rem] px-5 sm:px-8">
        {/* Newsletter */}
        <div className="grid gap-8 border-b border-white/10 py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-3">
            <h3 className="text-[1.6rem] font-extrabold text-white sm:text-[2rem]">
              {t.footer.newsletter.title}
            </h3>
            <p className="max-w-md text-[0.95rem] leading-relaxed text-ink-100/60">
              {t.footer.newsletter.body}
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubscribed(true);
            }}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                required
                disabled={subscribed}
                placeholder={t.footer.newsletter.placeholder}
                aria-label={t.footer.newsletter.placeholder}
                className="h-13 min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-[0.92rem] text-white placeholder:text-ink-100/35 transition-colors focus:border-aqua-400 focus:bg-white/10 focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="sheen brand-gradient h-13 shrink-0 rounded-full px-8 py-3.5 text-[0.9rem] font-bold text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:translate-y-0"
              >
                {t.footer.newsletter.submit}
              </button>
            </div>
            {subscribed ? (
              <p className="flex items-center gap-2 text-[0.84rem] font-semibold text-aqua-300">
                <HiCheckCircle className="h-4 w-4" />
                {t.footer.newsletter.success}
              </p>
            ) : null}
          </form>
        </div>

        {/* Main */}
        <div className="grid gap-12 py-16 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-10">
          <div className="flex flex-col gap-6">
            <Logo locale={locale} tone="light" />
            <p className="max-w-xs text-[0.9rem] leading-relaxed text-ink-100/55">
              {t.footer.blurb}
            </p>

            <ul className="flex flex-col gap-3 text-[0.88rem]">
              <li className="flex items-start gap-3 text-ink-100/70">
                <HiOutlineMapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" />
                <span>{t.contact.info.address}</span>
              </li>
              <li>
                <a
                  href="tel:+986132215923"
                  dir="ltr"
                  className="flex items-center gap-3 text-ink-100/70 transition-colors hover:text-aqua-300"
                >
                  <HiOutlinePhone className="h-4 w-4 shrink-0 text-aqua-400" />
                  +98 61 3221 5923
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@tarianaoxin.com"
                  dir="ltr"
                  className="flex items-center gap-3 text-ink-100/70 transition-colors hover:text-aqua-300"
                >
                  <HiOutlineEnvelope className="h-4 w-4 shrink-0 text-aqua-400" />
                  sales@tarianaoxin.com
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-2">
              {socials.map(({ Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-ink-100/70 transition-all duration-300 hover:-translate-y-1 hover:border-aqua-400/50 hover:bg-aqua-500/15 hover:text-aqua-300"
                >
                  <Icon className="h-[1.05rem] w-[1.05rem]" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} className="flex flex-col gap-5">
              <h4 className="text-[0.72rem] font-bold tracking-[0.2em] text-aqua-300 uppercase">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={href(link.path)}
                      className="group inline-flex items-center gap-1.5 text-[0.9rem] text-ink-100/60 transition-colors hover:text-white"
                    >
                      {link.label}
                      <HiArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-70 flip-rtl" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-[0.8rem] text-ink-100/45 sm:flex-row">
          <p>
            © <span className="num">2026</span> {t.brand.legal}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <Link href={href("/contact")} className="transition-colors hover:text-aqua-300">
              {t.footer.links.privacy}
            </Link>
            <Link href={href("/contact")} className="transition-colors hover:text-aqua-300">
              {t.footer.links.terms}
            </Link>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-aqua-400" />
              {t.footer.madeIn}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

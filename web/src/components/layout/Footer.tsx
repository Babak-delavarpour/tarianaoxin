"use client";

import Link from "next/link";
import { useState } from "react";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiCheckCircle,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/i18n/I18nProvider";
import { categories } from "@/lib/catalog";

/** One number, one format — matched to the header and the contact page. */
const PHONE_DISPLAY = "+98 61 3221 5923";
const PHONE_TEL = "+986132215923";
const EMAIL = "sales@tarianaoxin.com";

/**
 * The footer is an INK chapter read as a colophon: a masthead column that
 * carries the brand and every way to reach a human, a newsletter block
 * built as a real labelled form rather than an input wedged into a row,
 * three tightly-set link columns, and a legal bar that recedes to the
 * quietest legible step on ink.
 */
export function Footer() {
  const { t, locale, href, num } = useI18n();
  const [subscribed, setSubscribed] = useState(false);

  const columns = [
    {
      title: t.footer.company,
      links: [
        { label: t.nav.about, path: "/about" },
        { label: t.footer.links.quality, path: "/about#quality" },
        { label: t.footer.links.careers, path: "/contact" },
        { label: t.footer.links.distributors, path: "/about#branches" },
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

  // Only publish verified destinations. Generic social-network home pages
  // look active but send visitors away from the brand.
  const socials = [
    { Icon: FaWhatsapp, label: "WhatsApp", url: "https://wa.me/989160611093" },
  ];

  const contact = [
    {
      Icon: HiOutlineMapPin,
      label: t.contact.info.addressLabel,
      value: <span className="fs-caption">{t.contact.info.address}</span>,
    },
    {
      Icon: HiOutlinePhone,
      label: t.contact.info.phoneLabel,
      value: (
        <a
          href={`tel:${PHONE_TEL}`}
          className="hover-rule fs-caption num inline-block py-0.5 hover:text-aqua-300"
        >
          {PHONE_DISPLAY}
        </a>
      ),
    },
    {
      Icon: HiOutlineEnvelope,
      label: t.contact.info.emailLabel,
      value: (
        <a
          href={`mailto:${EMAIL}`}
          dir="ltr"
          className="hover-rule fs-caption inline-block py-0.5 hover:text-aqua-300"
        >
          {EMAIL}
        </a>
      ),
    },
  ];

  return (
    <footer className="mesh-dark relative isolate border-t border-hairline-inverse text-onink-200">
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-50"
      />
      <div
        aria-hidden
        className="grain-layer pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
      />

      <Container>
        {/* ── Masthead + newsletter ─────────────────────────────── */}
        <div className="grid gap-12 border-b border-hairline-inverse py-[clamp(3rem,6vw,4.75rem)] lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          {/* Capped measure: at 4K the shell is 88rem and an uncapped
              ledger would stretch three short values across 690px. */}
          <div className="flex max-w-[38rem] flex-col items-start gap-7">
            <Logo locale={locale} tone="light" />

            <p className="fs-body max-w-[44ch] text-onink-200">
              {t.footer.blurb}
            </p>

            <ul className="w-full divide-y divide-hairline-inverse border-y border-hairline-inverse">
              {contact.map(({ Icon, label, value }) => (
                <li
                  key={label}
                  className="grid grid-cols-[1.25rem_1fr] items-start gap-x-3.5 py-3.5"
                >
                  <Icon
                    aria-hidden
                    className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400"
                  />
                  <div className="min-w-0">
                    <span className="eyebrow block text-onink-300">{label}</span>
                    <span className="mt-1.5 block text-onink-100">{value}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-2">
              {socials.map(({ Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="hover-rule flex h-11 w-11 items-center justify-center rounded-ctrl border border-hairline-inverse text-onink-200 hover:border-aqua-400 hover:text-aqua-300"
                >
                  <Icon className="h-[1.05rem] w-[1.05rem]" />
                </a>
              ))}
            </div>
          </div>

          {/* The one filled tile in the footer — CARD/INK, no shadow. */}
          <div className="rounded-card border border-hairline-inverse bg-inverse-2 p-6 sm:p-8">
            <h3 className="fs-h4 font-semibold text-white">
              {t.footer.newsletter.title}
            </h3>
            <p className="fs-body mt-2.5 text-onink-200">
              {t.footer.newsletter.body}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
              className="mt-7 flex flex-col gap-3"
            >
              <label
                htmlFor="footer-newsletter-email"
                className="eyebrow text-onink-300"
              >
                {t.footer.newsletter.placeholder}
              </label>
              <input
                id="footer-newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                disabled={subscribed}
                dir="ltr"
                className="fs-body h-12 w-full rounded-ctrl border border-hairline-inverse-strong bg-white/[0.05] px-4 text-white transition-colors duration-200 placeholder:text-onink-300 focus:border-aqua-400 disabled:opacity-60"
              />
              <Button
                type="submit"
                variant="light"
                size="md"
                disabled={subscribed}
                className="w-full"
              >
                {t.footer.newsletter.submit}
              </Button>

              <p
                role="status"
                aria-live="polite"
                className="fs-caption flex items-center gap-2 font-semibold text-aqua-300 empty:hidden"
              >
                {subscribed ? (
                  <>
                    <HiCheckCircle aria-hidden className="h-4 w-4 shrink-0" />
                    {t.footer.newsletter.success}
                  </>
                ) : null}
              </p>
            </form>
          </div>
        </div>

        {/* ── Link columns ─────────────────────────────────────────
            Plain <div>s on purpose: three more navigation landmarks in
            the footer is noise in a landmark list, not structure. */}
        <div className="grid gap-x-10 gap-y-9 border-b border-hairline-inverse py-[clamp(2.5rem,5vw,4rem)] sm:grid-cols-2 lg:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h4 className="eyebrow text-aqua-300">{col.title}</h4>
              <ul className="flex flex-col">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={href(link.path)}
                      className="hover-rule fs-body inline-flex py-1.5 text-onink-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Legal bar ────────────────────────────────────────── */}
        <div className="pb-safe fs-micro flex flex-col gap-4 py-6 text-center text-onink-300 sm:flex-row sm:items-center sm:justify-between sm:text-start">
          <p>
            {/* Split so the year never picks up a thousands separator in
                fa-IR / ar-EG while still rendering native digits. */}
            © <span className="num">{`${num(20)}${num(26)}`}</span>{" "}
            {t.brand.legal}. {t.footer.rights}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href={href("/contact")}
              className="hover-rule py-1 hover:text-white"
            >
              {t.footer.links.privacy}
            </Link>
            <Link
              href={href("/contact")}
              className="hover-rule py-1 hover:text-white"
            >
              {t.footer.links.terms}
            </Link>
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden
                className="h-1 w-1 shrink-0 rounded-chip bg-aqua-400"
              />
              {t.footer.madeIn}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

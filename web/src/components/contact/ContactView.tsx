"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineClock,
  HiCheckCircle,
  HiPaperAirplane,
  HiOutlineArrowTopRightOnSquare,
  HiChevronRight,
} from "react-icons/hi2";
import {
  Chapter,
  Container,
  Divider,
  Eyebrow,
  SectionHeading,
} from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/brand/Logo";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * CONTACT — MEASURED.
 *
 *   1 masthead INK   · SPLIT   (copy + a "who answers" ledger)
 *   2 form     PAPER · editorial column, `shell-narrow` — the site's main
 *                      conversion gets the whole measure, not a sidebar
 *   3 reach    INK   · LEDGER columns (address, lines, hours, directions)
 *
 * Validation: the dictionaries carry no error copy and this phase may not
 * add keys, so the form keeps **native constraint validation** — the
 * browser supplies a message in the user's own language and focuses the
 * first offending field — and adds a visible hairline + `aria-invalid`
 * state on blur. Submission stays the local simulation; no network call.
 */

const PHONE_DISPLAY = "+98 61 3221 5923";
const PHONE_TEL = "+986132215923";
const EMAIL = "sales@tarianaoxin.com";
const MAP_URL = "https://maps.google.com/?q=Ahvaz+Industrial+Zone+2";

type FieldEl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const fieldBase =
  "w-full rounded-ctrl border bg-page px-4 fs-body text-ink-900 placeholder:text-mist-550 transition-colors duration-200 focus:border-aqua-600";

const labelClass = "fs-caption font-semibold text-mist-600";

export function ContactView() {
  const { t, href } = useI18n();
  const c = t.contact;

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});
  const successRef = useRef<HTMLDivElement>(null);

  /* Move focus into the confirmation so the change is not silent. */
  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  const mark = (el: FieldEl) =>
    setInvalid((prev) => ({ ...prev, [el.name]: !el.checkValidity() }));

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // UI-only: no backend is wired up yet.
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  const field = (name: string, extra = "") =>
    `${fieldBase} ${extra} ${
      invalid[name] ? "border-sand-700" : "border-hairline-strong"
    }`;

  const reach = [
    {
      Icon: HiOutlinePhone,
      label: c.info.phoneLabel,
      value: PHONE_DISPLAY,
      link: `tel:${PHONE_TEL}`,
      ltr: true,
    },
    {
      Icon: HiOutlineEnvelope,
      label: c.info.emailLabel,
      value: EMAIL,
      link: `mailto:${EMAIL}`,
      ltr: true,
    },
    {
      Icon: HiOutlineClock,
      label: c.info.hoursLabel,
      value: c.info.hours,
    },
  ];

  return (
    <>
      {/* ═══ 1 · MASTHEAD — INK · SPLIT ═══════════════════════════ */}
      <section className="mesh-dark nav-clear relative isolate text-white pb-[clamp(3.5rem,7vw,7rem)]">
        <div
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-0 opacity-60"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 start-1/3 h-[38rem] w-[38rem] rounded-chip bg-sand-500/10 blur-[130px]"
        />
        <div
          aria-hidden
          className="grain-layer pointer-events-none absolute inset-0 opacity-[0.08]"
        />

        <Container className="relative grid gap-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-[clamp(2.5rem,5vw,5rem)]">
          <div className="enter flex flex-col items-start gap-5">
            <nav
              aria-label={t.common.breadcrumb}
              className="eyebrow flex items-center gap-2 text-onink-300"
            >
              <Link
                href={href("/")}
                className="tap-target hover-rule hover:text-aqua-300"
              >
                {t.nav.home}
              </Link>
              <HiChevronRight
                aria-hidden
                className="h-3 w-3 shrink-0 text-onink-300 flip-rtl"
              />
              <span aria-current="page" className="text-aqua-300">
                {t.nav.contact}
              </span>
            </nav>

            <Eyebrow tone="light">{c.hero.eyebrow}</Eyebrow>

            <h1 className="fs-h1 max-w-[16ch] font-bold text-white">
              {c.hero.title}
            </h1>

            <p className="fs-lead max-w-[52ch] text-onink-200">
              {c.hero.subtitle}
            </p>
          </div>

          {/* who answers — direct lines, before the form is even seen */}
          <div className="enter-fade w-full overflow-hidden rounded-panel border border-hairline-inverse bg-inverse-2">
            <div
              aria-hidden
              className="tick-rule h-4 w-full border-b border-hairline-inverse"
            />
            <div className="border-b border-hairline-inverse px-5 py-3.5">
              <span className="eyebrow text-onink-300">
                {c.departments.title}
              </span>
            </div>
            <ul className="plate-rule-ink">
              {c.departments.items.map((d) => (
                <li key={d.name} className="bg-inverse-2">
                  <a
                    href={`mailto:${d.detail}`}
                    className="hover-rule flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 px-5 py-4 hover:bg-white/[0.05]"
                  >
                    <span className="fs-caption font-semibold text-white">
                      {d.name}
                    </span>
                    <span className="num fs-caption font-semibold text-aqua-300">
                      {d.detail}
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 bg-inverse-2 px-5 py-4">
                <span className="fs-caption font-semibold text-white">
                  {c.info.hoursLabel}
                </span>
                <span className="fs-caption text-onink-200">
                  {c.info.hours}
                </span>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* ═══ 2 · THE FORM — PAPER · editorial column ══════════════ */}
      <Chapter tone="paper" pad="base">
        <Container narrow>
          <SectionHeading title={c.form.title} subtitle={c.form.subtitle} />

          <div className="stack-block">
            {sent ? (
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="flex flex-col items-start gap-5 rounded-card border border-hairline bg-sunken p-7 sm:p-10"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-tile border border-hairline bg-page text-leaf-700">
                  <HiCheckCircle aria-hidden className="h-6 w-6" />
                </span>
                <p className="fs-h3 max-w-[42ch] font-semibold text-ink-900">
                  {c.form.success}
                </p>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setSent(false);
                    setInvalid({});
                  }}
                >
                  {t.common.close}
                </Button>
              </div>
            ) : (
              <Reveal>
                <form onSubmit={submit} className="flex flex-col gap-6">
                  {/* group 1 — who is asking */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className={labelClass}>
                        {c.form.name}
                        <span aria-hidden className="ms-1 text-sand-700">
                          *
                        </span>
                      </span>
                      <input
                        required
                        name="name"
                        autoComplete="name"
                        placeholder={c.form.namePlaceholder}
                        aria-invalid={invalid.name || undefined}
                        onBlur={(e) => mark(e.currentTarget)}
                        className={field("name", "h-12")}
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className={labelClass}>{c.form.company}</span>
                      <input
                        name="company"
                        autoComplete="organization"
                        placeholder={c.form.companyPlaceholder}
                        className={field("company", "h-12")}
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className={labelClass}>
                        {c.form.email}
                        <span aria-hidden className="ms-1 text-sand-700">
                          *
                        </span>
                      </span>
                      <input
                        required
                        type="email"
                        name="email"
                        dir="ltr"
                        autoComplete="email"
                        placeholder={c.form.emailPlaceholder}
                        aria-invalid={invalid.email || undefined}
                        onBlur={(e) => mark(e.currentTarget)}
                        className={field("email", "h-12")}
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className={labelClass}>{c.form.phone}</span>
                      <input
                        type="tel"
                        name="phone"
                        dir="ltr"
                        autoComplete="tel"
                        placeholder={c.form.phonePlaceholder}
                        className={field("phone", "h-12")}
                      />
                    </label>
                  </div>

                  <Divider />

                  {/* group 2 — what is being asked */}
                  <label className="flex flex-col gap-2">
                    <span className={labelClass}>{c.form.subject}</span>
                    <select
                      name="subject"
                      className={field(
                        "subject",
                        "select-pill h-12 cursor-pointer",
                      )}
                    >
                      {c.form.subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className={labelClass}>
                      {c.form.message}
                      <span aria-hidden className="ms-1 text-sand-700">
                        *
                      </span>
                    </span>
                    <textarea
                      required
                      name="message"
                      rows={6}
                      placeholder={c.form.messagePlaceholder}
                      aria-invalid={invalid.message || undefined}
                      onBlur={(e) => mark(e.currentTarget)}
                      className={field("message", "min-h-36 resize-y py-3.5")}
                    />
                  </label>

                  <div className="flex items-center border-t border-hairline pt-6">
                    <Button
                      type="submit"
                      size="lg"
                      loading={sending}
                      className="w-full sm:w-auto"
                    >
                      {sending ? null : (
                        <HiPaperAirplane
                          aria-hidden
                          className="h-4 w-4 shrink-0 flip-rtl"
                        />
                      )}
                      {sending ? c.form.sending : c.form.submit}
                    </Button>
                  </div>
                </form>
              </Reveal>
            )}
          </div>
        </Container>
      </Chapter>

      {/* ═══ 3 · WHERE WE ARE — INK · LEDGER columns ══════════════ */}
      <Chapter tone="ink" pad="base">
        <div
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-0 opacity-50"
        />

        <Container className="relative grid gap-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[0.86fr_1.14fr] lg:items-start lg:gap-[clamp(2.5rem,5vw,5rem)]">
          <Reveal variant="fade" className="flex flex-col items-start gap-5">
            <LogoMark tone="light" className="h-12 w-12" />

            <h2 className="fs-h2 max-w-[16ch] font-bold text-white">
              {c.info.title}
            </h2>

            <span className="eyebrow text-onink-300">
              {c.info.addressLabel}
            </span>

            {/* No cartography: the address is the object. */}
            <a
              href={MAP_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="hover-rule fs-h3 group inline-flex max-w-[18ch] items-start gap-3 font-semibold text-onink-100 hover:text-aqua-300"
            >
              <HiOutlineMapPin
                aria-hidden
                className="mt-1 h-5 w-5 shrink-0 text-aqua-400"
              />
              <span>
                {c.info.address}
                <HiOutlineArrowTopRightOnSquare
                  aria-hidden
                  className="ms-2 inline h-4 w-4 align-baseline opacity-60 flip-rtl"
                />
              </span>
            </a>

            <p className="fs-caption text-onink-300">{c.info.mapNote}</p>
          </Reveal>

          <Reveal variant="fade" delay={80} className="w-full">
            <dl className="plate-rule-ink overflow-hidden rounded-card border border-hairline-inverse sm:grid-cols-3">
              {reach.map(({ Icon, label, value, link, ltr }) => (
                <div
                  key={label}
                  className="flex flex-col gap-3.5 bg-inverse-2 p-5 sm:p-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tile border border-hairline-inverse bg-white/[0.06] text-aqua-300">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <dt className="eyebrow text-onink-300">{label}</dt>
                  <dd
                    className={`fs-caption font-semibold ${
                      ltr ? "num" : ""
                    } text-white`}
                  >
                    {link ? (
                      <a
                        href={link}
                        className="tap-target hover-rule inline-block hover:text-aqua-300"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Chapter>
    </>
  );
}

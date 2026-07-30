"use client";

import { useState } from "react";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineClock,
  HiCheckCircle,
  HiPaperAirplane,
  HiOutlineArrowTopRightOnSquare,
} from "react-icons/hi2";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/brand/Logo";
import { useI18n } from "@/i18n/I18nProvider";

const field =
  "h-13 w-full rounded-2xl border border-mist-200 bg-mist-50 px-4 text-[0.92rem] text-ink-900 placeholder:text-mist-400 transition-colors focus:border-aqua-400 focus:bg-white focus:outline-none";

const label =
  "text-[0.76rem] font-bold tracking-[0.12em] text-mist-500 uppercase";

export function ContactView() {
  const { t } = useI18n();
  const c = t.contact;
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // UI-only: no backend is wired up yet.
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  const details = [
    {
      Icon: HiOutlineMapPin,
      label: c.info.addressLabel,
      value: c.info.address,
      note: c.info.mapNote,
    },
    {
      Icon: HiOutlinePhone,
      label: c.info.phoneLabel,
      value: "+98 61 3221 5923",
      href: "tel:+986132215923",
      ltr: true,
    },
    {
      Icon: HiOutlineEnvelope,
      label: c.info.emailLabel,
      value: "sales@tarianaoxin.com",
      href: "mailto:sales@tarianaoxin.com",
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
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        crumb={t.nav.contact}
      />

      <section className="mesh-light relative section-y">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            {/* ── Form ─────────────────────────────────────── */}
            <Reveal>
              <div className="ring-gradient relative overflow-hidden rounded-[2rem] border border-mist-200 bg-white p-7 shadow-[var(--shadow-card)] sm:p-10">
                <div className="mb-8 flex flex-col gap-2">
                  <h2 className="fs-h3 font-extrabold text-ink-900">
                    {c.form.title}
                  </h2>
                  <p className="text-[0.92rem] text-mist-500">{c.form.subtitle}</p>
                </div>

                {sent ? (
                  <div className="flex flex-col items-center gap-4 rounded-[1.5rem] border border-leaf-400/30 bg-leaf-400/8 px-6 py-16 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-leaf-600 text-white">
                      <HiCheckCircle className="h-8 w-8" />
                    </span>
                    <p className="max-w-md text-[1rem] leading-relaxed font-semibold text-ink-900">
                      {c.form.success}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-2 text-[0.86rem] font-bold text-aqua-700 underline underline-offset-4"
                    >
                      {c.form.title}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="flex flex-col gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="flex flex-col gap-2">
                        <span className={label}>{c.form.name}</span>
                        <input
                          required
                          name="name"
                          placeholder={c.form.namePlaceholder}
                          className={field}
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className={label}>{c.form.company}</span>
                        <input
                          name="company"
                          placeholder={c.form.companyPlaceholder}
                          className={field}
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className={label}>{c.form.email}</span>
                        <input
                          required
                          type="email"
                          name="email"
                          dir="ltr"
                          placeholder={c.form.emailPlaceholder}
                          className={field}
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className={label}>{c.form.phone}</span>
                        <input
                          type="tel"
                          name="phone"
                          dir="ltr"
                          placeholder={c.form.phonePlaceholder}
                          className={field}
                        />
                      </label>
                    </div>

                    <label className="flex flex-col gap-2">
                      <span className={label}>{c.form.subject}</span>
                      <select name="subject" className={`${field} cursor-pointer`}>
                        {c.form.subjects.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className={label}>{c.form.message}</span>
                      <textarea
                        required
                        name="message"
                        rows={5}
                        placeholder={c.form.messagePlaceholder}
                        className="w-full resize-y rounded-2xl border border-mist-200 bg-mist-50 p-4 text-[0.92rem] leading-relaxed text-ink-900 placeholder:text-mist-400 transition-colors focus:border-aqua-400 focus:bg-white focus:outline-none"
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={sending}
                      className="sheen brand-gradient mt-1 flex h-14 items-center justify-center gap-2.5 rounded-full text-[0.95rem] font-bold text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
                    >
                      <HiPaperAirplane className="h-4 w-4 flip-rtl" />
                      {sending ? c.form.sending : c.form.submit}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* ── Details ──────────────────────────────────── */}
            <div className="flex flex-col gap-5">
              <Reveal delay={100}>
                <div className="mesh-dark relative overflow-hidden rounded-[2rem] p-7 sm:p-8">
                  <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -end-16 -top-16 h-52 w-52 rounded-full bg-aqua-500/25 blur-3xl"
                  />

                  <div className="relative flex flex-col gap-7">
                    <div className="flex items-center gap-3">
                      <LogoMark tone="light" className="h-11 w-11" />
                      <h2 className="text-[1.15rem] font-extrabold text-white">
                        {c.info.title}
                      </h2>
                    </div>

                    <ul className="flex flex-col gap-5">
                      {details.map(({ Icon, label: l, value, href: link, note, ltr }) => (
                        <li key={l} className="flex items-start gap-3.5">
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/6 text-aqua-300">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="flex flex-col gap-0.5">
                            <span className="text-[0.7rem] font-bold tracking-[0.14em] text-ink-100/40 uppercase">
                              {l}
                            </span>
                            {link ? (
                              <a
                                href={link}
                                dir={ltr ? "ltr" : undefined}
                                className="w-fit text-[0.92rem] font-semibold text-white transition-colors hover:text-aqua-300"
                              >
                                {value}
                              </a>
                            ) : (
                              <span className="text-[0.92rem] leading-snug font-semibold text-white">
                                {value}
                              </span>
                            )}
                            {note ? (
                              <span className="text-[0.76rem] text-ink-100/40">
                                {note}
                              </span>
                            ) : null}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>

              {/* Departments */}
              <Reveal delay={170}>
                <div className="flex flex-col gap-4 rounded-[2rem] border border-mist-200 bg-white p-7 shadow-[var(--shadow-card)]">
                  <h2 className="text-[0.72rem] font-bold tracking-[0.22em] text-aqua-700 uppercase">
                    {c.departments.title}
                  </h2>
                  <ul className="flex flex-col">
                    {c.departments.items.map((d, i) => (
                      <li
                        key={d.name}
                        className={`flex flex-wrap items-center justify-between gap-2 py-3.5 ${
                          i > 0 ? "border-t border-mist-100" : ""
                        }`}
                      >
                        <span className="text-[0.88rem] font-bold text-ink-900">
                          {d.name}
                        </span>
                        <a
                          href={`mailto:${d.detail}`}
                          dir="ltr"
                          className="text-[0.84rem] font-semibold text-aqua-700 transition-colors hover:text-aqua-500"
                        >
                          {d.detail}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Map placeholder */}
              <Reveal delay={240}>
                <a
                  href="https://maps.google.com/?q=Ahvaz+Industrial+Zone+2"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group relative flex h-56 flex-col justify-end overflow-hidden rounded-[2rem] border border-mist-200 bg-ink-50 p-6"
                >
                  {/* stylised street grid */}
                  <svg
                    viewBox="0 0 400 220"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden
                  >
                    <rect width="400" height="220" fill="#eef3f7" />
                    <g stroke="#c6d5e0" strokeWidth="1.5">
                      {[30, 80, 130, 180].map((y) => (
                        <line key={y} x1="0" y1={y} x2="400" y2={y} />
                      ))}
                      {[60, 140, 220, 300, 360].map((x) => (
                        <line key={x} x1={x} y1="0" x2={x} y2="220" />
                      ))}
                    </g>
                    <path
                      d="M0 130 L140 130 L140 30 L400 30"
                      stroke="#35bad5"
                      strokeWidth="5"
                      fill="none"
                      opacity="0.55"
                    />
                    <circle cx="140" cy="130" r="26" fill="#17a2bf" opacity="0.14" />
                    <circle cx="140" cy="130" r="9" fill="#0f3b5c" />
                    <circle cx="140" cy="130" r="4" fill="#ffffff" />
                  </svg>

                  <span className="relative flex items-center gap-2 self-start rounded-full bg-ink-900 px-4 py-2.5 text-[0.82rem] font-bold text-white transition-transform duration-300 group-hover:-translate-y-0.5">
                    <HiOutlineMapPin className="h-4 w-4 text-aqua-400" />
                    {c.info.address}
                    <HiOutlineArrowTopRightOnSquare className="h-3.5 w-3.5 opacity-60" />
                  </span>
                </a>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

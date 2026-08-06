"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  HiOutlineBuildingOffice,
  HiOutlineBuildingOffice2,
  HiOutlineChatBubbleLeftRight,
  HiOutlineMapPin,
  HiCheckCircle,
  HiPaperAirplane,
  HiOutlineArrowTopRightOnSquare,
} from "react-icons/hi2";
import {
  Chapter,
  Container,
  Divider,
  SectionHeading,
} from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import {
  IranProvinceMap,
  type BranchMarker,
} from "@/components/home/IranProvinceMap";
import { OPEN_LIVE_HELP_EVENT } from "@/components/support/LiveHelp";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * CONTACT — MEASURED.
 *
 *   1 contacts INK   · headquarters and factory cards
 *   2 message  PAPER · enquiry form + direct 24-hour support
 *   3 offices  INK   · selectable Google Maps embed, factory first
 *   4 branches BOARD · nationwide branch network retained from About
 *
 * The form keeps **native constraint validation** — the
 * browser supplies a message in the user's own language and focuses the
 * first offending field — and adds a visible hairline + `aria-invalid`
 * state on blur. Submission stays the local simulation; no network call.
 */

const PHONE_DISPLAY = "+98 61 3221 5923";
const PHONE_TEL = "+986132215923";
const EMAIL = "sales@tarianaoxin.com";

const BRANCH_POINTS = [
  { id: "ahvaz", x: 198, y: 382 },
  { id: "tehran", x: 286, y: 198 },
  { id: "mashhad", x: 565, y: 174 },
  { id: "isfahan", x: 310, y: 323 },
  { id: "shiraz", x: 334, y: 464 },
  { id: "tabriz", x: 104, y: 92 },
  { id: "rasht", x: 211, y: 109 },
  { id: "bandar-abbas", x: 449, y: 566 },
] as const;

const OFFICE_QUERIES = [
  { id: "factory", query: "Industrial Zone 2, Ahvaz, Khuzestan, Iran" },
  { id: "headquarters", query: "Ahvaz, Khuzestan, Iran" },
  { id: "tehran", query: "Tehran, Iran" },
  { id: "mashhad", query: "Mashhad, Iran" },
  { id: "isfahan", query: "Isfahan, Iran" },
  { id: "shiraz", query: "Shiraz, Iran" },
  { id: "tabriz", query: "Tabriz, Iran" },
  { id: "rasht", query: "Rasht, Iran" },
  { id: "bandar-abbas", query: "Bandar Abbas, Iran" },
] as const;

function googleMapsEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=12&output=embed`;
}

function googleMapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

type FieldEl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const fieldBase =
  "w-full rounded-ctrl border bg-page px-4 fs-body text-ink-900 placeholder:text-mist-550 transition-colors duration-200 focus:border-aqua-600";

const labelClass = "fs-caption font-semibold text-mist-600";

export function ContactView() {
  const { t } = useI18n();
  const c = t.contact;
  const branches = t.about.branches;

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});
  const [activeOfficeId, setActiveOfficeId] = useState("factory");
  const successRef = useRef<HTMLDivElement>(null);

  const branchMarkers = useMemo<BranchMarker[]>(
    () =>
      BRANCH_POINTS.map((point, index) => ({
        ...point,
        name: branches.locations[index],
      })),
    [branches.locations],
  );

  const officeLocations = useMemo(
    () =>
      OFFICE_QUERIES.map((office, index) => {
        if (office.id === "factory") {
          return {
            ...office,
            name: c.info.factoryTitle,
            address: c.info.factoryAddress,
          };
        }

        if (office.id === "headquarters") {
          return {
            ...office,
            name: c.info.headquartersTitle,
            address: c.info.headquartersAddress,
          };
        }

        const branchName = branches.locations[index - 1];
        return { ...office, name: branchName, address: branchName };
      }),
    [
      branches.locations,
      c.info.factoryAddress,
      c.info.factoryTitle,
      c.info.headquartersAddress,
      c.info.headquartersTitle,
    ],
  );

  const activeOffice =
    officeLocations.find((office) => office.id === activeOfficeId) ??
    officeLocations[0];

  const primaryLocations = [
    {
      id: "headquarters",
      Icon: HiOutlineBuildingOffice,
      title: c.info.headquartersTitle,
      address: c.info.headquartersAddress,
      query: OFFICE_QUERIES[1].query,
    },
    {
      id: "factory",
      Icon: HiOutlineBuildingOffice2,
      title: c.info.factoryTitle,
      address: c.info.factoryAddress,
      query: OFFICE_QUERIES[0].query,
    },
  ];

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

  const openLiveHelp = () => {
    window.dispatchEvent(new Event(OPEN_LIVE_HELP_EVENT));
  };

  return (
    <>
      {/* ═══ 1 · PRIMARY CONTACTS — INK ═══════════════════════════ */}
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

        <Container className="relative">
          <h1 className="enter fs-h1 max-w-[18ch] font-bold text-white">
            {c.info.title}
          </h1>

          <div className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-5 lg:grid-cols-2">
            {primaryLocations.map(({ id, Icon, title, address, query }) => (
              <article
                key={id}
                className="enter-fade overflow-hidden rounded-panel border border-hairline-inverse bg-inverse-2"
              >
                <div
                  aria-hidden
                  className="tick-rule h-4 w-full border-b border-hairline-inverse"
                />
                <div className="flex h-full flex-col gap-6 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-tile border border-hairline-inverse bg-white/[0.06] text-aqua-300">
                      <Icon aria-hidden className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <h2 className="fs-h3 font-semibold text-white">{title}</h2>
                      <a
                        href={googleMapsUrl(query)}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="hover-rule mt-2 inline-flex items-start gap-2 fs-body text-onink-200 hover:text-aqua-300"
                      >
                        <HiOutlineMapPin
                          aria-hidden
                          className="mt-1 h-5 w-5 shrink-0 text-aqua-400"
                        />
                        <address className="not-italic">{address}</address>
                      </a>
                    </div>
                  </div>

                  <dl className="grid gap-4 border-t border-hairline-inverse pt-5 sm:grid-cols-3">
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <dt className="eyebrow text-onink-300">
                        {c.info.phoneLabel}
                      </dt>
                      <dd>
                        <a
                          href={`tel:${PHONE_TEL}`}
                          className="num hover-rule fs-caption font-semibold text-white hover:text-aqua-300"
                        >
                          {PHONE_DISPLAY}
                        </a>
                      </dd>
                    </div>
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <dt className="eyebrow text-onink-300">
                        {c.info.emailLabel}
                      </dt>
                      <dd>
                        <a
                          href={`mailto:${EMAIL}`}
                          className="num hover-rule break-all fs-caption font-semibold text-white hover:text-aqua-300"
                        >
                          {EMAIL}
                        </a>
                      </dd>
                    </div>
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <dt className="eyebrow text-onink-300">
                        {c.info.hoursLabel}
                      </dt>
                      <dd className="fs-caption font-semibold text-white">
                        {c.info.hours}
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 2 · MESSAGE + DIRECT SUPPORT — PAPER ═════════════════ */}
      <Chapter tone="paper" pad="base">
        <Container>
          <SectionHeading title={c.form.title} subtitle={c.form.subtitle} />

          <div className="stack-block grid items-start gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[minmax(0,1fr)_22rem]">
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

            <Reveal variant="fade" delay={80}>
              <aside className="overflow-hidden rounded-card border border-hairline bg-sunken">
                <div
                  aria-hidden
                  className="tick-rule h-4 border-b border-hairline-strong"
                />
                <div className="flex flex-col items-start gap-5 p-6 sm:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-tile border border-hairline bg-page text-aqua-700">
                    <HiOutlineChatBubbleLeftRight
                      aria-hidden
                      className="h-6 w-6"
                    />
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="eyebrow text-aqua-700">
                      {c.support.eyebrow}
                    </span>
                    <h3 className="fs-h3 font-semibold text-ink-900">
                      {c.support.title}
                    </h3>
                    <p className="fs-body text-mist-600">{c.support.body}</p>
                  </div>
                  <Button
                    type="button"
                    size="lg"
                    onClick={openLiveHelp}
                    className="w-full"
                  >
                    <HiOutlineChatBubbleLeftRight
                      aria-hidden
                      className="h-5 w-5"
                    />
                    {c.support.button}
                  </Button>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Chapter>

      {/* ═══ 3 · OFFICE LOCATIONS — INK · GOOGLE MAP ══════════════ */}
      <Chapter tone="ink" pad="base">
        <div
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-0 opacity-50"
        />

        <Container className="relative">
          <SectionHeading
            eyebrow={c.map.eyebrow}
            title={c.map.title}
            subtitle={c.map.subtitle}
            tone="light"
            reveal="fade"
          />

          <Reveal variant="scale" className="stack-block">
            <div className="overflow-hidden rounded-panel border border-hairline-inverse bg-inverse-2 shadow-e2">
              <div
                aria-hidden
                className="tick-rule h-4 border-b border-hairline-inverse"
              />
              <div className="grid lg:grid-cols-[20rem_minmax(0,1fr)]">
                <div className="flex max-h-[34rem] flex-col border-b border-hairline-inverse lg:border-b-0 lg:border-e">
                  <div className="border-b border-hairline-inverse p-5 sm:p-6">
                    <p className="eyebrow text-onink-300">
                      {c.map.locationListLabel}
                    </p>
                  </div>
                  <div className="rail flex gap-2 overflow-x-auto p-3 lg:flex-1 lg:flex-col lg:overflow-y-auto lg:p-4">
                    {officeLocations.map((office) => {
                      const selected = office.id === activeOffice.id;
                      return (
                        <button
                          key={office.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setActiveOfficeId(office.id)}
                          className={`hover-rule flex min-w-[12rem] items-start gap-3 rounded-ctrl border px-4 py-3 text-start lg:min-w-0 ${
                            selected
                              ? "border-aqua-400 bg-white/[0.1] text-white"
                              : "border-hairline-inverse bg-transparent text-onink-200 hover:bg-white/[0.05] hover:text-white"
                          }`}
                        >
                          <HiOutlineMapPin
                            aria-hidden
                            className={`mt-0.5 h-5 w-5 shrink-0 ${
                              selected ? "text-aqua-300" : "text-onink-300"
                            }`}
                          />
                          <span className="min-w-0">
                            <span className="fs-caption block font-semibold">
                              {office.name}
                            </span>
                            <span className="fs-micro mt-1 block text-onink-300">
                              {office.address}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="relative bg-page">
                  <iframe
                    key={activeOffice.id}
                    title={`${c.map.embedTitle}: ${activeOffice.name}`}
                    src={googleMapsEmbedUrl(activeOffice.query)}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[26rem] w-full border-0 sm:h-[34rem]"
                  />
                  <div className="absolute inset-x-3 bottom-3 flex justify-end sm:inset-x-5 sm:bottom-5">
                    <a
                      href={googleMapsUrl(activeOffice.query)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover-rule inline-flex min-h-11 items-center gap-2 rounded-ctrl border border-hairline bg-page px-4 fs-caption font-semibold text-ink-900 shadow-e2 hover:border-aqua-600 hover:text-aqua-700"
                    >
                      {c.map.openInGoogleMaps}
                      <HiOutlineArrowTopRightOnSquare
                        aria-hidden
                        className="h-4 w-4 flip-rtl"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Chapter>

      {/* ═══ 4 · BRANCHES — BOARD · NATIONWIDE NETWORK ════════════ */}
      <Chapter
        id="branches"
        tone="board"
        pad="base"
        seam="both"
        className="scroll-mt-[var(--nav-h)]"
      >
        <Container>
          <SectionHeading
            eyebrow={branches.eyebrow}
            title={branches.title}
            subtitle={branches.subtitle}
            reveal="fade"
          />

          <Reveal variant="scale" className="stack-block">
            <figure className="overflow-hidden rounded-panel border border-hairline-inverse bg-inverse-2 shadow-e2">
              <div
                aria-hidden
                className="tick-rule h-4 w-full border-b border-hairline-inverse"
              />

              <div className="grid lg:grid-cols-[minmax(0,1fr)_20rem]">
                <div className="border-b border-hairline-inverse px-3 py-5 sm:px-7 lg:border-b-0 lg:border-e">
                  <IranProvinceMap
                    label={branches.mapAlt}
                    branches={branchMarkers}
                  />
                </div>

                <figcaption className="flex flex-col justify-center gap-6 p-6 sm:p-8">
                  <p className="fs-body text-onink-200">{branches.note}</p>
                  <ol className="grid grid-cols-2 gap-x-5 gap-y-3 border-t border-hairline-inverse pt-5 lg:grid-cols-1">
                    {branches.locations.map((location) => (
                      <li
                        key={location}
                        className="fs-caption flex items-center gap-3 font-semibold text-white"
                      >
                        <span
                          aria-hidden
                          className="h-2.5 w-2.5 shrink-0 rounded-chip bg-sand-500 ring-2 ring-white/70"
                        />
                        <span>{location}</span>
                      </li>
                    ))}
                  </ol>
                </figcaption>
              </div>
            </figure>
          </Reveal>
        </Container>
      </Chapter>
    </>
  );
}

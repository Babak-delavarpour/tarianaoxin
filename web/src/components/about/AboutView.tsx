"use client";

import {
  Chapter,
  Container,
  SectionHeading,
} from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/home/CtaBand";
import { Quality } from "@/components/home/Quality";
import { HeritageStamp } from "@/components/brand/HeritageStamp";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * ABOUT — MEASURED.
 *
 * Chapter order and archetypes (§4.1 / §4.4). No two neighbours share a
 * silhouette, and the page carries **no cards at all**: everything is
 * hairlines, ruled plates and value contrast.
 *
 *   1 masthead  INK   · SPLIT           (copy + capability plinth)
 *   2 story     BOARD · LEDGER rows     (three ruled clauses, editorial)
 *   3 facility  INK   · drawn elevation + title block
 *   4 <Quality> PAPER · LEDGER columns  (owned by another agent)
 *   5 <CtaBand> INK   · BAND            (owned by another agent)
 *
 * Value sequence: ink → board → ink → paper → ink.
 */

/**
 * The page's one bespoke object: a hairline elevation of the plant —
 * north-light production hall, warehouse block, silos, stack. Drawn, not
 * photographed, and purely decorative (`aria-hidden`): every fact on this
 * page is in the type. The geometry is symmetric in intent and carries no
 * directional meaning, so it is not mirrored in RTL.
 */
function PlantElevation() {
  const bays = [0, 1, 2, 3];
  const rackRows = [0, 1, 2];
  const rackCols = [0, 1, 2, 3];

  return (
    <svg
      viewBox="0 0 880 300"
      className="h-auto w-full"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* dimension rule — an elevation always carries one */}
      <g className="stroke-aqua-400" strokeWidth="1" opacity="0.45">
        <path d="M40 274 H840" />
        <path d="M40 266 V282 M840 266 V282 M440 268 V280" />
      </g>

      {/* ground */}
      <path d="M0 250 H880" className="stroke-onink-300" strokeWidth="1.5" />

      {/* ── production hall — north-light sawtooth ─────────────── */}
      <g className="stroke-onink-300" strokeWidth="1.5">
        <path d="M60 250 V166 M380 250 V166 M60 166 H380" />
      </g>
      {bays.map((i) => {
        const x = 60 + i * 80;
        return (
          <g key={`bay-${i}`}>
            <path
              d={`M${x} 166 V130`}
              className="stroke-aqua-400"
              strokeWidth="2.5"
              opacity="0.85"
            />
            <path
              d={`M${x} 130 L${x + 80} 166`}
              className="stroke-onink-300"
              strokeWidth="1.5"
            />
          </g>
        );
      })}
      {/* loading bays */}
      <g className="stroke-onink-400" strokeWidth="1">
        <path d="M104 250 V202 H164 V250" />
        <path d="M104 216 H164 M104 230 H164 M104 244 H164" />
        <path d="M256 250 V202 H316 V250" />
        <path d="M256 216 H316 M256 230 H316 M256 244 H316" />
      </g>

      {/* ── warehouse block ────────────────────────────────────── */}
      <g className="stroke-onink-300" strokeWidth="1.5">
        <path d="M400 250 V112 H640 V250" />
        <path d="M392 112 H648" strokeWidth="2.5" />
      </g>
      {rackRows.map((r) =>
        rackCols.map((c) => (
          <rect
            key={`rack-${r}-${c}`}
            x={420 + c * 55}
            y={140 + r * 34}
            width="44"
            height="22"
            className="stroke-onink-400"
            strokeWidth="1"
          />
        )),
      )}

      {/* ── silos ──────────────────────────────────────────────── */}
      <g className="stroke-onink-300" strokeWidth="1.5">
        <path d="M678 250 V152 A22 20 0 0 1 722 152 V250" />
        <path d="M738 250 V152 A22 20 0 0 1 782 152 V250" />
        <path d="M722 142 H738" />
      </g>
      <g className="stroke-aqua-400" strokeWidth="1" opacity="0.6">
        <path d="M678 190 H722 M678 218 H722" />
        <path d="M738 190 H782 M738 218 H782" />
      </g>

      {/* ── stack + registration mark ──────────────────────────── */}
      <g className="stroke-onink-300" strokeWidth="1.5">
        <path d="M810 250 V72 H832 V250" />
      </g>
      <g className="stroke-aqua-400" strokeWidth="1.5" opacity="0.8">
        <path d="M810 92 H832 M810 110 H832" />
        <path d="M821 72 V50" strokeWidth="1" opacity="0.6" />
      </g>
      <circle cx="821" cy="44" r="3.5" className="fill-aqua-400" opacity="0.8" />
    </svg>
  );
}

export function AboutView() {
  const { t, num, locale } = useI18n();
  const a = t.about;

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
          className="pointer-events-none absolute -top-56 -start-40 h-[42rem] w-[42rem] rounded-chip bg-aqua-500/12 blur-[130px]"
        />
        <div
          aria-hidden
          className="grain-layer pointer-events-none absolute inset-0 opacity-[0.08]"
        />

        <Container className="relative grid gap-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[1fr_0.82fr] lg:items-end lg:gap-[clamp(2.5rem,5vw,5rem)]">
          <div className="enter flex flex-col items-start gap-5">
            <h1 className="fs-h1 max-w-[18ch] font-bold text-white">
              {a.hero.title}
            </h1>

            <p className="fs-lead max-w-[56ch] text-onink-200">
              {a.hero.subtitle}
            </p>
          </div>

          <div className="enter-fade flex w-full flex-col items-center gap-7">
            {locale === "fa" && <HeritageStamp caption="نشان برند" />}

            {locale !== "fa" && (
              /* capability plinth — the plant's real numbers, stated once */
              <figure className="w-full overflow-hidden rounded-panel border border-hairline-inverse bg-inverse-2">
                <div
                  aria-hidden
                  className="tick-rule h-4 w-full border-b border-hairline-inverse"
                />
                <dl className="plate-rule-ink grid-cols-2">
                  {a.facility.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex flex-col-reverse gap-1.5 bg-inverse-2 px-4 py-5 sm:px-5 sm:py-6"
                    >
                      {/* label first in the DOM, value first to the eye */}
                      <dt className="fs-caption text-onink-300">{spec.label}</dt>
                      <dd className="fs-h3 font-bold tabular-nums text-white">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <figcaption className="flex items-center justify-between gap-4 border-t border-hairline-inverse px-5 py-3.5">
                  <span className="eyebrow text-onink-300">
                    {a.facility.eyebrow}
                  </span>
                  <span aria-hidden className="flex shrink-0 gap-1">
                    <i className="block h-1.5 w-1.5 rounded-chip bg-aqua-400/80" />
                    <i className="block h-1.5 w-1.5 rounded-chip bg-onink-400/60" />
                    <i className="block h-1.5 w-1.5 rounded-chip bg-onink-400/60" />
                  </span>
                </figcaption>
              </figure>
            )}
          </div>
        </Container>
      </section>

      {/* ═══ 2 · STORY — BOARD · LEDGER rows ══════════════════════ */}
      <Chapter tone="board" pad="base" seam="both">
        <Container>
          <SectionHeading
            eyebrow={a.story.eyebrow}
            title={a.story.title}
            reveal="fade"
          />

          <RevealGroup
            as="ol"
            variant="fade"
            className="stack-block border-t border-hairline-strong"
          >
            {[a.story.body1, a.story.body2, a.story.body3].map((clause, i) => (
              <li
                key={i}
                className="grid gap-3 border-b border-hairline py-7 sm:grid-cols-[6rem_1fr] sm:gap-8 sm:py-8 lg:grid-cols-[10rem_1fr] lg:gap-16"
              >
                <span className="eyebrow num pt-1 text-mist-600">
                  {`${num(0)}${num(i + 1)}`}
                </span>
                <p
                  className={
                    i === 0
                      ? "fs-h3 max-w-[42ch] font-semibold text-ink-900"
                      : "fs-body max-w-[64ch] text-ink-800"
                  }
                >
                  {clause}
                </p>
              </li>
            ))}
          </RevealGroup>
        </Container>
      </Chapter>

      {/* ═══ 3 · FACILITY — INK · drawn elevation ═════════════════ */}
      <Chapter tone="ink" pad="base">
        <div
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-0 opacity-50"
        />

        <Container className="relative">
          <SectionHeading
            eyebrow={a.facility.eyebrow}
            title={a.facility.title}
            subtitle={a.facility.subtitle}
            tone="light"
          />

          <Reveal variant="scale" className="stack-block">
            <figure className="overflow-hidden rounded-panel border border-hairline-inverse bg-inverse-2">
              <div
                aria-hidden
                className="tick-rule h-4 w-full border-b border-hairline-inverse"
              />

              <div className="px-[clamp(0.75rem,3vw,3rem)] py-[clamp(1.5rem,4vw,3.5rem)]">
                <PlantElevation />
              </div>

              {/* title block — what an elevation drawing actually carries */}
              <dl className="plate-rule-ink border-t border-hairline-inverse sm:grid-cols-2">
                <div className="flex flex-col gap-1.5 bg-inverse-2 px-5 py-5">
                  <dt className="eyebrow text-onink-300">
                    {a.facility.eyebrow}
                  </dt>
                  <dd className="fs-caption font-semibold text-white">
                    {t.brand.legal}
                  </dd>
                </div>
                <div className="flex flex-col gap-1.5 bg-inverse-2 px-5 py-5">
                  <dt className="eyebrow text-onink-300">{t.common.since}</dt>
                  <dd className="fs-caption num font-semibold text-white">
                    {a.timeline.items[0].year}
                  </dd>
                </div>
              </dl>
            </figure>
          </Reveal>
        </Container>
      </Chapter>

      {/* ═══ 4 · CERTIFICATION — PAPER · LEDGER columns ═══════════ */}
      <Quality />

      {/* ═══ 5 · CLOSE — INK · BAND ══════════════════════════════ */}
      <CtaBand
        title={a.cta.title}
        body={a.cta.body}
        primary={a.cta.primary}
        primaryHref="/contact"
        secondary={a.cta.secondary}
        secondaryHref="/products"
      />
    </>
  );
}

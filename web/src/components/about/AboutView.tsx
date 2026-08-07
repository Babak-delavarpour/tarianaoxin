"use client";

import { useMemo } from "react";

import {
  Chapter,
  Container,
  SectionHeading,
} from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/home/CtaBand";
import { Quality } from "@/components/home/Quality";
import { HeritageStamp } from "@/components/brand/HeritageStamp";
import {
  IranProvinceMap,
  type BranchMarker,
} from "@/components/home/IranProvinceMap";
import { useI18n } from "@/i18n/I18nProvider";

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

/**
 * ABOUT — MEASURED.
 *
 * Chapter order and archetypes (§4.1 / §4.4). No two neighbours share a
 * silhouette, and the page carries **no cards at all**: everything is
 * hairlines, ruled plates and value contrast.
 *
 *   1 masthead  INK   · SPLIT           (copy + capability plinth)
 *   2 story     BOARD · EDITORIAL RAIL  (heading + three balanced chapters)
 *   3 facility  INK   · drawn elevation + title block
 *   4 branches  BOARD · mapped network  (locations + interactive points)
 *   5 <Quality> PAPER · LEDGER columns
 *   6 <CtaBand> INK   · BAND
 *
 * Value sequence: ink → board → ink → board → paper → ink.
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
  const { t, num } = useI18n();
  const a = t.about;
  const branchMarkers = useMemo<BranchMarker[]>(
    () =>
      BRANCH_POINTS.map((point, index) => ({
        ...point,
        name: a.branches.locations[index],
      })),
    [a.branches.locations],
  );

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
            <HeritageStamp caption={a.hero.stampCaption} />
          </div>
        </Container>
      </section>

      {/* ═══ 2 · STORY — BOARD · EDITORIAL RAIL ═══════════════════ */}
      <Chapter tone="board" pad="base" seam="both">
        <Container className="grid gap-[clamp(2.75rem,6vw,6.5rem)] lg:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.28fr)] lg:items-start">
          <SectionHeading
            eyebrow={a.story.eyebrow}
            title={a.story.title}
            reveal="fade"
            className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:pt-1"
            titleClassName="max-w-[18ch] text-pretty"
          />

          <RevealGroup
            as="ol"
            variant="fade"
            className="border-t border-hairline-strong"
          >
            {[
              { title: a.story.title1, body: a.story.body1 },
              { title: a.story.title2, body: a.story.body2 },
              { title: a.story.title3, body: a.story.body3 },
            ].map((chapter, i) => (
              <li
                key={chapter.title}
                className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 border-b border-hairline py-[clamp(1.75rem,3vw,2.75rem)] sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-7"
              >
                <span className="num fs-caption flex h-10 w-10 items-center justify-center rounded-chip border border-aqua-600/25 bg-aqua-500/10 font-bold text-aqua-800 sm:h-12 sm:w-12">
                  {`${num(0)}${num(i + 1)}`}
                </span>
                <div className="min-w-0">
                  <h3 className="fs-h4 font-bold text-ink-900">
                    {chapter.title}
                  </h3>
                  <p className="fs-lead mt-2.5 max-w-[62ch] text-ink-700">
                    {chapter.body}
                  </p>
                </div>
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

      {/* ═══ 4 · BRANCHES — BOARD · mapped network ═══════════════ */}
      <Chapter
        id="branches"
        tone="board"
        pad="base"
        seam="both"
        className="scroll-mt-[var(--nav-h)]"
      >
        <Container>
          <SectionHeading
            eyebrow={a.branches.eyebrow}
            title={a.branches.title}
            subtitle={a.branches.subtitle}
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
                    label={a.branches.mapAlt}
                    branches={branchMarkers}
                  />
                </div>

                <figcaption className="flex flex-col justify-center gap-6 p-6 sm:p-8">
                  <p className="fs-body text-onink-200">{a.branches.note}</p>
                  <ol className="grid grid-cols-2 gap-x-5 gap-y-3 border-t border-hairline-inverse pt-5 lg:grid-cols-1">
                    {a.branches.locations.map((location) => (
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

      {/* ═══ 5 · CERTIFICATION — PAPER · LEDGER columns ═══════════ */}
      <Quality />

      {/* ═══ 6 · CLOSE — INK · BAND ══════════════════════════════ */}
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

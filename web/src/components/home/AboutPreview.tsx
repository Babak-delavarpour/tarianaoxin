"use client";

import { HiArrowUpRight, HiCheck } from "react-icons/hi2";
import {
  Chapter,
  Container,
  SectionHeading,
} from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProductArt } from "@/components/brand/ProductArt";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * ABOUTPREVIEW (§4.3 / 3) — BOARD · SPLIT, mirrored.
 *
 * The object leads on `lg`, so this split is the exact mirror of the
 * hero's (1.02fr copy / 0.98fr object becomes 0.98fr object / 1.02fr
 * copy). The plate is this chapter's single permitted `brand-gradient`
 * surface; everything else on the section is hairline and type.
 *
 * The four proof points are a ruled LEDGER, not four bordered chips —
 * the card recipe here is deliberately "no card", so it cannot collide
 * with the CategoryGrid mosaic that follows.
 */
export function AboutPreview() {
  const { t, href } = useI18n();
  const a = t.home.about;

  return (
    <Chapter tone="board" pad="base" seam="bottom">
      <Container>
        <div className="grid items-center gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[0.98fr_1.02fr]">
          {/* ── The object ───────────────────────────────────── */}
          <Reveal
            as="figure"
            variant="fade"
            className="relative order-2 lg:order-1"
          >
            <div className="brand-gradient relative isolate overflow-hidden rounded-panel border border-hairline-inverse">
              <span
                aria-hidden
                className="grid-lines pointer-events-none absolute inset-0 opacity-60"
              />
              <span
                aria-hidden
                className="tick-rule pointer-events-none absolute inset-x-0 top-0 h-4"
              />

              <div className="grid aspect-[4/3.15] place-items-center px-[clamp(1.75rem,5vw,3.25rem)] pt-[clamp(2.25rem,4.5vw,3.25rem)] pb-[clamp(4.25rem,8vw,5.5rem)]">
                <ProductArt
                  art="plate"
                  className="h-full w-full max-w-[21rem]"
                />
              </div>

            </div>

            {/* One stamped marking, Latin-locked. */}
            <figcaption
              dir="ltr"
              className="absolute bottom-[clamp(1.25rem,3vw,2rem)] start-[clamp(1.25rem,3vw,2rem)] inline-flex items-center gap-2 rounded-chip bg-ink-900 px-3.5 py-2 fs-micro font-semibold text-white"
            >
              <span
                aria-hidden
                className="block h-1.5 w-1.5 shrink-0 rounded-chip bg-aqua-400"
              />
              ISO 9001 · HACCP
            </figcaption>
          </Reveal>

          {/* ── The copy ─────────────────────────────────────── */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow={a.eyebrow}
              title={a.title}
              reveal="fade"
            />

            <div className="stack-block flex flex-col gap-5">
              <Reveal variant="fade" as="p" className="fs-lead max-w-[54ch] text-ink-800">
                {a.body1}
              </Reveal>
              <Reveal
                variant="fade"
                as="p"
                delay={60}
                className="fs-body max-w-[58ch] text-mist-600"
              >
                {a.body2}
              </Reveal>
            </div>

            <RevealGroup
              as="ul"
              variant="fade"
              className="mt-[clamp(2rem,3.5vw,2.75rem)] divide-y divide-hairline border-t border-hairline"
            >
              {a.points.map((point) => (
                <li
                  key={point}
                  className="fs-body flex items-start gap-3.5 py-4 text-ink-800"
                >
                  <HiCheck
                    aria-hidden
                    className="mt-1 h-4 w-4 shrink-0 text-aqua-700"
                  />
                  {point}
                </li>
              ))}
            </RevealGroup>

            <Reveal variant="fade" className="mt-[clamp(2rem,3.5vw,2.75rem)]">
              <ButtonLink href={href("/about")} size="lg" variant="solid">
                {t.common.learnMore}
                <HiArrowUpRight aria-hidden className="h-4 w-4 shrink-0 flip-rtl" />
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </Chapter>
  );
}

"use client";

import { Chapter, Container, SectionHeading } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Section 8 — BOARD · archetype E (LEDGER, ruled rows in two columns).
 *
 * The 3×2 wall of identical shadowed cards is gone: six icon tiles, six
 * corner glows and six sweeping underline bars with it. What is left is
 * a ruled two-column ledger — the same silhouette a spec sheet uses for
 * a list of guarantees. The only mark per row is a 32×2px aqua tick, the
 * single flourish §4.3 permits here.
 *
 * Rules are `hairline-strong` rather than `hairline`: on the BOARD
 * surface (#e8eef4) a #dfe8ef rule is invisible (see notes in the PR).
 */
export function WhyUs() {
  const { t } = useI18n();
  const w = t.home.why;

  return (
    <Chapter tone="board" pad="base" seam="both">
      <Container>
        {/* BOARD chapters fade, PAPER rises — SectionHeading only knows
            the text tone, so the chapter variant is set explicitly. */}
        <SectionHeading eyebrow={w.eyebrow} title={w.title} reveal="fade" />

        <RevealGroup
          as="ul"
          variant="fade"
          stagger={60}
          className="stack-block grid border-t border-hairline-strong sm:grid-cols-2 sm:gap-x-14 lg:gap-x-20"
        >
          {w.items.map((item) => (
            <li
              key={item.title}
              className="border-b border-hairline-strong py-7 sm:py-8"
            >
              <span aria-hidden className="block h-0.5 w-8 bg-aqua-600" />
              <h3 className="fs-h4 mt-5 font-semibold text-ink-900">
                {item.title}
              </h3>
              <p className="fs-body mt-2.5 max-w-[46ch] text-mist-600">
                {item.body}
              </p>
            </li>
          ))}
        </RevealGroup>
      </Container>
    </Chapter>
  );
}

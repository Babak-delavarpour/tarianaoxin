"use client";

import { Chapter, Container, SectionHeading } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Section 6 — INK · archetype E (LEDGER, rows) · no cards.
 *
 * Four glass tiles with four Heroicons became one ruled ledger. The
 * stage numerals ARE the composition: `fs-numeral` set solid, tabular,
 * in aqua, running down the leading edge like stamped stage marks on a
 * production traveller. No chrome, no icon chips, no hover flourish.
 * Rows read numeral → title → body on desktop and stack under the
 * numeral below `lg`, and the whole thing mirrors for free because the
 * only structure is grid placement.
 */
export function Process() {
  const { t, num } = useI18n();
  const p = t.home.process;

  return (
    <Chapter tone="ink" pad="base">
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden
        className="grain-layer pointer-events-none absolute inset-0 opacity-[0.08]"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow={p.eyebrow}
          title={p.title}
          subtitle={p.subtitle}
          tone="light"
        />

        <RevealGroup
          as="ol"
          variant="fade"
          stagger={90}
          className="stack-block border-t border-hairline-inverse divide-y divide-hairline-inverse"
        >
          {p.steps.map((step, i) => (
            <li
              key={step.title}
              className="grid items-start gap-3 py-9 sm:grid-cols-[6.5rem_1fr] sm:gap-x-10 sm:py-11 lg:grid-cols-[9rem_1fr_1fr] lg:gap-x-14 lg:py-12"
            >
              {/* `.num` locks the glyph run to LTR, which would otherwise
                  left-align the numeral inside a right-hand RTL column —
                  `justify-self-start` re-anchors the box to the grid's
                  own inline start. */}
              <span className="num fs-numeral justify-self-start font-extrabold text-aqua-300/85 sm:row-span-2 lg:row-span-1">
                {`${num(0)}${num(i + 1)}`}
              </span>
              <h3 className="fs-h3 font-semibold text-white">{step.title}</h3>
              <p className="fs-body max-w-[52ch] text-onink-200 sm:col-start-2 lg:col-start-3 lg:row-start-1">
                {step.body}
              </p>
            </li>
          ))}
        </RevealGroup>
      </Container>
    </Chapter>
  );
}

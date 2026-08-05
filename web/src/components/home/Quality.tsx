"use client";

import { HiArrowUpRight } from "react-icons/hi2";
import { Chapter, Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * True when a certification code is Latin-locked ("ISO 9001") and can
 * safely be isolated LTR. The fa/ar dictionaries localise one of the
 * four codes ("گرید FDA" / "درجة FDA"), and forcing `dir="ltr"` on a
 * mixed-script string reverses its word order — so that one keeps the
 * page direction and skips `.num`.
 */
const isLatinCode = (code: string) => !/[^\x20-\x7E]/.test(code);

/**
 * Section 9 — PAPER · archetype E (LEDGER, **columns**) · no cards.
 *
 * Credentials, not features. The four identical `HiOutlineDocumentCheck`
 * tiles are deleted and the split layout is dropped: the certification
 * codes run edge to edge as a single ruled register, set at `fs-h3
 * font-bold text-ink-900` so they read as stamped credentials rather
 * than as decoration. WhyUs above rules in rows, this rules in columns —
 * two adjacent LEDGERs on different axes, per §4.1.
 */
export function Quality() {
  const { t, href } = useI18n();
  const q = t.home.quality;

  return (
    <Chapter tone="paper" pad="tight" seam="bottom" id="quality">
      <Container>
        <SectionHeading eyebrow={q.eyebrow} title={q.title} subtitle={q.subtitle}>
          <div className="mt-2">
            <ButtonLink
              href={href("/about#quality")}
              variant="outline"
              size="md"
            >
              {t.common.downloadCatalog}
              <HiArrowUpRight className="h-4 w-4 flip-rtl" />
            </ButtonLink>
          </div>
        </SectionHeading>

        {/* Ruled plate: the parent's hairline shows through the 1px gaps,
            so the rules are direction-agnostic and need no RTL variant.
            Revealed as ONE object rather than as a RevealGroup — with a
            coloured parent, staggering the cells would flash the plate
            as a solid grey block before the white cells faded in. */}
        <Reveal variant="rise" delay={80} className="stack-block">
          <ul className="grid grid-cols-2 gap-px border-y border-hairline bg-hairline lg:grid-cols-4">
            {q.items.map((item) => {
              const latin = isLatinCode(item.code);
              return (
                <li
                  key={item.code}
                  className="bg-page px-5 py-8 sm:px-6 sm:py-10"
                >
                  <span
                    dir={latin ? "ltr" : undefined}
                    className={`fs-h3 font-bold text-ink-900 ${latin ? "num" : ""}`}
                  >
                    {item.code}
                  </span>
                  <p className="fs-caption mt-3 text-mist-600">{item.label}</p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </Chapter>
  );
}

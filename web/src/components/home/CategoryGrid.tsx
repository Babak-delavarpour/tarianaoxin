"use client";

import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import { Chapter, Container, SectionHeading } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProductArt } from "@/components/brand/ProductArt";
import { categories } from "@/lib/catalog";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * CATEGORYGRID (§4.3 / 4) — PAPER · MOSAIC · CARD/PANEL.
 *
 * Eight families, three cell sizes: the first is a 2×2 featured cell,
 * the last is a 2×1 ledger row, the six between are square panels. The
 * unit count resolves exactly at 2, 3 and 4 columns (10 / 12 / 12
 * cells), so the mosaic never leaves a hole at any width.
 *
 * Hierarchy is a value step, not a shadow: the featured cell rests on
 * `bg-sunken`, the rest are white plates held by their hairline. The old
 * full-bleed gradient wash that inverted every label to white is gone —
 * hover is a hairline lifting to `aqua-700` plus that same fill, so type
 * contrast is identical in both states and nothing can latch after a tap
 * on a touch screen.
 */

/** CARD/PANEL (§4.2) — the only card recipe on this section. */
const panel =
  "group flex h-full rounded-card border border-hairline transition-colors duration-300 hover:border-aqua-700";
/** White plate on paper: the hairline carries it, and the hover wash
 *  brings it up to the featured cell's value. */
const panelWhite = `${panel} bg-page hover:bg-sunken`;
/** The featured cell rests one value step down, which is what makes it
 *  read as the focal plate without a shadow or a gradient. Its hover is
 *  the lift, so it takes no fill change. */
const panelTinted = `${panel} bg-sunken`;

const cellPad = "p-[clamp(1.15rem,2.6vw,1.5rem)]";

export function CategoryGrid() {
  const { t, locale, href, num } = useI18n();
  const last = categories.length - 1;

  return (
    <Chapter tone="paper" pad="base">
      <Container>
        <SectionHeading
          eyebrow={t.home.categories.eyebrow}
          title={t.home.categories.title}
          subtitle={t.home.categories.subtitle}
          action={
            <ButtonLink href={href("/products")} variant="ghost" size="md">
              {t.common.viewAll}
              <HiArrowUpRight aria-hidden className="h-4 w-4 shrink-0 flip-rtl" />
            </ButtonLink>
          }
        />

        <RevealGroup className="stack-block grid grid-cols-2 grid-gutter sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const count = (
              <span className="eyebrow text-mist-600">
                <span className="num">{num(cat.skus)}</span>{" "}
                {t.common.results}
              </span>
            );

            /* ── The hero cell: 2×2, twice the artwork, blurb always
                  visible, and the only lifting card on the page. ── */
            if (i === 0) {
              return (
                <Link
                  key={cat.id}
                  href={href(`/products#${cat.slug}`)}
                  className={`${panelTinted} lift col-span-2 flex-col gap-6 p-[clamp(1.5rem,3.5vw,2.5rem)] sm:row-span-2`}
                >
                  <div className="flex items-start justify-between gap-4">
                    {count}
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tile border border-hairline bg-page text-aqua-700 transition-colors duration-300 group-hover:border-aqua-700">
                      <HiArrowUpRight aria-hidden className="h-4 w-4 flip-rtl" />
                    </span>
                  </div>

                  <div className="grid flex-1 place-items-center py-[clamp(1rem,3vw,2rem)]">
                    <ProductArt
                      art={cat.art}
                      className="h-[clamp(7rem,17vw,12rem)] w-auto"
                    />
                  </div>

                  <div className="flex flex-col gap-2.5 border-t border-hairline pt-5">
                    <h3 className="fs-h3 font-semibold text-ink-900">
                      {cat.name[locale]}
                    </h3>
                    <p className="fs-body max-w-[44ch] text-mist-600">
                      {cat.blurb[locale]}
                    </p>
                  </div>
                </Link>
              );
            }

            /* ── The tail cell: 2×1, laid out as a ruled ledger row so
                  the mosaic ends on a different silhouette. ── */
            if (i === last) {
              return (
                <Link
                  key={cat.id}
                  href={href(`/products#${cat.slug}`)}
                  className={`${panelWhite} col-span-2 flex-row items-center gap-[clamp(1rem,3vw,1.75rem)] ${cellPad}`}
                >
                  <div className="grid shrink-0 place-items-center">
                    <ProductArt
                      art={cat.art}
                      className="h-[clamp(3.5rem,8vw,4.75rem)] w-auto"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-1.5 border-s border-hairline ps-[clamp(1rem,3vw,1.75rem)]">
                    {count}
                    <h3 className="fs-h4 font-semibold text-ink-900">
                      {cat.name[locale]}
                    </h3>
                    <p className="fs-caption hidden max-w-[52ch] text-mist-600 sm:block">
                      {cat.blurb[locale]}
                    </p>
                  </div>
                </Link>
              );
            }

            /* ── The six square panels. ── */
            return (
              <Link
                key={cat.id}
                href={href(`/products#${cat.slug}`)}
                className={`${panelWhite} flex-col gap-4 ${cellPad}`}
              >
                <div className="grid flex-1 place-items-center py-[clamp(0.75rem,2.5vw,1.5rem)]">
                  <ProductArt
                    art={cat.art}
                    className="h-[clamp(3.75rem,9vw,5.25rem)] w-auto"
                  />
                </div>
                <div className="flex flex-col gap-1.5 border-t border-hairline pt-4">
                  {count}
                  <h3 className="fs-h4 font-semibold text-ink-900">
                    {cat.name[locale]}
                  </h3>
                  <p className="fs-caption hidden text-mist-600 sm:block">
                    {cat.blurb[locale]}
                  </p>
                </div>
              </Link>
            );
          })}
        </RevealGroup>
      </Container>
    </Chapter>
  );
}

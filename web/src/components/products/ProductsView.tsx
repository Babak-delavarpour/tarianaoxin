"use client";

import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import {
  Chapter,
  Container,
  Eyebrow,
  SectionHeading,
} from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProductArt } from "@/components/brand/ProductArt";
import { categories, products } from "@/lib/catalog";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * PRODUCTS — MEASURED.
 *
 * The catalogue overview, built as a manufacturer's catalogue rather than
 * a second shop: every family gets a spec summary and a ruled SKU
 * register. There are no product *cards* on this route at all — the
 * elevated CARD/COMMERCE treatment stays exclusive to /shop, so the two
 * routes never look like the same page twice.
 *
 *   1 masthead   INK   · SPLIT (copy + catalogue index plate)
 *   2..9 family  PAPER / BOARD alternating · SPLIT (summary + SKU ledger)
 *   10 custom    INK   · BAND · section-y-loose
 */

/** Unique, order-preserving, capped — the family summary lines. */
function summarise(values: string[], cap = 4) {
  return Array.from(new Set(values)).slice(0, cap).join(" · ");
}

export function ProductsView() {
  const { t, locale, href, num, price } = useI18n();

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
          className="pointer-events-none absolute -top-52 -end-40 h-[40rem] w-[40rem] rounded-chip bg-aqua-500/12 blur-[130px]"
        />
        <div
          aria-hidden
          className="grain-layer pointer-events-none absolute inset-0 opacity-[0.08]"
        />

        <Container className="relative grid gap-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[1fr_0.86fr] lg:items-end lg:gap-[clamp(2.5rem,5vw,5rem)]">
          <div className="enter flex flex-col items-start gap-5">
            <h1 className="fs-h1 max-w-[16ch] font-bold text-white">
              {t.products.hero.title}
            </h1>

            <p className="fs-lead max-w-[52ch] text-onink-200">
              {t.products.hero.subtitle}
            </p>
          </div>

          {/* The catalogue index: one object that is both the fan of
              production marks and the page's jump navigation. */}
          <nav
            aria-label={t.common.categories}
            className="enter-fade w-full overflow-hidden rounded-panel border border-hairline-inverse bg-inverse-2"
          >
            <div
              aria-hidden
              className="tick-rule h-4 w-full border-b border-hairline-inverse"
            />
            <ul className="plate-rule-ink min-[26rem]:grid-cols-2">
              {categories.map((cat) => {
                const count = products.filter(
                  (p) => p.category === cat.id,
                ).length;
                return (
                  <li key={cat.id} className="bg-inverse-2">
                    <a
                      href={`#${cat.slug}`}
                      className="hover-rule flex h-full items-center gap-3 px-4 py-3 hover:bg-white/[0.05]"
                    >
                      <ProductArt
                        art={cat.art}
                        className="h-9 w-9 shrink-0 opacity-90"
                      />
                      <span className="flex min-w-0 flex-col gap-1">
                        <span className="fs-caption font-semibold text-white">
                          {cat.name[locale]}
                        </span>
                        <span className="eyebrow text-onink-300">
                          <span className="num">{num(count)}</span>{" "}
                          {t.common.results}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Container>
      </section>

      {/* ═══ 2…9 · ONE SECTION PER FAMILY ═════════════════════════ */}
      {categories.map((cat, index) => {
        const items = products.filter((p) => p.category === cat.id);
        const board = index % 2 === 1;

        const specs = [
          {
            label: t.common.material,
            value: summarise(items.map((p) => p.material[locale]), 3),
          },
          {
            label: t.common.capacity,
            value: summarise(items.map((p) => p.capacity[locale])),
          },
          {
            label: t.common.moq,
            value: summarise(items.map((p) => p.moq[locale]), 2),
          },
        ];

        return (
          <Chapter
            key={cat.id}
            id={cat.slug}
            tone={board ? "board" : "paper"}
            seam={board ? "both" : "none"}
            pad="base"
          >
            <Container>
              <div className="grid gap-[clamp(2rem,4vw,3rem)] lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-[clamp(2.5rem,5vw,4.5rem)]">
                {/* ── family summary ─────────────────────────── */}
                <Reveal
                  variant={board ? "fade" : "rise"}
                  className="flex flex-col items-start gap-5"
                >
                  <span
                    className={`grid aspect-square w-20 shrink-0 place-items-center rounded-tile border border-hairline ${
                      board ? "bg-page" : "bg-sunken"
                    }`}
                  >
                    <ProductArt art={cat.art} className="h-[74%] w-[74%]" />
                  </span>

                  <Eyebrow>
                    <span className="num">{`${num(0)}${num(index + 1)}`}</span>
                  </Eyebrow>

                  <h2 className="fs-h2 max-w-[16ch] font-bold text-ink-900">
                    {cat.name[locale]}
                  </h2>

                  <p className="fs-lead max-w-[46ch] text-mist-600">
                    {cat.blurb[locale]}
                  </p>

                  <dl className="w-full border-t border-hairline">
                    {specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="grid gap-1 border-b border-hairline py-3.5 sm:grid-cols-[8rem_1fr] sm:gap-5"
                      >
                        <dt className="eyebrow pt-1 text-mist-600">
                          {spec.label}
                        </dt>
                        <dd className="fs-caption text-ink-800">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <Link
                    href={href(`/shop?cat=${cat.id}`)}
                    className="link-underline tap-target hover-rule fs-caption inline-flex items-center gap-2 py-2 font-semibold text-aqua-700 hover:text-ink-900"
                  >
                    {t.products.exploreLine}
                    <HiArrowUpRight
                      aria-hidden
                      className="h-3.5 w-3.5 shrink-0 flip-rtl"
                    />
                  </Link>
                </Reveal>

                {/* ── the SKU register ───────────────────────── */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="eyebrow text-mist-600">
                      {t.products.lineTitle}
                    </h3>
                    <span className="eyebrow text-mist-600">
                      <span className="num">{num(items.length)}</span>{" "}
                      {t.common.results}
                    </span>
                  </div>

                  <RevealGroup
                    as="ul"
                    variant={board ? "fade" : "rise"}
                    stagger={50}
                    className="plate-rule overflow-hidden rounded-card border border-hairline"
                  >
                    {items.map((p) => (
                      <li key={p.id} className="bg-page">
                        <Link
                          href={href(`/shop/${p.slug}`)}
                          className="hover-rule group grid grid-cols-[2.75rem_1fr] items-start gap-4 bg-page p-4 hover:bg-sunken sm:grid-cols-[3.25rem_1fr] sm:gap-5 sm:p-5"
                        >
                          <span className="grid aspect-square place-items-center rounded-tile border border-hairline bg-page">
                            <ProductArt
                              art={p.art}
                              className="h-[78%] w-[78%]"
                            />
                          </span>

                          <span className="flex min-w-0 flex-col gap-1.5">
                            <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                              <span className="fs-h4 font-semibold text-ink-900 transition-colors duration-200 group-hover:text-aqua-700">
                                {p.name[locale]}
                              </span>
                              <span className="fs-price-compact shrink-0 font-semibold tabular-nums text-ink-900">
                                {price(p.price)}
                              </span>
                            </span>
                            <span className="fs-caption text-mist-600">
                              {`${p.capacity[locale]} · ${p.packSize[locale]}`}
                            </span>
                            <span className="num fs-micro font-semibold text-mist-600">
                              {p.sku}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </RevealGroup>
                </div>
              </div>
            </Container>
          </Chapter>
        );
      })}

      {/* ═══ 10 · CUSTOM SPECIFICATION — INK · BAND ═══════════════ */}
      <Chapter tone="ink" pad="loose">
        <div
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-0 opacity-50"
        />
        <Container narrow className="relative">
          <SectionHeading
            title={t.products.customTitle}
            subtitle={t.products.customBody}
            tone="light"
            align="center"
            titleAs="h2"
            size="h1"
          >
            <div className="mt-4">
              <ButtonLink
                href={href("/contact")}
                variant="light"
                size="lg"
              >
                {t.products.customCta}
                <HiArrowUpRight
                  aria-hidden
                  className="h-4 w-4 shrink-0 flip-rtl"
                />
              </ButtonLink>
            </div>
          </SectionHeading>
        </Container>
      </Chapter>
    </>
  );
}

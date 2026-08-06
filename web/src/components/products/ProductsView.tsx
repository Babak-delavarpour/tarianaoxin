"use client";

import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import { ProductArt } from "@/components/brand/ProductArt";
import { ButtonLink } from "@/components/ui/Button";
import { Chapter, Container } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { categories, products } from "@/lib/catalog";
import { useI18n } from "@/i18n/I18nProvider";
import { CatalogSearch } from "./CatalogSearch";

/**
 * A compact product-family catalogue. The products route introduces the
 * range; purchasing and detailed filtering remain the job of /shop.
 */
export function ProductsView() {
  const { t, locale, href, num } = useI18n();

  return (
    <>
      <section
        data-tone="ink"
        className="mesh-dark relative z-30 isolate overflow-visible pt-[calc(var(--nav-h)+clamp(1rem,2vw,1.5rem))] pb-[clamp(1.5rem,2.5vw,2.25rem)]"
      >
        <div
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-0 opacity-45"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 -end-32 h-96 w-96 rounded-chip bg-aqua-500/12 blur-[110px]"
        />

        <Container className="relative">
          <h1 className="sr-only">{t.products.hero.title}</h1>
          <div className="enter-fade">
            <CatalogSearch />
          </div>
        </Container>
      </section>

      <Chapter tone="board" pad="tight" seam="top">
        <Container>
          <h2 className="sr-only">{t.products.hero.title}</h2>

          <RevealGroup
            as="ul"
            variant="fade"
            stagger={55}
            className="grid gap-4 md:grid-cols-2"
          >
            {categories.map((category, index) => {
              const count = products.filter(
                (product) => product.category === category.id,
              ).length;

              return (
                <li key={category.id} className="min-w-0">
                  <Link
                    href={href(`/shop?cat=${category.id}`)}
                    aria-label={`${t.products.exploreLine}: ${category.name[locale]}`}
                    className="lift group grid h-full min-h-52 grid-cols-[6.5rem_1fr] overflow-hidden rounded-card border border-hairline bg-page text-start shadow-e1 sm:grid-cols-[8.5rem_1fr]"
                  >
                    <span
                      className="relative grid min-h-full place-items-center overflow-hidden border-e border-hairline-inverse p-3 sm:p-5"
                      style={{
                        background: `linear-gradient(145deg, ${category.from}, ${category.to})`,
                      }}
                    >
                      <span
                        aria-hidden
                        className="grid-lines pointer-events-none absolute inset-0 opacity-45"
                      />
                      <span className="num fs-micro absolute start-3 top-3 font-bold text-white/65">
                        {`${num(0)}${num(index + 1)}`}
                      </span>
                      <ProductArt
                        art={category.art}
                        className="relative h-auto w-full max-w-28 transition-transform duration-500 ease-out-expo group-hover:scale-105"
                      />
                    </span>

                    <span className="flex min-w-0 flex-col p-4 sm:p-5">
                      <span className="eyebrow text-mist-600">
                        <span className="num">{num(count)}</span>{" "}
                        {t.common.results}
                      </span>
                      <span className="fs-h3 mt-2 font-bold text-ink-900 transition-colors duration-200 group-hover:text-aqua-700">
                        {category.name[locale]}
                      </span>
                      <span className="fs-caption mt-2 line-clamp-3 text-mist-600">
                        {category.blurb[locale]}
                      </span>
                      <span className="fs-caption mt-auto flex items-center justify-between gap-3 border-t border-hairline pt-3 font-semibold text-aqua-700">
                        {t.products.exploreLine}
                        <HiArrowUpRight
                          aria-hidden
                          className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 flip-rtl"
                        />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </RevealGroup>

          <div className="mt-[clamp(2.5rem,5vw,4.5rem)] overflow-hidden rounded-panel border border-hairline-inverse bg-ink-950 text-white shadow-e2">
            <div className="grid-lines relative flex flex-col gap-6 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7">
              <div className="relative flex max-w-[52ch] flex-col gap-2">
                <h2 className="fs-h4 font-bold text-white">
                  {t.products.customTitle}
                </h2>
                <p className="fs-caption text-onink-200">
                  {t.products.customBody}
                </p>
              </div>
              <ButtonLink
                href={href("/contact")}
                variant="light"
                size="md"
                className="relative w-full shrink-0 sm:w-auto"
              >
                {t.products.customCta}
                <HiArrowUpRight
                  aria-hidden
                  className="h-4 w-4 shrink-0 flip-rtl"
                />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Chapter>
    </>
  );
}

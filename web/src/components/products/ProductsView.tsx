"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { HiArrowUpRight, HiSparkles } from "react-icons/hi2";
import {
  LuCircleDot,
  LuCupSoda,
  LuLeaf,
  LuPackageOpen,
  LuPanelsTopLeft,
  LuSoup,
  LuSparkles,
  LuUtensilsCrossed,
} from "react-icons/lu";
import { ButtonLink } from "@/components/ui/Button";
import {
  Chapter,
  Container,
  Eyebrow,
} from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import {
  categories,
  products,
  type CategoryId,
} from "@/lib/catalog";
import { useI18n } from "@/i18n/I18nProvider";
import { CatalogSearch } from "./CatalogSearch";

type CategoryVisual = {
  icon: IconType;
  color: string;
  soft: string;
};

/**
 * Category colours intentionally sit outside the brand-blue ramp. They make
 * the families easy to scan while the page shell, type and actions continue
 * to carry the Tarianaoxin visual identity.
 */
const categoryVisuals: Record<CategoryId, CategoryVisual> = {
  cups: { icon: LuCupSoda, color: "#c73551", soft: "#fff0f3" },
  plates: { icon: LuSoup, color: "#b6530a", soft: "#fff3e8" },
  cutlery: { icon: LuUtensilsCrossed, color: "#6f4bb0", soft: "#f4efff" },
  containers: { icon: LuPackageOpen, color: "#2865bd", soft: "#edf4ff" },
  trays: { icon: LuPanelsTopLeft, color: "#856400", soft: "#fff7d8" },
  lids: { icon: LuCircleDot, color: "#007478", soft: "#e8fafa" },
  hygiene: { icon: LuSparkles, color: "#aa2e78", soft: "#fff0f8" },
  eco: { icon: LuLeaf, color: "#1e7148", soft: "#eaf8ef" },
};

type CategoryStyle = CSSProperties & {
  "--category-color": string;
  "--category-soft": string;
};

export function ProductsView() {
  const { t, locale, href, num } = useI18n();
  const totalProducts = products.length;

  return (
    <>
      <section
        data-tone="ink"
        className="mesh-dark relative z-30 isolate overflow-visible pt-[calc(var(--nav-h)+clamp(1.25rem,3vw,2.75rem))] pb-[clamp(3.5rem,7vw,6.5rem)]"
      >
        <div
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-0 opacity-45"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 end-[-8rem] h-[34rem] w-[34rem] rounded-full bg-aqua-500/14 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-44 start-[-10rem] h-[28rem] w-[28rem] rounded-full bg-[#7c5ac7]/12 blur-[110px]"
        />

        <Container className="relative">
          <div className="grid items-center gap-[clamp(2.5rem,6vw,6rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(25rem,0.95fr)]">
            <div className="enter-fade flex flex-col items-start">
              <Eyebrow tone="light">{t.products.hero.eyebrow}</Eyebrow>
              <h1 className="fs-h1 mt-5 max-w-[15ch] text-balance font-bold text-white">
                {t.products.hero.title}
              </h1>
              <p className="fs-lead mt-5 max-w-[54ch] text-onink-200">
                {t.products.hero.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-chip border border-white/12 bg-white/[0.06] px-4 py-2 fs-caption font-semibold text-onink-100 backdrop-blur-sm">
                  <span className="num text-aqua-300">
                    {num(categories.length)}
                  </span>
                  {t.common.categories}
                </span>
                <span className="inline-flex items-center gap-2 rounded-chip border border-white/12 bg-white/[0.06] px-4 py-2 fs-caption font-semibold text-onink-100 backdrop-blur-sm">
                  <span className="num text-aqua-300">
                    {num(totalProducts)}
                  </span>
                  {t.common.results}
                </span>
              </div>
            </div>

            <Reveal variant="scale" delay={100}>
              <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.07] p-3 shadow-e3 backdrop-blur-md sm:p-4">
                <div
                  aria-hidden
                  className="mb-3 grid grid-cols-8 gap-1.5 px-1 sm:gap-2"
                >
                  {categories.map((category) => {
                    const visual = categoryVisuals[category.id];
                    const Icon = visual.icon;

                    return (
                      <span
                        key={category.id}
                        className="grid aspect-square place-items-center rounded-[0.9rem] border border-white/10 bg-ink-900/65"
                      >
                        <Icon
                          className="h-[42%] w-[42%]"
                          style={{ color: visual.color }}
                          strokeWidth={1.8}
                        />
                      </span>
                    );
                  })}
                </div>
                <CatalogSearch />
                <p className="px-2 pt-3 pb-1 text-center fs-micro text-onink-300">
                  {t.common.searchPlaceholder}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Chapter tone="board" pad="base" seam="top">
        <Container>
          <RevealGroup
            as="ul"
            variant="fade"
            stagger={55}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3 lg:gap-5"
          >
            {categories.map((category, index) => {
              const visual = categoryVisuals[category.id];
              const Icon = visual.icon;
              const count = products.filter(
                (product) => product.category === category.id,
              ).length;
              const featured = index === 0;
              const wide = index === categories.length - 1;
              const accentEdge = locale === "en" ? "100%" : "0%";
              const cardStyle: CategoryStyle = {
                "--category-color": visual.color,
                "--category-soft": visual.soft,
                backgroundImage: `radial-gradient(circle at ${accentEdge} 0%, ${visual.soft} 0, transparent 43%)`,
              };

              return (
                <li
                  key={category.id}
                  className={`min-w-0 ${
                    featured
                      ? "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                      : wide
                        ? "sm:col-span-2 lg:col-span-2"
                        : ""
                  }`}
                >
                  <Link
                    href={href(`/shop?cat=${category.id}`)}
                    aria-label={`${t.products.exploreLine}: ${category.name[locale]}`}
                    style={cardStyle}
                    className={`lift group relative flex h-full overflow-hidden rounded-[1.75rem] border border-hairline bg-page text-start shadow-e1 transition-[border-color,box-shadow,transform] duration-300 hover:border-[var(--category-color)] ${
                      featured
                        ? "min-h-[25rem] flex-col p-6 sm:p-8 lg:min-h-[36rem]"
                        : wide
                          ? "min-h-[17rem] flex-col p-5 sm:min-h-[15rem] sm:flex-row sm:items-center sm:gap-7 sm:p-7"
                          : "min-h-[17rem] flex-col p-5 sm:p-6"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute -end-14 -top-14 rounded-full bg-[var(--category-soft)] transition-transform duration-500 ease-out-expo group-hover:scale-110 ${
                        featured ? "h-64 w-64" : "h-40 w-40"
                      }`}
                    />

                    <span
                      className={`relative grid shrink-0 place-items-center rounded-[1.25rem] bg-[var(--category-soft)] text-[var(--category-color)] transition-[background-color,color,transform] duration-300 group-hover:-rotate-3 group-hover:scale-105 group-hover:bg-[var(--category-color)] group-hover:text-white ${
                        featured ? "h-20 w-20 sm:h-24 sm:w-24" : "h-14 w-14"
                      }`}
                    >
                      <Icon
                        aria-hidden
                        className={featured ? "h-10 w-10 sm:h-12 sm:w-12" : "h-7 w-7"}
                        strokeWidth={1.8}
                      />
                    </span>

                    <span
                      className={`relative flex min-w-0 flex-1 flex-col ${
                        featured
                          ? "mt-auto pt-10 sm:pt-14"
                          : wide
                            ? "mt-7 sm:mt-0"
                            : "mt-8"
                      }`}
                    >
                      <span className="num fs-micro font-bold text-[var(--category-color)]">
                        {`${num(0)}${num(index + 1)}`}
                      </span>
                      <h3
                        className={`mt-2 font-bold text-ink-900 transition-colors duration-200 group-hover:text-[var(--category-color)] ${
                          featured ? "fs-h2 max-w-[16ch]" : "fs-h4"
                        }`}
                      >
                        {category.name[locale]}
                      </h3>
                      <p
                        className={`mt-3 text-mist-600 ${
                          featured
                            ? "fs-body max-w-[48ch]"
                            : "fs-caption max-w-[44ch]"
                        }`}
                      >
                        {category.blurb[locale]}
                      </p>
                    </span>

                    <span
                      className={`relative flex shrink-0 items-center justify-between gap-4 border-hairline ${
                        featured
                          ? "mt-7 border-t pt-5"
                          : wide
                            ? "mt-6 border-t pt-5 sm:mt-0 sm:self-stretch sm:border-s sm:border-t-0 sm:ps-7 sm:pt-0"
                            : "mt-6 border-t pt-4"
                      }`}
                    >
                      <span className="fs-micro font-semibold text-mist-600">
                        <span className="num text-ink-900">{num(count)}</span>{" "}
                        {t.common.results}
                      </span>
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--category-soft)] text-[var(--category-color)] transition-[background-color,color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:bg-[var(--category-color)] group-hover:text-white ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                        <HiArrowUpRight
                          aria-hidden
                          className="h-4 w-4 flip-rtl"
                        />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </RevealGroup>

          <Reveal className="mt-[clamp(3rem,6vw,5rem)]">
            <div className="relative overflow-hidden rounded-[2rem] bg-ink-950 px-6 py-8 text-white shadow-e2 sm:px-9 sm:py-10 lg:px-12">
              <div
                aria-hidden
                className="grid-lines pointer-events-none absolute inset-0 opacity-50"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -end-20 -top-36 h-80 w-80 rounded-full bg-aqua-500/20 blur-[90px]"
              />

              <div className="relative grid items-center gap-7 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-8">
                <span className="grid h-16 w-16 place-items-center rounded-[1.25rem] border border-white/15 bg-white/10 text-aqua-300">
                  <HiSparkles aria-hidden className="h-8 w-8" />
                </span>
                <div className="max-w-[58ch]">
                  <h2 className="fs-h3 font-bold text-white">
                    {t.products.customTitle}
                  </h2>
                  <p className="fs-caption mt-3 text-onink-200">
                    {t.products.customBody}
                  </p>
                </div>
                <ButtonLink
                  href={href("/contact")}
                  variant="light"
                  size="md"
                  className="w-full shrink-0 sm:w-fit"
                >
                  {t.products.customCta}
                  <HiArrowUpRight
                    aria-hidden
                    className="h-4 w-4 shrink-0 flip-rtl"
                  />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Chapter>
    </>
  );
}

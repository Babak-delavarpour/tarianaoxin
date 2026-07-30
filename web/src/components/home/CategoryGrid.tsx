"use client";

import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProductArt } from "@/components/brand/ProductArt";
import { categories } from "@/lib/catalog";
import { useI18n } from "@/i18n/I18nProvider";

export function CategoryGrid() {
  const { t, locale, href, num } = useI18n();

  return (
    <section className="relative section-y">
      <Container>
        <SectionHeading
          eyebrow={t.home.categories.eyebrow}
          title={t.home.categories.title}
          subtitle={t.home.categories.subtitle}
          align="center"
          className="mx-auto mb-14"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 70} as="article">
              <Link
                href={href(`/products#${cat.slug}`)}
                className="lift group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-mist-200 bg-white p-6 shadow-[var(--shadow-card)] hover:border-transparent"
              >
                {/* colour wash that only appears on hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-600 group-hover:opacity-100"
                  style={{
                    backgroundImage: `linear-gradient(150deg, ${cat.from}, ${cat.to})`,
                  }}
                />
                <span
                  aria-hidden
                  className="grid-lines absolute inset-0 opacity-0 transition-opacity duration-600 group-hover:opacity-100"
                />

                <div className="relative flex items-start justify-between gap-3">
                  <span className="rounded-full border border-mist-200 px-2.5 py-1 text-[0.62rem] font-bold tracking-[0.12em] text-mist-400 uppercase transition-colors duration-500 group-hover:border-white/25 group-hover:text-white/70">
                    <span className="num">{num(cat.skus)}</span> {t.common.results}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-500 transition-all duration-500 group-hover:bg-white/15 group-hover:text-white">
                    <HiArrowUpRight className="h-3.5 w-3.5 flip-rtl" />
                  </span>
                </div>

                <div className="relative my-5 grid place-items-center">
                  <ProductArt
                    art={cat.art}
                    className="h-28 w-28 transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-110 group-hover:-rotate-3"
                  />
                </div>

                <h3 className="relative text-[1.08rem] font-extrabold text-ink-900 transition-colors duration-500 group-hover:text-white">
                  {cat.name[locale]}
                </h3>
                <p className="relative mt-2 text-[0.84rem] leading-relaxed text-mist-500 transition-colors duration-500 group-hover:text-white/70">
                  {cat.blurb[locale]}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

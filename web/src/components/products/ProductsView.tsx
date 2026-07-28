"use client";

import Link from "next/link";
import { HiArrowUpRight, HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProductArt } from "@/components/brand/ProductArt";
import { ProductCard } from "@/components/shop/ProductCard";
import { CtaBand } from "@/components/home/CtaBand";
import { categories, products } from "@/lib/catalog";
import { useI18n } from "@/i18n/I18nProvider";

export function ProductsView() {
  const { t, locale, href, num } = useI18n();

  return (
    <>
      <PageHero
        eyebrow={t.products.hero.eyebrow}
        title={t.products.hero.title}
        subtitle={t.products.hero.subtitle}
        crumb={t.nav.products}
      >
        {/* jump rail */}
        <nav className="rail -mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-2">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.slug}`}
              className="shrink-0 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.8rem] font-semibold whitespace-nowrap text-ink-100/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-aqua-400/50 hover:text-white"
            >
              {cat.name[locale]}
            </a>
          ))}
        </nav>
      </PageHero>

      {categories.map((cat, index) => {
        const items = products.filter((p) => p.category === cat.id);
        const alt = index % 2 === 1;

        return (
          <section
            key={cat.id}
            id={cat.slug}
            className={`relative scroll-mt-28 overflow-hidden py-20 lg:py-24 ${
              alt ? "bg-white" : "mesh-light"
            }`}
          >
            <Container className="relative">
              <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
                {/* Line summary */}
                <Reveal className="lg:sticky lg:top-28">
                  <div
                    className="relative overflow-hidden rounded-[2rem] p-8 shadow-[0_36px_90px_-40px_rgba(8,36,59,0.55)]"
                    style={{
                      backgroundImage: `linear-gradient(150deg, ${cat.from}, ${cat.to})`,
                    }}
                  >
                    <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -end-16 -top-16 h-52 w-52 rounded-full bg-white/15 blur-3xl"
                    />

                    <div className="relative flex flex-col gap-5">
                      <div className="flex items-start justify-between gap-4">
                        <span className="rounded-full border border-white/25 px-3 py-1 text-[0.66rem] font-bold tracking-[0.14em] text-white/75 uppercase">
                          <span className="num">{num(cat.skus)}</span>{" "}
                          {t.common.results}
                        </span>
                        <span className="num text-[2.6rem] leading-none font-extrabold text-white/15">
                          {`${num(0)}${num(index + 1)}`}
                        </span>
                      </div>

                      <div className="grid place-items-center py-2">
                        <ProductArt art={cat.art} className="h-32 w-32" />
                      </div>

                      <h2 className="text-[1.6rem] font-extrabold text-white sm:text-[1.9rem]">
                        {cat.name[locale]}
                      </h2>
                      <p className="text-[0.92rem] leading-relaxed text-white/70">
                        {cat.blurb[locale]}
                      </p>

                      <Link
                        href={href("/shop")}
                        className="link-underline mt-2 inline-flex w-fit items-center gap-1.5 text-[0.88rem] font-bold text-white"
                      >
                        {t.products.exploreLine}
                        <HiArrowUpRight className="h-3.5 w-3.5 flip-rtl" />
                      </Link>
                    </div>
                  </div>
                </Reveal>

                {/* SKUs in this line */}
                <div className="flex flex-col gap-6">
                  <Reveal>
                    <h3 className="text-[0.72rem] font-bold tracking-[0.22em] text-aqua-700 uppercase">
                      {t.products.lineTitle}
                    </h3>
                  </Reveal>

                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {items.map((p, i) => (
                      <Reveal key={p.id} delay={i * 70}>
                        <ProductCard product={p} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* ── Custom tooling ─────────────────────────────────── */}
      <section className="relative bg-white py-20 lg:py-24">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-7 rounded-[2rem] border border-mist-200 bg-mist-50 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-5">
                <span className="brand-gradient hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white sm:flex">
                  <HiOutlineWrenchScrewdriver className="h-6 w-6" />
                </span>
                <div className="flex flex-col gap-2.5">
                  <h2 className="text-[1.5rem] font-extrabold text-ink-900 sm:text-[1.9rem]">
                    {t.products.customTitle}
                  </h2>
                  <p className="max-w-2xl text-[0.95rem] leading-relaxed text-mist-600">
                    {t.products.customBody}
                  </p>
                </div>
              </div>

              <ButtonLink href={href("/contact")} size="lg" className="shrink-0">
                {t.products.customCta}
                <HiArrowUpRight className="h-4 w-4 flip-rtl" />
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title={t.home.cta.title}
        body={t.home.cta.body}
        primary={t.home.cta.primary}
        primaryHref="/contact"
        secondary={t.home.cta.secondary}
        secondaryHref="/shop"
      />
    </>
  );
}

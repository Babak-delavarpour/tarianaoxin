"use client";

import { HiArrowUpRight } from "react-icons/hi2";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/shop/ProductCard";
import { featuredProducts } from "@/lib/catalog";
import { useI18n } from "@/i18n/I18nProvider";

export function FeaturedProducts() {
  const { t, href } = useI18n();

  return (
    <section className="relative overflow-hidden bg-white section-y">
      <div className="grid-lines-ink pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 start-1/2 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-aqua-200/25 blur-[100px]"
      />

      <Container className="relative">
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={t.home.featured.eyebrow}
            title={t.home.featured.title}
            subtitle={t.home.featured.subtitle}
          />
          <Reveal delay={120}>
            <ButtonLink href={href("/shop")} variant="outline" size="lg">
              {t.common.viewAll}
              <HiArrowUpRight className="h-4 w-4 flip-rtl" />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {featuredProducts.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

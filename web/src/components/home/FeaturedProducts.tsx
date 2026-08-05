"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HiArrowUpRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Chapter, Container, SectionHeading } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/shop/ProductCard";
import { featuredProducts } from "@/lib/catalog";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Section 5 — PAPER · archetype D (RAIL) · CARD/COMMERCE.
 *
 * The old `xl:grid-cols-5` grid crushed five product cards into ~230px
 * columns. A rail keeps every card at a readable width at every viewport
 * and turns the trailing peek into the affordance that says "there is
 * more". `ProductCard` is a black box here — the rail only guarantees it
 * a sane container width and room for its resting/hover elevation.
 */
export function FeaturedProducts() {
  const { t, href } = useI18n();
  const f = t.home.featured;

  const railRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    // RTL scroll offsets are negative in every current engine.
    const x = Math.abs(el.scrollLeft);
    const start = x <= 1;
    const end = max <= 1 || x >= max - 1;
    setEdge((prev) =>
      prev.start === start && prev.end === end ? prev : { start, end },
    );
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /** step: -1 scrolls toward the inline start, 1 toward the inline end. */
  const page = (step: -1 | 1) => {
    const el = railRef.current;
    if (!el) return;
    const dir = getComputedStyle(el).direction === "rtl" ? -1 : 1;
    // `behavior: "smooth"` overrides CSS `scroll-behavior`, so the
    // reduced-motion block in globals.css cannot neutralise it for us.
    const calm =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: Math.max(el.clientWidth * 0.7, 240) * step * dir,
      behavior: calm ? "auto" : "smooth",
    });
  };

  return (
    <Chapter tone="paper" pad="tight" seam="top">
      <Container>
        <SectionHeading
          eyebrow={f.eyebrow}
          title={f.title}
          subtitle={f.subtitle}
          action={
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 sm:flex">
                <Button
                  variant="outline"
                  size="sm"
                  aria-label={t.common.previous}
                  disabled={edge.start}
                  onClick={() => page(-1)}
                >
                  <HiChevronLeft className="h-4 w-4 flip-rtl" aria-hidden />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label={t.common.next}
                  disabled={edge.end}
                  onClick={() => page(1)}
                >
                  <HiChevronRight className="h-4 w-4 flip-rtl" aria-hidden />
                </Button>
              </div>
              <ButtonLink href={href("/shop")} variant="ghost" size="md">
                {t.common.viewAll}
                <HiArrowUpRight className="h-4 w-4 flip-rtl" />
              </ButtonLink>
            </div>
          }
        />

        {/* The scroll container owns the snap axis; the reveal group is the
            track inside it, so `translateY` during the entrance can never
            fight the horizontal scroll. `pb-10` is elevation clearance —
            ProductCard's hover shadow would otherwise be sheared off. */}
        <div
          ref={railRef}
          onScroll={measure}
          className="rail stack-block snap-x snap-mandatory overflow-x-auto pt-2 pb-10"
        >
          <RevealGroup
            as="ul"
            variant="rise"
            stagger={70}
            className="flex grid-gutter"
          >
            {featuredProducts.map((p) => (
              <li
                key={p.id}
                className="w-[76vw] shrink-0 snap-start min-[26rem]:w-[62vw] sm:w-[46vw] lg:w-[31%] xl:w-[23.5%]"
              >
                <ProductCard product={p} />
              </li>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Chapter>
  );
}

"use client";

import { useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { ImQuotesLeft } from "react-icons/im";
import { Chapter, Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Section 10 — BOARD · archetype B (SPLIT) · CARD/PANEL + shadow-e1.
 *
 * The old carousel translated a flex track by `index * 100%` with a sign
 * flip for RTL: it clipped its own panel, fought `overflow-hidden`, and
 * broke the moment a locale changed the panel's intrinsic width. This
 * one stacks every quote in a single grid cell and crossfades, so:
 *
 *   · the container is always as tall as the tallest quote — no jump,
 *     no clipping, no transform arithmetic, nothing to mirror;
 *   · inactive figures carry `inert` **and** `aria-hidden`, so they are
 *     out of the tab order and out of the accessibility tree;
 *   · the live track announces the change politely;
 *   · Arrow keys work from any control (mapped to the *visual*
 *     direction, so RTL reverses them, per WAI-ARIA);
 *   · a touch swipe on the panel advances it, in the direction a reader
 *     of that script expects.
 *
 * Three quotes genuinely do not need a carousel, but keeping one lets
 * the SPLIT hold a single large pull-quote instead of three cramped
 * cards — and the controls give the leading column something to do.
 */
export function Testimonials() {
  const { t, num } = useI18n();
  const ts = t.home.testimonials;
  const items = ts.items;

  const [index, setIndex] = useState(0);
  const swipeFrom = useRef<number | null>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const go = (step: number) =>
    setIndex((i) => (i + step + items.length) % items.length);

  /** true when the section is currently laid out right-to-left. */
  const rtl = () =>
    !!regionRef.current &&
    getComputedStyle(regionRef.current).direction === "rtl";

  const onControlKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const forward = e.key === "ArrowRight" ? 1 : -1;
    go(rtl() ? -forward : forward);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    swipeFrom.current = e.clientX;
  };
  const endSwipe = (e: React.PointerEvent) => {
    const from = swipeFrom.current;
    swipeFrom.current = null;
    if (from === null) return;
    const dx = e.clientX - from;
    if (Math.abs(dx) < 44) return;
    // Dragging away from where the next item sits advances the deck.
    go((dx < 0 ? 1 : -1) * (rtl() ? -1 : 1));
  };

  return (
    <Chapter tone="board" pad="base" seam="bottom">
      <Container>
        <div
          ref={regionRef}
          className="grid gap-[clamp(2.25rem,4.5vw,4rem)] lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-[clamp(2.5rem,5vw,5rem)]"
        >
          {/* Leading column — heading and the whole control set */}
          <div className="flex flex-col">
            <SectionHeading
              eyebrow={ts.eyebrow}
              title={ts.title}
              reveal="fade"
            />

            <Reveal
              variant="fade"
              delay={120}
              className="stack-block flex items-center gap-2.5"
            >
              <Button
                variant="outline"
                size="sm"
                aria-label={t.common.previous}
                onClick={() => go(-1)}
                onKeyDown={onControlKeyDown}
              >
                <HiChevronLeft className="h-4 w-4 flip-rtl" aria-hidden />
              </Button>
              <Button
                variant="outline"
                size="sm"
                aria-label={t.common.next}
                onClick={() => go(1)}
                onKeyDown={onControlKeyDown}
              >
                <HiChevronRight className="h-4 w-4 flip-rtl" aria-hidden />
              </Button>

              <span
                aria-hidden
                className="mx-1 h-px flex-1 bg-hairline-strong"
              />

              <div className="flex items-center">
                {items.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setIndex(i)}
                    onKeyDown={onControlKeyDown}
                    aria-label={`${t.common.viewAll} ${num(i + 1)}`}
                    aria-current={i === index || undefined}
                    className="group flex h-11 w-11 items-center justify-center rounded-ctrl"
                  >
                    <span
                      aria-hidden
                      className={`block h-1.5 rounded-chip transition-[width,background-color] duration-300 ease-out-expo ${
                        i === index
                          ? "w-8 bg-ink-900"
                          : "w-4 bg-mist-500 group-hover:bg-mist-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Trailing column — one panel, three stacked quotes */}
          <Reveal variant="fade" delay={60}>
            <div
              aria-live="polite"
              className="grid"
              onPointerDown={onPointerDown}
              onPointerUp={endSwipe}
              onPointerCancel={() => {
                swipeFrom.current = null;
              }}
            >
              {items.map((item, i) => {
                const active = i === index;
                return (
                  <figure
                    key={item.name}
                    inert={!active}
                    aria-hidden={!active || undefined}
                    className={`col-start-1 row-start-1 flex flex-col gap-6 rounded-card border border-hairline bg-page p-[clamp(1.5rem,3.2vw,2.75rem)] shadow-e1 transition-opacity duration-500 ease-out-expo ${
                      active ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <ImQuotesLeft
                      aria-hidden
                      className="h-7 w-7 shrink-0 text-mist-300 flip-rtl"
                    />

                    <blockquote className="fs-h3 font-semibold text-ink-900">
                      {item.quote}
                    </blockquote>

                    {/* mt-auto: every figure stretches to the tallest quote,
                        so the attribution must pin to the panel's foot. */}
                    <figcaption className="fs-caption mt-auto flex flex-col gap-1 border-t border-hairline pt-5">
                      <span className="font-semibold text-ink-900">
                        {item.name}
                      </span>
                      <span className="text-mist-600">{item.role}</span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Container>
    </Chapter>
  );
}

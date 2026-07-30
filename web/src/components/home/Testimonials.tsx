"use client";

import { useState } from "react";
import { HiChevronLeft, HiChevronRight, HiStar } from "react-icons/hi2";
import { ImQuotesLeft } from "react-icons/im";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/I18nProvider";

export function Testimonials() {
  const { t, isRtl } = useI18n();
  const items = t.home.testimonials.items;
  const [index, setIndex] = useState(0);

  const go = (dir: -1 | 1) =>
    setIndex((i) => (i + dir + items.length) % items.length);

  // In RTL the visual "previous" arrow points right.
  const PrevIcon = isRtl ? HiChevronRight : HiChevronLeft;
  const NextIcon = isRtl ? HiChevronLeft : HiChevronRight;

  return (
    <section className="mesh-light relative overflow-hidden section-y">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={t.home.testimonials.eyebrow}
            title={t.home.testimonials.title}
          />

          <Reveal delay={120}>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-mist-200 bg-white text-ink-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-aqua-400 hover:text-aqua-700"
              >
                <PrevIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next"
                className="brand-gradient sheen flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                <NextIcon className="h-5 w-5" />
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem]">
            <div
              className="flex transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)]"
              style={{
                transform: `translateX(${(isRtl ? 1 : -1) * index * 100}%)`,
              }}
            >
              {items.map((item) => (
                <figure
                  key={item.name}
                  className="brand-gradient relative w-full shrink-0 overflow-hidden p-[clamp(1.5rem,4.5vw,3.5rem)]"
                >
                  <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
                  <ImQuotesLeft className="absolute end-8 top-8 h-20 w-20 text-white/[0.07] flip-rtl" />

                  <div className="relative flex flex-col gap-8">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <HiStar key={s} className="h-5 w-5 text-aqua-300" />
                      ))}
                    </div>

                    <blockquote className="max-w-3xl text-[clamp(1.05rem,0.85rem+0.9vw,1.45rem)] leading-relaxed font-medium text-white">
                      “{item.quote}”
                    </blockquote>

                    <figcaption className="flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[1rem] font-extrabold text-white">
                        {item.name.trim().charAt(0)}
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[0.95rem] font-bold text-white">
                          {item.name}
                        </span>
                        <span className="text-[0.82rem] text-ink-100/60">
                          {item.role}
                        </span>
                      </span>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>

        {/* progress dots — the bar is 6px tall but the hit area is 44px */}
        <div className="mt-7 flex justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${i + 1}`}
              aria-current={i === index}
              className={`tap-target h-1.5 rounded-full transition-all duration-500 ${
                i === index
                  ? "brand-gradient w-10"
                  : "w-4 bg-mist-300 hover:bg-mist-400"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

"use client";

import { HiArrowUpRight, HiCheck } from "react-icons/hi2";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProductArt } from "@/components/brand/ProductArt";
import { useI18n } from "@/i18n/I18nProvider";

export function AboutPreview() {
  const { t, href } = useI18n();
  const a = t.home.about;

  return (
    <section className="mesh-light relative overflow-hidden py-24 lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Visual */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3.4] w-full">
              {/* back plate */}
              <div className="brand-gradient absolute inset-y-6 start-0 end-16 rounded-[2.5rem] shadow-[0_40px_100px_-40px_rgba(8,36,59,0.7)]">
                <div className="grid-lines absolute inset-0 rounded-[2.5rem] opacity-70" />
                <div className="absolute inset-0 grid place-items-center p-10">
                  <ProductArt art="plate" className="h-full w-full max-w-[18rem]" />
                </div>
              </div>

              {/* floating stat card */}
              <div className="ring-gradient absolute end-0 bottom-8 w-52 rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_28px_70px_-28px_rgba(8,36,59,0.5)] backdrop-blur-xl">
                <span className="text-brand-gradient num block text-[2.4rem] leading-none font-extrabold">
                  {t.home.stats[1].value}
                </span>
                <span className="mt-1.5 block text-[0.76rem] leading-snug font-semibold text-mist-500">
                  {t.home.stats[1].label}
                </span>
              </div>

              {/* floating badge */}
              <div className="absolute end-6 top-0 flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2.5 text-[0.72rem] font-bold text-white shadow-[0_20px_50px_-20px_rgba(8,36,59,0.8)]">
                <span className="h-1.5 w-1.5 rounded-full bg-aqua-400" />
                ISO&nbsp;9001 · HACCP
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <Reveal>
              <Eyebrow>{a.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="text-[2rem] font-extrabold text-ink-900 sm:text-[2.6rem] lg:text-[2.9rem]">
                {a.title}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-[1rem] leading-relaxed text-mist-600">{a.body1}</p>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-[1rem] leading-relaxed text-mist-600">{a.body2}</p>
            </Reveal>

            <Reveal delay={220}>
              <ul className="mt-2 grid gap-3 sm:grid-cols-2">
                {a.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-2xl border border-mist-200 bg-white/70 p-3.5 text-[0.86rem] leading-snug font-semibold text-ink-800 backdrop-blur-sm transition-colors hover:border-aqua-300"
                  >
                    <span className="brand-gradient mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                      <HiCheck className="h-3 w-3 text-white" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={280}>
              <ButtonLink href={href("/about")} size="lg" className="mt-3">
                {t.common.learnMore}
                <HiArrowUpRight className="h-4 w-4 flip-rtl" />
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

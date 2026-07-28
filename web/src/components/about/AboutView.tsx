"use client";

import {
  HiOutlineScale,
  HiOutlineShieldCheck,
  HiOutlineCalendarDays,
  HiOutlineSparkles,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";
import { PageHero } from "@/components/layout/PageHero";
import { Container, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProductArt } from "@/components/brand/ProductArt";
import { LogoWatermark } from "@/components/brand/Logo";
import { CtaBand } from "@/components/home/CtaBand";
import { Quality } from "@/components/home/Quality";
import { useI18n } from "@/i18n/I18nProvider";

const valueIcons = [
  HiOutlineScale,
  HiOutlineShieldCheck,
  HiOutlineCalendarDays,
  HiOutlineSparkles,
];

export function AboutView() {
  const { t } = useI18n();
  const a = t.about;

  return (
    <>
      <PageHero
        eyebrow={a.hero.eyebrow}
        title={a.hero.title}
        subtitle={a.hero.subtitle}
        crumb={t.nav.about}
      />

      {/* ── Story ──────────────────────────────────────────── */}
      <section className="mesh-light relative overflow-hidden py-24 lg:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-20">
            <div className="flex flex-col gap-6">
              <Reveal>
                <Eyebrow>{a.story.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="text-[2rem] font-extrabold text-ink-900 sm:text-[2.7rem]">
                  {a.story.title}
                </h2>
              </Reveal>
              {[a.story.body1, a.story.body2, a.story.body3].map((p, i) => (
                <Reveal key={i} delay={120 + i * 60}>
                  <p className="text-[1.02rem] leading-relaxed text-mist-600">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={140}>
              <div className="brand-gradient relative overflow-hidden rounded-[2rem] p-8 shadow-[0_40px_100px_-40px_rgba(8,36,59,0.6)]">
                <div className="grid-lines pointer-events-none absolute inset-0 opacity-70" />
                <LogoWatermark className="absolute inset-x-0 -bottom-2 text-center text-[4.5rem] leading-none text-white/[0.05]" />

                <div className="relative flex flex-col gap-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white">
                    <HiOutlineBuildingOffice2 className="h-6 w-6" />
                  </span>
                  <p className="text-[1.05rem] leading-relaxed font-semibold text-white">
                    {t.home.about.title}
                  </p>
                  <ul className="flex flex-col gap-3 border-t border-white/15 pt-5">
                    {t.home.about.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-[0.88rem] leading-snug text-ink-100/75"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-aqua-300" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Timeline ───────────────────────────────────────── */}
      <section className="relative bg-white py-24 lg:py-32">
        <div className="grid-lines-ink pointer-events-none absolute inset-0" />
        <Container className="relative">
          <SectionHeading
            eyebrow={a.timeline.eyebrow}
            title={a.timeline.title}
            align="center"
            className="mx-auto mb-16"
          />

          <ol className="relative mx-auto max-w-3xl">
            {/* the spine */}
            <span
              aria-hidden
              className="absolute inset-y-2 start-[0.6rem] w-px bg-gradient-to-b from-aqua-400 via-ink-300 to-transparent sm:start-1/2"
            />

            {a.timeline.items.map((item, i) => (
              <Reveal key={item.year} delay={i * 90} as="li">
                <div
                  className={`relative flex flex-col gap-3 py-6 ps-10 sm:w-1/2 sm:ps-0 ${
                    i % 2 === 0
                      ? "sm:pe-12 sm:text-end"
                      : "sm:ms-auto sm:ps-12"
                  }`}
                >
                  {/* node */}
                  <span
                    className={`brand-gradient absolute top-8 flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-white start-0 sm:start-auto ${
                      i % 2 === 0 ? "sm:-end-2.5" : "sm:-start-2.5"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>

                  <span className="num text-brand-gradient text-[1.5rem] font-extrabold">
                    {item.year}
                  </span>
                  <h3 className="text-[1.1rem] font-extrabold text-ink-900">
                    {item.title}
                  </h3>
                  <p className="text-[0.9rem] leading-relaxed text-mist-600">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── Values ─────────────────────────────────────────── */}
      <section className="mesh-dark relative overflow-hidden py-24 lg:py-32">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-70" />
        <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.13]" />
        <div
          aria-hidden
          className="animate-drift pointer-events-none absolute -top-40 start-1/3 h-[30rem] w-[30rem] rounded-full bg-aqua-500/16 blur-[110px]"
        />

        <Container className="relative">
          <SectionHeading
            eyebrow={a.values.eyebrow}
            title={a.values.title}
            tone="light"
            align="center"
            className="mx-auto mb-16"
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {a.values.items.map((item, i) => {
              const Icon = valueIcons[i];
              return (
                <Reveal key={item.title} delay={i * 90} as="article">
                  <div className="group flex h-full flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-aqua-400/40 hover:bg-white/[0.07]">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-aqua-300 transition-all duration-500 group-hover:brand-gradient group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-[1.08rem] font-extrabold text-white">
                      {item.title}
                    </h3>
                    <p className="text-[0.88rem] leading-relaxed text-ink-100/55">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Facility ───────────────────────────────────────── */}
      <section className="mesh-light relative overflow-hidden py-24 lg:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <Reveal className="order-2 lg:order-1">
              <div className="relative grid grid-cols-2 gap-4">
                {(["container", "cup", "cutlery", "tray"] as const).map(
                  (art, i) => (
                    <div
                      key={art}
                      className={`grid aspect-square place-items-center rounded-[1.75rem] border border-mist-200 bg-white shadow-[var(--shadow-card)] ${
                        i % 3 === 0 ? "mt-8" : ""
                      }`}
                    >
                      <ProductArt art={art} className="h-[62%] w-[62%]" />
                    </div>
                  ),
                )}
              </div>
            </Reveal>

            <div className="order-1 flex flex-col gap-8 lg:order-2">
              <SectionHeading
                eyebrow={a.facility.eyebrow}
                title={a.facility.title}
                subtitle={a.facility.subtitle}
              />

              <Reveal delay={160}>
                <dl className="grid grid-cols-2 gap-4">
                  {a.facility.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex flex-col gap-1.5 rounded-2xl border border-mist-200 bg-white/70 p-5 backdrop-blur-sm transition-colors hover:border-aqua-300"
                    >
                      <dt className="text-brand-gradient num text-[1.7rem] leading-none font-extrabold">
                        {spec.value}
                      </dt>
                      <dd className="text-[0.8rem] leading-snug font-semibold text-mist-500">
                        {spec.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <Quality />

      <CtaBand
        title={a.cta.title}
        body={a.cta.body}
        primary={a.cta.primary}
        primaryHref="/contact"
        secondary={a.cta.secondary}
        secondaryHref="/products"
      />
    </>
  );
}

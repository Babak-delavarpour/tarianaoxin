"use client";

import {
  HiOutlineBeaker,
  HiOutlineCog6Tooth,
  HiOutlineCube,
  HiOutlineTruck,
} from "react-icons/hi2";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/I18nProvider";

const icons = [
  HiOutlineBeaker,
  HiOutlineCog6Tooth,
  HiOutlineCube,
  HiOutlineTruck,
];

export function Process() {
  const { t, num } = useI18n();
  const p = t.home.process;

  return (
    <section className="mesh-dark relative overflow-hidden section-y">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-70" />
      <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.14]" />
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -bottom-40 start-1/4 h-[30rem] w-[30rem] rounded-full bg-aqua-500/15 blur-[110px]"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow={p.eyebrow}
          title={p.title}
          subtitle={p.subtitle}
          tone="light"
          align="center"
          className="mx-auto mb-16"
        />

        <ol className="relative grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* connecting rail on wide screens */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-[3.4rem] hidden h-px bg-gradient-to-r from-transparent via-aqua-400/35 to-transparent xl:block"
          />

          {p.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={step.title} delay={i * 110} as="li">
                <div className="group relative flex h-full flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-aqua-400/40 hover:bg-white/[0.07]">
                  <div className="flex items-center justify-between">
                    <span className="brand-gradient relative flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-[0_18px_40px_-16px_rgba(23,162,191,0.9)]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="num text-[3rem] leading-none font-extrabold text-white/[0.07] transition-colors duration-500 group-hover:text-white/[0.13]">
                      {`${num(0)}${num(i + 1)}`}
                    </span>
                  </div>

                  <h3 className="text-[1.14rem] font-extrabold text-white">
                    {step.title}
                  </h3>
                  <p className="text-[0.9rem] leading-relaxed text-ink-100/55">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

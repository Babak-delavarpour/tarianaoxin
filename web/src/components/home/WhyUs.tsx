"use client";

import {
  HiOutlineScale,
  HiOutlineClock,
  HiOutlineTag,
  HiOutlineShieldCheck,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/I18nProvider";

const icons = [
  HiOutlineScale,
  HiOutlineClock,
  HiOutlineTag,
  HiOutlineShieldCheck,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineUserCircle,
];

export function WhyUs() {
  const { t } = useI18n();
  const w = t.home.why;

  return (
    <section className="mesh-light relative overflow-hidden section-y">
      <Container>
        <SectionHeading
          eyebrow={w.eyebrow}
          title={w.title}
          align="center"
          className="mx-auto mb-16"
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {w.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={item.title} delay={i * 80} as="article">
                <div className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-[1.75rem] border border-mist-200 bg-white p-7 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1.5 hover:border-aqua-200 hover:shadow-[var(--shadow-lift)]">
                  {/* corner glow */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -end-16 -top-16 h-40 w-40 rounded-full bg-aqua-300/0 blur-3xl transition-all duration-700 group-hover:bg-aqua-300/35"
                  />

                  <span className="relative flex h-13 w-13 items-center justify-center rounded-2xl bg-ink-50 text-ink-700 transition-all duration-500 group-hover:brand-gradient group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>

                  <h3 className="relative text-[1.1rem] font-extrabold text-ink-900">
                    {item.title}
                  </h3>
                  <p className="relative text-[0.9rem] leading-relaxed text-mist-600">
                    {item.body}
                  </p>

                  <span
                    aria-hidden
                    className="brand-gradient absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-600 group-hover:scale-x-100 rtl:origin-right"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

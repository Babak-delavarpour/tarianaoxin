"use client";

import { HiOutlineDocumentCheck, HiArrowUpRight } from "react-icons/hi2";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/i18n/I18nProvider";

export function Quality() {
  const { t, href } = useI18n();
  const q = t.home.quality;

  return (
    <section id="quality" className="relative bg-white py-24 lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow={q.eyebrow}
              title={q.title}
              subtitle={q.subtitle}
            />
            <Reveal delay={160}>
              <ButtonLink href={href("/about#quality")} variant="outline" size="lg">
                {t.common.downloadCatalog}
                <HiArrowUpRight className="h-4 w-4 flip-rtl" />
              </ButtonLink>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {q.items.map((item, i) => (
              <Reveal key={item.code} delay={i * 90}>
                <div className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-[1.5rem] border border-mist-200 bg-mist-50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-aqua-300 hover:bg-white hover:shadow-[var(--shadow-lift)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-mist-200 bg-white text-aqua-600 transition-colors duration-500 group-hover:border-aqua-200">
                    <HiOutlineDocumentCheck className="h-5 w-5" />
                  </span>
                  <span
                    className="text-brand-gradient text-[1.25rem] font-extrabold"
                    dir="ltr"
                  >
                    {item.code}
                  </span>
                  <span className="text-[0.86rem] leading-snug font-semibold text-mist-600">
                    {item.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

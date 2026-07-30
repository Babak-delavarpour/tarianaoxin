"use client";

import { HiArrowUpRight, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/brand/Logo";
import { useI18n } from "@/i18n/I18nProvider";

export function CtaBand({
  title,
  body,
  primary,
  primaryHref,
  secondary,
  secondaryHref,
}: {
  title: string;
  body: string;
  primary: string;
  primaryHref: string;
  secondary: string;
  secondaryHref: string;
}) {
  const { href } = useI18n();

  return (
    <section className="relative bg-white section-y">
      <Container>
        <Reveal>
          <div className="mesh-dark relative overflow-hidden rounded-[2.5rem] px-8 py-14 shadow-[0_50px_120px_-50px_rgba(8,36,59,0.8)] sm:px-14 lg:px-20 lg:py-20">
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-70" />
            <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.14]" />
            <div
              aria-hidden
              className="animate-drift pointer-events-none absolute -end-24 -top-24 h-96 w-96 rounded-full bg-aqua-500/25 blur-[100px]"
            />

            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
              <div className="flex items-start gap-5">
                <span className="hidden shrink-0 sm:block">
                  <LogoMark tone="light" className="h-14 w-14" />
                </span>
                <div className="flex flex-col gap-3">
                  <h2 className="fs-h2 max-w-2xl font-extrabold text-white">
                    {title}
                  </h2>
                  <p className="max-w-xl text-[0.98rem] leading-relaxed text-ink-100/60">
                    {body}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap gap-3">
                <ButtonLink href={href(primaryHref)} variant="light" size="lg">
                  <HiOutlineChatBubbleLeftRight className="h-4 w-4" />
                  {primary}
                </ButtonLink>
                <ButtonLink
                  href={href(secondaryHref)}
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/5 text-white hover:border-aqua-400/60 hover:bg-white/10 hover:text-white"
                >
                  {secondary}
                  <HiArrowUpRight className="h-4 w-4 flip-rtl" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

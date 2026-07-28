"use client";

import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";
import { Container, Eyebrow } from "@/components/ui/Section";
import { LogoWatermark } from "@/components/brand/Logo";
import { useI18n } from "@/i18n/I18nProvider";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumb,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  crumb: string;
  children?: React.ReactNode;
}) {
  const { t, href } = useI18n();

  return (
    <section className="mesh-dark relative isolate overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28">
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.13]" />
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -top-40 end-[-6rem] h-[32rem] w-[32rem] rounded-full bg-aqua-500/18 blur-[110px]"
      />
      <LogoWatermark className="absolute inset-x-0 bottom-0 -z-10 text-center text-[20vw] leading-none text-white/[0.025]" />

      <Container className="relative">
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex items-center gap-2 text-[0.78rem] font-semibold text-ink-100/45"
        >
          <Link href={href("/")} className="transition-colors hover:text-aqua-300">
            {t.nav.home}
          </Link>
          <HiChevronRight className="h-3.5 w-3.5 flip-rtl" />
          <span className="text-aqua-300">{crumb}</span>
        </nav>

        <div className="flex flex-col gap-6">
          <span style={{ animation: "tx-fade .7s var(--ease-out-expo) both" }}>
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
          </span>
          <h1
            className="max-w-4xl text-[2.4rem] font-extrabold text-white sm:text-[3.2rem] lg:text-[3.9rem]"
            style={{ animation: "tx-rise .85s var(--ease-out-expo) .08s both" }}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              className="max-w-2xl text-[1.02rem] leading-relaxed text-ink-100/60 sm:text-[1.1rem]"
              style={{ animation: "tx-rise .85s var(--ease-out-expo) .18s both" }}
            >
              {subtitle}
            </p>
          ) : null}
          {children ? (
            <div style={{ animation: "tx-rise .85s var(--ease-out-expo) .28s both" }}>
              {children}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

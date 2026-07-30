"use client";

import {
  HiArrowUpRight,
  HiShieldCheck,
  HiOutlineTruck,
  HiOutlineSparkles,
  HiOutlineArrowDown,
} from "react-icons/hi2";
import { ButtonLink } from "@/components/ui/Button";
import { ProductArt } from "@/components/brand/ProductArt";
import { LogoWatermark } from "@/components/brand/Logo";
import { useI18n } from "@/i18n/I18nProvider";

export function Hero() {
  const { t, href, num } = useI18n();
  const h = t.home.hero;

  return (
    <section className="mesh-dark relative isolate overflow-hidden">
      {/* Structural layers */}
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.14]" />
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -top-40 -start-40 h-[38rem] w-[38rem] rounded-full bg-aqua-500/18 blur-[120px]"
      />
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -bottom-56 end-[-10rem] h-[34rem] w-[34rem] rounded-full bg-ink-600/40 blur-[120px] [animation-delay:-8s]"
      />
      <LogoWatermark className="absolute inset-x-0 top-1/2 -z-10 text-center text-[22vw] leading-none text-white/[0.022]" />

      <div className="shell relative grid gap-12 pt-[clamp(8.5rem,16vw,12rem)] pb-[clamp(4rem,8vw,8rem)] sm:gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
        {/* ── Copy ─────────────────────────────────────────── */}
        <div className="flex flex-col items-start gap-6 sm:gap-7">
          <span
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 py-2 ps-2 pe-4 text-[0.74rem] font-semibold text-ink-100/85 backdrop-blur-sm"
            style={{ animation: "tx-fade .8s var(--ease-out-expo) both" }}
          >
            <span className="brand-gradient flex h-6 w-6 items-center justify-center rounded-full">
              <HiShieldCheck className="h-3.5 w-3.5 text-white" />
            </span>
            {h.badge}
          </span>

          <h1
            className="fs-hero font-extrabold text-white"
            style={{ animation: "tx-rise .9s var(--ease-out-expo) .08s both" }}
          >
            {h.titleTop}{" "}
            <span className="text-brand-gradient-light relative inline-block">
              {h.titleAccent}
              <svg
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                className="absolute inset-x-0 -bottom-1 h-3 w-full"
                aria-hidden
              >
                <path
                  d="M2 8 C 50 2, 150 2, 198 7"
                  fill="none"
                  stroke="#35bad5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </svg>
            </span>{" "}
            {h.titleBottom}
          </h1>

          <p
            className="fs-lead max-w-xl text-ink-100/65"
            style={{ animation: "tx-rise .9s var(--ease-out-expo) .18s both" }}
          >
            {h.subtitle}
          </p>

          <div
            className="flex w-full flex-col gap-3 min-[26rem]:w-auto min-[26rem]:flex-row min-[26rem]:flex-wrap min-[26rem]:items-center"
            style={{ animation: "tx-rise .9s var(--ease-out-expo) .28s both" }}
          >
            <ButtonLink href={href("/shop")} size="lg">
              {h.ctaPrimary}
              <HiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flip-rtl" />
            </ButtonLink>
            <ButtonLink
              href={href("/about")}
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:border-aqua-400/60 hover:bg-white/10 hover:text-white"
            >
              {h.ctaSecondary}
            </ButtonLink>
          </div>

          {/* Stat strip */}
          <dl
            className="mt-4 grid w-full grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-7 sm:grid-cols-4"
            style={{ animation: "tx-rise .9s var(--ease-out-expo) .38s both" }}
          >
            {t.home.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <dt className="text-brand-gradient-light num text-[clamp(1.4rem,1.1rem+1vw,1.85rem)] font-extrabold">
                  {s.value}
                </dt>
                <dd className="text-[0.74rem] leading-snug font-medium text-ink-100/45">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Product constellation ────────────────────────── */}
        <div
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
          style={{ animation: "tx-scale-in 1.1s var(--ease-out-expo) .25s both" }}
        >
          <div className="relative aspect-square">
            {/* orbit rings */}
            <div className="absolute inset-[6%] rounded-full border border-white/8" />
            <div className="absolute inset-[20%] rounded-full border border-white/10" />
            <div className="absolute inset-[34%] rounded-full border border-dashed border-aqua-400/25" />

            {/* core glow */}
            <div className="absolute inset-[26%] rounded-full bg-aqua-500/20 blur-3xl" />

            {/* hero object */}
            <div className="animate-float absolute inset-[22%] grid place-items-center">
              <div className="glass-dark grid h-full w-full place-items-center rounded-[2.5rem] border border-white/15 shadow-[0_40px_120px_-40px_rgba(23,162,191,0.8)]">
                <ProductArt art="paperCup" className="h-[68%] w-[68%]" />
              </div>
            </div>

            {/* satellites */}
            {[
              { art: "cutlery", pos: "top-0 start-[8%]", delay: "-1.4s" },
              { art: "plate", pos: "top-[14%] end-0", delay: "-3.2s" },
              { art: "container", pos: "bottom-[16%] start-0", delay: "-2.1s" },
              { art: "kraft", pos: "bottom-[2%] end-[12%]", delay: "-4.6s" },
            ].map((s) => (
              <div
                key={s.art}
                className={`animate-float absolute ${s.pos} grid h-[22%] w-[22%] place-items-center rounded-3xl border border-white/12 bg-white/95 shadow-[0_20px_50px_-20px_rgba(4,22,36,0.8)]`}
                style={{ animationDelay: s.delay }}
              >
                <ProductArt
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  art={s.art as any}
                  className="h-[72%] w-[72%]"
                />
              </div>
            ))}
          </div>

          {/* Floating credential chips — wrap rather than overflow on
              the narrowest phones. */}
          <div className="absolute inset-x-0 -bottom-2 flex flex-wrap justify-center gap-2">
            {[
              { Icon: HiOutlineTruck, label: `24${"h"}` },
              { Icon: HiShieldCheck, label: "ISO 9001" },
              { Icon: HiOutlineSparkles, label: `${num(240)}M` },
            ].map(({ Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-white/12 bg-ink-950/70 px-3 py-2 text-[0.72rem] font-bold whitespace-nowrap text-ink-100/80 backdrop-blur-md sm:px-3.5"
                dir="ltr"
              >
                <Icon className="h-3.5 w-3.5 text-aqua-400" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div className="relative flex justify-center pb-8">
        <span className="animate-scroll-hint flex flex-col items-center gap-1.5 text-[0.66rem] font-semibold tracking-[0.2em] text-ink-100/40 uppercase">
          {t.common.scrollToExplore}
          <HiOutlineArrowDown className="h-4 w-4" />
        </span>
      </div>

      {/* bottom fade into the page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-mist-50" />
    </section>
  );
}

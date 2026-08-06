"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  HiArrowUpRight,
  HiChevronLeft,
  HiChevronRight,
  HiShieldCheck,
} from "react-icons/hi2";

import { ProductArt } from "@/components/brand/ProductArt";
import { HeritageStamp } from "@/components/brand/HeritageStamp";
import { IranProvinceMap } from "@/components/home/IranProvinceMap";
import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/i18n/I18nProvider";
import { categories } from "@/lib/catalog";

const POSTER_COUNT = 3;
const ROTATION_INTERVAL = 7000;
const PRODUCT_OFFSETS = [
  "translate-y-4 rotate-[-4deg]",
  "-translate-y-3 rotate-[2deg]",
  "-translate-y-5 rotate-[-2deg]",
  "translate-y-2 rotate-[4deg]",
  "-translate-y-1 rotate-[3deg]",
  "translate-y-5 rotate-[-3deg]",
  "translate-y-3 rotate-[2deg]",
  "-translate-y-2 rotate-[-4deg]",
];

export function HeroPosterSlider() {
  const { t, href, isRtl, num } = useI18n();
  const hero = t.home.hero;
  const copy = hero.posterSlider;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const select = useCallback((index: number) => {
    setActive((index + POSTER_COUNT) % POSTER_COUNT);
  }, []);

  const previous = useCallback(() => {
    setActive((current) => (current - 1 + POSTER_COUNT) % POSTER_COUNT);
  }, []);

  const next = useCallback(() => {
    setActive((current) => (current + 1) % POSTER_COUNT);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(next, ROTATION_INTERVAL);
    return () => window.clearInterval(timer);
  }, [next, paused, reducedMotion]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      isRtl ? next() : previous();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      isRtl ? previous() : next();
    }
  };

  const slideClass = (index: number, centered = false) =>
    `col-start-1 row-start-1 grid transition-[opacity,transform] duration-700 ease-out-expo ${
      centered
        ? "place-items-center"
        : "items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-[clamp(2.5rem,5vw,5rem)]"
    } ${
      active === index
        ? "relative z-10 translate-y-0 opacity-100"
        : "pointer-events-none translate-y-3 opacity-0"
    }`;

  return (
    <div
      ref={wrapRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={copy.ariaLabel}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!wrapRef.current?.contains(event.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
      className="enter overflow-hidden"
    >
      <div
        className="grid grid-cols-1"
        aria-live={paused ? "polite" : "off"}
        aria-atomic="true"
      >
        <article
          role="group"
          aria-roledescription="slide"
          aria-label={`${num(1)} / ${num(POSTER_COUNT)}`}
          aria-hidden={active !== 0}
          inert={active !== 0 || undefined}
          className={slideClass(0)}
        >
          <div className="flex flex-col items-start gap-[clamp(1.15rem,2.2vw,1.9rem)]">
            <h1 className="fs-hero max-w-[16ch] font-extrabold text-white">
              {hero.titleTop}{" "}
              <span className="text-aqua-300">{hero.titleAccent}</span>{" "}
              {hero.titleBottom}
            </h1>

            <p className="hero-description fs-lead max-w-[46ch] text-onink-100">
              {hero.subtitle}
            </p>

            <div className="flex w-full flex-col gap-3 min-[26rem]:w-auto min-[26rem]:flex-row min-[26rem]:items-center">
              <ButtonLink href={href("/shop")} size="lg">
                {hero.ctaPrimary}
                <HiArrowUpRight
                  aria-hidden
                  className="h-4 w-4 shrink-0 flip-rtl"
                />
              </ButtonLink>
            </div>

            <span className="fs-caption inline-flex items-center gap-2 text-onink-300">
              <HiShieldCheck
                aria-hidden
                className="h-4 w-4 shrink-0 text-aqua-400"
              />
              {hero.badge}
            </span>
          </div>

          <figure className="relative mx-auto w-full max-w-[40rem]">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-[12%] top-1/2 h-44 -translate-y-1/2 rounded-full bg-aqua-400/[0.08] blur-3xl"
            />
            <svg
              aria-hidden
              viewBox="0 0 640 360"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            >
              <ellipse
                cx="320"
                cy="180"
                rx="282"
                ry="126"
                fill="none"
                stroke="#6bd3e5"
                strokeWidth="1"
                strokeDasharray="3 10"
                opacity="0.24"
              />
              <ellipse
                cx="320"
                cy="180"
                rx="230"
                ry="154"
                fill="none"
                stroke="#d8b96f"
                strokeWidth="0.8"
                opacity="0.16"
                transform="rotate(-8 320 180)"
              />
            </svg>

            <div className="relative grid min-h-[17rem] grid-cols-4 grid-rows-2 items-center gap-x-1 gap-y-2 px-1 sm:min-h-[21rem] sm:gap-x-3 sm:px-5 lg:min-h-[24rem]">
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className={`group relative grid aspect-square place-items-center transition-transform duration-500 ease-out-expo ${PRODUCT_OFFSETS[index]}`}
                >
                  <span
                    aria-hidden
                    className="absolute inset-[14%] rounded-full bg-aqua-200/[0.07] blur-xl transition-[transform,opacity] duration-500 group-hover:scale-125 group-hover:opacity-90"
                  />
                  <ProductArt
                    art={category.art}
                    className="relative z-10 h-[82%] w-[82%] drop-shadow-[0_18px_20px_rgba(1,18,31,0.34)] transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
            <figcaption className="relative mx-auto mt-1 flex w-fit items-center gap-3 text-center">
              <span aria-hidden className="h-px w-8 bg-aqua-400/35" />
              <span className="eyebrow text-onink-300">{copy.productsLabel}</span>
              <span aria-hidden className="h-px w-8 bg-aqua-400/35" />
            </figcaption>
          </figure>
        </article>

        <article
          role="group"
          aria-roledescription="slide"
          aria-label={`${num(2)} / ${num(POSTER_COUNT)}`}
          aria-hidden={active !== 1}
          inert={active !== 1 || undefined}
          className={slideClass(1)}
        >
          <div className="flex flex-col items-start gap-[clamp(1.15rem,2.2vw,1.9rem)]">
            <h2 className="fs-hero max-w-[15ch] font-extrabold text-white">
              {copy.distributionTitle}
            </h2>

            <p className="hero-description fs-lead max-w-[46ch] text-onink-100">
              {copy.distributionBody}
            </p>

            <div className="flex w-full flex-col gap-3 min-[26rem]:w-auto min-[26rem]:flex-row min-[26rem]:items-center">
              <ButtonLink href={href("/shop")} size="lg">
                {hero.ctaPrimary}
                <HiArrowUpRight
                  aria-hidden
                  className="h-4 w-4 shrink-0 flip-rtl"
                />
              </ButtonLink>
              <ButtonLink
                href={href("/about#branches")}
                size="lg"
                variant="onink"
              >
                {copy.branchesCta}
              </ButtonLink>
            </div>
          </div>

          <figure className="relative mx-auto flex w-full max-w-[34rem] items-center justify-center lg:max-w-[40rem]">
            <IranProvinceMap label={copy.mapAlt} />
          </figure>
        </article>

        <article
          role="group"
          aria-roledescription="slide"
          aria-label={`${num(3)} / ${num(POSTER_COUNT)}`}
          aria-hidden={active !== 2}
          inert={active !== 2 || undefined}
          className={slideClass(2, true)}
        >
          <Link
            href={href("/about")}
            aria-label={hero.ctaSecondary}
            className="group flex w-fit flex-col items-center gap-6 rounded-panel px-6 py-4 text-center focus-visible:outline-offset-4"
          >
            <h2 className="sr-only">{hero.ctaSecondary}</h2>
            <div className="transition-transform duration-500 ease-out-expo group-hover:scale-[1.025] group-focus-visible:scale-[1.025]">
              <HeritageStamp prominent />
            </div>
            <span className="fs-caption inline-flex h-12 items-center gap-2 rounded-ctrl border border-hairline-inverse bg-white/[0.05] px-5 font-semibold text-white transition-[background-color,border-color] duration-300 group-hover:border-aqua-400/35 group-hover:bg-white/[0.1]">
              {hero.ctaSecondary}
              <HiArrowUpRight
                aria-hidden
                className="h-4 w-4 shrink-0 flip-rtl"
              />
            </span>
          </Link>
        </article>
      </div>

      <div className="relative z-20 mt-7 flex items-center justify-center gap-3 border-t border-hairline-inverse pt-4">
        <button
          type="button"
          onClick={previous}
          aria-label={copy.previous}
          className="hover-rule flex h-11 w-11 shrink-0 items-center justify-center rounded-ctrl text-onink-200 hover:bg-white/[0.06] hover:text-white"
        >
          <HiChevronLeft aria-hidden className="h-4 w-4 flip-rtl" />
        </button>

        <div className="flex items-center" role="group" aria-label={copy.ariaLabel}>
          {Array.from({ length: POSTER_COUNT }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => select(index)}
              aria-label={`${copy.goTo} ${num(index + 1)}`}
              aria-current={active === index ? "true" : undefined}
              className="hover-rule flex h-11 w-10 items-center justify-center"
            >
              <span
                aria-hidden
                className={`block h-1.5 rounded-chip transition-[width,background-color] duration-300 ${
                  active === index
                    ? "w-7 bg-aqua-300"
                    : "w-1.5 bg-onink-400 hover:bg-onink-300"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label={copy.next}
          className="hover-rule flex h-11 w-11 shrink-0 items-center justify-center rounded-ctrl text-onink-200 hover:bg-white/[0.06] hover:text-white"
        >
          <HiChevronRight aria-hidden className="h-4 w-4 flip-rtl" />
        </button>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  HiArrowUpRight,
  HiChevronLeft,
  HiChevronRight,
  HiShieldCheck,
} from "react-icons/hi2";

import { ProductArt } from "@/components/brand/ProductArt";
import { IranProvinceMap } from "@/components/home/IranProvinceMap";
import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/i18n/I18nProvider";
import { categories } from "@/lib/catalog";

const POSTER_COUNT = 2;
const ROTATION_INTERVAL = 7000;

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

  const slideClass = (index: number) =>
    `col-start-1 row-start-1 grid items-center gap-10 transition-[opacity,transform] duration-700 ease-out-expo lg:grid-cols-[1.02fr_0.98fr] lg:gap-[clamp(2.5rem,5vw,5rem)] ${
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
              <ButtonLink href={href("/about")} size="lg" variant="onink">
                {hero.ctaSecondary}
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

          <figure className="relative mx-auto w-full max-w-[32rem] overflow-hidden rounded-panel border border-hairline-inverse bg-inverse-2 shadow-e3 lg:max-w-[38rem]">
            <div
              aria-hidden
              className="tick-rule h-4 w-full border-b border-hairline-inverse"
            />
            <div className="grid grid-cols-4 grid-rows-2 gap-px bg-hairline-inverse">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="relative grid aspect-square place-items-center bg-inverse-2 p-2.5 sm:p-3"
                >
                  <ProductArt art={category.art} className="h-[60%] w-[60%]" />
                </div>
              ))}
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-t border-hairline-inverse px-5 py-3.5">
              <span className="eyebrow text-onink-300">
                {copy.productsLabel}
              </span>
              <span aria-hidden className="flex shrink-0 gap-1">
                <i className="block h-1.5 w-1.5 rounded-chip bg-aqua-400/80" />
                <i className="block h-1.5 w-1.5 rounded-chip bg-onink-400/60" />
                <i className="block h-1.5 w-1.5 rounded-chip bg-onink-400/60" />
              </span>
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
              <ButtonLink href={href("/contact")} size="lg">
                {copy.distributionCta}
                <HiArrowUpRight
                  aria-hidden
                  className="h-4 w-4 shrink-0 flip-rtl"
                />
              </ButtonLink>
              <ButtonLink href={href("/shop")} size="lg" variant="onink">
                {hero.ctaPrimary}
              </ButtonLink>
            </div>
          </div>

          <figure className="relative mx-auto flex w-full max-w-[34rem] items-center justify-center lg:max-w-[40rem]">
            <IranProvinceMap label={copy.mapAlt} />
          </figure>
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

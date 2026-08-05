"use client";

import { HiArrowUpRight, HiShieldCheck } from "react-icons/hi2";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { ProductArt } from "@/components/brand/ProductArt";
import { categories } from "@/lib/catalog";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * HERO — "The Contact Sheet" (§7).
 *
 * Not a product floating in space: a catalogue plate. The eight
 * production families are laid out on a ruled specification sheet with a
 * drawn measurement scale across its top edge — "we make all of this, to
 * a standard" in one glance. Two entrance animations, then total
 * stillness. No orbit rings, no satellites, no glass, no drift, no
 * scroll hint, no credential chips, and — per the client instruction —
 * no statistic, counter or big-number credibility device of any kind.
 */
export function Hero() {
  const { t, href } = useI18n();
  const h = t.home.hero;

  return (
    <section className="mesh-dark relative isolate overflow-hidden">
      {/* Exactly three decorative layers, all inert. */}
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-56 -start-40 h-[42rem] w-[42rem] rounded-full bg-aqua-500/12 blur-[130px]"
      />
      <div
        aria-hidden
        className="grain-layer pointer-events-none absolute inset-0 opacity-[0.08]"
      />

      <div className="shell relative grid gap-12 pt-[calc(var(--nav-h)+clamp(2.5rem,6vw,5.5rem))] pb-[clamp(3.5rem,7vw,7rem)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-[clamp(2.5rem,5vw,5rem)]">
        {/* ── Leading cell — the claim ─────────────────────────── */}
        <div className="enter flex flex-col items-start gap-[clamp(1.15rem,2.2vw,1.9rem)]">
          <Eyebrow tone="light">{h.eyebrow}</Eyebrow>

          <h1 className="fs-hero max-w-[16ch] font-extrabold text-white">
            {h.titleTop} <span className="text-aqua-300">{h.titleAccent}</span>{" "}
            {h.titleBottom}
          </h1>

          <p className="fs-lead max-w-[46ch] text-onink-100">{h.subtitle}</p>

          <div className="flex w-full flex-col gap-3 min-[26rem]:w-auto min-[26rem]:flex-row min-[26rem]:items-center">
            <ButtonLink href={href("/shop")} size="lg">
              {h.ctaPrimary}
              <HiArrowUpRight aria-hidden className="h-4 w-4 shrink-0 flip-rtl" />
            </ButtonLink>
            <ButtonLink href={href("/about")} size="lg" variant="onink">
              {h.ctaSecondary}
            </ButtonLink>
          </div>

          {/* One credential line — replaces the deleted chip row + badge. */}
          <span className="fs-caption inline-flex items-center gap-2 text-onink-300">
            <HiShieldCheck
              aria-hidden
              className="h-4 w-4 shrink-0 text-aqua-400"
            />
            {h.badge}
          </span>
        </div>

        {/* ── Trailing cell — the plate ────────────────────────── */}
        <figure
          className="enter-scale relative mx-auto w-full max-w-[32rem] overflow-hidden rounded-panel border border-hairline-inverse bg-inverse-2 shadow-e3 lg:max-w-[38rem]"
          style={{ animationDelay: "120ms" }}
        >
          {/* Drawn measurement scale. Symmetric — no RTL variant. */}
          <div
            aria-hidden
            className="tick-rule h-4 w-full border-b border-hairline-inverse"
          />

          {/* The contact sheet. 1px rules come from gap-px over the
              hairline parent, so the grid stays direction-agnostic. */}
          <div className="grid grid-cols-2 gap-px bg-hairline-inverse min-[26rem]:grid-cols-3 sm:grid-cols-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="relative grid aspect-square place-items-center bg-inverse-2 p-3"
              >
                <ProductArt art={cat.art} className="h-[58%] w-[58%]" />
              </div>
            ))}
            {/* Eight cells never fill a 3-column row; this keeps the
                ruled plate solid instead of exposing the hairline
                parent as a pale block in the last row. */}
            <span
              aria-hidden
              className="hidden bg-inverse-2 min-[26rem]:block sm:hidden"
            />
          </div>

          <figcaption className="flex items-center justify-between gap-4 border-t border-hairline-inverse px-5 py-3.5">
            <span className="eyebrow text-onink-300">
              {t.home.categories.eyebrow}
            </span>
            {/* Registration marks — a printer's mark, not a control. */}
            <span aria-hidden className="flex shrink-0 gap-1">
              <i className="block h-1.5 w-1.5 rounded-chip bg-aqua-400/80" />
              <i className="block h-1.5 w-1.5 rounded-chip bg-onink-400/60" />
              <i className="block h-1.5 w-1.5 rounded-chip bg-onink-400/60" />
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

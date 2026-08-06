"use client";

import { Container } from "@/components/ui/Section";

/** Rotates the one static wash per route so five pages do not open on the
 *  same slab. Position and hue both move — never the number of layers. */
const accents = {
  cool: "-top-48 end-[-8rem] h-[38rem] w-[38rem] bg-aqua-500/14",
  deep: "-bottom-64 start-[-10rem] h-[46rem] w-[46rem] bg-ink-600/55",
  warm: "-top-44 start-[30%] h-[36rem] w-[36rem] bg-sand-500/12",
} as const;

/**
 * The masthead that fronts every inner page.
 *
 * It is an INK chapter, which is a design rule *and* the permanent fix for
 * the invisible-header bug: `tone = scrolled ? "dark" : "light"` is only
 * ever correct because the top of every route is dark.
 *
 * Variety without a new component: the wash rotates by `accent`, the
 * silhouette changes with `media` (one column becomes two), the rhythm
 * changes with `pad`, and a drawn measurement scale closes the bottom
 * edge unless the page asks to fade into the chapter below.
 */
export function PageHero({
  title,
  subtitle,
  accent = "cool",
  media,
  fadeTo,
  pad,
  compact = false,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent?: keyof typeof accents;
  /** Optional trailing-column object. Its presence changes the layout. */
  media?: React.ReactNode;
  /** Bottom gradient into the next chapter. Omit for a hard chapter seam. */
  fadeTo?: "page" | "sunken";
  pad?: "base" | "tight";
  /** Alias for pad="tight" — the /shop masthead. */
  compact?: boolean;
  children?: React.ReactNode;
}) {
  const tight = (pad ?? (compact ? "tight" : "base")) === "tight";

  return (
    <section
      data-tone="ink"
      className={`mesh-dark nav-clear relative isolate ${
        tight
          ? "pb-[clamp(2.25rem,4.5vw,4rem)]"
          : "pb-[clamp(3.5rem,7vw,7rem)]"
      }`}
    >
      {/* Every wash lives in one clipped layer, so `media` can still bleed
          past the section's own edges if a page wants it to. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="grid-lines absolute inset-0" />
        <div className={`absolute rounded-full blur-[130px] ${accents[accent]}`} />
        <div className="grain-layer absolute inset-0 opacity-[0.08]" />
        {fadeTo ? (
          <div
            className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent ${
              fadeTo === "sunken" ? "to-sunken" : "to-page"
            }`}
          />
        ) : (
          <div className="tick-rule absolute inset-x-0 bottom-0 h-3" />
        )}
      </div>

      <Container className="relative">
        <div
          className={`grid gap-10 ${
            media ? "lg:grid-cols-[1fr_0.82fr] lg:items-end lg:gap-14" : ""
          }`}
        >
          <div className="enter flex flex-col items-start gap-5">
            <h1 className="fs-h1 max-w-[18ch] font-bold text-white">{title}</h1>
            {subtitle ? (
              <p className="fs-lead max-w-[56ch] text-onink-200">{subtitle}</p>
            ) : null}
            {children ? <div className="w-full pt-1">{children}</div> : null}
          </div>

          {media ? (
            <div
              className="enter-fade w-full"
              style={{ animationDelay: "160ms" }}
            >
              {media}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

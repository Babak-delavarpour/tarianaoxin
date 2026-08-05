"use client";

import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";
import { Container, Divider, Eyebrow } from "@/components/ui/Section";
import { useI18n } from "@/i18n/I18nProvider";

export type Crumb = { label: string; path?: string };

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
  eyebrow,
  title,
  subtitle,
  crumb,
  crumbs,
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
  /** Single trailing crumb — the shorthand every route currently uses. */
  crumb?: string;
  /** Full trail, when a route is more than one level deep. */
  crumbs?: (string | Crumb)[];
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
  const { t, href } = useI18n();

  const trail: Crumb[] = (
    crumbs ?? (crumb ? [crumb] : [])
  ).map((c) => (typeof c === "string" ? { label: c } : c));

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
        <nav aria-label={t.common.breadcrumb}>
          <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <li>
              <Link
                href={href("/")}
                className="hover-rule eyebrow text-onink-300 hover:text-white"
              >
                {t.nav.home}
              </Link>
            </li>
            {trail.map((c, i) => {
              const last = i === trail.length - 1;
              return (
                <li key={`${c.label}-${i}`} className="flex items-center gap-2.5">
                  <HiChevronRight
                    aria-hidden
                    className="h-3 w-3 shrink-0 text-onink-400 flip-rtl"
                  />
                  {c.path && !last ? (
                    <Link
                      href={href(c.path)}
                      className="hover-rule eyebrow text-onink-300 hover:text-white"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span
                      className="eyebrow text-white"
                      aria-current={last ? "page" : undefined}
                    >
                      {c.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Masthead rule: chrome above it, content below. Together with the
            tick scale on the bottom edge it frames the chapter. */}
        <Divider tone="light" className="mt-4" />

        <div
          className={`mt-[clamp(1.75rem,3.5vw,3rem)] grid gap-10 ${
            media ? "lg:grid-cols-[1fr_0.82fr] lg:items-end lg:gap-14" : ""
          }`}
        >
          <div className="enter flex flex-col items-start gap-5">
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
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

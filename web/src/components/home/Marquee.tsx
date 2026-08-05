"use client";

import { HiCheckBadge } from "react-icons/hi2";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * TICKER (§4.3 / 2) — a thin ruled trust rail on paper, ≤4rem tall.
 *
 * The band is the hard value cut under the ink hero: white, hairline
 * top and bottom, one line of content. Items are separated by real 1px
 * rules on their leading edge rather than by empty space, so the strip
 * reads as a ledger line rather than a logo carousel.
 *
 * Two identical halves and no gap on the track: the 42s keyframe
 * translates exactly -50%, so the seam is invisible. The RTL keyframe
 * swap, the hover pause and the reduced-motion stop (which turns this
 * container into a horizontal scroller so the content stays reachable)
 * all live in globals.css.
 */
export function Marquee() {
  const { t } = useI18n();
  const items = t.home.marquee;

  return (
    <div className="relative border-y border-hairline bg-page shadow-e1">
      <div
        className="marquee overflow-hidden"
        style={{
          // Symmetric fade, so it reads identically in LTR and RTL.
          maskImage:
            "linear-gradient(to right, transparent, #000 9%, #000 91%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 9%, #000 91%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max items-stretch">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              role="list"
              aria-hidden={copy === 1 || undefined}
              className="flex items-stretch"
            >
              {items.map((item) => (
                <li
                  key={item}
                  className="fs-caption flex items-center gap-2.5 border-s border-hairline px-[clamp(1.25rem,3.4vw,2.75rem)] py-4 font-semibold whitespace-nowrap text-ink-800"
                >
                  <HiCheckBadge
                    aria-hidden
                    className="h-3.5 w-3.5 shrink-0 text-aqua-700"
                  />
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

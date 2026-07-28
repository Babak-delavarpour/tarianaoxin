"use client";

import { HiCheckBadge } from "react-icons/hi2";
import { useI18n } from "@/i18n/I18nProvider";

export function Marquee() {
  const { t } = useI18n();
  const items = t.home.marquee;

  return (
    <div
      className="marquee relative -mt-px overflow-hidden border-y border-mist-200 bg-white py-4"
      style={{
        // symmetric fade, so it reads the same in LTR and RTL
        maskImage:
          "linear-gradient(to right, transparent, #000 9%, #000 91%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 9%, #000 91%, transparent)",
      }}
    >
      <div className="marquee-track flex w-max items-center gap-10">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex items-center gap-10 pe-10"
            aria-hidden={copy === 1}
          >
            {items.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2.5 text-[0.86rem] font-bold whitespace-nowrap text-ink-700"
              >
                <HiCheckBadge className="h-4 w-4 shrink-0 text-aqua-500" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

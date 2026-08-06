"use client";

import { useEffect, useRef, useState } from "react";

import { useI18n } from "@/i18n/I18nProvider";
import type { Locale } from "@/i18n/config";

const provinceNames: Record<"fa" | "ar", Record<string, string>> = {
  fa: {
    Alborz: "البرز",
    Ardabil: "اردبیل",
    Bushehr: "بوشهر",
    "Chaharmahal and Bakhtiari": "چهارمحال و بختیاری",
    "East Azerbaijan": "آذربایجان شرقی",
    Fars: "فارس",
    Gilan: "گیلان",
    Golestan: "گلستان",
    Hamadan: "همدان",
    Hormozgan: "هرمزگان",
    Ilam: "ایلام",
    Isfahan: "اصفهان",
    Kerman: "کرمان",
    Kermanshah: "کرمانشاه",
    Khuzestan: "خوزستان",
    "Kohgiluyeh and Boyer-Ahmad": "کهگیلویه و بویراحمد",
    Kurdistan: "کردستان",
    Lorestan: "لرستان",
    Markazi: "مرکزی",
    Mazandaran: "مازندران",
    "North Khorasan": "خراسان شمالی",
    Qazvin: "قزوین",
    Qom: "قم",
    "Razavi Khorasan": "خراسان رضوی",
    Semnan: "سمنان",
    "Sistan and Baluchestan": "سیستان و بلوچستان",
    "South Khorasan": "خراسان جنوبی",
    Tehran: "تهران",
    "West Azerbaijan": "آذربایجان غربی",
    Yazd: "یزد",
    Zanjan: "زنجان",
  },
  ar: {
    Alborz: "ألبرز",
    Ardabil: "أردبيل",
    Bushehr: "بوشهر",
    "Chaharmahal and Bakhtiari": "تشهارمحال وبختياري",
    "East Azerbaijan": "أذربيجان الشرقية",
    Fars: "فارس",
    Gilan: "جيلان",
    Golestan: "جلستان",
    Hamadan: "همدان",
    Hormozgan: "هرمزغان",
    Ilam: "إيلام",
    Isfahan: "أصفهان",
    Kerman: "كرمان",
    Kermanshah: "كرمانشاه",
    Khuzestan: "خوزستان",
    "Kohgiluyeh and Boyer-Ahmad": "كهكيلويه وبوير أحمد",
    Kurdistan: "كردستان",
    Lorestan: "لرستان",
    Markazi: "مركزي",
    Mazandaran: "مازندران",
    "North Khorasan": "خراسان الشمالية",
    Qazvin: "قزوين",
    Qom: "قم",
    "Razavi Khorasan": "خراسان الرضوية",
    Semnan: "سمنان",
    "Sistan and Baluchestan": "سيستان وبلوشستان",
    "South Khorasan": "خراسان الجنوبية",
    Tehran: "طهران",
    "West Azerbaijan": "أذربيجان الغربية",
    Yazd: "يزد",
    Zanjan: "زنجان",
  },
};

type Tooltip = {
  name: string;
  x: number;
  y: number;
};

function localizedProvinceName(name: string, locale: Locale) {
  return locale === "en" ? name : provinceNames[locale][name] || name;
}

function provincePath(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  return target.closest<SVGPathElement>("[data-province]");
}

function tooltipX(x: number, width: number) {
  const edge = Math.min(112, width / 2);
  return Math.max(edge, Math.min(width - edge, x));
}

export function IranProvinceMap({ label }: { label: string }) {
  const { locale } = useI18n();
  const mapRef = useRef<HTMLDivElement>(null);
  const [markup, setMarkup] = useState("");
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/iran-provinces.svg", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load the Iran map");
        return response.text();
      })
      .then((source) => {
        const document = new DOMParser().parseFromString(
          source,
          "image/svg+xml",
        );
        const svg = document.documentElement;
        svg.setAttribute("aria-label", label);
        svg.removeAttribute("aria-labelledby");

        svg.querySelectorAll<SVGPathElement>("[data-province]").forEach((path) => {
          const name = path.dataset.province || "";
          const localizedName = localizedProvinceName(name, locale);
          path.dataset.displayName = localizedName;
          path.setAttribute("aria-label", localizedName);
          path.querySelector("title")?.remove();
        });

        setMarkup(svg.outerHTML);
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setMarkup("");
        }
      });

    return () => controller.abort();
  }, [label, locale]);

  const showAtPointer = (path: SVGPathElement, clientX: number, clientY: number) => {
    const bounds = mapRef.current?.getBoundingClientRect();
    if (!bounds) return;
    setTooltip({
      name: path.dataset.displayName || path.dataset.province || "",
      x: tooltipX(clientX - bounds.left, bounds.width),
      y: clientY - bounds.top - 10,
    });
  };

  const showAtProvince = (path: SVGPathElement) => {
    const bounds = mapRef.current?.getBoundingClientRect();
    const provinceBounds = path.getBoundingClientRect();
    if (!bounds) return;
    setTooltip({
      name: path.dataset.displayName || path.dataset.province || "",
      x: tooltipX(
        provinceBounds.left + provinceBounds.width / 2 - bounds.left,
        bounds.width,
      ),
      y: provinceBounds.top - bounds.top - 8,
    });
  };

  return (
    <div
      ref={mapRef}
      className="iran-province-map relative h-[17rem] w-full sm:h-[27rem]"
      onPointerMove={(event) => {
        const path = provincePath(event.target);
        if (path) showAtPointer(path, event.clientX, event.clientY);
      }}
      onPointerDown={(event) => {
        const path = provincePath(event.target);
        if (path) showAtPointer(path, event.clientX, event.clientY);
      }}
      onPointerOut={(event) => {
        const current = provincePath(event.target);
        const next = provincePath(event.relatedTarget);
        if (current !== next) setTooltip(null);
      }}
      onPointerLeave={() => setTooltip(null)}
      onPointerCancel={() => setTooltip(null)}
      onFocusCapture={(event) => {
        const path = provincePath(event.target);
        if (path) showAtProvince(path);
      }}
      onBlurCapture={() => setTooltip(null)}
    >
      {markup ? (
        <div
          className="h-full w-full"
          dangerouslySetInnerHTML={{ __html: markup }}
        />
      ) : (
        <div aria-hidden className="h-full w-full" />
      )}

      {tooltip && (
        <span
          role="tooltip"
          className="pointer-events-none absolute z-20 max-w-56 -translate-x-1/2 -translate-y-full rounded-ctrl bg-ink-950 px-3 py-1.5 text-center text-sm font-semibold text-white shadow-e2 ring-1 ring-white/15"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.name}
        </span>
      )}
    </div>
  );
}

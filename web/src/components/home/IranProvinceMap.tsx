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

export type BranchMarker = {
  id: string;
  name: string;
  x: number;
  y: number;
};

const NO_BRANCHES: readonly BranchMarker[] = [];

function localizedProvinceName(name: string, locale: Locale) {
  return locale === "en" ? name : provinceNames[locale][name] || name;
}

function mapItem(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  return target.closest<SVGGraphicsElement>("[data-province], [data-branch]");
}

function tooltipX(x: number, width: number) {
  const edge = Math.min(112, width / 2);
  return Math.max(edge, Math.min(width - edge, x));
}

export function IranProvinceMap({
  label,
  branches = NO_BRANCHES,
}: {
  label: string;
  branches?: readonly BranchMarker[];
}) {
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

        if (branches.length) {
          const namespace = "http://www.w3.org/2000/svg";
          const markerLayer = document.createElementNS(namespace, "g");
          markerLayer.setAttribute("aria-label", label);

          branches.forEach((branch) => {
            const marker = document.createElementNS(namespace, "g");
            marker.dataset.branch = branch.id;
            marker.dataset.displayName = branch.name;
            marker.setAttribute("transform", `translate(${branch.x} ${branch.y})`);
            marker.setAttribute("tabindex", "0");
            marker.setAttribute("focusable", "true");
            marker.setAttribute("role", "img");
            marker.setAttribute("aria-label", branch.name);

            const halo = document.createElementNS(namespace, "circle");
            halo.setAttribute("r", "13");
            halo.setAttribute("fill", "#041624");
            halo.setAttribute("stroke", "#ffffff");
            halo.setAttribute("stroke-width", "2.5");

            const point = document.createElementNS(namespace, "circle");
            point.setAttribute("r", "5");
            point.setAttribute("fill", "#dc9d51");

            marker.append(halo, point);
            markerLayer.appendChild(marker);
          });

          svg.appendChild(markerLayer);
        }

        setMarkup(svg.outerHTML);
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setMarkup("");
        }
      });

    return () => controller.abort();
  }, [branches, label, locale]);

  const showAtPointer = (
    item: SVGGraphicsElement,
    clientX: number,
    clientY: number,
  ) => {
    const bounds = mapRef.current?.getBoundingClientRect();
    if (!bounds) return;
    setTooltip({
      name:
        item.dataset.displayName ||
        item.dataset.province ||
        item.dataset.branch ||
        "",
      x: tooltipX(clientX - bounds.left, bounds.width),
      y: clientY - bounds.top - 10,
    });
  };

  const showAtItem = (item: SVGGraphicsElement) => {
    const bounds = mapRef.current?.getBoundingClientRect();
    const itemBounds = item.getBoundingClientRect();
    if (!bounds) return;
    setTooltip({
      name:
        item.dataset.displayName ||
        item.dataset.province ||
        item.dataset.branch ||
        "",
      x: tooltipX(
        itemBounds.left + itemBounds.width / 2 - bounds.left,
        bounds.width,
      ),
      y: itemBounds.top - bounds.top - 8,
    });
  };

  return (
    <div
      ref={mapRef}
      className="iran-province-map relative h-[17rem] w-full sm:h-[27rem]"
      onPointerMove={(event) => {
        const item = mapItem(event.target);
        if (item) showAtPointer(item, event.clientX, event.clientY);
      }}
      onPointerDown={(event) => {
        const item = mapItem(event.target);
        if (item) showAtPointer(item, event.clientX, event.clientY);
      }}
      onPointerOut={(event) => {
        const current = mapItem(event.target);
        const next = mapItem(event.relatedTarget);
        if (current !== next) setTooltip(null);
      }}
      onPointerLeave={() => setTooltip(null)}
      onPointerCancel={() => setTooltip(null)}
      onFocusCapture={(event) => {
        const item = mapItem(event.target);
        if (item) showAtItem(item);
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

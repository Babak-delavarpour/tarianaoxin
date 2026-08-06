"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  HiMagnifyingGlass,
  HiOutlineAdjustmentsHorizontal,
  HiXMark,
  HiArrowUpRight,
} from "react-icons/hi2";
import { Chapter, Container } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "./ProductCard";
import { ShopLanding } from "./ShopLanding";
import {
  categories,
  products,
  priceBounds,
  type Badge,
  type CategoryId,
} from "@/lib/catalog";
import { useI18n } from "@/i18n/I18nProvider";

type Sort = "featured" | "asc" | "desc" | "new";

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function ShopView({
  initialCategory,
  initialQuery = "",
}: {
  initialCategory?: string;
  initialQuery?: string;
}) {
  const { t, locale, href, num, price } = useI18n();
  const initialCategoryId = categories.some(
    (item) => item.id === initialCategory,
  )
    ? (initialCategory as CategoryId)
    : "all";

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<CategoryId | "all">(
    initialCategoryId,
  );
  const [badges, setBadges] = useState<Badge[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [sort, setSort] = useState<Sort>("featured");
  const [panelOpen, setPanelOpen] = useState(false);

  const sheetRef = useRef<HTMLDivElement>(null);
  const sheetCloseRef = useRef<HTMLButtonElement>(null);

  /**
   * The filter sheet covers the viewport on phones: the page behind it must
   * not scroll, Escape has to dismiss it, focus moves in and is restored on
   * close, and Tab is trapped inside for as long as it is open.
   */
  useEffect(() => {
    if (!panelOpen) return;

    const restoreOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    sheetCloseRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanelOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const root = sheetRef.current;
      if (!root) return;
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = restoreOverflow;
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [panelOpen]);

  const toggleBadge = (b: Badge) =>
    setBadges((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b],
    );

  const selectCategory = (nextCategory: CategoryId | "all") => {
    setCategory(nextCategory);
    const url = new URL(window.location.href);
    if (nextCategory === "all") url.searchParams.delete("cat");
    else url.searchParams.set("cat", nextCategory);
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
  };

  const openCategory = (nextCategory: CategoryId) => {
    setQuery("");
    selectCategory(nextCategory);
    window.setTimeout(() => {
      document.getElementById("shop-results")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }, 0);
  };

  const reset = () => {
    setQuery("");
    selectCategory("all");
    setBadges([]);
    setInStockOnly(false);
    setMaxPrice(priceBounds.max);
    setSort("featured");
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const list = products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (inStockOnly && p.stock === "out") return false;
      if (p.price > maxPrice) return false;
      if (badges.length && !badges.every((b) => p.badges.includes(b)))
        return false;
      if (!q) return true;
      return (
        p.name[locale].toLowerCase().includes(q) ||
        p.blurb[locale].toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      );
    });

    const sorted = [...list];
    switch (sort) {
      case "asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "new":
        sorted.sort((a, b) => b.addedRank - a.addedRank);
        break;
      default:
        sorted.sort(
          (a, b) => Number(!!b.featured) - Number(!!a.featured) || b.rating - a.rating,
        );
    }
    return sorted;
  }, [query, category, badges, inStockOnly, maxPrice, sort, locale]);

  /** Every active constraint, each individually removable (§5.7). */
  const activeFilters: { key: string; label: React.ReactNode; clear: () => void }[] =
    [
      ...(query
        ? [{ key: "q", label: query, clear: () => setQuery("") }]
        : []),
      ...(category !== "all"
        ? [
            {
              key: `c-${category}`,
              label: categories.find((c) => c.id === category)?.name[locale] ?? "",
              clear: () => selectCategory("all"),
            },
          ]
        : []),
      ...badges.map((b) => ({
        key: `b-${b}`,
        label: t.common[b],
        clear: () => toggleBadge(b),
      })),
      ...(inStockOnly
        ? [{ key: "s", label: t.common.inStock, clear: () => setInStockOnly(false) }]
        : []),
      ...(maxPrice < priceBounds.max
        ? [
            {
              key: "p",
              label: (
                <span className="num">{`≤ ${price(maxPrice)}`}</span>
              ),
              clear: () => setMaxPrice(priceBounds.max),
            },
          ]
        : []),
    ];

  const activeCount = activeFilters.length;
  const showCatalog = query.trim().length > 0 || category !== "all";

  /* ── The filter instrument. Rendered twice: docked in the sidebar
        from `lg` up, and inside the bottom sheet below it. ───────── */
  const filterPanel = (
    <div className="flex flex-col gap-8">
      {/* Categories — a ruled ledger, not a stack of pills */}
      <fieldset>
        <legend className="eyebrow mb-3.5 text-ink-900">
          {t.common.categories}
        </legend>
        <div className="flex flex-col border-t border-hairline">
          {(
            [
              {
                id: "all" as const,
                label: t.common.allCategories,
                skus: products.length,
              },
            ] as { id: CategoryId | "all"; label: string; skus: number }[]
          )
            .concat(
              categories.map((c) => ({
                id: c.id,
                label: c.name[locale],
                skus: products.filter((p) => p.category === c.id).length,
              })),
            )
            .map((c) => {
              const on = category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => selectCategory(c.id)}
                  aria-pressed={on}
                  className={`hover-rule flex min-h-11 items-center justify-between gap-3 border-b border-s-2 py-2.5 pe-1 ps-3 text-start fs-caption ${
                    on
                      ? "border-s-aqua-600 bg-mist-100 font-semibold text-ink-900"
                      : "border-s-transparent font-medium text-mist-600 hover:border-s-hairline-strong hover:text-ink-900"
                  }`}
                >
                  {c.label}
                  <span
                    className={`num fs-micro font-semibold ${
                      on ? "text-aqua-700" : "text-mist-600"
                    }`}
                  >
                    {num(c.skus)}
                  </span>
                </button>
              );
            })}
        </div>
      </fieldset>

      {/* Price — a real instrument: drawn thumb, drawn scale */}
      <fieldset>
        <legend className="eyebrow mb-3.5 text-ink-900">
          {t.shop.priceRange}
        </legend>
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          step={1}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          aria-label={t.shop.priceRange}
          aria-valuetext={price(maxPrice)}
          className="range-brand w-full cursor-pointer"
        />
        <div aria-hidden className="tick-rule mt-2 h-2.5 w-full" />
        <div className="mt-2 flex items-baseline justify-between gap-3">
          <span className="num fs-micro font-semibold text-mist-600">
            {price(priceBounds.min)}
          </span>
          <span className="num fs-price-compact font-bold text-ink-900">
            {price(maxPrice)}
          </span>
        </div>
      </fieldset>

      {/* Highlights */}
      <fieldset>
        <legend className="eyebrow mb-3.5 text-ink-900">{t.shop.badges}</legend>
        <div className="flex flex-wrap gap-2">
          {(["bestseller", "new", "eco"] as Badge[]).map((b) => {
            const on = badges.includes(b);
            return (
              <button
                key={b}
                type="button"
                onClick={() => toggleBadge(b)}
                aria-pressed={on}
                className={`tap-target hover-rule rounded-chip border px-3.5 py-2 fs-micro font-semibold ${
                  on
                    ? "border-ink-900 bg-ink-900 text-white"
                    : "border-hairline-strong text-ink-800 hover:border-aqua-700 hover:text-aqua-700"
                }`}
              >
                {t.common[b]}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Availability */}
      <fieldset>
        <legend className="eyebrow mb-3.5 text-ink-900">
          {t.shop.availability}
        </legend>
        <label className="hover-rule flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-ctrl border border-hairline-strong px-3.5 py-2.5 fs-caption font-semibold text-ink-800 hover:border-aqua-700">
          {t.common.inStock}
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4.5 w-4.5 shrink-0 accent-aqua-700"
          />
        </label>
      </fieldset>

      {activeCount > 0 ? (
        <Button variant="outline" size="md" onClick={reset} className="w-full">
          <HiXMark aria-hidden className="h-4 w-4" />
          {t.common.resetFilters}
        </Button>
      ) : null}
    </div>
  );

  return (
    <>
      {/* ═══ INK MASTHEAD — compact, with the search promoted into it ═══ */}
      <section
        data-tone="ink"
        className="mesh-dark relative isolate overflow-hidden pt-[calc(var(--nav-h)+clamp(1rem,2vw,1.5rem))] pb-[clamp(1.5rem,2.5vw,2.25rem)]"
      >
        <div
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-0 opacity-60"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-56 -start-40 h-[42rem] w-[42rem] rounded-chip bg-aqua-500/12 blur-[130px]"
        />
        <div
          aria-hidden
          className="grain-layer pointer-events-none absolute inset-0 opacity-[0.08]"
        />

        <Container className="relative">
          <div
            className={`grid gap-6 ${
              locale === "fa"
                ? ""
                : "xl:grid-cols-[minmax(0,1fr)_minmax(0,42rem)] xl:items-end xl:gap-10"
            }`}
          >
            {locale !== "fa" && (
              <div className="enter flex flex-col gap-4">
                <h1 className="fs-h1 max-w-[16ch] font-bold text-white">
                  {t.shop.hero.title}
                </h1>
                <p className="fs-lead max-w-[56ch] text-onink-200">
                  {t.shop.hero.subtitle}
                </p>
              </div>
            )}

            <div
              className={`enter-fade w-full max-w-2xl ${
                locale === "fa" ? "mx-auto" : ""
              }`}
            >
              <form
                role="search"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!query.trim()) return;
                  window.setTimeout(() => {
                    document.getElementById("shop-results")?.scrollIntoView({
                      behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)",
                      ).matches
                        ? "auto"
                        : "smooth",
                      block: "start",
                    });
                  }, 0);
                }}
              >
                <label htmlFor="shop-search" className="sr-only">
                  {t.common.search}
                </label>
                <div className="relative flex h-14 items-center overflow-hidden rounded-card bg-inverse-2 shadow-e2 ring-1 ring-white/15 transition-shadow duration-200 focus-within:shadow-e3">
                  <HiMagnifyingGlass
                    aria-hidden
                    className="pointer-events-none absolute start-4 h-5 w-5 text-aqua-300"
                  />
                  <input
                    id="shop-search"
                    type="text"
                    inputMode="search"
                    autoComplete="off"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t.common.search}
                    className="h-full min-w-0 flex-1 border-0 bg-transparent ps-12 pe-4 fs-body text-white caret-aqua-300 placeholder:text-onink-300 focus-visible:outline-none"
                  />

                  {query ? (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label={`${t.common.close} ${t.common.search}`}
                      className="hover-rule me-1 grid h-10 w-10 shrink-0 place-items-center rounded-ctrl text-onink-200 hover:bg-white/10 hover:text-white focus-visible:outline-offset-[-2px]"
                    >
                      <HiXMark aria-hidden className="h-4.5 w-4.5" />
                    </button>
                  ) : null}

                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {showCatalog ? (
        /* ═══ BOARD — filters and catalogue appear after intent. ═══ */
        <Chapter id="shop-results" tone="board" pad="tight">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[16.5rem_1fr] lg:gap-12">
            {/* Docked filters */}
            <aside aria-label={t.common.filters} className="hidden lg:block">
              <div className="scroll-pane sticky top-[calc(var(--nav-h)+1.5rem)] max-h-[calc(100dvh-var(--nav-h)-3rem)] overflow-y-auto rounded-card border border-hairline bg-page p-6">
                {filterPanel}
              </div>
            </aside>

            <div className="flex min-w-0 flex-col gap-5">
              {/* Instrument bar */}
              <div className="sticky top-[calc(var(--nav-h)+0.75rem)] z-20 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 rounded-card border border-hairline bg-page px-4 py-3 shadow-e1 sm:px-5">
                <p
                  role="status"
                  aria-live="polite"
                  className="fs-caption text-mist-600"
                >
                  <span className="num font-bold text-ink-900">
                    {num(filtered.length)}
                  </span>{" "}
                  {t.common.results}
                </p>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPanelOpen(true)}
                    aria-expanded={panelOpen}
                    aria-haspopup="dialog"
                    className="hover-rule flex h-11 items-center gap-2 rounded-ctrl border border-hairline-strong px-3.5 fs-caption font-semibold text-ink-900 hover:border-ink-900 lg:hidden"
                  >
                    <HiOutlineAdjustmentsHorizontal
                      aria-hidden
                      className="h-4 w-4"
                    />
                    {t.common.filters}
                    {activeCount > 0 ? (
                      <span className="num grid h-5 min-w-5 place-items-center rounded-chip bg-aqua-700 px-1 fs-micro font-semibold text-white">
                        {num(activeCount)}
                      </span>
                    ) : null}
                  </button>

                  <label className="flex items-center gap-2.5 fs-caption font-semibold text-mist-600">
                    <span className="hidden sm:inline">{t.common.sortBy}</span>
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value as Sort)}
                      aria-label={t.common.sortBy}
                      className="select-pill hover-rule h-11 cursor-pointer rounded-ctrl border border-hairline-strong bg-page px-3.5 fs-caption font-semibold text-ink-900 hover:border-ink-900 focus:border-aqua-600"
                    >
                      <option value="featured">{t.common.sortFeatured}</option>
                      <option value="asc">{t.common.sortPriceAsc}</option>
                      <option value="desc">{t.common.sortPriceDesc}</option>
                      <option value="new">{t.common.sortNewest}</option>
                    </select>
                  </label>
                </div>
              </div>

              {/* Active constraints — each one individually removable */}
              {activeCount > 0 ? (
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="eyebrow text-mist-600">
                    {t.common.filters}
                  </span>
                  <ul className="flex flex-wrap items-center gap-2">
                    {activeFilters.map((f) => (
                      <li
                        key={f.key}
                        className="inline-flex items-center gap-1 rounded-chip border border-hairline bg-page py-1 pe-1 ps-3 fs-micro font-semibold text-ink-900"
                      >
                        {f.label}
                        <button
                          type="button"
                          onClick={f.clear}
                          aria-label={t.common.remove}
                          className="tap-target hover-rule grid h-6 w-6 place-items-center rounded-chip text-mist-600 hover:bg-mist-100 hover:text-ink-900"
                        >
                          <HiXMark aria-hidden className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={reset}
                    className="link-underline tap-target fs-micro font-semibold text-aqua-700"
                  >
                    {t.common.resetFilters}
                  </button>
                </div>
              ) : null}

              <h2 className="sr-only">{t.nav.shop}</h2>

              {filtered.length === 0 ? (
                /* Recovery, not an apology: a route to a custom spec. */
                <div className="rounded-card border border-hairline bg-page px-6 py-14 text-center sm:px-10 sm:py-20">
                  <p className="fs-h3 font-semibold text-ink-900">
                    {t.common.noResults}
                  </p>
                  <p className="fs-body mx-auto mt-4 max-w-[54ch] text-mist-600">
                    {t.products.customBody}
                  </p>
                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button variant="outline" size="md" onClick={reset}>
                      {t.common.resetFilters}
                    </Button>
                    <ButtonLink
                      href={href("/contact")}
                      variant="primary"
                      size="md"
                    >
                      {t.products.customCta}
                      <HiArrowUpRight aria-hidden className="h-4 w-4 flip-rtl" />
                    </ButtonLink>
                  </div>
                </div>
              ) : (
                <RevealGroup
                  variant="fade"
                  className="grid grid-gutter sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                >
                  {filtered.map((p) => (
                    <div key={p.id} className="h-full">
                      <ProductCard product={p} />
                    </div>
                  ))}
                </RevealGroup>
              )}
            </div>
          </div>
        </Container>
        </Chapter>
      ) : (
        <ShopLanding onCategorySelect={openCategory} />
      )}

      {/* ═══ Mobile filter sheet ═══ */}
      <div
        className={`fixed inset-0 z-[var(--z-scrim)] lg:hidden ${
          panelOpen ? "" : "pointer-events-none"
        }`}
        aria-hidden={!panelOpen}
        inert={!panelOpen}
      >
        <div
          onClick={() => setPanelOpen(false)}
          className={`absolute inset-0 bg-ink-950/60 backdrop-blur-[2px] transition-opacity duration-300 ${
            panelOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="shop-filter-title"
          className={`pb-safe absolute inset-x-0 bottom-0 z-[var(--z-drawer)] flex max-h-[86dvh] flex-col rounded-t-panel bg-page shadow-e3 transition-transform duration-400 ease-out-expo ${
            panelOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="shrink-0 px-5 pt-3">
            <span
              aria-hidden
              className="mx-auto mb-4 block h-1 w-10 rounded-chip bg-hairline-strong"
            />
            <div className="flex items-center justify-between gap-4 border-b border-hairline pb-4">
              <h2
                id="shop-filter-title"
                className="fs-h4 font-semibold text-ink-900"
              >
                {t.common.filters}
              </h2>
              <button
                ref={sheetCloseRef}
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label={t.common.close}
                className="tap-target hover-rule grid h-10 w-10 place-items-center rounded-ctrl text-mist-600 hover:bg-mist-100 hover:text-ink-900"
              >
                <HiXMark aria-hidden className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="scroll-pane min-h-0 flex-1 overflow-y-auto px-5 py-6">
            {filterPanel}
          </div>

          <div className="shrink-0 border-t border-hairline px-5 pt-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => setPanelOpen(false)}
            >
              <span>
                {t.common.viewAll} ·{" "}
                <span className="num">{num(filtered.length)}</span>{" "}
                {t.common.results}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

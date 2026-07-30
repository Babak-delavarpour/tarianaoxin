"use client";

import { useEffect, useMemo, useState } from "react";
import {
  HiMagnifyingGlass,
  HiOutlineAdjustmentsHorizontal,
  HiXMark,
  HiOutlineFaceFrown,
} from "react-icons/hi2";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "./ProductCard";
import {
  categories,
  products,
  priceBounds,
  type Badge,
  type CategoryId,
} from "@/lib/catalog";
import { useI18n } from "@/i18n/I18nProvider";

type Sort = "featured" | "asc" | "desc" | "new";

export function ShopView() {
  const { t, locale, num, price } = useI18n();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [badges, setBadges] = useState<Badge[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [sort, setSort] = useState<Sort>("featured");
  const [panelOpen, setPanelOpen] = useState(false);

  // The filter sheet covers the viewport on phones, so the page behind it
  // must not scroll, and Escape has to dismiss it.
  useEffect(() => {
    if (!panelOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanelOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [panelOpen]);

  const toggleBadge = (b: Badge) =>
    setBadges((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b],
    );

  const reset = () => {
    setQuery("");
    setCategory("all");
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

  const activeCount =
    (category !== "all" ? 1 : 0) +
    badges.length +
    (inStockOnly ? 1 : 0) +
    (maxPrice < priceBounds.max ? 1 : 0) +
    (query ? 1 : 0);

  const filterPanel = (
    <div className="flex flex-col gap-8">
      {/* Categories */}
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-[0.7rem] font-bold tracking-[0.2em] text-ink-900 uppercase">
          {t.common.categories}
        </legend>
        <div className="flex flex-col gap-1">
          {(
            [{ id: "all" as const, label: t.common.allCategories, skus: products.length }] as {
              id: CategoryId | "all";
              label: string;
              skus: number;
            }[]
          )
            .concat(
              categories.map((c) => ({
                id: c.id,
                label: c.name[locale],
                skus: products.filter((p) => p.category === c.id).length,
              })),
            )
            .map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-start text-[0.87rem] font-semibold transition-all duration-300 ${
                  category === c.id
                    ? "brand-gradient text-white"
                    : "text-ink-700 hover:bg-ink-50"
                }`}
              >
                {c.label}
                <span
                  className={`num text-[0.72rem] ${
                    category === c.id ? "text-white/60" : "text-mist-400"
                  }`}
                >
                  {num(c.skus)}
                </span>
              </button>
            ))}
        </div>
      </fieldset>

      {/* Price */}
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-[0.7rem] font-bold tracking-[0.2em] text-ink-900 uppercase">
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
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-mist-200 accent-aqua-500"
        />
        <div className="flex items-center justify-between text-[0.8rem] font-semibold text-mist-500">
          <span className="num">{price(priceBounds.min)}</span>
          <span className="num text-brand-gradient font-extrabold">
            {price(maxPrice)}
          </span>
        </div>
      </fieldset>

      {/* Highlights */}
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-[0.7rem] font-bold tracking-[0.2em] text-ink-900 uppercase">
          {t.shop.badges}
        </legend>
        <div className="flex flex-wrap gap-2">
          {(["bestseller", "new", "eco"] as Badge[]).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => toggleBadge(b)}
              aria-pressed={badges.includes(b)}
              className={`rounded-full border px-3.5 py-2 text-[0.78rem] font-bold transition-all duration-300 ${
                badges.includes(b)
                  ? "border-transparent brand-gradient text-white"
                  : "border-mist-200 text-ink-600 hover:border-aqua-300 hover:text-aqua-700"
              }`}
            >
              {t.common[b]}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Availability */}
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-[0.7rem] font-bold tracking-[0.2em] text-ink-900 uppercase">
          {t.shop.availability}
        </legend>
        <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-mist-200 px-3.5 py-3 text-[0.87rem] font-semibold text-ink-700 transition-colors hover:border-aqua-300">
          {t.common.inStock}
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 accent-aqua-500"
          />
        </label>
      </fieldset>

      {activeCount > 0 ? (
        <Button variant="soft" size="md" onClick={reset} className="w-full">
          <HiXMark className="h-4 w-4" />
          {t.common.resetFilters}
        </Button>
      ) : null}
    </div>
  );

  return (
    <>
      <PageHero
        eyebrow={t.shop.hero.eyebrow}
        title={t.shop.hero.title}
        subtitle={t.shop.hero.subtitle}
        crumb={t.nav.shop}
      >
        <div className="relative mt-3 max-w-xl">
          <HiMagnifyingGlass className="pointer-events-none absolute start-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-100/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.common.searchPlaceholder}
            aria-label={t.common.search}
            className="h-14 w-full rounded-full border border-white/15 bg-white/8 ps-14 pe-5 text-[0.95rem] text-white placeholder:text-ink-100/35 backdrop-blur-md transition-colors focus:border-aqua-400 focus:bg-white/12 focus:outline-none"
          />
        </div>
      </PageHero>

      <section className="mesh-light relative section-y-tight">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-12">
            {/* Desktop filters */}
            <aside className="hidden lg:block">
              <div className="scroll-pane sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-[1.75rem] border border-mist-200 bg-white p-6 shadow-[var(--shadow-card)]">
                {filterPanel}
              </div>
            </aside>

            <div className="flex flex-col gap-6">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-mist-200 bg-white px-5 py-4">
                <p className="text-[0.88rem] font-semibold text-mist-600">
                  <span className="num text-ink-900">{num(filtered.length)}</span>{" "}
                  {t.common.results}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPanelOpen(true)}
                    className="flex h-10 items-center gap-2 rounded-full border border-mist-200 px-4 text-[0.83rem] font-bold text-ink-700 transition-colors hover:border-aqua-300 hover:text-aqua-700 lg:hidden"
                  >
                    <HiOutlineAdjustmentsHorizontal className="h-4 w-4" />
                    {t.common.filters}
                    {activeCount > 0 ? (
                      <span className="num flex h-5 min-w-5 items-center justify-center rounded-full bg-aqua-500 px-1 text-[0.66rem] text-white">
                        {num(activeCount)}
                      </span>
                    ) : null}
                  </button>

                  <label className="flex items-center gap-2 text-[0.83rem] font-semibold text-mist-500">
                    <span className="hidden sm:inline">{t.common.sortBy}</span>
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value as Sort)}
                      className="select-pill h-10 cursor-pointer rounded-full border border-mist-200 bg-white px-4 text-[0.83rem] font-bold text-ink-800 transition-colors hover:border-aqua-300 focus:outline-none"
                    >
                      <option value="featured">{t.common.sortFeatured}</option>
                      <option value="asc">{t.common.sortPriceAsc}</option>
                      <option value="desc">{t.common.sortPriceDesc}</option>
                      <option value="new">{t.common.sortNewest}</option>
                    </select>
                  </label>
                </div>
              </div>

              {/* Grid */}
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center gap-4 rounded-[1.75rem] border border-dashed border-mist-300 bg-white/60 px-8 py-20 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-3xl bg-ink-50 text-ink-300">
                    <HiOutlineFaceFrown className="h-8 w-8" />
                  </span>
                  <p className="text-[1rem] font-bold text-ink-900">
                    {t.common.noResults}
                  </p>
                  <Button variant="outline" onClick={reset}>
                    {t.common.resetFilters}
                  </Button>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((p, i) => (
                    <Reveal key={p.id} delay={Math.min(i, 8) * 60}>
                      <ProductCard product={p} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Mobile filter sheet */}
      <div
        className={`fixed inset-0 z-[55] lg:hidden ${
          panelOpen ? "" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setPanelOpen(false)}
          className={`absolute inset-0 bg-ink-950/50 backdrop-blur-sm transition-opacity duration-400 ${
            panelOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`scroll-pane pb-safe absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-[2rem] bg-white p-6 shadow-[0_-20px_60px_rgba(8,36,59,0.3)] transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] ${
            panelOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* grab handle — signals the sheet is dismissible */}
          <span
            aria-hidden
            className="mx-auto mb-5 block h-1 w-10 rounded-full bg-mist-300"
          />
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[1.1rem] font-extrabold text-ink-900">
              {t.common.filters}
            </h2>
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              aria-label={t.common.close}
              className="flex h-9 w-9 items-center justify-center rounded-full text-mist-500 hover:bg-ink-50"
            >
              <HiXMark className="h-5 w-5" />
            </button>
          </div>
          {filterPanel}
        </div>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  HiArrowUpRight,
  HiMagnifyingGlass,
  HiXMark,
} from "react-icons/hi2";
import { ProductArt } from "@/components/brand/ProductArt";
import { categories, products } from "@/lib/catalog";
import { useI18n } from "@/i18n/I18nProvider";

type SearchOption = {
  key: string;
  href: string;
};

export function CatalogSearch() {
  const { t, locale, href, num, price } = useI18n();
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const normalized = query.trim().toLocaleLowerCase();
  const categoryMatches = useMemo(
    () =>
      categories.filter((category) => {
        if (!normalized) return true;
        return `${category.name[locale]} ${category.blurb[locale]}`
          .toLocaleLowerCase()
          .includes(normalized);
      }),
    [locale, normalized],
  );
  const productMatches = useMemo(() => {
    const matches = products.filter((product) => {
      if (!normalized) return product.featured;
      return `${product.name[locale]} ${product.blurb[locale]} ${product.sku}`
        .toLocaleLowerCase()
        .includes(normalized);
    });
    return matches.slice(0, normalized ? 6 : 4);
  }, [locale, normalized]);

  const options = useMemo<SearchOption[]>(
    () => [
      ...categoryMatches.map((category) => ({
        key: `category-${category.id}`,
        href: href(`/shop?cat=${category.id}`),
      })),
      ...productMatches.map((product) => ({
        key: `product-${product.id}`,
        href: href(`/shop/${product.slug}`),
      })),
    ],
    [categoryMatches, productMatches, href],
  );

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => setActiveIndex(-1), [query]);

  const optionIndex = (key: string) =>
    options.findIndex((option) => option.key === key);
  const optionId = (index: number) => `catalog-search-option-${index}`;

  useEffect(() => {
    if (!open || activeIndex < 0) return;
    document
      .getElementById(optionId(activeIndex))
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const goToOption = (index: number) => {
    const option = options[index];
    if (!option) return;
    setOpen(false);
    router.push(option.href);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (!options.length) return;
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => {
        const delta = event.key === "ArrowDown" ? 1 : -1;
        return (current + delta + options.length) % options.length;
      });
      return;
    }
    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      goToOption(activeIndex);
    }
  };

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    setOpen(false);
    router.push(value ? `${href("/shop")}?q=${encodeURIComponent(value)}` : href("/shop"));
  };

  const hasMatches = categoryMatches.length > 0 || productMatches.length > 0;

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-2xl">
      <form role="search" onSubmit={submitSearch}>
        <label htmlFor="catalog-search" className="sr-only">
          {t.common.search}
        </label>
        <div className="relative flex h-14 items-center overflow-hidden rounded-card bg-inverse-2 shadow-e2 ring-1 ring-white/15 transition-shadow duration-200 focus-within:shadow-e3">
          <HiMagnifyingGlass
            aria-hidden
            className="pointer-events-none absolute start-4 h-5 w-5 text-aqua-300"
          />
          <input
            ref={inputRef}
            id="catalog-search"
            type="text"
            inputMode="search"
            autoComplete="off"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder={t.common.search}
            role="combobox"
            aria-expanded={open}
            aria-controls="catalog-search-results"
            aria-autocomplete="list"
            aria-activedescendant={
              open && activeIndex >= 0 ? optionId(activeIndex) : undefined
            }
            className="h-full min-w-0 flex-1 border-0 bg-transparent ps-12 pe-4 fs-body text-white caret-aqua-300 placeholder:text-onink-300 focus-visible:outline-none"
          />

          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setOpen(true);
                inputRef.current?.focus();
              }}
              aria-label={`${t.common.close} ${t.common.search}`}
              className="hover-rule me-1 grid h-10 w-10 shrink-0 place-items-center rounded-ctrl text-onink-200 hover:bg-white/10 hover:text-white focus-visible:outline-offset-[-2px]"
            >
              <HiXMark aria-hidden className="h-4.5 w-4.5" />
            </button>
          ) : null}

        </div>
      </form>

      {open ? (
        <div
          className="absolute inset-x-0 top-[calc(100%+0.65rem)] max-h-[min(34rem,calc(100dvh-var(--nav-h)-6rem))] overflow-y-auto overscroll-contain rounded-panel border border-hairline bg-page p-2.5 text-start shadow-e3 z-[var(--z-popover)]"
        >
          {hasMatches ? (
            <>
              <div
                id="catalog-search-results"
                role="listbox"
                aria-label={t.common.search}
              >
                {categoryMatches.length ? (
                  <div
                    role="group"
                    aria-labelledby="catalog-category-results"
                    className="pb-2"
                  >
                    <div
                      id="catalog-category-results"
                      className="flex items-center justify-between gap-4 px-2.5 py-2"
                    >
                      <span className="eyebrow text-mist-600">
                        {t.common.categories}
                      </span>
                      <span className="num fs-micro font-semibold text-mist-600">
                        {num(categoryMatches.length)}
                      </span>
                    </div>
                    <div className="grid gap-1 sm:grid-cols-2">
                      {categoryMatches.map((category) => {
                        const key = `category-${category.id}`;
                        const index = optionIndex(key);
                        const selected = index === activeIndex;
                        const count = products.filter(
                          (product) => product.category === category.id,
                        ).length;

                        return (
                          <Link
                            key={category.id}
                            id={optionId(index)}
                            role="option"
                            aria-selected={selected}
                            href={href(`/shop?cat=${category.id}`)}
                            onClick={() => setOpen(false)}
                            onPointerEnter={() => setActiveIndex(index)}
                            className={`hover-rule group flex min-w-0 items-center gap-3 rounded-card p-2.5 focus-visible:outline-offset-[-2px] ${
                              selected
                                ? "bg-aqua-50 text-aqua-800"
                                : "text-ink-900 hover:bg-mist-100"
                            }`}
                          >
                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-tile bg-sunken">
                              <ProductArt
                                art={category.art}
                                className="h-9 w-9"
                              />
                            </span>
                            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                              <span className="fs-caption truncate font-semibold">
                                {category.name[locale]}
                              </span>
                              <span className="fs-micro text-mist-600">
                                <span className="num">{num(count)}</span>{" "}
                                {t.common.results}
                              </span>
                            </span>
                            <HiArrowUpRight
                              aria-hidden
                              className="h-3.5 w-3.5 shrink-0 text-aqua-700 flip-rtl"
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {productMatches.length ? (
                  <div
                    role="group"
                    aria-labelledby="catalog-product-results"
                    className="border-t border-hairline pt-2"
                  >
                    <div
                      id="catalog-product-results"
                      className="flex items-center justify-between gap-4 px-2.5 py-2"
                    >
                      <span className="eyebrow text-mist-600">
                        {t.nav.products}
                      </span>
                      <span className="num fs-micro font-semibold text-mist-600">
                        {num(productMatches.length)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      {productMatches.map((product) => {
                        const key = `product-${product.id}`;
                        const index = optionIndex(key);
                        const selected = index === activeIndex;

                        return (
                          <Link
                            key={product.id}
                            id={optionId(index)}
                            role="option"
                            aria-selected={selected}
                            href={href(`/shop/${product.slug}`)}
                            onClick={() => setOpen(false)}
                            onPointerEnter={() => setActiveIndex(index)}
                            className={`hover-rule grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-3 rounded-card p-2.5 focus-visible:outline-offset-[-2px] ${
                              selected
                                ? "bg-aqua-50"
                                : "hover:bg-mist-100"
                            }`}
                          >
                            <span className="grid h-11 w-11 place-items-center rounded-tile border border-hairline bg-page">
                              <ProductArt
                                art={product.art}
                                className="h-9 w-9"
                              />
                            </span>
                            <span className="flex min-w-0 flex-col gap-0.5">
                              <span className="fs-caption truncate font-semibold text-ink-900">
                                {product.name[locale]}
                              </span>
                              <span className="num fs-micro truncate text-mist-600">
                                {product.sku}
                              </span>
                            </span>
                            <span className="num fs-price-compact font-semibold text-ink-900">
                              {price(product.price)}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  router.push(
                    normalized
                      ? `${href("/shop")}?q=${encodeURIComponent(query.trim())}`
                      : href("/shop"),
                  );
                }}
                className="hover-rule fs-caption mt-2 flex min-h-11 w-full items-center justify-between gap-3 rounded-card bg-ink-900 px-4 py-3 font-semibold text-white hover:bg-aqua-700 focus-visible:outline-offset-[-2px]"
              >
                {normalized
                  ? `${t.common.search}: “${query.trim()}”`
                  : t.common.exploreProducts}
                <HiArrowUpRight
                  aria-hidden
                  className="h-4 w-4 shrink-0 flip-rtl"
                />
              </button>
            </>
          ) : (
            <div
              id="catalog-search-results"
              role="listbox"
              aria-label={t.common.search}
              className="flex flex-col items-center gap-3 px-5 py-10 text-center"
            >
              <span className="grid h-12 w-12 place-items-center rounded-tile bg-sunken text-mist-600">
                <HiMagnifyingGlass aria-hidden className="h-5 w-5" />
              </span>
              <p className="fs-caption max-w-[34ch] text-mist-600">
                {t.common.noResults}
              </p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

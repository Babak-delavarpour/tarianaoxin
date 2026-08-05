"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiOutlineShoppingBag, HiCheck } from "react-icons/hi2";
import type { Product } from "@/lib/catalog";
import { ProductArt } from "@/components/brand/ProductArt";
import { useI18n } from "@/i18n/I18nProvider";
import { useCart } from "./CartProvider";

/**
 * CARD/COMMERCE — the only elevated card in the system (§4.2).
 * No border, `shadow-e2` at rest, `shadow-e3` + 4px lift on hover via `.lift`.
 *
 * One hierarchy, top to bottom: media → name → price → action.
 * SKU, stock, blurb and the B2B ledger are the supporting tier. The star
 * rating is gone: a purchasing manager buys on pack size, MOQ and price.
 *
 * Rendered at three very different widths — the home rail (~282–372px),
 * the shop grid (~190–320px) and the related rail — so every row either
 * wraps or clamps rather than truncating.
 */

/** Badges are solid marks. Never a gradient, never tracked-uppercase. */
const badgeStyles: Record<string, string> = {
  new: "bg-aqua-700 text-white",
  bestseller: "bg-ink-900 text-white",
  eco: "bg-leaf-700 text-white",
};

export function ProductCard({ product }: { product: Product }) {
  const { t, locale, href, num, price } = useI18n();
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const soldOut = product.stock === "out";
  const productHref = href(`/shop/${product.slug}`);

  const stockLabel = soldOut
    ? t.common.outOfStock
    : product.stock === "low"
      ? t.common.lowStock
      : t.common.inStock;

  const stockTone = soldOut
    ? "bg-mist-100 text-mist-600"
    : product.stock === "low"
      ? "bg-sand-300/35 text-sand-700"
      : "bg-leaf-700/12 text-leaf-700";

  const onAdd = () => {
    if (soldOut) return;
    add(product.id, 1);
    setJustAdded(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setJustAdded(false), 1600);
  };

  const off = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0;

  return (
    <article className="lift group flex h-full flex-col overflow-hidden rounded-card bg-raised shadow-e2">
      {/* ── Media plate ─────────────────────────────────────────
          The title link below carries the accessible name, so this
          duplicate target is removed from the a11y tree instead of
          announcing the same destination twice. */}
      <Link
        href={productHref}
        tabIndex={-1}
        aria-hidden
        className="relative block border-b border-hairline bg-sunken"
      >
        <div
          aria-hidden
          className="grid-lines-ink pointer-events-none absolute inset-0"
        />
        <div
          aria-hidden
          className="tick-rule pointer-events-none absolute inset-x-0 top-0 h-3.5"
        />

        <div className="relative grid aspect-[5/4] place-items-center p-6">
          <ProductArt art={product.art} className="h-full max-h-36 w-auto" />
        </div>

        {product.badges.length ? (
          <div className="absolute start-4 top-5 flex flex-col items-start gap-1.5">
            {product.badges.map((b) => (
              <span
                key={b}
                className={`rounded-chip px-2.5 py-1 fs-micro font-semibold ${badgeStyles[b]}`}
              >
                {t.common[b]}
              </span>
            ))}
          </div>
        ) : null}

        {product.compareAt ? (
          <span className="absolute end-4 top-5 rounded-chip bg-sand-700 px-2.5 py-1 fs-micro font-semibold text-white">
            <span className="num">{`−${num(off)}%`}</span>
          </span>
        ) : null}
      </Link>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-5">
        {/* supporting tier */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <span className="num fs-micro font-semibold text-mist-600">
            {product.sku}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-chip px-2.5 py-1 fs-micro font-semibold ${stockTone}`}
          >
            <span
              aria-hidden
              className={`h-1.5 w-1.5 rounded-chip ${
                soldOut
                  ? "bg-mist-400"
                  : product.stock === "low"
                    ? "bg-sand-700"
                    : "bg-leaf-700"
              }`}
            />
            {stockLabel}
          </span>
        </div>

        {/* primary tier */}
        <h3 className="fs-h4 mt-3 font-semibold text-ink-900">
          <Link href={productHref} className="hover-rule hover:text-aqua-700">
            {product.name[locale]}
          </Link>
        </h3>

        <p className="fs-caption mt-2 line-clamp-2 text-mist-600">
          {product.blurb[locale]}
        </p>

        {/* B2B ledger — replaces the star rating.
            flex-wrap lets a long pack string drop to its own line
            instead of truncating in a 190px column. */}
        <dl className="mt-4 grid gap-2 border-t border-hairline pt-3.5">
          {[
            { label: t.common.packSize, value: product.packSize[locale] },
            { label: t.common.moq, value: product.moq[locale] },
          ].map((row) => (
            <div
              key={row.label}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5"
            >
              <dt className="fs-micro font-semibold text-mist-600">
                {row.label}
              </dt>
              <dd className="fs-micro font-semibold text-ink-800">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* price → action */}
        <div className="mt-auto border-t border-hairline pt-4">
          <span className="eyebrow block text-mist-600">{t.common.perPack}</span>
          <span className="mt-1.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <span className="num fs-h3 font-bold text-ink-900">
              {price(product.price)}
            </span>
            {product.compareAt ? (
              <s className="num fs-caption text-mist-550 line-through">
                {price(product.compareAt)}
              </s>
            ) : null}
          </span>

          <button
            type="button"
            onClick={onAdd}
            disabled={soldOut}
            className={`press mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-ctrl fs-caption font-semibold text-white transition-[background-color,color,transform] duration-300 ease-out-expo disabled:cursor-not-allowed disabled:bg-mist-100 disabled:text-mist-600 ${
              justAdded ? "bg-leaf-700" : "bg-ink-900 hover:bg-ink-800"
            }`}
          >
            {justAdded ? (
              <HiCheck aria-hidden className="h-4 w-4" />
            ) : (
              <HiOutlineShoppingBag aria-hidden className="h-4 w-4" />
            )}
            {justAdded ? t.common.added : t.common.addToCart}
          </button>

          <span role="status" aria-live="polite" className="sr-only">
            {justAdded ? `${product.name[locale]} — ${t.common.added}` : ""}
          </span>
        </div>
      </div>
    </article>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { HiOutlineShoppingBag, HiCheck, HiStar } from "react-icons/hi2";
import type { Product } from "@/lib/catalog";
import { ProductArt } from "@/components/brand/ProductArt";
import { useI18n } from "@/i18n/I18nProvider";
import { useCart } from "./CartProvider";

const badgeStyles: Record<string, string> = {
  new: "bg-aqua-500 text-white",
  bestseller: "bg-ink-900 text-white",
  eco: "bg-leaf-600 text-white",
};

export function ProductCard({ product }: { product: Product }) {
  const { t, locale, href, num, price } = useI18n();
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const soldOut = product.stock === "out";

  const onAdd = () => {
    if (soldOut) return;
    add(product.id, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <article className="lift group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-mist-200 bg-white shadow-[var(--shadow-card)] hover:border-aqua-200">
      {/* Media */}
      <Link
        href={href(`/shop/${product.slug}`)}
        className="relative block overflow-hidden bg-gradient-to-br from-mist-50 via-white to-aqua-50/60 p-6"
      >
        <div className="grid-lines-ink pointer-events-none absolute inset-0 opacity-70" />
        <div
          aria-hidden
          className="pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full bg-aqua-300/25 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-aqua-300/40"
        />
        <ProductArt
          art={product.art}
          className="relative mx-auto h-40 w-40 transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:scale-[1.07]"
        />

        <div className="absolute start-4 top-4 flex flex-col gap-1.5">
          {product.badges.map((b) => (
            <span
              key={b}
              className={`rounded-full px-2.5 py-1 text-[0.62rem] font-bold tracking-[0.1em] uppercase ${badgeStyles[b]}`}
            >
              {t.common[b]}
            </span>
          ))}
        </div>

        {product.compareAt ? (
          <span className="absolute end-4 top-4 rounded-full bg-sand-500 px-2.5 py-1 text-[0.62rem] font-bold text-white">
            −
            <span className="num">
              {num(Math.round((1 - product.price / product.compareAt) * 100))}
            </span>
            %
          </span>
        ) : null}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5 pt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="num text-[0.66rem] font-bold tracking-[0.14em] text-mist-400 uppercase">
            {product.sku}
          </span>
          <span className="flex items-center gap-1 text-[0.72rem] font-bold text-ink-700">
            <HiStar className="h-3.5 w-3.5 text-sand-500" />
            <span className="num">{num(product.rating)}</span>
            <span className="font-medium text-mist-400">
              (<span className="num">{num(product.reviews)}</span>)
            </span>
          </span>
        </div>

        <Link href={href(`/shop/${product.slug}`)}>
          <h3 className="text-[1.02rem] leading-snug font-extrabold text-ink-900 transition-colors group-hover:text-aqua-700">
            {product.name[locale]}
          </h3>
        </Link>

        <p className="line-clamp-2 text-[0.84rem] leading-relaxed text-mist-500">
          {product.blurb[locale]}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-2 text-[0.72rem] font-semibold">
          <span
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 ${
              soldOut
                ? "bg-mist-100 text-mist-500"
                : product.stock === "low"
                  ? "bg-sand-300/40 text-sand-500"
                  : "bg-leaf-400/15 text-leaf-600"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                soldOut
                  ? "bg-mist-400"
                  : product.stock === "low"
                    ? "bg-sand-500"
                    : "bg-leaf-400"
              }`}
            />
            {soldOut
              ? t.common.outOfStock
              : product.stock === "low"
                ? t.common.lowStock
                : t.common.inStock}
          </span>
        </div>

        <div className="flex items-end justify-between gap-3 border-t border-mist-100 pt-4">
          <div className="flex flex-col">
            <span className="text-[0.66rem] font-semibold tracking-wide text-mist-400 uppercase">
              {t.common.perPack}
            </span>
            <span className="flex items-baseline gap-2">
              <span className="num text-[1.22rem] font-extrabold text-ink-900">
                {price(product.price)}
              </span>
              {product.compareAt ? (
                <span className="num text-[0.8rem] font-medium text-mist-400 line-through">
                  {price(product.compareAt)}
                </span>
              ) : null}
            </span>
          </div>

          <button
            type="button"
            onClick={onAdd}
            disabled={soldOut}
            aria-label={t.common.addToCart}
            className={`sheen flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white transition-all duration-400 disabled:cursor-not-allowed disabled:bg-mist-200 disabled:text-mist-400 ${
              justAdded ? "bg-leaf-600" : "brand-gradient hover:scale-105"
            }`}
          >
            {justAdded ? (
              <HiCheck className="h-5 w-5" />
            ) : (
              <HiOutlineShoppingBag className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import {
  HiChevronRight,
  HiStar,
  HiMinus,
  HiPlus,
  HiOutlineShoppingBag,
  HiCheck,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineArrowPath,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProductArt } from "@/components/brand/ProductArt";
import { ProductCard } from "./ProductCard";
import { useCart } from "./CartProvider";
import { useI18n } from "@/i18n/I18nProvider";
import { getProduct, getCategory, relatedProducts } from "@/lib/catalog";

const badgeStyles: Record<string, string> = {
  new: "bg-aqua-500 text-white",
  bestseller: "bg-ink-900 text-white",
  eco: "bg-leaf-600 text-white",
};

export function ProductView({ slug }: { slug: string }) {
  const { t, locale, href, num, price } = useI18n();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = getProduct(slug);
  if (!product) return null;

  const category = getCategory(product.category);
  const related = relatedProducts(product, 4);
  const soldOut = product.stock === "out";

  const specs = [
    { label: t.common.sku, value: product.sku, ltr: true },
    { label: t.common.material, value: product.material[locale] },
    { label: t.common.capacity, value: product.capacity[locale] },
    { label: t.common.packSize, value: product.packSize[locale] },
    { label: t.common.moq, value: product.moq[locale] },
  ];

  const onAdd = () => {
    if (soldOut) return;
    add(product.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <section className="mesh-light relative pt-[clamp(7rem,12vw,10rem)] pb-[clamp(3.5rem,6vw,6rem)]">
        <Container>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-[0.78rem] font-semibold text-mist-500"
          >
            <Link href={href("/")} className="transition-colors hover:text-aqua-700">
              {t.nav.home}
            </Link>
            <HiChevronRight className="h-3.5 w-3.5 flip-rtl" />
            <Link href={href("/shop")} className="transition-colors hover:text-aqua-700">
              {t.nav.shop}
            </Link>
            <HiChevronRight className="h-3.5 w-3.5 flip-rtl" />
            <span className="text-ink-900">{product.name[locale]}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* ── Gallery ─────────────────────────────────── */}
            <Reveal>
              <div className="flex flex-col gap-4">
                <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-mist-200 bg-white shadow-[var(--shadow-card)]">
                  <div className="grid-lines-ink pointer-events-none absolute inset-0" />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -end-20 -top-20 h-72 w-72 rounded-full bg-aqua-300/25 blur-3xl"
                  />
                  <div className="absolute inset-0 grid place-items-center p-10">
                    <ProductArt
                      art={product.art}
                      className="animate-float h-full w-full max-w-[22rem]"
                    />
                  </div>

                  <div className="absolute start-6 top-6 flex flex-col gap-2">
                    {product.badges.map((b) => (
                      <span
                        key={b}
                        className={`rounded-full px-3 py-1.5 text-[0.66rem] font-bold tracking-[0.1em] uppercase ${badgeStyles[b]}`}
                      >
                        {t.common[b]}
                      </span>
                    ))}
                  </div>
                </div>

                {/* trust strip */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { Icon: HiOutlineTruck, label: t.home.marquee[2] },
                    { Icon: HiOutlineShieldCheck, label: t.home.marquee[0] },
                    { Icon: HiOutlineArrowPath, label: t.home.marquee[5] },
                  ].map(({ Icon, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-2 rounded-2xl border border-mist-200 bg-white/70 p-4 text-center backdrop-blur-sm"
                    >
                      <Icon className="h-5 w-5 text-aqua-600" />
                      <span className="text-[0.72rem] leading-snug font-semibold text-mist-600">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ── Buy box ─────────────────────────────────── */}
            <div className="flex flex-col gap-6">
              <Reveal delay={80}>
                <div className="flex flex-col gap-4">
                  {category ? (
                    <Link
                      href={href(`/products#${category.slug}`)}
                      className="link-underline w-fit text-[0.78rem] font-bold tracking-[0.16em] text-aqua-700 uppercase"
                    >
                      {category.name[locale]}
                    </Link>
                  ) : null}

                  <h1 className="fs-h2 font-extrabold text-ink-900">
                    {product.name[locale]}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <HiStar
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.round(product.rating)
                                ? "text-sand-500"
                                : "text-mist-300"
                            }`}
                          />
                        ))}
                      </span>
                      <span className="num text-[0.86rem] font-bold text-ink-800">
                        {num(product.rating)}
                      </span>
                      <span className="num text-[0.8rem] text-mist-400">
                        ({num(product.reviews)})
                      </span>
                    </span>

                    <span
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.75rem] font-bold ${
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

                  <p className="text-[1rem] leading-relaxed text-mist-600">
                    {product.description[locale]}
                  </p>
                </div>
              </Reveal>

              {/* Price + add */}
              <Reveal delay={140}>
                <div className="ring-gradient flex flex-col gap-5 rounded-[1.75rem] border border-mist-200 bg-white p-6 shadow-[var(--shadow-card)]">
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[0.7rem] font-bold tracking-[0.16em] text-mist-400 uppercase">
                        {t.common.perPack}
                      </span>
                      <span className="flex items-baseline gap-3">
                        <span className="num text-brand-gradient text-[2.1rem] leading-none font-extrabold">
                          {price(product.price)}
                        </span>
                        {product.compareAt ? (
                          <span className="num text-[1rem] font-medium text-mist-400 line-through">
                            {price(product.compareAt)}
                          </span>
                        ) : null}
                      </span>
                    </div>

                    <div className="flex items-center rounded-full border border-mist-200 bg-mist-50">
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        aria-label="-"
                        className="flex h-11 w-11 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-white"
                      >
                        <HiMinus className="h-4 w-4" />
                      </button>
                      <span className="num w-10 text-center text-[1rem] font-extrabold text-ink-900">
                        {num(qty)}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.min(99, q + 1))}
                        aria-label="+"
                        className="flex h-11 w-11 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-white"
                      >
                        <HiPlus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <button
                      type="button"
                      onClick={onAdd}
                      disabled={soldOut}
                      className={`sheen flex h-14 flex-1 items-center justify-center gap-2.5 rounded-full text-[0.95rem] font-bold text-white transition-all duration-400 disabled:cursor-not-allowed disabled:bg-mist-200 disabled:text-mist-400 ${
                        added
                          ? "bg-leaf-600"
                          : "brand-gradient hover:-translate-y-0.5"
                      }`}
                    >
                      {added ? (
                        <>
                          <HiCheck className="h-5 w-5" />
                          {t.common.added}
                        </>
                      ) : (
                        <>
                          <HiOutlineShoppingBag className="h-5 w-5" />
                          {t.common.addToCart}
                        </>
                      )}
                    </button>

                    <a
                      href={`https://wa.me/989160611093?text=${encodeURIComponent(
                        `${product.sku} — ${product.name[locale]}`,
                      )}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex h-14 items-center justify-center gap-2.5 rounded-full border border-mist-200 px-6 text-[0.9rem] font-bold text-ink-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-leaf-400 hover:text-leaf-600"
                    >
                      <FaWhatsapp className="h-5 w-5" />
                      <span className="hidden sm:inline">
                        {t.common.orderOnWhatsapp}
                      </span>
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Specs */}
              <Reveal delay={200}>
                <div className="flex flex-col gap-4">
                  <h2 className="text-[0.72rem] font-bold tracking-[0.22em] text-aqua-700 uppercase">
                    {t.common.specifications}
                  </h2>
                  <dl className="overflow-hidden rounded-2xl border border-mist-200 bg-white">
                    {specs.map((spec, i) => (
                      <div
                        key={spec.label}
                        className={`flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 ${
                          i % 2 === 0 ? "bg-white" : "bg-mist-50"
                        }`}
                      >
                        <dt className="text-[0.84rem] font-semibold text-mist-500">
                          {spec.label}
                        </dt>
                        <dd
                          className={`text-[0.87rem] font-bold text-ink-900 ${
                            spec.ltr ? "num" : ""
                          }`}
                        >
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Related ───────────────────────────────────────── */}
      <section className="relative bg-white section-y-tight">
        <div className="grid-lines-ink pointer-events-none absolute inset-0" />
        <Container className="relative">
          <Reveal>
            <h2 className="fs-h3 mb-10 font-extrabold text-ink-900">
              {t.common.relatedProducts}
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

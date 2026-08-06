"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  HiChevronRight,
  HiMinus,
  HiPlus,
  HiOutlineShoppingBag,
  HiCheck,
  HiOutlineTruck,
  HiArrowUpRight,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { Chapter, Container, Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProductArt } from "@/components/brand/ProductArt";
import { ProductCard } from "./ProductCard";
import { useCart } from "./CartProvider";
import { useI18n } from "@/i18n/I18nProvider";
import { getProduct, getCategory, relatedProducts } from "@/lib/catalog";

/** Solid marks, matching ProductCard. Never a gradient. */
const badgeStyles: Record<string, string> = {
  new: "bg-aqua-700 text-white",
  bestseller: "bg-ink-900 text-white",
  eco: "bg-leaf-700 text-white",
};

export function ProductView({ slug }: { slug: string }) {
  const { t, locale, href, num, price } = useI18n();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const product = getProduct(slug);
  if (!product) return null;

  const category = getCategory(product.category);
  const related = relatedProducts(product, 6);
  const soldOut = product.stock === "out";

  const specs = [
    { label: t.common.sku, value: product.sku, ltr: true },
    { label: t.common.material, value: product.material[locale] },
    { label: t.common.capacity, value: product.capacity[locale] },
    { label: t.common.packSize, value: product.packSize[locale] },
    { label: t.common.moq, value: product.moq[locale] },
  ];

  const stockLabel = soldOut
    ? t.common.outOfStock
    : product.stock === "low"
      ? t.common.lowStock
      : t.common.inStock;

  /* On ink, the light-ground stock palette collapses to ~2:1 — these are
     the on-dark equivalents, all ≥9:1 on ink-950. */
  const stockInk = soldOut
    ? "text-onink-300"
    : product.stock === "low"
      ? "text-sand-400"
      : "text-leaf-400";

  const off = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0;

  const onAdd = () => {
    if (soldOut) return;
    add(product.id, qty);
    setAdded(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      {/* ═══ INK MASTHEAD ═══════════════════════════════════════════ */}
      <section
        data-tone="ink"
        className="mesh-dark nav-clear relative isolate overflow-hidden pb-[clamp(2.5rem,5vw,4rem)]"
      >
        <div
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-0 opacity-60"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-56 end-[-8rem] h-[38rem] w-[38rem] rounded-chip bg-aqua-500/12 blur-[130px]"
        />
        <div
          aria-hidden
          className="grain-layer pointer-events-none absolute inset-0 opacity-[0.08]"
        />

        <Container className="relative">
          <nav
            aria-label={t.common.breadcrumb}
            className="eyebrow flex flex-wrap items-center gap-2.5 text-onink-300"
          >
            <Link href={href("/")} className="hover-rule hover:text-aqua-300">
              {t.nav.home}
            </Link>
            <HiChevronRight
              aria-hidden
              className="h-3 w-3 shrink-0 text-onink-400 flip-rtl"
            />
            <Link href={href("/shop")} className="hover-rule hover:text-aqua-300">
              {t.nav.shop}
            </Link>
            <HiChevronRight
              aria-hidden
              className="h-3 w-3 shrink-0 text-onink-400 flip-rtl"
            />
            <span aria-current="page" className="text-aqua-300">
              {product.name[locale]}
            </span>
          </nav>

          <div className="enter mt-8 flex flex-col gap-5">
            <h1 className="fs-h1 max-w-[20ch] font-bold text-white">
              {product.name[locale]}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="num fs-micro font-semibold text-onink-300">
                {product.sku}
              </span>
              <span
                className={`inline-flex items-center gap-2 fs-micro font-semibold ${stockInk}`}
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-chip bg-current"
                />
                {stockLabel}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ PAPER — the datasheet ══════════════════════════════════ */}
      <Chapter tone="paper" pad="base">
        <Container>
          <div className="grid items-start gap-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-[1.04fr_0.96fr]">
            {/* ── Gallery plate. Same contact-sheet language as the
                   hero, inverted for paper. No bobbing product. ── */}
            <Reveal className="flex flex-col gap-[clamp(1.25rem,2.4vw,2rem)]">
              <figure className="overflow-hidden rounded-panel border border-hairline bg-page">
                <div
                  aria-hidden
                  className="tick-rule h-4 w-full border-b border-hairline"
                />

                <div className="relative grid aspect-[4/3] place-items-center p-8 sm:p-12">
                  <div
                    aria-hidden
                    className="grid-lines-ink pointer-events-none absolute inset-0"
                  />
                  <ProductArt
                    art={product.art}
                    className="relative h-full max-h-[19rem] w-auto"
                  />

                  {product.badges.length ? (
                    <div className="absolute start-5 top-5 flex flex-col items-start gap-2">
                      {product.badges.map((b) => (
                        <span
                          key={b}
                          className={`rounded-chip px-3 py-1 fs-micro font-semibold ${badgeStyles[b]}`}
                        >
                          {t.common[b]}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {product.compareAt ? (
                    <span className="absolute end-5 top-5 rounded-chip bg-sand-700 px-3 py-1 fs-micro font-semibold text-white">
                      <span className="num">{`−${num(off)}%`}</span>
                    </span>
                  ) : null}
                </div>

                <figcaption className="flex items-center justify-between gap-4 border-t border-hairline px-5 py-3.5">
                  <span className="eyebrow text-mist-600">
                    {category ? category.name[locale] : t.nav.shop}
                  </span>
                  <span aria-hidden className="flex gap-1">
                    <i className="block h-1.5 w-1.5 rounded-chip bg-aqua-700" />
                    <i className="block h-1.5 w-1.5 rounded-chip bg-mist-300" />
                    <i className="block h-1.5 w-1.5 rounded-chip bg-mist-300" />
                  </span>
                </figcaption>
              </figure>

              {/* Credentials — the paperwork a buyer asks for */}
              <div>
                <Eyebrow>{t.home.quality.eyebrow}</Eyebrow>
                <div className="plate-rule mt-4 grid-cols-2 overflow-hidden rounded-card border border-hairline sm:grid-cols-4">
                  {t.home.quality.items.map((item) => (
                    <div key={item.code} className="bg-page px-4 py-4">
                      <span
                        dir="ltr"
                        className="num fs-caption font-bold text-ink-900"
                      >
                        {item.code}
                      </span>
                      <p className="fs-micro mt-1.5 text-mist-600">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ── Buy box — the one place on this page that decides ── */}
            <Reveal
              delay={90}
              className="lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]"
            >
              <div className="rounded-card border border-hairline bg-page p-6 shadow-e2 sm:p-7">
                <span className="eyebrow block text-mist-600">
                  {t.common.perPack}
                </span>
                <div className="mt-2.5 flex flex-wrap items-baseline gap-x-3.5 gap-y-2">
                  <span className="num fs-h2 font-bold text-ink-900">
                    {price(product.price)}
                  </span>
                  {product.compareAt ? (
                    <s className="num fs-lead text-mist-550 line-through">
                      {price(product.compareAt)}
                    </s>
                  ) : null}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6">
                  <span className="fs-caption font-semibold text-mist-600">
                    {t.common.quantity}
                  </span>
                  <div
                    role="group"
                    aria-label={t.common.quantity}
                    className="flex items-center rounded-ctrl border border-hairline-strong"
                  >
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label={`${t.common.quantity} −`}
                      className="hover-rule grid h-11 w-11 place-items-center rounded-s-ctrl text-ink-800 hover:bg-mist-100 hover:text-ink-900"
                    >
                      <HiMinus aria-hidden className="h-4 w-4" />
                    </button>
                    <span className="num w-12 text-center fs-body font-bold text-ink-900">
                      {num(qty)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.min(99, q + 1))}
                      aria-label={`${t.common.quantity} +`}
                      className="hover-rule grid h-11 w-11 place-items-center rounded-e-ctrl text-ink-800 hover:bg-mist-100 hover:text-ink-900"
                    >
                      <HiPlus aria-hidden className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="fs-caption font-semibold text-mist-600">
                    {t.common.subtotal}
                  </span>
                  <span className="num fs-h4 font-bold text-ink-900">
                    {price(product.price * qty)}
                  </span>
                </div>

                <div className="mt-6 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={onAdd}
                    disabled={soldOut}
                    className={`press flex h-14 w-full items-center justify-center gap-2.5 rounded-ctrl fs-body font-semibold text-white shadow-e2 transition-[background-color,box-shadow,transform,translate] duration-300 ease-out-expo disabled:cursor-not-allowed disabled:bg-mist-100 disabled:text-mist-600 disabled:shadow-none ${
                      added
                        ? "bg-leaf-700"
                        : "brand-gradient hover:-translate-y-px hover:shadow-e3"
                    }`}
                  >
                    {added ? (
                      <HiCheck aria-hidden className="h-5 w-5" />
                    ) : (
                      <HiOutlineShoppingBag aria-hidden className="h-5 w-5" />
                    )}
                    {added ? t.common.added : t.common.addToCart}
                  </button>

                  <a
                    href={`https://wa.me/989160611093?text=${encodeURIComponent(
                      `${product.sku} — ${product.name[locale]}`,
                    )}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover-rule flex h-14 w-full items-center justify-center gap-2.5 rounded-ctrl border border-hairline-strong bg-page fs-caption font-semibold text-ink-900 hover:border-ink-900"
                  >
                    <FaWhatsapp aria-hidden className="h-5 w-5" />
                    {t.common.orderOnWhatsapp}
                  </a>

                  <span role="status" aria-live="polite" className="sr-only">
                    {added ? `${product.name[locale]} — ${t.common.added}` : ""}
                  </span>
                </div>

                <dl className="mt-6 grid gap-2.5 border-t border-hairline pt-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    <dt className="fs-micro font-semibold text-mist-600">
                      {t.common.moq}
                    </dt>
                    <dd className="fs-micro font-semibold text-ink-800">
                      {product.moq[locale]}
                    </dd>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    <dt className="fs-micro font-semibold text-mist-600">
                      {t.common.leadTime}
                    </dt>
                    <dd className="fs-micro inline-flex items-center gap-1.5 font-semibold text-ink-800">
                      <HiOutlineTruck
                        aria-hidden
                        className="h-4 w-4 text-aqua-700"
                      />
                      {t.home.marquee[2]}
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>

          {/* ── Specification ledger, then the description ─────────── */}
          <div className="stack-block grid gap-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[1.04fr_0.96fr]">
            <Reveal>
              <h2 className="fs-h3 font-semibold text-ink-900">
                {t.common.specifications}
              </h2>
              <dl className="mt-6 border-t border-hairline">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid gap-1 border-b border-hairline py-4 sm:grid-cols-[13rem_1fr] sm:gap-8"
                  >
                    <dt className="fs-caption font-semibold text-mist-600">
                      {spec.label}
                    </dt>
                    <dd
                      className={`fs-body font-medium text-ink-900 ${
                        spec.ltr ? "num" : ""
                      }`}
                    >
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="fs-h3 font-semibold text-ink-900">
                {t.common.description}
              </h2>
              <p className="fs-body mt-6 max-w-[62ch] text-ink-800">
                {product.description[locale]}
              </p>
              <ButtonLink
                href={href("/contact")}
                variant="outline"
                size="md"
                className="mt-7"
              >
                {t.common.getQuote}
                <HiArrowUpRight aria-hidden className="h-4 w-4 flip-rtl" />
              </ButtonLink>
            </Reveal>
          </div>
        </Container>
      </Chapter>

      {/* ═══ BOARD — cross-sell rail ════════════════════════════════ */}
      <Chapter tone="board" pad="tight" seam="top">
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <h2 className="fs-h2 max-w-[22ch] font-bold text-ink-900">
              {t.common.relatedProducts}
            </h2>
            <Link
              href={href("/shop")}
              className="link-underline w-fit shrink-0 fs-caption font-semibold text-aqua-700"
            >
              {t.common.viewAll}
            </Link>
          </div>

          <RevealGroup
            variant="fade"
            className="rail stack-block flex grid-gutter snap-x snap-mandatory overflow-x-auto pt-2 pb-6"
          >
            {related.map((p) => (
              <div
                key={p.id}
                className="w-[76vw] shrink-0 snap-start min-[26rem]:w-[62vw] sm:w-[46vw] lg:w-[31%] xl:w-[23.5%]"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Chapter>
    </>
  );
}

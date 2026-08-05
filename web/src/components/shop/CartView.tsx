"use client";

import Link from "next/link";
import {
  HiMinus,
  HiPlus,
  HiOutlineTrash,
  HiOutlineShoppingBag,
  HiArrowUpRight,
  HiChevronRight,
  HiOutlineInformationCircle,
} from "react-icons/hi2";
import { Chapter, Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProductArt } from "@/components/brand/ProductArt";
import { categories } from "@/lib/catalog";
import { useCart } from "./CartProvider";
import { useI18n } from "@/i18n/I18nProvider";

export function CartView() {
  const { t, locale, href, num, price } = useI18n();
  const { detailed, count, subtotal, discount, total, setQty, remove } = useCart();

  const empty = detailed.length === 0;

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
          className="pointer-events-none absolute -top-56 -start-40 h-[38rem] w-[38rem] rounded-chip bg-aqua-500/12 blur-[130px]"
        />
        <div
          aria-hidden
          className="grain-layer pointer-events-none absolute inset-0 opacity-[0.08]"
        />

        <Container className="relative">
          <nav
            aria-label={t.common.breadcrumb}
            className="eyebrow flex items-center gap-2.5 text-onink-300"
          >
            <Link href={href("/")} className="hover-rule hover:text-aqua-300">
              {t.nav.home}
            </Link>
            <HiChevronRight
              aria-hidden
              className="h-3 w-3 shrink-0 text-onink-400 flip-rtl"
            />
            <span aria-current="page" className="text-aqua-300">
              {t.common.cart}
            </span>
          </nav>

          <div className="enter mt-8 flex flex-col gap-4">
            <h1 className="fs-h1 max-w-[18ch] font-bold text-white">
              {t.cart.title}
            </h1>
            <p className="fs-lead max-w-[56ch] text-onink-200">
              {t.cart.subtitle}
            </p>
            <p
              role="status"
              aria-live="polite"
              className="fs-caption font-semibold text-onink-300"
            >
              <span className="num text-aqua-300">{num(count)}</span>{" "}
              {t.cart.itemsCount}
            </p>
          </div>
        </Container>
      </section>

      {/* ═══ PAPER — the ledger ═════════════════════════════════════ */}
      <Chapter tone="paper" pad="base" className="min-h-[45dvh]">
        <Container>
          {empty ? (
            /* Recovery, not an apology: two routes out and the whole
               catalogue laid out as a ruled plate. */
            <Reveal className="rounded-card border border-hairline bg-page px-6 py-12 sm:px-10 sm:py-16">
              <div className="mx-auto max-w-[54ch] text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-tile border border-hairline bg-page text-aqua-700">
                  <HiOutlineShoppingBag aria-hidden className="h-6 w-6" />
                </span>
                <h2 className="fs-h3 mt-6 font-semibold text-ink-900">
                  {t.common.emptyCart}
                </h2>
                <p className="fs-body mt-3 text-mist-600">
                  {t.common.emptyCartHint}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <ButtonLink href={href("/shop")} size="lg">
                    {t.common.shopNow}
                    <HiArrowUpRight aria-hidden className="h-4 w-4 flip-rtl" />
                  </ButtonLink>
                  <ButtonLink
                    href={href("/contact")}
                    variant="outline"
                    size="lg"
                  >
                    {t.common.getQuote}
                  </ButtonLink>
                </div>
              </div>

              <div className="mt-12 border-t border-hairline pt-10">
                <Eyebrow>{t.home.categories.eyebrow}</Eyebrow>
                <ul className="plate-rule mt-5 grid-cols-2 overflow-hidden rounded-card border border-hairline sm:grid-cols-4">
                  {categories.map((c) => (
                    <li key={c.id} className="bg-page">
                      <Link
                        href={href(`/products#${c.slug}`)}
                        className="hover-rule flex h-full flex-col items-center gap-2.5 px-3 py-5 text-center hover:bg-sunken"
                      >
                        <ProductArt art={c.art} className="h-12 w-12" />
                        <span className="fs-micro font-semibold text-ink-800">
                          {c.name[locale]}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : (
            <div className="grid items-start gap-[clamp(2.5rem,4vw,3.5rem)] lg:grid-cols-[1fr_22rem]">
              {/* ── Line ledger ───────────────────────────────────── */}
              <Reveal>
                <ul
                  aria-label={t.cart.title}
                  className="divide-y divide-hairline border-y border-hairline"
                >
                  {detailed.map(({ product, qty, lineTotal }) => (
                    <li
                      key={product.id}
                      className="flex flex-wrap items-center gap-x-5 gap-y-4 py-6 lg:flex-nowrap"
                    >
                      <Link
                        href={href(`/shop/${product.slug}`)}
                        tabIndex={-1}
                        aria-hidden
                        className="grid h-24 w-24 shrink-0 place-items-center rounded-tile border border-hairline bg-sunken"
                      >
                        <ProductArt art={product.art} className="h-16 w-16" />
                      </Link>

                      <div className="flex min-w-0 flex-1 basis-[11rem] flex-col gap-1.5">
                        <span className="num fs-micro font-semibold text-mist-600">
                          {product.sku}
                        </span>
                        <Link
                          href={href(`/shop/${product.slug}`)}
                          className="hover-rule fs-h4 font-semibold text-ink-900 hover:text-aqua-700"
                        >
                          {product.name[locale]}
                        </Link>
                        <span className="fs-caption text-mist-600">
                          {product.packSize[locale]}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-5">
                        <div
                          role="group"
                          aria-label={t.common.quantity}
                          className="flex items-center rounded-ctrl border border-hairline-strong"
                        >
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty - 1)}
                            aria-label={`${t.common.quantity} −`}
                            className="hover-rule grid h-11 w-11 place-items-center rounded-s-ctrl text-ink-800 hover:bg-mist-100 hover:text-ink-900"
                          >
                            <HiMinus aria-hidden className="h-3.5 w-3.5" />
                          </button>
                          <span className="num w-10 text-center fs-caption font-bold text-ink-900">
                            {num(qty)}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty + 1)}
                            aria-label={`${t.common.quantity} +`}
                            className="hover-rule grid h-11 w-11 place-items-center rounded-e-ctrl text-ink-800 hover:bg-mist-100 hover:text-ink-900"
                          >
                            <HiPlus aria-hidden className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <span className="num min-w-[5.5rem] text-end fs-h4 font-bold text-ink-900">
                          {price(lineTotal)}
                        </span>

                        <button
                          type="button"
                          onClick={() => remove(product.id)}
                          aria-label={`${t.common.remove} — ${product.name[locale]}`}
                          className="hover-rule grid h-11 w-11 shrink-0 place-items-center rounded-ctrl text-mist-600 hover:bg-mist-100 hover:text-ink-900"
                        >
                          <HiOutlineTrash aria-hidden className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <Link
                  href={href("/shop")}
                  className="link-underline mt-7 inline-flex w-fit items-center gap-2 fs-caption font-semibold text-aqua-700"
                >
                  {t.common.continueShopping}
                </Link>
              </Reveal>

              {/* ── Summary ───────────────────────────────────────── */}
              <Reveal delay={90} className="lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
                <div className="rounded-card border border-hairline bg-sunken p-6">
                  <h2 className="fs-h4 font-semibold text-ink-900">
                    {t.cart.orderSummary}
                  </h2>

                  <dl className="mt-5 flex flex-col gap-3 fs-caption">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-mist-600">
                        {t.common.subtotal}{" "}
                        <span className="num">({num(count)})</span>
                      </dt>
                      <dd className="num font-semibold text-ink-900">
                        {price(subtotal)}
                      </dd>
                    </div>

                    {discount > 0 ? (
                      <div className="flex items-baseline justify-between gap-4 text-leaf-700">
                        <dt className="font-semibold">
                          {t.cart.volumeDiscount}
                        </dt>
                        <dd className="num font-semibold">
                          {`−${price(discount)}`}
                        </dd>
                      </div>
                    ) : null}

                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-mist-600">{t.common.shipping}</dt>
                      <dd className="fs-micro text-mist-600">
                        {t.common.calculatedAtCheckout}
                      </dd>
                    </div>

                    <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-hairline-strong pt-4">
                      <dt className="fs-h4 font-semibold text-ink-900">
                        {t.common.total}
                      </dt>
                      <dd className="num fs-h3 font-bold text-ink-900">
                        {price(total)}
                      </dd>
                    </div>
                  </dl>

                  <ButtonLink
                    href={href("/contact")}
                    size="lg"
                    className="mt-6 w-full"
                  >
                    {t.common.getQuote}
                    <HiArrowUpRight aria-hidden className="h-4 w-4 flip-rtl" />
                  </ButtonLink>

                  <p className="fs-micro mt-5 flex items-start gap-2 border-t border-hairline pt-4 text-mist-600">
                    <HiOutlineInformationCircle
                      aria-hidden
                      className="mt-0.5 h-4 w-4 shrink-0 text-aqua-700"
                    />
                    {t.cart.note}
                  </p>
                </div>
              </Reveal>
            </div>
          )}
        </Container>
      </Chapter>
    </>
  );
}

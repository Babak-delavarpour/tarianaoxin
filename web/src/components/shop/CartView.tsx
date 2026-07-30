"use client";

import Link from "next/link";
import {
  HiMinus,
  HiPlus,
  HiOutlineTrash,
  HiOutlineShoppingBag,
  HiArrowUpRight,
  HiOutlineInformationCircle,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProductArt } from "@/components/brand/ProductArt";
import { useCart } from "./CartProvider";
import { useI18n } from "@/i18n/I18nProvider";

export function CartView() {
  const { t, locale, href, num, price } = useI18n();
  const { detailed, count, subtotal, discount, total, setQty, remove } = useCart();

  return (
    <section className="mesh-light relative min-h-[70dvh] pt-[clamp(7rem,12vw,10rem)] pb-[clamp(3.5rem,7vw,6.5rem)]">
      <Container>
        <Reveal className="mb-10 flex flex-col gap-3">
          <h1 className="fs-h2 font-extrabold text-ink-900">
            {t.cart.title}
          </h1>
          <p className="text-[1rem] text-mist-600">{t.cart.subtitle}</p>
        </Reveal>

        {detailed.length === 0 ? (
          <Reveal>
            <div className="flex flex-col items-center gap-5 rounded-[2rem] border border-dashed border-mist-300 bg-white/70 px-8 py-24 text-center">
              <span className="grid h-20 w-20 place-items-center rounded-3xl bg-ink-50 text-ink-300">
                <HiOutlineShoppingBag className="h-9 w-9" />
              </span>
              <h2 className="text-[1.3rem] font-extrabold text-ink-900">
                {t.common.emptyCart}
              </h2>
              <p className="max-w-sm text-[0.92rem] leading-relaxed text-mist-500">
                {t.common.emptyCartHint}
              </p>
              <ButtonLink href={href("/shop")} size="lg" className="mt-1">
                {t.common.shopNow}
                <HiArrowUpRight className="h-4 w-4 flip-rtl" />
              </ButtonLink>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
            {/* Lines */}
            <Reveal>
              <ul className="overflow-hidden rounded-[1.75rem] border border-mist-200 bg-white shadow-[var(--shadow-card)]">
                {detailed.map(({ product, qty, lineTotal }, i) => (
                  <li
                    key={product.id}
                    className={`flex flex-wrap items-center gap-5 p-5 sm:flex-nowrap sm:p-6 ${
                      i > 0 ? "border-t border-mist-100" : ""
                    }`}
                  >
                    <Link
                      href={href(`/shop/${product.slug}`)}
                      className="relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-2xl border border-mist-200 bg-gradient-to-br from-mist-50 to-aqua-50/60"
                    >
                      <ProductArt art={product.art} className="h-16 w-16" />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <span className="num text-[0.66rem] font-bold tracking-[0.14em] text-mist-400 uppercase">
                        {product.sku}
                      </span>
                      <Link
                        href={href(`/shop/${product.slug}`)}
                        className="text-[1rem] leading-snug font-extrabold text-ink-900 transition-colors hover:text-aqua-700"
                      >
                        {product.name[locale]}
                      </Link>
                      <span className="text-[0.82rem] text-mist-500">
                        {product.packSize[locale]}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center rounded-full border border-mist-200 bg-mist-50">
                        <button
                          type="button"
                          onClick={() => setQty(product.id, qty - 1)}
                          aria-label="-"
                          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-white"
                        >
                          <HiMinus className="h-3.5 w-3.5" />
                        </button>
                        <span className="num w-9 text-center text-[0.9rem] font-extrabold text-ink-900">
                          {num(qty)}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(product.id, qty + 1)}
                          aria-label="+"
                          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-white"
                        >
                          <HiPlus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <span className="num w-24 text-end text-[1.05rem] font-extrabold text-ink-900">
                        {price(lineTotal)}
                      </span>

                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        aria-label={t.common.remove}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-mist-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <HiOutlineTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Summary */}
            <Reveal delay={120}>
              <div className="sticky top-28 flex flex-col gap-5 rounded-[1.75rem] border border-mist-200 bg-white p-6 shadow-[var(--shadow-card)]">
                <h2 className="text-[1.1rem] font-extrabold text-ink-900">
                  {t.cart.orderSummary}
                </h2>

                <dl className="flex flex-col gap-3 text-[0.9rem]">
                  <div className="flex items-center justify-between">
                    <dt className="text-mist-500">
                      {t.common.subtotal}{" "}
                      <span className="num text-mist-400">
                        ({num(count)} {t.cart.itemsCount})
                      </span>
                    </dt>
                    <dd className="num font-bold text-ink-800">{price(subtotal)}</dd>
                  </div>

                  {discount > 0 ? (
                    <div className="flex items-center justify-between text-aqua-700">
                      <dt className="font-semibold">{t.cart.volumeDiscount}</dt>
                      <dd className="num font-bold">−{price(discount)}</dd>
                    </div>
                  ) : null}

                  <div className="flex items-center justify-between">
                    <dt className="text-mist-500">{t.common.shipping}</dt>
                    <dd className="text-[0.82rem] text-mist-400">
                      {t.common.calculatedAtCheckout}
                    </dd>
                  </div>

                  <div className="mt-1 flex items-center justify-between border-t border-mist-200 pt-4">
                    <dt className="text-[1.05rem] font-extrabold text-ink-900">
                      {t.common.total}
                    </dt>
                    <dd className="num text-brand-gradient text-[1.5rem] font-extrabold">
                      {price(total)}
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  className="sheen brand-gradient flex h-14 w-full items-center justify-center gap-2.5 rounded-full text-[0.95rem] font-bold text-white transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <HiOutlineLockClosed className="h-4 w-4" />
                  {t.common.checkout}
                </button>

                <Link
                  href={href("/shop")}
                  className="text-center text-[0.86rem] font-semibold text-mist-500 transition-colors hover:text-ink-800"
                >
                  {t.common.continueShopping}
                </Link>

                <p className="flex items-start gap-2 border-t border-mist-100 pt-4 text-[0.78rem] leading-relaxed text-mist-400">
                  <HiOutlineInformationCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {t.cart.note}
                </p>
              </div>
            </Reveal>
          </div>
        )}
      </Container>
    </section>
  );
}

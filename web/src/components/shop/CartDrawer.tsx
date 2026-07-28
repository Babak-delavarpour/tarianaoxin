"use client";

import Link from "next/link";
import { HiXMark, HiOutlineShoppingBag, HiMinus, HiPlus, HiOutlineTrash, HiArrowUpRight } from "react-icons/hi2";
import { useCart } from "./CartProvider";
import { useI18n } from "@/i18n/I18nProvider";
import { ProductArt } from "@/components/brand/ProductArt";
import { ButtonLink } from "@/components/ui/Button";

export function CartDrawer() {
  const { t, locale, href, num, price } = useI18n();
  const { isOpen, close, detailed, count, subtotal, discount, total, setQty, remove } =
    useCart();

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink-950/55 backdrop-blur-[3px] transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t.common.cart}
        className={`absolute inset-y-0 end-0 flex w-full max-w-[27rem] flex-col bg-mist-50 shadow-[0_0_100px_rgba(4,22,36,0.5)] transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] ${
          isOpen
            ? "translate-x-0"
            : "ltr:translate-x-full rtl:-translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between gap-4 border-b border-mist-200 bg-white px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="brand-gradient flex h-10 w-10 items-center justify-center rounded-2xl text-white">
              <HiOutlineShoppingBag className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-[1.05rem] font-extrabold text-ink-900">
                {t.common.cart}
              </h2>
              <p className="text-[0.76rem] font-medium text-mist-500">
                <span className="num">{num(count)}</span> {t.cart.itemsCount}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={t.common.close}
            className="flex h-9 w-9 items-center justify-center rounded-full text-mist-500 transition-colors hover:bg-ink-50 hover:text-ink-900"
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </header>

        {detailed.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-ink-50 text-ink-300">
              <HiOutlineShoppingBag className="h-9 w-9" />
            </span>
            <h3 className="text-[1.1rem] font-bold text-ink-900">
              {t.common.emptyCart}
            </h3>
            <p className="text-[0.88rem] leading-relaxed text-mist-500">
              {t.common.emptyCartHint}
            </p>
            <ButtonLink href={href("/shop")} onClick={close} size="md" className="mt-2">
              {t.common.shopNow}
              <HiArrowUpRight className="h-4 w-4 flip-rtl" />
            </ButtonLink>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-mist-200 overflow-y-auto px-6">
              {detailed.map(({ product, qty, lineTotal }) => (
                <li key={product.id} className="flex gap-4 py-5">
                  <Link
                    href={href(`/shop/${product.slug}`)}
                    onClick={close}
                    className="grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center rounded-2xl border border-mist-200 bg-white"
                  >
                    <ProductArt art={product.art} className="h-14 w-14" />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={href(`/shop/${product.slug}`)}
                        onClick={close}
                        className="line-clamp-2 text-[0.88rem] font-bold text-ink-900 hover:text-aqua-700"
                      >
                        {product.name[locale]}
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        aria-label={t.common.remove}
                        className="shrink-0 rounded-lg p-1 text-mist-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <HiOutlineTrash className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-full border border-mist-200 bg-white">
                        <button
                          type="button"
                          onClick={() => setQty(product.id, qty - 1)}
                          aria-label="-"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-ink-50"
                        >
                          <HiMinus className="h-3.5 w-3.5" />
                        </button>
                        <span className="num w-8 text-center text-[0.85rem] font-bold text-ink-900">
                          {num(qty)}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(product.id, qty + 1)}
                          aria-label="+"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-ink-50"
                        >
                          <HiPlus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="num text-[0.92rem] font-extrabold text-ink-900">
                        {price(lineTotal)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-mist-200 bg-white px-6 py-5">
              <dl className="flex flex-col gap-2 text-[0.88rem]">
                <div className="flex items-center justify-between">
                  <dt className="text-mist-500">{t.common.subtotal}</dt>
                  <dd className="num font-semibold text-ink-800">{price(subtotal)}</dd>
                </div>
                {discount > 0 ? (
                  <div className="flex items-center justify-between text-aqua-700">
                    <dt className="font-semibold">{t.cart.volumeDiscount}</dt>
                    <dd className="num font-bold">−{price(discount)}</dd>
                  </div>
                ) : null}
                <div className="flex items-center justify-between">
                  <dt className="text-mist-500">{t.common.shipping}</dt>
                  <dd className="text-[0.8rem] text-mist-400">
                    {t.common.calculatedAtCheckout}
                  </dd>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-mist-200 pt-3">
                  <dt className="text-[1rem] font-extrabold text-ink-900">
                    {t.common.total}
                  </dt>
                  <dd className="num text-[1.25rem] font-extrabold text-brand-gradient">
                    {price(total)}
                  </dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-col gap-2">
                <ButtonLink href={href("/cart")} onClick={close} size="lg" className="w-full">
                  {t.common.checkout}
                  <HiArrowUpRight className="h-4 w-4 flip-rtl" />
                </ButtonLink>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full py-2 text-[0.84rem] font-semibold text-mist-500 transition-colors hover:text-ink-800"
                >
                  {t.common.continueShopping}
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  HiXMark,
  HiOutlineShoppingBag,
  HiMinus,
  HiPlus,
  HiOutlineTrash,
  HiArrowUpRight,
} from "react-icons/hi2";
import { useCart } from "./CartProvider";
import { useI18n } from "@/i18n/I18nProvider";
import { ProductArt } from "@/components/brand/ProductArt";
import { ButtonLink } from "@/components/ui/Button";

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function CartDrawer() {
  const { t, locale, href, num, price } = useI18n();
  const { isOpen, close, detailed, count, subtotal, discount, total, setQty, remove } =
    useCart();

  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /**
   * Escape and the body-scroll lock already live in CartProvider, so this
   * only adds what an overlay still owes: focus moves in on open, Tab is
   * trapped for as long as it is open, and focus returns to whatever
   * opened it. When closed the subtree is `inert`, so nothing inside is
   * reachable by keyboard or screen reader.
   */
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const root = panelRef.current;
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
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[var(--z-scrim)] ${
        isOpen ? "" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink-950/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.common.cart}
        className={`absolute inset-y-0 end-0 z-[var(--z-drawer)] flex w-full max-w-md flex-col rounded-s-panel bg-page shadow-e3 transition-transform duration-400 ease-out-expo ${
          isOpen ? "translate-x-0" : "ltr:translate-x-full rtl:-translate-x-full"
        }`}
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-hairline px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tile border border-hairline bg-page text-aqua-700">
              <HiOutlineShoppingBag aria-hidden className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2 className="fs-h4 font-semibold text-ink-900">
                {t.common.cart}
              </h2>
              <p
                role="status"
                aria-live="polite"
                className="fs-micro font-semibold text-mist-600"
              >
                <span className="num">{num(count)}</span> {t.cart.itemsCount}
              </p>
            </div>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={t.common.close}
            className="hover-rule grid h-11 w-11 shrink-0 place-items-center rounded-ctrl text-mist-600 hover:bg-mist-100 hover:text-ink-900"
          >
            <HiXMark aria-hidden className="h-5 w-5" />
          </button>
        </header>

        {detailed.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-tile border border-hairline bg-page text-aqua-700">
              <HiOutlineShoppingBag aria-hidden className="h-6 w-6" />
            </span>
            <h3 className="fs-h4 font-semibold text-ink-900">
              {t.common.emptyCart}
            </h3>
            <p className="fs-caption max-w-[34ch] text-mist-600">
              {t.common.emptyCartHint}
            </p>
            <div className="mt-2 flex flex-col items-center gap-2.5">
              <ButtonLink href={href("/shop")} onClick={close} size="md">
                {t.common.shopNow}
                <HiArrowUpRight aria-hidden className="h-4 w-4 flip-rtl" />
              </ButtonLink>
              <Link
                href={href("/contact")}
                onClick={close}
                className="link-underline fs-caption font-semibold text-aqua-700"
              >
                {t.common.getQuote}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <ul className="scroll-pane min-h-0 flex-1 divide-y divide-hairline overflow-y-auto px-5 sm:px-6">
              {detailed.map(({ product, qty, lineTotal }) => (
                <li key={product.id} className="flex gap-4 py-5">
                  <Link
                    href={href(`/shop/${product.slug}`)}
                    onClick={close}
                    tabIndex={-1}
                    aria-hidden
                    className="grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center rounded-tile border border-hairline bg-sunken"
                  >
                    <ProductArt art={product.art} className="h-12 w-12" />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex min-w-0 flex-col gap-1">
                        <span className="num fs-micro font-semibold text-mist-600">
                          {product.sku}
                        </span>
                        <Link
                          href={href(`/shop/${product.slug}`)}
                          onClick={close}
                          className="hover-rule line-clamp-2 fs-caption font-semibold text-ink-900 hover:text-aqua-700"
                        >
                          {product.name[locale]}
                        </Link>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        aria-label={`${t.common.remove} — ${product.name[locale]}`}
                        className="hover-rule -me-2 -mt-2 grid h-11 w-11 shrink-0 place-items-center rounded-ctrl text-mist-600 hover:bg-mist-100 hover:text-ink-900"
                      >
                        <HiOutlineTrash aria-hidden className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
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
                        <span className="num w-9 text-center fs-caption font-bold text-ink-900">
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

                      <span className="num fs-price-compact font-bold text-ink-900">
                        {price(lineTotal)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="pb-safe shrink-0 border-t border-hairline bg-sunken px-5 pt-5 sm:px-6">
              <dl className="flex flex-col gap-2.5 fs-caption">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-mist-600">{t.common.subtotal}</dt>
                  <dd className="num font-semibold text-ink-900">
                    {price(subtotal)}
                  </dd>
                </div>

                {discount > 0 ? (
                  <div className="flex items-baseline justify-between gap-4 text-leaf-700">
                    <dt className="font-semibold">{t.cart.volumeDiscount}</dt>
                    <dd className="num font-semibold">{`−${price(discount)}`}</dd>
                  </div>
                ) : null}

                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-mist-600">{t.common.shipping}</dt>
                  <dd className="fs-micro text-mist-600">
                    {t.common.calculatedAtCheckout}
                  </dd>
                </div>

                <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-hairline-strong pt-3.5">
                  <dt className="fs-h4 font-semibold text-ink-900">
                    {t.common.total}
                  </dt>
                  <dd className="num fs-price font-bold text-ink-900">
                    {price(total)}
                  </dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-col gap-1">
                <ButtonLink
                  href={href("/cart")}
                  onClick={close}
                  size="lg"
                  className="w-full"
                >
                  {t.common.checkout}
                  <HiArrowUpRight aria-hidden className="h-4 w-4 flip-rtl" />
                </ButtonLink>
                <button
                  type="button"
                  onClick={close}
                  className="hover-rule min-h-11 rounded-ctrl fs-caption font-semibold text-mist-600 hover:text-ink-900"
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

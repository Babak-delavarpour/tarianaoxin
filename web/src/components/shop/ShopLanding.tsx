"use client";

import { ProductArt } from "@/components/brand/ProductArt";
import { Chapter, Container } from "@/components/ui/Section";
import { useI18n } from "@/i18n/I18nProvider";
import { categories, products, type CategoryId } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";

export function ShopLanding({
  onCategorySelect,
}: {
  onCategorySelect: (category: CategoryId) => void;
}) {
  const { t, locale } = useI18n();
  const copy = t.shop.landing;
  const topProducts = products.filter((product) => product.featured).slice(0, 4);
  const saleProducts = products.filter((product) => product.compareAt).slice(0, 4);

  return (
    <Chapter tone="board" pad="base">
      <Container className="flex flex-col gap-[clamp(4rem,8vw,7rem)]">
        <section aria-labelledby="shop-category-title">
          <div className="flex flex-col gap-3">
            <h2 id="shop-category-title" className="fs-h2 font-bold text-ink-900">
              {copy.categoriesTitle}
            </h2>
            <p className="fs-body max-w-[54ch] text-mist-600">
              {copy.categoriesBody}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategorySelect(category.id)}
                aria-label={`${copy.openCategory}: ${category.name[locale]}`}
                className="lift group flex min-w-0 flex-col overflow-hidden rounded-card border border-hairline bg-page text-start shadow-e1"
              >
                <span className="relative grid aspect-[5/4] w-full place-items-center overflow-hidden border-b border-hairline bg-sunken p-3">
                  <span
                    aria-hidden
                    className="grid-lines-ink pointer-events-none absolute inset-0 opacity-60"
                  />
                  <ProductArt
                    art={category.art}
                    className="relative h-[72%] w-[72%] transition-transform duration-300 group-hover:scale-105"
                  />
                </span>
                <span className="flex min-h-16 w-full items-center px-3 py-2.5 fs-caption font-semibold text-ink-900 group-hover:text-aqua-700">
                  {category.name[locale]}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="shop-top-products-title">
          <div className="flex flex-col gap-3">
            <h2 id="shop-top-products-title" className="fs-h2 font-bold text-ink-900">
              {copy.topTitle}
            </h2>
            <p className="fs-body max-w-[54ch] text-mist-600">{copy.topBody}</p>
          </div>

          <div className="mt-8 grid grid-gutter sm:grid-cols-2 xl:grid-cols-4">
            {topProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section aria-labelledby="shop-sale-products-title">
          <div className="flex flex-col gap-3">
            <h2 id="shop-sale-products-title" className="fs-h2 font-bold text-ink-900">
              {copy.saleTitle}
            </h2>
            <p className="fs-body max-w-[54ch] text-mist-600">{copy.saleBody}</p>
          </div>

          <div className="mt-8 grid grid-gutter sm:grid-cols-2 xl:grid-cols-3">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </Container>
    </Chapter>
  );
}

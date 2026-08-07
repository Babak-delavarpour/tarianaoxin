import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { defaultLocale, isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { products, getProduct } from "@/lib/catalog";
import { ProductView } from "@/components/shop/ProductView";
import {
  BreadcrumbJsonLd,
  ProductJsonLd,
  pageMetadata,
} from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return products.map((p) => ({ locale: defaultLocale, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product || !isLocale(locale)) return {};
  if (locale !== "fa") return { robots: { index: false, follow: false } };
  return pageMetadata({
    locale,
    path: `/shop/${product.slug}`,
    title: product.name[locale],
    description: product.blurb[locale],
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  if (locale !== "fa") redirect(localePath(locale, "/products"));
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      {isLocale(locale) && (
        <>
          <ProductJsonLd locale={locale} product={product} />
          <BreadcrumbJsonLd
            locale={locale}
            crumbs={[
              { name: getDictionary(locale).nav.shop, path: "/shop" },
              {
                name: product.name[locale],
                path: `/shop/${product.slug}`,
              },
            ]}
          />
        </>
      )}
      <ProductView slug={product.slug} />
    </>
  );
}

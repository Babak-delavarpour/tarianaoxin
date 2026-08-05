import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { ProductsView } from "@/components/products/ProductsView";
import {
  BreadcrumbJsonLd,
  SiteJsonLd,
  pageMetadata,
} from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/products",
    title: t.products.hero.title,
    description: t.products.hero.subtitle,
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      {isLocale(locale) && (
        <>
          <SiteJsonLd locale={locale} />
          <BreadcrumbJsonLd
            locale={locale}
            crumbs={[
              { name: getDictionary(locale).nav.products, path: "/products" },
            ]}
          />
        </>
      )}
      <ProductsView />
    </>
  );
}

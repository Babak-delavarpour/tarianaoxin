import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { ShopView } from "@/components/shop/ShopView";
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
  if (locale !== "fa") return { robots: { index: false, follow: false } };
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/shop",
    title: t.shop.hero.title,
    description: t.shop.hero.subtitle,
  });
}

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ cat?: string; q?: string }>;
}) {
  const { locale } = await params;
  if (isLocale(locale) && locale !== "fa") {
    redirect(localePath(locale, "/products"));
  }
  const search = await searchParams;

  return (
    <>
      {isLocale(locale) && (
        <>
          <SiteJsonLd locale={locale} />
          <BreadcrumbJsonLd
            locale={locale}
            crumbs={[{ name: getDictionary(locale).nav.shop, path: "/shop" }]}
          />
        </>
      )}
      <ShopView initialCategory={search.cat} initialQuery={search.q} />
    </>
  );
}

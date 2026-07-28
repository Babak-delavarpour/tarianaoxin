import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { ProductsView } from "@/components/products/ProductsView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { title: t.products.hero.title, description: t.products.hero.subtitle };
}

export default function ProductsPage() {
  return <ProductsView />;
}

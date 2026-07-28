import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { ShopView } from "@/components/shop/ShopView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { title: t.shop.hero.title, description: t.shop.hero.subtitle };
}

export default function ShopPage() {
  return <ShopView />;
}

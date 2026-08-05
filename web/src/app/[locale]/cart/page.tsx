import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { CartView } from "@/components/shop/CartView";
import { pageMetadata } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    ...pageMetadata({
      locale,
      path: "/cart",
      title: t.cart.title,
      description: t.cart.subtitle,
    }),
    // A per-visitor, zero-value page for search. `robots.ts` disallows it too.
    robots: { index: false, follow: true },
  };
}

export default function CartPage() {
  return <CartView />;
}

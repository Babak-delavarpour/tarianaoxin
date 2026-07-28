import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";

import { locales, localeDirection, localeMeta, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { I18nProvider } from "@/i18n/I18nProvider";
import { fontVariables } from "@/app/fonts";
import { CartProvider } from "@/components/shop/CartProvider";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#08243b",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);

  return {
    title: {
      default: t.meta.title,
      template: `%s · ${t.brand.name}`,
    },
    description: t.meta.description,
    applicationName: "Tarianaoxin",
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [localeMeta[l].htmlLang, `/${l}`]),
      ),
    },
    openGraph: {
      type: "website",
      title: t.meta.title,
      description: t.meta.description,
      siteName: t.brand.name,
      locale: localeMeta[locale].htmlLang,
    },
    icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
  };
}

/**
 * This is the app's root layout. Owning <html> here is what lets `dir` and
 * `lang` be correct in the server-rendered markup rather than being patched
 * after hydration — which matters because both Tailwind's rtl:/ltr: variants
 * and our own direction-aware CSS key off the document direction.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale);

  return (
    <html
      lang={localeMeta[locale].htmlLang}
      dir={localeDirection[locale]}
      data-locale={locale}
      suppressHydrationWarning
    >
      <body className={`${fontVariables} antialiased`}>
        <I18nProvider locale={locale} dictionary={dictionary}>
          <CartProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
            >
              {dictionary.common.skipToContent}
            </a>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";

import {
  locales,
  defaultLocale,
  localeDirection,
  localeMeta,
  localePath,
  isLocale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { I18nProvider } from "@/i18n/I18nProvider";
import { fontVariables, localeFontClassName } from "@/app/fonts";
import { CartProvider } from "@/components/shop/CartProvider";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LiveHelp } from "@/components/support/LiveHelp";
import { SITE_URL } from "@/components/seo/JsonLd";

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
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.meta.title,
      template: `%s · ${t.brand.name}`,
    },
    description: t.meta.description,
    applicationName: "TarianaOxin",
    alternates: {
      canonical: localePath(locale),
      languages: Object.fromEntries(
        [
          ...locales.map((l) => [localeMeta[l].htmlLang, localePath(l)]),
          ["x-default", localePath(defaultLocale)],
        ],
      ),
    },
    openGraph: {
      type: "website",
      title: t.meta.title,
      description: t.meta.description,
      siteName: t.brand.name,
      locale: localeMeta[locale].htmlLang,
    },
    icons: {
      icon: [
        {
          url: "/brand/tarianaoxin-logo.svg?v=theme-1",
          type: "image/svg+xml",
          sizes: "any",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/brand/tarianaoxin-logo-light.svg?v=theme-1",
          type: "image/svg+xml",
          sizes: "any",
          media: "(prefers-color-scheme: dark)",
        },
      ],
      apple: [
        {
          url: "/apple-touch-icon.png",
          type: "image/png",
          sizes: "180x180",
        },
      ],
    },
    other: {
      "msapplication-TileColor": "#08243b",
      "msapplication-config": "/browserconfig.xml",
    },
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
      className={fontVariables}
      suppressHydrationWarning
    >
      <body className={`${localeFontClassName[locale]} antialiased`}>
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
            {locale === "fa" ? <CartDrawer /> : null}
            <LiveHelp />
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { ContactView } from "@/components/contact/ContactView";
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
    path: "/contact",
    title: t.contact.hero.title,
    description: t.contact.hero.subtitle,
  });
}

export default async function ContactPage({
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
              { name: getDictionary(locale).nav.contact, path: "/contact" },
            ]}
          />
        </>
      )}
      <ContactView />
    </>
  );
}

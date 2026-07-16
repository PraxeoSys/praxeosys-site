import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@data/site-config";
import { buildAlternates, buildOpenGraph, twitterMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HtmlLangSync } from "@/components/layout/HtmlLangSync";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s · ${siteConfig.brand}`,
    },
    description,
    alternates: buildAlternates(locale as Locale, ""),
    openGraph: buildOpenGraph(locale as Locale, { title, description }),
    twitter: twitterMetadata,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <HtmlLangSync />
      <Header />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}

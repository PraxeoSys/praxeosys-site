import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageTransition } from "@/components/layout/PageTransition";
import { NowSection } from "@/components/now/NowSection";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "now" });
  const title = t("heading");
  const description = t("subheading");

  return {
    title,
    description,
    alternates: buildAlternates(locale as Locale, "/now"),
    openGraph: buildOpenGraph(locale as Locale, { title, description }),
  };
}

export default async function NowPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageTransition>
      <main className="mx-auto max-w-3xl flex-1 px-6 py-20">
        <NowSection />
      </main>
    </PageTransition>
  );
}

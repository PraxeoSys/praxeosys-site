import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getArticleBySlug, getArticleSlugs } from "@/lib/mdx";
import { OgCard, OG_IMAGE_SIZE } from "@/lib/og";
import type { Locale } from "@/lib/types";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

// Same gate as the article page: a slug with no published file is not a route.
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getArticleSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "research" });

  let article;
  try {
    article = getArticleBySlug(locale as Locale, slug);
  } catch {
    notFound();
  }
  const title = article.title;
  const subtitle = article.summary;

  return new ImageResponse(
    <OgCard kicker={t("heading")} title={title} subtitle={subtitle} />,
    size,
  );
}

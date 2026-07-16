import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { getArticleBySlug } from "@/lib/mdx";
import { OgCard, OG_IMAGE_SIZE } from "@/lib/og";
import type { Locale } from "@/lib/types";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "research" });

  let title = t("heading");
  let subtitle: string | undefined;

  try {
    const article = getArticleBySlug(locale as Locale, slug);
    title = article.title;
    subtitle = article.summary;
  } catch {
    // fall back to the generic research heading above
  }

  return new ImageResponse(
    <OgCard kicker={t("heading")} title={title} subtitle={subtitle} />,
    size,
  );
}

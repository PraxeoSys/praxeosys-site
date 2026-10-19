import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { OgCard, OG_IMAGE_SIZE } from "@/lib/og";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "research" });

  return new ImageResponse(
    <OgCard kicker={t("heading")} title={t("heading")} subtitle={t("subheading")} />,
    size,
  );
}

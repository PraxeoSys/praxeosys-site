import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@data/site-config";
import { OgCard, OG_IMAGE_SIZE } from "@/lib/og";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return new ImageResponse(
    (
      <OgCard
        kicker={`${siteConfig.name} — ${siteConfig.brand}`}
        title={t("narrative")}
      />
    ),
    size,
  );
}

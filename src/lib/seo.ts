import type { Metadata } from "next";
import { siteConfig } from "@data/site-config";
import { routing } from "@/i18n/routing";
import type { Locale } from "./types";

/** Builds a self-referencing canonical + full hreflang map (including x-default) for a given pathname. */
export function buildAlternates(
  locale: Locale,
  pathname: string,
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${siteConfig.url}/${l}${pathname}`;
  }
  languages["x-default"] = `${siteConfig.url}/${routing.defaultLocale}${pathname}`;

  return {
    canonical: `${siteConfig.url}/${locale}${pathname}`,
    languages,
  };
}

export function buildOpenGraph(
  locale: Locale,
  overrides: Pick<Metadata, "title" | "description"> = {},
): Metadata["openGraph"] {
  return {
    siteName: siteConfig.brand,
    type: "website",
    locale: locale === "zh" ? "zh_CN" : "en_US",
    ...overrides,
  } as Metadata["openGraph"];
}

export const twitterMetadata: Metadata["twitter"] = {
  card: "summary_large_image",
};

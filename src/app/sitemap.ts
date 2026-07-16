import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@data/site-config";
import { getAllArticles } from "@/lib/mdx";

const STATIC_PATHS = ["", "/projects", "/research"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${siteConfig.url}/${locale}${path}`,
        lastModified: new Date(),
      });
    }

    for (const article of getAllArticles(locale)) {
      entries.push({
        url: `${siteConfig.url}/${locale}/research/${article.slug}`,
        lastModified: new Date(article.date),
      });
    }
  }

  return entries;
}

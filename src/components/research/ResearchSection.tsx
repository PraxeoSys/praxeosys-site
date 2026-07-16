import { getTranslations, getLocale } from "next-intl/server";
import { getAllArticles } from "@/lib/mdx";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/types";
import { ArticleList } from "./ArticleList";

export async function ResearchSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("research");
  const articles = getAllArticles(locale).slice(0, 3);

  const tagLabels = {
    macro: t("tags.macro"),
    "market-structure": t("tags.market-structure"),
    quant: t("tags.quant"),
    web3: t("tags.web3"),
    review: t("tags.review"),
    essay: t("tags.essay"),
  };

  return (
    <div id="research">
      <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
        {t("heading")}
      </h2>
      <p className="mt-2 max-w-2xl text-foreground-muted">{t("subheading")}</p>

      <div className="mt-10">
        <ArticleList
          articles={articles}
          locale={locale}
          tagLabels={tagLabels}
          minReadLabel={t("minRead")}
          readMoreLabel={t("readMore")}
          emptyLabel={t("empty")}
        />
      </div>

      <Link
        href="/research"
        className="mt-6 inline-block font-mono text-sm text-accent hover:underline"
      >
        {t("viewAll")}
      </Link>
    </div>
  );
}

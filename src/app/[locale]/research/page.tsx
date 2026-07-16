import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllArticles, type ResearchTag } from "@/lib/mdx";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";
import type { Locale } from "@/lib/types";
import { ArticleList } from "@/components/research/ArticleList";

const TAGS: ResearchTag[] = [
  "macro",
  "market-structure",
  "quant",
  "web3",
  "review",
  "essay",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "research" });
  const title = t("heading");
  const description = t("subheading");

  return {
    title,
    description,
    alternates: buildAlternates(locale as Locale, "/research"),
    openGraph: buildOpenGraph(locale as Locale, { title, description }),
  };
}

export default async function ResearchListPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tag?: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);
  const { tag } = await searchParams;
  const t = await getTranslations("research");

  const activeTag = TAGS.includes(tag as ResearchTag)
    ? (tag as ResearchTag)
    : undefined;

  const articles = getAllArticles(locale, activeTag);

  const tagLabels = {
    macro: t("tags.macro"),
    "market-structure": t("tags.market-structure"),
    quant: t("tags.quant"),
    web3: t("tags.web3"),
    review: t("tags.review"),
    essay: t("tags.essay"),
  };

  return (
    <main className="mx-auto max-w-5xl flex-1 px-6 py-20">
      <h1 className="font-serif text-2xl text-foreground sm:text-3xl">
        {t("heading")}
      </h1>
      <p className="mt-2 max-w-2xl text-foreground-muted">{t("subheading")}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/research"
          className={cn(
            "rounded-panel border px-3 py-1 font-mono text-xs",
            !activeTag
              ? "border-accent text-accent"
              : "border-border text-foreground-muted hover:border-accent/50",
          )}
        >
          {t("allTag")}
        </Link>
        {TAGS.map((t2) => (
          <Link
            key={t2}
            href={{ pathname: "/research", query: { tag: t2 } }}
            className={cn(
              "rounded-panel border px-3 py-1 font-mono text-xs",
              activeTag === t2
                ? "border-accent text-accent"
                : "border-border text-foreground-muted hover:border-accent/50",
            )}
          >
            {tagLabels[t2]}
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <ArticleList
          articles={articles}
          locale={locale}
          tagLabels={tagLabels}
          minReadLabel={t("minRead")}
          readMoreLabel={t("readMore")}
          emptyLabel={t("empty")}
        />
      </div>
    </main>
  );
}

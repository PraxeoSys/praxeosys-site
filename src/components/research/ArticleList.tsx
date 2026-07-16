import type { ArticleMeta } from "@/lib/mdx";
import type { Locale } from "@/lib/types";
import { ArticleCard } from "./ArticleCard";

interface ArticleListProps {
  articles: ArticleMeta[];
  locale: Locale;
  tagLabels: Record<string, string>;
  minReadLabel: string;
  readMoreLabel: string;
  emptyLabel: string;
}

export function ArticleList({
  articles,
  locale,
  tagLabels,
  minReadLabel,
  readMoreLabel,
  emptyLabel,
}: ArticleListProps) {
  if (articles.length === 0) {
    return <p className="py-8 text-sm text-foreground-muted">{emptyLabel}</p>;
  }

  return (
    <div>
      {articles.map((article) => (
        <ArticleCard
          key={article.slug}
          article={article}
          locale={locale}
          tagLabels={tagLabels}
          minReadLabel={minReadLabel}
          readMoreLabel={readMoreLabel}
        />
      ))}
    </div>
  );
}

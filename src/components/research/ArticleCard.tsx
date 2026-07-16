import { Link } from "@/i18n/navigation";
import type { ArticleMeta } from "@/lib/mdx";
import { formatDate } from "@/lib/time";
import type { Locale } from "@/lib/types";

interface ArticleCardProps {
  article: ArticleMeta;
  locale: Locale;
  tagLabels: Record<string, string>;
  minReadLabel: string;
  readMoreLabel: string;
}

export function ArticleCard({
  article,
  locale,
  tagLabels,
  minReadLabel,
  readMoreLabel,
}: ArticleCardProps) {
  return (
    <article className="border-b border-border py-6 first:pt-0 last:border-b-0">
      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-foreground-muted">
        <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
        <span>·</span>
        <span>
          {article.readingMinutes} {minReadLabel}
        </span>
        {article.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-panel border border-accent/30 px-1.5 py-0.5 text-accent"
          >
            {tagLabels[tag] ?? tag}
          </span>
        ))}
      </div>

      <h3 className="mt-2 font-serif text-xl text-foreground">
        <Link href={`/research/${article.slug}`} className="hover:text-accent">
          {article.title}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-foreground-muted">{article.summary}</p>

      <Link
        href={`/research/${article.slug}`}
        className="mt-2 inline-block font-mono text-xs text-accent hover:underline"
      >
        {readMoreLabel}
      </Link>
    </article>
  );
}

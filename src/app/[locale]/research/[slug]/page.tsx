import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getArticleBySlug, getArticleSlugs } from "@/lib/mdx";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/time";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";
import type { Locale } from "@/lib/types";
import { Toc } from "@/components/research/Toc";

export async function generateStaticParams({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  return getArticleSlugs(params.locale as Locale).map((slug) => ({ slug }));
}

// Draft articles are excluded from getArticleSlugs, so this forces a 404 for
// their slugs instead of falling back to on-demand rendering.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  let article;
  try {
    article = getArticleBySlug(locale as Locale, slug);
  } catch {
    return {};
  }

  return {
    title: article.title,
    description: article.summary,
    alternates: buildAlternates(locale as Locale, `/research/${slug}`),
    openGraph: buildOpenGraph(locale as Locale, {
      title: article.title,
      description: article.summary,
    }),
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("research");

  let article;
  try {
    article = getArticleBySlug(locale, slug);
  } catch {
    notFound();
  }

  const tagLabels: Record<string, string> = {
    macro: t("tags.macro"),
    "market-structure": t("tags.market-structure"),
    quant: t("tags.quant"),
    web3: t("tags.web3"),
    review: t("tags.review"),
    essay: t("tags.essay"),
  };

  return (
    <main className="mx-auto max-w-5xl flex-1 px-6 py-20">
      <Link
        href="/research"
        className="font-mono text-xs text-foreground-muted hover:text-accent"
      >
        {t("backToList")}
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
        <article>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-foreground-muted">
            <time dateTime={article.date}>
              {formatDate(article.date, locale)}
            </time>
            <span>·</span>
            <span>
              {article.readingMinutes} {t("minRead")}
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

          <h1 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">
            {article.title}
          </h1>

          <div className="prose-article mt-8">
            <MDXRemote
              source={article.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  ],
                },
              }}
            />
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Toc headings={article.headings} label={t("tableOfContents")} />
          </div>
        </aside>
      </div>
    </main>
  );
}

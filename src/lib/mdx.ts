import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import type { Locale } from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type ResearchTag =
  | "macro"
  | "market-structure"
  | "quant"
  | "web3"
  | "review"
  | "essay";

const CATEGORY_ALIASES: Record<string, ResearchTag> = {
  宏观经济: "macro",
  市场结构: "market-structure",
  量化研究: "quant",
  复盘: "review",
  随笔: "essay",
};

const VALID_TAGS: ResearchTag[] = [
  "macro",
  "market-structure",
  "quant",
  "web3",
  "review",
  "essay",
];

/** Accepts either the Chinese category label or the English slug directly. */
function normalizeCategory(raw: string): ResearchTag {
  const trimmed = raw.trim();
  if (CATEGORY_ALIASES[trimmed]) return CATEGORY_ALIASES[trimmed];
  const lower = trimmed.toLowerCase();
  if ((VALID_TAGS as string[]).includes(lower)) return lower as ResearchTag;
  return "review";
}

interface RawFrontmatter {
  title: string;
  date: string;
  lang: Locale;
  category: string;
  summary: string;
  author?: string;
  featured?: boolean;
  /** Excluded from every listing, static param, and direct route — see getArticleSlugs. */
  draft?: boolean;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: ResearchTag[];
  featured: boolean;
  readingMinutes: number;
}

export interface Heading {
  id: string;
  text: string;
  depth: number;
}

export interface Article extends ArticleMeta {
  content: string;
  headings: Heading[];
}

function contentDir(locale: Locale): string {
  return path.join(CONTENT_ROOT, locale, "research");
}

function readArticleFile(locale: Locale, slug: string) {
  const filePath = path.join(contentDir(locale), `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return matter(raw);
}

function toMeta(slug: string, data: RawFrontmatter, content: string): ArticleMeta {
  return {
    slug,
    title: data.title,
    date: data.date,
    summary: data.summary,
    tags: [normalizeCategory(data.category)],
    featured: Boolean(data.featured),
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

/**
 * Slugs for publishable articles only. Anything with `draft: true` in its
 * frontmatter is excluded here — which means it's excluded from listings,
 * from generateStaticParams, and (combined with `dynamicParams = false` on
 * the article page) from being reachable by URL at all. Some drafts contain
 * unpublished personal content pending another person's consent; this is a
 * hard gate, not just a UI filter.
 */
export function getArticleSlugs(locale: Locale): string[] {
  const dir = contentDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .filter((slug) => {
      const { data } = readArticleFile(locale, slug);
      return !(data as RawFrontmatter).draft;
    });
}

export function getArticleBySlug(locale: Locale, slug: string): Article {
  const { data, content } = readArticleFile(locale, slug);
  const frontmatter = data as RawFrontmatter;

  if (frontmatter.draft) {
    throw new Error(`Article "${slug}" is a draft and cannot be rendered.`);
  }

  return {
    ...toMeta(slug, frontmatter, content),
    content,
    headings: extractHeadings(content),
  };
}

export function getAllArticles(
  locale: Locale,
  tag?: ResearchTag,
): ArticleMeta[] {
  const slugs = getArticleSlugs(locale);

  const articles = slugs.map((slug) => {
    const { data, content } = readArticleFile(locale, slug);
    return toMeta(slug, data as RawFrontmatter, content);
  });

  const filtered = tag ? articles.filter((a) => a.tags.includes(tag)) : articles;

  return filtered.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const lines = markdown.split("\n");
  const headings: Heading[] = [];

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.*)$/.exec(line.trim());
    if (!match) continue;
    const depth = match[1].length;
    const text = match[2].trim();
    headings.push({ id: slugger.slug(text), text, depth });
  }

  return headings;
}

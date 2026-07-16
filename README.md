# PraxeoSys — Johnny's personal site

"I read markets through economics, test beliefs with code, and settle them with trades."

Production personal site built on Next.js App Router + TypeScript + Tailwind CSS v4, with a bilingual (EN/ZH) "Quiet Terminal" design: editorial-minimal skeleton, terminal-style data panels for anything verifiable (GitHub activity, strategy performance, on-chain identity).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to your browser's preferred locale (`/en` or `/zh`).

```bash
npm run build   # production build
npm run start   # serve the production build locally
npm run lint     # eslint
```

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in [Vercel](https://vercel.com/new) — no special configuration needed, it's a standard Next.js App Router project.
3. Set the production domain to `praxeosys.com` (already assumed in `data/site-config.ts` → `url`) in Vercel's Project → Domains settings.
4. Deploy. The GitHub contributions panel and strategy-performance panel (if enabled) use ISR (`revalidate` in `src/lib/github.ts`), so no extra cron/webhook setup is required — they refresh automatically.

## Content update guide

**You should only ever need to edit `data/` and `content/` — never the files under `src/components` or `src/app`.**

| What you want to change | Where |
|---|---|
| Name, brand, domain, GitHub username | `data/site-config.ts` |
| X/Twitter, Telegram, email, ENS/wallet address | `data/site-config.ts` → `social` / `onchain` (empty string hides that card/link) |
| Hero narrative sentence, nav labels, all UI copy | `messages/en.json` and `messages/zh.json` (keep both files' keys in sync). `hero.narrative` contains `<thesis>`/`<code>`/`<trade>` tags around 3 words — these drive the scroll-triggered keyword highlight into The Loop; keep the tags, just edit the words/wording inside and around them. |
| "Now" section (focus / researching / watching) | `data/now.json` — also bump `updatedAt` |
| The Loop's four node descriptions + links | `data/loop-nodes.ts` |
| Projects (cards + expandable archive drawer on homepage + `/projects` archive) | `data/projects.ts` — set `featured: true` for the first 3–5 you want on the homepage; `status: "todo"` shows a TODO badge. Each project also needs `direction` (vision/roadmap/milestones), `progress` (status/metrics), and `skills` (string tags) — these fill the drawer's 01/02/03 panels. |
| Strategy performance panel | `data/performance.json` — flip `enabled` to `true` once you have a real, defensible track record; replace the `series`/`metrics` with real data |
| Research articles (the digital garden) | `content/en/research/*.mdx` and `content/zh/research/*.mdx` |

### Writing a research article

Add a new `.mdx` file under `content/<locale>/research/`. Frontmatter:

```yaml
---
title: "Article title"
date: "2026-07-16"       # YYYY-MM-DD
lang: "en"                # or "zh"
category: "macro"         # macro | market-structure | quant | web3 | review | essay
                           # (Chinese labels also accepted: 宏观经济/市场结构/量化研究/复盘/随笔)
summary: "One or two sentences shown in the article list."
featured: true             # optional — pins this article to the top of listings
draft: true                 # optional — completely excludes the article from every
                             # listing, sitemap, and route (404s even by direct URL).
                             # Use this for anything not yet ready to publish, especially
                             # posts involving another real person's private life —
                             # get their consent before flipping this to false/removing it.
---
```

The article body is plain MDX (headings, code blocks, tables via GFM, images). `##`/`###` headings automatically get anchor links and populate the table of contents.

An article doesn't need a translated counterpart in the other locale — it's fine for `content/zh/research/` and `content/en/research/` to hold a different set of articles.

## Project structure

```
data/                   ← edit this
content/{en,zh}/research/  ← edit this
messages/{en,zh}.json   ← edit this (UI copy)
src/
  app/[locale]/         routes (home, /projects, /research, /research/[slug])
  components/           by module (hero, loop, proof, projects, research, now, contact, layout, ui)
  lib/                  mdx parsing, GitHub API, SEO helpers, time/locale utils
  i18n/                 next-intl routing/navigation config
```

## Engineering notes

- **i18n**: `next-intl`, locale-prefixed routes (`/en`, `/zh`), default locale negotiated from the browser via middleware.
- **Content**: MDX via `next-mdx-remote/rsc` + `gray-matter`, no CMS.
- **Charts**: hand-rolled SVG (no charting library) for the equity curve and GitHub heatmap.
- **Theme**: dark-by-default "Quiet Terminal" theme with a light-mode toggle; the deep-charcoal terminal panels (Proof, Now, Contact) intentionally stay dark in both themes.
- **SEO**: per-page metadata, self-referencing canonical + full hreflang map (including `x-default`), dynamic OG images via `next/og`, `sitemap.ts`, `robots.ts`.

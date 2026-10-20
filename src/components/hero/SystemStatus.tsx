import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@data/site-config";
import { getContributions, getLatestCommitAt } from "@/lib/github";
import { getAllArticles } from "@/lib/mdx";
import { getBtcAgentSnapshot } from "@/lib/system-status";
import { formatDate, formatRelativeTime } from "@/lib/time";
import type { Locale } from "@/lib/types";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { ContributionGrid } from "@/components/proof/ContributionGrid";

export async function SystemStatus() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("status");
  const agent = getBtcAgentSnapshot();
  const articles = getAllArticles(locale);
  const latestArticle = articles.reduce<(typeof articles)[number] | null>(
    (latest, article) => (!latest || article.date > latest.date ? article : latest),
    null,
  );
  const [github, latestCommitAt] = await Promise.all([
    getContributions(siteConfig.github),
    getLatestCommitAt(siteConfig.github),
  ]);

  const githubLabel = github
    ? `${github.totalContributions} ${t("contributions")}`
    : t("unavailable");

  return (
    <section
      id="status"
      aria-label={t("title")}
      className="rounded-panel border border-panel-border bg-panel-background text-panel-foreground shadow-[0_24px_70px_-36px_rgba(0,0,0,0.65)]"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-panel-border px-4 py-3 sm:px-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          {t("title")}
        </p>
        {agent ? (
          <p className="font-mono text-[11px] text-panel-foreground/55">
            {t("asOf", { date: agent.asOf })}
          </p>
        ) : null}
      </div>

      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <p className="max-w-xl text-sm leading-relaxed text-panel-foreground/65">
          {t("notLive")}
        </p>

        {agent ? (
          <div className="mt-5 grid gap-5 border-t border-panel-border pt-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
            <div>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-panel-foreground/50">
                  {t("agent")}
                </h3>
                <span className="font-mono text-xs text-accent">
                  {t("versionLine", {
                    method: agent.methodology,
                    scoring: agent.scoring,
                  })}
                </span>
              </div>
              <p className="mt-2 font-serif text-2xl text-panel-foreground sm:text-3xl">
                {t("agentState")}
              </p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-panel-foreground/70">
                {t("agentDetail")}
              </p>
              <Link
                href="/projects#btc-trader-agent"
                className="link-underline mt-3 inline-block font-mono text-xs text-accent"
              >
                {t("openAgent")}
              </Link>
            </div>

            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-panel-foreground/50">
                {t("forecasts")}
              </h3>
              <dl className="mt-3">
                <div>
                  <dd className="font-mono text-2xl tabular-nums text-accent sm:text-3xl">
                    <AnimatedNumber value={agent.logged} />
                  </dd>
                  <dt className="mt-1 font-mono text-[10px] uppercase tracking-wider text-panel-foreground/50">
                    {t("logged")}
                  </dt>
                </div>
                {agent.horizons.map((horizon) => (
                  <div
                    key={horizon.id}
                    className="mt-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-t border-panel-border pt-3"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-panel-foreground/50">
                      {t(horizon.id === "24h" ? "horizon24h" : "horizon7d")}
                    </dt>
                    <dd className="font-mono text-sm tabular-nums text-panel-foreground">
                      {horizon.hits}/{horizon.scored}
                      <span className="text-panel-foreground/45">
                        {" "}
                        · {t("baseline")} {horizon.baselineHits}/{horizon.baselineScored}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 font-mono text-[11px] leading-relaxed text-panel-foreground/45">
                {t("baselineNote", { count: agent.brierN })}
              </p>
            </div>
          </div>
        ) : null}

        <div className="mt-5 grid gap-5 border-t border-panel-border pt-5 sm:grid-cols-2">
          {articles.length > 0 ? (
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-panel-foreground/50">
                {t("research")}
              </h3>
              <p className="mt-2 font-mono text-2xl tabular-nums text-panel-foreground sm:text-3xl">
                <AnimatedNumber value={articles.length} />
              </p>
              <p className="mt-1 text-sm text-panel-foreground/65">{t("researchScope")}</p>
              {latestArticle ? (
                <p className="mt-1 font-mono text-[11px] text-panel-foreground/45">
                  {t("latest", { date: formatDate(latestArticle.date, locale) })}
                </p>
              ) : null}
              <Link
                href="/research"
                className="link-underline mt-3 inline-block font-mono text-xs text-accent"
              >
                {t("openResearch")}
              </Link>
            </div>
          ) : null}

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-panel-foreground/50">
              {t("github")}
            </h3>
            {github ? (
              <>
                <p className="mt-2 font-mono text-2xl tabular-nums text-accent sm:text-3xl">
                  <AnimatedNumber value={github.totalContributions} />
                </p>
                <p className="mt-1 text-sm text-panel-foreground/65">
                  {t("contributions")}
                  <span className="text-panel-foreground/35"> · </span>
                  <AnimatedNumber value={github.activeWeeks} /> {t("activeWeeks")}
                </p>
                <div className="mt-3 overflow-x-auto pb-1">
                  <ContributionGrid
                    days={github.days}
                    label={githubLabel}
                    cell={8}
                    maxWeeks={20}
                  />
                </div>
                <p className="mt-2 font-mono text-[11px] text-panel-foreground/45">
                  {t("githubScope")}
                </p>
              </>
            ) : (
              <p className="mt-2 font-mono text-sm text-panel-foreground/55">
                {t("unavailable")}
              </p>
            )}
            <a
              href={`https://github.com/${siteConfig.github}`}
              target="_blank"
              rel="noreferrer"
              className="link-underline mt-3 inline-block font-mono text-xs text-accent"
            >
              {t("openGithub")}
            </a>
            {latestCommitAt ? (
              <p className="mt-2 font-mono text-[11px] text-panel-foreground/45">
                {t("push")}: {formatRelativeTime(latestCommitAt, locale)}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SystemStatusFallback() {
  const blocks = ["w-40", "w-64", "w-full"];
  return (
    <div
      aria-hidden
      className="rounded-panel border border-panel-border bg-panel-background px-5 py-6"
    >
      <div className="space-y-3">
        {blocks.map((width) => (
          <div
            key={width}
            className={`status-skeleton h-3 rounded ${width} bg-panel-foreground/10`}
          />
        ))}
      </div>
    </div>
  );
}

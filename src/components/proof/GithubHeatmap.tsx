import { getTranslations } from "next-intl/server";
import { getContributions } from "@/lib/github";
import { siteConfig } from "@data/site-config";
import { Panel } from "@/components/ui/Panel";
import { Metric } from "@/components/ui/Metric";
import { BootFrame } from "@/components/ui/BootFrame";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { ContributionGrid } from "./ContributionGrid";

export async function GithubHeatmap() {
  const t = await getTranslations("proof.github");
  const data = await getContributions(siteConfig.github);
  const label = data
    ? `${data.totalContributions} ${t("totalCommits")}`
    : t("error");

  return (
    <BootFrame>
      <Panel title={t("title")}>
        {!data ? (
          <p className="font-mono text-sm text-panel-foreground/60">{t("error")}</p>
        ) : (
          <>
            <div className="overflow-x-auto pb-2">
              <ContributionGrid days={data.days} label={label} />
            </div>

            <div className="mt-4 flex flex-wrap gap-8">
              <Metric
                label={t("totalCommits")}
                value={<AnimatedNumber value={data.totalContributions} />}
                accent
              />
              <Metric
                label={t("activeWeeks")}
                value={<AnimatedNumber value={data.activeWeeks} />}
              />
            </div>
            <p className="mt-4 max-w-md font-mono text-[11px] leading-relaxed text-panel-foreground/50">
              {t("scope")}
            </p>

            <a
              href={`https://github.com/${siteConfig.github}`}
              target="_blank"
              rel="noreferrer"
              className="link-underline mt-4 inline-block font-mono text-xs text-accent"
            >
              {t("viewProfile")}
            </a>
          </>
        )}
      </Panel>
    </BootFrame>
  );
}

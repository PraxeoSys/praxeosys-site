import { getTranslations } from "next-intl/server";
import { getContributions, type ContributionDay } from "@/lib/github";
import { siteConfig } from "@data/site-config";
import { Panel } from "@/components/ui/Panel";
import { Metric } from "@/components/ui/Metric";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

function buildWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (days.length === 0) return [];

  const first = new Date(`${days[0].date}T00:00:00Z`);
  const firstDayOfWeek = first.getUTCDay(); // 0 = Sunday

  const padded: (ContributionDay | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...days,
  ];

  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  return weeks;
}

function levelClass(level: ContributionDay["level"]): string {
  switch (level) {
    case 0:
      return "bg-panel-foreground/[0.08]";
    case 1:
      return "bg-accent/25";
    case 2:
      return "bg-accent/50";
    case 3:
      return "bg-accent/75";
    default:
      return "bg-accent";
  }
}

export async function GithubHeatmap() {
  const t = await getTranslations("proof.github");
  const data = await getContributions(siteConfig.github);
  const weeks = data ? buildWeeks(data.days) : [];

  return (
    <Panel title={t("title")}>
      {!data ? (
        <p className="font-mono text-sm text-panel-foreground/60">
          {t("error")}
        </p>
      ) : (
        <>
          <div className="overflow-x-auto pb-2">
            <div
              className="grid w-max grid-flow-col gap-[3px]"
              style={{ gridTemplateRows: "repeat(7, 10px)" }}
            >
              {weeks.flatMap((week, wi) =>
                week.map((day, di) => (
                  <div
                    key={`${wi}-${di}`}
                    className={`h-[10px] w-[10px] rounded-[2px] ${
                      day ? levelClass(day.level) : "bg-transparent"
                    }`}
                    title={day ? `${day.date}: ${day.count}` : undefined}
                  />
                )),
              )}
            </div>
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

          <a
            href={`https://github.com/${siteConfig.github}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-mono text-xs text-accent hover:underline"
          >
            {t("viewProfile")}
          </a>
        </>
      )}
    </Panel>
  );
}

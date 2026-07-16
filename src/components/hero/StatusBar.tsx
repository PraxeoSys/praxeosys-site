import { getTranslations, getLocale } from "next-intl/server";
import { getLatestCommitAt } from "@/lib/github";
import { formatRelativeTime } from "@/lib/time";
import { siteConfig } from "@data/site-config";
import nowData from "@data/now.json";
import type { Locale } from "@/lib/types";

export async function StatusBar() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("hero");
  const latestCommitAt = await getLatestCommitAt(siteConfig.github);

  const focus = nowData[locale].focus;
  const watching = nowData[locale].watching;

  const githubStatus = latestCommitAt
    ? formatRelativeTime(latestCommitAt, locale)
    : t("statusLoading");

  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-panel-foreground/70 sm:text-sm">
      <span className="text-accent">&gt;</span>
      <span>
        {t("statusNow")}: {focus}
      </span>
      <span className="text-panel-foreground/30">|</span>
      <span>
        {t("statusGithub")}: {githubStatus}
      </span>
      <span className="text-panel-foreground/30">|</span>
      <span>
        {t("statusMarkets")}: {t("statusWatching")} {watching}
      </span>
    </p>
  );
}

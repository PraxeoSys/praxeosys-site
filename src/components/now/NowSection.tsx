import { getTranslations, getLocale } from "next-intl/server";
import nowData from "@data/now.json";
import { formatDate } from "@/lib/time";
import type { Locale } from "@/lib/types";
import { Panel } from "@/components/ui/Panel";

export async function NowSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("now");
  const data = nowData[locale];

  return (
    <div id="now">
      <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
        {t("heading")}
      </h2>
      <p className="mt-2 max-w-2xl text-foreground-muted">{t("subheading")}</p>

      <div className="mt-10">
        <Panel>
          <dl className="space-y-4">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-panel-foreground/50">
                {t("focus")}
              </dt>
              <dd className="mt-1 text-panel-foreground">{data.focus}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-panel-foreground/50">
                {t("researching")}
              </dt>
              <dd className="mt-1 text-panel-foreground">
                {data.researching}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-panel-foreground/50">
                {t("watching")}
              </dt>
              <dd className="mt-1 text-panel-foreground">{data.watching}</dd>
            </div>
          </dl>
          <p className="mt-6 font-mono text-[11px] text-panel-foreground/40">
            {t("updatedAt")}: {formatDate(nowData.updatedAt, locale)}
          </p>
        </Panel>
      </div>
    </div>
  );
}

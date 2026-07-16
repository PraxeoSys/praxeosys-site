import { getTranslations } from "next-intl/server";
import { performanceData } from "@data/performance";
import { Panel } from "@/components/ui/Panel";
import { Metric } from "@/components/ui/Metric";
import { BootFrame } from "@/components/ui/BootFrame";
import { EquityCurve } from "./EquityCurve";

/**
 * Renders nothing when performanceData.enabled is false (see data/performance.ts
 * for why: no unverifiable performance claims on this site). The Proof grid's
 * GitHub card is full-width by design, so hiding this panel doesn't leave a gap.
 */
export async function PerformancePanel() {
  if (!performanceData.enabled) return null;

  const t = await getTranslations("proof.performance");

  return (
    <BootFrame>
      <Panel title={t("title")}>
        <EquityCurve
          series={performanceData.series}
          equityLabel={t("equity")}
          benchmarkLabel={t("benchmark")}
        />

        <div className="mt-5 flex flex-wrap gap-8">
          <Metric label={t("sharpe")} value={performanceData.metrics.sharpe.toFixed(2)} accent />
          <Metric
            label={t("maxDrawdown")}
            value={`${performanceData.metrics.maxDrawdownPct.toFixed(1)}%`}
          />
          <Metric
            label={t("runtime")}
            value={`${performanceData.metrics.runtimeDays} ${t("days")}`}
          />
        </div>

        <p className="mt-4 font-mono text-[11px] text-panel-foreground/50">
          {t("disclaimer")}
        </p>
      </Panel>
    </BootFrame>
  );
}

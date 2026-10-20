import { projects } from "@data/projects";

/**
 * Published BTC-agent snapshot, read from the project metrics already in
 * data/projects.ts. Nothing here is a live heartbeat. If the labels stop
 * sharing one YYYY-MM-DD, or the values stop parsing, the caller hides the
 * cells instead of inventing a number.
 */
export interface HorizonScore {
  id: "24h" | "7d";
  hits: number;
  scored: number;
  baselineHits: number;
  baselineScored: number;
}

export interface AgentSnapshot {
  asOf: string;
  logged: number;
  methodology: string;
  scoring: string;
  horizons: HorizonScore[];
  brierN: number;
}

function agentMetrics() {
  return projects.find((project) => project.slug === "btc-trader-agent")?.progress.metrics;
}

function metricByPrefix(prefix: string) {
  return agentMetrics()?.find((item) => item.label.en.startsWith(prefix)) ?? null;
}

function asOfFrom(prefix: string): string | null {
  return metricByPrefix(prefix)?.label.en.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? null;
}

function datedInteger(prefix: string): { asOf: string; value: number } | null {
  const metric = metricByPrefix(prefix);
  if (!metric) return null;
  const asOf = metric.label.en.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  const value = Number(metric.value);
  if (!asOf || !Number.isInteger(value) || value < 0) return null;
  return { asOf, value };
}

function datedRatio(prefix: string): { asOf: string; hits: number; scored: number } | null {
  const metric = metricByPrefix(prefix);
  if (!metric) return null;
  const asOf = metric.label.en.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  const parts = metric.value.split("/").map((part) => Number(part.trim()));
  if (
    !asOf ||
    parts.length !== 2 ||
    parts.some((part) => !Number.isInteger(part) || part < 0)
  ) {
    return null;
  }
  return { asOf, hits: parts[0], scored: parts[1] };
}

export function getBtcAgentSnapshot(): AgentSnapshot | null {
  const logged = datedInteger("Forecasts logged");
  const brier = datedInteger("Brier scores");
  const day = datedRatio("24h direction hits");
  const dayBaseline = datedRatio("24h always-range baseline");
  const week = datedRatio("7d direction hits");
  const weekBaseline = datedRatio("7d always-range baseline");
  const versionMetric = metricByPrefix("Methodology / scoring version");
  const versionDate = asOfFrom("Methodology / scoring version");
  if (!logged || !brier || !day || !dayBaseline || !week || !weekBaseline || !versionMetric || !versionDate) {
    return null;
  }

  const dates = [
    logged.asOf,
    brier.asOf,
    day.asOf,
    dayBaseline.asOf,
    week.asOf,
    weekBaseline.asOf,
    versionDate,
  ];
  if (dates.some((date) => date !== logged.asOf)) return null;

  const versions = versionMetric.value.split("/").map((part) => part.trim());
  if (versions.length !== 2 || versions.some((part) => part.length === 0)) return null;

  return {
    asOf: logged.asOf,
    logged: logged.value,
    methodology: versions[0],
    scoring: versions[1],
    brierN: brier.value,
    horizons: [
      {
        id: "24h",
        hits: day.hits,
        scored: day.scored,
        baselineHits: dayBaseline.hits,
        baselineScored: dayBaseline.scored,
      },
      {
        id: "7d",
        hits: week.hits,
        scored: week.scored,
        baselineHits: weekBaseline.hits,
        baselineScored: weekBaseline.scored,
      },
    ],
  };
}

import { projects } from "@data/projects";

/**
 * Published BTC-agent snapshot, read from the project metrics already in
 * data/projects.ts. Nothing here is a live heartbeat. If the labels stop
 * sharing one YYYY-MM-DD, or the values stop parsing, the caller hides the
 * cells instead of inventing a number.
 */
export interface AgentSnapshot {
  asOf: string;
  logged: number;
  scored: number;
  directionHits: number;
  version: string;
}

function datedInteger(prefix: string): { asOf: string; value: number } | null {
  const agent = projects.find((project) => project.slug === "btc-trader-agent");
  const metric = agent?.progress.metrics.find((item) =>
    item.label.en.startsWith(prefix),
  );
  if (!metric) return null;
  const asOf = metric.label.en.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  const value = Number(metric.value);
  if (!asOf || !Number.isInteger(value) || value < 0) return null;
  return { asOf, value };
}

export function getBtcAgentSnapshot(): AgentSnapshot | null {
  const agent = projects.find((project) => project.slug === "btc-trader-agent");
  const logged = datedInteger("Forecasts logged");
  const versionMetric = agent?.progress.metrics.find((item) =>
    item.label.en.startsWith("Trading-system version"),
  );
  const scoredMetric = agent?.progress.metrics.find((item) =>
    item.label.en.startsWith("Scored / direction hits"),
  );
  if (!logged || !versionMetric || !scoredMetric) return null;

  const scoredDate = scoredMetric.label.en.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  const versionDate = versionMetric.label.en.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  if (!scoredDate || !versionDate || scoredDate !== logged.asOf || versionDate !== logged.asOf) {
    return null;
  }

  const parts = scoredMetric.value.split("/").map((part) => Number(part.trim()));
  if (
    parts.length !== 2 ||
    parts.some((part) => !Number.isInteger(part) || part < 0)
  ) {
    return null;
  }

  const version = versionMetric.value.trim();
  if (!version) return null;

  return {
    asOf: logged.asOf,
    logged: logged.value,
    scored: parts[0],
    directionHits: parts[1],
    version,
  };
}

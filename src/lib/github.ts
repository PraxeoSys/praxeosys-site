import { cache } from "react";

const REVALIDATE_SECONDS = 60 * 60 * 24; // daily ISR refresh

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionSummary {
  totalContributions: number;
  activeWeeks: number;
  days: ContributionDay[];
}

function isContributionDay(value: unknown): value is ContributionDay {
  if (!value || typeof value !== "object") return false;
  const day = value as Partial<ContributionDay>;
  return (
    typeof day.date === "string" &&
    typeof day.count === "number" &&
    Number.isFinite(day.count) &&
    (day.level === 0 ||
      day.level === 1 ||
      day.level === 2 ||
      day.level === 3 ||
      day.level === 4)
  );
}

/**
 * Public GitHub contribution calendar via github-contributions-api (no auth token required).
 * Returns null on any failure or unusable payload so the UI can say "unavailable"
 * instead of painting a zero. A successful empty year still returns 0, because that
 * zero is what the calendar actually contains.
 */
export const getContributions = cache(async function getContributions(
  username: string,
): Promise<ContributionSummary | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );

    if (!res.ok) return null;

    const data = (await res.json()) as {
      total?: { lastYear?: number };
      contributions?: unknown[];
    };

    const days = (data.contributions ?? []).filter(isContributionDay);
    // This endpoint returns a full year of days. An empty list is a bad payload,
    // not a person with no public activity.
    if (days.length === 0) return null;

    const fromDays = days.reduce((sum, day) => sum + day.count, 0);
    const reported = data.total?.lastYear;
    const totalContributions =
      typeof reported === "number" && Number.isFinite(reported)
        ? reported === 0 && fromDays > 0
          ? fromDays
          : reported
        : fromDays;

    const weeksWithActivity = new Set(
      days
        .filter((d) => d.count > 0)
        .map((d) => isoWeekKey(new Date(d.date))),
    );

    return {
      totalContributions,
      activeWeeks: weeksWithActivity.size,
      days,
    };
  } catch {
    return null;
  }
});

/** Most recent public event timestamp, used by the system-status panel. */
export const getLatestCommitAt = cache(async function getLatestCommitAt(
  username: string,
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 60 * 60 },
      },
    );

    if (!res.ok) return null;

    const events = (await res.json()) as Array<{
      type: string;
      created_at: string;
    }>;

    const push = events.find((e) => e.type === "PushEvent");
    return push?.created_at ?? events[0]?.created_at ?? null;
  } catch {
    return null;
  }
});

function isoWeekKey(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-${weekNo}`;
}

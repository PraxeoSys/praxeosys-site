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

/**
 * Public GitHub contribution calendar via github-contributions-api (no auth token required).
 * Falls back to null on failure so the UI can degrade gracefully instead of breaking the build.
 */
export async function getContributions(
  username: string,
): Promise<ContributionSummary | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );

    if (!res.ok) return null;

    const data = (await res.json()) as {
      total: Record<string, number>;
      contributions: ContributionDay[];
    };

    const days = data.contributions ?? [];
    const totalContributions = Object.values(data.total ?? {}).reduce(
      (sum, n) => sum + n,
      0,
    );

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
}

/** Most recent public push event timestamp, used for the Hero status bar. */
export async function getLatestCommitAt(
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
}

function isoWeekKey(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-${weekNo}`;
}

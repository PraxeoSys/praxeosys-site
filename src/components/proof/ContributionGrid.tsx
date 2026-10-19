import type { ContributionDay } from "@/lib/github";

function buildWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (days.length === 0) return [];

  const first = new Date(`${days[0].date}T00:00:00Z`);
  const firstDayOfWeek = first.getUTCDay();
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
      return "bg-accent/30";
    case 2:
      return "bg-accent/55";
    case 3:
      return "bg-accent/80";
    default:
      return "bg-accent";
  }
}

export function ContributionGrid({
  days,
  label,
  cell = 10,
  maxWeeks,
}: {
  days: ContributionDay[];
  label: string;
  cell?: number;
  maxWeeks?: number;
}) {
  const allWeeks = buildWeeks(days);
  const weeks = maxWeeks ? allWeeks.slice(-maxWeeks) : allWeeks;

  return (
    <div
      role="img"
      aria-label={label}
      className="grid w-max grid-flow-col gap-[3px]"
      style={{ gridTemplateRows: `repeat(7, ${cell}px)` }}
    >
      {weeks.flatMap((week, wi) =>
        week.map((day, di) => (
          <div
            key={`${wi}-${di}`}
            className={`rounded-[2px] ${day ? levelClass(day.level) : "bg-transparent"}`}
            style={{ width: cell, height: cell }}
            title={day ? `${day.date}: ${day.count}` : undefined}
          />
        )),
      )}
    </div>
  );
}

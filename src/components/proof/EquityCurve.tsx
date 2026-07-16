import type { PerformancePoint } from "@data/performance";

interface EquityCurveProps {
  series: PerformancePoint[];
  equityLabel: string;
  benchmarkLabel: string;
}

const WIDTH = 600;
const HEIGHT = 200;
const PADDING = 8;

function buildPath(values: number[], min: number, max: number): string {
  const range = max - min || 1;
  return values
    .map((v, i) => {
      const x = PADDING + (i / (values.length - 1)) * (WIDTH - PADDING * 2);
      const y =
        HEIGHT -
        PADDING -
        ((v - min) / range) * (HEIGHT - PADDING * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

export function EquityCurve({
  series,
  equityLabel,
  benchmarkLabel,
}: EquityCurveProps) {
  const equity = series.map((p) => p.equity);
  const benchmark = series.map((p) => p.benchmark);
  const all = [...equity, ...benchmark];
  const min = Math.min(...all);
  const max = Math.max(...all);

  return (
    <div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-40 w-full sm:h-52"
        preserveAspectRatio="none"
        role="img"
        aria-label={`${equityLabel} vs ${benchmarkLabel}`}
      >
        <path
          d={buildPath(benchmark, min, max)}
          fill="none"
          stroke="currentColor"
          className="text-panel-foreground/30"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <path
          d={buildPath(equity, min, max)}
          fill="none"
          stroke="currentColor"
          className="text-accent"
          strokeWidth="2"
        />
      </svg>
      <div className="mt-3 flex gap-5 font-mono text-[11px] text-panel-foreground/60">
        <span className="flex items-center gap-1.5">
          <span className="h-[2px] w-3 bg-accent" /> {equityLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-[2px] w-3 border-t border-dashed border-panel-foreground/40" />{" "}
          {benchmarkLabel}
        </span>
      </div>
    </div>
  );
}

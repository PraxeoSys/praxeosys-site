import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface MetricProps {
  label: ReactNode;
  value: ReactNode;
  accent?: boolean;
  className?: string;
}

/** A single terminal-style stat tile: mono value, muted label. */
export function Metric({ label, value, accent, className }: MetricProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="font-mono text-[11px] uppercase tracking-wider text-panel-foreground/50">
        {label}
      </span>
      <span
        className={cn(
          "font-mono text-2xl tabular-nums",
          accent ? "text-accent" : "text-panel-foreground",
        )}
      >
        {value}
      </span>
    </div>
  );
}

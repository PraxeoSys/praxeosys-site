import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PanelProps {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  as?: "div" | "section" | "article";
}

/** Dark terminal-style data panel — used for Proof/Now data modules regardless of light/dark theme. */
export function Panel({ children, className, title, as = "div" }: PanelProps) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "rounded-panel border border-panel-border bg-panel-background text-panel-foreground",
        className,
      )}
    >
      {title ? (
        <div className="flex items-center gap-2 border-b border-panel-border px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-panel-foreground/60">
          {title}
        </div>
      ) : null}
      <div className="p-4">{children}</div>
    </Tag>
  );
}

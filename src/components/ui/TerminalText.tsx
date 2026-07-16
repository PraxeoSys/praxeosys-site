import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TerminalTextProps {
  prompt?: string;
  children: ReactNode;
  className?: string;
}

/** Renders `prompt` in accent color followed by mono body text, e.g. "> now: ..." or "$ connect --via x". */
export function TerminalText({ prompt = ">", children, className }: TerminalTextProps) {
  return (
    <p className={cn("font-mono text-sm leading-relaxed", className)}>
      <span className="text-accent">{prompt}</span>{" "}
      <span className="text-foreground-muted">{children}</span>
    </p>
  );
}

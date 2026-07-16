"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/useInView";

const ORDER = ["thesis", "code", "trade"] as const;

interface KeywordEchoProps {
  id: (typeof ORDER)[number];
  children: ReactNode;
}

/**
 * Act1->Act2 transition (fallback design, see plan): highlights the Hero's
 * narrative keywords in sequence, echoing the Loop diagram's node light-up
 * just below. Driven by a rootMargin'd useInView (fires once the keyword
 * has scrolled up near the top of the screen, not immediately on load just
 * because Hero is above the fold) + a plain CSS color/underline transition
 * — color isn't a layout-triggering property, and this needs two different
 * target colors per theme (light/dark), which is simplest as a conditional
 * Tailwind class rather than a motion-interpolated value.
 */
export function KeywordEcho({ id, children }: KeywordEchoProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({
    threshold: 0,
    rootMargin: "0px 0px -75% 0px",
  });
  const delay = ORDER.indexOf(id) * 0.08;

  return (
    <span
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={cn(
        "underline decoration-2 underline-offset-4 transition-colors duration-300",
        inView
          ? "text-accent-ink decoration-accent-ink dark:text-accent dark:decoration-accent"
          : "text-foreground decoration-transparent",
      )}
    >
      {children}
    </span>
  );
}

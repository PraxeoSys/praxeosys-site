"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface ChapterRailEntry {
  id: string;
  sectionId: string;
  label: string;
}

interface ChapterRailProps {
  entries: ChapterRailEntry[];
  ariaLabel: string;
}

/**
 * Desktop-only fixed left rail, e.g. "[01/05] whoami". Highlights the
 * currently-active act via a single shared IntersectionObserver watching
 * all section elements at once (not one observer per section). Entries are
 * bare <a href="#id"> tags on purpose — never next-intl's Link, never the
 * {pathname, hash} object form (that form is Pages-Router-only in this
 * Next.js version and silently fails to navigate — see commit 751ee42).
 * A bare anchor gets the site's existing global scroll-behavior: smooth
 * (+ reduced-motion override) for free, with zero extra JS.
 */
export function ChapterRail({ entries, ariaLabel }: ChapterRailProps) {
  const [activeId, setActiveId] = useState<string>(entries[0]?.id ?? "");

  useEffect(() => {
    const targets = entries
      .map((entry) => ({
        id: entry.id,
        node: document.getElementById(entry.sectionId),
      }))
      .filter(
        (t): t is { id: string; node: HTMLElement } => t.node !== null,
      );

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (observedEntries) => {
        for (const observed of observedEntries) {
          if (!observed.isIntersecting) continue;
          const match = targets.find((t) => t.node === observed.target);
          if (match) setActiveId(match.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    for (const target of targets) observer.observe(target.node);
    return () => observer.disconnect();
  }, [entries]);

  return (
    <nav
      aria-label={ariaLabel}
      className="fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-4 lg:flex"
    >
      {entries.map((entry, i) => {
        const isActive = entry.id === activeId;
        return (
          <a
            key={entry.id}
            href={`#${entry.sectionId}`}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "font-mono text-[11px] uppercase tracking-wider transition-colors duration-150",
              isActive
                ? "text-accent"
                : "text-foreground-muted hover:text-foreground",
            )}
          >
            [{String(i + 1).padStart(2, "0")}/{String(entries.length).padStart(2, "0")}] {entry.label}
          </a>
        );
      })}
    </nav>
  );
}

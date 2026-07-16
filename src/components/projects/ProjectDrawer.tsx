"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { Project } from "@data/projects";
import type { Locale } from "@/lib/types";
import { cn } from "@/lib/cn";
import { transitions } from "@/lib/motion";

const TABS = ["direction", "progress", "skills"] as const;
type TabId = (typeof TABS)[number];

export interface DrawerLabels {
  tabsAriaLabel: string;
  /** Raw template string containing a literal "{title}" token, interpolated here. */
  regionLabelTemplate: string;
  tabs: Record<TabId, string>;
  vision: string;
  roadmap: string;
  milestones: string;
  milestoneStatus: Record<"done" | "in-progress" | "planned", string>;
  currentStatus: string;
  metrics: string;
  skillsHeading: string;
}

interface ProjectDrawerProps {
  project: Project;
  locale: Locale;
  labels: DrawerLabels;
  onClose: () => void;
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

/**
 * Three-panel horizontal archive drawer (Direction / Progress / Skills).
 * Desktop: tab-click or drag switches panels, track is overflow-hidden so
 * there is no horizontal scroll container for the mouse wheel to hijack —
 * wheel events have no horizontal-scroll code path here at all, so vertical
 * page scroll is physically unaffected, not just "not prevented."
 * Mobile: native overflow-x-auto + scroll-snap, drag disabled so touch and
 * motion's drag never fight.
 */
export function ProjectDrawer({
  project,
  locale,
  labels,
  onClose,
}: ProjectDrawerProps) {
  const [active, setActive] = useState(0);
  const trackWrapRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  function go(next: number) {
    setActive(Math.max(0, Math.min(TABS.length - 1, next)));
  }

  const regionLabel = labels.regionLabelTemplate.replace(
    "{title}",
    project.title[locale],
  );

  return (
    <div className="mt-4 rounded-panel border border-panel-border bg-panel-background">
      <div
        role="tablist"
        aria-label={labels.tabsAriaLabel}
        className="flex gap-1 border-b border-panel-border px-2 pt-2"
      >
        {TABS.map((tab, i) => (
          <button
            key={tab}
            type="button"
            role="tab"
            id={`${project.slug}-tab-${tab}`}
            aria-selected={active === i}
            aria-controls={`${project.slug}-panel-${tab}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => go(i)}
            className={cn(
              "rounded-t-panel px-3 py-2 font-mono text-xs transition-colors duration-150",
              active === i
                ? "text-accent"
                : "text-panel-foreground/50 hover:text-panel-foreground/80",
            )}
          >
            {labels.tabs[tab]}
          </button>
        ))}
      </div>

      <div
        ref={trackWrapRef}
        role="region"
        aria-label={regionLabel}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(active + 1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(active - 1);
          } else if (e.key === "Escape") {
            e.preventDefault();
            onClose();
          }
        }}
        className="relative overflow-x-auto overflow-y-hidden sm:overflow-x-hidden [scroll-snap-type:x_mandatory] sm:[scroll-snap-type:none]"
      >
        <motion.div
          className="flex"
          drag={isDesktop ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          animate={{ x: `-${active * 80}%` }}
          transition={transitions.drawer}
          onDragEnd={(_, info) => {
            const threshold = 60;
            if (info.offset.x < -threshold || info.velocity.x < -400) {
              go(active + 1);
            } else if (info.offset.x > threshold || info.velocity.x > 400) {
              go(active - 1);
            }
          }}
        >
          <DirectionPanel project={project} locale={locale} labels={labels} />
          <ProgressPanel project={project} locale={locale} labels={labels} />
          <SkillsPanel project={project} labels={labels} />
        </motion.div>
      </div>
    </div>
  );
}

function DirectionPanel({
  project,
  locale,
  labels,
}: {
  project: Project;
  locale: Locale;
  labels: DrawerLabels;
}) {
  return (
    <div
      role="tabpanel"
      id={`${project.slug}-panel-direction`}
      aria-labelledby={`${project.slug}-tab-direction`}
      className="w-[80%] shrink-0 space-y-4 p-4 [scroll-snap-align:start] sm:w-[80%]"
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-wider text-panel-foreground/50">
          {labels.vision}
        </p>
        <p className="mt-1 text-sm text-panel-foreground">
          {project.direction.vision[locale]}
        </p>
      </div>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-wider text-panel-foreground/50">
          {labels.roadmap}
        </p>
        <p className="mt-1 text-sm text-panel-foreground">
          {project.direction.roadmap[locale]}
        </p>
      </div>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-wider text-panel-foreground/50">
          {labels.milestones}
        </p>
        <ul className="mt-2 space-y-1.5">
          {project.direction.milestones.map((m, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-sm text-panel-foreground"
            >
              <span
                className={cn(
                  "inline-block h-1.5 w-1.5 shrink-0 rounded-full",
                  m.status === "done" && "bg-accent",
                  m.status === "in-progress" && "bg-accent/50",
                  m.status === "planned" && "bg-panel-foreground/20",
                )}
              />
              <span>{m.label[locale]}</span>
              <span className="font-mono text-[10px] text-panel-foreground/40">
                {labels.milestoneStatus[m.status]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProgressPanel({
  project,
  locale,
  labels,
}: {
  project: Project;
  locale: Locale;
  labels: DrawerLabels;
}) {
  return (
    <div
      role="tabpanel"
      id={`${project.slug}-panel-progress`}
      aria-labelledby={`${project.slug}-tab-progress`}
      className="w-[80%] shrink-0 space-y-4 p-4 [scroll-snap-align:start]"
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-wider text-panel-foreground/50">
          {labels.currentStatus}
        </p>
        <p className="mt-1 text-sm text-panel-foreground">
          {project.progress.status[locale]}
        </p>
      </div>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-wider text-panel-foreground/50">
          {labels.metrics}
        </p>
        <div className="mt-2 flex flex-wrap gap-6">
          {project.progress.metrics.map((metric, i) => (
            <div key={i}>
              <p className="font-mono text-[10px] text-panel-foreground/40">
                {metric.label[locale]}
              </p>
              <p className="font-medium text-accent">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillsPanel({
  project,
  labels,
}: {
  project: Project;
  labels: DrawerLabels;
}) {
  return (
    <div
      role="tabpanel"
      id={`${project.slug}-panel-skills`}
      aria-labelledby={`${project.slug}-tab-skills`}
      className="w-[80%] shrink-0 p-4 [scroll-snap-align:start]"
    >
      <p className="font-mono text-[11px] uppercase tracking-wider text-panel-foreground/50">
        {labels.skillsHeading}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {project.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-panel bg-panel-foreground/10 px-2 py-0.5 font-mono text-[11px] text-panel-foreground/80"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import type { Locale } from "@/lib/types";
import type { Project } from "@data/projects";
import { cn } from "@/lib/cn";
import { transitions } from "@/lib/motion";
import { Spotlight } from "@/components/ui/Spotlight";
import { ProjectDrawer, type DrawerLabels } from "./ProjectDrawer";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  /** 1-based position, rendered as a numbered prefix (01/02/...). */
  index: number;
  /** Lead is the homepage anchor. Compact is archive-only, for work that isn't featured. */
  weight?: "lead" | "standard" | "compact";
  labels: {
    problem: string;
    method: string;
    result: string;
    demo: string;
    github: string;
    todoBadge: string;
    featured: string;
    expand: string;
    collapse: string;
  } & DrawerLabels;
}

export function ProjectCard({
  project,
  locale,
  labels,
  index,
  weight = "standard",
}: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lead = weight === "lead";

  function collapse() {
    setExpanded(false);
    toggleRef.current?.focus();
  }

  return (
    <Spotlight className="h-full rounded-panel">
      <m.article
        id={project.slug}
        layout
        transition={transitions.drawer}
        className={cn(
          "flex h-full flex-col gap-4 rounded-panel border border-border bg-surface",
          lead ? "p-6 sm:p-8" : "p-5 sm:p-6",
        )}
      >
        <div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-xs text-foreground-muted">
              {String(index).padStart(2, "0")}
            </span>
            {lead ? (
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                {labels.featured}
              </span>
            ) : null}
            {project.status === "todo" && (
              <span className="rounded-panel border border-accent/40 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent">
                TODO
              </span>
            )}
          </div>
          <h3
            className={cn(
              "mt-2 font-serif text-foreground",
              lead ? "text-3xl sm:text-4xl" : "text-2xl",
            )}
          >
            {project.title[locale]}
          </h3>
          <p className={cn("mt-2 text-foreground-muted", lead ? "max-w-2xl text-base" : "text-sm")}>
            {project.oneLiner[locale]}
          </p>
        </div>

        {lead ? (
          <dl className="grid gap-3 sm:grid-cols-3">
            {project.progress.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label.en} className="rounded-panel border border-border px-3 py-2">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
                  {metric.label[locale]}
                </dt>
                <dd className="mt-1 font-mono text-lg tabular-nums text-foreground">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <dl className={cn("grid gap-4 text-sm", weight === "compact" ? "" : "sm:grid-cols-3 sm:gap-6")}>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-foreground-muted">
              {labels.problem}
            </dt>
            <dd className="mt-1 text-foreground">{project.problem[locale]}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-foreground-muted">
              {labels.method}
            </dt>
            <dd className="mt-1 text-foreground">{project.method[locale]}</dd>
          </div>
          <div className={weight === "compact" ? "" : "sm:rounded-panel sm:bg-accent/10 sm:px-3 sm:py-2"}>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-accent-ink dark:text-accent">
              {labels.result}
            </dt>
            <dd className="mt-1 font-medium text-foreground">{project.result[locale]}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-panel bg-border/60 px-2 py-0.5 font-mono text-[11px] text-foreground-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="link-underline font-mono text-xs text-accent"
            >
              {labels.demo} →
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="link-underline font-mono text-xs text-accent"
            >
              {labels.github} →
            </a>
          )}
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={expanded}
            aria-label={expanded ? labels.collapse : labels.expand}
            onClick={() => setExpanded((value) => !value)}
            className="font-mono text-xs text-foreground-muted transition-colors hover:text-accent"
          >
            {expanded ? "− archive" : "+ archive"}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <m.div
              key="drawer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transitions.reveal}
            >
              <ProjectDrawer
                project={project}
                locale={locale}
                labels={labels}
                onClose={collapse}
              />
            </m.div>
          )}
        </AnimatePresence>
      </m.article>
    </Spotlight>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Locale } from "@/lib/types";
import type { Project } from "@data/projects";
import { transitions } from "@/lib/motion";
import { ProjectDrawer, type DrawerLabels } from "./ProjectDrawer";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  labels: {
    problem: string;
    method: string;
    result: string;
    demo: string;
    github: string;
    todoBadge: string;
    expand: string;
    collapse: string;
  } & DrawerLabels;
}

export function ProjectCard({ project, locale, labels }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  function collapse() {
    setExpanded(false);
    // Return focus to the trigger so keyboard/screen-reader users aren't
    // dropped onto a now-unmounted drawer element.
    toggleRef.current?.focus();
  }

  return (
    <motion.article
      layout
      transition={transitions.drawer}
      className="flex flex-col gap-4 rounded-panel border border-border p-6"
    >
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-serif text-xl text-foreground">
            {project.title[locale]}
          </h3>
          {project.status === "todo" && (
            <span className="rounded-panel border border-accent/40 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent">
              TODO
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-foreground-muted">
          {project.oneLiner[locale]}
        </p>
      </div>

      <dl className="space-y-2 text-sm">
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wider text-foreground-muted">
            {labels.problem}
          </dt>
          <dd className="text-foreground">{project.problem[locale]}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wider text-foreground-muted">
            {labels.method}
          </dt>
          <dd className="text-foreground">{project.method[locale]}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wider text-accent-ink dark:text-accent">
            {labels.result}
          </dt>
          <dd className="font-medium text-foreground">
            {project.result[locale]}
          </dd>
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
            className="font-mono text-xs text-accent hover:underline"
          >
            {labels.demo} →
          </a>
        )}
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-accent hover:underline"
          >
            {labels.github} →
          </a>
        )}
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={expanded}
          aria-label={expanded ? labels.collapse : labels.expand}
          onClick={() => setExpanded((v) => !v)}
          className="font-mono text-xs text-foreground-muted transition-colors hover:text-accent"
        >
          {expanded ? "− archive" : "+ archive"}
        </button>
      </div>

      {/*
        No explicit height animation here — animating height:"auto" with a
        spring transition doesn't settle reliably (a known Motion
        limitation: springs need numeric targets, "auto" needs measurement,
        and the two don't reconcile well together; confirmed by hitting a
        stuck-mid-transition clipped drawer in live testing). The parent
        motion.article's `layout` prop already smoothly resizes the whole
        card via FLIP-style layout animation when this mounts/unmounts, so
        this wrapper only needs to fade its own opacity.
      */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

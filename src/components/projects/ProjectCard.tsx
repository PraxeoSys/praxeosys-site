import type { Locale } from "@/lib/types";
import type { Project } from "@data/projects";

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
  };
}

export function ProjectCard({ project, locale, labels }: ProjectCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-panel border border-border p-6">
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

      {(project.links.demo || project.links.github) && (
        <div className="mt-auto flex gap-4 pt-2">
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
        </div>
      )}
    </article>
  );
}

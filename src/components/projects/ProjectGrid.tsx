import type { Locale } from "@/lib/types";
import type { Project } from "@data/projects";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
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

export function ProjectGrid({ projects, locale, labels }: ProjectGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          locale={locale}
          labels={labels}
        />
      ))}
    </div>
  );
}

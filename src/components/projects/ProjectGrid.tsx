import type { ComponentProps } from "react";
import type { Locale } from "@/lib/types";
import type { Project } from "@data/projects";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  locale: Locale;
  labels: ComponentProps<typeof ProjectCard>["labels"];
}

export function ProjectGrid({ projects, locale, labels }: ProjectGridProps) {
  return (
    <div className="space-y-8">
      {projects.map((project, i) => (
        <ProjectCard
          key={project.slug}
          project={project}
          locale={locale}
          labels={labels}
          index={i + 1}
        />
      ))}
    </div>
  );
}

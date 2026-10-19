import type { ComponentProps } from "react";
import type { Locale } from "@/lib/types";
import type { Project } from "@data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  locale: Locale;
  labels: ComponentProps<typeof ProjectCard>["labels"];
  /** Homepage: the first card is the lead, the rest share a two-column grid. */
  emphasizeFirst?: boolean;
}

export function ProjectGrid({
  projects,
  locale,
  labels,
  emphasizeFirst = false,
}: ProjectGridProps) {
  if (emphasizeFirst && projects.length > 0) {
    const [lead, ...rest] = projects;
    return (
      <div className="flex flex-col gap-5">
        <Reveal>
          <ProjectCard
            project={lead}
            locale={locale}
            labels={labels}
            index={1}
            weight="lead"
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06} className="h-full">
              <ProjectCard
                project={project}
                locale={locale}
                labels={labels}
                index={index + 2}
                weight="standard"
              />
            </Reveal>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {projects.map((project, index) => (
        <Reveal key={project.slug} delay={Math.min(index, 4) * 0.04}>
          <ProjectCard
            project={project}
            locale={locale}
            labels={labels}
            index={index + 1}
            weight={project.featured ? "standard" : "compact"}
          />
        </Reveal>
      ))}
    </div>
  );
}

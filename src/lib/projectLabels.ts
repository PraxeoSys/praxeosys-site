import type { getTranslations } from "next-intl/server";

type ProjectsTranslator = Awaited<ReturnType<typeof getTranslations>>;

/**
 * Builds the flat labels object ProjectCard/ProjectGrid/ProjectDrawer expect,
 * from the "projects" translation namespace. Shared by ProjectsSection and
 * the /projects archive page so both stay in sync with a single source.
 */
export function buildProjectLabels(t: ProjectsTranslator) {
  return {
    problem: t("problem"),
    method: t("method"),
    result: t("result"),
    demo: t("demo"),
    github: t("github"),
    todoBadge: t("todoBadge"),
    expand: t("drawer.expand"),
    collapse: t("drawer.collapse"),
    tabsAriaLabel: t("drawer.tabsAriaLabel"),
    regionLabelTemplate: t.raw("drawer.regionLabel") as string,
    tabs: {
      direction: t("drawer.tabs.direction"),
      progress: t("drawer.tabs.progress"),
      skills: t("drawer.tabs.skills"),
    },
    vision: t("drawer.vision"),
    roadmap: t("drawer.roadmap"),
    milestones: t("drawer.milestones"),
    milestoneStatus: {
      done: t("drawer.milestoneStatus.done"),
      "in-progress": t("drawer.milestoneStatus.in-progress"),
      planned: t("drawer.milestoneStatus.planned"),
    },
    currentStatus: t("drawer.currentStatus"),
    metrics: t("drawer.metrics"),
    skillsHeading: t("drawer.skillsHeading"),
  };
}

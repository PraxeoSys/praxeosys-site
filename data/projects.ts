import type { Localized } from "@/lib/types";

/**
 * ============================================================================
 *  项目清单
 * ============================================================================
 * - 只展示 shipped / 可演示的项目。
 * - result 字段必须包含具体数字（延迟、收益率、用户数、回测胜率等），
 *   不写"效果良好"这类无凭据的自夸。
 * - featured: true 的项目显示在首页（建议 3–5 个），其余在 /projects 归档页展示。
 * - status: "todo" 的卡片会在标题旁显示 TODO 徽章，提醒你替换为真实项目。
 */

export interface ProjectMilestone {
  label: Localized;
  status: "done" | "in-progress" | "planned";
  /** Optional YYYY-MM or YYYY-MM-DD. */
  date?: string;
}

export interface ProjectDirection {
  /** What problem this solves and where it's headed. */
  vision: Localized;
  roadmap: Localized;
  milestones: ProjectMilestone[];
}

export interface ProjectMetric {
  label: Localized;
  /** Pre-formatted display string (e.g. "1.2s", "230 users"). */
  value: string;
}

export interface ProjectProgress {
  status: Localized;
  metrics: ProjectMetric[];
}

export interface Project {
  slug: string;
  status: "shipped" | "todo";
  featured: boolean;
  title: Localized;
  oneLiner: Localized;
  problem: Localized;
  method: Localized;
  result: Localized;
  tech: string[];
  links: {
    demo?: string;
    github?: string;
  };
  /** Feeds the archive drawer's "01 Direction" panel. */
  direction: ProjectDirection;
  /** Feeds the archive drawer's "02 Progress" panel. */
  progress: ProjectProgress;
  /** Feeds the archive drawer's "03 Skills" panel (tag pills). */
  skills: string[];
}

export const projects: Project[] = [
  {
    slug: "todo-project-1",
    status: "todo",
    featured: true,
    title: {
      en: "TODO: Project name",
      zh: "TODO：项目名称",
    },
    oneLiner: {
      en: "TODO: one sentence describing what this project does",
      zh: "TODO：一句话描述这个项目做什么",
    },
    problem: {
      en: "TODO: what problem/question motivated this project",
      zh: "TODO：这个项目要解决的问题/回答的问题",
    },
    method: {
      en: "TODO: what you built and how (architecture, approach, key decisions)",
      zh: "TODO：你做了什么、怎么做的（架构、方法、关键取舍）",
    },
    result: {
      en: "TODO: quantified outcome, e.g. \"reduced backtest latency from 40s to 1.2s\"",
      zh: "TODO：可量化的结果，例如「回测耗时从 40s 降到 1.2s」",
    },
    tech: ["TODO"],
    links: {
      demo: undefined,
      github: undefined,
    },
    direction: {
      vision: {
        en: "TODO: problem this project solves and where it's headed",
        zh: "TODO：这个项目要解决的问题及未来方向",
      },
      roadmap: {
        en: "TODO: next 2-3 planned steps",
        zh: "TODO：接下来 2-3 步计划",
      },
      milestones: [
        {
          label: { en: "TODO: milestone 1", zh: "TODO：里程碑一" },
          status: "planned",
        },
      ],
    },
    progress: {
      status: {
        en: "TODO: current status in one paragraph",
        zh: "TODO：当前状态一段话",
      },
      metrics: [
        { label: { en: "TODO: metric name", zh: "TODO：指标名称" }, value: "TODO" },
      ],
    },
    skills: ["TODO"],
  },
  {
    slug: "todo-project-2",
    status: "todo",
    featured: true,
    title: {
      en: "TODO: Project name",
      zh: "TODO：项目名称",
    },
    oneLiner: {
      en: "TODO: one sentence describing what this project does",
      zh: "TODO：一句话描述这个项目做什么",
    },
    problem: {
      en: "TODO: what problem/question motivated this project",
      zh: "TODO：这个项目要解决的问题/回答的问题",
    },
    method: {
      en: "TODO: what you built and how (architecture, approach, key decisions)",
      zh: "TODO：你做了什么、怎么做的（架构、方法、关键取舍）",
    },
    result: {
      en: "TODO: quantified outcome, e.g. \"back-tested strategy across 5 assets, 0 look-ahead bias bugs found in review\"",
      zh: "TODO：可量化的结果，例如「策略跨 5 个标的回测，代码审查未发现前视偏差」",
    },
    tech: ["TODO"],
    links: {
      demo: undefined,
      github: undefined,
    },
    direction: {
      vision: {
        en: "TODO: problem this project solves and where it's headed",
        zh: "TODO：这个项目要解决的问题及未来方向",
      },
      roadmap: {
        en: "TODO: next 2-3 planned steps",
        zh: "TODO：接下来 2-3 步计划",
      },
      milestones: [
        {
          label: { en: "TODO: milestone 1", zh: "TODO：里程碑一" },
          status: "planned",
        },
      ],
    },
    progress: {
      status: {
        en: "TODO: current status in one paragraph",
        zh: "TODO：当前状态一段话",
      },
      metrics: [
        { label: { en: "TODO: metric name", zh: "TODO：指标名称" }, value: "TODO" },
      ],
    },
    skills: ["TODO"],
  },
];

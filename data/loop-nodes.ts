import type { Localized } from "@/lib/types";

/**
 * ============================================================================
 *  The Loop — 认知闭环的四个节点
 * ============================================================================
 * 这是全站叙事的锚：四种身份（经济学思考者/独立开发者/交易员/量化研究者）
 * 不是并列标签，而是同一个流程的四个环节。
 *
 * href 指向站内对应的实例锚点（一个具体项目、一篇复盘文章等），
 * 让每个节点的说明都能被点击验证，而不是空泛的方法论描述。
 */

export interface LoopNode {
  id: "thesis" | "code" | "trade" | "verify";
  title: Localized;
  description: Localized;
  /** 站内锚点或路径，例如 "/en/research?tag=macro" 或 "/en/projects#slug" */
  href: string;
}

export const loopNodes: LoopNode[] = [
  {
    id: "thesis",
    title: {
      en: "Thesis",
      zh: "假设",
    },
    description: {
      en: "Start from an economic reading of the market — a mispricing, a structural shift, a behavioral pattern. TODO: link to the research post that documents your current thesis.",
      zh: "从对市场的经济学解读出发——一个定价偏差、一次结构性变化、一种行为模式。TODO：链接到记录你当前假设的研究文章。",
    },
    href: "/research?tag=macro",
  },
  {
    id: "code",
    title: {
      en: "Code",
      zh: "代码",
    },
    description: {
      en: "Turn the thesis into something falsifiable — a backtest, a signal, a tool. TODO: link to the project that implements this.",
      zh: "把假设变成可证伪的东西——一个回测、一个信号、一个工具。TODO：链接到实现它的项目。",
    },
    href: "/projects",
  },
  {
    id: "trade",
    title: {
      en: "Trade",
      zh: "交易",
    },
    description: {
      en: "Execute in a real market with real risk — this is what separates a belief from a position.",
      zh: "在真实市场中带着真实风险执行——这是「相信」和「持仓」的区别。",
    },
    href: "/#proof",
  },
  {
    id: "verify",
    title: {
      en: "Verify",
      zh: "验证",
    },
    description: {
      en: "Review honestly, including — especially — the losses. TODO: link to your most recent post-mortem article.",
      zh: "诚实复盘，包括——尤其是——亏损的部分。TODO：链接到你最近一篇复盘文章。",
    },
    href: "/research?tag=review",
  },
];

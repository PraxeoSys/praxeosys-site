import type { Localized } from "@/lib/types";

/**
 * ============================================================================
 *  The Loop — 认知闭环的四个节点
 * ============================================================================
 * 这是全站叙事的锚：四种身份（经济学思考者/独立开发者/交易员/量化研究者）
 * 不是并列标签，而是同一个流程的四个环节。
 *
 * href 指向站内已有、且会渲染出内容的页面（不带语言前缀）。
 * 交易假设与复盘各自还没有专文：Thesis 暂链已发布的制度经济学笔记，
 * Code / Verify 暂链 BTC 交易分析 Agent 项目卡。专文写好后再换 href。
 */

export interface LoopNode {
  id: "thesis" | "code" | "trade" | "verify";
  title: Localized;
  description: Localized;
  /** 站内路径，例如 "/research/slug" 或 "/projects#slug"。不带语言前缀。 */
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
      en: "Start from an economic reading of the market — a mispricing, a structural shift, a behavioral pattern. The working trading thesis is modest, and it is not this essay: in backtests written up through 2026-09, crypto trends paid more long than short, and BTC per-trade expectancy fell from +3.35R to +0.93R after 2021-08. The note linked here is an institutional-economics reading of a merchant house.",
      zh: "从对市场的经济学解读出发——一个定价偏差、一次结构性变化、一种行为模式。当前的交易假设刻意保守，而且不是这篇笔记：在写到 2026-09 的回测里，加密趋势做多远好于做空，BTC 单笔期望从 +3.35R 降到 2021-08 之后的 +0.93R。这里链到的是一篇关于商号的制度经济学阅读。",
    },
    href: "/research/qiaojia-financial-corpse",
  },
  {
    id: "code",
    title: {
      en: "Code",
      zh: "代码",
    },
    description: {
      en: "Turn the thesis into something falsifiable — a backtest, a signal, a tool. Here that is a stdlib-only Python collector and a set of backtests that decide which rules are allowed to exist: a rule that does not survive is cut, not tuned. See BTC Trader Agent.",
      zh: "把假设变成可证伪的东西——一个回测、一个信号、一个工具。这里是一个纯标准库的 Python 采集器，加一组决定哪些规则有资格存在的回测：过不了的规则会被砍掉，而不是被调参救活。详见 BTC 交易分析 Agent。",
    },
    href: "/projects#btc-trader-agent",
  },
  {
    id: "trade",
    title: {
      en: "Trade",
      zh: "交易",
    },
    description: {
      en: "A belief is not a position until size and a stop are explicit. The analysis agent never places orders, and the automated bot is still dry-run. The block linked here is public build activity, not a return.",
      zh: "在仓位和止损写明之前，相信还不是持仓。分析 Agent 不下单，自动化 bot 仍在 dry-run。这里链到的是公开的构建记录，不是收益。",
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
      en: "Review honestly, including the misses. Every forecast is appended to a log that is not edited afterwards and is scored by a script, not by memory. As of 2026-09-25, 12 forecasts were logged and only 2 had expired, with 1 direction hit — too small a sample to claim skill, and the log says so.",
      zh: "诚实复盘，包括没对上的部分。每条预测都追加进一份事后不改的记录，由脚本而不是记忆来打分。截至 2026-09-25，记录了 12 条预测，只有 2 条到期，方向命中 1 条——样本小到证明不了能力，记录里也是这么写的。",
    },
    href: "/projects#btc-trader-agent",
  },
];

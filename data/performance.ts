import rawPerformanceData from "./performance.json";

/**
 * ============================================================================
 *  策略业绩面板 — 数据源
 * ============================================================================
 * 当前状态：关闭（enabled: false）。这是有意为之——业绩数据必须等有完整、
 * 可辩护的实盘/回测记录之后再启用，宁缺毋假。关闭时 Proof 区不渲染该面板，
 * 由 GitHub 贡献卡自然填充空间。
 *
 * 上线步骤：
 *   1. 把 performance.json 换成真实数据（date/equity/benchmark 累计收益率序列，
 *      已脱敏为相对基准 100 的百分比，不展示绝对金额）。
 *   2. 把 enabled 改成 true。
 *
 * 未来接入交易所 API 时：
 *   在这里新增一个 fetchLivePerformance() async 函数，调用交易所/账户 API
 *   拉取真实权益曲线，替换 performanceData.series 的静态读取；
 *   保持返回类型（PerformanceData）不变，组件不需要跟着改。
 */

export interface PerformancePoint {
  date: string;
  equity: number;
  benchmark: number;
}

export interface PerformanceData {
  enabled: boolean;
  startingEquity: number;
  metrics: {
    sharpe: number;
    maxDrawdownPct: number;
    runtimeDays: number;
  };
  series: PerformancePoint[];
}

export const performanceData = rawPerformanceData as PerformanceData;

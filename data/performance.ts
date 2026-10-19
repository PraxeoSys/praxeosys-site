import rawPerformanceData from "./performance.json";

/**
 * ============================================================================
 *  策略业绩面板 — 数据源
 * ============================================================================
 * 当前状态：关闭，且没有序列。这是有意的。没有可公开、可辩护的业绩记录时，
 * 不放任何数字——虚构的夏普、回撤、净值曲线一律不入库，避免被误打开。
 *
 * 绝对金额永不公开。将来若有真实记录，只写百分比和比率（累计收益、
 * R 倍数、回撤），series 至少两个点，metrics 填实数，再把 enabled 改为 true。
 * 缺序列或 metrics 为 null 时，面板不渲染，也不会显示 0。
 */

export interface PerformancePoint {
  date: string;
  equity: number;
  benchmark: number;
}

export interface PerformanceMetrics {
  sharpe: number;
  maxDrawdownPct: number;
  runtimeDays: number;
}

export interface PerformanceData {
  enabled: boolean;
  /** Indexed base (typically 100) once a real series exists. Null when there is no track record. */
  startingEquity: number | null;
  metrics: PerformanceMetrics | null;
  series: PerformancePoint[];
}

export const performanceData = rawPerformanceData as PerformanceData;

/** True only when the file holds a real series. An enabled flag alone is not enough. */
export function hasPublicTrackRecord(data: PerformanceData = performanceData): boolean {
  return (
    data.enabled &&
    data.metrics !== null &&
    data.series.length >= 2 &&
    Number.isFinite(data.metrics.sharpe) &&
    Number.isFinite(data.metrics.maxDrawdownPct) &&
    Number.isFinite(data.metrics.runtimeDays)
  );
}

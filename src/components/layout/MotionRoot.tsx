"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Single global reduced-motion switch: every `motion.*` element anywhere in
 * the tree automatically respects the OS "reduce motion" preference without
 * each component re-checking it individually.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

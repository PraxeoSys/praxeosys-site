"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

const loadFeatures = () => import("motion/react").then((mod) => mod.domMax);

/**
 * domMax (not domAnimation) because the project drawer still drags and the
 * card still uses a layout animation. Loaded on demand.
 *
 * reducedMotion is "never" here on purpose: Motion's "user" setting skips
 * every animation, including opacity. Components and CSS keep fades and drop
 * only displacement when the OS asks for less motion.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="never">{children}</MotionConfig>
    </LazyMotion>
  );
}

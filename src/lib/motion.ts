/**
 * ============================================================================
 *  Motion constants — single source of truth for every duration/easing/spring
 * ============================================================================
 * No component should inline a raw duration/easing value. Import from here.
 * Keep in sync with the motion custom properties (--motion-duration-fast etc.)
 * in globals.css (no build-time link between the two — manual sync only).
 */

export const durations = {
  /** Hover states, tab switches — hard ceiling per interaction discipline rule #3. */
  instant: 0.12,
  fast: 0.15,
  base: 0.3,
  slow: 0.45,
  /** Any single entrance animation — hard ceiling per interaction discipline rule #2. */
  entrance: 0.6,
} as const;

export const easings = {
  standard: [0.22, 1, 0.36, 1],
  enter: [0.16, 1, 0.3, 1],
  exit: [0.4, 0, 1, 1],
} as const;

export const springs = {
  drawer: { type: "spring", stiffness: 380, damping: 32 },
  snappy: { type: "spring", stiffness: 500, damping: 40 },
} as const;

/** transform/opacity only — never triggers layout, never causes CLS. */
export const revealVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
} as const;

export const transitions = {
  reveal: { duration: durations.base, ease: easings.standard },
  tabSwitch: { duration: durations.fast, ease: easings.standard },
  drawer: springs.drawer,
} as const;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

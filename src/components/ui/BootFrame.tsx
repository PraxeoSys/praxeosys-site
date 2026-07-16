"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useInView } from "@/lib/useInView";
import { durations, transitions } from "@/lib/motion";

const WIRE_STAGGER = 0.07;
const CONTENT_DELAY = WIRE_STAGGER * 4;

/**
 * "Terminal boot" entrance for Proof panels: 4 decorative accent wires draw
 * themselves around the panel's real border (~300ms total), then the real
 * content fades in. The actual CSS border (Panel.tsx) always renders,
 * SSR-safe and visible even before hydration — these wires are a purely
 * decorative overlay on top, transform/opacity only, so this can't register
 * as CLS regardless of when it fires. Once-only via useInView.
 */
export function BootFrame({ children }: { children: ReactNode }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div ref={ref} className="relative">
      <motion.span
        aria-hidden
        data-motion-decorative
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: durations.fast, delay: 0 }}
      />
      <motion.span
        aria-hidden
        data-motion-decorative
        className="pointer-events-none absolute inset-y-0 right-0 w-px origin-top bg-accent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: inView ? 1 : 0 }}
        transition={{ duration: durations.fast, delay: WIRE_STAGGER }}
      />
      <motion.span
        aria-hidden
        data-motion-decorative
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-right bg-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: durations.fast, delay: WIRE_STAGGER * 2 }}
      />
      <motion.span
        aria-hidden
        data-motion-decorative
        className="pointer-events-none absolute inset-y-0 left-0 w-px origin-bottom bg-accent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: inView ? 1 : 0 }}
        transition={{ duration: durations.fast, delay: WIRE_STAGGER * 3 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 4 }}
        transition={{ ...transitions.reveal, delay: CONTENT_DELAY }}
      >
        {children}
      </motion.div>
    </div>
  );
}

"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useInView } from "@/lib/useInView";
import { durations, transitions } from "@/lib/motion";

const WIRE_STAGGER = 0.07;
const CONTENT_DELAY = WIRE_STAGGER * 4;

/**
 * "Terminal boot" entrance for Proof panels: 4 decorative accent wires draw
 * themselves around the panel's real border, then the content fades in.
 * The CSS border always renders, so this overlay can't cause layout shift.
 * Reduced motion skips the wires and keeps a short fade.
 */
export function BootFrame({ children }: { children: ReactNode }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="relative">
      {reduced
        ? null
        : (
          <>
            <m.span
              aria-hidden
              data-motion-decorative
              className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? 1 : 0 }}
              transition={{ duration: durations.fast, delay: 0 }}
            />
            <m.span
              aria-hidden
              data-motion-decorative
              className="pointer-events-none absolute inset-y-0 right-0 w-px origin-top bg-accent"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: inView ? 1 : 0 }}
              transition={{ duration: durations.fast, delay: WIRE_STAGGER }}
            />
            <m.span
              aria-hidden
              data-motion-decorative
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-right bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? 1 : 0 }}
              transition={{ duration: durations.fast, delay: WIRE_STAGGER * 2 }}
            />
            <m.span
              aria-hidden
              data-motion-decorative
              className="pointer-events-none absolute inset-y-0 left-0 w-px origin-bottom bg-accent"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: inView ? 1 : 0 }}
              transition={{ duration: durations.fast, delay: WIRE_STAGGER * 3 }}
            />
          </>
        )}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ ...transitions.reveal, delay: reduced ? 0 : CONTENT_DELAY }}
      >
        {children}
      </m.div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/useInView";

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/** Counts up to `value` once it scrolls into view. No-op (renders final value immediately) if the user prefers reduced motion. */
export function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  durationMs = 900,
  className,
}: AnimatedNumberProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  // If the user prefers reduced motion, useInView already starts `inView`
  // true — start the display at the final value so we skip the rAF loop.
  const [display, setDisplay] = useState(() => (inView ? value : 0));
  const started = useRef(inView);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

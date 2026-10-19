"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Below-the-fold fade (and a 12px rise unless motion is reduced).
 * The server render is fully visible. useLayoutEffect hides a block only
 * when it is already off-screen, before the browser paints, so nothing
 * flashes and nothing shifts.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"shown" | "wait" | "in">("shown");

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.92) return;

    setState("wait");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setState("in");
        observer.disconnect();
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(state === "wait" && "reveal-wait", state === "in" && "reveal-in", className)}
      style={state === "in" ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

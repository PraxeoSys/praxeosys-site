"use client";

import { useEffect, useRef } from "react";

interface ReadingProgressProps {
  ariaLabel: string;
}

/**
 * Mobile-only thin top progress bar (rail substitute below lg:). This is
 * the one place in the narrative upgrade where CSS `view()` timelines'
 * non-terminal/replay-both-directions nature is *correct* — a progress bar
 * must shrink back on scroll-up, unlike every other one-time entrance
 * animation in this codebase. Primary implementation is pure CSS
 * (animation-timeline: scroll(root block)); JS rAF fallback covers
 * browsers without scroll-driven-animation support.
 */
export function ReadingProgress({ ariaLabel }: ReadingProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof CSS !== "undefined" && CSS.supports("animation-timeline: scroll(root block)")) {
      return;
    }

    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;
    function update() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      if (bar) bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      ticking = false;
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      className="fixed inset-x-0 top-0 z-30 h-0.5 origin-left bg-border lg:hidden"
    >
      <div
        ref={barRef}
        data-motion-decorative
        className="reading-progress-bar h-full origin-left bg-accent"
      />
    </div>
  );
}

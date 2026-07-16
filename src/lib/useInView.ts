"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Fires `inView` true exactly once, the first time the element enters the
 * viewport, then disconnects. Starts already-true under reduced motion,
 * skipping the IntersectionObserver entirely. This is the single shared
 * enforcement point for "animate once, never replay on scroll-back."
 */
export function useInView<T extends Element>({
  threshold = 0.2,
  rootMargin = "0px",
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(() => prefersReducedMotion());
  const fired = useRef(inView);

  useEffect(() => {
    if (fired.current) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || fired.current) return;
        fired.current = true;
        setInView(true);
        observer.disconnect();
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}

"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Pointer-following glow. Hidden for touch and for reduced motion (see CSS). */
export function Spotlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={cn("spotlight", className)}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        node.style.setProperty("--sx", `${event.clientX - rect.left}px`);
        node.style.setProperty("--sy", `${event.clientY - rect.top}px`);
      }}
    >
      {children}
    </div>
  );
}

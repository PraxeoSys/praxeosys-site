"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A few pixels of pull toward the pointer. Capped, mouse-only, off when motion is reduced. */
export function Magnetic({
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
      className={cn("magnetic", className)}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const x = Math.max(-6, Math.min(6, (event.clientX - (rect.left + rect.width / 2)) * 0.18));
        const y = Math.max(-4, Math.min(4, (event.clientY - (rect.top + rect.height / 2)) * 0.28));
        node.style.transform = `translate(${x}px, ${y}px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </div>
  );
}

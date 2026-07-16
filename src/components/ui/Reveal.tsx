"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useInView } from "@/lib/useInView";
import { revealVariants, transitions } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
}

/** Fades/slides content in the first time it enters the viewport. Never replays. */
export function Reveal({
  children,
  delay = 0,
  className,
  threshold = 0.15,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={revealVariants}
      transition={{ ...transitions.reveal, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

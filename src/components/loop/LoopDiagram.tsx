"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

interface LoopDiagramNode {
  id: string;
  title: string;
  description: string;
  href: string;
}

interface LoopDiagramProps {
  nodes: LoopDiagramNode[];
  ctaLabel: string;
}

export function LoopDiagram({ nodes, ctaLabel }: LoopDiagramProps) {
  const [openId, setOpenId] = useState<string | null>(nodes[0]?.id ?? null);
  const openNode = nodes.find((n) => n.id === openId) ?? null;

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[repeat(7,1fr)] sm:gap-0">
        {nodes.map((node, i) => (
          <div key={node.id} className="contents">
            <button
              type="button"
              onClick={() => setOpenId(openId === node.id ? null : node.id)}
              aria-expanded={openId === node.id}
              className={cn(
                "rounded-panel border px-4 py-4 text-left transition-colors sm:col-span-1",
                openId === node.id
                  ? "border-accent bg-accent/10"
                  : "border-border hover:border-accent/50",
              )}
            >
              <span className="font-mono text-[11px] text-foreground-muted">
                0{i + 1}
              </span>
              <span className="mt-1 block font-serif text-lg text-foreground">
                {node.title}
              </span>
            </button>

            {i < nodes.length - 1 && (
              <span
                aria-hidden
                className="hidden items-center justify-center font-mono text-accent sm:col-span-1 sm:flex"
              >
                &rarr;
              </span>
            )}
            {i < nodes.length - 1 && (
              <span
                aria-hidden
                className="flex items-center justify-center py-1 font-mono text-accent sm:hidden"
              >
                &darr;
              </span>
            )}
          </div>
        ))}
      </div>

      <div
        aria-hidden
        className="relative hidden h-8 sm:block"
        title="loops back to Thesis"
      >
        <svg
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full text-accent/60"
        >
          <defs>
            <marker
              id="loop-return-arrow"
              markerWidth="6"
              markerHeight="6"
              refX="3"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
            </marker>
          </defs>
          <path
            d="M 96 0 C 96 16 4 16 4 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            markerEnd="url(#loop-return-arrow)"
          />
        </svg>
      </div>

      {openNode && (
        <div className="mt-4 rounded-panel border border-panel-border bg-panel-background p-5">
          <p className="text-sm leading-relaxed text-panel-foreground/80">
            {openNode.description}
          </p>
          <Link
            href={openNode.href}
            className="mt-3 inline-block font-mono text-xs text-accent hover:underline"
          >
            {ctaLabel}
          </Link>
        </div>
      )}
    </div>
  );
}

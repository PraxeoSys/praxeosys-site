import { ResearchSection } from "@/components/research/ResearchSection";
import { NowSection } from "@/components/now/NowSection";

/**
 * Act 5 "thinking" — Research (featured) and Now merged into one act,
 * side by side on desktop, stacked on mobile. Each child keeps its own
 * inner id (research/now) for anchor-compat — Header links to /#now
 * directly, so that one is load-bearing, not just defensive.
 */
export function ThinkingSection() {
  return (
    <section id="thinking" className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <ResearchSection />
        <NowSection />
      </div>
    </section>
  );
}

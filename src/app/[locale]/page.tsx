import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero/Hero";
import { LoopSection } from "@/components/loop/LoopSection";
import { ProofSection } from "@/components/proof/ProofSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ResearchSection } from "@/components/research/ResearchSection";
import { NowSection } from "@/components/now/NowSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <Hero />
      <LoopSection />
      <ProofSection />
      <ProjectsSection />
      <ResearchSection />
      <NowSection />
      <ContactSection />
    </main>
  );
}

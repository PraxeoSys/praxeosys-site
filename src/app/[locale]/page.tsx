import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero/Hero";
import { LoopSection } from "@/components/loop/LoopSection";
import { ProofSection } from "@/components/proof/ProofSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { ThinkingSection } from "@/components/narrative/ThinkingSection";
import { ChapterRail } from "@/components/narrative/ChapterRail";
import { ReadingProgress } from "@/components/narrative/ReadingProgress";
import { narrativeActs } from "@data/narrative-acts";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("chapterRail");
  const railEntries = narrativeActs.map((act) => ({
    id: act.id,
    sectionId: act.sectionId,
    label: t(`acts.${act.id}`),
  }));

  return (
    <>
      <ChapterRail entries={railEntries} ariaLabel={t("ariaLabel")} />
      <ReadingProgress ariaLabel={t("progressAriaLabel")} />
      <main className="flex-1">
        <Hero />
        <LoopSection />
        <ProofSection />
        <ProjectsSection />
        <ThinkingSection />
        <ContactSection />
      </main>
    </>
  );
}

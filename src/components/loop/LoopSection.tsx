import { getTranslations, getLocale } from "next-intl/server";
import { loopNodes } from "@data/loop-nodes";
import { LoopDiagram } from "./LoopDiagram";
import type { Locale } from "@/lib/types";

export async function LoopSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("loop");

  const nodes = loopNodes.map((node) => ({
    id: node.id,
    title: node.title[locale],
    description: node.description[locale],
    href: node.href,
  }));

  return (
    <section id="loop" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
        {t("heading")}
      </h2>
      <p className="mt-2 max-w-2xl text-foreground-muted">{t("subheading")}</p>
      <LoopDiagram nodes={nodes} ctaLabel={t("nodeCta")} />
    </section>
  );
}

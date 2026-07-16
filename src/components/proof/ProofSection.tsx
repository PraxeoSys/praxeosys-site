import { getTranslations } from "next-intl/server";
import { GithubHeatmap } from "./GithubHeatmap";
import { PerformancePanel } from "./PerformancePanel";
import { OnchainIdentity } from "./OnchainIdentity";

export async function ProofSection() {
  const t = await getTranslations("proof");

  return (
    <section id="proof" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
        {t("heading")}
      </h2>
      <p className="mt-2 max-w-2xl text-foreground-muted">{t("subheading")}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="min-w-0 md:col-span-2">
          <GithubHeatmap />
        </div>
        <PerformancePanel />
        <OnchainIdentity />
      </div>
    </section>
  );
}

import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { Link } from "@/i18n/navigation";
import { StatusBar } from "./StatusBar";
import { KeywordEcho } from "./KeywordEcho";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="whoami"
      className="mx-auto flex max-w-5xl flex-col gap-8 px-6 pb-16 pt-20 sm:pt-28"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        {t("kicker")}
      </p>

      <h1 className="max-w-3xl font-serif text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
        {t.rich("narrative", {
          thesis: (chunks) => <KeywordEcho id="thesis">{chunks}</KeywordEcho>,
          code: (chunks) => <KeywordEcho id="code">{chunks}</KeywordEcho>,
          trade: (chunks) => <KeywordEcho id="trade">{chunks}</KeywordEcho>,
        })}
      </h1>

      <div className="flex flex-wrap gap-4 pt-2">
        <Link
          href="/#proof"
          className="rounded-panel bg-accent px-5 py-2.5 font-mono text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          {t("ctaProof")}
        </Link>
        <Link
          href="/research"
          className="rounded-panel border border-border px-5 py-2.5 font-mono text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          {t("ctaResearch")}
        </Link>
      </div>

      <div className="mt-4 rounded-panel border border-panel-border bg-panel-background px-4 py-3">
        <Suspense
          fallback={
            <p className="font-mono text-xs text-panel-foreground/70 sm:text-sm">
              {t("statusLoading")}
            </p>
          }
        >
          <StatusBar />
        </Suspense>
      </div>
    </section>
  );
}

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getBtcAgentSnapshot } from "@/lib/system-status";
import { Magnetic } from "@/components/ui/Magnetic";
import { TypeLine } from "@/components/ui/TypeLine";
import { KeywordEcho } from "./KeywordEcho";
import { SystemStatus, SystemStatusFallback } from "./SystemStatus";

export function Hero() {
  const t = useTranslations("hero");
  const agent = getBtcAgentSnapshot();

  return (
    <section id="whoami" className="hero-field overflow-hidden">
      <span aria-hidden className="hero-noise" />
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 pb-16 pt-16 sm:pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          {t("kicker")}
        </p>

        <h1 className="max-w-4xl font-serif text-[2rem] leading-[1.18] text-foreground sm:text-5xl sm:leading-[1.12]">
          {t.rich("narrative", {
            thesis: (chunks) => <KeywordEcho id="thesis">{chunks}</KeywordEcho>,
            code: (chunks) => <KeywordEcho id="code">{chunks}</KeywordEcho>,
            trade: (chunks) => <KeywordEcho id="trade">{chunks}</KeywordEcho>,
          })}
        </h1>

        {agent ? (
          <TypeLine
            text={t("terminal", { date: agent.asOf })}
            className="font-mono text-sm text-foreground-muted"
          />
        ) : null}

        <div className="flex flex-wrap items-center gap-4">
          <Magnetic>
            <Link
              href="/#proof"
              className="rounded-panel bg-accent px-5 py-2.5 font-mono text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              {t("ctaProof")}
            </Link>
          </Magnetic>
          <Link
            href="/research"
            className="rounded-panel border border-border bg-surface px-5 py-2.5 font-mono text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {t("ctaResearch")}
          </Link>
          <Link
            href="/#contact"
            className="link-underline font-mono text-sm text-foreground-muted hover:text-accent"
          >
            {t("ctaContact")}
          </Link>
        </div>

        <Suspense fallback={<SystemStatusFallback />}>
          <SystemStatus />
        </Suspense>
      </div>
    </section>
  );
}

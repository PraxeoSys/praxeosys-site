import { getTranslations, getLocale } from "next-intl/server";
import { projects } from "@data/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/types";
import { buildProjectLabels } from "@/lib/projectLabels";
import { ProjectGrid } from "./ProjectGrid";

export async function ProjectsSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("projects");
  const featured = projects.filter((p) => p.featured).slice(0, 5);
  const hasMore = projects.length > featured.length;

  const labels = buildProjectLabels(t);

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
        {t("heading")}
      </h2>
      <p className="mt-2 max-w-2xl text-foreground-muted">{t("subheading")}</p>

      <div className="mt-10">
        <ProjectGrid projects={featured} locale={locale} labels={labels} />
      </div>

      {hasMore && (
        <Link
          href="/projects"
          className="mt-8 inline-block font-mono text-sm text-accent hover:underline"
        >
          {t("viewArchive")}
        </Link>
      )}
    </section>
  );
}

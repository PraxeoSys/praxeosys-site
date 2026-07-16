import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { projects } from "@data/projects";
import { Link } from "@/i18n/navigation";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";
import type { Locale } from "@/lib/types";
import { buildProjectLabels } from "@/lib/projectLabels";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  const title = t("archiveTitle");
  const description = t("archiveSubheading");

  return {
    title,
    description,
    alternates: buildAlternates(locale as Locale, "/projects"),
    openGraph: buildOpenGraph(locale as Locale, { title, description }),
  };
}

export default async function ProjectsArchivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  const labels = buildProjectLabels(t);

  return (
    <main className="mx-auto max-w-5xl flex-1 px-6 py-20">
      <Link
        href="/"
        className="font-mono text-xs text-foreground-muted hover:text-accent"
      >
        {t("backHome")}
      </Link>

      <h1 className="mt-6 font-serif text-2xl text-foreground sm:text-3xl">
        {t("archiveTitle")}
      </h1>
      <p className="mt-2 max-w-2xl text-foreground-muted">
        {t("archiveSubheading")}
      </p>

      <div className="mt-10">
        <ProjectGrid projects={projects} locale={locale} labels={labels} />
      </div>
    </main>
  );
}

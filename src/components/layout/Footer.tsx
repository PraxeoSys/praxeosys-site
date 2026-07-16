import { useTranslations } from "next-intl";
import { siteConfig } from "@data/site-config";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 text-xs text-foreground-muted">
        <p className="font-mono">
          © {year} {siteConfig.brand}
        </p>
        <p>{t("tagline")}</p>
      </div>
    </footer>
  );
}

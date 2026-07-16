"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitch() {
  const locale = useLocale();
  const t = useTranslations("locale");
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale() {
    const nextLocale = locale === "en" ? "zh" : "en";
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      className="rounded-panel border border-border px-2.5 py-1 font-mono text-xs text-foreground-muted transition-colors hover:border-accent hover:text-accent"
    >
      {t("switchTo")}
    </button>
  );
}

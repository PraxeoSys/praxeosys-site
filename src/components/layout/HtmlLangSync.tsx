"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

/** Keeps <html lang> in sync with the active locale across client-side navigations. */
export function HtmlLangSync() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}

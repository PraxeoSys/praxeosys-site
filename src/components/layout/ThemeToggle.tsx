"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const t = useTranslations("theme");
  // Lazy initializer reads the real DOM class during hydration's client
  // render (the blocking theme-init script has already run by then), so the
  // icon is correct on first paint with no effect/setState round-trip needed.
  const [isDark, setIsDark] = useState(() =>
    typeof document === "undefined"
      ? true
      : document.documentElement.classList.contains("dark"),
  );

  function toggle() {
    const root = document.documentElement;
    const next = !isDark;
    setIsDark(next);
    root.classList.toggle("dark", next);
    root.classList.toggle("light", !next);
    root.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t("toggleToLight") : t("toggleToDark")}
      className="flex h-8 w-8 items-center justify-center rounded-panel border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent"
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
          <path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm0 15a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm9-6a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM5 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm12.66 6.66a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41ZM7.46 8.46a1 1 0 0 1-1.41 0l-.71-.71A1 1 0 1 1 6.75 6.34l.71.71a1 1 0 0 1 0 1.41Zm11.2-1.41a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0ZM8.17 17.83a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
          <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.14c0-1.22.27-2.35.73-3.37A1 1 0 0 0 8.6 1.05 10.14 10.14 0 1 0 22 14.05a1 1 0 0 0-.36-1.05Z" />
        </svg>
      )}
    </button>
  );
}

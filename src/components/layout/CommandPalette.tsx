"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

interface CommandItem {
  href: string;
  label: string;
}

const EGG_QUERY = /^(praxeo|axiom|falsify)$/i;

export function CommandProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("command-palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("command-palette:open", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      {children}
      {open ? <CommandDialog onClose={() => setOpen(false)} /> : null}
    </>
  );
}

export function CommandButton() {
  const t = useTranslations("command");

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("command-palette:open"))}
      className="flex h-8 items-center gap-2 rounded-panel border border-border px-2 font-mono text-[11px] text-foreground-muted transition-colors hover:border-accent hover:text-accent"
    >
      <span className="sr-only">{t("open")}</span>
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="11" cy="11" r="6" />
        <path d="M16 16l4 4" />
      </svg>
      <kbd className="hidden sm:inline">{t("hint")}</kbd>
    </button>
  );
}

function CommandDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations("command");
  const nav = useTranslations("nav");
  const router = useRouter();
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const items = useMemo<CommandItem[]>(
    () => [
      { href: "/", label: t("home") },
      { href: "/#status", label: t("status") },
      { href: "/#loop", label: t("loop") },
      { href: "/#proof", label: nav("proof") },
      { href: "/#projects", label: nav("projects") },
      { href: "/projects", label: t("archive") },
      { href: "/research", label: nav("research") },
      { href: "/now", label: nav("now") },
      { href: "/#contact", label: nav("contact") },
    ],
    [nav, t],
  );

  const egg = EGG_QUERY.test(query.trim());
  const filtered = egg
    ? []
    : items.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()));
  const current = Math.min(active, Math.max(filtered.length - 1, 0));

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function go(href: string) {
    onClose();
    router.push(href);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh] sm:pt-[18vh]">
      <button
        type="button"
        aria-label={t("close")}
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="palette-in relative w-full max-w-lg overflow-hidden rounded-panel border border-panel-border bg-panel-background text-panel-foreground shadow-2xl"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            onClose();
          } else if (event.key === "ArrowDown") {
            event.preventDefault();
            setActive((index) => Math.min(index + 1, Math.max(filtered.length - 1, 0)));
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive((index) => Math.max(index - 1, 0));
          } else if (event.key === "Enter" && filtered[current]) {
            event.preventDefault();
            go(filtered[current].href);
          }
        }}
      >
        <h2 id={titleId} className="sr-only">
          {t("label")}
        </h2>
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          placeholder={t("placeholder")}
          className="w-full border-b border-panel-border bg-transparent px-4 py-3 font-mono text-sm text-panel-foreground outline-none placeholder:text-panel-foreground/40"
        />
        {egg ? (
          <div className="px-4 py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {t("eggTitle")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-panel-foreground/80">
              {t("eggBody")}
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <p className="px-4 py-4 font-mono text-sm text-panel-foreground/55">{t("empty")}</p>
        ) : (
          <ul className="max-h-72 overflow-y-auto py-1">
            {filtered.map((item, index) => (
              <li key={item.href}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onClick={() => go(item.href)}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-2.5 text-left font-mono text-sm",
                    index === current
                      ? "bg-accent/15 text-accent"
                      : "text-panel-foreground/80",
                  )}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] uppercase tracking-wider text-panel-foreground/35">
                    {item.href}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

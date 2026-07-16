import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@data/site-config";
import { LocaleSwitch } from "./LocaleSwitch";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const t = useTranslations("nav");

  const navItems: Array<{ key: "proof" | "projects" | "research" | "now" | "contact"; href: Parameters<typeof Link>[0]["href"] }> = [
    { key: "proof", href: { pathname: "/", hash: "proof" } },
    { key: "projects", href: { pathname: "/", hash: "projects" } },
    { key: "research", href: "/research" },
    { key: "now", href: { pathname: "/", hash: "now" } },
    { key: "contact", href: { pathname: "/", hash: "contact" } },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-sm font-semibold tracking-tight text-foreground"
        >
          {siteConfig.name}
          <span className="mx-1.5 text-foreground-muted">·</span>
          <span className="font-mono text-xs font-normal text-foreground-muted">
            {siteConfig.brand}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="font-mono text-xs uppercase tracking-wider text-foreground-muted transition-colors hover:text-accent"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitch />
          <ThemeToggle />
        </div>
      </div>

      <nav className="flex items-center gap-5 overflow-x-auto whitespace-nowrap border-t border-border px-6 py-2 md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="font-mono text-[11px] uppercase tracking-wider text-foreground-muted transition-colors hover:text-accent"
          >
            {t(item.key)}
          </Link>
        ))}
      </nav>
    </header>
  );
}

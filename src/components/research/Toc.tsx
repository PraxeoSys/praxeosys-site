import type { Heading } from "@/lib/mdx";

export function Toc({ headings, label }: { headings: Heading[]; label: string }) {
  if (headings.length === 0) return null;

  return (
    <nav className="rounded-panel border border-border p-4">
      <p className="font-mono text-[11px] uppercase tracking-wider text-foreground-muted">
        {label}
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: (heading.depth - 2) * 12 }}
          >
            <a
              href={`#${heading.id}`}
              className="text-foreground-muted transition-colors hover:text-accent"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

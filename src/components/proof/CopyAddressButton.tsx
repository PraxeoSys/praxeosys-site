"use client";

import { useState } from "react";

export function CopyAddressButton({
  value,
  copyLabel,
  copiedLabel,
}: {
  value: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-panel border border-panel-border px-2.5 py-1 font-mono text-[11px] text-panel-foreground/70 transition-colors hover:border-accent hover:text-accent"
    >
      {copied ? copiedLabel : copyLabel}
    </button>
  );
}

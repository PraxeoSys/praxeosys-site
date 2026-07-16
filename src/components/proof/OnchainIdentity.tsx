import { getTranslations } from "next-intl/server";
import { siteConfig } from "@data/site-config";
import { Panel } from "@/components/ui/Panel";
import { BootFrame } from "@/components/ui/BootFrame";
import { CopyAddressButton } from "./CopyAddressButton";

/** Renders nothing when no identity wallet address is configured — see data/site-config.ts. */
export async function OnchainIdentity() {
  const { ensOrAddress, etherscanBase, debankBase } = siteConfig.onchain;
  if (!ensOrAddress) return null;

  const t = await getTranslations("proof.onchain");

  return (
    <BootFrame>
      <Panel title={t("title")}>
        <div className="flex flex-wrap items-center gap-3">
          <code className="font-mono text-sm text-panel-foreground">
            {ensOrAddress}
          </code>
          <CopyAddressButton
            value={ensOrAddress}
            copyLabel={t("copy")}
            copiedLabel={t("copied")}
          />
        </div>

        <div className="mt-4 flex gap-4">
          <a
            href={`${etherscanBase}${ensOrAddress}`}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-accent hover:underline"
          >
            {t("etherscan")}
          </a>
          <a
            href={`${debankBase}${ensOrAddress}`}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-accent hover:underline"
          >
            {t("debank")}
          </a>
        </div>
      </Panel>
    </BootFrame>
  );
}

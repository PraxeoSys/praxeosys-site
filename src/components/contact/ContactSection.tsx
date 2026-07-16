import { getTranslations } from "next-intl/server";
import { siteConfig } from "@data/site-config";
import { Panel } from "@/components/ui/Panel";

export async function ContactSection() {
  const t = await getTranslations("contact");

  const channels = [
    siteConfig.social.twitter && {
      key: "x",
      href: `https://x.com/${siteConfig.social.twitter}`,
    },
    siteConfig.social.telegram && {
      key: "tg",
      href: `https://t.me/${siteConfig.social.telegram}`,
    },
    { key: "gh", href: `https://github.com/${siteConfig.github}` },
    { key: "mail", href: `mailto:${siteConfig.social.email}` },
    siteConfig.onchain.ensOrAddress && {
      key: "ens",
      href: `${siteConfig.onchain.etherscanBase}${siteConfig.onchain.ensOrAddress}`,
    },
  ].filter((c): c is { key: string; href: string } => Boolean(c));

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
        {t("heading")}
      </h2>

      <div className="mt-8">
        <Panel>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-sm">
            <span className="text-panel-foreground/70">{t("prompt")}</span>
            {channels.map((channel, i) => (
              <span key={channel.key} className="flex items-center gap-2">
                {i > 0 && <span className="text-panel-foreground/30">|</span>}
                <a
                  href={channel.href}
                  target={channel.key === "mail" ? undefined : "_blank"}
                  rel={channel.key === "mail" ? undefined : "noreferrer"}
                  className="text-accent hover:underline"
                >
                  {channel.key}
                </a>
              </span>
            ))}
          </p>
        </Panel>
      </div>
    </section>
  );
}

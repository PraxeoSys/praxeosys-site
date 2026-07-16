/**
 * ============================================================================
 *  站点核心配置 — 你需要维护的最重要的文件
 * ============================================================================
 * 只改这个文件里的值，不要碰组件代码。
 * 留空字符串 "" 的字段会导致对应卡片/链接在站点上自动隐藏（见各字段注释）。
 */

export const siteConfig = {
  /** Hero 中出现的个人名（信任锚） */
  name: "Johnny",

  /** 品牌/域名，站点标题与 logo 使用 */
  brand: "PraxeoSys",
  domain: "praxeosys.com",

  /** 生产环境完整 URL，用于 metadataBase / OG / sitemap */
  url: "https://praxeosys.com",

  /** GitHub 用户名，用于贡献热力图 API 与项目链接 */
  github: "PraxeoSys",

  social: {
    /** X/Twitter 用户名（不含 @）。留空则隐藏该入口 */
    twitter: "praxeosys",

    /** Telegram 用户名（不含 @）。留空则隐藏该入口 */
    telegram: "praxeosys",

    /** 联系邮箱 */
    email: "johnnysinfiniteganme@gmail.com",
  },

  /**
   * 链上身份卡。
   *
   * ⚠️ 安全提示：必须使用专门新开的"身份钱包"地址用于公开展示，
   * 绝不要填写存有资产的主力热钱包地址。
   *
   * ensOrAddress 留空（""）时，Proof 区的链上身份卡会整体隐藏，
   * 不会渲染任何占位符或空状态。
   */
  onchain: {
    ensOrAddress: "", // TODO: 例如 "yourname.eth" 或 "0x..."
    etherscanBase: "https://etherscan.io/address/",
    debankBase: "https://debank.com/profile/",
  },
} as const;

export type SiteConfig = typeof siteConfig;

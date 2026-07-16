# Johnny 个人主页 — Claude Code 开发 Prompt

> 使用方法：把下面「=== PROMPT 开始 ===」到「=== PROMPT 结束 ===」之间的全部内容粘贴给 Claude Code。粘贴前先搜索 `【填写】` 并替换成你的真实信息（不填也能跑，会用占位符）。

=== PROMPT 开始 ===

## 角色与目标

你是一位资深全栈工程师 + 品牌设计师。为我构建一个生产级个人主页，目标是超越 shawnwick.com 这类同侪站点。核心差异化：**用可验证的证据（Proof of Work）代替自我描述**。

## 我是谁

- 个人名：Johnny（信任锚，Hero 中出现）
- 品牌/域名：**PraxeoSys**，域名 **praxeosys.com**——站点标题与 logo 用 PraxeoSys，Hero 中两者并置（如 "Johnny — building PraxeoSys"），个人给信任、品牌给系统留空间
- 一句话身份：独立开发者 × Web3 builder × 交易员 × 量化研究者 × 经济学思考者
- 统一叙事主线（全站围绕这句话）：**「用经济学理解市场，用代码验证认知，用交易兑现判断。」** 英文版：*"I read markets through economics, test beliefs with code, and settle them with trades."*
- GitHub 用户名：PraxeoSys
- X/Twitter：【填写】 Telegram：【填写】 Email: johnnysinfiniteganme@gmail.com
- ENS/钱包地址：【填写，注意：必须使用专门新开的"身份钱包"地址，绝不使用存有资产的主力热钱包；未填则整卡隐藏】

## 技术栈（严格遵守）

- Next.js 14+ (App Router) + TypeScript + Tailwind CSS
- 内容：MDX（研究文章/数字花园），文章 frontmatter 含 title/date/lang/tags/summary
- 国际化：中英双语，`next-intl` 或等价方案，路由 `/zh` 与 `/en`，右上角切换，默认按浏览器语言
- 图表：轻量方案（如 recharts 或原生 SVG），不引入重型图表库
- 部署目标：Vercel，全静态优先（ISR 用于 GitHub 数据）
- 禁止：不用 CMS、不用重型 3D/WebGL、不用模板感 UI 库

## 视觉方向：「Quiet Terminal」（编辑部极简 × 交易终端）

两种风格融合而非并列：
- **骨架是编辑部极简**：大量留白、克制的排版层级、正文用高可读性字体（如 Inter / 思源黑体），标题可用衬线体制造研究机构感
- **数据是终端风**：所有数字、代码、行情、业绩指标一律等宽字体（JetBrains Mono），数据模块用深色面板（近黑 #0A0A0A）+ 单一强调色（终端绿 #00FF88 或琥珀 #FFB000，二选一，全站唯一强调色）
- 整体：暗色主题为主（deep charcoal 而非纯黑），提供浅色切换；微交互克制（hover 下划线、数字滚动动画、面板淡入），拒绝浮夸滚动特效
- 质感参考：Bloomberg 终端的数据密度感 + 独立研究员博客的安静感

## 站点结构（单页滚动 + 少量子页面）

### 1. Hero
- 大字名字 + 统一叙事那句话（中/英随语言切换）
- 下方一条**实时状态栏**（终端风，等宽字体）：`> now: 【填写当前专注的事】 | github: 最近 commit 时间(API 取) | markets: watching 【填写】`
- 两个 CTA：View Proof / Read Research

### 2. The Loop（方法论，最重要的差异化模块）
- 用一个简洁的交互 SVG 图展示认知闭环：**Thesis(经济学假设) → Code(策略/工具实现) → Trade(真实市场执行) → Verify(复盘修正)** → 回到 Thesis
- 每个节点 hover/点击展开一段说明 + 对应到站内实例的链接（如 Code → 某项目，Verify → 某篇复盘文章）
- 这是全站叙事的锚：四种身份不是并列的标签，而是同一个流程的四个环节

### 3. Proof（可验证证据区，深色终端面板）
三个并排/堆叠的数据模块：
- **GitHub 贡献热力图**：调 GitHub 公开 API（GraphQL contributions 或 github-contributions-api），ISR 每日刷新，下方一行统计（总 commit / 活跃周数）
- **策略业绩曲线**：完整实现但默认关闭（`data/performance.json` 中 `enabled: false`，上线时该模块整体隐藏，位置由 GitHub 卡自然填充）。数据格式：`[{date, equity, benchmark}]`，渲染累计收益率曲线（脱敏为百分比，不显示绝对金额），旁边 Sharpe / 最大回撤 / 运行时长三个指标卡。留好注释：未来可替换为交易所 API。给我一份示例 JSON。设计原因：业绩数据必须等有完整可辩护的记录后再启用，宁缺毋假
- **链上身份**：展示 ENS/地址（可复制），链接到 Etherscan/DeBank。若我未填地址则隐藏此卡

### 4. Projects
- 只展示 shipped/可演示的项目，卡片字段：名称、一句话、**问题 → 方法 → 结果（必须有数字）**、tech 标签、链接（demo/GitHub）
- 我的项目清单：【填写，每个项目按上述字段给出；暂时没有就先放 2 个占位卡并标注 TODO】
- 卡片数量控制在 3–5 个，多余的放 `/projects` 归档页

### 5. Research（数字花园）
- MDX 文章列表，分类标签：宏观经济 / 市场结构 / 量化研究 / Web3 / 复盘 / 随笔
- 「随笔」为跨界内容（用金融框架解读生活），列表与文章页用轻微不同的视觉标记与 Research 类目区分；首页 Research 区优先展示复盘与研究类，随笔不置顶
- 「复盘」是重点栏目：诚实记录交易回撤与修复过程的研究文章（哪里错了、策略怎么改、风控加了什么）——这是本站可信度的核心来源之一
- 列表页 + 文章页，文章页排版按长文阅读优化（65ch 行宽、目录、阅读时间）
- 我提供 3 篇现成 MDX 文章（随 prompt 附上 `site-content/` 目录，含 frontmatter）：《解剖乔家大院》（Research 置顶，featured: true）、《如果爱情是一只股票》（随笔）、《悉达多的河流》（复盘，draft: true 暂不发布）。直接导入使用，尊重 frontmatter 中的 category/featured/draft 字段

### 6. Now
- 独立小节：当前专注、正在研究的问题、观察中的市场机会（手动维护的 MDX/JSON）
- 显示最后更新时间——这个页面的新鲜度本身就是信号

### 7. Contact / Footer
- X / Telegram / GitHub / Email / ENS，终端风格式：`$ connect --via x|tg|gh|mail`
- Footer 极简：© 2026 + 一句话

## 工程质量要求

- Lighthouse：Performance/SEO/A11y 全部 90+；LCP < 2s
- 完整 SEO：metadata、OG image（用 @vercel/og 动态生成，含名字+叙事句）、sitemap、多语言 hreflang
- 移动端优先，所有数据模块在窄屏下可用
- 代码组织清晰：`components/ modules/ data/ content/`，所有「我需要填的内容」集中在 `data/site-config.ts` 和 `data/` 目录，并在 README 里列一张「内容更新指南」表
- Git 提交按模块分步，README 写清本地运行与 Vercel 部署步骤

## 验收标准

1. 访客 10 秒内能明白我是谁、我的方法论、以及为什么该信我（有数据）
2. 全站没有一句无凭据的自夸（如 profitable/expert 这类词必须有对应 Proof 支撑）
3. 中英切换后所有内容（含数据模块标签）完整翻译
4. 我只需改 `data/` 和 `content/` 目录就能维护全站，无需碰组件代码

先输出你的实现计划（文件树 + 分步顺序）让我确认，然后再开始写代码。

=== PROMPT 结束 ===

---

## 附：你需要准备的素材清单

| 项 | 说明 | 状态/优先级 |
|---|---|---|
| 域名 | praxeosys.com | ✅ 已定，去注册商确认可用并购买 |
| GitHub 用户名 | PraxeoSys | ✅ 已定 |
| 2–3 个已完成项目 | 每个要有可量化的结果 | 高 |
| 2 篇研究文章 | 已写好，发给 Claude 整理格式 | 高 |
| 身份钱包 + ENS | 新开专用地址（勿用主力热钱包），注册/找回 ENS 指向它 | 中 |
| 策略业绩数据 | 暂缓——等有完整可辩护记录后再启用模块 | 低（模块预留） |

import type { Localized } from "@/lib/types";

/**
 * ============================================================================
 *  项目清单
 * ============================================================================
 * - 只展示 shipped / 可演示的项目。
 * - result 字段必须包含具体数字（延迟、收益率、用户数、回测胜率等），
 *   不写"效果良好"这类无凭据的自夸。
 * - featured: true 的项目显示在首页（建议 3–5 个），其余在 /projects 归档页展示。
 * - status: "todo" 的卡片会在标题旁显示 TODO 徽章，提醒你替换为真实项目。
 */

export interface ProjectMilestone {
  label: Localized;
  status: "done" | "in-progress" | "planned";
  /** Optional YYYY-MM or YYYY-MM-DD. */
  date?: string;
}

export interface ProjectDirection {
  /** What problem this solves and where it's headed. */
  vision: Localized;
  roadmap: Localized;
  milestones: ProjectMilestone[];
}

export interface ProjectMetric {
  label: Localized;
  /** Pre-formatted display string (e.g. "1.2s", "230 users"). */
  value: string;
}

export interface ProjectProgress {
  status: Localized;
  metrics: ProjectMetric[];
}

export interface Project {
  slug: string;
  status: "shipped" | "todo";
  featured: boolean;
  title: Localized;
  oneLiner: Localized;
  problem: Localized;
  method: Localized;
  result: Localized;
  tech: string[];
  links: {
    demo?: string;
    github?: string;
  };
  /** Feeds the archive drawer's "01 Direction" panel. */
  direction: ProjectDirection;
  /** Feeds the archive drawer's "02 Progress" panel. */
  progress: ProjectProgress;
  /** Feeds the archive drawer's "03 Skills" panel (tag pills). */
  skills: string[];
}

export const projects: Project[] = [
  {
    slug: "hyperliquid-btc-bot",
    status: "shipped",
    featured: true,
    title: {
      en: "Hyperliquid BTC Bot",
      zh: "Hyperliquid BTC 量化交易系统",
    },
    oneLiner: {
      en: "A rules-based BTC perpetual-futures swing system with hard circuit breakers, running on a small proof-of-concept stake.",
      zh: "带硬性熔断机制的 BTC 永续合约波段交易系统，用一小笔验证性资金起步。",
    },
    problem: {
      en: "Discretionary crypto trading doesn't scale and leaves no audit trail; going systematic needs a strategy that's honest about what it can't predict, plus execution discipline no human sustains alone.",
      zh: "主观交易不可复制、没有审计轨迹；做系统化交易，既需要一个对「能不能预测」诚实的策略，也需要人单靠自己提供不了的执行纪律。",
    },
    method: {
      en: "Built on Freqtrade with a Smart Money Concepts strategy layer and a Coinglass sidecar for order-flow data (funding, open interest, liquidation levels). Three independent circuit breakers sit in the execution loop; positions pyramid in on confirmation with a ratcheting stop, and take-profit scales out via a 5-factor structural-reversal score.",
      zh: "基于 Freqtrade + Smart Money Concepts 策略层，用 Coinglass 订单流数据（资金费率、持仓量、清算位）做辅助 sidecar。执行循环内置三道独立熔断；仓位随结构确认金字塔式加仓、止损棘轮上移，止盈按5因子结构反转评分分级减仓。",
    },
    result: {
      en: "5 execution-layer bugs were caught only by live dry-run testing (not code review), including 2 that silently broke risk-budget math — all fixed. Of 15 pre-registered crash-precursor indicators, 2 technically cleared the bar; none held up after base-rate and independence checks in the formation sample (held-out period, 2022 onward, not yet run).",
      zh: "5 个执行层 bug 只有实盘 dry-run 才发现（代码审查看不出来），其中 2 个曾静默破坏风险预算计算，均已修复。15 个预注册的暴跌前兆指标里，有 2 个技术上过了门槛；在形成期样本里，经过基准率和独立性检验后没有一个站得住（2022 年起的样本外时段还没跑）。",
    },
    tech: ["Freqtrade", "Python", "Docker", "Coinglass API"],
    links: {
      demo: undefined,
      github: undefined,
    },
    direction: {
      vision: {
        en: "A trading system where the human judges market structure and the machine handles calculation and execution discipline — never the reverse. A scoring system that fails out-of-sample testing twice is permanently demoted to a dashboard, not given a third try.",
        zh: "人负责判断市场结构，机器负责计算和执行纪律——绝不反过来。评分系统若第二轮重构后仍通不过样本外检验，就永久降级为仪表盘，不再尝试第三轮。",
      },
      roadmap: {
        en: "Next: a market-regime percentile dashboard. The crash-precursor study is not a finished screen — the held-out period has not been run. The read-only analyst layer with zero order authority now exists as its own project, BTC Trader Agent — it is not a module of this bot.",
        zh: "接下来：做一个市场状态分位数仪表盘。暴跌前兆研究还不是完成的筛选，样本外时段尚未跑。原先设想的只读、零下单权限分析层，已经作为独立项目「BTC 交易分析 Agent」落地，它不是这个 bot 的子模块。",
      },
      milestones: [
        {
          label: {
            en: "Execution-layer bug fixes (5 found via live dry-run only)",
            zh: "执行层 bug 修复（5个仅靠实盘 dry-run 才发现）",
          },
          status: "done",
        },
        {
          label: {
            en: "Pyramid entries + graded take-profit + ratcheting stop",
            zh: "金字塔加仓 + 分级止盈 + 棘轮止损",
          },
          status: "done",
        },
        {
          label: {
            en: "Circuit breakers (daily loss / max drawdown / per-trade risk)",
            zh: "三道熔断（当日亏损 / 最大回撤 / 单笔风险）",
          },
          status: "done",
        },
        {
          label: {
            en: "Crash-precursor study, formation sample: 2 of 15 cleared the bar; none held up after base-rate and independence checks (held-out not run)",
            zh: "暴跌前兆研究（形成期）：15 个里 2 个过了技术门槛，经基准率与独立性检验后无一站得住（样本外尚未跑）",
          },
          status: "done",
        },
        {
          label: {
            en: "Market-regime percentile dashboard",
            zh: "市场状态分位数仪表盘",
          },
          status: "planned",
        },
      ],
    },
    progress: {
      status: {
        en: "Dry-run only for now; every execution path has been live-tested, not just unit-tested, which is how the 5 real bugs above were actually caught.",
        zh: "目前仅 dry-run；每条执行路径都做过实盘测试而不只是单元测试，上面那5个真实 bug 正是这样才被揪出来的。",
      },
      metrics: [
        {
          label: { en: "Execution bugs found via live testing", zh: "实盘测试发现的执行层 bug" },
          value: "5",
        },
        {
          label: {
            en: "Crash-precursor indicators in the formation sample",
            zh: "形成期样本中的暴跌前兆指标",
          },
          value: "15",
        },
        {
          label: { en: "Per-trade risk cap", zh: "单笔风险上限" },
          value: "2%",
        },
      ],
    },
    skills: [
      "Freqtrade",
      "Python",
      "Docker",
      "量化风控设计 / Risk Systems",
      "订单流数据 / Order Flow",
      "预注册研究方法论",
    ],
  },
  {
    slug: "trade-agent",
    status: "shipped",
    featured: true,
    title: {
      en: "Trade Agent",
      zh: "Trade Agent 外贸获客自动化",
    },
    oneLiner: {
      en: "An AI pipeline that finds, scores, and drafts multilingual outreach to B2B export leads.",
      zh: "自动发现、评分并生成多语言开发信的 B2B 外贸获客流水线。",
    },
    problem: {
      en: "Manually searching overseas company directories, writing cold emails one by one, and tracking follow-ups by hand doesn't scale.",
      zh: "人工逐个搜索海外企业名录、手写开发信、逐条跟进——这套流程规模上不去。",
    },
    method: {
      en: "A Python pipeline: Serper Maps API for lead discovery, a scraper + DeepSeek scoring pass for enrichment, AI-drafted emails/WhatsApp/LinkedIn messages in the target market's language, WeChat-notified human approval, and an autopilot mode that auto-sends high-confidence drafts while routing uncertain ones to a person. Packaged with Docker.",
      zh: "Python 流水线：Serper Maps API 发现线索 → 爬虫 + DeepSeek 评分做情报补全 → AI 生成目标市场语言的邮件/WhatsApp/LinkedIn 草稿 → 微信推送人工审批 → autopilot 模式对高置信度草稿自动发送、低置信度转人工。以 Docker 打包部署。",
    },
    result: {
      en: "Processed 192 leads end-to-end at an average AI quality score of 6.37/10, for roughly $0.006 in API cost per lead. Reply rate and bounce rate have not been measured.",
      zh: "192 条线索全流程处理，AI 平均评分 6.37/10，单条线索 API 成本约 $0.006。回复率和退信率尚未测量。",
    },
    tech: ["Python", "FastAPI", "DeepSeek API", "Serper API", "Playwright", "Docker", "SQLite"],
    links: {
      demo: undefined,
      github: undefined,
    },
    direction: {
      vision: {
        en: "Replace manual cold-outreach grunt work with an AI pipeline that scales past what one person can type — without losing the personalization that makes cold email actually work.",
        zh: "用 AI 流水线取代人工搜索加手写开发信的体力活，规模超过一个人手动打字的上限——同时不丢失让冷邮件真正有效的个性化程度。",
      },
      roadmap: {
        en: "Next: turn on autopilot for the 87 leads still waiting on approval, put reply monitoring on a scheduled job, and manually source decision-makers' LinkedIn profiles for the highest-scored leads. A bounce rate under 1.5% and a reply rate of 5–10% are targets, not results — neither has been measured here. A 2–5% cold-email reply rate is a figure often cited for the industry, not a number from this pipeline.",
        zh: "接下来：为剩余 87 条待审批线索开启 autopilot 批量发送，把回函监控接入定时任务，为高评分线索人工补充采购/供应链负责人的 LinkedIn 个人主页。退信率低于 1.5%、回复率 5–10% 是目标，不是结果——这里都还没测过。冷邮件回复率常被说成 2–5%，那是行业里常引用的数字，不是这条流水线的数字。",
      },
      milestones: [
        {
          label: {
            en: "Lead discovery + enrichment + AI scoring",
            zh: "线索发现 + 情报补全 + AI 评分",
          },
          status: "done",
        },
        {
          label: {
            en: "Multilingual draft generation (email/WhatsApp/LinkedIn)",
            zh: "多语言草稿生成（邮件/WhatsApp/LinkedIn）",
          },
          status: "done",
        },
        {
          label: {
            en: "AI autopilot approval + WeChat human-review fallback",
            zh: "AI autopilot 审批 + 微信人工兜底",
          },
          status: "done",
        },
        {
          label: {
            en: "Scheduled reply monitoring + LinkedIn outreach scale-up",
            zh: "回函监控定时化 + LinkedIn 外联规模化",
          },
          status: "planned",
        },
      ],
    },
    progress: {
      status: {
        en: "Live and processing real leads; still in the manual-approval-heavy phase while autopilot's confidence threshold gets tuned on real outcomes.",
        zh: "已上线并处理真实线索，目前仍以人工审批为主，autopilot 的置信度阈值还在用真实结果调优。",
      },
      metrics: [
        {
          label: { en: "Leads processed", zh: "处理线索数" },
          value: "192",
        },
        {
          label: { en: "Avg. AI lead score", zh: "AI 平均评分" },
          value: "6.37/10",
        },
        {
          label: { en: "API cost per lead", zh: "单线索 API 成本" },
          value: "~$0.006",
        },
      ],
    },
    skills: [
      "Python",
      "FastAPI",
      "DeepSeek API",
      "Prompt Engineering",
      "Playwright 自动化",
      "增长/获客系统设计",
    ],
  },
  {
    slug: "tidehook",
    status: "shipped",
    featured: true,
    title: {
      en: "TideHook",
      zh: "潮钓 TideHook",
    },
    oneLiner: {
      en: "A WeChat mini-program marketplace matching sea-fishing charter boats with anglers.",
      zh: "撮合海钓船家与钓友的微信小程序平台。",
    },
    problem: {
      en: "Sea-fishing charters get booked by phone and word-of-mouth — no way to compare boats or prices, or read real reviews, before paying.",
      zh: "海钓出海全靠电话和熟人介绍，钓友订船前既比不了价，也看不到真实评价。",
    },
    method: {
      en: "Built the full stack solo: UniApp/Vue3 mini-program frontend, Supabase backend with row-level security for zero-trust data isolation, three user roles (anglers/boat owners/fishing guides), in-app chat with read receipts, and an AI fish-ID feature backed by a 60-species field guide.",
      zh: "独立完成全栈搭建：UniApp/Vue3 小程序前端 + Supabase 后端（行级权限做零信任数据隔离），钓友/船家/导钓三种角色体系，带已读回执的即时聊天，以及基于60种鱼类图鉴的 AI 拍照识鱼功能。",
    },
    result: {
      en: "10+ core modules shipped end-to-end across all three roles; real-name auth and in-app payments are fully spec'd and ready, blocked only on the business license needed to apply for a WeChat Pay merchant account.",
      zh: "三种角色的10+核心模块全部独立交付；实名认证和小程序内支付已设计到位，只差企业营业执照才能申请微信支付商户号。",
    },
    tech: ["UniApp", "Vue 3", "Supabase", "PostgreSQL RLS", "WeChat Mini Program"],
    links: {
      demo: undefined,
      github: undefined,
    },
    direction: {
      vision: {
        en: "Turn an opaque, phone-and-referral sea-fishing industry into something you can browse, compare, and book online — with a trust layer (reviews, verified boats) phone bookings never had.",
        zh: "把靠电话和熟人介绍的海钓行业，变成可以在线浏览、比价、下单的透明市场——外加电话订船从来没有的信任层（评价、船只认证）。",
      },
      roadmap: {
        en: "Next, blocked on incorporating a company: real-name verification, WeChat Pay, boat-owner deposits, angler deposits, breach-of-contract payouts. Available any time, no resourcing dependency: community posts, a small in-app gear shop, insurance API integration.",
        zh: "接下来（需要先完成公司注册）：实名认证、微信支付接入、船家保证金、钓友定金下单、违约赔付逻辑。不依赖资质、随时可做：社区发帖、小型装备商城、保险产品接口。",
      },
      milestones: [
        {
          label: {
            en: "Security foundation (real auth, key isolation, RLS)",
            zh: "安全地基（真实登录 / 密钥隔离 / 行级权限）",
          },
          status: "done",
        },
        {
          label: {
            en: "Angler + boat-owner + guide role systems",
            zh: "钓友 / 船家 / 导钓三端角色体系",
          },
          status: "done",
        },
        {
          label: {
            en: "Chat, ratings, AI fish-ID, weather panel",
            zh: "聊天、评价、AI 识鱼、海况天气",
          },
          status: "done",
        },
        {
          label: {
            en: "Payments + deposits (needs business registration)",
            zh: "支付与保证金体系（需先完成工商注册）",
          },
          status: "planned",
        },
      ],
    },
    progress: {
      status: {
        en: "Feature-complete for everything that doesn't require a business license. Payment-dependent features are fully spec'd and just waiting on incorporation.",
        zh: "不依赖企业资质的功能已全部完成。支付相关功能设计已就绪，只等公司注册落地。",
      },
      metrics: [
        {
          label: { en: "Core modules shipped", zh: "核心模块交付数" },
          value: "10+",
        },
        {
          label: { en: "User roles", zh: "用户角色体系" },
          value: "3",
        },
        {
          label: { en: "Fish species catalogued", zh: "鱼类图鉴收录" },
          value: "60",
        },
      ],
    },
    skills: [
      "UniApp",
      "Vue 3",
      "Supabase",
      "PostgreSQL RLS",
      "微信小程序开发",
      "零信任数据设计",
    ],
  },
  {
    slug: "lingua-nest",
    status: "shipped",
    featured: false,
    title: {
      en: "LinguaNest",
      zh: "语巢 LinguaNest",
    },
    oneLiner: {
      en: "An Android app that simulates a bilingual home for kids whose parents don't speak English.",
      zh: "帮不会英语的中国父母模拟双语家庭环境的手机 App。",
    },
    problem: {
      en: "Chinese parents who don't speak English can't create an immersive bilingual environment for their kids, and most English-learning apps are one-way content feeds with no real interaction.",
      zh: "不会英语的中国父母没法为孩子创造双语沉浸环境，市面英语启蒙产品大多是单向内容投喂，缺乏真实互动反馈。",
    },
    method: {
      en: "An on-device audio pipeline: voice-activity detection listens for the parent's Chinese speech, triggers TTS of the matching English word, then opens an 8-second window listening for the child's attempt at repeating it in English, matched via edit-distance against a variant table. A correct match triggers a haptic buzz and a full-screen bilingual translation card coaching the parent's response.",
      zh: "本地端到端音频管线：语音活动检测捕捉家长的中文，触发对应英文单词的 TTS 播放，随后打开 8 秒窗口监听孩子的英文仿说尝试，用编辑距离匹配变体词表判定命中。命中后手机震动，弹出全屏中英翻译卡引导家长的回应话术。",
    },
    result: {
      en: "The word-matching engine tested at 22 true positives / 0 false positives (100% hit rate, 0% false-positive rate). Both directions of the voice loop are wired end-to-end; real-device acceptance testing is the one item left before the next milestone.",
      zh: "词表匹配器测得 22 真阳性 / 0 假阳性（命中率100%，误报率0%）。双向语音交互全链路已打通，真机验收是进入下一里程碑前唯一剩下的一项。",
    },
    tech: ["Flutter", "Dart", "On-device ASR/TTS/VAD", "Drift (SQLite)"],
    links: {
      demo: undefined,
      github: undefined,
    },
    direction: {
      vision: {
        en: "Give a household with zero English ability the same casual bilingual exposure a child would get growing up with one English-speaking parent — entirely through a phone, entirely privacy-preserving (nothing leaves the device).",
        zh: "让完全不懂英语的家庭，也能让孩子获得类似「父母一方讲英语」家庭里那种随口而来的双语暴露——完全通过手机实现，完全保护隐私（数据不出设备）。",
      },
      roadmap: {
        en: "Restarting active development now for real-device acceptance testing of the voice loop, then moving to: a daily parent-coaching card, a growth/progress log, and a formal privacy layer (visible recording indicator, one-tap data wipe).",
        zh: "现在重新启动开发，先做语音闭环的真机验收测试，再推进：每日父母话术提示卡、成长记录页、正式的隐私合规层（录音状态常显、一键清除数据）。",
      },
      milestones: [
        {
          label: {
            en: "Walking skeleton: audio pipeline + VAD + TTS + local DB",
            zh: "行走骨架：音频管线 + VAD + TTS + 本地数据库",
          },
          status: "done",
        },
        {
          label: {
            en: "Child word-matching engine (22 TP / 0 FP)",
            zh: "孩子词表容错匹配（22 真阳性 / 0 假阳性）",
          },
          status: "done",
        },
        {
          label: {
            en: "Forward + reverse voice channel (parent<->child)",
            zh: "正向 + 反向语音通道（家长<->孩子）",
          },
          status: "done",
        },
        {
          label: {
            en: "Real-device acceptance testing",
            zh: "真机验收测试",
          },
          status: "in-progress",
        },
        {
          label: {
            en: "Parent coaching cards + growth log + privacy layer",
            zh: "父母话术卡 + 成长记录 + 隐私合规层",
          },
          status: "planned",
        },
      ],
    },
    progress: {
      status: {
        en: "Core bidirectional voice loop is code-complete and unit-tested; restarting now to run it on real hardware, since the emulator can't fully exercise the Chinese/English ASR paths.",
        zh: "核心双向语音闭环已完成编码和单元测试；因为模拟器无法完整跑通中英文语音识别，现在重启项目转向真机测试。",
      },
      metrics: [
        {
          label: { en: "Word-match hit rate", zh: "词表匹配命中率" },
          value: "100%",
        },
        {
          label: { en: "False-positive rate", zh: "误报率" },
          value: "0%",
        },
        {
          label: { en: "Voice-loop milestones shipped", zh: "语音闭环里程碑完成度" },
          value: "3/5",
        },
      ],
    },
    skills: [
      "Flutter/Dart",
      "端上语音识别 On-device ASR",
      "音频信号处理",
      "隐私优先架构设计",
    ],
  },
  {
    slug: "automd-obsidian",
    status: "shipped",
    featured: true,
    title: {
      en: "Markdown Knowledge Base",
      zh: "Markdown 知识库",
    },
    oneLiner: {
      en: "A GitHub-native, all-Markdown personal knowledge base where Claude Code is the archivist.",
      zh: "以 GitHub 为中心、纯 Markdown 的个人知识库，用 Claude Code 当图书管理员自动归档。",
    },
    problem: {
      en: "Personal knowledge (AI chat exports, articles, books, video transcripts) scatters across tools with no durable, searchable, vendor-independent home — and manual organizing rarely survives contact with real volume.",
      zh: "个人知识（AI 对话记录、文章、书籍、视频转写）散落在各种工具里，没有一个持久、可检索、不被厂商锁定的归宿——手动整理这些内容，量一大基本都半途而废。",
    },
    method: {
      en: "A zero-custom-tooling pipeline: off-the-shelf converters normalize any source into Markdown and drop it in inbox/, then Claude Code acts as the archivist — deduping by source ID, routing into a typed directory structure, backfilling frontmatter, building wikilinks, and updating Dataview-driven indexes — all governed by a written rulebook rather than ad-hoc judgment calls.",
      zh: "一套零自研工具的流水线：现成的转换器把任意来源统一转成 Markdown 扔进 inbox/，再由 Claude Code 当图书管理员——按来源 ID 查重、按类型路由进结构化目录、补全 frontmatter、建立双向链接、更新 Dataview 动态索引，整套流程由一份成文规则约束，而不是临场判断。",
    },
    result: {
      en: "Supports 4 source types (AI session exports, web articles, books/long docs, video transcripts) end-to-end; extending to a new source takes exactly 2 steps (one converter script, one routing-table row) with zero changes to the core structure. Sensitive-data scanning runs twice — once in the archiving pass, once via a GitHub Actions gitleaks check on push — before anything reaches the remote.",
      zh: "端到端支持 4 种来源类型（AI 对话导出、网页文章、书籍/长文档、视频转写）；接入新来源只需 2 步（加一个转换脚本、加一行路由规则），核心结构零改动。敏感信息扫描跑两道——归档时一次，push 时 GitHub Actions 的 gitleaks 再扫一次——才允许内容进远端仓库。",
    },
    tech: ["Markdown", "Obsidian", "Claude Code", "GitHub Actions", "Dataview", "gitleaks"],
    links: {
      demo: undefined,
      github: undefined,
    },
    direction: {
      vision: {
        en: "A knowledge base that outlives any single tool — plain Markdown means no vendor lock-in, Git means full history and multi-device sync, and a librarian with a written rulebook means organization survives volume instead of decaying into an unsorted pile.",
        zh: "一个不依赖任何单一工具就能长期存活的知识库——纯 Markdown 意味着不被厂商锁定，Git 意味着完整历史和多设备同步，一个照章办事的图书管理员意味着内容量上来之后组织结构不会烂尾变成一堆废纸。",
      },
      roadmap: {
        en: "Next: wire up more source converters (starting with tool session exports beyond Claude Code, e.g. Cursor — the routing path is already reserved), and let the permanent notes layer grow as raw archived material gets revisited and synthesized.",
        zh: "接下来：接入更多来源转换器（先从 Claude Code 之外的工具会话导出开始，比如 Cursor——归档路径已经预留好了），并让提炼后的永久笔记层随着原始归档内容被反复回顾、综合而持续生长。",
      },
      milestones: [
        {
          label: {
            en: "Core archiving pipeline (dedupe, route, frontmatter, link, index)",
            zh: "核心归档流水线（查重 / 路由 / 元数据 / 建链 / 索引）",
          },
          status: "done",
        },
        {
          label: {
            en: "4 source-type converters (sessions/articles/books/videos)",
            zh: "4 种来源类型转换器（对话 / 文章 / 书籍 / 视频）",
          },
          status: "done",
        },
        {
          label: {
            en: "Two-layer secret scanning (archive-time + CI gitleaks)",
            zh: "两道密钥扫描（归档时 + CI gitleaks）",
          },
          status: "done",
        },
        {
          label: {
            en: "Distilled notes layer growing from archived material",
            zh: "从归档材料中持续生长的提炼笔记层",
          },
          status: "in-progress",
        },
        {
          label: {
            en: "Additional tool-session converters (e.g. Cursor)",
            zh: "接入更多工具会话转换器（如 Cursor）",
          },
          status: "planned",
        },
      ],
    },
    progress: {
      status: {
        en: "Core pipeline and rulebook are in daily use; the main open work is qualitative — letting the permanent notes layer actually accumulate distilled insight rather than staying a raw archive.",
        zh: "核心流水线和规则已经在日常使用中；剩下的主要是质变工作——让永久笔记层真正积累提炼后的洞见，而不是停留在原始归档状态。",
      },
      metrics: [
        {
          label: { en: "Source types supported", zh: "支持来源类型" },
          value: "4",
        },
        {
          label: { en: "Steps to add a new source", zh: "接入新来源所需步骤" },
          value: "2",
        },
        {
          label: { en: "Secret-scan passes before remote", zh: "到达远端前的密钥扫描道数" },
          value: "2",
        },
      ],
    },
    skills: [
      "Markdown 工具链设计",
      "Claude Code 自动化",
      "信息架构 / Information Architecture",
      "GitHub Actions",
      "隐私优先流程设计",
    ],
  },
  {
    slug: "btc-trader-agent",
    status: "shipped",
    featured: true,
    title: {
      en: "BTC Trader Agent",
      zh: "BTC 交易分析 Agent",
    },
    oneLiner: {
      en: "A daily market-analysis agent for BTC, with ETH and SOL as context: analysis only, no order authority. Forecasts are appended and scored by a script. Daily runs are on Codex CLI.",
      zh: "每日 BTC 盘面分析 Agent，ETH 和 SOL 作上下文：只分析、没有下单权限。预测只追加，并由脚本打分。每日运行在 Codex CLI 上。",
    },
    problem: {
      en: "Discretionary analysis drifts: forecasts are never scored, and post-mortems depend on memory. I wanted a process where every claim can be checked against what happened, and where the machine is structurally unable to trade for me.",
      zh: "主观分析会漂移：预测从不打分，复盘靠记忆。我想要一套每个判断都能事后对照结果的流程，并且让机器在结构上就没法替我下单。",
    },
    method: {
      en: "A stdlib-only Python collector pulls public exchange data — trend and technicals, volume profile, spot and futures CVD, open interest, funding, order-book depth as supporting evidence, and an estimated liquidation map. A health-check gate decides whether a conclusion may be drawn at all. Since 2026-09-28, Codex CLI writes the daily report: bull and bear cases first, then falsifiable 24h and 7d scenarios. Forecasts stay append-only. On that same date, scores moved to a separate file so past forecasts are never rewritten. It does not place orders and it does not give personalised advice.",
      zh: "纯标准库的 Python 采集器抓取公开交易所数据——趋势与技术指标、成交量分布、现货和合约 CVD、持仓量、资金费率、仅作辅助的订单簿深度，以及一份估算的清算分布。自检门决定这份数据能不能下结论。自 2026-09-28 起，日报由 Codex CLI 来写：先写多空两边，再写可证伪的 24 小时和 7 日情景。预测只追加。同一天起，评分写进单独的文件，过去的预测不再被改写。它不下单，也不提供个性化建议。",
    },
    result: {
      en: "As of 2026-10-15 the log holds 40 forecasts: 20 at 24h and 20 at 7d, of which 4 are same-day supplements and stay out of the primary sample. Primary 24h forecasts are 16 of 16 final, with direction hits 9/16 (56%) against an always-range-bound baseline of 10/16 (62.5%). Primary 7d forecasts are 13 of 16 final (3 missing data), with direction hits 4/13 (31%) against a baseline of 7/13 (54%). The forecasts do not yet beat that baseline. A Brier score is not computable yet (n=0), because older records carry no probabilities. Methodology v1.4, scoring v2.0.",
      zh: "截至 2026-10-15，日志里有 40 条预测：24 小时 20 条、7 日 20 条，其中 4 条是当日补充，不进入主样本。主样本里，24 小时预测 16 条全部终评，方向命中 9/16（56%），始终判断为震荡的基线是 10/16（62.5%）。7 日预测 16 条里 13 条终评（3 条缺数据），方向命中 4/13（31%），基线是 7/13（54%）。这些预测目前还没有超过这条基线。Brier 分数还算不出来（n=0），因为较早的记录里没有概率。方法论 v1.4，评分 v2.0。",
    },
    tech: ["Python", "Codex CLI", "Git"],
    links: {
      demo: undefined,
      github: undefined,
    },
    direction: {
      vision: {
        en: "A trading process where every claim is scored against the outcome. The machine handles data, arithmetic and bookkeeping, and has no order authority. The human owns decisions and rule changes. A hypothesis is written into the methodology only after it has been confirmed three or more times.",
        zh: "一套每个判断都要对照结果打分的交易流程。机器负责数据、算术和记账，没有下单权限。决策和规则改动归人。一条假设至少被验证三次，才写进方法论。",
      },
      roadmap: {
        en: "Next: keep scoring both horizons against the always-range-bound baseline, and accumulate probabilistic forecasts so a Brier score can exist. It does not yet. None of this is a performance claim.",
        zh: "接下来：继续用始终判断为震荡的基线给两个期限打分，并积累带概率的预测，让 Brier 分数有得可算。现在还没有。这些都不是业绩声明。",
      },
      milestones: [
        {
          label: {
            en: "Data collector, health-check gate, and append-only forecast log",
            zh: "数据采集器、数据自检门、只追加的预测日志",
          },
          status: "done",
          date: "2026-09",
        },
        {
          label: {
            en: "Scores moved to a separate file; daily runs switched to Codex CLI",
            zh: "评分挪到单独文件；每日运行改到 Codex CLI",
          },
          status: "done",
          date: "2026-09-28",
        },
        {
          label: {
            en: "Methodology v1.4 and scoring v2.0 adopted",
            zh: "采用方法论 v1.4 与评分 v2.0",
          },
          status: "done",
          date: "2026-10-17",
        },
        {
          label: {
            en: "Primary forecasts vs an always-range-bound baseline: behind at both horizons, as of 2026-10-15",
            zh: "主样本对照始终震荡基线：截至 2026-10-15，两个期限都落后",
          },
          status: "in-progress",
        },
        {
          label: {
            en: "Probabilistic forecasts so a Brier score can be computed (n=0 so far)",
            zh: "带概率的预测，使 Brier 分数可计算（目前 n=0）",
          },
          status: "in-progress",
        },
      ],
    },
    progress: {
      status: {
        en: "Analysis only, not a track record, and no order authority. As of 2026-10-15, 40 forecasts are logged and the latest forecast is that date. Daily runs are on Codex CLI. Methodology v1.4, scoring v2.0. Direction hits do not yet beat an always-range-bound baseline, and Brier is not computable yet (n=0).",
        zh: "只分析，不是业绩记录，也没有下单权限。截至 2026-10-15，已记录 40 条预测，最近一条预测也是这一天。每日运行在 Codex CLI 上。方法论 v1.4，评分 v2.0。方向命中目前还没有超过始终判断为震荡的基线，Brier 也还算不出来（n=0）。",
      },
      metrics: [
        {
          label: {
            en: "Forecasts logged, as of 2026-10-15",
            zh: "已记录预测（截至 2026-10-15）",
          },
          value: "40",
        },
        {
          label: {
            en: "24h direction hits, as of 2026-10-15",
            zh: "24 小时方向命中（截至 2026-10-15）",
          },
          value: "9/16",
        },
        {
          label: {
            en: "24h always-range baseline, as of 2026-10-15",
            zh: "24 小时始终震荡基线（截至 2026-10-15）",
          },
          value: "10/16",
        },
        {
          label: {
            en: "7d direction hits, as of 2026-10-15",
            zh: "7 日方向命中（截至 2026-10-15）",
          },
          value: "4/13",
        },
        {
          label: {
            en: "7d always-range baseline, as of 2026-10-15",
            zh: "7 日始终震荡基线（截至 2026-10-15）",
          },
          value: "7/13",
        },
        {
          label: {
            en: "Methodology / scoring version, as of 2026-10-15",
            zh: "方法论 / 评分版本（截至 2026-10-15）",
          },
          value: "v1.4 / v2.0",
        },
        {
          label: {
            en: "Brier scores, as of 2026-10-15",
            zh: "可计算的 Brier 分数（截至 2026-10-15）",
          },
          value: "0",
        },
      ],
    },
    skills: [
      "Python（纯标准库）",
      "Codex CLI 自动化",
      "预测校准 / Forecast Calibration",
      "只追加日志 / Append-only Logs",
      "衍生品微观结构 / Derivatives Microstructure",
    ],
  },
];

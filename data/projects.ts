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
      en: "A rules-based BTC perpetual-futures swing system with hard circuit breakers, running on a $1,000 proof-of-concept stake.",
      zh: "带硬性熔断机制的 BTC 永续合约波段交易系统，用 1000 美元验证性资金起步。",
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
      en: "5 execution-layer bugs were caught only by live dry-run testing (not code review), including 2 that silently broke risk-budget math — all fixed. A pre-registered study of 15 crash-precursor indicators honestly reported 0 as reliably predictive rather than tuning the method for a nicer result.",
      zh: "5 个执行层 bug 只有实盘 dry-run 才发现（代码审查看不出来），其中2个曾静默破坏风险预算计算，均已修复。一项预注册的暴跌前兆研究测了15个候选指标，诚实报告0个可信存活，而不是为了好看结果去调整方法论。",
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
        en: "Next: a market-regime percentile dashboard built on the dimensions that survived the event study. Much later, only if warranted: a read-only LLM analyst layer with zero order-placement authority.",
        zh: "接下来：基于事件研究中存活维度做一个市场状态分位数仪表盘。更远的future（如果确有必要）：一个只读、零下单权限的 LLM 分析师层。",
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
            en: "Pre-registered crash-precursor event study (15 indicators, 0 survived)",
            zh: "预注册暴跌前兆事件研究（15指标，0存活）",
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
          label: { en: "Crash-precursor indicators tested", zh: "暴跌前兆候选指标测试数" },
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
      en: "A Python pipeline: Serper Maps API for lead discovery, a scraper + DeepSeek scoring pass for enrichment, AI-drafted emails/WhatsApp/LinkedIn messages in the target market's language, WeChat-notified human approval, and an autopilot mode that auto-sends high-confidence drafts while routing uncertain ones to a person. Deployed with Docker on a small VPS.",
      zh: "Python 流水线：Serper Maps API 发现线索 → 爬虫 + DeepSeek 评分做情报补全 → AI 生成目标市场语言的邮件/WhatsApp/LinkedIn 草稿 → 微信推送人工审批 → autopilot 模式对高置信度草稿自动发送、低置信度转人工。Docker 部署在小型 VPS 上。",
    },
    result: {
      en: "Processed 192 leads end-to-end at an average AI quality score of 6.37/10, for roughly $0.006 in API cost per lead. Target metrics track cold-email industry benchmarks: <1.5% bounce rate, 5–10% reply rate (vs. 2–5% industry norm), <$10 cost per qualified inquiry (vs. $5–50 norm).",
      zh: "192 条线索全流程处理，AI 平均评分 6.37/10，单条线索 API 成本约 $0.006。目标指标对标冷邮件行业基准：退信率 <1.5%，回复率 5–10%（行业基准 2–5%），单个有效询盘获客成本 <$10（行业基准 $5–50）。",
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
        en: "Next: turn on autopilot for the 87 leads still waiting on approval, put reply monitoring on a scheduled job, and manually source decision-makers' LinkedIn profiles for the highest-scored leads.",
        zh: "接下来：为剩余87条待审批线索开启 autopilot 批量发送，把回函监控接入定时任务，为高评分线索人工补充采购/供应链负责人的 LinkedIn 个人主页。",
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
    featured: true,
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
];

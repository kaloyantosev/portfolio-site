import xauusdArticle from "./articles/xauusd-cycle-top.md?raw";
import ttfArticle from "./articles/ttf-natural-gas.md?raw";
// =========================================================================
// PORTFOLIO CONTENT CONFIGURATION
// =========================================================================

export const profileConfig = {
  name: "Kaloyan Tosev",
  title: "PORTFOLIO & ACHIEVEMENTS",
  tagline: "Quantitative Strategy, Financial Engineering & Global Macro",
  bio: "Open-minded and results-driven strategist with experience across treasury operations, quantitative market analysis, and systematic valuation. Experienced in macro research, DCF financial modeling, and risk-controlled portfolio execution.",
  location: "Sofia, Sofia-Capital",
  phone: { local: "0895 047 947", intl: "+359 895 047 947" },
  email: "kaloyan.tosev@gmail.com",
  linkedin: "https://www.linkedin.com/in/kaloyant/",
  cvPdfUrl: "/cv.pdf",
  recPdfUrl: "/letter_of_recommendation.pdf",
  // Homepage "Experience" timeline, newest first.
  experience: [
    {
      role: "Proprietary Trader",
      org: "Amaltea · Self-employed",
      period: "Nov 2023 – Present",
      text: "Market microstructure through footprint charts and order-flow dynamics. Evaluating real-time volume data and modelling advanced options strategies."
    },
    {
      role: "Management Global Markets | Treasury Department",
      org: "DSK Bank · Internship · Bulgaria",
      period: "Jun 2025 – Jul 2025",
      text: "Exposure to money-market trading, foreign-exchange operations, discretionary portfolio management and daily market analysis, covering funding operations and investment and securities administration."
    },
    {
      role: "Founder & Markets Analyst",
      org: "Amaltea · Full-time",
      period: "Mar 2023 – Nov 2023",
      text: "Founded and led Amaltea, a research and analytics business specialising in institutional-style analysis of stock and cryptocurrency markets. Managed a team of six interns and secured partnerships."
    }
  ],
  // Dashed "forecast" point at the end of the career chart. Edit freely, or set to null to hide.
  nextGoal: {
    period: "Next",
    role: "Institutional Markets",
    org: "Global bank or asset manager",
    text: "Bringing order-flow, derivatives and macro research experience to a sales, trading or quantitative markets desk."
  },
  metrics: [
    { label: "Metric 1 (e.g. Sharpe Ratio)", value: "0.00", desc: "Short description or footnote" },
    { label: "Metric 2 (e.g. Annualized Alpha)", value: "0.0%", desc: "Short description or footnote" },
    { label: "Metric 3 (e.g. Max Drawdown)", value: "0.0%", desc: "Short description or footnote" },
    { label: "Metric 4 (e.g. Track Record)", value: "0+ Yrs", desc: "Short description or footnote" },
  ]
};

// -------------------------------------------------------------------------
// 1. ARTICLES
// Sub-tabs: Investment Memos & Macro Analyses
// -------------------------------------------------------------------------

export const investmentMemos = [
  {
    id: "ttf-natural-gas",
    title: "Europe's Exposure to a Natural Gas Shock (Dutch TTF)",
    subtitle: "Geopolitical energy vulnerability and the cross-asset mispricing between gold and European gas",
    category: "Investment Memo",
    assetClass: "Dutch TTF · Natural Gas",
    date: "Feb 2026",
    summary: "A U.S.-Iran escalation is above all a risk to LNG supply. Qatar ships all of its LNG through the Strait of Hormuz, Europe now depends on seaborne LNG and competes with Asia for it, and storage has to be refilled from April. I think Dutch TTF is a better hedge for this risk than gold, which already looked stretched.",
    // The original Threads thread, post by post (text copied verbatim).
    thread: {
      url: "https://www.threads.com/@ktsvv_/post/DVUWkSiiNug",
      author: "ktsvv_",
      avatar: "/articles/ttf-thread-avatar.jpg",
      topic: "Iran",
      date: "03/01/26",
      posts: [
        { text: "Buying gold and silver right now is not the best option to hedge against the U.S. - Iran war. Both have been on a remarkable run and are attracting investors to buy in on Monday open. However, the analysis I have conducted says otherwise. We are in for an energy crisis that the markets did not fully price in. A thread on why I looked elsewhere for a hedge:", highlight: ["not the best option to hedge against the U.S. - Iran war", "We are in for an energy crisis that the markets did not fully price in"], images: ["/articles/ttf-thread-1.jpg"] },
        { text: "Commitment reports show Institutions have been piling up on precious metals ever since February 17th, so their accumulations is basically completed. From now on every % up will come from retail and “noise” that are trying to get in. Thus, institutions have a lower entry price (like they always do). They will hold their positions while letting small traders battle in volatility. Everyone trying to enter gold and silver now should know they have missed the train.", highlight: ["piling up on precious metals ever since February 17th", "every % up will come from retail", "missed the train"], images: ["/articles/ttf-thread-2a.jpg", "/articles/ttf-thread-2b.jpg"] },
        { text: "Why oil is looking different? Institutions have increased their positions further last week and are expecting a prolonged rise in energy prices. Gold and silver might be a hedge, but energy is the real winner here. What’s even more concerning is that demand has rapidly increased, even though oil is being produced at highest rate ever.", highlight: ["energy is the real winner here", "demand has rapidly increased"] },
        { text: "I have previously said that markets are underpricing this conflict - I was right. For the first time in history, the Strait of Hormuz is beginning to close. Markets didn’t think it’s a possible threat, but the Iranian regime is the weakest ever. I expect an oil crisis. No premium on this possibility was set in the price of oil and Nat gas and I saw the opportunity. An event that has never happened before, until it happened today. Iran said numerous times it will fight back, so they are.", highlight: ["markets are underpricing this conflict", "the Strait of Hormuz is beginning to close", "I expect an oil crisis", "No premium on this possibility was set in the price of oil and Nat gas"], images: ["/articles/ttf-thread-4.jpg"] },
        { text: "Natural gas looks even more critical, as many traders have been shorting and hedging ahead of mild weather months. They will now be forced to aggressively buy back to cover their positions, and natural gas will spike upwards on Monday. Gold is priced in, and with the news of the Supreme leader dead, we might see a de-escalation in uncertainty. What is expected to further escalate are the strikes, which by some reports are directed to oil rigs and inventory. Bidding was is upon us.", highlight: ["Natural gas looks even more critical", "forced to aggressively buy back to cover their positions", "natural gas will spike upwards on Monday"], images: ["/articles/ttf-thread-5.jpg"] },
      ],
    },
    docx: "/articles/ttf-natural-gas-macro-report.docx",
    priceSince: { symbol: "TTF", label: "Dutch TTF since this memo", since: "2026-02-01", currency: "€" },
    body: ttfArticle
  }
];

export const macroAnalyses = [
  {
    id: "xauusd-cycle-top",
    title: "Reading the XAUUSD Cycle Top Through Converging Regression Channels",
    subtitle: "Three regression channels, leverage data and market psychology at gold's January 2026 peak",
    category: "Macro Analysis",
    assetClass: "XAUUSD · Gold",
    date: "Jan 2026",
    summary: "Three regression channels covering 28 years, 5 years and 1 year all reached their upper bands between $5,400 and $5,600 on the monthly gold chart. With record leverage and very one-sided sentiment on top, I read it as the end of the cycle and posted the call on Threads on January 29, 2026.",
    images: [
      { src: "/articles/xauusd-chart.png", caption: "Analysis published on Threads on January 29, 2026: three converging regression channels on the monthly XAUUSD chart." },
    ],
    docx: "/articles/xauusd-top-analysis.docx",
    priceSince: { symbol: "GC=F", label: "Gold since the call · GC=F", since: "2026-01-29", currency: "$" },
    body: xauusdArticle
  }
];

// -------------------------------------------------------------------------
// 2. CUSTOM TRADING STRATS
// Sub-tabs: Trading Algos & Investment Algos
// -------------------------------------------------------------------------

export const tradingAlgos = [
  {
    id: "trading-algo-1",
    name: "Sample Trading Algorithm Name",
    subtitle: "Short description of the algorithmic strategy and execution style",
    category: "Trading Algo",
    type: "e.g. Statistical Arbitrage / Microstructure / Trend",
    status: "Live / Backtested",
    vintage: "Year - Present",
    timeframe: "e.g. 5-Min / Intraday",
    universe: "e.g. S&P 500 Equities / Futures",
    metrics: {
      sharpeRatio: "0.00",
      sortinoRatio: "0.00",
      cagr: "0.0%",
      maxDrawdown: "-0.0%",
      winRate: "0.0%",
      profitFactor: "0.00"
    },
    description: "Detailed summary of how the trading algorithm generates signals, manages risk, and executes trades.",
    mechanics: [
      "Signal Generation: Description of the mathematical trigger or model",
      "Risk Management: Position sizing, stop loss, and exposure constraints",
      "Execution Model: Slippage handling, order types, and venue routing"
    ],
    formula: "Insert your mathematical formula or LaTeX string here"
  }
];

export const investmentAlgos = [
  {
    id: "aegis",
    name: "Aegis — Portfolio Rotation Backtester",
    subtitle: "Systematic portfolio rotation strategy with interactive backtesting",
    category: "Investment Algo",
    type: "Portfolio Rotation",
    liveUrl: "https://aegis-snowy-zeta.vercel.app/",
    description: "Interactive backtesting application for the Aegis portfolio rotation strategy. Simulates systematic rotation between assets, displaying equity curves, drawdowns and performance statistics to evaluate the strategy against benchmarks."
  }
];

// -------------------------------------------------------------------------
// 3. CUSTOM MODELS (Truecharts & COT Data Visualizer)
// -------------------------------------------------------------------------

export const customModels = [
  {
    id: "model-truecharts",
    name: "Truecharts — Options Flow & 13F Analytics",
    subtitle: "Real-time institutional options positioning, Put/Call ratios & 13F sector flow model",
    category: "Derivatives & Options Flow",
    group: "Derivatives & Options",
    liveUrl: "https://truecharts-chi.vercel.app/",
    previewImage: "/truecharts_preview.png",
    description: "Advanced equity derivatives and institutional positioning platform designed to decode smart-money market activity. Connects with Nasdaq data feeds to analyze options market microstructure, Put/Call positioning metrics, and historical 13F hedge fund accumulation across individual equities and indices."
  },
  {
    id: "model-oilwatch",
    name: "OilWatch — Global Oil Shipping & Market Intelligence",
    subtitle: "Live tanker tracking, chokepoint risk monitoring, Brent/WTI pricing and maritime news briefs",
    category: "Energy & Shipping",
    group: "Commodities & Energy",
    liveUrl: "https://oil-lac.vercel.app/",
    description: "Real-time oil shipping intelligence dashboard combining live tanker positions, Brent & WTI prices, UKMTO incident advisories and global shipping lanes. Monitors 7 major chokepoints (Hormuz, Bab el-Mandeb, Suez, Malacca, Bosphorus, Panama, Cape of Good Hope) with risk levels, plus AI-written briefs on relevant maritime news."
  },
  {
    id: "model-economic-cycle",
    name: "Credit Cycle Monitor — Economic Cycle Model",
    subtitle: "Macro credit-cycle phase tracking and pressure indicators",
    category: "Global Macro & Credit",
    group: "Macro & Positioning",
    liveUrl: "https://cot-xunw.vercel.app/",
    description: "Macro model that tracks where the economy sits in the credit cycle. Aggregates credit, rates and economic data into a cycle timeline and pressure indicators to identify phase transitions between expansion, late-cycle, contraction and recovery."
  },
  {
    id: "model-cot-pro",
    name: "COT Pro — Institutional Positioning Intelligence",
    subtitle: "CFTC Legacy & Disaggregated positioning analytics across 30+ global futures markets",
    category: "Global Macro & Futures",
    group: "Macro & Positioning",
    liveUrl: "https://cot-gamma.vercel.app/",
    description: "Institutional-grade Commitments of Traders terminal for macro PMs, systematic CTAs and discretionary derivatives traders. Translates weekly CFTC filings into statistical positioning intelligence: institutional crowding, commercial hedging pressure, zero-line crossovers and dealer delta-hedging flows across 156 weeks of data."
  },
  {
    id: "model-commodity-futures",
    name: "Commodity Futures Platform — Market Intelligence",
    subtitle: "Forward curves, calendar & processing spreads, seasonality and volatility across energy, metals and ags",
    category: "Commodities & Term Structure",
    group: "Commodities & Energy",
    liveUrl: "https://commodity-futures-neutral.vercel.app/",
    description: "Commodity futures analysis platform covering energy, metals and agricultural markets. Interactive term-structure visualisation with contango/backwardation detection, calendar spreads with seasonal overlays, crack/crush/spark processing spreads, multi-year seasonality bands and realised vs. implied volatility metrics."
  }
];

// -------------------------------------------------------------------------
// 4. CUSTOM INDICATORS
// -------------------------------------------------------------------------

export const customIndicators = [
  {
    id: "dynamic-regression-channels",
    name: "Dynamic Regression Channels Pro",
    subtitle: "Multi-horizon log-regression channels with confluence zones for mathematical bounce levels",
    category: "Trend / Mean Reversion",
    timeframes: ["Daily"],
    assetSuitability: "NVDA · Equities",
    summary: "Four log-regression channels whose bands cluster into confluence zones: the price levels most likely to hold.",
    // Daily chart with the indicator drawn on it. symbol: Yahoo Finance ticker.
    // study: a function name in src/charts/studies.js (the JavaScript port of the Pine script).
    chart: { symbol: "NVDA", study: "drc" },
    description: "Fits four least-squares regression channels (12, 60, 210 and 315 bars) to log price, so each channel follows a constant-percentage trend rather than a straight dollar line. Band width is two standard deviations of the residuals around the fit, which measures true scatter instead of the trend itself. R² grades how well each trend holds, and where bands from different channels cluster within 0.6 × ATR the indicator draws a confluence zone: the price levels where several independent horizons agree.",
    formula: "ln P(t) = a + b·t  (OLS over N bars)   ·   Band = a + b·t ± k·σᵣ,  σᵣ = √(Σ residual² / (N − 2))   ·   R² = trend quality   ·   Zone = bands within 0.6 × ATR(14)",
    signals: [
      { signal: "Confluence support", condition: "Two or more channel bands cluster within 0.6 × ATR below price", action: "Highest-probability bounce area; wait for a reaction candle inside the zone" },
      { signal: "Mean reversion", condition: "Price tags the lower band of a channel with R² ≥ 0.6", action: "Target that channel's midline" },
      { signal: "Trend break", condition: "Daily close below the Core (315) lower band", action: "Bounce thesis invalid; the level turns into resistance" }
    ]
  },
  {
    id: "imsi",
    name: "Idiosyncratic Market Stress Index (IMSI)",
    subtitle: "Yearly range percentile and volatility z-score to spot capitulation and accumulation at yearly lows",
    category: "Mean Reversion / Stress",
    timeframes: ["Daily"],
    assetSuitability: "QQQ · Indices & Equities",
    summary: "Yearly range percentile plus a 200-day z-score to flag capitulation and accumulation at yearly lows.",
    chart: { symbol: "QQQ", study: "imsi" },
    description: "An oscillator that measures how stressed an asset is against its own year. The 252-day range percentile places today's close between the yearly low (0%) and high (100%); a z-score shows how many standard deviations price sits from its 200-day average. When price is in the bottom 10% of its yearly range and more than two standard deviations below the 200-day mean, the panel shades red as capitulation. A bullish divergence inside the stress zone, where price prints a lower low but the range percentile holds a higher low, flags an accumulation trigger.",
    formula: "PR₂₅₂ = (C − L₂₅₂) / (H₂₅₂ − L₂₅₂) × 100   ·   Z₂₀₀ = (C − SMA₂₀₀) / σ₂₀₀   ·   Capitulation: PR₂₅₂ ≤ 10 and Z₂₀₀ ≤ −2",
    signals: [
      { signal: "Capitulation", condition: "Range percentile ≤ 10% and z-score ≤ −2 (red background)", action: "Statistically exhausted selling; watch for a reversal setup" },
      { signal: "Accumulation trigger", condition: "In the stress zone, price makes a 10-bar lower low while the range percentile makes a higher low (green triangle)", action: "Bullish divergence at the yearly low boundary" },
      { signal: "Extreme exhaustion", condition: "Range percentile ≤ 5% (red line)", action: "Price is pinned to the yearly low; highest stress reading" }
    ]
  },
  {
    id: "tmeo",
    name: "Trend Maturity & Efficiency Oscillator (TMEO)",
    subtitle: "Fractal efficiency of price to separate fresh trends, maturing trends and chop, with quarterly levels",
    category: "Trend / Momentum",
    timeframes: ["Daily"],
    assetSuitability: "OXY · Equities & Commodities",
    summary: "Scores how cleanly price trends, separating fresh trends, maturing trends and chop.",
    chart: { symbol: "OXY", study: "tmeo" },
    description: "Measures how efficiently price is trending. Over a 20-bar cycle it compares the straight-line move from start to end with the total distance price actually travelled, giving a score from −100 (a perfectly clean decline) to +100 (a perfectly clean advance). The line is smoothed with a 5-bar WMA, and its slope separates fresh trends that are still accelerating from mature trends that are losing energy. Readings between −40 and +40 mark consolidation. On daily charts it also marks each quarter on the price chart and the oscillator, with a dotted line tracking that quarter's running average price.",
    formula: "ER = (Cₜ − Cₜ₋₂₀) / Σ|Cᵢ − Cᵢ₋₁| × 100   ·   TMEO = WMA₅(ER)   ·   Energy = ΔTMEO   ·   Fresh: |TMEO| ≥ 40 and slope with the trend",
    signals: [
      { signal: "Fresh uptrend", condition: "TMEO ≥ 40 and still rising (green)", action: "Efficient advance with energy behind it" },
      { signal: "Mature uptrend", condition: "TMEO ≥ 40 but falling (yellow)", action: "Trend is losing efficiency; tighten risk" },
      { signal: "Fresh downtrend", condition: "TMEO ≤ −40 and still falling (red)", action: "Efficient decline with energy behind it" },
      { signal: "Mature downtrend", condition: "TMEO ≤ −40 but rising (orange)", action: "Selling pressure is fading; watch for a base" },
      { signal: "Consolidation", condition: "TMEO between −40 and +40 (grey)", action: "No efficient trend; range conditions" }
    ]
  },
  {
    id: "stoch-atr-dmi",
    name: "Stoch + ATR + DMI Matrix (Unified Alert Suite)",
    subtitle: "Stochastic breakout triggers filtered by DMI direction, DMI spread, EMA trend and a trading-hours window",
    category: "Momentum / Trend Filter",
    timeframes: ["Daily"],
    assetSuitability: "SOX · Semiconductor Index",
    summary: "Stochastic breakouts that fire only when DMI, the 20/50 EMA trend and the trading window agree.",
    chart: { symbol: "^SOX", study: "stochAtrDmi" },
    description: "A momentum trigger that only fires when the trend agrees. A 5-period slow stochastic must cross through 70 (long) or 30 (short) on a bar that closes in that direction. The signal then has to pass four filters: +DI above −DI (or the reverse), a DMI spread wider than 7 points, the most recent 20/50 EMA cross pointing the same way, and an alert window of 06:55 to 23:00 Bulgarian time. ATR is normalised to its 100-bar range so volatility shares the same 0-100 panel, and a side table summarises DMI, ADX trend strength, the EMA state and whether the alert window is open.",
    formula: "%K = SMA₃(Stoch₅)   ·   Long: %K crosses above 70 ∧ +DI > −DI ∧ |+DI − −DI| > 7 ∧ last EMA20/50 cross up ∧ 06:55–23:00 BG   ·   ATRₙ = (ATR − min₁₀₀) / (max₁₀₀ − min₁₀₀) × 100",
    signals: [
      { signal: "Long signal", condition: "%K crosses above 70 with +DI > −DI, DMI spread > 7 and a bullish 20/50 EMA state", action: "Momentum breakout aligned with trend (green triangle and alert)" },
      { signal: "Short signal", condition: "%K crosses below 30 with −DI > +DI, DMI spread > 7 and a bearish 20/50 EMA state", action: "Momentum breakdown aligned with trend (red triangle and alert)" },
      { signal: "Overextended trend", condition: "ADX ≥ 40", action: "Trend is stretched; treat new signals with caution" }
    ]
  }
];

// -------------------------------------------------------------------------
// 5. LETTER OF RECOMMENDATION
// -------------------------------------------------------------------------

export const recommendationLetters = [
  {
    id: "rec-joshua-reesman",
    authorName: "Joshua E. Reesman, CFF",
    authorTitle: "Holistic Financial Planner, Planning Team Leader",
    institution: "The Chamberlin Group",
    institutionContext: "Former Vice President at State Street Global Advisors and Goldman Sachs",
    institutionLocation: "St. Louis, MO 63017",
    authorEmail: "joshua.reesman@gmail.com",
    authorPhone: "(516) 884 - 2947",
    relationship: "Professional Endorsement & Supervisor",
    date: "June 5th, 2023",
    featuredQuote: "I have a very good working knowledge of spotting talented individuals who are able to digest and apply information in a thoughtful manner and I strongly recommend Kaloyan to anyone looking for a bright and hard working individual with a passion for capital markets.",
    pdfUrl: "/letter_of_recommendation.pdf",
    fullLetter: `
To Whom It May Concern:

I've had the opportunity to work directly with Kaloyan Tosev over the last 6 months as he assisted a community of over 30,000 individuals with valuable market analysis.

For context, I have over a decade of experience working in the financial services industry with my current role as a Financial Planner for a $2bn RIA located in St. Louis, Missouri, USA. Previously, I served as Vice President at State Street Global Advisors and Goldman Sachs with my primary duties and responsibilities to advise large financial institutions located in the Midwest on global financial markets and how best to position their client assets.

I have a very good working knowledge of spotting talented individuals who are able to digest and apply information in a thoughtful manner and I strongly recommend Kaloyan to anyone looking for a bright and hard working individual with a passion for capital markets.

Kaloyan has consistently demonstrated a deep understanding of market dynamics, charting, and technical indicators. He thoughtfully applied his analysis of crypto markets to our community on a regular cadence that was extremely well received. Furthermore, he showed an eagerness for collaboration, seeking to improve his analysis and welcomed constructive feedback. His passion for the financial markets and willingness to assist others in navigating the complexities of crypto and stock investments makes him an invaluable asset to any team.

I always leave my conversations with Kaloyan more impressed than the last time we spoke as he is mature beyond his years and I know that the organization that is fortunate enough to have him will be well rewarded.

Regards,

Joshua E. Reesman, CFF
Holistic Financial Planner
Planning Team Leader
The Chamberlin Group
    `
  }
];

// -------------------------------------------------------------------------
// 6. CERTIFICATES & AWARDS
// -------------------------------------------------------------------------

export { certificatesAndAwards } from "./certificatesData";

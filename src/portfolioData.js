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
  linkedin: "https://linkedin.com/in/kaloyan-tosev",
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
    id: "memo-1",
    title: "Sample Investment Memo Title",
    subtitle: "Brief one-line thesis or focus area",
    category: "Investment Memo",
    ticker: "TICKER",
    assetClass: "Asset Class / Sector",
    date: "Month Year",
    targetPrice: "$0.00",
    currentPrice: "$0.00",
    recommendation: "BUY / HOLD / SELL",
    upside: "+0.0%",
    horizon: "12-24 Months",
    summary: "A concise overview of the investment thesis, key drivers, and catalysts.",
    keyPoints: [
      "Key investment thesis pillar 1",
      "Key investment thesis pillar 2",
      "Key investment thesis pillar 3"
    ],
    fullContent: `
### 1. Executive Summary
Insert your detailed investment memo write-up here. You can format this with headings, bullet points, financial data, and thesis arguments.

### 2. Business Overview & Moat
Detail the company's competitive advantage, market positioning, pricing power, and barriers to entry.

### 3. Financial Analysis & Valuation
Outline your valuation methodology (e.g., DCF, multiple comparison, IRR projections).
    `
  }
];

export const macroAnalyses = [
  {
    id: "macro-1",
    title: "Sample Macro Analysis Title",
    subtitle: "Global macro framework, rate cycle, or liquidity study",
    category: "Macro Analysis",
    assetClass: "Cross-Asset / Rates / FX",
    date: "Month Year",
    regime: "Macro Regime Name",
    keyTrade: "Primary Tactical Idea / Trade",
    summary: "Executive summary of the macroeconomic thesis, monetary/fiscal dynamics, and market implications.",
    keyPoints: [
      "Macro driver or central bank observation 1",
      "Cross-asset transmission channel 2",
      "Portfolio allocation takeaway 3"
    ],
    fullContent: `
### 1. Macro Regime Overview
Insert your comprehensive macro analysis here. Cover interest rate expectations, inflation dynamics, global liquidity, and sovereign balance sheet considerations.

### 2. Cross-Asset Transmission
Explain how the macro theme flows through equities, fixed income, commodities, and currencies.

### 3. Tactical Asset Allocation
Specific recommendations on duration, credit risk, equity factor tilts, and hedging strategies.
    `
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
    id: "investment-algo-1",
    name: "Sample Investment Algorithm Name",
    subtitle: "Long-term quantitative allocation or multi-factor strategy",
    category: "Investment Algo",
    type: "e.g. Dynamic Risk Parity / Multi-Factor / Quantitative Value",
    status: "Live / Backtested",
    vintage: "Year - Present",
    rebalanceFrequency: "e.g. Monthly / Quarterly",
    universe: "e.g. Global Equities & Fixed Income",
    metrics: {
      sharpeRatio: "0.00",
      cagr: "0.0%",
      maxDrawdown: "-0.0%",
      volatility: "0.0%",
      alpha: "+0.0%"
    },
    description: "Explanation of the long-term compounding mechanism, factor exposures, and rebalancing rules.",
    allocationWeights: [
      { asset: "Asset Class 1", weight: "00%" },
      { asset: "Asset Class 2", weight: "00%" },
      { asset: "Asset Class 3", weight: "00%" }
    ],
    formula: "Insert your asset allocation formula or equation here"
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
    liveUrl: "https://commodity-futures-eight.vercel.app/",
    description: "Commodity futures analysis platform covering energy, metals and agricultural markets. Interactive term-structure visualisation with contango/backwardation detection, calendar spreads with seasonal overlays, crack/crush/spark processing spreads, multi-year seasonality bands and realised vs. implied volatility metrics."
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
    id: "model-aegis",
    name: "Aegis — Portfolio Rotation Backtester",
    subtitle: "Systematic portfolio rotation strategy with interactive backtesting",
    category: "Systematic Strategies",
    group: "Systematic Strategies",
    liveUrl: "https://aegis-snowy-zeta.vercel.app/",
    description: "Interactive backtesting application for the Aegis portfolio rotation strategy. Simulates systematic rotation between assets, displaying equity curves, drawdowns and performance statistics to evaluate the strategy against benchmarks."
  }
];

// -------------------------------------------------------------------------
// 4. CUSTOM INDICATORS
// -------------------------------------------------------------------------

export const customIndicators = [
  {
    id: "indicator-1",
    name: "Sample Custom Indicator Name",
    subtitle: "Technical, order flow, or macroeconomic oscillator",
    category: "Order Flow / Momentum / Volatility",
    timeframes: ["Intraday", "Daily", "Weekly"],
    assetSuitability: "Equities, Futures, FX",
    // TradingView chart on the detail page. intervals: "1","5","15","30","60","240","D","W","M"
    // (first one opens by default; more than one shows timeframe buttons).
    // studies: TradingView built-in study ids, e.g. "STD;RSI", "STD;MACD".
    chart: { symbol: "AMEX:SPY", intervals: ["D"], studies: [] },
    description: "Detailed description of the indicator logic, what market inefficiencies it captures, and how to interpret its readings.",
    formula: "Mathematical formula for the indicator calculation",
    signals: [
      { signal: "Bullish Signal", condition: "Condition trigger description", action: "Recommended action or interpretation" },
      { signal: "Bearish Signal", condition: "Condition trigger description", action: "Recommended action or interpretation" }
    ],
    codeSnippet: `// Insert your code snippet (Python, Pine Script, C++, etc.) here
def calculate_indicator(data):
    # Your calculation logic
    return result`
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

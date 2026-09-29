// Articles Data: Investment Memos & Macro Analyses

export const investmentMemos = [
  {
    id: "asml-deep-dive-2026",
    title: "ASML Holding N.V. (NASDAQ: ASML)",
    subtitle: "High-NA EUV Monopoly, Lithography Moat & The 2nm Transition Cycle",
    category: "Investment Memo",
    ticker: "ASML",
    assetClass: "Equities / Semiconductors",
    date: "February 2026",
    author: "Portfolio Lead",
    targetPrice: "€1,240.00",
    currentPrice: "€885.00",
    recommendation: "STRONG CONVICTION BUY",
    upside: "+40.1%",
    horizon: "24-36 Months",
    summary: "An exhaustive fundamental deep-dive on ASML's impenetrable technological monopoly in extreme ultraviolet (EUV) lithography. We model the ramp of High-NA (0.55 NA EXE:5000/5200) tools, foundry node transitions (A16/2nm), and operating leverage resulting in €46B+ 2028 revenue at 58% gross margins.",
    executiveSummary: [
      "Monopolistic Pricing Power: ASML remains the sole commercial provider of 0.33 NA and 0.55 High-NA EUV scanners globally, commanding 100% market share in leading-edge lithography.",
      "High-NA Unit Economics: Next-gen High-NA systems carry ASPs of ~€350M-€400M with gross margins expanding above 56%, driving unprecedented cash flow per delivered tool.",
      "AI Accelerator Foundry CapEx: TSMC, Intel, and Samsung are accelerating fab roadmaps to meet Blackwell/Rubin and custom silicon demand, ensuring multi-year revenue visibility.",
      "Installed Base Management (IBM) Cash Cow: Service & upgrade revenue now represents 28% of total gross profit with >75% recurring predictability."
    ],
    financialMetrics: {
      peRatio: "32.4x (2026E)",
      fcfYield: "3.8%",
      roce: "48.2%",
      revenueCagr: "14.8% (2025-2029E)",
      grossMargin: "54.2% -> 58.5% (2028E)",
      ebitdaMargin: "38.6%"
    },
    valuationModel: {
      dcfFairValue: "€1,285.00",
      wacc: "8.4%",
      terminalGrowth: "3.5%",
      bearCase: "€760.00 (-14%)",
      baseCase: "€1,180.00 (+33%)",
      bullCase: "€1,450.00 (+64%)"
    },
    catalysts: [
      "Q3 2026 first high-volume manufacturing (HVM) High-NA tape-outs from TSMC Fab 20.",
      "China DUV normalized demand stabilization at €8B floor with recurring maintenance upside.",
      "Gross margin inflection past 56% as EUV source power upgrades (NXE:3800E) reach 220 WPH."
    ],
    risks: [
      "Export control escalation on legacy immersion DUV to non-aligned semiconductor markets.",
      "Logic/Memory capex cyclical digestion extending into mid-2026.",
      "Supply chain bottleneck in optics from Carl Zeiss SMT."
    ],
    fullMemoMarkdown: `
### 1. Investment Thesis Overview
ASML occupies what is arguably the single most defensible economic moat in modern industrial capitalism. As silicon geometries shrink toward 1.4nm (Angstrom era), multi-patterning with standard 0.33 NA EUV becomes economically unviable due to defect density and edge-placement error. ASML's 0.55 High-NA platform provides the definitive answer, reducing mask count by up to 3x while cutting cycle times significantly.

### 2. Dissecting the Unit Economics of High-NA EUV
The transition from NXE:3600D/3800E (~€180M-€220M ASP) to EXE:5000/5200 (~€380M ASP) expands ASML's revenue per silicon layer by 65%. 
- **Wafer throughput:** Targeting 185–220 wafers per hour (WPH) with 30mJ/cm² dose.
- **Service annuity:** Every High-NA tool generates approximately €14M annually in high-margin maintenance, laser source replacement, and pellicle servicing contracts.

### 3. Comprehensive Valuation & Scenario Analysis
Our proprietary 3-stage Discounted Cash Flow (DCF) model assumes a conservative 8.4% WACC (Risk-free rate 3.4%, Equity Risk Premium 5.0%, Beta 1.05) and terminal growth of 3.5%.
Under our base case, ASML achieves €44.5B in 2028 revenues and €42.20 in Normalized EPS. At an exit multiple of 28x P/E, this yields an intrinsic value of €1,180 to €1,285 per share.
    `
  },
  {
    id: "csu-rollup-machine",
    title: "Constellation Software Inc. (TSX: CSU)",
    subtitle: "The Ultimate Vertical Market Software (VMS) Capital Allocation Flywheel",
    category: "Investment Memo",
    ticker: "CSU.TO",
    assetClass: "Equities / Enterprise Software",
    date: "January 2026",
    author: "Portfolio Lead",
    targetPrice: "CAD $5,400.00",
    currentPrice: "CAD $4,280.00",
    recommendation: "CORE LONG HOLD",
    upside: "+26.2%",
    horizon: "36+ Months",
    summary: "A structural study of Mark Leonard's decentralized compounding model. Constellation acquires mission-critical VMS companies with low churn (<2%), high ROIC (>25%), and re-invests 100% of organic free cash flow at high hurdle rates without financial leverage fragility.",
    executiveSummary: [
      "Mission-Critical Lock-In: CSU's software runs essential back-office workflows (public transit scheduling, municipal taxation, dealership management) where replacement risk far exceeds software license cost.",
      "Decentralized Acquisition Pods: Over 50 autonomous M&A teams deploy capital into >120 small-scale acquisitions annually ($2M-$30M size), evading private equity competition.",
      "Organic Growth Turning Positive: Operating groups (Volaris, Harris, TSS, Jonas) are successfully up-selling cloud modules and AI-copilots to installed customer bases.",
      "Spinoff Alchemy: Spin-outs of Topicus and Lumine Group provide specialized vehicles to consolidate European and telecom software while returning capital tax-efficiently."
    ],
    financialMetrics: {
      peRatio: "38.1x (FCF)",
      fcfYield: "3.4%",
      roce: "31.5%",
      revenueCagr: "19.2% (10-Yr Historical)",
      grossMargin: "89.4%",
      ebitdaMargin: "27.8%"
    },
    valuationModel: {
      dcfFairValue: "CAD $5,250.00",
      wacc: "7.2%",
      terminalGrowth: "4.0%",
      bearCase: "CAD $3,700.00 (-13%)",
      baseCase: "CAD $5,100.00 (+19%)",
      bullCase: "CAD $6,200.00 (+45%)"
    },
    catalysts: [
      "Acceleration of European tuck-in acquisitions through Topicus expansion.",
      "Deployment of over $2.2B in annual M&A capital at minimum hurdle rates of 20% IRR.",
      "Lumine Group scaling into tier-1 telecom billing and mission-critical network OSS/BSS."
    ],
    risks: [
      "Capital deployment ceiling if M&A pipeline fails to scale with expanding FCF base.",
      "Succession risk upon Mark Leonard's eventual retirement.",
      "Potential multiple compression in a sustained 5%+ global rate regime."
    ],
    fullMemoMarkdown: `
### 1. The Anatomy of Unlevered Compounders
Constellation Software represents one of the purest examples of organic capital compounding in public markets. Unlike traditional private equity firms that rely on 4-6x debt leverage, Constellation maintains an exceptionally conservative balance sheet (Net Debt / EBITDA < 1.0x) and compounds capital via cash-on-cash returns.

### 2. The Hurdle Rate Discipline
CSU's internal hurdle rate for acquisitions has strictly adhered to ~20-25% un-levered IRR. By operating across 100+ niche software verticals, target companies are acquired at 1.0x - 2.2x Net Revenue multiples, representing payback periods of 4 to 6 years.
    `
  },
  {
    id: "palantir-enterprise-ontology",
    title: "Palantir Technologies (NYSE: PLTR)",
    subtitle: "AIP Monetization, The Ontology Moat & Sovereign AI Supremacy",
    category: "Investment Memo",
    ticker: "PLTR",
    assetClass: "Equities / Defense & AI",
    date: "December 2025",
    author: "Portfolio Lead",
    targetPrice: "$78.00",
    currentPrice: "$62.50",
    recommendation: "TACTICAL ACCUMULATE",
    upside: "+24.8%",
    horizon: "18-24 Months",
    summary: "Analysis of Palantir's AIP (Artificial Intelligence Platform) bootcamps driving unprecedented commercial customer acquisition velocity. We evaluate their operational ontology layer as the missing link between enterprise LLMs and production business workflows.",
    executiveSummary: [
      "The Ontology Moat: Palantir does not sell raw AI models; it maps enterprise data, semantics, and real-time execution pipelines into a unified graph ontology.",
      "US Commercial Velocity: US commercial revenue growing >54% YoY driven by AIP Bootcamps that compress 6-month sales cycles into 72-hour operational prototypes.",
      "Defense & Government Re-acceleration: Titan contract wins, Maven Smart System expansion, and NATO European command modernization providing reliable defense backstop.",
      "Operating Margin Inflection: Rule-of-40 score exceeding 70% with GAAP operating margins scaling toward 35%."
    ],
    financialMetrics: {
      peRatio: "74.0x (2026E)",
      fcfYield: "2.1%",
      roce: "24.5%",
      revenueCagr: "32.0% (US Commercial)",
      grossMargin: "82.5%",
      ebitdaMargin: "36.2%"
    },
    valuationModel: {
      dcfFairValue: "$82.00",
      wacc: "8.9%",
      terminalGrowth: "4.5%",
      bearCase: "$42.00 (-33%)",
      baseCase: "$75.00 (+20%)",
      bullCase: "$105.00 (+68%)"
    },
    catalysts: [
      "S&P 500 benchmark weighting increases & institutional mandate inflows.",
      "Expansion of sovereign AI contracts across UK NHS, German DoD, and Indo-Pacific allies.",
      "AIP contract conversions from initial pilots into multi-million dollar enterprise-wide rollouts."
    ],
    risks: [
      "High valuation multiples leaving little room for execution shortfall.",
      "Lumpy timing of large defense procurement cycles."
    ],
    fullMemoMarkdown: `
### 1. Bridging the LLM Hallucination Gap
While commercial enterprises have invested billions into generative AI models, over 80% of enterprise AI proofs-of-concept fail in production because LLMs lack context, access-control permissions, and transactional write-back capabilities. Palantir AIP solves this by anchoring AI agentic workflows to the enterprise ontology.
    `
  }
];

export const macroAnalyses = [
  {
    id: "macro-liquidity-term-premium-2026",
    title: "Global Liquidity Regimes & Treasury Term Premium",
    subtitle: "Decompressing 2026-2027 Yield Dynamics: Fiscal Dominance vs. Central Bank Balance Sheets",
    category: "Macro Analysis",
    assetClass: "Cross-Asset / Rates & FX",
    date: "February 2026",
    author: "Portfolio Lead",
    regime: "Fiscal Dominance / Curve Steepening",
    keyTrade: "2s10s Treasury Curve Steepeners + Long Real Assets",
    conviction: "HIGH CONVICTION",
    summary: "A comprehensive structural macro framework analyzing the interaction between US Treasury issuance profiles, Federal Reserve RRP depletion, Japanese cross-border capital repatriation, and the structural decompression of the 10-year term premium.",
    coreThemes: [
      "Term Premium Mean-Reversion: Decades of QE suppressed the 10Y term premium (ACM model) below zero; rising supply duration requires +80-120 bps structural compensation.",
      "Treasury Supply Mechanics: Annual net US debt issuance exceeding $2.1T shifts the market clearing mechanism from rate-sensitive domestic banks to price-sensitive foreign/hedge fund capital.",
      "Central Bank Liquidity Divergence: Fed balance sheet normalization vs. PBOC liquidity injections creates a bifurcated global dollar liquidity environment.",
      "Asset Allocation Implication: Underweight nominal long-duration paper; overweight structural inflation-protected assets, energy infrastructure, and short-duration carry."
    ],
    regimeIndicators: {
      us10yFairValue: "4.75% - 5.10%",
      termPremium: "+65 bps (Expanding)",
      globalM2Growth: "+6.4% YoY",
      dollarIndexDXY: "102 - 106 Range",
      oilBreakevenFloor: "$72 / bbl"
    },
    scenarioMatrix: [
      { scenario: "Soft Landing + Fiscal Boost", probability: "55%", yield10Y: "4.85%", spyTarget: "6,200", goldTarget: "$3,150" },
      { scenario: "Stagflationary Sticky Inflation", probability: "30%", yield10Y: "5.40%", spyTarget: "5,100", goldTarget: "$3,600" },
      { scenario: "Hard Landing Liquidity Crunch", probability: "15%", yield10Y: "3.20%", spyTarget: "4,400", goldTarget: "$2,800" }
    ],
    fullMemoMarkdown: `
### 1. The Fiscal Dominance Framework
The primary driver of modern asset pricing has shifted from monetary policy discretion to fiscal trajectory dynamics. With US federal deficits running at 6.5%+ of GDP in an expansionary economy, the Treasury's quarterly refunding announcements (QRA) have become more market-moving than FOMC rate decisions.

### 2. Supply-Demand Imbalance in Long-Duration Paper
Foreign central banks (PBoC, MoF Japan) are no longer structural net buyers of long-duration US Treasuries. As private capital and relative-value hedge funds absorb the supply via Treasury-Basis trades, market volatility will stay structurally elevated, requiring higher compensation for holding duration.

### 3. Quantitative Tactical Playbook
- **Rates:** Long 2Y / Short 10Y or 30Y Treasury Steepener swaps.
- **Equities:** Preference for pricing-power oligopolies with net cash balances over debt-dependent small caps.
- **Commodities:** Overweight physical copper, uranium, and energy infrastructure.
    `
  },
  {
    id: "yen-carry-cross-currency-dynamics",
    title: "The Yen Carry Unwind Aftermath & Cross-Currency Basis Swaps",
    subtitle: "Structural Japanese Capital Repatriation & Global Risk Asset Transmission",
    category: "Macro Analysis",
    assetClass: "Currencies / Global Macro",
    date: "January 2026",
    author: "Portfolio Lead",
    regime: "BOJ Rate Normalization / FX Volatility",
    keyTrade: "Long JPY vs. AUD / Long Cross-Currency Basis",
    conviction: "VERY HIGH CONVICTION",
    summary: "Examining the tectonic shift in Bank of Japan monetary policy from negative interest rates/YCC to benchmark hiking, and its systemic impact on the multi-trillion dollar yen carry trade, European sovereign debt absorption, and global liquidity cushions.",
    coreThemes: [
      "JGB Yield Dislocation: 10-year JGB yields sustaining above 1.35% incentivizes Japanese institutional lifers (Nippon Life, Dai-ichi) to repatriate foreign holdings.",
      "Hedging Cost Asymmetry: Negative FX-hedged yields on US Treasuries for Japanese domestic investors makes domestic sovereign debt mathematically superior.",
      "Cross-Currency Basis Tightening: Liquidity strains in USD/JPY 3-month basis swaps signal periodic collateral squeezes in leveraged overseas carry structures."
    ],
    regimeIndicators: {
      us10yFairValue: "4.65%",
      termPremium: "+55 bps",
      globalM2Growth: "+5.1% YoY",
      dollarIndexDXY: "103.5",
      oilBreakevenFloor: "$74 / bbl"
    },
    scenarioMatrix: [
      { scenario: "Orderly BOJ Normalization", probability: "60%", yield10Y: "4.70%", spyTarget: "6,050", goldTarget: "$3,050" },
      { scenario: "Rapid FX Dislocation (USDJPY < 135)", probability: "25%", yield10Y: "4.10%", spyTarget: "5,300", goldTarget: "$3,300" },
      { scenario: "Japanese Rate Stagnation", probability: "15%", yield10Y: "5.05%", spyTarget: "6,350", goldTarget: "$2,900" }
    ],
    fullMemoMarkdown: `
### 1. The Global Footprint of Japanese Savings
For three decades, Japan acted as the world's creditor nation, exporting over $3.5T in net international investment assets (NIIP). With domestic Japanese inflation anchoring at 2.2% and wage growth accelerating via Shunto negotiations, the BOJ's policy rate trajectory will continue upward, fundamentally altering global capital flows.
    `
  },
  {
    id: "commodity-supercycle-energy-grid",
    title: "Commodity Supercycle 2.0: Critical Minerals & Energy Grid Superstructures",
    subtitle: "AI Data Center Load Demands, Copper Inelasticity & Nuclear Renaissance",
    category: "Macro Analysis",
    assetClass: "Commodities / Energy Transition",
    date: "December 2025",
    author: "Portfolio Lead",
    regime: "Physical Resource Scarcity",
    keyTrade: "Long Physical Uranium + Tier-1 Copper Producers",
    conviction: "HIGH CONVICTION",
    summary: "Modeling the structural mismatch between copper/uranium supply lead times (7-12 years for new greenfield mines) and the exponential electricity consumption curve driven by AI compute clusters, EV infrastructure, and global grid modernization.",
    coreThemes: [
      "Data Center Power Crunch: Hyperscaler power purchase agreements (PPAs) are consuming gigawatt-scale base-load power, revitalizing Small Modular Reactors (SMRs) and nuclear restarts.",
      "Copper Supply Cliff: Depleting ore grades at Escondida and Grasberg combined with lack of major discoveries creates a structural 4.5Mt annual deficit by 2030.",
      "Capex Discipline of Majors: Mining conglomerates maintain strict dividend/buyback discipline rather than aggressive greenfield exploration, locking in supply constraints."
    ],
    regimeIndicators: {
      us10yFairValue: "4.80%",
      termPremium: "+60 bps",
      globalM2Growth: "+6.8% YoY",
      dollarIndexDXY: "101.8",
      oilBreakevenFloor: "$78 / bbl"
    },
    scenarioMatrix: [
      { scenario: "Accelerated AI Hyperscale Capex", probability: "50%", yield10Y: "4.90%", spyTarget: "6,150", goldTarget: "$3,200" },
      { scenario: "Industrial Capex Slowdown", probability: "30%", yield10Y: "4.30%", spyTarget: "5,600", goldTarget: "$2,950" },
      { scenario: "Geopolitical Supply Shock", probability: "20%", yield10Y: "5.25%", spyTarget: "5,000", goldTarget: "$3,700" }
    ],
    fullMemoMarkdown: `
### 1. The Physics of the Compute Economy
The fundamental constraint of 21st-century computation is no longer chip architecture, but electrical megawatts and heat dissipation. A typical 100k-GPU cluster requires 150-250 MW of 24/7 firm power. Nuclear energy and advanced natural gas turbines are the only zero/low-carbon solutions capable of sustaining 99.999% uptime.
    `
  }
];

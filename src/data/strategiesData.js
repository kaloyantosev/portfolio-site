// Custom Trading & Investment Algorithms Data

export const tradingAlgos = [
  {
    id: "statarb-alpha-x",
    name: "StatArb Alpha-X",
    subtitle: "High-Frequency Cointegrated Pairs & Ornstein-Uhlenbeck Mean-Reversion",
    category: "Trading Algo",
    type: "Statistical Arbitrage / Equities",
    status: "Live Production",
    vintage: "2023 - Present",
    timeframe: "1-Min to 15-Min Intraday",
    universe: "US S&P 500 Equities & Highly Correlated ADRs",
    executionCostModel: "2.5 bps slippage + exchange rebate tier 1",
    metrics: {
      sharpeRatio: "3.42",
      sortinoRatio: "4.85",
      calmarRatio: "5.12",
      cagr: "28.4%",
      maxDrawdown: "-5.54%",
      winRate: "68.2%",
      profitFactor: "2.14",
      avgTradeDuration: "42 mins",
      annualTrades: "4,120"
    },
    description: "Employs Engle-Granger two-step cointegration and dynamic Kalman filter state-estimation to track mean-reverting spread dislocations across liquid sector pairs. Entry and exit thresholds adapt dynamically to rolling GARCH(1,1) volatility estimates.",
    architecture: [
      "Dynamic Pair Universe Screening: Continuous Johansen cointegration tests filtered by eigenvector stability.",
      "Kalman Filter Beta Estimation: Live recursive time-varying hedge ratio updates on millisecond tick data.",
      "Ornstein-Uhlenbeck Speed of Mean Reversion: Parameter estimation theta (θ) filtering out sluggish pairs with half-life > 4 hours.",
      "Risk Gate & Stop-Loss: Non-linear statistical stop triggered at 3.5-sigma spread divergence to avoid regime breakdown."
    ],
    equityCurve: [
      { month: "Jan 24", strategy: 100.0, benchmark: 100.0 },
      { month: "Mar 24", strategy: 106.2, benchmark: 104.5 },
      { month: "Jun 24", strategy: 114.8, benchmark: 108.2 },
      { month: "Sep 24", strategy: 122.5, benchmark: 112.1 },
      { month: "Dec 24", strategy: 131.0, benchmark: 118.4 },
      { month: "Mar 25", strategy: 139.4, benchmark: 121.0 },
      { month: "Jun 25", strategy: 148.9, benchmark: 125.6 },
      { month: "Sep 25", strategy: 159.2, benchmark: 127.8 },
      { month: "Dec 25", strategy: 171.5, benchmark: 134.2 },
      { month: "Feb 26", strategy: 182.4, benchmark: 138.0 }
    ],
    monthlyReturns: [
      { year: "2024", Jan: "2.1%", Feb: "1.9%", Mar: "2.0%", Apr: "1.8%", May: "2.4%", Jun: "2.3%", Jul: "2.1%", Aug: "1.6%", Sep: "2.8%", Oct: "2.2%", Nov: "2.0%", Dec: "2.4%", Total: "+28.8%" },
      { year: "2025", Jan: "2.5%", Feb: "2.2%", Mar: "1.7%", Apr: "2.6%", May: "2.1%", Jun: "2.0%", Jul: "2.3%", Aug: "2.4%", Sep: "1.9%", Oct: "2.5%", Nov: "2.8%", Dec: "2.1%", Total: "+30.9%" }
    ],
    mathFormula: "dX_t = \\theta (\\mu - X_t)dt + \\sigma dW_t \\quad \\text{where } \\text{Half-Life } t_{1/2} = \\frac{\\ln(2)}{\\theta}"
  },
  {
    id: "orderbook-imbalance-momentum",
    name: "OB-IM (Microstructure Momentum)",
    subtitle: "Level-2 / Level-3 Order Flow Imbalance & Toxic Liquidity Prediction",
    category: "Trading Algo",
    type: "Market Microstructure / Futures",
    status: "Live Production",
    vintage: "2024 - Present",
    timeframe: "Sub-Second to 5-Min",
    universe: "CME E-mini S&P 500 (ES), Nasdaq (NQ), 10Y Note (ZN)",
    executionCostModel: "Fixed tick fee + passive queue queue-position priority",
    metrics: {
      sharpeRatio: "2.95",
      sortinoRatio: "4.10",
      calmarRatio: "4.45",
      cagr: "34.1%",
      maxDrawdown: "-7.65%",
      winRate: "62.4%",
      profitFactor: "1.92",
      avgTradeDuration: "14 mins",
      annualTrades: "9,850"
    },
    description: "Captures microstructural price drift driven by aggressive institutional sweeps and limit order book queue depletion. Utilizes weighted depth volume-synchronized probability of toxicity (VPIN) to preempt short-term inventory liquidation runs.",
    architecture: [
      "L2/L3 Order Depth Aggregation: Top 10 levels of book imbalance with exponential decay weighting.",
      "VPIN Flow Toxicity Monitor: Continuously computes volume-synchronized probability of adverse selection.",
      "Smart Order Routing (SOR): Executes via pegged aggressive limit orders to harvest exchange maker rebates while minimizing adverse fill slippage."
    ],
    equityCurve: [
      { month: "Jan 24", strategy: 100.0, benchmark: 100.0 },
      { month: "Mar 24", strategy: 108.1, benchmark: 104.5 },
      { month: "Jun 24", strategy: 119.4, benchmark: 108.2 },
      { month: "Sep 24", strategy: 129.2, benchmark: 112.1 },
      { month: "Dec 24", strategy: 142.0, benchmark: 118.4 },
      { month: "Mar 25", strategy: 153.8, benchmark: 121.0 },
      { month: "Jun 25", strategy: 167.2, benchmark: 125.6 },
      { month: "Sep 25", strategy: 181.0, benchmark: 127.8 },
      { month: "Dec 25", strategy: 198.5, benchmark: 134.2 },
      { month: "Feb 26", strategy: 212.0, benchmark: 138.0 }
    ],
    monthlyReturns: [
      { year: "2024", Jan: "3.2%", Feb: "2.5%", Mar: "2.1%", Apr: "3.0%", May: "2.8%", Jun: "2.4%", Jul: "2.9%", Aug: "1.8%", Sep: "3.5%", Oct: "2.7%", Nov: "2.9%", Dec: "3.1%", Total: "+39.2%" },
      { year: "2025", Jan: "2.8%", Feb: "3.1%", Mar: "2.4%", Apr: "2.9%", May: "3.0%", Jun: "2.5%", Jul: "3.2%", Aug: "2.7%", Sep: "2.4%", Oct: "3.1%", Nov: "3.3%", Dec: "2.9%", Total: "+38.4%" }
    ],
    mathFormula: "OFI_t = \\sum_{i=1}^{k} w_i \\cdot \\left[ \\Delta V_{i,t}^{bid} - \\Delta V_{i,t}^{ask} \\right]"
  },
  {
    id: "vol-term-structure-harvester",
    name: "VTS-H (Cross-Asset Volatility Term Structure)",
    subtitle: "VIX Futures Roll-Yield & Dynamic Variance Risk Premium Harvesting",
    category: "Trading Algo",
    type: "Derivatives / Volatility Arbitrage",
    status: "Live Production",
    vintage: "2022 - Present",
    timeframe: "Daily Rebalanced (EOD)",
    universe: "VIX Futures (UX1, UX2), SPX Index Options, S&P 500 ETF (SPY)",
    executionCostModel: "0.05 index points per options contract",
    metrics: {
      sharpeRatio: "2.68",
      sortinoRatio: "3.75",
      calmarRatio: "3.80",
      cagr: "24.6%",
      maxDrawdown: "-6.48%",
      winRate: "74.1%",
      profitFactor: "2.35",
      avgTradeDuration: "6.2 days",
      annualTrades: "310"
    },
    description: "Systematically captures the structural variance risk premium (VRP) embedded in equity index option implied volatilities versus realized volatility. Employs conditional tail-hedges that activate during negative contango inversions (backwardation).",
    architecture: [
      "Term Structure Contango Ratio: Evaluates the slope between M1 and M2 VIX futures contracts.",
      "VRP Signal Generator: Measures spread between IV30 and 30-day realized parkinson volatility.",
      "Asymmetric Convex Tail Hedge: Converts exposure to long front-month OTM puts automatically when VVIX / VIX skew exceeds 90th percentile."
    ],
    equityCurve: [
      { month: "Jan 24", strategy: 100.0, benchmark: 100.0 },
      { month: "Mar 24", strategy: 105.4, benchmark: 104.5 },
      { month: "Jun 24", strategy: 112.8, benchmark: 108.2 },
      { month: "Sep 24", strategy: 120.1, benchmark: 112.1 },
      { month: "Dec 24", strategy: 128.9, benchmark: 118.4 },
      { month: "Mar 25", strategy: 136.2, benchmark: 121.0 },
      { month: "Jun 25", strategy: 144.5, benchmark: 125.6 },
      { month: "Sep 25", strategy: 153.1, benchmark: 127.8 },
      { month: "Dec 25", strategy: 163.4, benchmark: 134.2 },
      { month: "Feb 26", strategy: 172.0, benchmark: 138.0 }
    ],
    monthlyReturns: [
      { year: "2024", Jan: "1.8%", Feb: "1.7%", Mar: "1.9%", Apr: "-0.8%", May: "2.5%", Jun: "2.1%", Jul: "2.3%", Aug: "-1.2%", Sep: "2.9%", Oct: "2.0%", Nov: "2.4%", Dec: "2.1%", Total: "+21.2%" },
      { year: "2025", Jan: "2.4%", Feb: "2.0%", Mar: "1.8%", Apr: "2.3%", May: "1.9%", Jun: "2.2%", Jul: "2.5%", Aug: "-0.5%", Sep: "2.6%", Oct: "2.4%", Nov: "2.5%", Dec: "2.2%", Total: "+26.8%" }
    ],
    mathFormula: "VRP_t = \\mathbb{E}^\\mathbb{Q}\\left[ \\int_t^{t+\\tau} \\sigma_s^2 ds \\right] - \\mathbb{E}^\\mathbb{P}\\left[ \\int_t^{t+\\tau} \\sigma_s^2 ds \\right]"
  }
];

export const investmentAlgos = [
  {
    id: "drp-volatility-targeting",
    name: "DRP-VT (Dynamic Risk Parity & Volatility Targeting)",
    subtitle: "Hierarchical Risk Parity (HRP) Multi-Asset Allocation Engine",
    category: "Investment Algo",
    type: "Asset Allocation / Macro Quant",
    status: "Live Institutional Mandate",
    vintage: "2021 - Present",
    rebalanceFrequency: "Weekly / Volatility Triggered",
    universe: "Global Equities (MSCI World), Sovereigns (TLT/IEF), Real Assets (Gold, Commodities), Credit (HYG)",
    targetVolatility: "10.0% Annualized",
    metrics: {
      sharpeRatio: "1.84",
      sortinoRatio: "2.65",
      calmarRatio: "2.10",
      cagr: "15.8%",
      maxDrawdown: "-7.52%",
      volatility: "8.6%",
      benchmarkSharpe: "0.82 (60/40 Portfolio)",
      alphaVs60_40: "+7.4% p.a."
    },
    description: "An evolutionary leap over traditional 60/40 portfolios. Leverages Marcos López de Prado's Hierarchical Risk Parity (machine learning dendrogram clustering) to allocate risk equally across uncorrelated economic clusters rather than arbitrary capital percentages.",
    allocationWeights: [
      { asset: "Global Equities (Quality/Momentum)", weight: "32%", riskContribution: "25%" },
      { asset: "US Sovereigns (2Y/5Y Duration)", weight: "28%", riskContribution: "25%" },
      { asset: "Commodities & Physical Gold", weight: "24%", riskContribution: "25%" },
      { asset: "Systematic Volatility Carry", weight: "16%", riskContribution: "25%" }
    ],
    equityCurve: [
      { month: "Jan 23", strategy: 100.0, benchmark: 100.0 },
      { month: "Jul 23", strategy: 109.5, benchmark: 104.2 },
      { month: "Jan 24", strategy: 119.8, benchmark: 108.5 },
      { month: "Jul 24", strategy: 131.2, benchmark: 114.1 },
      { month: "Jan 25", strategy: 144.5, benchmark: 119.8 },
      { month: "Jul 25", strategy: 158.0, benchmark: 126.3 },
      { month: "Jan 26", strategy: 172.4, benchmark: 132.0 },
      { month: "Feb 26", strategy: 176.8, benchmark: 134.5 }
    ],
    mathFormula: "w_i = \\frac{\\sigma_{HRP, i}^{-1}}{\\sum_{j=1}^{N} \\sigma_{HRP, j}^{-1}} \\times \\left( \\frac{\\sigma_{target}}{\\sigma_{portfolio, t}} \\right)"
  },
  {
    id: "mqm-quality-momentum",
    name: "MQM-Core (Multi-Factor Quality & Momentum Compounder)",
    subtitle: "Systematic Factor Harvesting with Balance-Sheet Health & Low-Beta Overlays",
    category: "Investment Algo",
    type: "Factor Equity / Long-Only Alpha",
    status: "Live Production",
    vintage: "2022 - Present",
    rebalanceFrequency: "Monthly Rebalanced",
    universe: "Russell 1000 + S&P 500 Universe",
    targetVolatility: "Unconstrained (Beta ~ 0.85)",
    metrics: {
      sharpeRatio: "1.72",
      sortinoRatio: "2.40",
      calmarRatio: "1.85",
      cagr: "21.4%",
      maxDrawdown: "-11.6%",
      volatility: "12.4%",
      benchmarkSharpe: "0.95 (S&P 500 TR)",
      alphaVsSPY: "+8.2% p.a."
    },
    description: "Systematic equity portfolio constructing a high-conviction 35-stock basket. Filters for high return on invested capital (ROIC > 18%), low leverage (Net Debt / EBITDA < 1.5x), high Piotroski F-Score (8+), combined with 6-to-12 month residual cross-sectional momentum.",
    allocationWeights: [
      { asset: "Semiconductors & AI Infrastructure", weight: "30%", riskContribution: "35%" },
      { asset: "Mission-Critical Enterprise Software", weight: "25%", riskContribution: "24%" },
      { asset: "High-Margin Industrial Monopolies", weight: "25%", riskContribution: "22%" },
      { asset: "Specialty Healthcare & Medical Tech", weight: "20%", riskContribution: "19%" }
    ],
    equityCurve: [
      { month: "Jan 23", strategy: 100.0, benchmark: 100.0 },
      { month: "Jul 23", strategy: 114.2, benchmark: 107.0 },
      { month: "Jan 24", strategy: 130.5, benchmark: 116.2 },
      { month: "Jul 24", strategy: 149.8, benchmark: 125.4 },
      { month: "Jan 25", strategy: 172.0, benchmark: 135.8 },
      { month: "Jul 25", strategy: 194.5, benchmark: 144.1 },
      { month: "Jan 26", strategy: 218.0, benchmark: 153.2 },
      { month: "Feb 26", strategy: 226.4, benchmark: 156.8 }
    ],
    mathFormula: "Score_i = 0.40 \\cdot z(ROIC_i) + 0.35 \\cdot z(Mom_{12m-1m, i}) + 0.25 \\cdot z(FCF\\_Yield_i)"
  }
];

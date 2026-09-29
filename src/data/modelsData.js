// Custom Financial & Mathematical Models Data

export const customModels = [
  {
    id: "monte-carlo-var-cvar",
    name: "Monte Carlo Portfolio VaR & Tail Risk Simulator",
    subtitle: "Stochastic Multi-Asset Geometric Brownian Motion & Student-t Fat Tails",
    category: "Risk & Quantitative Modeling",
    description: "Simulates 10,000 to 100,000 multi-asset correlated price trajectories to compute parametric, historical, and Cornish-Fisher Value-at-Risk (VaR) alongside Conditional VaR (Expected Shortfall). Integrates non-Gaussian fat-tailed distributions to prevent underestimation of systemic black swan dislocations.",
    tags: ["Stochastic Calculus", "Fat-Tail Risk", "Expected Shortfall", "Cholesky Decomposition"],
    formula: "\\text{CVaR}_\\alpha = \\mathbb{E}[L \\mid L \\ge \\text{VaR}_\\alpha] = \\frac{1}{1-\\alpha} \\int_\\alpha^1 \\text{VaR}_u du",
    features: [
      "Cholesky Factorization for real-time asset covariance correlation matrix embedding.",
      "Student-t degrees-of-freedom calibration capturing non-linear kurtosis spikes.",
      "Stress testing presets: 2008 Lehman Crisis, 2020 March Liquidity Squeeze, 2024 August Yen Unwind.",
      "Full exportable simulation distribution and percentile decile breakdown."
    ],
    interactiveConfig: {
      type: "monte_carlo",
      defaultInitialCapital: 1000000,
      defaultExpectedReturn: 12.5,
      defaultVolatility: 16.0,
      defaultHorizonDays: 252,
      defaultConfidenceLevel: 99.0
    }
  },
  {
    id: "dynamic-dcf-sensitivity",
    name: "Multi-Stage Dynamic DCF & Sensitivity Matrix Engine",
    subtitle: "Reverse-Engineered Market Implied Expectations & Monte Carlo WACC Surface",
    category: "Corporate Valuation & Fundamental Quant",
    description: "An institutional-grade discounted cash flow architecture that decomposes enterprise value into discrete high-growth phase, fade phase, and perpetual steady-state terminal value. Features interactive sensitivity heatmaps across cost-of-capital (WACC) and terminal growth.",
    tags: ["Discounted Cash Flow", "WACC Matrix", "Reverse DCF", "ROIC / Reinvestment"],
    formula: "EV = \\sum_{t=1}^{N} \\frac{FCFF_t}{(1 + WACC)^t} + \\frac{FCFF_{N+1}}{(WACC - g) \\cdot (1 + WACC)^N}",
    features: [
      "Dynamic WACC calculation decomposing Cost of Equity (CAPM) and after-tax Cost of Debt.",
      "Interactive 5x5 sensitivity matrix with color-coded margin-of-safety gradients.",
      "Reverse DCF calculator showing market-implied revenue growth rates embedded in spot stock price.",
      "Share dilution & SBC (Stock-Based Compensation) normalized adjustments."
    ],
    interactiveConfig: {
      type: "dcf_matrix",
      defaultRevenue: 30000,
      defaultGrowthRate: 15,
      defaultOperatingMargin: 35,
      defaultTaxRate: 21,
      defaultWacc: 8.5,
      defaultTerminalGrowth: 3.0
    }
  },
  {
    id: "black-scholes-greeks-surface",
    name: "Black-Scholes-Merton & 3D Greeks Analytical Pricer",
    subtitle: "Option Surface Geometry, Second-Order Greeks & Implied Volatility Inversion",
    category: "Derivatives & Volatility Analytics",
    description: "Calculates closed-form European option pricing and full first, second, and third-order Greeks (Delta, Gamma, Vega, Theta, Rho, Vanna, Charm, Volga). Includes dynamic volatility smile spline interpolation.",
    tags: ["Option Pricing", "Greek Neutrality", "Vanna-Volga", "Surface Curvature"],
    formula: "C(S, t) = S_t N(d_1) - K e^{-r(T-t)} N(d_2), \\quad d_1 = \\frac{\\ln(S/K) + (r + \\sigma^2/2)(T-t)}{\\sigma\\sqrt{T-t}}",
    features: [
      "Full Greek spectrum calculation including Vanna (dDelta/dVol) and Volga (dVega/dVol).",
      "Real-time payoff and PnL diagram rendering for multi-leg option spreads (Straddles, Condors, Vertical Spreads).",
      "Intrinsic vs. Extrinsic time value decomposition curve.",
      "Dynamic parameter sliders with instant millisecond Greek sensitivity updates."
    ],
    interactiveConfig: {
      type: "black_scholes",
      defaultSpot: 100,
      defaultStrike: 100,
      defaultDaysToExpiry: 45,
      defaultVolatility: 22.0,
      defaultRate: 4.5,
      defaultOptionType: "call"
    }
  },
  {
    id: "macro-regime-hmm-classifier",
    name: "Macro Regime Hidden Markov Model (HMM)",
    subtitle: "Unsupervised Gaussian Mixture State-Space Identification",
    category: "Macro Quant / Machine Learning",
    description: "Identifies hidden macroeconomic regimes (Reflation, Goldilocks Expansion, Stagflation, Deflationary Contraction) using multi-variate continuous observation vectors from yield curves, credit spreads, real rates, and copper/gold ratios.",
    tags: ["Hidden Markov Models", "Regime Switching", "Expectation-Maximization", "Viterbi Algorithm"],
    formula: "P(S_t = j \\mid S_{t-1} = i) = A_{ij}, \\quad Y_t \\sim \\mathcal{N}(\\mu_{S_t}, \\Sigma_{S_t})",
    features: [
      "Viterbi algorithm decoded state transition probabilities.",
      "Dynamic asset allocation rules calibrated per active macroeconomic state.",
      "Early warning transition alerts for high-vulnerability regime shifts."
    ],
    interactiveConfig: {
      type: "hmm_regime"
    }
  }
];

// Custom Technical & Quantitative Indicators Data

export const customIndicators = [
  {
    id: "ilfi-institutional-liquidity",
    name: "ILFI (Institutional Liquidity Flow Index)",
    subtitle: "Dark Pool Print Aggregation, Block Trade Imbalance & Capital Absorption",
    category: "Order Flow & Market Microstructure",
    timeframes: ["Intraday 5M", "Hourly", "Daily"],
    assetSuitability: "Equities, Index Futures, US Sovereign Treasuries",
    status: "Proprietary Active Indicator",
    description: "An advanced algorithmic oscillator designed to detect hidden institutional accumulation and distribution phases. Unlike standard volume indicators (OBV, VWAP), ILFI strips out retail noise by analyzing block trade size distribution, execution venue classification (lit vs. dark ATS), and tick-level aggressive delta.",
    formula: "ILFI_t = \\frac{\\sum_{i=1}^N \\text{BlockVol}_{i,t} \\times \\text{Sign}(\\Delta P_i) \\times \\mathcal{W}(\\text{DarkRatio}_i)}{\\text{ADV}_{20}} \\times 100",
    keySignals: [
      { signal: "Bullish Institutional Absorption", condition: "ILFI > +65 while Price makes lower lows (Bullish Divergence)", action: "Scale into high-beta longs; institutional absorption floor detected." },
      { signal: "Distribution / Liquidity Exit", condition: "ILFI < -60 with rising retail lit volume", action: "Tighten stops, initiate delta-hedges or systematic call selling." },
      { signal: "Regime Neutral / Chop", condition: "-20 < ILFI < +20", action: "Run mean-reversion market-making subroutines." }
    ],
    sampleChartData: [
      { time: "09:30", price: 580.2, indicator: 15, baseline: 0 },
      { time: "10:30", price: 578.4, indicator: 45, baseline: 0 },
      { time: "11:30", price: 576.8, indicator: 72, baseline: 0 },
      { time: "12:30", price: 579.5, indicator: 84, baseline: 0 },
      { time: "13:30", price: 584.1, indicator: 68, baseline: 0 },
      { time: "14:30", price: 588.6, indicator: 52, baseline: 0 },
      { time: "15:30", price: 592.0, indicator: 28, baseline: 0 },
      { time: "16:00", price: 593.5, indicator: 10, baseline: 0 }
    ],
    codeSnippet: `// Pine Script / Python Vectorized Implementation snippet
//@version=5
indicator("Institutional Liquidity Flow Index [ILFI]", overlay=false)
length = input.int(20, "Lookback Period")
blockThreshold = input.float(2.0, "Block Size Sigma Multiplier")

block_vol = volume > (ta.sma(volume, length) * blockThreshold) ? volume : 0
signed_flow = block_vol * math.sign(close - open)
ilfi = (ta.ema(signed_flow, length) / ta.sma(volume, length)) * 100.0

plot(ilfi, "ILFI", color=ilfi > 50 ? color.emerald : ilfi < -50 ? color.crimson : color.gray)`
  },
  {
    id: "vro-volatility-regime-oscillator",
    name: "VRO (Volatility Regime Oscillator)",
    subtitle: "Parkinson Realized Volatility vs. Implied Volatility Surface Skew",
    category: "Volatility & Tail Risk",
    timeframes: ["Daily", "Weekly"],
    assetSuitability: "Cross-Asset (Equities, FX, Rates, Commodities)",
    status: "Proprietary Active Indicator",
    description: "Measures the tension between forward-looking derivative market implied volatility (pricing fear/skew) and high-frequency realized price dispersion (actual movement). Pinpoints extreme volatility compressions prior to explosive directional breakout expansions.",
    formula: "VRO_t = \\frac{\\sigma_{\\text{Parkinson}, 10d}}{\\sigma_{\\text{IV30}}} - \\text{EMA}\\left( \\frac{\\sigma_{\\text{Realized}}}{\\sigma_{\\text{IV30}}}, 50d \\right)",
    keySignals: [
      { signal: "Volatility Spring (Coiling)", condition: "VRO < -2.0 Standard Deviations for >5 consecutive days", action: "Buy long gamma / cheap OTM straddles before breakout surge." },
      { signal: "Vol Exhaustion / Mean Reversion", condition: "VRO > +2.5 Standard Deviations following market selloff", action: "Short volatility premium, deploy risk-reversal overlays." }
    ],
    sampleChartData: [
      { time: "Day 1", price: 100, indicator: -1.8, baseline: 0 },
      { time: "Day 5", price: 101, indicator: -2.3, baseline: 0 },
      { time: "Day 10", price: 102, indicator: -2.7, baseline: 0 },
      { time: "Day 15", price: 109, indicator: 0.8, baseline: 0 },
      { time: "Day 20", price: 114, indicator: 2.4, baseline: 0 },
      { time: "Day 25", price: 112, indicator: 1.1, baseline: 0 },
      { time: "Day 30", price: 115, indicator: -0.4, baseline: 0 }
    ],
    codeSnippet: `def compute_vro(realized_vol_series, iv_series, window=50):
    vol_ratio = realized_vol_series / iv_series
    z_score = (vol_ratio - vol_ratio.rolling(window).mean()) / vol_ratio.rolling(window).std()
    return z_score`
  },
  {
    id: "camb-cross-asset-momentum-breadth",
    name: "CAMB (Cross-Asset Momentum Breadth)",
    subtitle: "Global Multi-Asset Trend Diffusion & Macro Inter-Market Confirmation",
    category: "Macro Quant / Market Breadth",
    timeframes: ["Daily", "Weekly"],
    assetSuitability: "Global Macro Asset Classes (120+ Liquid Instruments)",
    status: "Proprietary Active Indicator",
    description: "Evaluates the breadth of positive price momentum across 6 distinct asset classes: G10 Sovereign Yields, Global Equities, Base & Precious Metals, Energy, Credit Spreads, and FX Carry Baskets. When breadth surpasses 80%, liquidity is expansionary; when below 25%, risk-off de-leveraging dominates.",
    formula: "CAMB_t = \\frac{1}{M} \\sum_{k=1}^M \\left[ \\frac{1}{N_k} \\sum_{i=1}^{N_k} \\mathbb{I}\\left( P_{i,k,t} > \\text{SMA}(P_{i,k}, 200) \\right) \\times w_k \\right]",
    keySignals: [
      { signal: "Synchronized Global Expansion", condition: "CAMB > 80% breadth across at least 5 asset classes", action: "Max risk budget, overweight risk assets and carry." },
      { signal: "Macro Divergence Warning", condition: "Equities at all-time highs while CAMB drops below 40%", action: "Derisk equity beta, increase cash and short-duration sovereigns." }
    ],
    sampleChartData: [
      { time: "Q1", price: 480, indicator: 78, baseline: 50 },
      { time: "Q2", price: 510, indicator: 86, baseline: 50 },
      { time: "Q3", price: 535, indicator: 62, baseline: 50 },
      { time: "Q4", price: 550, indicator: 38, baseline: 50 },
      { time: "Q1 Next", price: 530, indicator: 28, baseline: 50 },
      { time: "Q2 Next", price: 570, indicator: 74, baseline: 50 }
    ],
    codeSnippet: `// Python vectorized cross-asset momentum calculation
def compute_camb(asset_price_df, weights_dict, ma_window=200):
    above_ma = (asset_price_df > asset_price_df.rolling(ma_window).mean()).astype(int)
    weighted_breadth = sum(above_ma[col] * weights_dict[col] for col in asset_price_df.columns)
    return weighted_breadth * 100.0`
  }
];

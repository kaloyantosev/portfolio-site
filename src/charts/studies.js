// JavaScript ports of the Pine indicators in src/indicators/*.pine, so the site can
// draw them on real data with lightweight-charts. Each study takes daily bars
// [{time, open, high, low, close}] and returns a plain description of what to draw;
// IndicatorChart.jsx renders it.

// ─── Pine ta.* equivalents (arrays aligned to bars, null during warm-up) ──────
export function sma(src, n) {
  return src.map((_, i) => {
    if (i < n - 1) return null;
    let s = 0;
    for (let k = i - n + 1; k <= i; k++) { if (src[k] == null) return null; s += src[k]; }
    return s / n;
  });
}

// Recursive average seeded with an SMA, like Pine's ta.ema / ta.rma.
function recursive(src, n, alpha) {
  const out = new Array(src.length).fill(null);
  let prev = null, seen = 0, sum = 0;
  for (let i = 0; i < src.length; i++) {
    const v = src[i];
    if (v == null) continue;
    if (prev == null) {
      sum += v; seen++;
      if (seen === n) { prev = sum / n; out[i] = prev; }
    } else {
      prev = alpha * v + (1 - alpha) * prev;
      out[i] = prev;
    }
  }
  return out;
}
export const ema = (src, n) => recursive(src, n, 2 / (n + 1));
export const rma = (src, n) => recursive(src, n, 1 / n);

export function wma(src, n) {
  const norm = (n * (n + 1)) / 2;
  return src.map((_, i) => {
    if (i < n - 1) return null;
    let s = 0;
    for (let k = 0; k < n; k++) { const v = src[i - k]; if (v == null) return null; s += v * (n - k); }
    return s / norm;
  });
}

// Population standard deviation, as Pine's ta.stdev.
export function stdev(src, n) {
  const m = sma(src, n);
  return src.map((_, i) => {
    if (m[i] == null) return null;
    let s = 0;
    for (let k = i - n + 1; k <= i; k++) s += (src[k] - m[i]) ** 2;
    return Math.sqrt(s / n);
  });
}

const windowed = (src, n, pick) => src.map((_, i) => {
  if (i < n - 1) return null;
  let best = null;
  for (let k = i - n + 1; k <= i; k++) if (src[k] != null && (best == null || pick(src[k], best))) best = src[k];
  return best;
});
export const highest = (src, n) => windowed(src, n, (a, b) => a > b);
export const lowest = (src, n) => windowed(src, n, (a, b) => a < b);

export const trueRange = bars => bars.map((b, i) => (i === 0
  ? b.high - b.low
  : Math.max(b.high - b.low, Math.abs(b.high - bars[i - 1].close), Math.abs(b.low - bars[i - 1].close))));

export function dmi(bars, diLen, adxLen) {
  const moves = bars.map((b, i) => (i ? [b.high - bars[i - 1].high, bars[i - 1].low - b.low] : [0, 0]));
  const plusDM = moves.map(([up, down]) => (up > down && up > 0 ? up : 0));
  const minusDM = moves.map(([up, down]) => (down > up && down > 0 ? down : 0));
  const tr = rma(trueRange(bars), diLen);
  const pdm = rma(plusDM, diLen), mdm = rma(minusDM, diLen);
  const plus = tr.map((t, i) => (t == null || pdm[i] == null ? null : (100 * pdm[i]) / t));
  const minus = tr.map((t, i) => (t == null || mdm[i] == null ? null : (100 * mdm[i]) / t));
  const dx = plus.map((p, i) => {
    if (p == null || minus[i] == null) return null;
    const sum = p + minus[i];
    return Math.abs(p - minus[i]) / (sum === 0 ? 1 : sum);
  });
  const adx = rma(dx, adxLen).map(v => (v == null ? null : 100 * v));
  return { plus, minus, adx };
}

// ─── shared helpers ───────────────────────────────────────────────────────
const DAY = 86400;
// Next n trading-day timestamps after t (weekends skipped; holidays ignored).
function futureTimes(t, n) {
  const out = [];
  let x = t;
  while (out.length < n) {
    x += DAY;
    const wd = new Date(x * 1000).getUTCDay();
    if (wd !== 0 && wd !== 6) out.push(x);
  }
  return out;
}
export const quarterOf = t => Math.ceil((new Date(t * 1000).getUTCMonth() + 1) / 3);
const series = (bars, values, extra) => bars.map((b, i) => (values[i] == null ? { time: b.time } : { time: b.time, value: values[i], ...(extra ? extra(i) : {}) }));
const hexA = (hex, a) => `rgba(${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)},${a})`;

// ─── 1. Dynamic Regression Channels Pro ───────────────────────────────────
// OLS on the last n values, x = bars ago. Returns {a, b, sigma, r2}.
export function olsFit(src, n) {
  const last = src.length - 1;
  let sx = 0, sy = 0, sxx = 0, sxy = 0, syy = 0;
  for (let i = 0; i < n; i++) {
    const y = src[last - i];
    sx += i; sy += y; sxx += i * i; sxy += i * y; syy += y * y;
  }
  const den = n * sxx - sx * sx;
  const b = (n * sxy - sx * sy) / den;
  const a = (sy - b * sx) / n;
  let ss = 0;
  for (let i = 0; i < n; i++) ss += (src[last - i] - (a + b * i)) ** 2;
  const vy = n * syy - sy * sy;
  return { a, b, sigma: Math.sqrt(ss / Math.max(n - 2, 1)), r2: vy > 0 ? (n * sxy - sx * sy) ** 2 / (den * vy) : 0 };
}

export function drc(bars, { lens = [12, 60, 210, 315], mult = 2, useLog = true, proj = 15, tolAtr = 0.6, minHits = 2 } = {}) {
  const colors = ['#7D8CA3', '#C9A96E', '#4C8DD9', '#E8E6E1'];
  const names = ['Scalp', 'Swing', 'Trend', 'Core'];
  const src = bars.map(b => (useLog ? Math.log(b.close) : b.close));
  const toPrice = v => (useLog ? Math.exp(v) : v);
  const last = bars.length - 1;
  const future = futureTimes(bars[last].time, proj);
  const timeAt = x => (x >= 0 ? bars[last - x].time : future[-x - 1]); // x = bars ago, negative = future
  const close = bars[last].close;

  const lines = [];
  const levels = [];
  const channels = [];
  lens.forEach((n, ci) => {
    if (bars.length < n) return;
    const { a, b, sigma, r2 } = olsFit(src, n);
    const alpha = Math.max(0.4, Math.min(1, 0.35 + r2)); // weaker fit = fainter
    const band = (k, from, to) => {
      const pts = [];
      for (let x = from; x >= to; x--) pts.push({ time: timeAt(x), value: toPrice(a + b * x + k * sigma) });
      return pts;
    };
    const c = colors[ci];
    lines.push({ data: band(mult, n - 1, 0), color: c, alpha, style: 'solid' });
    lines.push({ data: band(-mult, n - 1, 0), color: c, alpha, style: 'solid' });
    if (proj > 0) {
      lines.push({ data: band(mult, 0, -proj), color: c, alpha, style: 'dashed' });
      lines.push({ data: band(-mult, 0, -proj), color: c, alpha, style: 'dashed' });
    }
    lines.push({ data: band(0, n - 1, -proj), color: c, alpha: 0.3, style: 'dotted' });
    const up = toPrice(a + mult * sigma), lo = toPrice(a - mult * sigma);
    levels.push(up, lo);
    channels.push({ name: `${names[ci]} ${n}`, color: c, up, mid: toPrice(a), lo, r2, rising: b < 0 });
  });

  // Confluence: band levels within tolAtr × ATR(14) of each other form one zone.
  const tol = tolAtr * rma(trueRange(bars), 14)[last];
  const lv = [...levels].sort((x, y) => x - y);
  const zones = [];
  for (let i = 0; i < lv.length;) {
    let j = i;
    while (j + 1 < lv.length && lv[j + 1] - lv[j] <= tol) j++;
    const hits = j - i + 1;
    if (hits >= minHits) {
      zones.push({ lo: lv[i] - tol * 0.25, hi: lv[j] + tol * 0.25, hits, support: (lv[i] + lv[j]) / 2 < close });
    }
    i = j + 1;
  }
  return { overlay: { lines, zones }, channels };
}

// ─── 2. Idiosyncratic Market Stress Index ─────────────────────────────────
export function imsi(bars, { lookbackRange = 252, zLookback = 200, stressLimit = 10, extremeLimit = 5 } = {}) {
  const close = bars.map(b => b.close), high = bars.map(b => b.high), low = bars.map(b => b.low);
  const hi = highest(high, lookbackRange), lo = lowest(low, lookbackRange);
  const pr = close.map((c, i) => (hi[i] == null ? null : hi[i] - lo[i] > 0 ? ((c - lo[i]) / (hi[i] - lo[i])) * 100 : 50));
  const m = sma(close, zLookback), sd = stdev(close, zLookback);
  const z = close.map((c, i) => (m[i] == null ? null : sd[i] > 0 ? (c - m[i]) / sd[i] : 0));
  const low10 = lowest(low, 10), prLow10 = lowest(pr, 10);
  const markers = [], shade = [];
  bars.forEach((b, i) => {
    if (pr[i] == null) return;
    const stress = pr[i] <= stressLimit;
    if (stress && z[i] != null && z[i] <= -2) shade.push({ time: b.time, value: 100, color: 'rgba(194,69,61,0.16)' });
    if (i > 0 && stress && low10[i] < low10[i - 1] && prLow10[i - 1] != null && pr[i] > prLow10[i - 1]) {
      markers.push({ time: b.time, position: 'belowBar', shape: 'arrowUp', color: '#2E9E6B' });
    }
  });
  return {
    pane: {
      range: [0, 100],
      lines: [
        { data: series(bars, z.map(v => (v == null ? null : ((v + 3) / 6) * 100))), area: true, color: '#4C8DD9', alpha: 0.5, width: 1 },
        { data: series(bars, pr, i => ({ color: pr[i] <= extremeLimit ? '#C2453D' : pr[i] <= stressLimit ? '#D9822B' : '#E8E6E1' })), color: '#E8E6E1', width: 2, markers },
      ],
      shade,
      quarters: true,
      levels: [
        { price: 100, color: 'rgba(46,158,107,0.5)', style: 'dotted' },
        { price: 50, color: 'rgba(255,255,255,0.18)', style: 'dashed' },
        { price: stressLimit, color: 'rgba(217,130,43,0.5)', style: 'dotted' },
        { price: 0, color: 'rgba(194,69,61,0.5)', style: 'solid' },
      ],
    },
  };
}

// ─── 3. Trend Maturity & Efficiency Oscillator ────────────────────────────
export function tmeo(bars, { lookback = 20, smooth = 5 } = {}) {
  const close = bars.map(b => b.close);
  const eff = close.map((c, i) => {
    if (i < lookback) return null;
    let path = 0;
    for (let k = 0; k < lookback; k++) path += Math.abs(close[i - k] - close[i - k - 1]);
    return path > 0 ? ((c - close[i - lookback]) / path) * 100 : 0;
  });
  const line = wma(eff, smooth);
  const state = i => {
    const v = line[i], d = i > 0 && line[i - 1] != null && v != null ? v - line[i - 1] : null;
    if (d == null) return null;
    if (v >= 40) return d >= 0 ? '#00ff88' : '#ffcc00';
    if (v <= -40) return d <= 0 ? '#ff0055' : '#ff6600';
    return '#808080';
  };
  const shade = [];
  bars.forEach((b, i) => { const c = state(i); if (c) shade.push({ time: b.time, value: 100, color: hexA(c, c === '#808080' ? 0.05 : 0.08) }); });

  // Running average price of the current quarter (main chart, dotted aqua).
  let sum = 0, cnt = 0;
  const qAvg = bars.map((b, i) => {
    if (i === 0 || quarterOf(b.time) !== quarterOf(bars[i - 1].time)) { sum = 0; cnt = 0; }
    sum += b.close; cnt += 1;
    return sum / cnt;
  });
  return {
    overlay: { lines: [{ data: series(bars, qAvg), color: '#5BC0DE', alpha: 0.5, style: 'dotted', step: true }], quarters: true },
    pane: {
      range: [-100, 100],
      lines: [{ data: series(bars, line, i => ({ color: state(i) || '#808080' })), color: '#808080', width: 3 }],
      shade,
      shadeBase: -100,
      quarters: true,
      levels: [
        { price: 100, color: 'rgba(255,255,255,0.2)', style: 'solid' },
        { price: 40, color: 'rgba(46,158,107,0.5)', style: 'dotted' },
        { price: 0, color: 'rgba(255,255,255,0.5)', style: 'solid' },
        { price: -40, color: 'rgba(194,69,61,0.5)', style: 'dotted' },
        { price: -100, color: 'rgba(255,255,255,0.2)', style: 'solid' },
      ],
    },
  };
}

// ─── 4. Stoch + ATR + DMI Matrix ──────────────────────────────────────────
// Plotted lines only; the long/short signal arrows are not drawn on the site.
export function stochAtrDmi(bars, { k = 5, atrLen = 14, diLen = 14, adxLen = 14 } = {}) {
  const close = bars.map(b => b.close), high = bars.map(b => b.high), low = bars.map(b => b.low);
  const hh = highest(high, k), ll = lowest(low, k);
  const raw = close.map((c, i) => (hh[i] == null ? null : hh[i] - ll[i] > 0 ? (100 * (c - ll[i])) / (hh[i] - ll[i]) : 0));
  const K = sma(raw, 3);
  const atr = rma(trueRange(bars), atrLen);
  const aHi = highest(atr, 100), aLo = lowest(atr, 100);
  const nAtr = atr.map((v, i) => (aHi[i] == null ? null : ((v - aLo[i]) / Math.max(aHi[i] - aLo[i], 0.00001)) * 100));
  const { plus, minus, adx } = dmi(bars, diLen, adxLen);
  return {
    pane: {
      range: [0, 100],
      lines: [
        { data: series(bars, nAtr), color: '#C9A96E', alpha: 0.55, width: 1 },
        { data: series(bars, plus), color: '#2E9E6B', alpha: 0.8, width: 1 },
        { data: series(bars, minus), color: '#C2453D', alpha: 0.8, width: 1 },
        { data: series(bars, adx), color: '#FFFFFF', alpha: 0.35, width: 1 },
        { data: series(bars, K), color: '#4C8DD9', width: 2 },
      ],
      levels: [
        { price: 70, color: 'rgba(255,255,255,0.3)', style: 'dashed' },
        { price: 30, color: 'rgba(255,255,255,0.3)', style: 'dashed' },
      ],
    },
  };
}

// ─── 5. Mid-Cap Volume Intensity Ranker ───────────────────────────────────
// Pine ta.cci: (src - SMA) / (0.015 × mean absolute deviation).
export function cci(src, n) {
  const m = sma(src, n);
  return src.map((v, i) => {
    if (m[i] == null) return null;
    let dev = 0;
    for (let k = i - n + 1; k <= i; k++) dev += Math.abs(src[k] - m[i]);
    dev /= n;
    return dev === 0 ? 0 : (v - m[i]) / (0.015 * dev);
  });
}

export function volumeIntensity(bars, { lens = [12, 60, 210, 315], mult = 4, cciLen = 20, adSmooth = 10 } = {}) {
  const close = bars.map(b => b.close);
  // Position of close inside each regression channel (0 = lower band, 100 = upper), length-weighted.
  const regRsi = n => close.map((c, i) => {
    if (i < n - 1) return null;
    const lr = olsFit(close.slice(0, i + 1), n).a;
    let mean = 0, s = 0;
    for (let k = i - n + 1; k <= i; k++) mean += close[k];
    mean /= n;
    for (let k = i - n + 1; k <= i; k++) s += (close[k] - mean) ** 2;
    const sd = Math.sqrt(s / n);
    return sd === 0 ? 50 : ((c - (lr - sd * mult)) / (2 * sd * mult)) * 100;
  });
  const parts = lens.map(n => regRsi(n));
  const wSum = lens.reduce((a, b) => a + b, 0);
  const wRsi = close.map((_, i) => (parts.some(p => p[i] == null) ? null : parts.reduce((s, p, j) => s + p[i] * lens[j], 0) / wSum));
  const nCci = cci(close, cciLen).map(v => (v == null ? null : ((v + 200) / 400) * 100));

  // Accumulation/distribution line, smoothed and normalised to its 100-bar range.
  let ad = 0;
  const adLine = bars.map(b => {
    const range = b.high - b.low;
    ad += (range === 0 ? 0 : ((b.close - b.low) - (b.high - b.close)) / range) * (b.volume || 0);
    return ad;
  });
  const sAd = ema(adLine, adSmooth);
  const hi = highest(sAd, 100), lo = lowest(sAd, 100);
  const nAd = sAd.map((v, i) => (hi[i] == null ? null : hi[i] === lo[i] ? 50 : ((v - lo[i]) / (hi[i] - lo[i])) * 100));
  const rising = i => i > 0 && nAd[i] != null && nAd[i - 1] != null && nAd[i] - nAd[i - 1] > 0;

  return {
    pane: {
      range: [0, 100],
      zones: [{ from: 50, to: 100, color: 'rgba(46,158,107,0.06)' }, { from: 0, to: 50, color: 'rgba(194,69,61,0.06)' }],
      lines: [
        { data: series(bars, nCci), color: '#D9822B', alpha: 0.5, width: 1 },
        { data: series(bars, nAd, i => ({ color: rising(i) ? 'rgba(20,160,150,0.85)' : 'rgba(150,40,50,0.85)' })), color: '#14A096', width: 2 },
        { data: series(bars, wRsi), color: '#FFFFFF', width: 2 },
      ],
      levels: [{ price: 50, color: 'rgba(232,200,60,0.6)', style: 'dotted' }],
    },
  };
}

// ─── 6. EMA 200/300 HA cross + TD Sequential ──────────────────────────────
// Port of src/indicators/ema-ha-cross-td.pine. Drawn on the site: both EMAs, the long/short signals, TD setup 9s
// (bright = perfected) and countdown 13s. Not drawn: setup 1-8, countdown 1-12, TDST lines and the "P" marks.
// Uses Yahoo's split-adjusted (not dividend-adjusted) daily candles, so EMAs can differ slightly from an ADJ chart.
export function emaHaCross(bars, { flatGap = 0.002, flatSlope = 0.02, flatDays = 40 } = {}) {
  const o = bars.map(b => b.open), h = bars.map(b => b.high), l = bars.map(b => b.low), c = bars.map(b => b.close);
  const hC = bars.map(b => (b.open + b.high + b.low + b.close) / 4);
  const hO = [];
  hC.forEach((_, i) => hO.push(i ? (hO[i - 1] + hC[i - 1]) / 2 : (o[0] + c[0]) / 2));
  const e200 = ema(hC, 200), e300 = ema(hC, 300);
  const ok = i => e200[i] != null && e300[i] != null;
  const inGap = i => ok(i) && Math.abs(e200[i] - e300[i]) / Math.min(e200[i], e300[i]) < flatGap;
  const markers = [];
  const mark = (i, below, color, text, shape = 'circle', size = 0.5) =>
    markers.push({ time: bars[i].time, position: below ? 'belowBar' : 'aboveBar', color, text, shape, size });

  // EMA cross: a break through both lines arms the entry the other way; the whole HA body past both fires it
  let armLong = false, armShort = false;
  // TD Sequential state (same names as the Pine script)
  let bs = 0, ss = 0, bAct = false, sAct = false, bc = 0, sc = 0, b8 = null, s8 = null, bSize = null, sSize = null, bHi = null, sLo = null;
  const tH = h.map((v, i) => Math.max(v, i ? c[i - 1] : v)), tL = l.map((v, i) => Math.min(v, i ? c[i - 1] : v));
  const win = (a, i, f) => (i < 8 ? null : f(...a.slice(i - 8, i + 1)));

  for (let i = 0; i < bars.length; i++) {
    if (ok(i)) {
      const loB = Math.min(hO[i], hC[i]), hiB = Math.max(hO[i], hC[i]);
      const side = loB > e200[i] && loB > e300[i] ? 1 : hiB < e200[i] && hiB < e300[i] ? -1 : 0;
      let tangled = inGap(i) && i > flatDays && e200[i - 20] != null && Math.abs(e200[i] / e200[i - 20] - 1) < flatSlope;
      for (let k = i - flatDays; tangled && k < i; k++) tangled = inGap(k);
      const fire = (side === 1 && armLong) || (side === -1 && armShort);
      if (fire && side === 1) armLong = false;
      if (fire && side === -1) armShort = false;
      armLong = armLong || (loB < e200[i] && loB < e300[i]);
      armShort = armShort || (hiB > e200[i] && hiB > e300[i]);
      if (i > 300 && fire && !tangled) mark(i, side === 1, side === 1 ? '#2E9E6B' : '#C2453D', side === 1 ? 'Long' : 'Short', side === 1 ? 'arrowUp' : 'arrowDown', 1.4);
    }

    bs = i >= 4 && c[i] < c[i - 4] ? bs + 1 : 0;
    ss = i >= 4 && c[i] > c[i - 4] ? ss + 1 : 0;
    const hi9 = win(tH, i, Math.max), lo9 = win(tL, i, Math.min);
    if (ss === 9) bAct = false;
    if (bs === 9) sAct = false;
    if (bs === 9 || bs === 18) {
      const sz = hi9 - lo9;
      if (!bAct || (sz >= bSize && sz < 1.618 * bSize)) { bAct = true; bc = 0; b8 = null; bSize = sz; bHi = hi9; }
      else if (sz >= 1.618 * bSize) bAct = false;
    }
    if (ss === 9 || ss === 18) {
      const sz = hi9 - lo9;
      if (!sAct || (sz >= sSize && sz < 1.618 * sSize)) { sAct = true; sc = 0; s8 = null; sSize = sz; sLo = lo9; }
      else if (sz >= 1.618 * sSize) sAct = false;
    }
    if (bAct && tL[i] > bHi) bAct = false;
    if (sAct && tH[i] < sLo) sAct = false;
    if (bs === 9) mark(i, true, Math.min(l[i], l[i - 1]) <= Math.min(l[i - 2], l[i - 3]) ? '#7CFC00' : 'rgba(124,252,0,0.45)', '9');
    if (ss === 9) mark(i, false, Math.max(h[i], h[i - 1]) >= Math.max(h[i - 2], h[i - 3]) ? '#FF4D4D' : 'rgba(255,77,77,0.45)', '9');
    if (bAct && i >= 2 && c[i] <= l[i - 2] && (bc < 12 || (b8 != null && l[i] <= b8))) {
      bc += 1;
      if (bc === 8) b8 = c[i];
      if (bc === 13) mark(i, true, '#FACC15', '13');
      bAct = bc < 13;
    }
    if (sAct && i >= 2 && c[i] >= h[i - 2] && (sc < 12 || (s8 != null && h[i] >= s8))) {
      sc += 1;
      if (sc === 8) s8 = c[i];
      if (sc === 13) mark(i, false, '#FACC15', '13');
      sAct = sc < 13;
    }
  }
  return {
    overlay: {
      lines: [
        { data: series(bars, e200), color: '#F59E0B', width: 2 },
        { data: series(bars, e300), color: '#A855F7', width: 2 },
      ],
      markers,
    },
  };
}

export const STUDIES = { drc, imsi, tmeo, stochAtrDmi, volumeIntensity, emaHaCross };

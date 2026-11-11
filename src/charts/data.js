// Daily OHLC bars from Yahoo Finance's chart endpoint (as in Truecharts), through the
// /yf proxy (vite.config.js in dev, vercel.json in production). Unofficial endpoint:
// Yahoo can rate-limit it, in which case the chart shows "Chart data unavailable".
const cache = new Map();

export function loadDaily(symbol, range = '3y', interval = '1d') {
  const key = `${symbol}|${range}|${interval}`;
  if (!cache.has(key)) {
    const url = `/yf/v8/finance/chart/${encodeURIComponent(symbol)}?range=${range}&interval=${interval}`;
    const p = fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(`Price data request failed (${r.status})`);
        return r.json();
      })
      .then(json => {
        const res = json?.chart?.result?.[0];
        const q = res?.indicators?.quote?.[0];
        if (!res || !q) throw new Error('No price data returned');
        const bars = [];
        res.timestamp.forEach((t, i) => {
          const [o, h, l, c] = [q.open[i], q.high[i], q.low[i], q.close[i]];
          if ([o, h, l, c].some(v => v == null)) return; // skip holidays / gaps
          bars.push({ time: t, open: o, high: h, low: l, close: c });
        });
        return bars;
      });
    p.catch(() => cache.delete(key)); // allow a retry after a failure
    cache.set(key, p);
  }
  return cache.get(key);
}

import React, { useEffect, useRef, useState } from 'react';
import { createChart, createSeriesMarkers, AreaSeries, LineSeries, CandlestickSeries } from 'lightweight-charts';
import { loadDaily } from '../../charts/data';
import { olsFit } from '../../charts/studies';

// Read-only market charts for the articles (lightweight-charts + Yahoo data, like the indicators).
const BASE = {
  autoSize: true,
  layout: { background: { type: 'solid', color: 'transparent' }, textColor: '#9AA5B1', fontFamily: 'Manrope, system-ui, sans-serif', fontSize: 11, attributionLogo: false },
  grid: { vertLines: { visible: false }, horzLines: { visible: false } },
  crosshair: { vertLine: { visible: false, labelVisible: false }, horzLine: { visible: false, labelVisible: false } },
  rightPriceScale: { borderVisible: false },
  timeScale: { borderVisible: false },
  handleScroll: false,
  handleScale: false,
};
const quiet = { priceLineVisible: false, lastValueVisible: false, crosshairMarkerVisible: false };
const ts = date => Math.floor(new Date(`${date}T00:00:00Z`).getTime() / 1000);
const fmt = (v, cur) => `${cur}${v.toLocaleString('en-US', { maximumFractionDigits: v < 100 ? 2 : 0 })}`;

// Draws into a container once data has loaded; returns the chart for cleanup.
function useChart(load, draw, deps) {
  const ref = useRef(null);
  const [state, setState] = useState({ status: 'loading' });
  useEffect(() => {
    let chart, cancelled = false;
    load().then(data => {
      if (cancelled || !ref.current) return;
      chart = createChart(ref.current, BASE);
      setState({ status: 'ready', ...(draw(chart, data) || {}) });
    }).catch(() => !cancelled && setState({ status: 'error' }));
    return () => { cancelled = true; chart?.remove(); };
  }, deps);
  return [ref, state];
}

// Price from a little before the publication date until today, with the publication marked.
export function PriceSince({ symbol, label, since, currency = '$' }) {
  const [ref, st] = useChart(
    () => loadDaily(symbol, '2y'),
    (chart, bars) => {
      const t0 = ts(since);
      const pubIdx = bars.findIndex(b => b.time >= t0);
      if (bars.length < 5 || pubIdx < 0) return { noHistory: true, now: bars.at(-1)?.close };
      const shown = bars.slice(Math.max(0, pubIdx - 25));
      const pub = bars[pubIdx].close, now = bars.at(-1).close;
      const up = now >= pub;
      const s = chart.addSeries(AreaSeries, {
        ...quiet, lineWidth: 2, lineColor: '#E8E6E1',
        topColor: up ? 'rgba(46,158,107,0.25)' : 'rgba(194,69,61,0.25)', bottomColor: 'rgba(0,0,0,0)',
      });
      s.setData(shown.map(b => ({ time: b.time, value: b.close })));
      s.createPriceLine({ price: pub, color: 'rgba(201,169,110,0.8)', lineStyle: 2, lineWidth: 1, axisLabelVisible: true, title: 'Published' });
      createSeriesMarkers(s, [{ time: bars[pubIdx].time, position: 'aboveBar', shape: 'arrowDown', color: '#C9A96E', text: 'Published' }]);
      chart.timeScale().fitContent();
      return { pub, now };
    },
    [symbol, since],
  );

  const change = st.pub ? ((st.now / st.pub - 1) * 100) : null;
  return (
    <figure className="w-full">
      <div className="flex items-baseline justify-between gap-4">
        <div className="section-label">{label}</div>
        {st.now != null && (
          <div className="text-sm text-citi-muted">
            {st.pub != null && <>Published {fmt(st.pub, currency)} · </>}
            Now <span className="text-white">{fmt(st.now, currency)}</span>
            {change != null && <span className={change >= 0 ? 'text-emerald-400' : 'text-red-400'}> {change >= 0 ? '+' : ''}{change.toFixed(1)}%</span>}
          </div>
        )}
      </div>
      <div className="relative mt-3 h-56">
        <div ref={ref} className="absolute inset-0" />
        {(st.status === 'error' || st.noHistory) && (
          <p className="absolute inset-0 flex items-center justify-center text-center text-sm text-citi-muted px-6">
            {st.noHistory ? 'Price history for this market is not available from the free data feed; the current price is shown above.' : 'Chart data unavailable right now.'}
          </p>
        )}
      </div>
    </figure>
  );
}

// Gold monthly with the three regression channels from the article, fitted up to the call (Jan 2026).
function GoldChannels() {
  const [ref, st] = useChart(
    () => loadDaily('GC=F', 'max', '1mo'),
    (chart, bars) => {
      const candles = chart.addSeries(CandlestickSeries, { upColor: '#E8E6E1', downColor: '#6B7280', wickUpColor: '#E8E6E1', wickDownColor: '#6B7280', borderVisible: false, priceLineVisible: false });
      candles.setData(bars);
      const callIdx = bars.findIndex(b => b.time >= ts('2026-01-01'));
      const closes = bars.slice(0, callIdx + 1).map(b => b.close);
      const channels = [
        { from: 0, color: '#E8E6E1', name: 'Long-term (from 2000)' },
        { from: bars.findIndex(b => b.time >= ts('2021-01-01')), color: '#4C8DD9', name: 'Cycle (from 2021)' },
        { from: bars.findIndex(b => b.time >= ts('2025-01-01')), color: '#C9A96E', name: '1-year (from 2025)' },
      ];
      channels.forEach(ch => {
        const n = callIdx - ch.from + 1;
        const { a, b, sigma } = olsFit(closes, n);
        [-2, 0, 2].forEach(k => {
          const line = chart.addSeries(LineSeries, { ...quiet, color: ch.color, lineWidth: 1, lineStyle: k ? 0 : 2 });
          line.setData([ch.from, callIdx].map(j => ({ time: bars[j].time, value: a + b * (callIdx - j) + k * sigma })));
        });
      });
      chart.timeScale().fitContent();
      return { legend: channels };
    },
    [],
  );
  return (
    <>
      <div className="relative h-80"><div ref={ref} className="absolute inset-0" /></div>
      {st.legend && (
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-citi-muted">
          {st.legend.map(c => <span key={c.name} className="flex items-center gap-2"><span className="inline-block h-0.5 w-4" style={{ background: c.color }} />{c.name}</span>)}
        </div>
      )}
    </>
  );
}

const FIGURES = {
  'gold-channels': {
    render: () => <GoldChannels />,
    caption: 'Gold, monthly, with the three regression channels (±2σ) fitted to the January 2026 call. Gold futures (GC=F); Yahoo data starts in 2000, not 1998.',
  },
  'gold-since-memo': {
    render: () => <PriceSince symbol="GC=F" label="Gold since this memo" since="2026-02-01" />,
    caption: 'Gold futures (GC=F) from the date of this memo to today.',
  },
};

// Inline figure referenced from an article body as [[chart:<id>]].
export function ArticleFigure({ id }) {
  const f = FIGURES[id];
  if (!f) return null;
  return (
    <figure className="overflow-hidden !mt-10 !mb-10">
      {f.render()}
      <figcaption className="mt-3 text-sm text-citi-muted">{f.caption}</figcaption>
    </figure>
  );
}

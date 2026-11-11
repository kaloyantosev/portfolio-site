import React, { useEffect, useRef, useState } from 'react';
import { loadDaily } from '../../charts/data';

// Article-header price chart in the style of the homepage career roadmap: the line
// draws in when scrolled into view, the publication date is a milestone and today
// pulses in gold. Uses the career-* animation classes from index.css.
const W = 600, H = 230, TOP = 34, BOTTOM = 196;
const ts = d => Date.parse(`${d}T00:00:00Z`) / 1000;
const fmt = (v, cur) => `${cur}${v.toLocaleString('en-US', { maximumFractionDigits: v < 100 ? 1 : 0 })}`;

// Dutch TTF (EUR/MWh) traced from the TTF front-month chart, Nov 2025 – Nov 2026.
// The free feed has no TTF history, so these are approximate monthly-ish knots.
const TTF_KNOTS = [
  ['2025-11-11', 31], ['2025-12-10', 30], ['2026-01-05', 28], ['2026-01-20', 27.5], ['2026-02-01', 28],
  ['2026-02-15', 30], ['2026-03-01', 31.5], ['2026-03-10', 45], ['2026-03-20', 48], ['2026-04-01', 60],
  ['2026-04-12', 55], ['2026-04-22', 46], ['2026-05-03', 41], ['2026-05-18', 44], ['2026-06-01', 46],
  ['2026-06-15', 48], ['2026-07-01', 41], ['2026-07-15', 43], ['2026-08-01', 49], ['2026-08-15', 58],
  ['2026-09-01', 62], ['2026-09-12', 72], ['2026-09-25', 81], ['2026-10-05', 72], ['2026-10-15', 73],
  ['2026-10-25', 87], ['2026-11-02', 96], ['2026-11-05', 103], ['2026-11-08', 87], ['2026-11-11', 84.5],
];
function ttfSeries() {
  const out = [];
  for (let k = 0; k < TTF_KNOTS.length - 1; k++) {
    const [d0, v0] = TTF_KNOTS[k], [d1, v1] = TTF_KNOTS[k + 1];
    for (let t = ts(d0); t < ts(d1); t += 86400 * 2) {
      const f = (t - ts(d0)) / (ts(d1) - ts(d0));
      out.push({ time: t, value: v0 + (v1 - v0) * f + Math.sin(t / 97000) * 0.8 });
    }
  }
  out.push({ time: ts(TTF_KNOTS.at(-1)[0]), value: TTF_KNOTS.at(-1)[1] });
  return out;
}

function Chart({ points, since, currency, label, note }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return setSeen(true);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const t0 = points[0].time, t1 = points.at(-1).time;
  const vals = points.map(p => p.value);
  const lo = Math.min(...vals), hi = Math.max(...vals), pad = (hi - lo) * 0.08;
  const x = t => 8 + ((t - t0) / (t1 - t0)) * (W - 16);
  const y = v => BOTTOM - ((v - (lo - pad)) / (hi + pad - (lo - pad))) * (BOTTOM - TOP);
  const d = points.map((p, i) => `${i ? 'L' : 'M'}${x(p.time).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const pub = points.find(p => p.time >= ts(since)) || points[0];
  const now = points.at(-1);
  const change = (now.value / pub.value - 1) * 100;
  const pubX = x(pub.time), nowX = x(now.time);

  return (
    <figure ref={ref} className={`w-full ${seen ? 'career-seen' : 'career-waiting'}`}>
      <div className="section-label">{label}</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full h-auto overflow-visible" role="img" aria-label={`${label}: ${fmt(pub.value, currency)} at publication, ${fmt(now.value, currency)} now`}>
        <defs>
          <linearGradient id={`ps-fill-${label.length}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" x2={W} y1={BOTTOM} y2={BOTTOM} stroke="rgba(255,255,255,0.15)" />
        <path d={`${d} L${nowX},${BOTTOM} L${x(t0)},${BOTTOM} Z`} fill={`url(#ps-fill-${label.length})`} className="career-fade" />
        <path d={d} fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinejoin="round" pathLength="1" className="career-draw" />

        {/* Publication milestone */}
        <g className="career-fade">
          <line x1={pubX} x2={pubX} y1={y(pub.value) + 8} y2={BOTTOM} stroke="rgba(255,255,255,0.3)" strokeDasharray="3 5" />
          <circle cx={pubX} cy={y(pub.value)} r="5" fill="#06090f" stroke="#ffffff" strokeWidth="1.6" />
          <text x={pubX} y={y(pub.value) - 14} textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.75)">Published · {fmt(pub.value, currency)}</text>
          <text x={pubX} y={BOTTOM + 18} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.45)">
            {new Date(pub.time * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}
          </text>
        </g>

        {/* Today */}
        <g className="career-fade">
          <circle cx={nowX} cy={y(now.value)} r="13" fill="none" stroke="#c9a96e" strokeOpacity="0.6" className="career-pulse" />
          <circle cx={nowX} cy={y(now.value)} r="5" fill="#c9a96e" />
          <text x={nowX - 12} y={y(now.value) + (now.value > pub.value ? -16 : 24)} textAnchor="end" fontSize="12" fill="#c9a96e">
            Now · {fmt(now.value, currency)} · {change >= 0 ? '+' : ''}{change.toFixed(0)}%
          </text>
          <text x={nowX} y={BOTTOM + 18} textAnchor="end" fontSize="11" fill="rgba(255,255,255,0.45)">Today</text>
        </g>
      </svg>
      {note && <figcaption className="mt-1 text-xs text-citi-muted">{note}</figcaption>}
    </figure>
  );
}

// Live series (Yahoo) from shortly before publication to today.
function LiveStory({ symbol, since, ...rest }) {
  const [points, setPoints] = useState(null);
  useEffect(() => {
    loadDaily(symbol, '2y').then(bars => {
      const start = ts(since) - 40 * 86400;
      setPoints(bars.filter(b => b.time >= start).map(b => ({ time: b.time, value: b.close })));
    }).catch(() => setPoints([]));
  }, [symbol, since]);
  if (!points) return <div className="h-56" />;
  if (points.length < 2) return null;
  return <Chart points={points} since={since} {...rest} />;
}

export default function PriceStory({ symbol, since, currency, label }) {
  return symbol === 'TTF'
    ? <Chart points={ttfSeries()} since={since} currency={currency} label={label} note="Approximate, traced from the Dutch TTF front-month chart." />
    : <LiveStory symbol={symbol} since={since} currency={currency} label={label} />;
}

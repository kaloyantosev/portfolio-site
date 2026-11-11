import React, { useEffect, useRef, useState } from 'react';

// Career roadmap drawn as a rising price chart: each role is a milestone on an
// up-trending line, oldest on the left, current role at the peak.
const W = 1200;
const H = 340;
const FLOOR = 300; // y of the baseline

// Milestone points; x sits in the middle of each of the columns below the chart.
const anchorY = (i, n) => 250 - (i / Math.max(n - 1, 1)) * 190;

// Jagged "price" line through the anchors. Noise is deterministic and fades to
// zero at every milestone, so the dots sit exactly on the line.
function buildLine(anchors) {
  const pts = [[0, 285], ...anchors, [W, anchors[anchors.length - 1][1] - 30]];
  const out = [];
  for (let s = 0; s < pts.length - 1; s++) {
    const [x0, y0] = pts[s];
    const [x1, y1] = pts[s + 1];
    const steps = Math.round((x1 - x0) / 14);
    for (let k = 0; k <= steps; k++) {
      const t = k / steps;
      const x = x0 + (x1 - x0) * t;
      const fade = Math.sin(Math.PI * t); // 0 at both anchors
      const noise = (Math.sin(x * 0.11) * 9 + Math.sin(x * 0.037 + 1.3) * 14) * fade;
      out.push([x, y0 + (y1 - y0) * t + noise]);
    }
  }
  return out;
}

export default function CareerChart({ items }) {
  // Start the draw-in only once the chart scrolls into view.
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return setSeen(true);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Data is newest first; the chart reads left to right in time.
  const roles = [...items].reverse();
  const n = roles.length;
  const anchors = roles.map((_, i) => [((i + 0.5) / n) * W, anchorY(i, n)]);
  const line = buildLine(anchors);
  const d = line.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const area = `${d} L${W},${FLOOR} L0,${FLOOR} Z`;

  return (
    <div ref={ref} className={seen ? 'career-seen' : 'career-waiting'}>
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible" role="img" aria-label="Career progression chart, rising from the first role to the current one">
          <defs>
            <linearGradient id="career-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Faint horizontal grid */}
          {[80, 150, 220].map(y => (
            <line key={y} x1="0" x2={W} y1={y} y2={y} stroke="rgba(255,255,255,0.05)" />
          ))}
          <line x1="0" x2={W} y1={FLOOR} y2={FLOOR} stroke="rgba(255,255,255,0.15)" />

          <path d={area} fill="url(#career-fill)" className="career-fade" />
          <path d={d} fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinejoin="round" pathLength="1" className="career-draw" />

          {anchors.map(([x, y], i) => {
            const current = i === n - 1;
            return (
              <g key={i} className="career-fade">
                <line x1={x} x2={x} y1={y + 8} y2={FLOOR} stroke="rgba(255,255,255,0.25)" strokeDasharray="3 5" />
                {current && <circle cx={x} cy={y} r="14" fill="none" stroke="#c9a96e" strokeOpacity="0.6" className="career-pulse" />}
                <circle cx={x} cy={y} r="6" fill={current ? '#c9a96e' : '#06090f'} stroke={current ? '#c9a96e' : '#ffffff'} strokeWidth="1.6" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Role details, one column under each milestone */}
      <ol className="grid gap-10 md:gap-8 mt-2" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(14rem, 1fr))` }}>
        {roles.map((e, i) => (
          <li key={e.role + e.period} className="md:text-center md:px-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-citi-muted">
              <span className="font-serif text-base normal-case tracking-normal text-white/50 mr-2">{String(i + 1).padStart(2, '0')}</span>
              {e.period}
            </div>
            <h3 className="mt-3 font-serif text-2xl leading-tight text-white">{e.role}</h3>
            <p className="mt-1 text-sm text-citi-lightaccent">{e.org}</p>
            <p className="mt-3 text-sm text-citi-muted leading-relaxed">{e.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

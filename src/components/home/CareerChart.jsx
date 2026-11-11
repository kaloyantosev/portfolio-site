import React, { useEffect, useRef, useState } from 'react';

// Career roadmap drawn as a rising price chart: each role is a milestone on an
// up-trending line, oldest on the left, current role solid, then a dashed
// "forecast" with a widening band out to the next goal.
const W = 1200;
const H = 340;
const FLOOR = 300; // y of the baseline

// Milestone height: rises from 250 (first column) to 60 (last column).
const anchorY = (i, cols) => 250 - (i / Math.max(cols - 1, 1)) * 190;

// Jagged "price" line through the points. Noise is deterministic and fades to
// zero at every point, so the dots sit exactly on the line.
function jagged(pts) {
  const out = [];
  for (let s = 0; s < pts.length - 1; s++) {
    const [x0, y0] = pts[s];
    const [x1, y1] = pts[s + 1];
    const steps = Math.max(1, Math.round((x1 - x0) / 14));
    for (let k = s ? 1 : 0; k <= steps; k++) {
      const t = k / steps;
      const x = x0 + (x1 - x0) * t;
      const fade = Math.sin(Math.PI * t);
      const noise = (Math.sin(x * 0.11) * 9 + Math.sin(x * 0.037 + 1.3) * 14) * fade;
      out.push([x, y0 + (y1 - y0) * t + noise]);
    }
  }
  return out;
}

const toPath = pts => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

export default function CareerChart({ items, next }) {
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
  const cols = n + (next ? 1 : 0);
  const at = i => [((i + 0.5) / cols) * W, anchorY(i, cols)];
  const anchors = roles.map((_, i) => at(i));
  const [cx, cy] = anchors[n - 1]; // current role

  // Solid history: from the left edge up to the current role.
  const history = jagged([[0, 285], ...anchors]);
  const d = toPath(history);
  const area = `${d} L${cx},${FLOOR} L0,${FLOOR} Z`;

  // Forecast: dashed centre line plus a band that widens with uncertainty.
  let forecast = null;
  if (next) {
    const [nx, ny] = at(n);
    const ex = W, ey = ny - 30;
    forecast = {
      nx, ny,
      line: `M${cx},${cy} C${(cx + nx) / 2},${cy} ${(cx + nx) / 2},${ny} ${nx},${ny} L${ex},${ey}`,
      band: `M${cx},${cy} L${nx},${ny - 34} L${ex},${ey - 60} L${ex},${ey + 70} L${nx},${ny + 40} Z`,
    };
  }

  return (
    <div ref={ref} className={seen ? 'career-seen' : 'career-waiting'}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible" role="img" aria-label="Career progression chart, rising from the first role to the current one and projecting to the next goal">
        <defs>
          <linearGradient id="career-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="career-band" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Faint horizontal grid and baseline */}
        {[80, 150, 220].map(y => (
          <line key={y} x1="0" x2={W} y1={y} y2={y} stroke="rgba(255,255,255,0.05)" />
        ))}
        <line x1="0" x2={W} y1={FLOOR} y2={FLOOR} stroke="rgba(255,255,255,0.15)" />

        {/* "Today" divider between history and forecast */}
        {forecast && (
          <g className="career-fade">
            <line x1={cx} x2={cx} y1="20" y2={FLOOR} stroke="rgba(255,255,255,0.12)" />
            <text x={cx + 10} y="34" fill="rgba(255,255,255,0.45)" fontSize="12" letterSpacing="2.5">TODAY</text>
          </g>
        )}

        <path d={area} fill="url(#career-fill)" className="career-fade" />
        <path d={d} fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinejoin="round" pathLength="1" className="career-draw" />

        {forecast && (
          <g className="career-forecast">
            <path d={forecast.band} fill="url(#career-band)" />
            <path d={forecast.line} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeDasharray="5 7" />
            <line x1={forecast.nx} x2={forecast.nx} y1={forecast.ny + 8} y2={FLOOR} stroke="rgba(255,255,255,0.18)" strokeDasharray="3 5" />
            <circle cx={forecast.nx} cy={forecast.ny} r="6" fill="#06090f" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeDasharray="2 3" />
          </g>
        )}

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

      {/* Details, one column under each milestone */}
      <ol className="grid gap-10 md:gap-8 mt-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 1fr))' }}>
        {roles.map((e, i) => (
          <li key={e.role + e.period} className="md:text-center md:px-3">
            <div className="text-[11px] uppercase tracking-[0.18em] text-citi-muted">
              <span className="font-serif text-base normal-case tracking-normal text-white/50 mr-2">{String(i + 1).padStart(2, '0')}</span>
              {e.period}
            </div>
            <h3 className="mt-3 font-serif text-2xl leading-tight text-white">{e.role}</h3>
            <p className="mt-1 text-base text-citi-lightaccent">{e.org}</p>
            <p className="mt-3 text-base text-slate-300 leading-relaxed">{e.text}</p>
          </li>
        ))}
        {next && (
          <li className="md:text-center md:px-3 career-forecast">
            <div className="text-[11px] uppercase tracking-[0.18em] text-citi-muted">
              <span className="font-serif text-base normal-case tracking-normal text-white/50 mr-2">{String(n + 1).padStart(2, '0')}</span>
              {next.period || 'Next'}
            </div>
            <h3 className="mt-3 font-serif italic text-2xl leading-tight text-white/80">{next.role}</h3>
            {next.org && <p className="mt-1 text-base text-citi-lightaccent/80">{next.org}</p>}
            <p className="mt-3 text-base text-slate-400 leading-relaxed">{next.text}</p>
          </li>
        )}
      </ol>
    </div>
  );
}

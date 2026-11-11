import React from 'react';

// Small line illustrations above each Models category. They stand still and only
// animate while the category section is hovered (see .cat-section in index.css).
const S = { fill: 'none', stroke: 'rgba(255,255,255,0.7)', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
const BLUE = '#4C8DD9';
const GOLD = '#C9A96E';

function Gear({ cx, cy, r, teeth, className }) {
  return (
    <g className={className} style={{ transformOrigin: `${cx}px ${cy}px` }}>
      <circle cx={cx} cy={cy} r={r} {...S} />
      <circle cx={cx} cy={cy} r={r * 0.35} {...S} />
      {Array.from({ length: teeth }, (_, i) => {
        const a = (i / teeth) * Math.PI * 2;
        return <line key={i} x1={cx + Math.cos(a) * r} y1={cy + Math.sin(a) * r} x2={cx + Math.cos(a) * (r + 4)} y2={cy + Math.sin(a) * (r + 4)} {...S} strokeWidth={3} />;
      })}
    </g>
  );
}

const ART = {
  // Rotating globe and positioning bars that rise and fall.
  'Macro & Positioning': (
    <>
      <circle cx="28" cy="30" r="18" {...S} />
      <ellipse className="anim cat-spin" cx="28" cy="30" rx="8" ry="18" {...S} style={{ transformOrigin: '28px 30px' }} />
      <line x1="10" y1="30" x2="46" y2="30" {...S} />
      {[70, 86, 102, 118].map((x, i) => (
        <rect key={x} className={`anim cat-bar cat-bar-${i}`} x={x} y="14" width="9" height="34" fill="none" stroke={i % 2 ? GOLD : BLUE} strokeWidth="1.4" style={{ transformOrigin: `${x}px 48px` }} />
      ))}
      <line x1="64" y1="48" x2="134" y2="48" {...S} />
    </>
  ),
  // Tanker riding the waves, oil flowing through a pipeline, wheat swaying.
  'Commodities & Energy': (
    <>
      <g className="anim cat-bob">
        <path d="M8 36 L46 36 L42 44 L12 44 Z" {...S} />
        <rect x="32" y="27" width="9" height="9" {...S} />
        <line x1="14" y1="36" x2="14" y2="31" {...S} />
      </g>
      <path className="anim cat-wave" d="M0 48 q6 -4 12 0 t12 0 t12 0 t12 0 t12 0" fill="none" stroke={BLUE} strokeWidth="1.4" />
      <path d="M62 24 H104 V46" {...S} strokeWidth="5" stroke="rgba(255,255,255,0.18)" />
      <path className="anim cat-flow" d="M62 24 H104 V46" fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="4 6" />
      {[122, 134, 146].map((x, i) => (
        <g key={x} className={`anim cat-sway cat-sway-${i}`} style={{ transformOrigin: `${x}px 50px` }}>
          <line x1={x} y1="50" x2={x} y2="18" {...S} />
          {[20, 26, 32].map(y => (
            <g key={y}>
              <path d={`M${x} ${y + 4} q-5 -2 -5 -7`} fill="none" stroke={GOLD} strokeWidth="1.4" />
              <path d={`M${x} ${y + 4} q5 -2 5 -7`} fill="none" stroke={GOLD} strokeWidth="1.4" />
            </g>
          ))}
        </g>
      ))}
    </>
  ),
  // Option payoff "hockey stick" drawing itself, with a price dot running along it.
  'Derivatives & Options': (
    <>
      <line x1="8" y1="44" x2="150" y2="44" {...S} stroke="rgba(255,255,255,0.3)" />
      <path className="anim cat-draw" d="M10 40 H80 L140 8" fill="none" stroke={BLUE} strokeWidth="2" pathLength="1" />
      <path d="M10 46 H150" fill="none" stroke="rgba(255,255,255,0.15)" />
      <circle className="anim cat-run" r="3" fill={GOLD} style={{ offsetPath: "path('M10 40 H80 L140 8')" }} />
    </>
  ),
  // Candles that rise and fall, with an order flow line (Strategies page).
  'Trading Algos': (
    <>
      {[[14, 26, 14, BLUE], [30, 20, 18, GOLD], [46, 14, 22, BLUE], [62, 22, 14, GOLD], [78, 10, 24, BLUE]].map(([x, y, h, c], i) => (
        <g key={x} className={`anim cat-bar cat-bar-${i % 4}`} style={{ transformOrigin: `${x + 4}px 48px` }}>
          <line x1={x + 4} y1={y - 5} x2={x + 4} y2={y + h + 5} {...S} />
          <rect x={x} y={y} width="8" height={h} fill="none" stroke={c} strokeWidth="1.4" />
        </g>
      ))}
      <path className="anim cat-flow" d="M100 30 H150" fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="4 6" />
    </>
  ),
  // Two meshing gears (Strategies page).
  'Investment Algos': (
    <>
      <Gear cx={40} cy={30} r={14} teeth={10} className="anim cat-gear" />
      <Gear cx={72} cy={30} r={10} teeth={8} className="anim cat-gear-rev" />
      <path className="anim cat-flow" d="M96 30 H150" fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="4 6" />
    </>
  ),
};

export default function CategoryArt({ group }) {
  const art = ART[group];
  if (!art) return null;
  return (
    <svg viewBox="0 0 160 56" className="cat-art h-14 w-40 overflow-visible" aria-hidden="true">
      {art}
    </svg>
  );
}

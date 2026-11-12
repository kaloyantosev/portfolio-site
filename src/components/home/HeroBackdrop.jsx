import React from 'react';

// Quiet hero background: a fine grid and one thin rising price line with a soft
// fill, in the same style as the career chart further down the page. Deterministic.
const W = 1100, H = 620, N = 140;
const rnd = i => { const v = Math.sin(i * 12.9898) * 43758.5453; return v - Math.floor(v); };
let y = 470;
const pts = Array.from({ length: N }, (_, i) => {
  y += -2.1 + (rnd(i) - 0.5) * 18 + Math.sin(i / 9) * 1.5;
  return [(i / (N - 1)) * W, Math.max(60, Math.min(560, y))];
});
const line = pts.map(([x, v], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${v.toFixed(1)}`).join(' ');

export default function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 hidden w-[70%] lg:block"
      style={{
        WebkitMaskImage: 'radial-gradient(ellipse at 60% 45%, black 30%, transparent 75%)',
        maskImage: 'radial-gradient(ellipse at 60% 45%, black 30%, transparent 75%)',
      }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <defs>
          <linearGradient id="hero-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 7 }, (_, i) => 80 + i * 80).map(gy => (
          <line key={gy} x1="0" x2={W} y1={gy} y2={gy} stroke="rgba(255,255,255,0.04)" />
        ))}
        <path d={`${line} L${W},${H} L0,${H} Z`} fill="url(#hero-fill)" />
        <path d={line} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

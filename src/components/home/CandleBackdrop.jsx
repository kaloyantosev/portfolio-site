import React from 'react';

// Faint candlestick chart tilted in 3D perspective, behind the hero photo.
// Deterministic data so it looks the same on every load.
const N = 44, W = 1100, H = 560;
const closes = Array.from({ length: N }, (_, i) => 360 - i * 5.2 + Math.sin(i * 0.9) * 26 + Math.sin(i * 0.31) * 38);
const bars = closes.map((c, i) => {
  const o = i ? closes[i - 1] : c + 12;
  const w = 8 + Math.abs(Math.sin(i * 1.7)) * 14;
  return { o, c, h: Math.min(o, c) - w, l: Math.max(o, c) + w }; // SVG y grows down
});
const step = W / N;

export default function CandleBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-6%] top-[2%] hidden w-[62%] lg:block"
      style={{
        perspective: '1400px',
        WebkitMaskImage: 'radial-gradient(ellipse at 60% 50%, black 30%, transparent 75%)',
        maskImage: 'radial-gradient(ellipse at 60% 50%, black 30%, transparent 75%)',
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        style={{ transform: 'rotateY(-32deg) rotateX(14deg) rotateZ(-2deg)', transformOrigin: '40% 60%' }}
      >
        {/* Grid */}
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`h${i}`} x1="0" x2={W} y1={40 + i * 66} y2={40 + i * 66} stroke="rgba(255,255,255,0.05)" />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`v${i}`} y1="0" y2={H} x1={i * (W / 11)} x2={i * (W / 11)} stroke="rgba(255,255,255,0.035)" />
        ))}
        {/* Candles */}
        {bars.map((b, i) => {
          const x = step * (i + 0.5);
          const up = b.c < b.o;
          const col = up ? 'rgba(232,230,225,0.22)' : 'rgba(107,114,128,0.28)';
          return (
            <g key={i}>
              <line x1={x} x2={x} y1={b.h} y2={b.l} stroke={col} strokeWidth="1.5" />
              <rect x={x - step * 0.3} y={Math.min(b.o, b.c)} width={step * 0.6} height={Math.max(2, Math.abs(b.o - b.c))} fill={col} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

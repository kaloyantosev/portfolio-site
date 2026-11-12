import React from 'react';

// Faint 3D candlestick chart behind the hero photo: each candle is a solid box,
// projected with real perspective, so candles shrink into the distance and grow as
// they come towards the viewer. Deterministic data, drawn once as static SVG.
const W = 1100, H = 640;
const CX = W * 0.42, CY = H * 0.38, F = 620;   // screen centre and focal length
const CAM_Y = 260;                              // camera height, above the candles so tops show
const FLOOR = -120;
const N = 34;

const project = (x, y, z) => [CX + (x * F) / z, CY - ((y - CAM_Y) * F) / z];
const pts = list => list.map(p => project(...p).map(v => v.toFixed(1)).join(',')).join(' ');

// Rising price path in world units.
const closes = Array.from({ length: N }, (_, i) => -60 + i * 8.5 + Math.sin(i * 0.9) * 26 + Math.sin(i * 0.37) * 22);
const candles = closes.map((c, i) => {
  const o = i ? closes[i - 1] : c - 10;
  const t = i / (N - 1);
  return {
    o, c,
    hi: Math.max(o, c) + 8 + Math.abs(Math.sin(i * 1.7)) * 18,
    lo: Math.min(o, c) - 8 - Math.abs(Math.cos(i * 1.3)) * 18,
    x: -520 + t * 760,   // left to right
    z: 1300 - t * 1000,  // far (small) to near (big); spacing keeps candles close together
  };
});

function Candle({ x, z, o, c, hi, lo }) {
  const up = c >= o;
  const s = 15, d = 15; // half width, half depth
  const bot = Math.min(o, c), top = Math.max(o, c) + 0.5;
  const [x0, x1, z0, z1] = [x - s, x + s, z - d, z + d];
  const base = up ? [232, 230, 225] : [120, 128, 140];
  const shade = k => `rgba(${base.map(v => Math.round(v * k)).join(',')},${up ? 0.42 : 0.45})`;
  const sideX = x < 0 ? x1 : x0; // the side facing the camera
  return (
    <g>
      <line {...Object.fromEntries([['x1', project(x, lo, z)[0]], ['y1', project(x, lo, z)[1]], ['x2', project(x, hi, z)[0]], ['y2', project(x, hi, z)[1]]])} stroke={shade(0.9)} strokeWidth={Math.max(0.6, 900 / z)} />
      <polygon points={pts([[sideX, bot, z0], [sideX, bot, z1], [sideX, top, z1], [sideX, top, z0]])} fill={shade(0.55)} />
      <polygon points={pts([[x0, top, z0], [x1, top, z0], [x1, top, z1], [x0, top, z1]])} fill={shade(1.05)} />
      <polygon points={pts([[x0, bot, z0], [x1, bot, z0], [x1, top, z0], [x0, top, z0]])} fill={shade(0.8)} />
    </g>
  );
}

export default function CandleBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-4%] top-0 hidden w-[64%] lg:block"
      style={{
        WebkitMaskImage: 'radial-gradient(ellipse at 55% 50%, black 50%, transparent 85%)',
        maskImage: 'radial-gradient(ellipse at 55% 50%, black 50%, transparent 85%)',
      }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* Floor grid receding to the horizon */}
        {Array.from({ length: 9 }, (_, i) => 320 + i * 160).map(z => {
          const [a, b] = [project(-900, FLOOR, z), project(700, FLOOR, z)];
          return <line key={`z${z}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="rgba(255,255,255,0.05)" />;
        })}
        {Array.from({ length: 11 }, (_, i) => -900 + i * 160).map(x => {
          const [a, b] = [project(x, FLOOR, 320), project(x, FLOOR, 1600)];
          return <line key={`x${x}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="rgba(255,255,255,0.04)" />;
        })}
        {/* Far candles first so nearer ones overlap them */}
        {candles.map((c, i) => <Candle key={i} {...c} />)}
      </svg>
    </div>
  );
}

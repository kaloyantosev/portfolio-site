import React from 'react';

// Quiet hero background: a faint correlation matrix (cells shaded by |ρ|, symmetric,
// strongest on the diagonal). Quantitative, but not a price chart. Deterministic.
const N = 16, CELL = 34, GAP = 6, SIZE = N * (CELL + GAP);
const rnd = (i, j) => { const v = Math.sin((i * 97 + j * 31) * 12.9898) * 43758.5453; return v - Math.floor(v); };
// Correlation that decays with distance from the diagonal, plus noise; symmetric in i, j.
const rho = (i, j) => (i === j ? 1 : Math.min(0.95, Math.exp(-Math.abs(i - j) / 3.5) * 0.85 + rnd(Math.min(i, j), Math.max(i, j)) * 0.25));

export default function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[8%] -top-[4%] hidden w-[34%] lg:block"
      style={{
        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 25%, transparent 70%)',
        maskImage: 'radial-gradient(circle at 50% 50%, black 25%, transparent 70%)',
      }}
    >
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-auto">
        {Array.from({ length: N }, (_, i) =>
          Array.from({ length: N }, (_, j) => (
            <rect
              key={`${i}-${j}`}
              x={j * (CELL + GAP)}
              y={i * (CELL + GAP)}
              width={CELL}
              height={CELL}
              rx="4"
              fill="#7FA8E0"
              fillOpacity={(0.01 + rho(i, j) * 0.07).toFixed(3)}
            />
          )),
        )}
      </svg>
    </div>
  );
}

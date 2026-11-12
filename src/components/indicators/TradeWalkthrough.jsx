import React, { useEffect, useRef, useState } from 'react';

// Animated, illustrative trade for each indicator: price builds candle by candle,
// the indicator fires, a position is opened with stop and target, and the trade
// plays out. Scripted example data, not a backtest.

const N = 60; // candles per scenario
const UP = '#E8E6E1', DOWN = '#6B7280', GREEN = '#2E9E6B', RED = '#C2453D', GOLD = '#C9A96E', BLUE = '#4C8DD9';

// Piecewise-linear path through [index, value] knots, plus a small deterministic wobble.
const path = (knots, wobble = 0) => Array.from({ length: N }, (_, i) => {
  let k = 0;
  while (k < knots.length - 2 && knots[k + 1][0] < i) k++;
  const [x0, y0] = knots[k], [x1, y1] = knots[k + 1];
  const t = x1 === x0 ? 0 : Math.min(1, Math.max(0, (i - x0) / (x1 - x0)));
  return y0 + (y1 - y0) * t + wobble * (Math.sin(i * 1.3) * 0.6 + Math.sin(i * 2.9) * 0.4);
});

function candles(closes) {
  return closes.map((c, i) => {
    const o = i ? closes[i - 1] : c + 0.4;
    const w = 0.35 + 0.35 * Math.abs(Math.sin(i * 1.7));
    return { o, c, h: Math.max(o, c) + w, l: Math.min(o, c) - w };
  });
}

const SCENARIOS = {
  drc: {
    price: path([[0, 100], [8, 97], [16, 93], [24, 88], [30, 82.5], [31, 82], [33, 84.5], [38, 88], [44, 92], [50, 95.5], [53, 96.5], [59, 98]], 0.7),
    zone: { lo: 80.5, hi: 84, label: 'Support confluence ×3' },
    lines: [
      { from: [0, 70], to: [59, 95], color: BLUE, label: 'Trend 210 lower band' },
      { from: [0, 104], to: [59, 60], color: GOLD, label: 'Swing 60 lower band' },
    ],
    signalAt: 32, entryAt: 33, sl: 79, tp: 96, tpLabel: 'Target · Core midline',
    signalLabel: 'Reaction candle in zone',
    steps: [
      'Price falls into a zone where two channels’ lower bands meet.',
      'A reaction candle closes inside the confluence zone.',
      'Go long on the next candle; stop just below the zone.',
      'Target the midline of the longer channel.',
    ],
  },
  imsi: {
    price: path([[0, 100], [10, 94], [18, 86], [24, 76], [28, 72], [31, 77], [34, 70.5], [36, 74], [42, 79], [48, 84], [52, 87], [59, 88]], 0.6),
    pane: {
      range: [0, 100],
      levels: [{ v: 10, color: GOLD, label: 'Stress 10%' }, { v: 50, color: 'rgba(255,255,255,0.25)' }],
      lines: [
        { values: path([[0, 52], [18, 30], [28, 12], [34, 15], [48, 40], [59, 46]]), color: BLUE, area: true },
        { values: path([[0, 55], [10, 40], [18, 22], [24, 6], [28, 3], [31, 14], [34, 9], [36, 20], [42, 38], [48, 55], [59, 62]]), color: UP, width: 2, shadeBelow: 10 },
      ],
    },
    signalAt: 34, entryAt: 35, sl: 68, tp: 86, tpLabel: 'Target · middle of yearly range',
    signalLabel: 'Accumulation trigger',
    steps: [
      'Price slides to its yearly low; the range percentile drops below 10% (red).',
      'Price makes a lower low, but the percentile makes a higher low.',
      'Enter long on the divergence; stop under the new low.',
      'Target the middle of the yearly range.',
    ],
  },
  tmeo: {
    price: path([[0, 70], [6, 71.5], [12, 69.5], [18, 71], [22, 72], [26, 76], [32, 82], [38, 88], [44, 93], [48, 94], [52, 92.5], [59, 93]], 0.5),
    pane: {
      range: [-100, 100],
      levels: [{ v: 40, color: GREEN, label: '+40' }, { v: 0, color: 'rgba(255,255,255,0.25)' }, { v: -40, color: RED, label: '−40' }],
      lines: [{ values: path([[0, 5], [6, -12], [12, 10], [18, -5], [22, 20], [26, 44], [30, 62], [36, 72], [42, 66], [46, 48], [50, 30], [59, 18]]), width: 2.5, tmeo: true }],
    },
    signalAt: 26, entryAt: 27, sl: 68,
    exitWhen: (i, s) => { const v = s.pane.lines[0].values; return v[i] >= 40 && v[i] < v[i - 1]; },
    tpLabel: 'Exit · trend matures',
    signalLabel: 'Fresh uptrend',
    steps: [
      'Choppy price keeps the oscillator grey, between −40 and +40.',
      'Efficiency breaks above +40 and keeps rising: a fresh uptrend (green).',
      'Enter long; stop under the range.',
      'Exit when the line turns yellow: the trend is maturing.',
    ],
  },
  stochAtrDmi: {
    price: path([[0, 80], [10, 86], [18, 92], [24, 88], [28, 86], [30, 88.5], [34, 92], [40, 96], [46, 100], [52, 101], [59, 103]], 0.6),
    pane: {
      range: [0, 100],
      levels: [{ v: 70, color: 'rgba(255,255,255,0.35)', label: '70' }, { v: 30, color: 'rgba(255,255,255,0.35)', label: '30' }],
      lines: [
        { values: path([[0, 26], [18, 30], [24, 22], [30, 27], [59, 30]]), color: GREEN, width: 1 },
        { values: path([[0, 14], [18, 12], [24, 18], [30, 14], [59, 13]]), color: RED, width: 1 },
        { values: path([[0, 60], [10, 78], [18, 85], [24, 35], [28, 40], [30, 74], [34, 85], [40, 80], [46, 88], [59, 75]]), color: BLUE, width: 2 },
      ],
    },
    signalAt: 30, entryAt: 31, sl: 86, tp: 94, tpLabel: 'Target · entry + 2 × ATR',
    signalLabel: '%K crosses 70, +DI > −DI',
    steps: [
      'Uptrend: +DI above −DI and the 20 EMA above the 50 EMA.',
      'After a pullback, %K closes back above 70.',
      'Enter long; stop one ATR below entry.',
      'Take profit at two ATRs above entry.',
    ],
  },
};

// Resolve candles, entry price and exit index once per scenario.
for (const s of Object.values(SCENARIOS)) {
  s.bars = candles(s.price);
  s.entry = s.bars[s.entryAt].c;
  s.exitAt = s.bars.findIndex((b, i) => i > s.entryAt && (s.exitWhen ? s.exitWhen(i, s) : b.h >= s.tp));
  if (s.exitAt < 0) s.exitAt = N - 1;
  s.exitPrice = s.exitWhen ? s.bars[s.exitAt].c : s.tp;
}

const W = 900, PRICE_H = 270, PANE_TOP = 290, PANE_H = 110, PAD_L = 16, PAD_R = 150;
const xAt = i => PAD_L + (i + 0.5) * ((W - PAD_L - PAD_R) / N);
const STEP_PAUSE = 26; // ticks to hold the finished trade before restarting

const tmeoColor = (v, prev) => (v >= 40 ? (v >= prev ? '#00ff88' : '#ffcc00') : v <= -40 ? (v <= prev ? '#ff0055' : '#ff6600') : '#808080');

export default function TradeWalkthrough({ study }) {
  const s = SCENARIOS[study];
  const ref = useRef(null);
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setT(N); return; }
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setT(v => (v >= N + STEP_PAUSE ? 0 : v + 1)), 110);
    return () => clearInterval(id);
  }, [running]);

  if (!s) return null;
  const shown = Math.min(t, N);

  // Price scale covers candles, stop, target and zone.
  const vals = s.bars.flatMap(b => [b.h, b.l]).concat([s.sl, s.tp, s.zone?.lo, s.zone?.hi].filter(v => v != null));
  const lo = Math.min(...vals) - 1, hi = Math.max(...vals) + 1;
  const yP = v => 12 + (1 - (v - lo) / (hi - lo)) * (PRICE_H - 24);
  const yO = v => PANE_TOP + (1 - (v - s.pane.range[0]) / (s.pane.range[1] - s.pane.range[0])) * PANE_H;
  const height = s.pane ? PANE_TOP + PANE_H + 12 : PRICE_H + 12;
  const cw = ((W - PAD_L - PAD_R) / N) * 0.6;
  const stage = t >= s.exitAt ? 3 : t >= s.entryAt ? 2 : t >= s.signalAt ? 1 : 0;
  const pnl = ((s.exitPrice / s.entry - 1) * 100).toFixed(1);

  const tag = (x, y, text, color) => (
    <g>
      <rect x={x} y={y - 9} width={text.length * 6.2 + 12} height={18} rx="9" fill="#06090f" stroke={color} strokeWidth="1" />
      <text x={x + 6} y={y + 4} fontSize="11" fill={color}>{text}</text>
    </g>
  );

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
      {/* On phones the example keeps a readable size and scrolls sideways inside this box. */}
      <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${height}`} className="w-full min-w-[640px] h-auto" role="img" aria-label="Animated example trade using this indicator" style={{ fontFamily: 'Manrope, sans-serif' }}>
        {/* Overlay: confluence zone and channel bands */}
        {s.zone && (
          <g>
            <rect x={PAD_L} y={yP(s.zone.hi)} width={W - PAD_L - PAD_R} height={yP(s.zone.lo) - yP(s.zone.hi)} fill="rgba(46,158,107,0.12)" stroke="rgba(46,158,107,0.5)" strokeDasharray="4 4" />
            <text x={PAD_L + 6} y={yP(s.zone.lo) - 6} fontSize="11" fill={GREEN}>{s.zone.label}</text>
          </g>
        )}
        {s.lines?.map(l => (
          <line key={l.label} x1={xAt(l.from[0])} y1={yP(l.from[1])} x2={xAt(l.to[0])} y2={yP(l.to[1])} stroke={l.color} strokeOpacity="0.6" strokeWidth="1.2" />
        ))}

        {/* Candles revealed one by one */}
        {s.bars.slice(0, shown).map((b, i) => {
          const c = b.c >= b.o ? UP : DOWN;
          return (
            <g key={i}>
              <line x1={xAt(i)} x2={xAt(i)} y1={yP(b.h)} y2={yP(b.l)} stroke={c} />
              <rect x={xAt(i) - cw / 2} y={yP(Math.max(b.o, b.c))} width={cw} height={Math.max(1, Math.abs(yP(b.o) - yP(b.c)))} fill={c} />
            </g>
          );
        })}

        {/* Signal */}
        {t >= s.signalAt && (
          <g>
            <path d={`M${xAt(s.signalAt)} ${yP(s.bars[s.signalAt].l) + 8} l-6 10 h12 z`} fill={GREEN} />
            {tag(xAt(s.signalAt) - 40, yP(s.bars[s.signalAt].l) + 32, s.signalLabel, GREEN)}
          </g>
        )}

        {/* Position: entry, stop, target */}
        {t >= s.entryAt && (
          <g>
            <rect x={xAt(s.entryAt)} y={yP(s.exitPrice)} width={W - PAD_R - xAt(s.entryAt)} height={yP(s.entry) - yP(s.exitPrice)} fill="rgba(46,158,107,0.08)" />
            <rect x={xAt(s.entryAt)} y={yP(s.entry)} width={W - PAD_R - xAt(s.entryAt)} height={yP(s.sl) - yP(s.entry)} fill="rgba(194,69,61,0.08)" />
            <line x1={xAt(s.entryAt)} x2={W - PAD_R} y1={yP(s.entry)} y2={yP(s.entry)} stroke={UP} strokeDasharray="5 4" />
            <line x1={xAt(s.entryAt)} x2={W - PAD_R} y1={yP(s.sl)} y2={yP(s.sl)} stroke={RED} strokeDasharray="5 4" />
            {s.tp != null && <line x1={xAt(s.entryAt)} x2={W - PAD_R} y1={yP(s.tp)} y2={yP(s.tp)} stroke={GREEN} strokeDasharray="5 4" />}
            <text x={W - PAD_R + 8} y={yP(s.entry) + 4} fontSize="11" fill={UP}>Entry {s.entry.toFixed(1)}</text>
            <text x={W - PAD_R + 8} y={yP(s.sl) + 4} fontSize="11" fill={RED}>Stop {s.sl.toFixed(1)}</text>
            <text x={W - PAD_R + 8} y={yP(s.exitPrice) + 4} fontSize="11" fill={GREEN}>{s.tpLabel.split(' · ')[0]} {s.exitPrice.toFixed(1)}</text>
          </g>
        )}

        {/* Exit */}
        {t >= s.exitAt && (
          <g>
            <circle cx={xAt(s.exitAt)} cy={yP(s.exitPrice)} r="6" fill="none" stroke={GREEN} strokeWidth="2" />
            {tag(xAt(s.exitAt) - 150, yP(s.exitPrice) - 18, `${s.tpLabel} · +${pnl}%`, GREEN)}
          </g>
        )}

        {/* Indicator pane */}
        {s.pane && (
          <g>
            <line x1={PAD_L} x2={W - PAD_R} y1={PANE_TOP - 8} y2={PANE_TOP - 8} stroke="rgba(255,255,255,0.08)" />
            {s.pane.levels.map(l => (
              <g key={l.v}>
                <line x1={PAD_L} x2={W - PAD_R} y1={yO(l.v)} y2={yO(l.v)} stroke={l.color} strokeDasharray="3 5" strokeOpacity="0.7" />
                {l.label && <text x={W - PAD_R + 8} y={yO(l.v) + 4} fontSize="10" fill={l.color}>{l.label}</text>}
              </g>
            ))}
            {s.pane.lines.map((l, li) => {
              const v = l.values.slice(0, shown);
              if (v.length < 2) return null;
              const d = v.map((y, i) => `${i ? 'L' : 'M'}${xAt(i)} ${yO(y)}`).join(' ');
              return (
                <g key={li}>
                  {l.shadeBelow != null && v.map((y, i) => y <= l.shadeBelow && (
                    <rect key={i} x={xAt(i) - cw} y={PANE_TOP} width={cw * 2} height={PANE_H} fill="rgba(194,69,61,0.18)" />
                  ))}
                  {l.area && <path d={`${d} L${xAt(v.length - 1)} ${yO(s.pane.range[0])} L${xAt(0)} ${yO(s.pane.range[0])} Z`} fill="rgba(76,141,217,0.15)" />}
                  {l.tmeo
                    ? v.slice(1).map((y, i) => <line key={i} x1={xAt(i)} y1={yO(v[i])} x2={xAt(i + 1)} y2={yO(y)} stroke={tmeoColor(y, v[i])} strokeWidth={l.width} />)
                    : <path d={d} fill="none" stroke={l.color} strokeWidth={l.width || 1.5} />}
                </g>
              );
            })}
            {t >= s.signalAt && <circle cx={xAt(s.signalAt)} cy={yO(s.pane.lines[s.pane.lines.length - 1].values[s.signalAt])} r="5" fill="none" stroke={GREEN} strokeWidth="2" />}
          </g>
        )}
      </svg>
      </div>

      {/* Steps, highlighted as the trade unfolds */}
      <ol className="space-y-5 self-center">
        {s.steps.map((text, i) => (
          <li key={i} className={`flex gap-4 transition-opacity duration-300 ${i <= stage ? 'opacity-100' : 'opacity-35'}`}>
            <span className={`font-serif text-2xl leading-none ${i === stage ? 'text-gold' : 'text-white/60'}`}>{String(i + 1).padStart(2, '0')}</span>
            <span className="text-sm leading-relaxed text-slate-300">{text}</span>
          </li>
        ))}
        <li className="pt-2 text-xs text-citi-muted">Illustrative example, not real data or a backtest.</li>
      </ol>
    </div>
  );
}

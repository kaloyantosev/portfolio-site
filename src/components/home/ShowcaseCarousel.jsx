import React, { useEffect, useRef } from 'react';
import { customModels, investmentAlgos, tradingAlgos, customIndicators } from '../../portfolioData';
import IndicatorChart from '../indicators/IndicatorChart';
import SitePreview from '../models/SitePreview';

// Strip of the live models, strategies and indicators. Web apps show a static
// snapshot (public/snapshots/<id>.webp) instead of a live embed, so the homepage stays
// light. It glides on its own, pauses on hover and can be dragged with the mouse.
const snapshot = (id, title) => <SitePreview id={id} title={title} />;
const MODELS = customModels.filter(m => m.liveUrl).map(m => ({ tab: 'models', id: m.id, kind: 'Model', title: m.name, preview: snapshot(m.id, m.name) }));
const INDICATORS = customIndicators.filter(i => i.chart).map(i => ({ tab: 'indicators', id: i.id, kind: 'Indicator', title: i.name, preview: <IndicatorChart symbol={i.chart.symbol} study={i.chart.study} height={208} compact /> }));
const STRATEGIES = [...tradingAlgos, ...investmentAlgos].filter(s => s.liveUrl).map(s => ({ tab: 'strategies', id: s.id, kind: 'Strategy', title: s.name, preview: snapshot(s.id, s.name) }));
// Interleave model, indicator, strategy; the shorter lists repeat so the mix holds to the end.
const ITEMS = Array.from({ length: Math.max(MODELS.length, INDICATORS.length, STRATEGIES.length) }, (_, i) =>
  [MODELS, INDICATORS, STRATEGIES].filter(l => l.length).map(l => l[i % l.length])
).flat().map((item, k) => ({ ...item, key: `${item.id}-${k}` }));

const SPEED = 0.4; // px per frame (~24 px/s)

export default function ShowcaseCarousel({ navigate }) {
  const ref = useRef(null);
  const state = useRef({ dir: 1, hover: false, drag: null, moved: false });

  // Auto-glide back and forth while not hovered or dragged.
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let raf;
    const tick = () => {
      const el = ref.current, s = state.current;
      if (el && !s.hover && !s.drag) {
        const max = el.scrollWidth - el.clientWidth;
        // Track the position as a float: browsers round scrollLeft to whole pixels,
        // so adding 0.4 to it directly never moves.
        if (s.pos == null || Math.abs(s.pos - el.scrollLeft) > 2) s.pos = el.scrollLeft; // resync after drag/touch
        s.pos = Math.min(max, Math.max(0, s.pos + s.dir * SPEED));
        el.scrollLeft = s.pos;
        if (s.pos >= max - 1) s.dir = -1;
        else if (s.pos <= 0) s.dir = 1;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = e => {
    if (e.pointerType !== 'mouse') return; // touch uses native scrolling
    state.current.drag = { x: e.clientX, left: ref.current.scrollLeft };
    state.current.moved = false;
  };
  const onPointerMove = e => {
    const d = state.current.drag;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) state.current.moved = true;
    ref.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => { state.current.drag = null; };
  // A drag should not count as a click on the card under the pointer.
  const open = item => { if (!state.current.moved) navigate(item.tab, null, item.id); };

  return (
    <div
      ref={ref}
      className="flex gap-6 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
      style={{ scrollbarWidth: 'none' }}
      onMouseEnter={() => { state.current.hover = true; }}
      onMouseLeave={() => { state.current.hover = false; endDrag(); }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
    >
      {ITEMS.map(item => (
        <div
          key={item.key}
          role="button"
          tabIndex={0}
          onClick={() => open(item)}
          onKeyDown={e => { if (e.key === 'Enter') navigate(item.tab, null, item.id); }}
          className="group w-[78vw] sm:w-[24rem] shrink-0"
        >
          <div className="pointer-events-none rounded-lg overflow-hidden">{item.preview}</div>
          <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-citi-muted">{item.kind}</div>
          <div className="mt-1 font-serif text-xl text-white group-hover:text-white/80 transition-colors">{item.title}</div>
        </div>
      ))}
    </div>
  );
}

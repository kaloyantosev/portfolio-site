import React, { useEffect, useRef } from 'react';
import { customModels, investmentAlgos, tradingAlgos, customIndicators } from '../../portfolioData';
import IndicatorChart from '../indicators/IndicatorChart';

// Strip of the live models, strategies and indicators. Web apps show a static
// snapshot (public/snapshots/<id>.webp) instead of a live embed, so the homepage stays
// light. It glides on its own, pauses on hover and can be dragged with the mouse.
const snapshot = (id, title) => (
  <img src={`/snapshots/${id}.webp`} alt={`${title} screenshot`} loading="lazy" draggable="false" className="w-full aspect-[1280/800] object-cover object-top" />
);
const ITEMS = [
  ...customModels.filter(m => m.liveUrl).map(m => ({ tab: 'models', id: m.id, kind: 'Model', title: m.name, preview: snapshot(m.id, m.name) })),
  ...[...tradingAlgos, ...investmentAlgos].filter(s => s.liveUrl).map(s => ({ tab: 'strategies', id: s.id, kind: 'Strategy', title: s.name, preview: snapshot(s.id, s.name) })),
  ...customIndicators.filter(i => i.chart).map(i => ({ tab: 'indicators', id: i.id, kind: 'Indicator', title: i.name, preview: <IndicatorChart symbol={i.chart.symbol} study={i.chart.study} height={208} compact /> })),
];

const SPEED = 0.65; // px per frame (~40 px/s)

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
        el.scrollLeft += s.dir * SPEED;
        if (el.scrollLeft >= max - 1) s.dir = -1;
        else if (el.scrollLeft <= 0) s.dir = 1;
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
          key={`${item.tab}-${item.id}`}
          role="button"
          tabIndex={0}
          onClick={() => open(item)}
          onKeyDown={e => { if (e.key === 'Enter') navigate(item.tab, null, item.id); }}
          className="group w-[78vw] sm:w-[24rem] shrink-0"
        >
          <div className="pointer-events-none rounded-lg overflow-hidden border border-white/10">{item.preview}</div>
          <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-citi-muted">{item.kind}</div>
          <div className="mt-1 font-serif text-xl text-white group-hover:text-white/80 transition-colors">{item.title}</div>
        </div>
      ))}
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { customModels, investmentAlgos, tradingAlgos, customIndicators } from '../../portfolioData';
import SitePreview from '../models/SitePreview';
import IndicatorChart from '../indicators/IndicatorChart';

// Slow, hover-to-pause strip of the live models, strategies and indicators.
// It pans back and forth instead of looping, so each live preview is rendered once.
const ITEMS = [
  ...customModels.filter(m => m.liveUrl).map(m => ({ tab: 'models', id: m.id, kind: 'Model', title: m.name, preview: <SitePreview url={m.liveUrl} title={m.name} /> })),
  ...[...tradingAlgos, ...investmentAlgos].filter(s => s.liveUrl).map(s => ({ tab: 'strategies', id: s.id, kind: 'Strategy', title: s.name, preview: <SitePreview url={s.liveUrl} title={s.name} /> })),
  ...customIndicators.filter(i => i.chart).map(i => ({ tab: 'indicators', id: i.id, kind: 'Indicator', title: i.name, preview: <IndicatorChart symbol={i.chart.symbol} study={i.chart.study} height={208} compact /> })),
];

export default function ShowcaseCarousel({ navigate }) {
  const viewport = useRef(null);
  const track = useRef(null);
  const [shift, setShift] = useState(0);

  // Distance the strip has to travel so its last card reaches the right edge.
  useEffect(() => {
    const measure = () => setShift(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth));
    const ro = new ResizeObserver(measure);
    ro.observe(viewport.current);
    measure();
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={viewport} className="showcase overflow-hidden">
      <div
        ref={track}
        className="showcase-track flex gap-6 w-max"
        style={{ '--shift': `-${shift}px`, animationDuration: `${Math.max(30, shift / 18)}s` }}
      >
        {ITEMS.map(item => (
          <div
            key={`${item.tab}-${item.id}`}
            role="button"
            tabIndex={0}
            onClick={() => navigate(item.tab, null, item.id)}
            onKeyDown={e => { if (e.key === 'Enter') navigate(item.tab, null, item.id); }}
            className="group w-[78vw] sm:w-[24rem] shrink-0 cursor-pointer"
          >
            <div className="pointer-events-none rounded-lg overflow-hidden">{item.preview}</div>
            <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-citi-muted">{item.kind}</div>
            <div className="mt-1 font-serif text-xl text-white group-hover:text-white/80 transition-colors">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

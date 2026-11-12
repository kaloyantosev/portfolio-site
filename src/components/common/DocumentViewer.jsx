import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

// Page images (CV, letter) with zoom out / in controls. Opens zoomed out so a
// whole page fits on screen; above 100% the pages scroll sideways inside the viewer.
const STEPS = [40, 50, 60, 70, 80, 90, 100, 125, 150];

export default function DocumentViewer({ pages, start = 60 }) {
  const [zoom, setZoom] = useState(start);
  const i = STEPS.indexOf(zoom);

  return (
    <div>
      <div className="flex items-center justify-end gap-3 pb-4">
        <button onClick={() => setZoom(STEPS[Math.max(0, i - 1)])} disabled={i === 0} aria-label="Zoom out" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white hover:text-navy-950 transition-colors disabled:opacity-30 disabled:pointer-events-none">
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-12 text-center text-sm tabular-nums text-citi-muted">{zoom}%</span>
        <button onClick={() => setZoom(STEPS[Math.min(STEPS.length - 1, i + 1)])} disabled={i === STEPS.length - 1} aria-label="Zoom in" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white hover:text-navy-950 transition-colors disabled:opacity-30 disabled:pointer-events-none">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex flex-col items-center gap-6" style={{ width: zoom > 100 ? `${zoom}%` : '100%' }}>
          {pages.map(p => (
            <img key={p.src} src={p.src} alt={p.alt} className="h-auto bg-white select-none" style={{ width: zoom > 100 ? '100%' : `${zoom}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

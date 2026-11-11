import React, { useEffect, useRef, useState } from 'react';

// Live, non-interactive thumbnail of a web app: the page renders at desktop size
// (1280×800) and is scaled down to the column width.
const W = 1280;
const H = 800;

export default function SitePreview({ url, title }) {
  const ref = useRef(null);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full overflow-hidden rounded-lg border border-white/10 bg-navy-950" style={{ aspectRatio: `${W} / ${H}` }}>
      <iframe
        src={url}
        title={`${title} preview`}
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute left-0 top-0 border-0 origin-top-left pointer-events-none"
        style={{ width: W, height: H, transform: `scale(${scale})` }}
      />
    </div>
  );
}

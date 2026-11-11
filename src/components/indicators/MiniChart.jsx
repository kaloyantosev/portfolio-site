import React, { useEffect, useRef } from 'react';

// Small 12-month TradingView preview for list rows (free embed, no API key).
export default function MiniChart({ symbol }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = '<div class="tradingview-widget-container__widget" style="height:100%;width:100%"></div>';
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol,
      width: '100%',
      height: '100%',
      locale: 'en',
      dateRange: '12M',
      colorTheme: 'dark',
      isTransparent: true,
      autosize: true,
      chartOnly: false,
      noTimeScale: true,
    });
    el.appendChild(script);
    return () => { el.innerHTML = ''; };
  }, [symbol]);

  return (
    <div className="h-56 w-full rounded-lg border border-white/10 overflow-hidden">
      <div ref={ref} className="tradingview-widget-container" style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

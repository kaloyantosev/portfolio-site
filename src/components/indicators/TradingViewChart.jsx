import React, { useEffect, useRef, useState } from 'react';

// TradingView interval codes -> button labels.
const LABELS = { '1': '1m', '5': '5m', '15': '15m', '30': '30m', '60': '1H', '240': '4H', D: '1D', W: '1W', M: '1M' };

// TradingView's free Advanced Chart embed. No API key.
// shortcut: the free embed only loads TradingView's built-in studies, not private Pine scripts;
// showing a custom indicator live needs it published on TradingView or the licensed Charting Library.
export default function TradingViewChart({ symbol = 'AMEX:SPY', intervals = ['D'], studies = [] }) {
  const ref = useRef(null);
  const [interval, setInterval] = useState(intervals[0]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = '<div class="tradingview-widget-container__widget" style="height:100%;width:100%"></div>';
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol,
      interval,
      studies,
      autosize: true,
      timezone: 'America/New_York',
      theme: 'dark',
      style: '1',
      locale: 'en',
      backgroundColor: '#06090f',
      gridColor: 'rgba(255,255,255,0.04)',
      hide_side_toolbar: true,
      allow_symbol_change: false,
      save_image: false,
      support_host: 'https://www.tradingview.com',
    });
    el.appendChild(script);
    return () => { el.innerHTML = ''; };
  }, [symbol, interval, studies.join('|')]);

  return (
    <div>
      {intervals.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {intervals.map(i => (
            <button
              key={i}
              onClick={() => setInterval(i)}
              className={`rounded-full px-4 py-1.5 text-xs tracking-[0.12em] transition-colors ${
                interval === i ? 'bg-white text-navy-950' : 'border border-white/25 text-citi-muted hover:text-white'
              }`}
            >
              {LABELS[i] || i}
            </button>
          ))}
        </div>
      )}
      {/* Fixed-height wrapper: the widget script resizes its own container. */}
      <div style={{ height: 560 }}>
        <div ref={ref} className="tradingview-widget-container" style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
}

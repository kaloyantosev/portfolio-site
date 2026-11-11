import React, { useEffect, useRef, useState } from 'react';
import { createChart, createSeriesMarkers, CandlestickSeries, LineSeries, AreaSeries, HistogramSeries } from 'lightweight-charts';
import { loadDaily } from '../../charts/data';
import { STUDIES, quarterOf } from '../../charts/studies';

// Locked, read-only lightweight-charts chart of a symbol's daily candles with one of
// the site's indicators drawn on it. Used full size on the detail page and small in the list.
const STYLE = { solid: 0, dotted: 1, dashed: 2 };
const rgba = (hex, a = 1) => (hex.startsWith('#')
  ? `rgba(${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)},${a})`
  : hex);
const quiet = { priceLineVisible: false, lastValueVisible: false, crosshairMarkerVisible: false };

export default function IndicatorChart({ symbol, study, height = 560, compact = false }) {
  const ref = useRef(null);
  const [error, setError] = useState(null);
  const [channels, setChannels] = useState(null);

  useEffect(() => {
    let chart;
    let cancelled = false;
    setError(null);
    loadDaily(symbol).then(bars => {
      if (cancelled || !ref.current) return;
      const result = STUDIES[study](bars);
      setChannels(result.channels || null);

      chart = createChart(ref.current, {
        autoSize: true,
        layout: {
          background: { type: 'solid', color: 'transparent' },
          textColor: '#9AA5B1',
          fontFamily: 'Manrope, system-ui, sans-serif',
          fontSize: compact ? 10 : 11,
          panes: { separatorColor: 'rgba(255,255,255,0.08)' },
        },
        grid: { vertLines: { color: 'rgba(255,255,255,0.03)' }, horzLines: { color: 'rgba(255,255,255,0.04)' } },
        rightPriceScale: { borderVisible: false },
        timeScale: { borderVisible: false },
        // Read-only: no dragging, zooming or scaling by visitors.
        handleScroll: false,
        handleScale: false,
      });

      const candles = chart.addSeries(CandlestickSeries, {
        upColor: '#E8E6E1', downColor: '#6B7280',
        wickUpColor: '#E8E6E1', wickDownColor: '#6B7280',
        borderVisible: false, priceLineVisible: false,
      });
      candles.setData(bars);

      const addLines = (lines, pane, autoscale) => lines.map(l => {
        const opts = { ...quiet, lineWidth: l.width || 1, ...(autoscale ? { autoscaleInfoProvider: autoscale } : {}) };
        const s = l.area
          ? chart.addSeries(AreaSeries, { ...opts, lineColor: rgba(l.color, l.alpha ?? 1), topColor: rgba(l.color, 0.22), bottomColor: rgba(l.color, 0) }, pane)
          : chart.addSeries(LineSeries, { ...opts, color: rgba(l.color, l.alpha ?? 1), lineStyle: STYLE[l.style || 'solid'], lineType: l.step ? 1 : 0 }, pane);
        s.setData(l.data);
        if (l.markers?.length) createSeriesMarkers(s, l.markers);
        return s;
      });

      // Thin full-height columns at the first bar of each quarter.
      const quarterStarts = bars.filter((b, i) => i > 0 && quarterOf(b.time) !== quarterOf(bars[i - 1].time));
      const addQuarters = (pane, top, base, autoscale) => {
        const s = chart.addSeries(HistogramSeries, { ...quiet, color: 'rgba(255,255,255,0.10)', base, ...(autoscale ? { autoscaleInfoProvider: autoscale } : { priceScaleId: 'quarters' }) }, pane);
        s.setData(quarterStarts.map(b => ({ time: b.time, value: top })));
        if (!autoscale) s.priceScale().applyOptions({ visible: false, scaleMargins: { top: 0, bottom: 0 } });
      };

      // Price pane overlay
      const ov = result.overlay;
      if (ov) {
        addLines(ov.lines || [], 0);
        if (ov.quarters) addQuarters(0, 1, 0);
        (ov.zones || []).forEach(z => {
          const c = z.support ? '#2E9E6B' : '#C2453D';
          candles.createPriceLine({ price: z.hi, color: rgba(c, 0.7), lineWidth: 1, lineStyle: 2, axisLabelVisible: false, title: compact ? '' : `${z.support ? 'Support' : 'Resistance'} confluence ×${z.hits}` });
          candles.createPriceLine({ price: z.lo, color: rgba(c, 0.7), lineWidth: 1, lineStyle: 2, axisLabelVisible: false, title: '' });
        });
      }

      // Oscillator pane
      const pn = result.pane;
      if (pn) {
        const [lo, hi] = pn.range;
        const autoscale = () => ({ priceRange: { minValue: lo, maxValue: hi } });
        if (pn.shade?.length) {
          chart.addSeries(HistogramSeries, { ...quiet, base: pn.shadeBase ?? lo, autoscaleInfoProvider: autoscale }, 1).setData(pn.shade);
        }
        if (pn.quarters) addQuarters(1, hi, lo, autoscale);
        const series = addLines(pn.lines, 1, autoscale);
        const main = series[series.length - 1];
        (pn.levels || []).forEach(l => main.createPriceLine({ price: l.price, color: l.color, lineWidth: 1, lineStyle: STYLE[l.style], axisLabelVisible: false }));
        chart.panes()[1]?.setHeight(Math.round(height * 0.34));
      }

      // Show roughly the last year (longer for the 315-bar regression channel).
      const visible = study === 'drc' ? 340 : 260;
      const extra = ov?.lines?.some(l => l.data.length && l.data[l.data.length - 1].time > bars[bars.length - 1].time) ? 16 : 3;
      chart.timeScale().setVisibleLogicalRange({ from: Math.max(0, bars.length - visible), to: bars.length - 1 + extra });
    }).catch(e => { if (!cancelled) setError(e.message); });

    return () => { cancelled = true; chart?.remove(); };
  }, [symbol, study, height, compact]);

  return (
    <div>
      <div className="relative w-full" style={{ height }}>
        <div ref={ref} className="absolute inset-0" />
        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-citi-muted">
            Chart data unavailable right now.
          </div>
        )}
      </div>
      {!compact && channels && (
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-citi-muted">
          {channels.map(c => (
            <span key={c.name} className="flex items-center gap-2">
              <span className="inline-block h-0.5 w-5" style={{ background: c.color }} />
              {c.name} · R² {c.r2.toFixed(2)} · {c.rising ? '▲' : '▼'}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

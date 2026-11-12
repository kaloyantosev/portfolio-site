import React from 'react';
import { ArrowLeft } from 'lucide-react';
import IndicatorChart from './IndicatorChart';
import TradeWalkthrough from './TradeWalkthrough';

export default function IndicatorDetailPage({ indicator, onBack }) {
  if (!indicator) return null;
  const meta = [indicator.assetSuitability, indicator.timeframes?.join(' · ')].filter(Boolean).join(' · ');

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-16">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-citi-muted hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Indicators
      </button>

      <div className="mt-10 max-w-5xl">
        <div className="section-label mb-4">{meta}</div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-[1.05]">{indicator.name}</h1>
        <p className="mt-4 text-lg text-citi-lightaccent">{indicator.subtitle}</p>
        <div className="mt-6 h-px w-14 bg-gold" />
      </div>

      {indicator.chart && (
        <section className="mt-12">
          <div className="section-label mb-4">Live · {indicator.chart.symbol} · Daily</div>
          <IndicatorChart symbol={indicator.chart.symbol} study={indicator.chart.study} height={window.innerWidth < 768 ? 420 : 620} />
        </section>
      )}

      <section className="mt-16 grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <h2 className="font-serif text-3xl text-white">How it works</h2>
        <div className="max-w-4xl">
          <p className="text-lg text-slate-300 leading-relaxed">{indicator.description}</p>
          {indicator.formula && <p className="mt-6 text-sm text-citi-muted leading-relaxed">{indicator.formula}</p>}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl text-white mb-8">Trading it</h2>
        <TradeWalkthrough study={indicator.chart?.study} />
      </section>

      {indicator.signals?.length > 0 && (
        <section className="mt-16 grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <h2 className="font-serif text-3xl text-white">Reading the signals</h2>
          <dl className="border-t border-white/10">
            {indicator.signals.map(sig => (
              <div key={sig.signal} className="grid gap-2 md:grid-cols-[14rem_1fr] md:gap-8 py-6 border-b border-white/10">
                <dt className="font-serif text-xl text-white">{sig.signal}</dt>
                <dd className="text-slate-300 leading-relaxed">
                  {sig.condition}
                  <span className="block mt-1 text-citi-muted">{sig.action}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </div>
  );
}

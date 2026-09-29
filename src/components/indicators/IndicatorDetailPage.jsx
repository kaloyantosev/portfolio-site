import React from 'react';
import { ArrowLeft, CheckCircle2, Code, Clock } from 'lucide-react';

export default function IndicatorDetailPage({ indicator, onBack }) {
  if (!indicator) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
      
      {/* Back Navigation Bar */}
      <div className="mb-8 pb-4 border-b border-citi-blue/15 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-citi-muted hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Custom Indicators</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-citi-muted">
          <Clock className="w-3.5 h-3.5" />
          <span>Timeframes: {indicator.timeframes?.join(', ')}</span>
          <span>•</span>
          <span className="text-citi-accent font-medium">{indicator.assetSuitability}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight font-sans">
          {indicator.name}
        </h1>
        <p className="text-citi-lightaccent text-base sm:text-lg font-medium">
          {indicator.subtitle}
        </p>
      </div>

      {/* Overview */}
      <div className="mt-8 p-6 bg-navy-800/90 border-l-4 border-citi-accent">
        <div className="section-label mb-2">Indicator Logic & Microstructure Rationale</div>
        <p className="text-slate-100 leading-relaxed text-base font-sans font-normal">
          {indicator.description}
        </p>
      </div>

      {/* Formula */}
      {indicator.formula && (
        <div className="mt-10">
          <div className="section-label mb-3">Mathematical Calculation Formula</div>
          <div className="bg-navy-900 border border-citi-blue/20 border-l-4 border-l-citi-lightblue p-5 font-mono text-sm text-slate-200 overflow-x-auto">
            {indicator.formula}
          </div>
        </div>
      )}

      {/* Signal Trigger States */}
      {indicator.signals?.length > 0 && (
        <div className="mt-10">
          <div className="section-label mb-4">Signal States & Algorithmic Triggers</div>
          <div className="space-y-3.5">
            {indicator.signals.map((sig, i) => (
              <div key={i} className="bg-navy-800 border border-white/5 p-5 space-y-2 text-sm font-mono">
                <div className="flex items-center gap-2 text-base text-white font-bold">
                  <CheckCircle2 className="w-5 h-5 text-citi-accent" />
                  <span>{sig.signal}</span>
                </div>
                <div className="pl-7 text-slate-300">
                  <span className="text-citi-muted uppercase text-xs">Condition: </span>
                  {sig.condition}
                </div>
                <div className="pl-7 text-emerald-400">
                  <span className="text-citi-muted uppercase text-xs">Action Trigger: </span>
                  {sig.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Implementation Code */}
      {indicator.codeSnippet && (
        <div className="mt-10">
          <div className="section-label mb-3 flex items-center gap-1.5">
            <Code className="w-4 h-4 text-citi-accent" />
            <span>Implementation Code Snippet</span>
          </div>
          <pre className="bg-navy-900 border border-white/10 p-5 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
            <code>{indicator.codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Bottom Back Button */}
      <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-citi-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Custom Indicators</span>
        </button>
      </div>

    </div>
  );
}

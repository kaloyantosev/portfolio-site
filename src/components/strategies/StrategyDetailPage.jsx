import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function StrategyDetailPage({ strategy, onBack }) {
  if (!strategy) return null;

  const statItems = [
    { label: 'Sharpe Ratio', val: strategy.metrics?.sharpeRatio, cls: 'text-white font-semibold' },
    { label: 'CAGR', val: strategy.metrics?.cagr, cls: 'text-emerald-400 font-bold' },
    { label: 'Max Drawdown', val: strategy.metrics?.maxDrawdown, cls: 'text-slate-200 font-semibold' },
    { label: 'Sortino Ratio', val: strategy.metrics?.sortinoRatio, cls: 'text-white font-semibold' },
    { label: 'Win Rate', val: strategy.metrics?.winRate, cls: 'text-citi-accent font-semibold' },
    { label: 'Profit Factor', val: strategy.metrics?.profitFactor, cls: 'text-emerald-400 font-bold' },
    { label: 'Volatility', val: strategy.metrics?.volatility, cls: 'text-slate-200 font-semibold' },
    { label: 'Alpha', val: strategy.metrics?.alpha, cls: 'text-citi-accent font-bold' },
  ].filter(s => s.val);

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
      
      {/* Back Navigation Bar */}
      <div className="mb-8 pb-4 border-b border-citi-blue/15 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-citi-muted hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Strategies</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <div className="text-xs font-mono text-citi-muted uppercase tracking-wider">
          {strategy.type} • {strategy.vintage}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight font-sans">
          {strategy.name}
        </h1>
        <p className="text-citi-lightaccent text-base sm:text-lg font-medium">
          {strategy.subtitle}
        </p>
      </div>

      {/* Performance Metrics Grid */}
      {statItems.length > 0 && (
        <div className="mt-10">
          <div className="section-label mb-3">Audited Performance Telemetry</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {statItems.map((s, i) => (
              <div key={i} className="bg-navy-800 border border-white/5 p-4">
                <div className="text-xs font-mono text-citi-muted uppercase tracking-wider mb-1">{s.label}</div>
                <div className={`font-mono text-lg ${s.cls}`}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strategy Description */}
      <div className="mt-10 p-6 bg-navy-800/90 border-l-4 border-citi-accent">
        <div className="section-label mb-2">Strategy Methodology & Architecture</div>
        <p className="text-slate-100 leading-relaxed text-base font-sans font-normal">
          {strategy.description}
        </p>
      </div>

      {/* Mathematical Formula */}
      {strategy.formula && (
        <div className="mt-10">
          <div className="section-label mb-3">Governing Mathematical Formulation</div>
          <div className="bg-navy-900 border border-citi-blue/20 border-l-4 border-l-citi-lightblue p-5 font-mono text-sm text-slate-200 overflow-x-auto">
            {strategy.formula}
          </div>
        </div>
      )}

      {/* Execution Mechanics */}
      {strategy.mechanics?.length > 0 && (
        <div className="mt-10">
          <div className="section-label mb-4">Execution & Risk Protocols</div>
          <div className="space-y-3.5">
            {strategy.mechanics.map((m, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-navy-800/50 border border-white/5 text-slate-200 text-sm sm:text-base leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-citi-accent shrink-0 mt-0.5" />
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Asset Allocation Weights */}
      {strategy.allocationWeights?.length > 0 && (
        <div className="mt-10">
          <div className="section-label mb-4">Portfolio Risk & Target Allocation</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {strategy.allocationWeights.map((w, i) => (
              <div key={i} className="flex items-center justify-between bg-navy-800 border border-white/5 p-4 text-base">
                <span className="text-slate-200">{w.asset}</span>
                <span className="font-mono text-base font-bold text-citi-accent">{w.weight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Specifications Strip */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-4 bg-navy-900 border border-white/5">
          <span className="text-citi-muted uppercase tracking-wider block mb-1">Trading Universe</span>
          <span className="text-white font-medium">{strategy.universe || 'Unconstrained'}</span>
        </div>
        <div className="p-4 bg-navy-900 border border-white/5">
          <span className="text-citi-muted uppercase tracking-wider block mb-1">Execution / Timeframe</span>
          <span className="text-white font-medium">{strategy.timeframe || strategy.rebalanceFrequency || 'Systematic'}</span>
        </div>
        <div className="p-4 bg-navy-900 border border-white/5">
          <span className="text-citi-muted uppercase tracking-wider block mb-1">Status</span>
          <span className="text-emerald-400 font-medium">{strategy.status || 'Active Production'}</span>
        </div>
      </div>

      {/* Bottom Back Button */}
      <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-citi-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Strategies</span>
        </button>
      </div>

    </div>
  );
}

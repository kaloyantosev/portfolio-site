import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export default function BacktestViewer({ strategy, onClose }) {
  if (!strategy) return null;

  const statItems = [
    { label: 'Sharpe Ratio', val: strategy.metrics?.sharpeRatio, cls: 'text-white' },
    { label: 'CAGR', val: strategy.metrics?.cagr, cls: 'text-emerald-400' },
    { label: 'Max Drawdown', val: strategy.metrics?.maxDrawdown, cls: 'text-slate-300' },
    { label: 'Sortino Ratio', val: strategy.metrics?.sortinoRatio, cls: 'text-white' },
    { label: 'Win Rate', val: strategy.metrics?.winRate, cls: 'text-citi-accent' },
    { label: 'Profit Factor', val: strategy.metrics?.profitFactor, cls: 'text-emerald-400' },
    { label: 'Volatility', val: strategy.metrics?.volatility, cls: 'text-slate-300' },
    { label: 'Alpha', val: strategy.metrics?.alpha, cls: 'text-citi-accent' },
  ].filter(s => s.val);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-navy-950/90 backdrop-blur-md animate-fade"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-surface-800 border border-citi-blue/20 shadow-2xl shadow-black/70 my-4 max-h-[88vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-start justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="badge-blue">{strategy.category}</span>
              {strategy.status && <span className="badge-green">{strategy.status}</span>}
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-white">{strategy.name}</h2>
            <p className="text-citi-muted text-xs">{strategy.subtitle}</p>
          </div>
          <button onClick={onClose} className="text-citi-muted hover:text-white transition-colors ml-4 shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-sm">

          {/* Stats grid */}
          {statItems.length > 0 && (
            <div>
              <div className="section-label mb-3">Performance Metrics</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {statItems.map((s, i) => (
                  <div key={i} className="bg-navy-800 border border-white/5 p-3">
                    <div className="text-[9px] font-mono text-citi-muted uppercase tracking-wider mb-1">{s.label}</div>
                    <div className={`font-mono text-base font-medium ${s.cls}`}>{s.val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <div className="section-label mb-2">Methodology</div>
            <p className="text-citi-silver text-xs leading-relaxed">{strategy.description}</p>
          </div>

          {/* Formula */}
          {strategy.formula && (
            <div>
              <div className="section-label mb-2">Governing Formula</div>
              <div className="bg-navy-900 border border-citi-blue/20 border-l-2 border-l-citi-lightblue p-4 font-mono text-xs text-citi-silver overflow-x-auto">
                {strategy.formula}
              </div>
            </div>
          )}

          {/* Mechanics */}
          {strategy.mechanics?.length > 0 && (
            <div>
              <div className="section-label mb-3">Execution Mechanics</div>
              <div className="space-y-2">
                {strategy.mechanics.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 text-citi-silver text-xs leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-citi-lightblue shrink-0 mt-0.5" />
                    {m}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Allocation weights */}
          {strategy.allocationWeights?.length > 0 && (
            <div>
              <div className="section-label mb-3">Asset Allocation</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {strategy.allocationWeights.map((w, i) => (
                  <div key={i} className="flex items-center justify-between bg-navy-800 border border-white/5 px-3 py-2">
                    <span className="text-citi-silver text-xs">{w.asset}</span>
                    <span className="font-mono text-xs text-citi-accent">{w.weight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-xs font-medium text-citi-muted hover:text-white border border-white/10 hover:border-citi-blue/40 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

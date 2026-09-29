import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function StrategyCard({ strategy, onClick }) {
  return (
    <div onClick={onClick} className="bank-card p-7 cursor-pointer group flex flex-col justify-between">
      <div>
        {/* Top row */}
        <div className="flex items-start justify-between mb-3 text-xs font-mono">
          <span className="text-citi-accent font-medium">{strategy.type}</span>
          <span className="text-citi-muted shrink-0">{strategy.vintage}</span>
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold text-base sm:text-lg leading-snug group-hover:text-citi-accent transition-colors font-sans">
          {strategy.name}
        </h3>
        <p className="text-citi-lightaccent text-sm mt-1.5 leading-relaxed font-medium">
          {strategy.subtitle}
        </p>
        <p className="text-slate-300 text-sm mt-3 leading-relaxed line-clamp-3 font-sans">
          {strategy.description}
        </p>

        {/* Metrics strip */}
        {strategy.metrics && (
          <div className="mt-5 grid grid-cols-3 gap-3 bg-navy-900/60 border border-white/5 p-4">
            {strategy.metrics.sharpeRatio && (
              <div>
                <div className="text-[10px] font-mono text-citi-muted uppercase tracking-wider mb-0.5">Sharpe</div>
                <div className="font-mono text-base font-semibold text-white">{strategy.metrics.sharpeRatio}</div>
              </div>
            )}
            {strategy.metrics.cagr && (
              <div>
                <div className="text-[10px] font-mono text-citi-muted uppercase tracking-wider mb-0.5">CAGR</div>
                <div className="font-mono text-base font-semibold text-emerald-400">{strategy.metrics.cagr}</div>
              </div>
            )}
            {strategy.metrics.maxDrawdown && (
              <div>
                <div className="text-[10px] font-mono text-citi-muted uppercase tracking-wider mb-0.5">Max DD</div>
                <div className="font-mono text-base font-semibold text-slate-200">{strategy.metrics.maxDrawdown}</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-xs font-mono text-citi-lightaccent truncate max-w-[200px]">
          {strategy.timeframe || strategy.rebalanceFrequency}
        </span>
        <span className="text-sm font-medium text-slate-200 group-hover:text-citi-accent flex items-center gap-1 transition-colors">
          View <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, TrendingUp, Cpu, Activity, ShieldCheck, ArrowRight } from 'lucide-react';
import { investmentMemos, macroAnalyses, tradingAlgos, investmentAlgos, customModels, customIndicators, recommendationLetters } from '../../portfolioData';

export default function SearchSpotlightModal({ isOpen, onClose, onSelect }) {
  const [q, setQ] = useState('');

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allItems = [
    ...investmentMemos.map(i => ({ ...i, section: 'articles', subTab: 'memos', typeName: 'Investment Memo', icon: BookOpen })),
    ...macroAnalyses.map(i => ({ ...i, section: 'articles', subTab: 'macro', typeName: 'Macro Analysis', icon: BookOpen })),
    ...tradingAlgos.map(i => ({ ...i, title: i.name, section: 'strategies', subTab: 'trading-algos', typeName: 'Trading Algo', icon: TrendingUp })),
    ...investmentAlgos.map(i => ({ ...i, title: i.name, section: 'strategies', subTab: 'investment-algos', typeName: 'Investment Algo', icon: TrendingUp })),
    ...customModels.map(i => ({ ...i, title: i.name, section: 'models', typeName: 'Custom Model', icon: Cpu })),
    ...customIndicators.map(i => ({ ...i, title: i.name, section: 'indicators', typeName: 'Custom Indicator', icon: Activity })),
    ...recommendationLetters.map(i => ({ ...i, title: `Recommendation from ${i.authorName}`, section: 'recommendations', typeName: 'Recommendation', icon: ShieldCheck }))
  ];

  const filtered = q.trim() === ''
    ? allItems.slice(0, 7)
    : allItems.filter(item => {
        const lq = q.toLowerCase();
        return (item.title || '').toLowerCase().includes(lq) ||
          (item.subtitle || item.description || '').toLowerCase().includes(lq);
      });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 p-4 bg-navy-950/90 backdrop-blur-md animate-fade" onClick={onClose}>
      <div className="relative w-full max-w-2xl bg-surface-800 border border-citi-blue/20 shadow-2xl shadow-black/70" onClick={e => e.stopPropagation()}>
        {/* Search bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
          <Search className="w-4 h-4 text-citi-muted shrink-0" />
          <input
            autoFocus
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search across all sections..."
            className="flex-1 bg-transparent text-sm text-slate-200 placeholder-citi-muted/50 outline-none font-sans"
          />
          <button onClick={onClose} className="text-citi-muted hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="py-2 max-h-80 overflow-y-auto">
          {filtered.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                onClick={() => { onSelect(item.section, item.subTab); onClose(); setQ(''); }}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors text-left group"
              >
                <Icon className="w-3.5 h-3.5 text-citi-lightblue shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-citi-silver group-hover:text-white transition-colors truncate">{item.title}</div>
                  <div className="text-[10px] font-mono text-citi-muted mt-0.5">{item.typeName}</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-citi-muted group-hover:text-white transition-colors shrink-0" />
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="px-5 py-8 text-center text-xs text-citi-muted">No results found for "{q}"</div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-2.5 border-t border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-mono text-citi-muted/50">Press ESC to dismiss</span>
          <span className="text-[10px] font-mono text-citi-muted/50">⌘K</span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { X, CheckCircle2, Calendar } from 'lucide-react';

export default function ArticleModal({ article, onClose }) {
  if (!article) return null;
  const isMemo = article.category === 'Investment Memo';

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
              <span className="badge-blue">{article.category}</span>
              <span className="text-[10px] font-mono text-citi-muted flex items-center gap-1">
                <Calendar className="w-3 h-3" />{article.date}
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-white">{article.title}</h2>
            <p className="text-citi-muted text-xs">{article.subtitle}</p>
          </div>
          <button onClick={onClose} className="text-citi-muted hover:text-white transition-colors ml-4 shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-sm font-sans">

          {/* Summary */}
          {article.summary && (
            <div className="bg-navy-800/60 border-l-2 border-citi-lightblue pl-4 py-3 pr-4">
              <div className="section-label mb-1.5">Executive Summary</div>
              <p className="text-citi-silver leading-relaxed text-sm">{article.summary}</p>
            </div>
          )}

          {/* Memo targets */}
          {isMemo && (article.targetPrice || article.recommendation) && (
            <div>
              <div className="section-label mb-3">Key Metrics</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Recommendation', value: article.recommendation, cls: 'text-emerald-400' },
                  { label: 'Target / Current', value: `${article.targetPrice} / ${article.currentPrice}`, cls: 'text-white' },
                  { label: 'Upside', value: article.upside, cls: 'text-citi-accent' },
                  { label: 'Horizon', value: article.horizon, cls: 'text-citi-silver' },
                ].filter(r => r.value).map((r, i) => (
                  <div key={i} className="bg-navy-800 border border-white/5 p-3">
                    <div className="text-[10px] font-mono text-citi-muted uppercase tracking-wider mb-1">{r.label}</div>
                    <div className={`font-mono text-sm font-medium ${r.cls}`}>{r.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key points */}
          {article.keyPoints?.length > 0 && (
            <div>
              <div className="section-label mb-3">Core Theses</div>
              <div className="space-y-2">
                {article.keyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-3 text-citi-silver text-xs leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-citi-lightblue shrink-0 mt-0.5" />
                    {pt}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full content */}
          {article.fullContent && (
            <div>
              <div className="section-label mb-3">Full Document</div>
              <div className="bg-navy-900/50 border border-white/5 p-5 space-y-4 text-citi-silver leading-relaxed text-xs">
                {article.fullContent.split('\n\n').map((para, i) => {
                  if (para.startsWith('### ')) {
                    return <h4 key={i} className="font-serif text-base font-medium text-white mt-3">{para.replace('### ', '')}</h4>;
                  }
                  return <p key={i}>{para}</p>;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-citi-muted hover:text-white border border-white/10 hover:border-citi-blue/40 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

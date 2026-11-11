import React from 'react';
import { ArrowLeft, Calendar, CheckCircle2 } from 'lucide-react';

export default function ArticleDetailPage({ article, onBack }) {
  if (!article) return null;
  const isMemo = article.category === 'Investment Memo';

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
      
      {/* Back Navigation Bar */}
      <div className="mb-8 pb-4 border-b border-citi-blue/15 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-citi-muted hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Articles</span>
        </button>
      </div>

      {/* Article Title Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-citi-muted">
          <span className="text-citi-accent font-semibold">{article.ticker || article.assetClass}</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{article.date}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-medium text-white leading-[1.05]">
          {article.title}
        </h1>
        <p className="text-citi-lightaccent text-base sm:text-lg font-medium">
          {article.subtitle}
        </p>
      </div>

      {/* Executive Summary Callout Box */}
      {article.summary && (
        <div className="mt-8 p-6 bg-navy-800/90 border-l-4 border-citi-accent">
          <div className="section-label mb-2">Executive Summary</div>
          <p className="text-slate-100 leading-relaxed text-base font-sans font-normal">
            {article.summary}
          </p>
        </div>
      )}

      {/* Memo Valuation & Target Metrics Grid */}
      {isMemo && (article.targetPrice || article.recommendation) && (
        <div className="mt-10">
          <div className="section-label mb-3">Key Target Metrics</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Recommendation', value: article.recommendation, cls: 'text-emerald-400 font-bold' },
              { label: 'Target / Current', value: `${article.targetPrice} / ${article.currentPrice}`, cls: 'text-white font-bold' },
              { label: 'Upside Potential', value: article.upside, cls: 'text-citi-accent font-bold' },
              { label: 'Holding Horizon', value: article.horizon, cls: 'text-slate-200' },
            ].filter(r => r.value).map((r, i) => (
              <div key={i} className="bg-navy-800 border border-white/5 p-4">
                <div className="text-xs font-mono text-citi-muted uppercase tracking-wider mb-1">{r.label}</div>
                <div className={`font-mono text-base ${r.cls}`}>{r.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Macro Specific Key Trade */}
      {!isMemo && article.keyTrade && (
        <div className="mt-10 bg-navy-800 border border-white/5 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono text-citi-muted uppercase tracking-wider mb-1">Primary Trade Idea</div>
            <div className="text-base font-mono text-citi-accent font-medium">{article.keyTrade}</div>
          </div>
          {article.regime && (
            <div className="sm:text-right">
              <div className="text-xs font-mono text-citi-muted uppercase tracking-wider mb-1">Macro Regime</div>
              <div className="text-base font-mono text-white font-medium">{article.regime}</div>
            </div>
          )}
        </div>
      )}

      {/* Core Theses Pillars */}
      {article.keyPoints?.length > 0 && (
        <div className="mt-10">
          <div className="section-label mb-4">Core Investment Theses</div>
          <div className="space-y-3.5">
            {article.keyPoints.map((pt, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-navy-800/50 border border-white/5 text-slate-200 text-sm sm:text-base leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-citi-accent shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Document / Longform Content */}
      {article.fullContent && (
        <div className="mt-12 pt-8 border-t border-citi-blue/15">
          <div className="section-label mb-6">Analytical Memorandum</div>
          <div className="bg-navy-900/60 border border-white/5 p-6 sm:p-8 space-y-6 text-slate-200 leading-relaxed text-sm sm:text-base font-sans">
            {article.fullContent.split('\n\n').map((para, i) => {
              if (para.startsWith('### ')) {
                return (
                  <h3 key={i} className="text-xl sm:text-2xl font-semibold text-white text-citi-accent mt-8 mb-3 font-sans">
                    {para.replace('### ', '')}
                  </h3>
                );
              }
              return <p key={i} className="leading-relaxed">{para}</p>;
            })}
          </div>
        </div>
      )}

      {/* Bottom Back Button */}
      <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-citi-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Articles</span>
        </button>
      </div>

    </div>
  );
}

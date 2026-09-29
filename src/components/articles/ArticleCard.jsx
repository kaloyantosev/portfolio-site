import React from 'react';
import { ArrowUpRight, Calendar } from 'lucide-react';

export default function ArticleCard({ article, onClick }) {
  const isMemo = article.category === 'Investment Memo';
  return (
    <div
      onClick={onClick}
      className="bank-card p-7 cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Meta row */}
        <div className="flex items-center justify-between mb-3 text-xs font-mono">
          <span className="text-citi-accent font-semibold">{article.ticker || article.assetClass}</span>
          <span className="text-citi-muted flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />{article.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold text-base sm:text-lg leading-snug group-hover:text-citi-accent transition-colors font-sans">
          {article.title}
        </h3>
        <p className="text-citi-lightaccent text-sm mt-1.5 leading-relaxed">
          {article.subtitle}
        </p>

        {/* Summary */}
        <p className="text-slate-300 text-sm mt-3.5 leading-relaxed line-clamp-3 font-sans">
          {article.summary}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs font-mono">
          {isMemo && article.recommendation && (
            <span className="text-emerald-400 font-semibold tracking-wider">{article.recommendation}</span>
          )}
          {article.upside && (
            <span className="text-citi-accent font-semibold">{article.upside}</span>
          )}
          {!isMemo && article.keyTrade && (
            <span className="text-citi-lightaccent font-medium truncate max-w-[200px]">{article.keyTrade}</span>
          )}
        </div>
        <span className="text-sm font-medium text-slate-200 group-hover:text-citi-accent transition-colors flex items-center gap-1">
          Read <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}

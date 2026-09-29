import React from 'react';
import { customIndicators } from '../../portfolioData';
import { ArrowUpRight } from 'lucide-react';
import IndicatorDetailPage from './IndicatorDetailPage';

export default function IndicatorsView({ selectedIndicatorId, setSelectedIndicatorId }) {
  if (selectedIndicatorId) {
    const activeIndicator = customIndicators.find(i => i.id === selectedIndicatorId);
    if (activeIndicator) {
      return (
        <IndicatorDetailPage
          indicator={activeIndicator}
          onBack={() => {
            setSelectedIndicatorId(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      );
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      
      <div className="border-b border-citi-blue/15 pb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">Custom Indicators</h1>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        {customIndicators.map(ind => (
          <div 
            key={ind.id} 
            onClick={() => {
              setSelectedIndicatorId(ind.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="bank-card p-7 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Timeframes */}
              <div className="mb-3 text-xs font-mono text-citi-muted">
                {ind.timeframes?.join(' · ')}
              </div>
              
              <h3 className="text-white font-semibold text-base sm:text-lg group-hover:text-citi-accent transition-colors font-sans">
                {ind.name}
              </h3>
              <p className="text-citi-lightaccent text-sm mt-1.5 leading-relaxed font-medium">{ind.subtitle}</p>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed line-clamp-3 font-sans">{ind.description}</p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-citi-lightaccent truncate">{ind.assetSuitability}</span>
              <span className="text-sm font-medium text-slate-200 group-hover:text-citi-accent flex items-center gap-1.5 transition-colors">
                View <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {customIndicators.length === 0 && (
        <div className="mt-20 text-center text-citi-muted text-base py-16 border border-white/5">
          No custom indicators available.
        </div>
      )}

    </div>
  );
}

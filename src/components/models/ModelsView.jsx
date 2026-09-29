import React from 'react';
import { customModels } from '../../portfolioData';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import ModelDetailPage from './ModelDetailPage';

export default function ModelsView({ selectedModelId, setSelectedModelId }) {
  if (selectedModelId) {
    const activeModel = customModels.find(m => m.id === selectedModelId);
    if (activeModel) {
      return (
        <ModelDetailPage
          model={activeModel}
          onBack={() => {
            setSelectedModelId(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      );
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      
      <div className="border-b border-citi-blue/15 pb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">Custom Models</h1>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {customModels.map(m => (
          <div 
            key={m.id} 
            onClick={() => {
              setSelectedModelId(m.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="bank-card overflow-hidden cursor-pointer group flex flex-col justify-between"
          >
            {/* Screenshot Header Preview */}
            {m.previewImage && (
              <div className="relative w-full h-56 bg-navy-950 border-b border-citi-blue/15 overflow-hidden">
                <img
                  src={m.previewImage}
                  alt={m.name}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60 pointer-events-none" />
                {m.liveUrl && (
                  <a
                    href={m.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3 right-3 px-3 py-1.5 bg-navy-900/90 hover:bg-citi-lightblue text-white text-xs font-mono tracking-wider flex items-center gap-1.5 border border-white/10 transition-colors shadow-lg"
                  >
                    <span>Live App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}

            <div className="p-7">
              <h3 className="text-white font-semibold text-base sm:text-lg group-hover:text-citi-accent transition-colors font-sans">
                {m.name}
              </h3>
              <p className="text-citi-lightaccent text-sm mt-1.5 leading-relaxed font-medium">{m.subtitle}</p>
              <p className="text-slate-300 text-sm mt-3.5 leading-relaxed line-clamp-3 font-sans">{m.description}</p>
            </div>
            
            <div className="px-7 pb-6 pt-2 flex items-center justify-between border-t border-white/5">
              <span className="text-xs font-mono text-citi-muted">
                {m.liveUrl ? 'Interactive Web Application' : 'Quantitative Model'}
              </span>
              <span className="text-sm font-medium text-slate-200 group-hover:text-citi-accent flex items-center gap-1.5 transition-colors">
                View <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {customModels.length === 0 && (
        <div className="mt-20 text-center text-citi-muted text-base py-16 border border-white/5">
          No custom models available.
        </div>
      )}

    </div>
  );
}

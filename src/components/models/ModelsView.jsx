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
            {/* Screenshot Header Preview (or lightweight generated header) */}
            {m.previewImage ? (
              <div className="relative w-full h-56 bg-navy-950 border-b border-citi-blue/15 overflow-hidden">
                <img
                  src={m.previewImage}
                  alt={m.name}
                  loading="lazy"
                  decoding="async"
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
            ) : (
              <div className="relative w-full h-56 bg-navy-950 border-b border-citi-blue/15 overflow-hidden flex flex-col justify-between p-6">
                <div
                  className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(56,189,248,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.08) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />
                <svg className="absolute bottom-0 left-0 w-full h-28 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <path d="M0,80 L40,70 L80,74 L120,52 L160,58 L200,36 L240,44 L280,24 L320,32 L360,14 L400,20 L400,100 L0,100 Z" fill="rgba(56,189,248,0.10)" />
                  <path d="M0,80 L40,70 L80,74 L120,52 L160,58 L200,36 L240,44 L280,24 L320,32 L360,14 L400,20" fill="none" stroke="rgba(56,189,248,0.8)" strokeWidth="2" />
                </svg>
                <div className="relative flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-citi-lightaccent">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {m.category}
                </div>
                <div className="relative text-white/90 text-xl font-semibold tracking-tight">{m.name.split(' — ')[0]}</div>
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

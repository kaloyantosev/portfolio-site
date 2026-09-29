import React from 'react';
import { ArrowLeft, ExternalLink, Globe } from 'lucide-react';

export default function ModelDetailPage({ model, onBack }) {
  if (!model) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
      
      {/* Back Navigation Bar */}
      <div className="mb-8 pb-4 border-b border-citi-blue/15 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-citi-muted hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Custom Models</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight font-sans">
              {model.name}
            </h1>
            <p className="text-citi-lightaccent text-base sm:text-lg font-medium mt-1.5">
              {model.subtitle}
            </p>
          </div>

          {model.liveUrl && (
            <a
              href={model.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-citi-lightblue text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-citi-accent transition-colors shadow-lg self-start sm:self-auto"
            >
              <span>Visit Live Web App</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Model Overview Summary Box */}
      <div className="mt-8 p-6 bg-navy-800/90 border-l-4 border-citi-accent">
        <div className="section-label mb-2">Model Overview</div>
        <p className="text-slate-100 leading-relaxed text-base font-sans font-normal">
          {model.description}
        </p>
      </div>

      {/* Prominent High-Resolution Image of the Site */}
      {model.previewImage && (
        <div className="mt-8 border border-citi-blue/20 bg-navy-950 p-2 sm:p-4 shadow-2xl">
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/10 mb-3 text-xs font-mono text-citi-muted">
            <div className="flex items-center gap-2 text-slate-200">
              <Globe className="w-4 h-4 text-citi-accent" />
              <span>{model.liveUrl || 'Application Interface'}</span>
            </div>
            {model.liveUrl && (
              <a
                href={model.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-citi-lightaccent hover:text-white flex items-center gap-1"
              >
                <span>Open Fullscreen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <img
            src={model.previewImage}
            alt={model.name}
            className="w-full h-auto object-contain border border-white/5 shadow-inner"
          />
        </div>
      )}

      {/* Bottom Back Button */}
      <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-citi-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Custom Models</span>
        </button>
      </div>

    </div>
  );
}

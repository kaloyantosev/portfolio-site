import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Globe, Maximize2, Minimize2, RotateCw, Loader2 } from 'lucide-react';

export default function ModelDetailPage({ model, onBack }) {
  const frameWrapRef = useRef(null);
  const iframeRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === frameWrapRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  // Reset loading state when switching model
  useEffect(() => { setLoaded(false); }, [model?.id, reloadKey]);

  if (!model) return null;

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (frameWrapRef.current?.requestFullscreen) {
      frameWrapRef.current.requestFullscreen();
    } else if (model.liveUrl) {
      window.open(model.liveUrl, '_blank', 'noopener');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

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

      {/* Live embedded application (always the latest production deployment) */}
      {model.liveUrl ? (
        <div
          ref={frameWrapRef}
          className={`mt-8 border border-citi-blue/20 bg-navy-950 shadow-2xl flex flex-col ${isFullscreen ? 'w-screen h-screen' : ''}`}
        >
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 text-xs font-mono text-citi-muted">
            <div className="flex items-center gap-2 text-slate-200 min-w-0">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <Globe className="w-4 h-4 text-citi-accent shrink-0" />
              <span className="truncate">{model.liveUrl}</span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => setReloadKey(k => k + 1)}
                className="text-citi-lightaccent hover:text-white flex items-center gap-1"
                title="Reload"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reload</span>
              </button>
              <button
                onClick={toggleFullscreen}
                className="text-citi-lightaccent hover:text-white flex items-center gap-1"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
              </button>
            </div>
          </div>

          <div className={`relative w-full ${isFullscreen ? 'flex-1' : 'h-[80vh] min-h-[560px]'}`}>
            {!loaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-citi-muted text-sm font-mono">
                <Loader2 className="w-6 h-6 animate-spin text-citi-accent" />
                <span>Loading live application…</span>
              </div>
            )}
            <iframe
              key={reloadKey}
              ref={iframeRef}
              src={model.liveUrl}
              title={model.name}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              allow="fullscreen; clipboard-read; clipboard-write"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className={`absolute inset-0 w-full h-full border-0 bg-white transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        </div>
      ) : model.previewImage && (
        <div className="mt-8 border border-citi-blue/20 bg-navy-950 p-2 sm:p-4 shadow-2xl">
          <img
            src={model.previewImage}
            alt={model.name}
            loading="lazy"
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

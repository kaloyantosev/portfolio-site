import React from 'react';
import { ArrowLeft, CheckCircle2, Calendar } from 'lucide-react';

export default function CertificateDetailPage({ item, onBack }) {
  if (!item) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
      
      {/* Back Navigation Bar */}
      <div className="mb-8 pb-4 border-b border-citi-blue/15 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-citi-muted hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Certificates & Awards</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-citi-muted">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{item.date}</span>
          <span>•</span>
          <span className="text-citi-accent font-medium">{item.institution}</span>
          {item.instructor && (
            <>
              <span>•</span>
              <span className="text-slate-300 font-medium">{item.instructor}</span>
            </>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight font-sans">
          {item.title}
        </h1>
        <p className="text-citi-lightaccent text-base sm:text-lg font-medium">
          {item.institution} {item.instructor ? `• ${item.instructor}` : ''}
        </p>
      </div>

      {/* Summary Box */}
      {item.summary && (
        <div className="mt-8 p-6 bg-navy-800/90 border-l-4 border-citi-accent">
          <div className="section-label mb-2">Executive Summary</div>
          <p className="text-slate-100 leading-relaxed text-base font-sans font-normal">
            {item.summary}
          </p>
        </div>
      )}

      {/* Details List */}
      {item.details?.length > 0 && (
        <div className="mt-10">
          <div className="section-label mb-4">Curriculum & Competencies Acquired</div>
          <div className="space-y-3.5">
            {item.details.map((d, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-navy-800/50 border border-white/5 text-slate-200 text-sm sm:text-base leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-citi-accent shrink-0 mt-0.5" />
                <span>{d}</span>
              </div>
            ))}
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
          <span>Return to Certificates & Awards</span>
        </button>
      </div>

    </div>
  );
}

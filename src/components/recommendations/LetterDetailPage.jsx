import React from 'react';
import { ArrowLeft, Download, FileText, ShieldCheck } from 'lucide-react';

export default function LetterDetailPage({ letter, onBack }) {
  if (!letter) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
      
      {/* Back Navigation Bar */}
      <div className="mb-8 pb-4 border-b border-citi-blue/15 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-citi-muted hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Recommendations</span>
        </button>
        <span className="text-xs font-mono uppercase tracking-wider text-citi-accent font-medium">
          Executive Endorsement
        </span>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-citi-accent uppercase tracking-wider">
          {letter.institution} • {letter.date}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-medium text-white leading-[1.05]">
          Letter of Recommendation
        </h1>
        <p className="text-citi-lightaccent text-base sm:text-lg font-medium font-sans">
          From {letter.authorName} — {letter.authorTitle}
        </p>
      </div>

      {/* Readable Quote Box */}
      <div className="mt-8 p-6 bg-navy-800/90 border-l-4 border-citi-accent">
        <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-sans font-normal">
          "{letter.featuredQuote}"
        </p>
        <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-citi-lightaccent">
          {letter.authorName} • {letter.institutionContext || letter.institution}
        </div>
      </div>

      {/* Top Action Bar for PDF Download */}
      <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-citi-blue/15">
        <div className="flex items-center gap-2 text-sm font-sans text-slate-200">
          <FileText className="w-5 h-5 text-citi-accent" />
          <span className="font-medium">Original Recommendation Document</span>
        </div>

        <a
          href={letter.pdfUrl || "/letter_of_recommendation.pdf"}
          download="Letter_of_Recommendation_Joshua_Reesman.pdf"
          className="flex items-center gap-2 px-5 py-2.5 bg-citi-lightblue text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-citi-accent transition-colors shadow-lg self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </a>
      </div>

      {/* Full-Size Document Display — Native, seamless, zero toolbars/sidebars */}
      <div className="mt-6 border border-citi-blue/20 bg-white p-2 sm:p-4 shadow-2xl">
        <img
          src="/letter_of_recommendation_doc.png"
          alt="Letter of Recommendation - Joshua E. Reesman"
          className="w-full h-auto object-contain select-none"
        />
      </div>

      {/* Bottom Back Button */}
      <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-citi-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Recommendations</span>
        </button>
        <span className="text-xs font-mono text-citi-muted/60">
          Executive Document
        </span>
      </div>

    </div>
  );
}

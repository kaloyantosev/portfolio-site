import React from 'react';
import { recommendationLetters } from '../../portfolioData';

export default function RecommendationsView() {
  const letter = recommendationLetters[0];

  if (!letter) {
    return (
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <div className="text-center text-citi-muted text-base py-16">
          No recommendation letter available.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
      
      {/* Editorial Header */}
      <div className="border-b border-citi-blue/15 pb-6">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-sans">
          Letter of Recommendation
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-citi-lightaccent font-medium">
          <span className="text-white font-medium">{letter.authorName}</span>
          <span className="text-citi-muted">•</span>
          <span>{letter.institutionContext || letter.authorTitle}</span>
          <span className="text-citi-muted">•</span>
          <span className="text-citi-muted font-mono text-xs">{letter.date}</span>
        </div>
      </div>

      {/* Elegant Highlight Quote */}
      <div className="mt-8 p-7 bg-navy-800/80 border-l-3 border-citi-accent rounded-sm shadow-lg">
        <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-sans font-normal">
          "{letter.featuredQuote}"
        </p>
      </div>

      {/* Seamless High-Resolution Document Display */}
      <div className="mt-10 border border-citi-blue/20 bg-white p-2 sm:p-5 shadow-2xl">
        <img
          src="/letter_of_recommendation_doc.png"
          alt="Letter of Recommendation - Joshua E. Reesman"
          className="w-full h-auto object-contain select-none"
        />
      </div>

    </div>
  );
}

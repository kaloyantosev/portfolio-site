import React from 'react';
import { recommendationLetters } from '../../portfolioData';
import { PageHeader, EmptyNote } from '../common/ListUI';

export default function RecommendationsView() {
  const letter = recommendationLetters[0];

  if (!letter) {
    return (
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <EmptyNote>No recommendation letter available.</EmptyNote>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
      <PageHeader eyebrow="Recommendation" title="Letter of Recommendation">
        {letter.authorName} · {letter.institutionContext || letter.authorTitle} · {letter.date}
      </PageHeader>

      <blockquote className="border-t border-white/10 pt-10 text-slate-100 text-xl leading-relaxed">
        “{letter.featuredQuote}”
      </blockquote>

      <img
        src="/letter_of_recommendation_doc.png"
        alt={`Letter of Recommendation - ${letter.authorName}`}
        className="mt-12 mx-auto block w-[70%] h-auto bg-white select-none"
      />
    </div>
  );
}

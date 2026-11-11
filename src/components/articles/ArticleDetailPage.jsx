import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';

// Renders an article body written in a small Markdown subset:
// "## " headings, "- " bullets, "1. " numbered lists, "> " quotes, blank-line paragraphs.
function ArticleBody({ text }) {
  return text.trim().split(/\n\s*\n/).map((block, i) => {
    const lines = block.split('\n');
    if (block.startsWith('## ')) {
      return <h2 key={i} className="font-serif text-3xl text-white mt-12 mb-2">{block.slice(3)}</h2>;
    }
    if (lines.every(l => l.startsWith('- '))) {
      return <ul key={i} className="list-disc pl-6 space-y-2">{lines.map((l, j) => <li key={j}>{l.slice(2)}</li>)}</ul>;
    }
    if (lines.every(l => /^\d+\. /.test(l))) {
      return <ol key={i} className="list-decimal pl-6 space-y-2">{lines.map((l, j) => <li key={j}>{l.replace(/^\d+\. /, '')}</li>)}</ol>;
    }
    if (block.startsWith('> ')) {
      return <blockquote key={i} className="border-l border-white/30 pl-6 font-serif italic text-xl text-white/90">{block.slice(2)}</blockquote>;
    }
    return <p key={i}>{block}</p>;
  });
}

export default function ArticleDetailPage({ article, onBack }) {
  if (!article) return null;
  const meta = [article.ticker || article.assetClass, article.date].filter(Boolean).join(' · ');

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-16">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-citi-muted hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Articles
      </button>

      <div className="mt-10 max-w-5xl">
        <div className="section-label mb-4">{meta}</div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-[1.05]">{article.title}</h1>
        {article.subtitle && <p className="mt-4 text-lg text-citi-lightaccent">{article.subtitle}</p>}
        <div className="mt-6 h-px w-14 bg-gold" />
      </div>

      {/* Text on the left, chart and download on the right (stacked on phones). */}
      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
        <article className="order-2 lg:order-1 max-w-3xl space-y-5 text-lg text-slate-300 leading-relaxed">
          {article.summary && <p className="text-xl text-slate-100 leading-relaxed">{article.summary}</p>}
          {article.body
            ? <ArticleBody text={article.body} />
            : article.fullContent && <ArticleBody text={article.fullContent.replace(/^### /gm, '## ')} />}
        </article>

        {(article.image || article.docx) && (
          <aside className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-28 space-y-5">
              {article.image && (
                <figure>
                  <a href={article.image} target="_blank" rel="noreferrer">
                    <img src={article.image} alt={article.imageCaption || article.title} className="w-full h-auto rounded-lg border border-white/10" />
                  </a>
                  {article.imageCaption && <figcaption className="mt-3 text-sm text-citi-muted leading-relaxed">{article.imageCaption}</figcaption>}
                </figure>
              )}
              {article.docx && (
                <a href={article.docx} download className="btn-pill">
                  <Download className="w-4 h-4" />
                  Download Word file
                </a>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

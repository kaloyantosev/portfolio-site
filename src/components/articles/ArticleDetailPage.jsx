import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import ThreadPost from './ThreadPost';
import { PriceSince, ArticleFigure } from './MarketCharts';

// Renders an article body written in a small Markdown subset:
// "## " headings, "- " bullets, "1. " numbered lists, "> " quotes, blank-line paragraphs.
function ArticleBody({ text }) {
  // Normalise Windows line endings so block markers like [[chart:id]] match exactly.
  return text.replace(/\r\n?/g, '\n').trim().split(/\n\s*\n/).map((block, i) => {
    const lines = block.split('\n');
    const fig = block.match(/^\[\[chart:([\w-]+)\]\]$/);
    if (fig) return <ArticleFigure key={i} id={fig[1]} />;
    if (block.startsWith('## ')) {
      return <h2 key={i} className="font-serif text-3xl text-white !mt-12 mb-2">{block.slice(3)}</h2>;
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

      {/* Headline, with the market's price since publication beside it. */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:items-end">
        <div>
          <div className="section-label mb-4">{meta}</div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-[1.05]">{article.title}</h1>
          {article.subtitle && <p className="mt-4 text-lg text-citi-lightaccent">{article.subtitle}</p>}
          <div className="mt-6 h-px w-14 bg-gold" />
        </div>
        {article.priceSince && <PriceSince {...article.priceSince} />}
      </div>

      {/* Images float right; the text wraps around them and runs full width below. */}
      <article className="mt-12 text-lg text-slate-300 leading-relaxed [&>*+*]:mt-5 after:block after:clear-both">
        {(article.images?.length || article.thread || article.docx) && (
          <aside className="mb-8 lg:float-right lg:w-[45%] lg:ml-12 space-y-6">
            {article.images?.map(img => (
              <figure key={img.src}>
                <a href={img.src} target="_blank" rel="noreferrer">
                  <img src={img.src} alt={img.caption || article.title} className="w-full h-auto rounded-lg border border-white/10" />
                </a>
                {img.caption && <figcaption className="mt-3 text-sm text-citi-muted leading-relaxed">{img.caption}</figcaption>}
              </figure>
            ))}
            {article.thread && (
              <figure>
                <div className="rounded-2xl border border-white/10 bg-[#101010] p-5">
                  {article.thread.posts.map((post, i) => (
                    <ThreadPost key={i} {...article.thread} {...post} last={i === article.thread.posts.length - 1} />
                  ))}
                </div>
                <figcaption className="mt-3 text-sm text-citi-muted">
                  <a href={article.thread.url} target="_blank" rel="noreferrer" className="hover:text-white">The full thread on Threads ↗</a>
                </figcaption>
              </figure>
            )}
            {article.docx && (
              <a href={article.docx} download className="btn-pill">
                <Download className="w-4 h-4" />
                Download Word file
              </a>
            )}
          </aside>
        )}
        {article.summary && <p className="text-xl text-slate-100 leading-relaxed">{article.summary}</p>}
        {article.body
          ? <ArticleBody text={article.body} />
          : article.fullContent && <ArticleBody text={article.fullContent.replace(/^### /gm, '## ')} />}
      </article>
    </div>
  );
}

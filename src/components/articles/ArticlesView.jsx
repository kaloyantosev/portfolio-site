import React, { useState } from 'react';
import { investmentMemos, macroAnalyses } from '../../portfolioData';
import ArticleCard from './ArticleCard';
import ArticleDetailPage from './ArticleDetailPage';

export default function ArticlesView({ activeSubTab, setActiveSubTab, selectedArticleId, setSelectedArticleId }) {
  const all = [...investmentMemos, ...macroAnalyses];
  
  // If an article is selected, render the dedicated full sub-page
  if (selectedArticleId) {
    const activeArticle = all.find(a => a.id === selectedArticleId);
    if (activeArticle) {
      return (
        <ArticleDetailPage
          article={activeArticle}
          onBack={() => {
            setSelectedArticleId(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      );
    }
  }

  let list = activeSubTab === 'memos' ? investmentMemos : activeSubTab === 'macro' ? macroAnalyses : all;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 animate-fade">

      {/* Page Header */}
      <div className="border-b border-citi-blue/15 pb-8">
        <div className="section-label mb-3">Research Publications</div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-white">
          {activeSubTab === 'memos' ? 'Investment Memos' : activeSubTab === 'macro' ? 'Macro Analyses' : 'Articles'}
        </h1>
      </div>

      {/* Sub-tabs bar */}
      <div className="mt-6 flex items-center gap-6 border-b border-white/5 pb-0">
        {[
          { key: 'memos', label: `Investment Memos (${investmentMemos.length})` },
          { key: 'macro', label: `Macro Analyses (${macroAnalyses.length})` },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setActiveSubTab(t.key)}
            className={`text-sm pb-3 border-b-2 transition-colors ${
              activeSubTab === t.key
                ? 'text-white border-citi-lightblue'
                : 'text-citi-muted border-transparent hover:text-citi-silver'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Grid of Articles */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map(a => (
          <ArticleCard 
            key={a.id} 
            article={a} 
            onClick={() => {
              setSelectedArticleId(a.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
          />
        ))}
      </div>

      {list.length === 0 && (
        <div className="mt-20 text-center text-citi-muted text-sm py-16 border border-white/5">
          No articles in this category yet.
        </div>
      )}

    </div>
  );
}

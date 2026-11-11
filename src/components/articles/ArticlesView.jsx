import React from 'react';
import { investmentMemos, macroAnalyses } from '../../portfolioData';
import { PageHeader, SubTabs, ListRow, EmptyNote } from '../common/ListUI';
import ArticleDetailPage from './ArticleDetailPage';

export default function ArticlesView({ activeSubTab, setActiveSubTab, selectedArticleId, setSelectedArticleId }) {
  const activeArticle = selectedArticleId && [...investmentMemos, ...macroAnalyses].find(a => a.id === selectedArticleId);
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

  const list = activeSubTab === 'macro' ? macroAnalyses : investmentMemos;

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
      <PageHeader eyebrow="Research" title="Articles" />

      <SubTabs
        tabs={[
          { key: 'memos', label: 'Investment Memos', count: investmentMemos.length },
          { key: 'macro', label: 'Macro Analyses', count: macroAnalyses.length },
        ]}
        active={activeSubTab}
        onChange={setActiveSubTab}
      />

      <div>
        {list.map(a => (
          <ListRow
            key={a.id}
            meta={[a.ticker || a.assetClass, a.date].filter(Boolean).join(' · ')}
            title={a.title}
            subtitle={a.subtitle}
            text={a.summary}
            action="Read"
            onClick={() => {
              setSelectedArticleId(a.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ))}
      </div>

      {list.length === 0 && <EmptyNote>No articles in this category yet.</EmptyNote>}
    </div>
  );
}

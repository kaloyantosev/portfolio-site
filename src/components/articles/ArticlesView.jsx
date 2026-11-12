import React from 'react';
import { investmentMemos, macroAnalyses } from '../../portfolioData';
import { PageHeader, SubTabs, ListRow, EmptyNote } from '../common/ListUI';
import ArticleDetailPage from './ArticleDetailPage';
import PriceStory from './PriceStory';

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

  const list = activeSubTab === 'macro' ? macroAnalyses : activeSubTab === 'memos' ? investmentMemos : [...investmentMemos, ...macroAnalyses];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <PageHeader eyebrow="Research" title="Articles" />

      <SubTabs
        tabs={[
          { key: 'all', label: 'All', count: investmentMemos.length + macroAnalyses.length },
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
            media={a.priceSince && <PriceStory {...a.priceSince} compact />}
            meta={[a.ticker || a.assetClass, a.date].filter(Boolean).join(' · ')}
            title={a.title}
            text={a.priceSince ? a.subtitle : a.summary}
            subtitle={a.priceSince ? undefined : a.subtitle}
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

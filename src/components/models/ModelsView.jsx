import React from 'react';
import { customModels } from '../../portfolioData';
import { PageHeader, SubTabs, ListRow, EmptyNote } from '../common/ListUI';
import ModelDetailPage from './ModelDetailPage';
import CategoryArt from './CategoryArt';
import SitePreview from './SitePreview';

// Tab order. Each model names its group in portfolioData.js.
const GROUPS = ['Macro & Positioning', 'Commodities & Energy', 'Derivatives & Options'];

export default function ModelsView({ activeSubTab, setActiveSubTab, selectedModelId, setSelectedModelId }) {
  const open = (id) => {
    setSelectedModelId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeModel = selectedModelId && customModels.find(m => m.id === selectedModelId);
  if (activeModel) {
    return (
      <ModelDetailPage
        model={activeModel}
        onBack={() => {
          setSelectedModelId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  const tabs = [
    { key: 'all', label: 'All', count: customModels.length },
    ...GROUPS.map(g => ({ key: g, label: g, art: <CategoryArt group={g} />, count: customModels.filter(m => m.group === g).length })),
  ];
  const visible = activeSubTab === 'all' ? GROUPS : GROUPS.filter(g => g === activeSubTab);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <PageHeader eyebrow="Live Applications" title="Models">
        Interactive web applications for positioning, valuation, volatility and systematic strategy research.
      </PageHeader>

      <SubTabs tabs={tabs} active={activeSubTab} onChange={setActiveSubTab} />

      {visible.map(group => {
        const items = customModels.filter(m => m.group === group);
        if (!items.length) return null;
        return (
          <section key={group} className="mt-12">
            <div className="section-label pb-3">{group}</div>
            <div className="border-t border-white/10">
              {items.map(m => (
                <ListRow
                  key={m.id}
                  media={m.liveUrl && <SitePreview id={m.id} title={m.name} />}
                  meta={m.category}
                  title={m.name}
                  text={m.subtitle}
                  action="Open"
                  onClick={() => open(m.id)}
                />
              ))}
            </div>
          </section>
        );
      })}

      {customModels.length === 0 && <EmptyNote>No models available.</EmptyNote>}
    </div>
  );
}

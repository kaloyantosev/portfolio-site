import React from 'react';
import { tradingAlgos, investmentAlgos } from '../../portfolioData';
import { PageHeader, SubTabs, ListRow, EmptyNote } from '../common/ListUI';
import StrategyDetailPage from './StrategyDetailPage';
import ModelDetailPage from '../models/ModelDetailPage';
import CategoryArt from '../models/CategoryArt';
import SitePreview from '../models/SitePreview';

// Same layout as Models: illustrated category tabs, live previews, grouped sections.
const GROUPS = [
  { key: 'trading-algos', label: 'Trading Algos', items: tradingAlgos },
  { key: 'investment-algos', label: 'Investment Algos', items: investmentAlgos },
];

export default function StrategiesView({ activeSubTab, setActiveSubTab, selectedStrategyId, setSelectedStrategyId }) {
  const back = () => {
    setSelectedStrategyId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const active = selectedStrategyId && [...tradingAlgos, ...investmentAlgos].find(s => s.id === selectedStrategyId);
  if (active) {
    // Strategies with a live web app open like a model (embedded app); others use the detail page.
    return active.liveUrl
      ? <ModelDetailPage model={active} onBack={back} backLabel="Strategies" />
      : <StrategyDetailPage strategy={active} onBack={back} />;
  }

  const tabs = [
    { key: 'all', label: 'All', count: tradingAlgos.length + investmentAlgos.length },
    ...GROUPS.map(g => ({ key: g.key, label: g.label, art: <CategoryArt group={g.label} />, count: g.items.length })),
  ];
  const visible = activeSubTab === 'all' ? GROUPS : GROUPS.filter(g => g.key === activeSubTab);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <PageHeader eyebrow="Systematic" title="Strategies">
        Systematic trading and investment strategies, with live backtesting applications.
      </PageHeader>

      <SubTabs tabs={tabs} active={activeSubTab} onChange={setActiveSubTab} />

      {visible.map(g => g.items.length > 0 && (
        <section key={g.key} className="mt-12">
          <div className="section-label pb-3">{g.label}</div>
          <div className="border-t border-white/10">
            {g.items.map(s => (
              <ListRow
                key={s.id}
                media={s.liveUrl && <SitePreview url={s.liveUrl} title={s.name} />}
                meta={[s.type, s.vintage].filter(Boolean).join(' · ')}
                title={s.name}
                text={s.liveUrl ? s.subtitle : s.description}
                subtitle={s.liveUrl ? undefined : s.subtitle}
                action="Open"
                onClick={() => {
                  setSelectedStrategyId(s.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        </section>
      ))}

      {tradingAlgos.length + investmentAlgos.length === 0 && <EmptyNote>No strategies yet.</EmptyNote>}
    </div>
  );
}

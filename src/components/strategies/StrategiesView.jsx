import React from 'react';
import { tradingAlgos, investmentAlgos } from '../../portfolioData';
import { PageHeader, SubTabs, ListRow, EmptyNote } from '../common/ListUI';
import StrategyDetailPage from './StrategyDetailPage';

export default function StrategiesView({ activeSubTab, setActiveSubTab, selectedStrategyId, setSelectedStrategyId }) {
  const activeStrategy = selectedStrategyId && [...tradingAlgos, ...investmentAlgos].find(s => s.id === selectedStrategyId);
  if (activeStrategy) {
    return (
      <StrategyDetailPage
        strategy={activeStrategy}
        onBack={() => {
          setSelectedStrategyId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  const list = activeSubTab === 'investment-algos' ? investmentAlgos : tradingAlgos;

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
      <PageHeader eyebrow="Systematic" title="Strategies" />

      <SubTabs
        tabs={[
          { key: 'trading-algos', label: 'Trading Algos', count: tradingAlgos.length },
          { key: 'investment-algos', label: 'Investment Algos', count: investmentAlgos.length },
        ]}
        active={activeSubTab}
        onChange={setActiveSubTab}
      />

      <div>
        {list.map(s => (
          <ListRow
            key={s.id}
            meta={[s.type, s.vintage].filter(Boolean).join(' · ')}
            title={s.name}
            subtitle={s.subtitle}
            text={s.description}
            onClick={() => {
              setSelectedStrategyId(s.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ))}
      </div>

      {list.length === 0 && <EmptyNote>No strategies in this category yet.</EmptyNote>}
    </div>
  );
}

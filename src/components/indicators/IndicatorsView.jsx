import React from 'react';
import { customIndicators } from '../../portfolioData';
import { PageHeader, ListRow, EmptyNote } from '../common/ListUI';
import IndicatorDetailPage from './IndicatorDetailPage';

export default function IndicatorsView({ selectedIndicatorId, setSelectedIndicatorId }) {
  const activeIndicator = selectedIndicatorId && customIndicators.find(i => i.id === selectedIndicatorId);
  if (activeIndicator) {
    return (
      <IndicatorDetailPage
        indicator={activeIndicator}
        onBack={() => {
          setSelectedIndicatorId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
      <PageHeader eyebrow="Signals" title="Indicators" />

      <div className="border-t border-white/10">
        {customIndicators.map(ind => (
          <ListRow
            key={ind.id}
            meta={ind.timeframes?.join(' · ')}
            title={ind.name}
            subtitle={ind.subtitle}
            text={ind.description}
            onClick={() => {
              setSelectedIndicatorId(ind.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ))}
      </div>

      {customIndicators.length === 0 && <EmptyNote>No indicators available.</EmptyNote>}
    </div>
  );
}

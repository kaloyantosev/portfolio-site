import React from 'react';
import { tradingAlgos, investmentAlgos } from '../../portfolioData';
import StrategyCard from './StrategyCard';
import StrategyDetailPage from './StrategyDetailPage';

export default function StrategiesView({ activeSubTab, setActiveSubTab, selectedStrategyId, setSelectedStrategyId }) {
  const all = [...tradingAlgos, ...investmentAlgos];

  // If a strategy is selected, render the dedicated full sub-page
  if (selectedStrategyId) {
    const activeStrategy = all.find(s => s.id === selectedStrategyId);
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
  }

  let list = activeSubTab === 'trading-algos' ? tradingAlgos : activeSubTab === 'investment-algos' ? investmentAlgos : all;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 animate-fade">

      {/* Page Header */}
      <div className="border-b border-citi-blue/15 pb-8">
        <div className="section-label mb-3">Systematic Strategy Library</div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-white">
          {activeSubTab === 'trading-algos' ? 'Trading Algos' : activeSubTab === 'investment-algos' ? 'Investment Algos' : 'Custom Trading Strats'}
        </h1>
      </div>

      {/* Sub-tabs */}
      <div className="mt-6 flex items-center gap-6 border-b border-white/5 pb-0">
        {[
          { key: 'trading-algos', label: `Trading Algos (${tradingAlgos.length})` },
          { key: 'investment-algos', label: `Investment Algos (${investmentAlgos.length})` },
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

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map(s => (
          <StrategyCard 
            key={s.id} 
            strategy={s} 
            onClick={() => {
              setSelectedStrategyId(s.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
          />
        ))}
      </div>

      {list.length === 0 && (
        <div className="mt-20 text-center text-citi-muted text-sm py-16 border border-white/5">
          No strategies in this category yet.
        </div>
      )}

    </div>
  );
}

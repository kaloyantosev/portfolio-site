import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/home/HeroSection';
import ArticlesView from './components/articles/ArticlesView';
import StrategiesView from './components/strategies/StrategiesView';
import ModelsView from './components/models/ModelsView';
import IndicatorsView from './components/indicators/IndicatorsView';
import RecommendationsView from './components/recommendations/RecommendationsView';
import CertificatesView from './components/certificates/CertificatesView';
import CvView from './components/cv/CvView';
import ContactModal from './components/common/ContactModal';

// Sub-tab each tab opens on when no sub-tab is named.
const DEFAULT_SUB = { articles: 'memos', strategies: 'trading-algos', models: 'all' };

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Dedicated sub-page selected IDs
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [selectedStrategyId, setSelectedStrategyId] = useState(null);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [selectedIndicatorId, setSelectedIndicatorId] = useState(null);
  const [selectedCertId, setSelectedCertId] = useState(null);

  const clearDetails = () => {
    setSelectedArticleId(null);
    setSelectedStrategyId(null);
    setSelectedModelId(null);
    setSelectedIndicatorId(null);
    setSelectedCertId(null);
  };

  // One entry point for every link in the header, hero and footer.
  const navigate = (tab, sub) => {
    setActiveTab(tab);
    setActiveSubTab(sub ?? DEFAULT_SUB[tab] ?? null);
    clearDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switching a sub-tab closes any open detail page.
  const withClear = (setSelected) => (sub) => {
    setActiveSubTab(sub);
    setSelected(null);
  };

  const openContact = () => setIsContactOpen(true);

  return (
    <div className="min-h-screen bg-surface-900 text-slate-300 font-sans flex flex-col">
      <Navbar activeTab={activeTab} navigate={navigate} onOpenContact={openContact} />

      <main className="flex-grow">
        {activeTab === 'overview' && <HeroSection navigate={navigate} onOpenContact={openContact} />}

        {activeTab === 'cv' && <CvView />}

        {activeTab === 'articles' && (
          <ArticlesView
            activeSubTab={activeSubTab}
            setActiveSubTab={withClear(setSelectedArticleId)}
            selectedArticleId={selectedArticleId}
            setSelectedArticleId={setSelectedArticleId}
          />
        )}

        {activeTab === 'strategies' && (
          <StrategiesView
            activeSubTab={activeSubTab}
            setActiveSubTab={withClear(setSelectedStrategyId)}
            selectedStrategyId={selectedStrategyId}
            setSelectedStrategyId={setSelectedStrategyId}
          />
        )}

        {activeTab === 'models' && (
          <ModelsView
            activeSubTab={activeSubTab}
            setActiveSubTab={withClear(setSelectedModelId)}
            selectedModelId={selectedModelId}
            setSelectedModelId={setSelectedModelId}
          />
        )}

        {activeTab === 'indicators' && (
          <IndicatorsView
            selectedIndicatorId={selectedIndicatorId}
            setSelectedIndicatorId={setSelectedIndicatorId}
          />
        )}

        {activeTab === 'recommendations' && <RecommendationsView />}

        {activeTab === 'certificates' && (
          <CertificatesView
            selectedCertId={selectedCertId}
            setSelectedCertId={setSelectedCertId}
          />
        )}
      </main>

      <Footer navigate={navigate} onOpenContact={openContact} />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}

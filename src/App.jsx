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

export default function App() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'cv' | 'articles' | 'strategies' | 'models' | 'indicators' | 'recommendations' | 'certificates'
  const [activeSubTab, setActiveSubTab] = useState('memos'); // for articles: 'memos' | 'macro', for strategies: 'trading-algos' | 'investment-algos'
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Dedicated sub-page selected IDs
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [selectedStrategyId, setSelectedStrategyId] = useState(null);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [selectedIndicatorId, setSelectedIndicatorId] = useState(null);
  const [selectedLetterId, setSelectedLetterId] = useState(null);
  const [selectedCertId, setSelectedCertId] = useState(null);

  // Clear all sub-page states when navigating between major tabs
  const clearDetails = () => {
    setSelectedArticleId(null);
    setSelectedStrategyId(null);
    setSelectedModelId(null);
    setSelectedIndicatorId(null);
    setSelectedLetterId(null);
    setSelectedCertId(null);
  };

  return (
    <div className="min-h-screen bg-surface-900 text-slate-300 font-sans flex flex-col">

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
        onOpenContact={() => setIsContactOpen(true)}
        onClearDetail={clearDetails}
      />

      {/* Main Content View */}
      <main className="flex-grow">
        
        {/* Overview (Home) */}
        {activeTab === 'overview' && (
          <HeroSection
            setActiveTab={setActiveTab}
            setActiveSubTab={setActiveSubTab}
            onOpenContact={() => setIsContactOpen(true)}
            onClearDetail={clearDetails}
          />
        )}

        {/* CV Tab */}
        {activeTab === 'cv' && (
          <CvView />
        )}

        {/* Articles (Investment Memos & Macro Analyses) */}
        {activeTab === 'articles' && (
          <ArticlesView 
            activeSubTab={activeSubTab} 
            setActiveSubTab={(sub) => {
              setActiveSubTab(sub);
              setSelectedArticleId(null);
            }} 
            selectedArticleId={selectedArticleId}
            setSelectedArticleId={setSelectedArticleId}
          />
        )}

        {/* Custom Trading Strats (Trading Algos & Investment Algos) */}
        {activeTab === 'strategies' && (
          <StrategiesView 
            activeSubTab={activeSubTab} 
            setActiveSubTab={(sub) => {
              setActiveSubTab(sub);
              setSelectedStrategyId(null);
            }} 
            selectedStrategyId={selectedStrategyId}
            setSelectedStrategyId={setSelectedStrategyId}
          />
        )}

        {/* Custom Models */}
        {activeTab === 'models' && (
          <ModelsView 
            selectedModelId={selectedModelId}
            setSelectedModelId={setSelectedModelId}
          />
        )}

        {/* Custom Indicators */}
        {activeTab === 'indicators' && (
          <IndicatorsView 
            selectedIndicatorId={selectedIndicatorId}
            setSelectedIndicatorId={setSelectedIndicatorId}
          />
        )}

        {/* Letter of Recommendation */}
        {activeTab === 'recommendations' && (
          <RecommendationsView 
            selectedLetterId={selectedLetterId}
            setSelectedLetterId={setSelectedLetterId}
          />
        )}

        {/* Certificates & Awards */}
        {activeTab === 'certificates' && (
          <CertificatesView 
            selectedCertId={selectedCertId}
            setSelectedCertId={setSelectedCertId}
          />
        )}

      </main>

      {/* Institutional Footer */}
      <Footer
        setActiveTab={setActiveTab}
        setActiveSubTab={setActiveSubTab}
        onOpenContact={() => setIsContactOpen(true)}
        onClearDetail={clearDetails}
      />

      {/* Contact Inquiry Modal */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

    </div>
  );
}

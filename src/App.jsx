import React, { useState, useEffect } from 'react';
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
import { investmentMemos, macroAnalyses, tradingAlgos, investmentAlgos, customModels, customIndicators, certificatesAndAwards } from './portfolioData';

const ALL_ITEMS = [...investmentMemos, ...macroAnalyses, ...tradingAlgos, ...investmentAlgos, ...customModels, ...customIndicators, ...certificatesAndAwards];
const TAB_TITLES = {
  cv: 'Curriculum Vitae', articles: 'Research Articles', strategies: 'Trading & Investment Strategies',
  models: 'Market Models & Applications', indicators: 'Custom Indicators', recommendations: 'Letter of Recommendation',
  certificates: 'Certificates & Awards',
};

// Sub-tab each tab opens on when no sub-tab is named.
const DEFAULT_SUB = { articles: 'all', strategies: 'all', models: 'all', certificates: 'all' };
const TABS = ['cv', 'articles', 'strategies', 'models', 'indicators', 'recommendations', 'certificates'];

// Every view has its own URL, so the browser's Back button steps through the site:
//   /                        overview
//   /models                  a tab
//   /models?view=<sub-tab>   a tab filtered to a category
//   /models/<item-id>        a detail page
// vercel.json rewrites every path to index.html. Unknown paths fall back to the overview.
function readUrl() {
  const [, slug, id] = window.location.pathname.split('/');
  const tab = TABS.includes(slug) ? slug : 'overview';
  const view = new URLSearchParams(window.location.search).get('view');
  return { tab, sub: view ?? DEFAULT_SUB[tab] ?? null, detail: id ? decodeURIComponent(id) : null };
}

function writeUrl({ tab, sub, detail }) {
  let path = tab === 'overview' ? '/' : `/${tab}`;
  if (detail) path += `/${encodeURIComponent(detail)}`;
  else if (sub && sub !== DEFAULT_SUB[tab]) path += `?view=${encodeURIComponent(sub)}`;
  if (window.location.pathname + window.location.search !== path) window.history.pushState(null, '', path);
}

export default function App() {
  const [route, setRoute] = useState(readUrl);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Browser back/forward
  useEffect(() => {
    const onPop = () => setRoute(readUrl());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const go = next => {
    setRoute(next);
    writeUrl(next);
  };

  // One entry point for every link in the header, hero and footer.
  const navigate = (tab, sub, detail = null) => {
    go({ tab, sub: sub ?? DEFAULT_SUB[tab] ?? null, detail });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const setSub = sub => go({ ...route, sub, detail: null });
  const setDetail = detail => go({ ...route, detail });

  const { tab: activeTab, sub: activeSubTab, detail } = route;

  // Per-page browser title, so each link reads well in search results and shares.
  useEffect(() => {
    const item = detail && ALL_ITEMS.find(i => i.id === detail);
    const page = item ? item.name || item.title : TAB_TITLES[activeTab];
    document.title = page ? `${page} — Kaloyan Tosev` : 'Kaloyan Tosev — Quantitative Trader & Commodities / Energy Markets Analyst';
  }, [activeTab, detail]);
  const openContact = () => setIsContactOpen(true);

  return (
    <div className="min-h-screen bg-surface-900 text-slate-300 font-sans flex flex-col">
      <Navbar activeTab={activeTab} navigate={navigate} onOpenContact={openContact} />

      {/* Inner pages render 10% smaller than the homepage. */}
      <main className={`flex-grow ${activeTab === 'overview' ? '' : 'inner-page'}`}>
        {activeTab === 'overview' && <HeroSection navigate={navigate} onOpenContact={openContact} />}

        {activeTab === 'cv' && <CvView />}

        {activeTab === 'articles' && (
          <ArticlesView activeSubTab={activeSubTab} setActiveSubTab={setSub} selectedArticleId={detail} setSelectedArticleId={setDetail} />
        )}

        {activeTab === 'strategies' && (
          <StrategiesView activeSubTab={activeSubTab} setActiveSubTab={setSub} selectedStrategyId={detail} setSelectedStrategyId={setDetail} />
        )}

        {activeTab === 'models' && (
          <ModelsView activeSubTab={activeSubTab} setActiveSubTab={setSub} selectedModelId={detail} setSelectedModelId={setDetail} />
        )}

        {activeTab === 'indicators' && (
          <IndicatorsView selectedIndicatorId={detail} setSelectedIndicatorId={setDetail} />
        )}

        {activeTab === 'recommendations' && <RecommendationsView />}

        {activeTab === 'certificates' && (
          <CertificatesView activeSubTab={activeSubTab} setActiveSubTab={setSub} selectedCertId={detail} setSelectedCertId={setDetail} />
        )}
      </main>

      <Footer navigate={navigate} onOpenContact={openContact} />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}

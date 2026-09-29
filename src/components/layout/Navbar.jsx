import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, activeSubTab, setActiveSubTab, onOpenContact, onClearDetail }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (tab, sub = null) => {
    setActiveTab(tab);
    if (sub) setActiveSubTab(sub);
    if (onClearDetail) onClearDetail();
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navBtn = (tab) =>
    `text-sm transition-colors pb-1 ${activeTab === tab
      ? 'text-white border-b-2 border-citi-lightblue'
      : 'text-citi-muted hover:text-slate-200 border-b-2 border-transparent'}`;

  return (
    <header className={`sticky top-0 z-40 transition-all duration-200 ${
      scrolled
        ? 'bg-navy-900/95 backdrop-blur-md border-b border-citi-blue/20 shadow-xl shadow-black/40'
        : 'bg-navy-900/85 backdrop-blur-sm border-b border-white/5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Top Left: Name & "Portfolio & Achievements" */}
          <div
            onClick={() => go('overview')}
            className="cursor-pointer select-none group"
          >
            <div className="text-white text-sm font-medium tracking-widest uppercase group-hover:text-citi-accent transition-colors">
              Kaloyan Tosev
            </div>
            <div className="text-citi-muted text-[10px] tracking-wider uppercase font-sans">
              Portfolio & Achievements
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 h-full">

            {/* CV Tab */}
            <button onClick={() => go('cv')} className={navBtn('cv')}>
              CV
            </button>

            {/* Articles Dropdown (Compact, tightly fitted dropdown menu) */}
            <div className="relative group h-full flex items-center">
              <span
                className={`text-sm cursor-default transition-colors flex items-center gap-1 pb-1 ${
                  activeTab === 'articles'
                    ? 'text-white border-b-2 border-citi-lightblue'
                    : 'text-citi-muted group-hover:text-slate-200 border-b-2 border-transparent'
                }`}
              >
                <span>Articles</span>
                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />
              </span>

              {/* Tightly fitted menu container */}
              <div className="absolute top-full left-0 pt-0 hidden group-hover:block z-50">
                <div className="w-max min-w-[150px] bg-navy-850 border border-citi-blue/25 shadow-2xl shadow-black/80 py-1 mt-0">
                  <button
                    onClick={() => go('articles', 'memos')}
                    className={`w-full text-left px-3.5 py-2 text-xs font-sans whitespace-nowrap transition-colors ${
                      activeTab === 'articles' && activeSubTab === 'memos'
                        ? 'text-white bg-citi-blue/20 font-medium'
                        : 'text-citi-silver hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Investment Memos
                  </button>
                  <button
                    onClick={() => go('articles', 'macro')}
                    className={`w-full text-left px-3.5 py-2 text-xs font-sans whitespace-nowrap transition-colors ${
                      activeTab === 'articles' && activeSubTab === 'macro'
                        ? 'text-white bg-citi-blue/20 font-medium'
                        : 'text-citi-silver hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Macro Analyses
                  </button>
                </div>
              </div>
            </div>

            {/* Custom Trading Strats Dropdown (Compact, tightly fitted dropdown menu) */}
            <div className="relative group h-full flex items-center">
              <span
                className={`text-sm cursor-default transition-colors flex items-center gap-1 pb-1 ${
                  activeTab === 'strategies'
                    ? 'text-white border-b-2 border-citi-lightblue'
                    : 'text-citi-muted group-hover:text-slate-200 border-b-2 border-transparent'
                }`}
              >
                <span>Custom Trading Strats</span>
                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />
              </span>

              {/* Tightly fitted menu container */}
              <div className="absolute top-full left-0 pt-0 hidden group-hover:block z-50">
                <div className="w-max min-w-[150px] bg-navy-850 border border-citi-blue/25 shadow-2xl shadow-black/80 py-1 mt-0">
                  <button
                    onClick={() => go('strategies', 'trading-algos')}
                    className={`w-full text-left px-3.5 py-2 text-xs font-sans whitespace-nowrap transition-colors ${
                      activeTab === 'strategies' && activeSubTab === 'trading-algos'
                        ? 'text-white bg-citi-blue/20 font-medium'
                        : 'text-citi-silver hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Trading Algos
                  </button>
                  <button
                    onClick={() => go('strategies', 'investment-algos')}
                    className={`w-full text-left px-3.5 py-2 text-xs font-sans whitespace-nowrap transition-colors ${
                      activeTab === 'strategies' && activeSubTab === 'investment-algos'
                        ? 'text-white bg-citi-blue/20 font-medium'
                        : 'text-citi-silver hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Investment Algos
                  </button>
                </div>
              </div>
            </div>

            {/* Custom Models Tab */}
            <button onClick={() => go('models')} className={navBtn('models')}>
              Custom Models
            </button>

            {/* Custom Indicators Tab */}
            <button onClick={() => go('indicators')} className={navBtn('indicators')}>
              Custom Indicators
            </button>

            {/* Letter of Recommendation Tab (Direct to LOR) */}
            <button onClick={() => go('recommendations')} className={navBtn('recommendations')}>
              Letter of Rec.
            </button>

            {/* Certificates & Awards Tab */}
            <button onClick={() => go('certificates')} className={navBtn('certificates')}>
              Certificates & Awards
            </button>
          </nav>

          {/* Contact Action */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={onOpenContact}
              className="text-xs font-medium uppercase tracking-wider px-4 py-1.5 bg-citi-lightblue text-white hover:bg-citi-accent transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-citi-muted hover:text-white">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy-900 border-t border-white/5 px-6 py-4 space-y-1">
          {[
            { label: 'CV', tab: 'cv', sub: null },
            { label: 'Articles — Investment Memos', tab: 'articles', sub: 'memos' },
            { label: 'Articles — Macro Analyses', tab: 'articles', sub: 'macro' },
            { label: 'Custom Trading Strats — Trading Algos', tab: 'strategies', sub: 'trading-algos' },
            { label: 'Custom Trading Strats — Investment Algos', tab: 'strategies', sub: 'investment-algos' },
            { label: 'Custom Models', tab: 'models', sub: null },
            { label: 'Custom Indicators', tab: 'indicators', sub: null },
            { label: 'Letter of Recommendation', tab: 'recommendations', sub: null },
            { label: 'Certificates & Awards', tab: 'certificates', sub: null },
          ].map(({ label, tab, sub }) => (
            <button
              key={label}
              onClick={() => go(tab, sub)}
              className={`w-full text-left py-2.5 text-sm border-b border-white/5 ${
                activeTab === tab && (!sub || activeSubTab === sub) ? 'text-white font-medium' : 'text-citi-muted'
              }`}
            >
              {label}
            </button>
          ))}
          <div className="pt-3">
            <button
              onClick={() => { setMobileOpen(false); onOpenContact(); }}
              className="w-full py-2.5 text-center text-sm font-medium uppercase tracking-wider bg-citi-lightblue text-white"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

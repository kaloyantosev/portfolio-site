import React from 'react';

export default function Footer({ setActiveTab, setActiveSubTab, onOpenContact, onClearDetail }) {
  const go = (tab, sub = null) => {
    setActiveTab(tab);
    if (sub) setActiveSubTab(sub);
    if (onClearDetail) onClearDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-citi-blue/15 bg-navy-950 mt-24 text-xs text-citi-muted font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div 
              onClick={() => go('overview')}
              className="text-white text-sm font-medium tracking-widest uppercase cursor-pointer hover:text-citi-accent transition-colors"
            >
              Kaloyan Tosev
            </div>
            <div className="text-[10px] uppercase font-mono text-citi-muted">Portfolio & Achievements</div>
            <p className="text-citi-muted/70 leading-relaxed text-xs max-w-xs">
              Quantitative investment research, systematic strategy design, and financial model engineering.
            </p>
          </div>

          {/* Research */}
          <div className="space-y-3">
            <div className="section-label mb-3">Research</div>
            <ul className="space-y-2">
              <li><button onClick={() => go('articles', 'memos')} className="hover:text-white transition-colors">Investment Memos</button></li>
              <li><button onClick={() => go('articles', 'macro')} className="hover:text-white transition-colors">Macro Analyses</button></li>
            </ul>
          </div>

          {/* Quantitative */}
          <div className="space-y-3">
            <div className="section-label mb-3">Quantitative</div>
            <ul className="space-y-2">
              <li><button onClick={() => go('strategies', 'trading-algos')} className="hover:text-white transition-colors">Trading Algos</button></li>
              <li><button onClick={() => go('strategies', 'investment-algos')} className="hover:text-white transition-colors">Investment Algos</button></li>
              <li><button onClick={() => go('models')} className="hover:text-white transition-colors">Custom Models</button></li>
              <li><button onClick={() => go('indicators')} className="hover:text-white transition-colors">Custom Indicators</button></li>
            </ul>
          </div>

          {/* Credentials & Contact */}
          <div className="space-y-3">
            <div className="section-label mb-3">Credentials & Contact</div>
            <ul className="space-y-2">
              <li><button onClick={() => go('cv')} className="hover:text-white transition-colors">Curriculum Vitae (CV)</button></li>
              <li><button onClick={() => go('certificates')} className="hover:text-white transition-colors">Certificates & Awards</button></li>
              <li><button onClick={() => go('recommendations')} className="hover:text-white transition-colors">Letter of Recommendation</button></li>
              <li><button onClick={onOpenContact} className="hover:text-white transition-colors">Direct Inquiry</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-citi-muted/50 tracking-wide">© {new Date().getFullYear()} Kaloyan Tosev. Private &amp; Confidential.</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-citi-muted/50 hover:text-white transition-colors tracking-wider uppercase">
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}

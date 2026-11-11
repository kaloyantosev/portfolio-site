import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

// Flat header: one link per section. Sub-categories live inside each page.
export const NAV_LINKS = [
  { label: 'CV', tab: 'cv' },
  { label: 'Articles', tab: 'articles' },
  { label: 'Strategies', tab: 'strategies' },
  { label: 'Models', tab: 'models' },
  { label: 'Indicators', tab: 'indicators' },
  { label: 'Recommendation', tab: 'recommendations' },
  { label: 'Certificates', tab: 'certificates' },
];

export default function Navbar({ activeTab, navigate, onOpenContact }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (tab) => {
    setMobileOpen(false);
    navigate(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-surface-900/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        <button
          onClick={() => go('overview')}
          className="text-white text-sm font-medium tracking-widest uppercase hover:text-citi-accent transition-colors"
        >
          Kaloyan Tosev
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(({ label, tab }) => (
            <button
              key={tab}
              onClick={() => go(tab)}
              className={`text-sm transition-colors ${
                activeTab === tab ? 'text-white' : 'text-citi-muted hover:text-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={onOpenContact}
            className="text-sm text-citi-accent hover:text-white transition-colors"
          >
            Contact
          </button>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-citi-muted hover:text-white"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden px-6 pb-4 border-t border-white/10">
          {NAV_LINKS.map(({ label, tab }) => (
            <button
              key={tab}
              onClick={() => go(tab)}
              className={`block w-full text-left py-3 text-sm border-b border-white/5 ${
                activeTab === tab ? 'text-white' : 'text-citi-muted'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => { setMobileOpen(false); onOpenContact(); }}
            className="block w-full text-left py-3 text-sm text-citi-accent"
          >
            Contact
          </button>
        </nav>
      )}
    </header>
  );
}

import React from 'react';
import { NAV_LINKS } from './Navbar';

export default function Footer({ navigate, onOpenContact }) {
  return (
    <footer className="mt-24 border-t border-white/10 text-xs text-citi-muted">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <span>© {new Date().getFullYear()} Kaloyan Tosev</span>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV_LINKS.map(({ label, tab }) => (
            <button key={tab} onClick={() => navigate(tab)} className="hover:text-white transition-colors">
              {label}
            </button>
          ))}
          <button onClick={onOpenContact} className="hover:text-white transition-colors">Contact</button>
        </nav>
      </div>
    </footer>
  );
}

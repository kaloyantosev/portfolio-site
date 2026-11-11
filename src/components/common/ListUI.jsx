import React from 'react';
import { ArrowUpRight } from 'lucide-react';

// Shared building blocks for every list page: no cards, just type and hairlines.

export function PageHeader({ eyebrow, title, children }) {
  return (
    <div className="pb-10">
      {eyebrow && <div className="section-label mb-3">{eyebrow}</div>}
      <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight">{title}</h1>
      {children && <p className="mt-4 max-w-2xl text-citi-muted leading-relaxed">{children}</p>}
    </div>
  );
}

export function SubTabs({ tabs, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-white/10">
      {tabs.map(t => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`pb-3 -mb-px text-sm border-b-2 transition-colors ${
            active === t.key
              ? 'text-white border-citi-lightblue'
              : 'text-citi-muted border-transparent hover:text-slate-200'
          }`}
        >
          {t.label}
          {t.count != null && <span className="ml-2 text-xs text-citi-muted/60">{t.count}</span>}
        </button>
      ))}
    </div>
  );
}

export function ListRow({ meta, title, subtitle, text, action = 'View', onClick }) {
  return (
    <button
      onClick={onClick}
      className="group grid w-full text-left md:grid-cols-[11rem_1fr_auto] gap-x-10 gap-y-2 py-7 border-b border-white/10 transition-colors"
    >
      <span className="text-xs font-mono text-citi-muted pt-1">{meta}</span>
      <span className="block">
        <span className="block text-white text-lg font-medium group-hover:text-citi-accent transition-colors">{title}</span>
        {subtitle && <span className="block mt-1 text-sm text-citi-lightaccent">{subtitle}</span>}
        {text && <span className="block mt-3 text-sm text-citi-muted leading-relaxed line-clamp-2">{text}</span>}
      </span>
      <span className="flex items-center gap-1 text-sm text-citi-muted group-hover:text-white transition-colors md:pt-1">
        {action} <ArrowUpRight className="w-4 h-4" />
      </span>
    </button>
  );
}

export function EmptyNote({ children }) {
  return <p className="py-16 text-citi-muted text-sm">{children}</p>;
}

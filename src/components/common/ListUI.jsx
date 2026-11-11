import React from 'react';
import { ArrowUpRight } from 'lucide-react';

// Shared building blocks for every list page: no cards, just type and hairlines.

export function PageHeader({ eyebrow, title, children }) {
  return (
    <div className="pb-12">
      {eyebrow && <div className="section-label mb-4">{eyebrow}</div>}
      <h1 className="font-serif text-4xl sm:text-6xl font-medium text-white leading-[1.05]">{title}</h1>
      <div className="mt-6 h-px w-14 bg-gold" />
      {children && <p className="mt-6 max-w-2xl text-citi-muted leading-relaxed">{children}</p>}
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
          className={`pb-3 -mb-px text-sm border-b transition-colors ${
            active === t.key
              ? 'text-white border-white'
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
      className="group grid w-full text-left md:grid-cols-[11rem_1fr_auto] gap-x-10 gap-y-2 py-8 border-b border-white/10 hover:border-white/40 transition-colors"
    >
      <span className="text-[11px] uppercase tracking-[0.18em] text-citi-muted pt-2">{meta}</span>
      <span className="block">
        <span className="block font-serif text-2xl sm:text-[1.7rem] leading-tight text-white group-hover:text-white/80 transition-colors">{title}</span>
        {subtitle && <span className="block mt-2 text-sm text-citi-lightaccent">{subtitle}</span>}
        {text && <span className="block mt-3 text-sm text-citi-muted leading-relaxed line-clamp-2">{text}</span>}
      </span>
      <span className="flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-citi-muted group-hover:text-white transition-colors md:pt-2">
        {action} <ArrowUpRight className="w-4 h-4" />
      </span>
    </button>
  );
}

export function EmptyNote({ children }) {
  return <p className="py-16 text-citi-muted text-sm">{children}</p>;
}

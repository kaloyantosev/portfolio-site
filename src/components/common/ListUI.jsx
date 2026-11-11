import React from 'react';
import { ArrowUpRight } from 'lucide-react';

// Shared building blocks for every list page: no cards, just type and hairlines.

export function PageHeader({ eyebrow, title, children }) {
  return (
    <div className="pb-12">
      {eyebrow && <div className="section-label mb-4">{eyebrow}</div>}
      <h1 className="font-serif text-4xl sm:text-6xl font-medium text-white leading-[1.05]">{title}</h1>
      <div className="mt-6 h-px w-14 bg-gold" />
      {children && <p className="mt-6 max-w-2xl text-lg text-slate-300 leading-relaxed">{children}</p>}
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

// wide: a 16rem left column (for thumbnails). image: shown in that column instead
// of the meta text, which then moves above the title.
export function ListRow({ meta, title, subtitle, text, image, wide, action = 'View', onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group grid w-full text-left ${wide ? 'md:grid-cols-[16rem_1fr_auto]' : 'md:grid-cols-[11rem_1fr_auto]'} gap-x-10 gap-y-3 py-8 border-b border-white/10 hover:border-white/40 transition-colors`}
    >
      {image ? (
        <img
          src={image}
          alt=""
          loading="lazy"
          className="w-full max-w-[16rem] h-auto rounded-md opacity-90 group-hover:opacity-100 transition-opacity"
        />
      ) : (
        <span className="text-xs uppercase tracking-[0.18em] text-citi-muted pt-2">{meta}</span>
      )}
      <span className="block">
        {image && meta && <span className="block mb-2 text-xs uppercase tracking-[0.18em] text-citi-muted">{meta}</span>}
        <span className="block font-serif text-2xl sm:text-[1.8rem] leading-tight text-white group-hover:text-white/80 transition-colors">{title}</span>
        {subtitle && <span className="block mt-2 text-base text-citi-lightaccent">{subtitle}</span>}
        {text && <span className="block mt-3 text-base text-slate-300 leading-relaxed line-clamp-2">{text}</span>}
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

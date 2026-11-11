import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function CertificateDetailPage({ item, onBack }) {
  if (!item) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-citi-muted hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Certificates & Awards
      </button>

      <div className="mt-10">
        <div className="section-label mb-4">{item.institution} · {item.date}</div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-[1.05]">{item.title}</h1>
        {item.instructor && <p className="mt-4 text-citi-lightaccent text-lg">{item.instructor}</p>}
        <div className="mt-6 h-px w-14 bg-gold" />
      </div>

      {item.summary && <p className="mt-8 max-w-4xl text-slate-300 text-lg leading-relaxed">{item.summary}</p>}

      {item.skills?.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {item.skills.map(s => (
            <span key={s} className="rounded-full border border-white/20 px-4 py-1.5 text-xs tracking-wide text-slate-200">{s}</span>
          ))}
        </div>
      )}

      {item.image && (
        <img
          src={item.image}
          alt={`${item.title} certificate`}
          loading="lazy"
          className="mt-12 w-full h-auto rounded-xl"
        />
      )}

      {item.details?.length > 0 && (
        <div className="mt-12">
          <div className="section-label mb-2">Completed work</div>
          <ul className="border-t border-white/10">
            {item.details.map((d, i) => (
              <li key={i} className="flex gap-6 py-5 border-b border-white/10 text-slate-200 leading-relaxed">
                <span className="font-serif text-citi-muted">{String(i + 1).padStart(2, '0')}</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

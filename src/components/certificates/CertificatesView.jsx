import React from 'react';
import { certificatesAndAwards } from '../../portfolioData';
import { ArrowUpRight, Calendar, Building } from 'lucide-react';
import CertificateDetailPage from './CertificateDetailPage';

export default function CertificatesView({ selectedCertId, setSelectedCertId }) {
  if (selectedCertId) {
    const activeItem = certificatesAndAwards.find(c => c.id === selectedCertId);
    if (activeItem) {
      return (
        <CertificateDetailPage
          item={activeItem}
          onBack={() => {
            setSelectedCertId(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      );
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      
      <div className="border-b border-citi-blue/15 pb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">Certificates & Awards</h1>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        {certificatesAndAwards.map(c => (
          <div 
            key={c.id} 
            onClick={() => {
              setSelectedCertId(c.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="bank-card p-7 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Date */}
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-citi-accent font-medium">{c.institution}</span>
                <span className="text-citi-muted flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {c.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-base sm:text-lg group-hover:text-citi-accent transition-colors leading-snug font-sans">
                {c.title}
              </h3>
              
              {/* Lighter Blue Subtitle */}
              {c.instructor && (
                <div className="flex items-center gap-1.5 mt-2 text-sm font-medium text-citi-lightaccent">
                  <Building className="w-4 h-4 text-citi-accent shrink-0" />
                  <span>{c.instructor}</span>
                </div>
              )}

              {/* Summary text */}
              <p className="text-slate-300 text-sm mt-4 leading-relaxed line-clamp-3 font-sans">
                {c.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
              <span className="text-sm font-medium text-slate-200 group-hover:text-citi-accent flex items-center gap-1.5 transition-colors">
                View <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

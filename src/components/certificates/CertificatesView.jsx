import React from 'react';
import { certificatesAndAwards } from '../../portfolioData';
import { PageHeader, ListRow, EmptyNote } from '../common/ListUI';
import CertificateDetailPage from './CertificateDetailPage';

export default function CertificatesView({ selectedCertId, setSelectedCertId }) {
  const activeItem = selectedCertId && certificatesAndAwards.find(c => c.id === selectedCertId);
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

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <PageHeader eyebrow="Credentials" title="Certificates & Awards" />

      <div className="border-t border-white/10">
        {certificatesAndAwards.map(c => (
          <ListRow
            key={c.id}
            meta={`${c.institution} · ${c.date}`}
            title={c.title}
            subtitle={c.instructor}
            text={c.summary}
            onClick={() => {
              setSelectedCertId(c.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ))}
      </div>

      {certificatesAndAwards.length === 0 && <EmptyNote>No certificates available.</EmptyNote>}
    </div>
  );
}

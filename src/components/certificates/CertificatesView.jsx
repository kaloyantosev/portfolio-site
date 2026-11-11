import React from 'react';
import { certificatesAndAwards } from '../../portfolioData';
import { PageHeader, SubTabs, ListRow, EmptyNote } from '../common/ListUI';
import CertificateDetailPage from './CertificateDetailPage';

// Tab order. Each certificate names its group in portfolioData.js.
const GROUPS = ['Markets & Trading', 'Risk & Investment', 'Data & AI', 'Academic', 'Awards'];

export default function CertificatesView({ activeSubTab, setActiveSubTab, selectedCertId, setSelectedCertId }) {
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

  const tabs = [
    { key: 'all', label: 'All', count: certificatesAndAwards.length },
    ...GROUPS.map(g => ({ key: g, label: g, count: certificatesAndAwards.filter(c => c.group === g).length })),
  ];
  const list = activeSubTab === 'all' ? certificatesAndAwards : certificatesAndAwards.filter(c => c.group === activeSubTab);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <PageHeader eyebrow="Credentials" title="Certificates & Awards" />

      <SubTabs tabs={tabs} active={activeSubTab} onChange={setActiveSubTab} />

      <div>
        {list.map(c => (
          <ListRow
            key={c.id}
            meta={`${c.institution} · ${c.date}`}
            title={c.title}
            subtitle={c.instructor || c.skills?.join(' · ')}
            text={c.summary}
            onClick={() => {
              setSelectedCertId(c.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ))}
      </div>

      {list.length === 0 && <EmptyNote>No certificates in this category yet.</EmptyNote>}
    </div>
  );
}

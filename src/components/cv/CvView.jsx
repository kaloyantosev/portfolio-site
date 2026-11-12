import React from 'react';
import { Download } from 'lucide-react';
import { profileConfig } from '../../portfolioData';
import DocumentViewer from '../common/DocumentViewer';

export default function CvView() {
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10">
        <div>
          <div className="section-label mb-3">Credentials</div>
          <h1 className="text-4xl sm:text-6xl font-serif font-medium text-white">Curriculum Vitae</h1>
        </div>
        <a
          href={profileConfig.cvPdfUrl || '/cv.pdf'}
          download="Kaloyan_Tosev_CV.pdf"
          className="btn-pill self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </a>
      </div>

      <div className="border-t border-white/10 pt-6">
        <DocumentViewer pages={[
          { src: '/cv_page_1.png', alt: 'Kaloyan Tosev CV - Page 1' },
          { src: '/cv_page_2.png', alt: 'Kaloyan Tosev CV - Page 2' },
        ]} />
      </div>
    </div>
  );
}

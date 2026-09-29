import React from 'react';
import { Download, FileText, ShieldCheck } from 'lucide-react';
import { profileConfig } from '../../portfolioData';

export default function CvView() {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="border-b border-citi-blue/15 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="section-label mb-3">Curriculum Vitae & Credentials</div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">Curriculum Vitae</h1>
          <p className="text-slate-300 text-base mt-1.5 font-sans">
            Official professional resume and academic credentials for Kaloyan Tosev.
          </p>
        </div>

        {/* Download PDF Action */}
        <div className="flex items-center gap-3">
          <a
            href={profileConfig.cvPdfUrl || "/cv.pdf"}
            download="Kaloyan_Tosev_CV.pdf"
            className="flex items-center gap-2 px-5 py-2.5 bg-citi-lightblue text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-citi-accent transition-colors shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Embedded Document Container */}
      <div className="mt-8">
        <div className="bg-navy-900 border border-citi-blue/20 overflow-hidden">
          
          {/* Top Bar of Viewer */}
          <div className="px-6 py-3.5 bg-navy-950 border-b border-white/5 flex items-center justify-between text-xs font-mono text-citi-muted">
            <div className="flex items-center gap-2 text-slate-200">
              <FileText className="w-4 h-4 text-citi-accent" />
              <span>Kaloyan_Tosev_CV.pdf</span>
            </div>
            <div className="text-citi-accent font-sans text-xs font-medium tracking-wide">
              Official Document
            </div>
          </div>

          {/* Full-Size Seamless Document Pages */}
          <div className="w-full bg-surface-900 p-2 sm:p-6 flex flex-col items-center justify-center gap-6">
            <div className="w-full bg-white shadow-2xl p-2 sm:p-4 border border-citi-blue/20">
              <img
                src="/cv_page_1.png"
                alt="Kaloyan Tosev CV - Page 1"
                className="w-full h-auto object-contain select-none"
              />
            </div>
            
            <div className="w-full bg-white shadow-2xl p-2 sm:p-4 border border-citi-blue/20">
              <img
                src="/cv_page_2.png"
                alt="Kaloyan Tosev CV - Page 2"
                className="w-full h-auto object-contain select-none"
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

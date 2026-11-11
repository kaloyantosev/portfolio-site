import React from 'react';
import { X, Mail, Phone } from 'lucide-react';
import { profileConfig } from '../../portfolioData';

// lucide-react v1 dropped brand icons, so the LinkedIn mark is inline.
function LinkedInIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const { email, phone, linkedin } = profileConfig;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-navy-950/85 backdrop-blur-md" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Contact"
        className="relative w-full max-w-lg rounded-3xl bg-surface-800/95 border border-white/10 p-8 sm:p-10 shadow-2xl shadow-black/70"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} aria-label="Close" className="absolute top-6 right-6 text-citi-muted hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="section-label mb-3">Get in touch</div>
        <h2 className="font-serif text-4xl font-medium text-white">Contact</h2>
        <div className="mt-5 h-px w-14 bg-gold" />

        <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
          <a href={`mailto:${email}`} className="group flex items-center gap-4 py-5">
            <Mail className="w-5 h-5 text-citi-muted group-hover:text-white transition-colors shrink-0" />
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-citi-muted">Email</div>
              <div className="mt-1 text-white group-hover:text-white/80 transition-colors">{email}</div>
            </div>
          </a>

          <div className="flex items-start gap-4 py-5">
            <Phone className="w-5 h-5 text-citi-muted shrink-0 mt-1" />
            <div className="space-y-2">
              <div className="text-[11px] uppercase tracking-[0.18em] text-citi-muted">Phone</div>
              <a href={`tel:${phone.local.replace(/\s/g, '')}`} className="block text-white hover:text-white/80 transition-colors">
                {phone.local} <span className="ml-2 text-xs text-citi-muted">Bulgaria</span>
              </a>
              <a href={`tel:${phone.intl.replace(/\s/g, '')}`} className="block text-white hover:text-white/80 transition-colors">
                {phone.intl} <span className="ml-2 text-xs text-citi-muted">International</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white hover:text-navy-950 transition-colors"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>
          <button onClick={onClose} className="btn-pill">Close</button>
        </div>
      </div>
    </div>
  );
}

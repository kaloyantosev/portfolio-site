import React from 'react';
import { X, Mail, Globe, Link2, MapPin } from 'lucide-react';
import { profileConfig } from '../../portfolioData';

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-navy-950/90 backdrop-blur-md animate-fade" onClick={onClose}>
      <div className="relative w-full max-w-md bg-surface-800 border border-citi-blue/20 shadow-2xl shadow-black/70" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-white/5 flex items-start justify-between">
          <div>
            <div className="section-label mb-1">Direct Inquiry</div>
            <h2 className="font-serif text-xl font-medium text-white">Contact</h2>
          </div>
          <button onClick={onClose} className="text-citi-muted hover:text-white transition-colors ml-4">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-2">
          {profileConfig.email && (
            <a href={`mailto:${profileConfig.email}`}
              className="flex items-center gap-3 p-3.5 border border-white/5 hover:border-citi-blue/30 bg-navy-800/40 hover:bg-navy-800 transition-colors group">
              <Mail className="w-4 h-4 text-citi-lightblue shrink-0" />
              <div>
                <div className="text-[9px] font-mono text-citi-muted uppercase tracking-wider mb-0.5">Email</div>
                <div className="text-sm text-citi-silver group-hover:text-white transition-colors">{profileConfig.email}</div>
              </div>
            </a>
          )}
          {profileConfig.linkedin && (
            <a href={profileConfig.linkedin} target="_blank" rel="noreferrer"
              className="flex items-center gap-3 p-3.5 border border-white/5 hover:border-citi-blue/30 bg-navy-800/40 hover:bg-navy-800 transition-colors group">
              <Globe className="w-4 h-4 text-citi-lightblue shrink-0" />
              <div>
                <div className="text-[9px] font-mono text-citi-muted uppercase tracking-wider mb-0.5">LinkedIn</div>
                <div className="text-sm text-citi-silver group-hover:text-white transition-colors">{profileConfig.linkedin}</div>
              </div>
            </a>
          )}
          {profileConfig.github && (
            <a href={profileConfig.github} target="_blank" rel="noreferrer"
              className="flex items-center gap-3 p-3.5 border border-white/5 hover:border-citi-blue/30 bg-navy-800/40 hover:bg-navy-800 transition-colors group">
              <Link2 className="w-4 h-4 text-citi-lightblue shrink-0" />
              <div>
                <div className="text-[9px] font-mono text-citi-muted uppercase tracking-wider mb-0.5">GitHub</div>
                <div className="text-sm text-citi-silver group-hover:text-white transition-colors">{profileConfig.github}</div>
              </div>
            </a>
          )}
          {profileConfig.location && (
            <div className="flex items-center gap-3 p-3.5 border border-white/5 bg-navy-800/20">
              <MapPin className="w-4 h-4 text-citi-muted shrink-0" />
              <div>
                <div className="text-[9px] font-mono text-citi-muted uppercase tracking-wider mb-0.5">Location</div>
                <div className="text-sm text-citi-silver">{profileConfig.location}</div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-white/5 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-xs font-medium text-citi-muted hover:text-white border border-white/10 hover:border-citi-blue/40 transition-colors">Close</button>
        </div>
      </div>
    </div>
  );
}

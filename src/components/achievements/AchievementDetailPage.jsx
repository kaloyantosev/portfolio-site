import React from 'react';
import { ArrowLeft, CheckCircle2, Award, Calendar, Building } from 'lucide-react';

export default function AchievementDetailPage({ achievement, onBack }) {
  if (!achievement) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 animate-fade">
      
      {/* Back Navigation Bar */}
      <div className="mb-8 pb-4 border-b border-citi-blue/15 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-citi-muted hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Achievements</span>
        </button>
        <span className="badge-blue">{achievement.category}</span>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-citi-muted">
          <Calendar className="w-3 h-3" />
          <span>{achievement.date}</span>
          <span>•</span>
          <span className="text-citi-accent">{achievement.institution}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-tight">
          {achievement.title}
        </h1>
      </div>

      {/* Summary Box */}
      {achievement.summary && (
        <div className="mt-8 p-6 bg-navy-800/80 border-l-2 border-citi-lightblue">
          <div className="section-label mb-2">Achievement Overview</div>
          <p className="text-citi-silver leading-relaxed text-sm sm:text-base font-sans">
            {achievement.summary}
          </p>
        </div>
      )}

      {/* Details List */}
      {achievement.details?.length > 0 && (
        <div className="mt-10">
          <div className="section-label mb-4">Milestones & Distinction Details</div>
          <div className="space-y-3">
            {achievement.details.map((d, i) => (
              <div key={i} className="flex items-start gap-3.5 p-4 bg-navy-800/40 border border-white/5 text-citi-silver text-sm leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-citi-lightblue shrink-0 mt-0.5" />
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Back Button */}
      <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-citi-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Achievements</span>
        </button>
        <span className="text-[10px] font-mono text-citi-muted/50">VERIFIED MERIT</span>
      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { achievementsList } from '../../portfolioData';
import { Award, ArrowUpRight, Calendar, Building } from 'lucide-react';
import AchievementDetailPage from './AchievementDetailPage';

export default function AchievementsView({ selectedAchievementId, setSelectedAchievementId }) {
  // If an achievement is selected, render the dedicated full sub-page
  if (selectedAchievementId) {
    const activeAchieve = achievementsList.find(a => a.id === selectedAchievementId);
    if (activeAchieve) {
      return (
        <AchievementDetailPage
          achievement={activeAchieve}
          onBack={() => {
            setSelectedAchievementId(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      );
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 animate-fade">
      
      <div className="border-b border-citi-blue/15 pb-8">
        <div className="section-label mb-3">Honors, Distinctions & Milestones</div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-white">Achievements</h1>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievementsList.map(a => (
          <div 
            key={a.id} 
            onClick={() => {
              setSelectedAchievementId(a.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="bank-card p-6 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="badge-blue">{a.category}</span>
                <span className="text-[10px] font-mono text-citi-muted flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {a.date}
                </span>
              </div>

              <h3 className="text-white font-medium text-sm sm:text-base group-hover:text-citi-accent transition-colors leading-snug">
                {a.title}
              </h3>
              
              <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-mono text-citi-lightblue/80">
                <Building className="w-3 h-3" />
                <span>{a.institution}</span>
              </div>

              <p className="text-citi-muted text-xs mt-3 leading-relaxed line-clamp-3 font-sans">
                {a.summary}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/5 flex justify-end">
              <span className="text-xs text-citi-muted group-hover:text-white flex items-center gap-1 transition-colors">
                View Details <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {achievementsList.length === 0 && (
        <div className="mt-20 text-center text-citi-muted text-sm py-16 border border-white/5">
          No achievements listed yet.
        </div>
      )}

    </div>
  );
}

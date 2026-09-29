import React from 'react';
import { ArrowRight, BookOpen, TrendingUp, Cpu, Activity, Award, FileText, ShieldCheck } from 'lucide-react';
import { profileConfig } from '../../portfolioData';

export default function HeroSection({ setActiveTab, setActiveSubTab, onOpenContact, onClearDetail }) {
  const go = (tab, sub = null) => {
    setActiveTab(tab);
    if (sub) setActiveSubTab(sub);
    if (onClearDetail) onClearDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pillars = [
    {
      title: 'Articles',
      desc: 'Institutional Investment Memos and Global Macro Analyses.',
      icon: BookOpen,
      subs: [
        { label: 'Investment Memos', tab: 'articles', sub: 'memos' },
        { label: 'Macro Analyses', tab: 'articles', sub: 'macro' },
      ],
    },
    {
      title: 'Custom Trading Strats',
      desc: 'Systematic Trading Algorithms and Quantitative Investment Engines.',
      icon: TrendingUp,
      subs: [
        { label: 'Trading Algos', tab: 'strategies', sub: 'trading-algos' },
        { label: 'Investment Algos', tab: 'strategies', sub: 'investment-algos' },
      ],
    },
    {
      title: 'Custom Models',
      desc: 'Quantitative valuation, risk and macroeconomic frameworks.',
      icon: Cpu,
      tab: 'models',
    },
    {
      title: 'Custom Indicators',
      desc: 'Proprietary order flow signals and volatility oscillators.',
      icon: Activity,
      tab: 'indicators',
    },
    {
      title: 'Letter of Recommendation',
      desc: 'Executive endorsement from former VP of Goldman Sachs (PDF Attached).',
      icon: ShieldCheck,
      tab: 'recommendations',
    },
    {
      title: 'Certificates & Awards',
      desc: 'First Place Investment Challenge AUBG, Goldman Sachs & Yale University credentials.',
      icon: Award,
      tab: 'certificates',
    },
  ];

  return (
    <div className="spiral-bg relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-16">

        {/* ── Hero: Two-column layout with centered, blended photo ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column: Text & CTAs (7 cols) */}
          <div className="lg:col-span-7 z-10">
            <div className="section-label mb-4">Portfolio & Achievements</div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-tight">
              {profileConfig.name}
            </h1>
            <p className="mt-3 text-citi-lightblue font-serif italic text-lg sm:text-xl">
              {profileConfig.tagline}
            </p>
            <p className="mt-5 text-citi-silver text-sm sm:text-base font-sans font-light leading-relaxed max-w-xl">
              {profileConfig.bio}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => go('articles', 'memos')}
                className="flex items-center gap-2 px-5 py-2.5 bg-citi-lightblue text-white text-sm font-medium hover:bg-citi-accent transition-colors"
              >
                View Research <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => go('cv')}
                className="flex items-center gap-2 px-5 py-2.5 border border-citi-blue/40 text-citi-silver text-sm font-medium hover:border-citi-lightblue hover:text-white transition-colors"
              >
                View Curriculum Vitae (CV)
              </button>
              <button
                onClick={onOpenContact}
                className="flex items-center gap-2 px-5 py-2.5 text-citi-muted text-sm font-medium hover:text-white transition-colors"
              >
                Get in Touch
              </button>
            </div>
          </div>

          {/* Right Column: Shifted toward center with smooth navy backdrop blending (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start lg:-ml-4 z-0">
            <div className="relative w-64 sm:w-72 lg:w-80 group">
              
              {/* Soft ambient radial glow matching Citi Navy/Blue palette */}
              <div 
                className="absolute inset-0 -m-6 rounded-full pointer-events-none opacity-40 blur-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 100, 180, 0.25) 0%, rgba(10, 22, 40, 0.1) 60%, transparent 80%)'
                }}
              />

              {/* Photo with true alpha transparency, edge feathering, and subtle tone blending */}
              <img
                src="/kaloyan.png"
                alt="Kaloyan Tosev"
                className="relative z-10 w-full object-contain object-bottom select-none transition-opacity duration-300"
                style={{
                  opacity: 0.88,
                  filter: 'contrast(1.02) brightness(0.96) saturate(0.92)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 65%, rgba(0,0,0,0.7) 85%, transparent 100%), radial-gradient(ellipse at 50% 50%, black 75%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 65%, rgba(0,0,0,0.7) 85%, transparent 100%), radial-gradient(ellipse at 50% 50%, black 75%, transparent 100%)',
                  WebkitMaskComposite: 'destination-in',
                  maskComposite: 'intersect',
                }}
                draggable="false"
              />
            </div>
          </div>

        </div>

        {/* ── Thin divider ── */}
        <div className="mt-14 border-t border-citi-blue/15" />

        {/* ── Key metrics row ── */}
        {profileConfig.metrics?.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {profileConfig.metrics.map((m, i) => (
              <div key={i}>
                <div className="section-label mb-1">{m.label}</div>
                <div className="stat-value text-2xl sm:text-3xl">{m.value}</div>
                <div className="text-citi-muted text-xs mt-1 leading-snug">{m.desc}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── Thin divider ── */}
        <div className="mt-14 border-t border-citi-blue/15" />

        {/* ── Portfolio divisions ── */}
        <div className="section-label mt-10 mb-7">Portfolio Divisions</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                onClick={() => p.tab ? go(p.tab) : go(p.subs[0].tab, p.subs[0].sub)}
                className="bank-card p-6 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <Icon className="w-4 h-4 text-citi-lightblue mt-0.5 shrink-0" />
                    <ArrowRight className="w-4 h-4 text-citi-muted group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-white text-sm font-medium">{p.title}</h3>
                    <p className="text-citi-muted text-xs mt-1.5 leading-relaxed">{p.desc}</p>
                  </div>
                </div>

                {p.subs && (
                  <div className="mt-5 pt-3 border-t border-white/5 flex flex-wrap gap-2">
                    {p.subs.map((s, si) => (
                      <button
                        key={si}
                        onClick={e => { e.stopPropagation(); go(s.tab, s.sub); }}
                        className="text-[10px] font-mono uppercase tracking-wider text-citi-muted hover:text-white border border-white/10 hover:border-citi-blue/40 px-2 py-0.5 transition-colors"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

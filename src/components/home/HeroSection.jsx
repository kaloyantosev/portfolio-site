import React from 'react';
import { ArrowRight } from 'lucide-react';
import { profileConfig } from '../../portfolioData';
import { ListRow } from '../common/ListUI';

const SECTIONS = [
  { tab: 'articles', title: 'Articles', desc: 'Investment memos and global macro analyses.' },
  { tab: 'strategies', title: 'Strategies', desc: 'Systematic trading algorithms and quantitative investment engines.' },
  { tab: 'models', title: 'Models', desc: 'Live applications for positioning, valuation, volatility and systematic research.' },
  { tab: 'indicators', title: 'Indicators', desc: 'Proprietary order flow signals and volatility oscillators.' },
  { tab: 'recommendations', title: 'Recommendation', desc: 'Endorsement from a former VP at Goldman Sachs.' },
  { tab: 'certificates', title: 'Certificates & Awards', desc: 'First place AUBG Investment Challenge, Goldman Sachs and Yale credentials.' },
];

export default function HeroSection({ navigate, onOpenContact }) {
  return (
    <div className="spiral-bg relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="section-label mb-4">Portfolio & Achievements</div>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium text-white leading-[1.02]">
              {profileConfig.name}
            </h1>
            <p className="mt-4 font-serif italic text-gold-light text-xl sm:text-2xl">{profileConfig.tagline}</p>
            <p className="mt-6 text-citi-silver font-light leading-relaxed max-w-xl">{profileConfig.bio}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <button
                onClick={() => navigate('articles')}
                className="flex items-center gap-2 px-6 py-3 bg-citi-lightblue text-white text-xs uppercase tracking-[0.18em] hover:bg-citi-accent transition-colors"
              >
                View Research <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('cv')} className="text-sm text-citi-silver border-b border-gold/60 pb-0.5 hover:text-gold-light transition-colors">
                Curriculum Vitae
              </button>
              <button onClick={onOpenContact} className="text-sm text-citi-muted hover:text-white transition-colors">
                Get in touch
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-start lg:-ml-4">
            <div className="relative w-64 sm:w-72 lg:w-80">
              <div
                className="absolute inset-0 -m-6 rounded-full pointer-events-none opacity-40 blur-2xl"
                style={{ background: 'radial-gradient(circle, rgba(0, 100, 180, 0.25) 0%, rgba(10, 22, 40, 0.1) 60%, transparent 80%)' }}
              />
              <img
                src="/kaloyan.png"
                alt="Kaloyan Tosev"
                className="relative z-10 w-full object-contain object-bottom select-none"
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

        {profileConfig.metrics?.length > 0 && (
          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {profileConfig.metrics.map((m, i) => (
              <div key={i}>
                <div className="section-label mb-1">{m.label}</div>
                <div className="stat-value text-2xl sm:text-3xl">{m.value}</div>
                <div className="text-citi-muted text-xs mt-1 leading-snug">{m.desc}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 border-t border-white/10">
          {SECTIONS.map((s, i) => (
            <ListRow
              key={s.tab}
              meta={String(i + 1).padStart(2, '0')}
              title={s.title}
              text={s.desc}
              action="Open"
              onClick={() => navigate(s.tab)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

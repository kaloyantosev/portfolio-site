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
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-8 pt-20 pb-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="section-label mb-4">Portfolio & Achievements</div>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium text-white leading-[1.02]">
              {profileConfig.name}
            </h1>
            <p className="mt-4 font-serif italic text-citi-silver text-xl sm:text-2xl">{profileConfig.tagline}</p>
            <p className="mt-6 text-citi-silver font-light leading-relaxed max-w-xl">{profileConfig.bio}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <button
                onClick={() => navigate('articles')}
                className="btn-pill-solid"
              >
                View Research <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('cv')} className="text-sm text-citi-silver border-b border-white/40 pb-0.5 hover:text-white transition-colors">
                Curriculum Vitae
              </button>
              <button onClick={onOpenContact} className="text-sm text-citi-muted hover:text-white transition-colors">
                Get in touch
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-start lg:-ml-4">
            <div className="relative w-72 sm:w-80 lg:w-[26rem]">
              <div
                className="absolute inset-0 -m-6 rounded-full pointer-events-none opacity-40 blur-2xl"
                style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 60%, transparent 80%)' }}
              />
              <img
                src="/kaloyan.png"
                alt="Kaloyan Tosev"
                className="relative z-10 w-full object-contain object-bottom select-none"
                style={{
                  opacity: 0.88,
                  filter: 'contrast(1.02) brightness(0.96) saturate(0.92) drop-shadow(0 0 1.5px rgba(255,255,255,0.45))',
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

        {profileConfig.experience?.length > 0 && (
          <section className="mt-20">
            <div className="section-label mb-4">Experience</div>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium text-white">Finance career</h2>
            <div className="mt-6 h-px w-14 bg-gold" />
            <ol className="mt-10 border-t border-white/10">
              {profileConfig.experience.map(e => (
                <li key={e.role + e.period} className="grid md:grid-cols-[13rem_1fr] gap-x-10 gap-y-2 py-8 border-b border-white/10">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-citi-muted pt-2">{e.period}</span>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-[1.7rem] leading-tight text-white">{e.role}</h3>
                    <p className="mt-1 text-sm text-citi-lightaccent">{e.org}</p>
                    <p className="mt-3 max-w-3xl text-sm text-citi-muted leading-relaxed">{e.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

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

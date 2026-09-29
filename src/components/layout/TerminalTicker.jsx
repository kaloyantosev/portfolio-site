import React from 'react';

export default function TerminalTicker() {
  // Kept minimal — just a thin status stripe
  return (
    <div className="bg-navy-950 border-b border-citi-blue/20 py-1 px-6 flex items-center justify-between text-[10px] font-mono text-citi-muted select-none overflow-hidden">
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
        <span className="shrink-0 text-citi-muted/50 uppercase tracking-wider">Private Client Intelligence</span>
        <span className="shrink-0 text-white/10">|</span>
        <span className="shrink-0">SPX <span className="text-slate-300">5,982</span></span>
        <span className="shrink-0 text-white/10">|</span>
        <span className="shrink-0">US10Y <span className="text-slate-300">4.48%</span></span>
        <span className="shrink-0 text-white/10">|</span>
        <span className="shrink-0">GOLD <span className="text-slate-300">$2,914</span></span>
        <span className="shrink-0 text-white/10">|</span>
        <span className="shrink-0">DXY <span className="text-slate-300">103.8</span></span>
        <span className="shrink-0 text-white/10">|</span>
        <span className="shrink-0">VIX <span className="text-slate-300">13.6</span></span>
      </div>
      <div className="hidden md:flex items-center gap-2 shrink-0 pl-4">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
        <span className="text-citi-muted/70 uppercase tracking-widest">Systems Operational</span>
      </div>
    </div>
  );
}

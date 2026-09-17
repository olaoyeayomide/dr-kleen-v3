import { Shield, AlertTriangle, ArrowRight, CheckCircle2, PhoneCall } from 'lucide-react';
import { pestPillars } from '../data/mockData';

interface PestControlSectionProps {
  onStartPestAssessment: () => void;
  onCallSpecialist: () => void;
}

export function PestControlSection({ onStartPestAssessment, onCallSpecialist }: PestControlSectionProps) {
  return (
    <section id="pest-control" className="py-20 sm:py-28 bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0b1329] text-white relative overflow-hidden">
      {/* Visual Mood Shift: Warm Amber / Alert Red / Shield Cyan Accents */}
      <div className="absolute top-10 left-1/4 w-[450px] h-[450px] rounded-full blur-[140px] bg-rose-600/10 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full blur-[140px] bg-orange-600/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Shield size={13} className="text-rose-400" />
            <span>7. Bio-Defense & Fumigation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]">
            Clean isn't enough. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-amber-300">
              Stay Protected.
            </span>
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Pests compromise indoor air, destroy electrical wiring, and cause sleepless nights. Our certified entomologist-guided protocols eradicate colonies at the microscopic root.
          </p>
        </div>

        {/* 4 Pest Defense Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pestPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-orange-500/50 hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1.5 group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl p-2.5 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-rose-500/10 text-rose-300 border border-rose-500/30">
                    {pillar.threatLevel}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white group-hover:text-orange-400 transition-colors mb-2">
                  {pillar.name}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-700/60 mt-auto">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Dr•Kleen Treatment:
                </p>
                <p className="text-xs text-orange-200/90 leading-normal font-medium">
                  {pillar.treatment}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Strong Pest Call-To-Action Banner */}
        <div className="bg-gradient-to-r from-[#1e1b4b] via-[#311024] to-[#1e1b4b] border-2 border-rose-500/40 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <AlertTriangle size={180} />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
              Rapid Response Protocol
            </span>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Have a Pest Problem?
            </h3>

            <p className="mt-3 text-slate-200 text-sm sm:text-base leading-relaxed">
              Don't guess with over-the-counter chemical sprays. Complete our 60-second interactive diagnostic assessment so our lead entomologist can prescribe the exact biocide dosage.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                id="pest-start-assessment-btn"
                onClick={onStartPestAssessment}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-lg shadow-rose-900/50 hover:shadow-rose-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
              >
                <span>Start Pest Assessment</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onCallSpecialist}
                className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 hover:border-white/40 transition-all flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall size={16} className="text-orange-400" />
                <span>Urgent Emergency Call</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

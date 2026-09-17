import { Building2, CheckCircle2, ArrowRight, Shield, Clock, FileText, Briefcase } from 'lucide-react';
import { corporateSectors } from '../data/mockData';

interface CorporateSectionProps {
  onExploreCorporate: () => void;
  onRequestInspection: () => void;
}

export function CorporateSection({ onExploreCorporate, onRequestInspection }: CorporateSectionProps) {
  return (
    <section id="corporate" className="py-20 sm:py-28 bg-[#031F5E] text-white relative overflow-hidden">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-sky-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Briefcase size={13} className="text-sky-300" />
            <span>11. B2B & Enterprise Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]">
            A Cleaner Workplace. <br className="hidden sm:inline" />
            <span className="text-[#1693d9]">A Better Business.</span>
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Reliable cleaning and pest management designed around your operations. Zero disruption to office hours, rigorous SLA reporting, and vetted personnel.
          </p>
        </div>

        {/* 5 Corporate Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-14">
          {corporateSectors.map((sector) => (
            <div
              key={sector.id}
              className="bg-slate-900/60 border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:border-sky-400/50 hover:bg-slate-900/90 transition-all duration-300 hover:-translate-y-1.5 group backdrop-blur-xs"
            >
              <div>
                <div className="text-3xl sm:text-4xl mb-3 p-3 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform">
                  {sector.icon}
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-sky-300 transition-colors mb-2 leading-snug">
                  {sector.name}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {sector.description}
                </p>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-white/10">
                {sector.deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                    <CheckCircle2 size={12} className="text-sky-400 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Value Pillars / SLA Checklist */}
        <div className="bg-slate-900/80 rounded-3xl border border-sky-500/20 p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-300 border border-sky-500/30 flex items-center justify-center shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-white">After-Hours & Weekend Cleaning</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Our teams work overnight or during weekend downtime so your staff returns to a spotless office.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-300 border border-sky-500/30 flex items-center justify-center shrink-0">
                <Shield size={24} />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-white">Vetted Staff & Full Insurance</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Background-checked personnel with strict non-disclosure compliance and public liability coverage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-300 border border-sky-500/30 flex items-center justify-center shrink-0">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-white">Dedicated Account Manager & SLA</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Monthly supervisory audit reports, KPI tracking dashboards, and consolidated corporate invoicing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreCorporate}
            className="px-8 py-4 rounded-full bg-[#1693d9] hover:bg-[#1281bf] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-lg shadow-sky-900/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
          >
            <span>Explore Corporate Solutions</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={onRequestInspection}
            className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 hover:border-white/40 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Request Free Corporate Facility Audit</span>
          </button>
        </div>

      </div>
    </section>
  );
}

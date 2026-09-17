import { Sparkles, FileText, Compass, CheckCircle, Truck, Award, ArrowRight } from 'lucide-react';
import { howItWorksSteps } from '../data/mockData';

interface HowItWorksSectionProps {
  onOpenBooking: () => void;
}

export function HowItWorksSection({ onOpenBooking }: HowItWorksSectionProps) {
  const iconMap: Record<string, any> = {
    FileText,
    Compass,
    CheckCircle,
    Truck,
    Award
  };

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles size={13} className="text-sky-600" />
            <span>9. Operational Excellence</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#031F5E] tracking-tight leading-[1.18]">
            From Request <span className="text-[#1693d9]">to Refresh</span>
          </h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            Five transparent milestones engineered for total peace of mind. No surprise bills, no unreliable dispatchers.
          </p>
        </div>

        {/* 5-Step Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-gradient-to-r from-sky-200 via-blue-200 to-emerald-200 z-0" />

          {howItWorksSteps.map((stepItem, index) => {
            const IconComponent = iconMap[stepItem.icon] || FileText;
            return (
              <div
                key={stepItem.step}
                className="relative z-10 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group"
              >
                {/* Step Number & Icon Circle */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 text-[#031F5E] group-hover:bg-[#1693d9] group-hover:text-white transition-colors duration-300 flex items-center justify-center font-bold shadow-xs border border-sky-100">
                    <IconComponent size={24} />
                  </div>
                  <span className="text-2xl font-black text-slate-300 group-hover:text-[#1693d9] transition-colors">
                    {stepItem.step}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-[#031F5E] mb-2 leading-snug">
                  {stepItem.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {stepItem.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-sky-700">
                  <span>Milestone {index + 1}</span>
                  <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Confidence statement */}
        <div className="mt-14 max-w-2xl mx-auto text-center bg-slate-50 p-6 rounded-3xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-700">
            Backed by the <span className="text-[#031F5E] font-extrabold">Dr•Kleen 100% Satisfaction Guarantee</span>. If any corner is overlooked, our supervisor returns within 24 hours at no extra charge.
          </p>
          <div className="mt-4">
            <button
              onClick={onOpenBooking}
              className="px-6 py-2.5 rounded-full bg-[#031F5E] hover:bg-[#1693d9] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Start Milestone 01 Now
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

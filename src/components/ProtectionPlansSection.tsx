import {
  ShieldCheck,
  Check,
  Sparkles,
  ArrowRight,
  Zap,
  Users,
  Building,
} from "lucide-react";
import { protectionPlans } from "../data/mockData";

interface ProtectionPlansSectionProps {
  onSelectPlan: (planName: string, price: string) => void;
  onExplorePlans: () => void;
}

export function ProtectionPlansSection({
  onSelectPlan,
  onExplorePlans,
}: ProtectionPlansSectionProps) {
  return (
    <section
      id="plans"
      className="py-20 sm:py-28 bg-[#f8fbfe] relative overflow-hidden border-t border-slate-200/60"
    >
      {/* Decorative ambient backdrop */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#031F5E] tracking-tight leading-[1.18]">
            Don't Wait for the Mess. <br className="hidden sm:inline" />
            <span className="text-[#1693d9]">Stay Ahead of It.</span>
          </h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            Automate your home and estate hygiene with scheduled maintenance
            retainers. Save up to 25% while locking in guaranteed priority
            dispatch dates.
          </p>
        </div>

        {/* 4 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {protectionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group ${
                plan.popular
                  ? "border-2 border-[#1693d9] shadow-xl shadow-sky-900/10 -translate-y-2 ring-4 ring-sky-50"
                  : "border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#1693d9] text-white text-[10px] font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1">
                  <Sparkles size={11} />
                  Most Popular
                </div>
              )}

              <div>
                <div className="text-[11px] font-bold text-sky-700 tracking-wider uppercase mb-1">
                  {plan.cadence}
                </div>

                <h3 className="text-xl font-extrabold text-[#031F5E] mb-1">
                  {plan.name}
                </h3>

                <p className="text-xs text-slate-500 font-normal mb-4">
                  {plan.tagline}
                </p>

                {/* Price Display */}
                <div className="py-3 my-2 border-y border-slate-100 flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-[#031F5E]">
                    {plan.price}
                  </span>
                  {plan.price.includes("₦") && (
                    <span className="text-xs font-semibold text-slate-400">
                      / billing cycle
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-slate-500 font-medium my-2">
                  <span className="font-bold text-slate-700">Scope:</span>{" "}
                  {plan.coverage}
                </div>

                {/* Feature Checklist */}
                <div className="space-y-2.5 mt-5">
                  {plan.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-700"
                    >
                      <Check
                        size={14}
                        className="text-[#1693d9] shrink-0 mt-0.5"
                      />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onSelectPlan(plan.name, plan.price)}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer ${
                    plan.popular
                      ? "bg-[#1693d9] hover:bg-[#1281bf] text-white shadow-sky-600/30"
                      : "bg-[#031F5E] hover:bg-[#1693d9] text-white"
                  }`}
                >
                  Subscribe to Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA: Explore Protection Plans → */}
        <div className="text-center">
          <button
            onClick={onExplorePlans}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#031F5E] font-extrabold text-sm sm:text-base border-2 border-slate-200 hover:border-[#1693d9] transition-all shadow-sm group cursor-pointer"
          >
            <span>Explore Protection Plans Detailed Terms</span>
            <ArrowRight
              size={18}
              className="text-[#1693d9] group-hover:translate-x-1 transition-transform"
            />
          </button>
          <p className="mt-2 text-xs text-slate-500">
            Learn about residential, commercial facility, and gated estate
            retainer agreements.
          </p>
        </div>
      </div>
    </section>
  );
}

import { X, ShieldCheck, Check, Sparkles, ArrowRight } from 'lucide-react';
import { protectionPlans } from '../data/mockData';

interface PlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (planName: string, price: string) => void;
}

export function PlansModal({ isOpen, onClose, onSubscribe }: PlansModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#031F5E] text-white p-5 sm:p-6 flex items-center justify-between border-b border-sky-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-300 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                <span>Dr•Kleen Recurring Protection Memberships</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500 text-white uppercase">
                  /plans
                </span>
              </h2>
              <p className="text-xs text-sky-200/80">
                Phase 1 Digital Subscriptions: Residential, Pest Immunity, and Estate Facility Retainers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Grid of Plans */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {protectionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 bg-white ${
                  plan.popular
                    ? 'border-[#1693d9] shadow-xl ring-2 ring-sky-100'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider block mb-1">
                    {plan.cadence}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#031F5E] mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    {plan.tagline}
                  </p>

                  <div className="text-2xl font-black text-[#031F5E] pb-3 mb-4 border-b border-slate-100">
                    {plan.price}
                  </div>

                  <div className="space-y-2 mb-6">
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check size={14} className="text-[#1693d9] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSubscribe(plan.name, plan.price);
                    onClose();
                  }}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    plan.popular
                      ? 'bg-[#1693d9] text-white hover:bg-[#1281bf] shadow-sm'
                      : 'bg-[#031F5E] text-white hover:bg-[#1693d9]'
                  }`}
                >
                  Activate {plan.name}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-sky-50 rounded-2xl p-5 border border-sky-200 text-xs text-sky-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              <strong>Estate Resident Associations &amp; Facility Boards:</strong> We provide group community coverage with automated digital monthly pest compliance logs.
            </p>
            <button
              onClick={() => {
                onSubscribe('Estate Association Bulk Retainer', 'Custom Estate SLA');
                onClose();
              }}
              className="px-5 py-2.5 rounded-full bg-[#031F5E] text-white font-bold text-xs shrink-0 cursor-pointer"
            >
              Inquire for Gated Estate
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

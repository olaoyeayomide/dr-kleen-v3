import { X, Play, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { Logo } from './common/Logo';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

export function DemoModal({ isOpen, onClose, onBookNow }: DemoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#031F5E]/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100 my-8">
        <div className="bg-[#031F5E] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo variant="light" size="sm" asDiv />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close demo"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 group flex items-center justify-center shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
              alt="Dr.Kleen Service Process"
              className="w-full h-full object-cover filter brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute z-10 flex flex-col items-center gap-3 text-center px-4">
              <div className="w-16 h-16 rounded-full bg-[#1693d9] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform cursor-pointer">
                <Play size={24} className="fill-white translate-x-0.5" />
              </div>
              <p className="text-white font-bold text-sm sm:text-base drop-shadow-md">
                Dr.Kleen Standards: Hospital-Grade Fumigation &amp; Deep Clean Workflow
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <Sparkles size={18} className="text-[#0284c7] mx-auto mb-1" />
              <h5 className="text-xs font-bold text-[#031F5E]">Eco-Safe Chem</h5>
              <p className="text-[11px] text-slate-500">Child &amp; pet friendly</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <Shield size={18} className="text-emerald-600 mx-auto mb-1" />
              <h5 className="text-xs font-bold text-[#031F5E]">Insured Team</h5>
              <p className="text-[11px] text-slate-500">Background checked</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <CheckCircle2 size={18} className="text-amber-500 mx-auto mb-1" />
              <h5 className="text-xs font-bold text-[#031F5E]">Guaranteed</h5>
              <p className="text-[11px] text-slate-500">Free re-touch within 24h</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onBookNow();
              }}
              className="flex-1 py-3 px-6 rounded-full bg-[#1693d9] hover:bg-[#1281bf] text-white text-xs sm:text-sm font-bold text-center transition-colors cursor-pointer"
            >
              Book Inspection Now
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

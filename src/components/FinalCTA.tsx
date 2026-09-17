import { PhoneCall, MessageCircle, CalendarCheck, ShieldCheck, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onBookService: () => void;
  onWhatsAppUs: () => void;
  onCallDrKleen: () => void;
}

export function FinalCTA({ onBookService, onWhatsAppUs, onCallDrKleen }: FinalCTAProps) {
  return (
    <section id="contact" className="relative bg-gradient-to-br from-[#f8fbfe] via-[#edf6fd] to-[#e4f1fc] overflow-hidden py-20 sm:py-24 lg:py-28 border-t border-slate-200">
      
      {/* Dynamic Curving Coral-Orange Ribbon Wave Vector on Right side */}
      <div 
        className="absolute top-0 right-0 w-full lg:w-[55%] h-full pointer-events-none select-none z-0 overflow-hidden flex items-center justify-end" 
        aria-hidden="true"
      >
        <svg
          className="w-[700px] h-[550px] max-w-none text-[#ff6138] translate-x-12 sm:translate-x-4 lg:translate-x-0 opacity-90"
          viewBox="0 0 700 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 650 0 
               C 500 40, 360 80, 330 160 
               C 300 240, 420 300, 460 360 
               C 500 420, 380 490, 240 480 
               C 180 475, 120 460, 80 500 
               L 700 500 
               L 700 0 Z"
            fill="currentColor"
          />
          <path
            d="M 330 160 
               C 280 120, 290 50, 380 0 
               L 700 0 
               L 650 0 
               C 500 40, 360 80, 330 160 Z"
            fill="#ff7550"
            opacity="0.95"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-2xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-sky-200 text-sky-900 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Sparkles size={13} className="text-[#1693d9]" />
            <span>16. Immediate Dispatch Desk</span>
          </div>

          {/* Strong Final Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#031F5E] tracking-tight leading-[1.12]">
            Ready for a Cleaner, <br />
            <span className="text-[#1693d9]">Safer Space?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
            Tell us what you need. We'll take care of the rest.
          </p>

          {/* Three Direct Actions: Book a Service, WhatsApp Us, Call Dr•Kleen */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              id="cta-book-service-btn"
              onClick={onBookService}
              className="px-8 py-4 rounded-full bg-[#031F5E] hover:bg-[#1693d9] text-white text-sm sm:text-base font-extrabold tracking-wide shadow-xl shadow-blue-950/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2.5"
            >
              <CalendarCheck size={18} />
              <span>Book a Service</span>
            </button>

            <button
              id="cta-whatsapp-btn"
              onClick={onWhatsAppUs}
              className="px-7 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-sm sm:text-base font-extrabold tracking-wide shadow-xl shadow-emerald-700/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2.5"
            >
              <MessageCircle size={18} className="fill-white" />
              <span>WhatsApp Us</span>
            </button>

            <button
              id="cta-call-btn"
              onClick={onCallDrKleen}
              className="px-6 py-4 rounded-full bg-white hover:bg-slate-50 text-[#031F5E] text-sm sm:text-base font-bold tracking-wide border-2 border-slate-200 hover:border-[#031F5E] shadow-sm transition-all cursor-pointer flex items-center gap-2.5"
            >
              <PhoneCall size={18} className="text-[#1693d9]" />
              <span>Call Dr•Kleen</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-emerald-500" />
              100% Satisfaction Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-emerald-500" />
              Certified Non-Toxic Chemicals
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-emerald-500" />
              Fully Insured Personnel
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}

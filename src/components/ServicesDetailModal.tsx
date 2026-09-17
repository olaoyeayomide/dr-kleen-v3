import { useState } from 'react';
import { X, Sparkles, CheckCircle2, Clock, ArrowRight, ShieldCheck, Filter } from 'lucide-react';
import { detailedServices } from '../data/mockData';
import { DetailedService } from '../types';

interface ServicesDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceName: string, price?: string) => void;
}

export function ServicesDetailModal({ isOpen, onClose, onSelectService }: ServicesDetailModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'residential' | 'commercial' | 'post-construction'>('all');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(detailedServices[0].id);

  if (!isOpen) return null;

  const filteredServices = selectedCategory === 'all'
    ? detailedServices
    : detailedServices.filter(s => s.category === selectedCategory);

  const activeService = detailedServices.find(s => s.id === selectedServiceId) || detailedServices[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#031F5E] text-white p-5 sm:p-6 flex items-center justify-between border-b border-sky-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1693d9]/20 text-[#1693d9] flex items-center justify-center font-bold">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                <span>Dr•Kleen Complete Services Directory</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500 text-white uppercase">
                  /services
                </span>
              </h2>
              <p className="text-xs text-sky-200/80">
                Detailed protocols, scope checklist, and square-meter starting prices
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

        {/* Category Filter Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-2">
            <Filter size={13} /> Scope Filter:
          </span>
          {(['all', 'residential', 'commercial', 'post-construction'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#031F5E] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Services (9)' : cat.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Content Body: Split Left Nav + Right Detailed View */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Left Column: Service Selector List */}
          <div className="md:col-span-5 p-4 sm:p-5 border-r border-slate-200 overflow-y-auto space-y-2.5 max-h-[60vh] md:max-h-none">
            {filteredServices.map((srv) => (
              <div
                key={srv.id}
                onClick={() => setSelectedServiceId(srv.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedServiceId === srv.id
                    ? 'border-[#1693d9] bg-sky-50/70 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-[#031F5E]">
                    {srv.title}
                  </h4>
                  <span className="text-xs font-black text-sky-800">
                    {srv.startingPrice}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {srv.tagline}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Active Service Deep Dive Card */}
          <div className="md:col-span-7 p-6 sm:p-8 overflow-y-auto max-h-[65vh] md:max-h-none flex flex-col justify-between">
            <div>
              <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden mb-5 bg-slate-100">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#1693d9] text-white">
                      {activeService.category}
                    </span>
                    <h3 className="text-xl font-black mt-1">{activeService.title}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-sky-200">Starting from</p>
                    <p className="text-lg font-black">{activeService.startingPrice}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Protocol Summary
                  </h4>
                  <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                    {activeService.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-[#1693d9]" />
                    Standard Run: {activeService.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    Hospital-Grade Chemicals
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Scope &amp; Deliverables Checklist
                  </h4>
                  <div className="space-y-2">
                    {activeService.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 size={15} className="text-[#1693d9] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Modal CTA */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Custom quotes available for oversized premises.
              </span>
              <button
                onClick={() => {
                  onSelectService(activeService.title, activeService.startingPrice);
                  onClose();
                }}
                className="px-6 py-3 rounded-xl bg-[#031F5E] hover:bg-[#1693d9] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Book {activeService.title}</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

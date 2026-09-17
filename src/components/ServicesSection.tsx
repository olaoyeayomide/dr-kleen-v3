import { useState } from 'react';
import { Home, Building2, HardHat, ArrowRight, CheckCircle2, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { detailedServices } from '../data/mockData';

interface ServicesSectionProps {
  onOpenBooking: (serviceName?: string, price?: string) => void;
  onViewAllServices: () => void;
}

export function ServicesSection({ onOpenBooking, onViewAllServices }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'residential' | 'commercial' | 'post-construction'>('all');

  const categories = [
    {
      id: 'residential',
      name: 'Residential',
      icon: Home,
      tagline: 'Deep Cleaning • Move-In • Sofa Steam',
      color: 'border-sky-500 text-sky-600 bg-sky-50'
    },
    {
      id: 'commercial',
      name: 'Commercial',
      icon: Building2,
      tagline: 'Office • Facility • Recurring Retainers',
      color: 'border-blue-600 text-blue-700 bg-blue-50'
    },
    {
      id: 'post-construction',
      name: 'Post-Construction',
      icon: HardHat,
      tagline: 'Site Cleanup • Dust Debris • Final Sparkle',
      color: 'border-amber-500 text-amber-700 bg-amber-50'
    }
  ];

  const filteredServices = activeTab === 'all' 
    ? detailedServices 
    : detailedServices.filter(s => s.category === activeTab);

  return (
    <section id="services-section" className="py-20 sm:py-28 bg-slate-50/70 relative overflow-hidden border-t border-slate-100">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header: Section Eyebrow, Main Heading, Supporting Text */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-4 border border-sky-200/80">
              <Sparkles size={13} className="text-sky-600" />
              <span>5. Signature Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#031F5E] tracking-tight leading-[1.18]">
              Professional Cleaning, <br className="hidden sm:inline" />
              <span className="text-[#1693d9]">Built Around Your Space</span>
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Whether restoring a high-rise executive suite or sanitizing your family home, our certified technicians execute hospital-grade hygiene checklists.
            </p>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5 self-start md:self-end">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#031F5E] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as any)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === cat.id
                    ? 'bg-[#031F5E] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <cat.icon size={14} />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3 Major Category Pillars Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer group bg-white shadow-sm hover:shadow-md ${
                activeTab === cat.id ? 'border-[#1693d9] ring-2 ring-sky-100' : 'border-slate-200/80 hover:border-sky-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.color}`}>
                  <cat.icon size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#031F5E] group-hover:text-[#1693d9] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{cat.tagline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grid of Detailed Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
            >
              {/* Image & Price Banner */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {service.popular && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1693d9] text-white text-[11px] font-bold tracking-wide uppercase shadow-md flex items-center gap-1">
                    <Sparkles size={11} />
                    Popular Choice
                  </div>
                )}

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1.5 text-xs font-semibold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
                    <Clock size={12} className="text-sky-300" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="text-sm font-extrabold text-white bg-[#031F5E]/90 px-3 py-1 rounded-full border border-sky-400/40">
                    From {service.startingPrice}
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-extrabold text-[#031F5E] group-hover:text-[#1693d9] transition-colors mb-1.5">
                    {service.title}
                  </h4>
                  <p className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-3">
                    {service.tagline}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5 font-normal line-clamp-2">
                    {service.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 size={14} className="text-[#1693d9] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Buttons */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => onOpenBooking(service.title, service.startingPrice)}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#031F5E] hover:bg-[#1693d9] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md active:scale-98 cursor-pointer text-center"
                  >
                    Book This Service
                  </button>
                  <button
                    onClick={onViewAllServices}
                    title="View Full Specifications"
                    className="w-10 h-10 rounded-xl border border-slate-200 text-slate-700 hover:text-[#1693d9] hover:border-sky-300 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Link */}
        <div className="mt-14 text-center">
          <button
            onClick={onViewAllServices}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#031F5E] hover:text-[#1693d9] text-base font-extrabold border-2 border-slate-200 hover:border-[#1693d9] shadow-sm hover:shadow-md transition-all group cursor-pointer"
          >
            <span>View All Services Specifications</span>
            <span className="w-8 h-8 rounded-full bg-sky-50 text-[#1693d9] flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight size={16} />
            </span>
          </button>
          <p className="mt-2 text-xs text-slate-500">
            Clicking explores our comprehensive dedicated catalog with custom square-meter calculators.
          </p>
        </div>

      </div>
    </section>
  );
}

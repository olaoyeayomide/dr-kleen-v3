import { useState } from 'react';
import { MapPin, CheckCircle2, Clock, Phone, Sparkles, Navigation } from 'lucide-react';
import { serviceLocations } from '../data/mockData';

interface ServiceAreasSectionProps {
  onCheckAreaCoverage: (city: string) => void;
}

export function ServiceAreasSection({ onCheckAreaCoverage }: ServiceAreasSectionProps) {
  const [selectedCity, setSelectedCity] = useState<string>('Lagos State');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeLocation = serviceLocations.find(l => l.city === selectedCity) || serviceLocations[0];

  const filteredNeighborhoods = activeLocation.neighborhoods.filter(n =>
    n.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="service-areas" className="py-20 sm:py-28 bg-[#f8fbfe] relative overflow-hidden border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <MapPin size={13} className="text-[#1693d9]" />
            <span>13. Regional Operations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#031F5E] tracking-tight leading-[1.18]">
            Dr•Kleen <span className="text-[#1693d9]">Around You</span>
          </h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            We operate fully equipped rapid-dispatch mobile vans across key urban hubs. View active branches and upcoming expansion corridors.
          </p>
        </div>

        {/* City Selector Tabs with Status Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
          {serviceLocations.map((loc) => (
            <button
              key={loc.city}
              onClick={() => {
                setSelectedCity(loc.city);
                setSearchQuery('');
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                selectedCity === loc.city
                  ? 'bg-[#031F5E] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{loc.city}</span>
              <span
                className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase ${
                  loc.status === 'Currently Serving'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {loc.status === 'Currently Serving' ? 'Active' : 'Coming Soon'}
              </span>
            </button>
          ))}
        </div>

        {/* Interactive Location Showcase Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left 5 Cols: Nigerian Map Vector Art & Status Highlight */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#031F5E] via-[#02184b] to-[#011135] text-white p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-semibold mb-4 border border-white/10">
                  <Navigation size={12} className="text-[#1693d9]" />
                  <span>Regional Branch Details</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeLocation.city}
                </h3>
                <p className="text-sky-200/80 text-sm mt-1">
                  {activeLocation.state}
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs sm:text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-bold text-white">
                      Status: {activeLocation.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <Phone size={14} className="text-[#1693d9]" />
                    <span>Dispatch Hotline: <strong className="text-white">{activeLocation.hotline}</strong></span>
                  </div>
                </div>
              </div>

              {/* Graphical Representation of Nigerian Map / Radar */}
              <div className="my-8 py-6 px-4 bg-white/5 rounded-2xl border border-white/10 text-center relative">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-sky-400/40 mx-auto flex items-center justify-center relative">
                  <div className="w-12 h-12 rounded-full bg-[#1693d9]/20 flex items-center justify-center">
                    <MapPin size={24} className="text-sky-300 animate-bounce" />
                  </div>
                  <div className="absolute top-1 right-2 w-3 h-3 bg-emerald-400 rounded-full" />
                </div>
                <p className="text-xs text-sky-200 mt-3 font-semibold">
                  {activeLocation.status === 'Currently Serving'
                    ? '30-45 Min Fleet Response Window'
                    : 'Waitlist Open for Pre-Booking'}
                </p>
              </div>

              <div className="relative z-10 pt-2">
                <button
                  onClick={() => onCheckAreaCoverage(activeLocation.city)}
                  className="w-full py-3 px-4 rounded-xl bg-[#1693d9] hover:bg-[#1281bf] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer text-center"
                >
                  {activeLocation.status === 'Currently Serving' ? 'Book In This City' : 'Join Expansion Waitlist'}
                </button>
              </div>
            </div>

            {/* Right 7 Cols: Covered Neighborhoods Directory */}
            <div className="lg:col-span-7 p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div>
                    <h4 className="text-lg font-extrabold text-[#031F5E]">
                      Service Corridors & Enclaves
                    </h4>
                    <p className="text-xs text-slate-500">
                      Neighborhoods currently covered by daily Dr•Kleen service runs
                    </p>
                  </div>

                  {/* Neighborhood Search input */}
                  <input
                    type="text"
                    placeholder="Search estate or area..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1693d9] outline-none"
                  />
                </div>

                {/* Neighborhood Badges Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  {filteredNeighborhoods.map((zone, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-xs text-slate-700 font-semibold hover:border-sky-300 hover:bg-sky-50/40 transition-colors"
                    >
                      <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                      <span>{zone}</span>
                    </div>
                  ))}
                </div>

                {filteredNeighborhoods.length === 0 && (
                  <p className="text-xs text-slate-400 italic py-6 text-center">
                    No exact match for "{searchQuery}". We may still cover your custom location via special dispatch!
                  </p>
                )}
              </div>

              {/* Transparent classification note */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-start gap-2.5 text-[11px] text-slate-500">
                <Clock size={14} className="text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Operational Transparency:</strong> We classify regions realistically into <em>Currently Serving</em> and <em>Coming Soon</em> to guarantee punctuality, rather than falsely claiming blanket nationwide coverage.
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

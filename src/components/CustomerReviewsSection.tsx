import { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, ArrowRight, MessageSquareQuote } from 'lucide-react';
import { customerReviews } from '../data/mockData';

interface CustomerReviewsSectionProps {
  onReadAllReviews: () => void;
  onOpenBooking: () => void;
}

export function CustomerReviewsSection({ onReadAllReviews, onOpenBooking }: CustomerReviewsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterOptions = ['All', 'Post-Construction', 'Pest Control', 'Corporate', 'Deep Clean'];

  const filteredReviews = activeFilter === 'All'
    ? customerReviews
    : customerReviews.filter(r => r.service.toLowerCase().includes(activeFilter.toLowerCase()) || activeFilter === 'Deep Clean' && r.service.toLowerCase().includes('clean'));

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Organic Google Reviews Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <CheckCircle2 size={13} className="text-emerald-600" />
              <span>12. Verified Social Proof</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#031F5E] tracking-tight leading-[1.18]">
              Trusted by People Who <br className="hidden sm:inline" />
              <span className="text-[#1693d9]">Care About Their Space</span>
            </h2>

            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              From high-end private residences in Ikoyi to commercial clinics in Abuja, read verified experiences from real clients.
            </p>
          </div>

          {/* 10+ Organic Google Reviews Badge */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 flex items-center gap-4 self-start md:self-end shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center font-black text-xl text-blue-600">
              G
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-slate-800 ml-1.5">5.0 / 5.0</span>
              </div>
              <p className="text-xs font-extrabold text-[#031F5E]">
                10+ Organic Google Reviews
              </p>
              <p className="text-[10px] text-slate-400">100% Genuine Nigerian Client Audits</p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setActiveFilter(opt)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeFilter === opt
                  ? 'bg-[#031F5E] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:bg-white hover:border-[#1693d9]/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative group"
            >
              <div className="absolute top-6 right-6 text-slate-200 group-hover:text-sky-100 transition-colors">
                <MessageSquareQuote size={40} />
              </div>

              <div>
                {/* Star Rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-slate-700 text-sm leading-relaxed mb-6 font-normal relative z-10">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Service Badge */}
              <div className="pt-4 border-t border-slate-200/80">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-300 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-[#031F5E]">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {rev.role}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] bg-white px-3 py-1.5 rounded-xl border border-slate-200/60 text-slate-600">
                  <span className="font-semibold text-sky-800 truncate mr-2">
                    {rev.service}
                  </span>
                  <span className="text-slate-400 shrink-0 font-medium">
                    {rev.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Read All Reviews CTA */}
        <div className="text-center">
          <button
            onClick={onReadAllReviews}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#031F5E] font-extrabold text-sm sm:text-base border-2 border-slate-200 hover:border-[#1693d9] transition-all shadow-xs group cursor-pointer"
          >
            <span>Read All Verified Client Reviews</span>
            <ArrowRight size={18} className="text-[#1693d9] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}

import { Star } from 'lucide-react';
import { testimonials } from '../data/mockData';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#f9fbfe] border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16">
          
          {/* Left Title in Sky Blue */}
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#2897d5] tracking-tight leading-tight">
              They Satisfied With <br />
              Our Service
            </h2>
          </div>

          {/* Right Eyebrow & Subtitle */}
          <div className="lg:col-span-6 space-y-1.5 lg:pl-6">
            <span className="text-sm font-bold text-amber-500 uppercase tracking-wider block">
              Testimonials
            </span>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Have many related needs, we present a suitable package for you needs
            </p>
          </div>

        </div>

        {/* 3 Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              id={`testimonial-card-${item.id}`}
              className="bg-white rounded-2xl p-7 shadow-xs border border-slate-100 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* User Info Header */}
                <div className="flex items-center gap-3.5 mb-5">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-800">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* 5 Orange Stars matching reference */}
                <div className="flex items-center gap-1 mb-4 text-[#f97316]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className="fill-[#f97316] text-[#f97316]"
                    />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

import { Check } from 'lucide-react';

export function ExperienceSection() {
  const commitments = [
    {
      title: 'We are Committed',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod tempor incididunt'
    },
    {
      title: 'Trusted Professionals',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod tempor incididunt'
    },
    {
      title: 'Highly Rated Cleaning',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod tempor incididunt'
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Creative Photographic Staggered Composition matching reference */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Composition Container with fixed proportional bounds */}
            <div className="relative w-full max-w-[500px] h-[480px] sm:h-[540px]">
              
              {/* Central Primary Image: Cleaner vacuuming living room floor */}
              <div className="absolute top-8 left-16 sm:left-20 w-[260px] sm:w-[300px] h-[360px] sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80"
                  alt="Professional cleaner vacuuming residential living room"
                  className="w-full h-full object-cover object-center filter contrast-[1.02]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlapping Top-Left Image: Cleaner wiping kitchen surfaces */}
              <div className="absolute top-0 left-0 w-[150px] sm:w-[180px] h-[170px] sm:h-[200px] rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20 bg-slate-100 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=500&q=80"
                  alt="Deep surface sanitization and wiping"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlapping Bottom-Right Image: Specialist in professional protective gear */}
              <div className="absolute bottom-4 right-2 sm:right-4 w-[140px] sm:w-[170px] h-[160px] sm:h-[190px] rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20 bg-slate-100 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=500&q=80"
                  alt="Pest control and fumigation technician"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Decorative subtle backdrop shapes */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-sky-100/60 blur-xl -z-10" />
              <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-blue-100/50 blur-xl -z-10" />

            </div>

          </div>

          {/* Right Column: Content & 3 Commitment Items */}
          <div className="lg:col-span-6 space-y-8">
            
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#031F5E] tracking-tight leading-[1.2]">
                We Are Very Experienced <br />
                In Cleaning Services
              </h2>
              <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod tempor incididunt ut labore.
              </p>
            </div>

            {/* 3 Check items with circular checkmark badges */}
            <div className="space-y-6 pt-2">
              {commitments.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-100 border border-sky-300 flex items-center justify-center text-[#1d82a6] mt-0.5 group-hover:bg-[#1d82a6] group-hover:text-white transition-colors duration-200">
                    <Check size={16} strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#031F5E] group-hover:text-[#1d82a6] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

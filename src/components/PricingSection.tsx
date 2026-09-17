import { pricingPackages } from '../data/mockData';

interface PricingSectionProps {
  onSelectPackage: (packageName: string, price: string) => void;
}

export function PricingSection({ onSelectPackage }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16">
          
          {/* Left Title in Sky Blue */}
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#2897d5] tracking-tight leading-tight">
              Choose Your Best <br />
              Service Package
            </h2>
          </div>

          {/* Right Subtitle with Orange Eyebrow */}
          <div className="lg:col-span-6 space-y-1.5 lg:pl-6">
            <span className="text-sm font-bold text-amber-500 uppercase tracking-wider block">
              Pricing List
            </span>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Have many related needs, we present a suitable package for you needs
            </p>
          </div>

        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pricingPackages.map((pkg) => {
            const isRegular = pkg.id === 'regular';

            return (
              <div
                key={pkg.id}
                id={`pricing-card-${pkg.id}`}
                className={`rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between relative ${
                  isRegular
                    ? 'bg-[#d8edff] border-2 border-sky-300 shadow-md hover:shadow-xl'
                    : 'bg-white border border-slate-200/90 shadow-xs hover:shadow-lg'
                } hover:-translate-y-1`}
              >
                {/* Top: Price & Title */}
                <div>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#0284c7] tracking-tight">
                      {pkg.price}
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      {pkg.period}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#031F5E] mb-2">
                    {pkg.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 mb-8 leading-relaxed">
                    {pkg.subtitle}
                  </p>

                  {/* Feature Bullets with blue dot */}
                  <ul className="space-y-3.5 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                        <span className="w-2 h-2 rounded-full bg-[#0284c7] flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-4">
                  {isRegular ? (
                    <button
                      onClick={() => onSelectPackage(pkg.name, pkg.price)}
                      className="w-full py-3 px-6 rounded-full bg-[#eab308] hover:bg-[#ca8a04] text-white text-xs sm:text-sm font-bold tracking-wide shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95 text-center"
                    >
                      Choose Package
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectPackage(pkg.name, pkg.price)}
                      className="w-full py-3 px-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-[#031F5E] text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer active:scale-95 text-center border border-slate-200"
                    >
                      Choose Package
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

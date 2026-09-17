import { useState, useRef, PointerEvent, MouseEvent } from 'react';
import { Sparkles, MapPin, Clock, ArrowLeftRight, Check, Eye } from 'lucide-react';
import { beforeAfterItems } from '../data/mockData';

interface BeforeAfterSectionProps {
  onOpenBooking: (serviceName?: string) => void;
  onViewMoreTransformations?: () => void;
}

export function BeforeAfterSection({ onOpenBooking, onViewMoreTransformations }: BeforeAfterSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Bedroom');
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const activeItem = beforeAfterItems.find(item => item.category === selectedCategory) || beforeAfterItems[0];

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const updateSlider = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    updateSlider(e.clientX);
  };

  const handleSliderClick = (e: MouseEvent<HTMLDivElement>) => {
    updateSlider(e.clientX);
  };

  return (
    <section id="results" className="py-20 sm:py-28 bg-[#021338] text-white relative overflow-hidden select-none">
      {/* Deep blue atmospheric lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[120px] bg-sky-500/15 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full blur-[100px] bg-blue-600/15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/90 border border-sky-400/40 text-sky-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles size={13} className="text-sky-300" />
            <span>6. Visual Signature</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]">
            See the <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-200 to-white">Dr•Kleen Difference</span>
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Real spaces restored to peak clinical cleanliness. Drag the slider to witness our industrial steam and chemical decontamination results.
          </p>

          {/* Category Tabs: Bedroom, Sofa, Office, Post-construction space */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {beforeAfterItems.map((item) => (
              <button
                key={item.category}
                onClick={() => {
                  setSelectedCategory(item.category);
                  setSliderPosition(50);
                }}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === item.category
                    ? 'bg-[#1693d9] text-white shadow-[0_0_20px_rgba(22,147,217,0.4)] scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10'
                }`}
              >
                {item.category}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Split Slider Box */}
        <div className="max-w-5xl mx-auto bg-slate-900/90 rounded-3xl p-4 sm:p-6 border border-sky-500/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md">
          
          {/* Header info bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/10 gap-3 text-xs sm:text-sm text-slate-300">
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                {activeItem.title}
              </h3>
              <div className="flex items-center gap-4 mt-1 text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-sky-400" />
                  {activeItem.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-emerald-400" />
                  Turnaround: {activeItem.timeSpent}
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-950/80 border border-sky-400/30 text-sky-200 text-xs font-semibold self-start sm:self-center">
              <ArrowLeftRight size={13} className="animate-pulse" />
              <span>Drag slider left / right</span>
            </div>
          </div>

          {/* Interactive Split Viewport Container */}
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            onClick={handleSliderClick}
            className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden cursor-ew-resize touch-none select-none shadow-inner"
          >
            {/* Background Full Layer: AFTER image */}
            <img
              src={activeItem.afterImage}
              alt={`${activeItem.title} After Dr.Kleen`}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Label: AFTER */}
            <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-emerald-500/90 text-white text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-lg border border-emerald-300/40">
              AFTER Dr•Kleen
            </div>

            {/* Foreground Clipped Layer: BEFORE image */}
            <div
              style={{ width: `${sliderPosition}%` }}
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-[0_0_20px_rgba(0,0,0,0.8)] z-10"
            >
              <img
                src={activeItem.beforeImage}
                alt={`${activeItem.title} Before Dr.Kleen`}
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100vw' }}
                className="absolute inset-y-0 left-0 max-w-none h-full object-cover filter contrast-[1.05]"
                referrerPolicy="no-referrer"
              />
              {/* Label: BEFORE */}
              <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-amber-300 text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-lg border border-amber-400/40">
                BEFORE
              </div>
            </div>

            {/* Central Draggable Handle */}
            <div
              style={{ left: `${sliderPosition}%` }}
              className="absolute inset-y-0 -translate-x-1/2 z-30 pointer-events-none flex items-center justify-center"
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white text-[#031F5E] shadow-[0_0_25px_rgba(22,147,217,0.8)] border-2 border-sky-400 flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
                <ArrowLeftRight size={18} strokeWidth={2.5} />
              </div>
            </div>

          </div>

          {/* Details & Result Summary */}
          <div className="mt-5 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl font-normal">
              <span className="font-bold text-white">Technician Notes:</span> {activeItem.details}
            </p>

            <button
              onClick={() => onOpenBooking(`Book ${activeItem.category} Clean`)}
              className="px-6 py-2.5 rounded-full bg-[#1693d9] hover:bg-[#1281bf] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 shrink-0 self-start sm:self-center cursor-pointer"
            >
              Request Similar Result
            </button>
          </div>

        </div>

        {/* Real work. Real results. Tagline and CTA */}
        <div className="mt-14 text-center">
          <div className="inline-block">
            <p className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Real work. Real results.
            </p>
            <div className="h-1 w-20 bg-[#1693d9] mx-auto mt-2 rounded-full" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onViewMoreTransformations || (() => onOpenBooking('Before/After Gallery Inquiry'))}
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/20 hover:border-sky-300 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Eye size={16} className="text-sky-300" />
              <span>See More Transformations</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

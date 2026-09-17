import { useState, useEffect, useRef } from 'react';
import { Home, Building2, Bug, HardHat, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { serviceCategories } from '../data/mockData';
import { SparkleIcon } from './common/SparkleIcon';
import { NeedSectionBackground } from './NeedSectionBackground';

interface NeedSectionProps {
  onSelectCategory: (categoryTitle: string) => void;
}

export function NeedSection({ onSelectCategory }: NeedSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  // Viewport-aware scroll reveal using Intersection Observer
  useEffect(() => {
    // If prefers-reduced-motion is on, show immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.12,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Desktop Mouse Parallax for decorative background layers
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = Math.max(-200, Math.min(200, e.clientX - centerX));
      const deltaY = Math.max(-200, Math.min(200, e.clientY - centerY));

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setParallaxOffset({ x: deltaX, y: deltaY });
      });
    };

    const el = sectionRef.current;
    if (el) {
      el.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (el) {
        el.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Individual icon micro-render with category-specific icon treatments
  const renderCategoryIcon = (iconName: string, categoryId: string) => {
    const isHovered = hoveredCategory === categoryId;

    switch (iconName) {
      case 'home':
        return (
          <Home
            size={32}
            strokeWidth={2.2}
            className={`transition-all duration-300 ${
              isHovered ? 'scale-110 -translate-y-0.5 text-[#1693d9]' : 'text-[#1693d9]'
            }`}
          />
        );
      case 'building':
        return (
          <Building2
            size={32}
            strokeWidth={2.2}
            className={`transition-all duration-300 ${
              isHovered ? 'scale-110 -translate-y-0.5 text-[#0284c7]' : 'text-[#0284c7]'
            }`}
          />
        );
      case 'bug':
        return (
          <Bug
            size={32}
            strokeWidth={2.2}
            className={`transition-all duration-300 ${
              isHovered ? 'scale-115 rotate-6 text-[#ff6b4a]' : 'text-[#ff6b4a]'
            }`}
          />
        );
      case 'hard-hat':
        return (
          <HardHat
            size={32}
            strokeWidth={2.2}
            className={`transition-all duration-300 ${
              isHovered ? 'scale-110 -rotate-3 text-[#d97706]' : 'text-[#d97706]'
            }`}
          />
        );
      case 'help-circle':
      default:
        return (
          <HelpCircle
            size={32}
            strokeWidth={2.2}
            className={`transition-all duration-300 ${
              isHovered ? 'scale-115 rotate-12 text-[#0284c7]' : 'text-[#0284c7]'
            }`}
          />
        );
    }
  };

  // Dedicated Theme Styling for each card matching reference
  const getThemeStyling = (categoryId: string) => {
    switch (categoryId) {
      case 'pest':
        // Distinct warm coral / alert styling
        return {
          iconBg: 'bg-[#fff5f2] border-[#ffe2dc] shadow-[inset_0_0_12px_rgba(255,107,74,0.06)]',
          hoverBorder: 'hover:border-[#ff6b4a]/60',
          hoverShadow: 'hover:shadow-[0_22px_45px_-10px_rgba(255,107,74,0.22)]',
          arrowStyle:
            'bg-orange-50 text-[#ff6b4a] border-orange-200 group-hover:bg-[#ff6b4a] group-hover:text-white group-hover:border-[#ff6b4a] group-hover:shadow-[0_4px_12px_rgba(255,107,74,0.4)]',
          selectedRing: 'ring-2 ring-[#ff6b4a] border-transparent',
          accentColor: '#ff6b4a',
        };
      case 'post-construction':
        // Distinct yellow / golden accent styling
        return {
          iconBg: 'bg-[#fffbeb] border-[#fef08a] shadow-[inset_0_0_12px_rgba(217,119,6,0.06)]',
          hoverBorder: 'hover:border-[#f59e0b]/60',
          hoverShadow: 'hover:shadow-[0_22px_45px_-10px_rgba(217,119,6,0.22)]',
          arrowStyle:
            'bg-amber-50 text-[#d97706] border-amber-200 group-hover:bg-[#d97706] group-hover:text-white group-hover:border-[#d97706] group-hover:shadow-[0_4px_12px_rgba(217,119,6,0.4)]',
          selectedRing: 'ring-2 ring-[#d97706] border-transparent',
          accentColor: '#d97706',
        };
      case 'home':
        // Crisp sky blue styling
        return {
          iconBg: 'bg-[#f0f9ff] border-[#e0f2fe] shadow-[inset_0_0_12px_rgba(22,147,217,0.06)]',
          hoverBorder: 'hover:border-[#1693d9]/60',
          hoverShadow: 'hover:shadow-[0_22px_45px_-10px_rgba(22,147,217,0.2)]',
          arrowStyle:
            'bg-sky-50 text-[#1693d9] border-sky-200 group-hover:bg-[#1693d9] group-hover:text-white group-hover:border-[#1693d9] group-hover:shadow-[0_4px_12px_rgba(22,147,217,0.35)]',
          selectedRing: 'ring-2 ring-[#1693d9] border-transparent',
          accentColor: '#1693d9',
        };
      case 'business':
        // Professional corporate blue styling
        return {
          iconBg: 'bg-[#f0f7ff] border-[#dbeafe] shadow-[inset_0_0_12px_rgba(2,132,199,0.06)]',
          hoverBorder: 'hover:border-[#0284c7]/60',
          hoverShadow: 'hover:shadow-[0_22px_45px_-10px_rgba(2,132,199,0.2)]',
          arrowStyle:
            'bg-blue-50 text-[#0284c7] border-blue-200 group-hover:bg-[#0284c7] group-hover:text-white group-hover:border-[#0284c7] group-hover:shadow-[0_4px_12px_rgba(2,132,199,0.35)]',
          selectedRing: 'ring-2 ring-[#0284c7] border-transparent',
          accentColor: '#0284c7',
        };
      case 'not-sure':
      default:
        // Friendly guidance sky styling
        return {
          iconBg: 'bg-[#f0f9ff] border-[#e0f2fe] shadow-[inset_0_0_12px_rgba(2,132,199,0.06)]',
          hoverBorder: 'hover:border-[#0284c7]/60',
          hoverShadow: 'hover:shadow-[0_22px_45px_-10px_rgba(2,132,199,0.2)]',
          arrowStyle:
            'bg-sky-50 text-[#0284c7] border-sky-200 group-hover:bg-[#0284c7] group-hover:text-white group-hover:border-[#0284c7] group-hover:shadow-[0_4px_12px_rgba(2,132,199,0.35)]',
          selectedRing: 'ring-2 ring-[#0284c7] border-transparent',
          accentColor: '#0284c7',
        };
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-gradient-to-b from-[#f5f9fe] via-[#f8fbfe] to-white py-18 sm:py-22 lg:py-28 overflow-hidden scroll-mt-20 select-none"
    >
      {/* 1. Atmospheric Decorative Artwork: Curves, Dots, Floating Blobs & Sparkles */}
      <NeedSectionBackground parallaxOffset={parallaxOffset} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2. Section Header: Left Main Heading + Right Supporting Heading & Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-12 sm:mb-16">
          
          {/* Left Main Heading */}
          <div
            style={{ animationDelay: '80ms' }}
            className={`lg:col-span-5 relative ${
              isVisible ? 'animate-hero-slide-up' : 'opacity-0'
            }`}
          >
            <h2
              id="what-do-you-need-heading"
              className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#031F5E] tracking-tight leading-[1.15]"
            >
              What Do You Need?
            </h2>

            {/* Subtle floating sparkle icon above heading */}
            <div
              className="absolute -top-5 right-8 sm:right-16 text-sky-400 animate-pulse [animation-duration:3s]"
              aria-hidden="true"
            >
              <SparkleIcon size={22} />
            </div>
          </div>

          {/* Right Supporting Content */}
          <div
            style={{ animationDelay: '160ms' }}
            className={`lg:col-span-7 space-y-2 lg:pl-6 ${
              isVisible ? 'animate-hero-slide-up' : 'opacity-0'
            }`}
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-snug">
              Tell us what you need. <br className="hidden sm:inline" />
              We'll{' '}
              <span className="text-[#0284c7] underline decoration-[#0284c7]/40 decoration-wavy underline-offset-4">
                handle
              </span>{' '}
              the rest.
            </h3>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal pt-1 max-w-2xl">
              Choose a category below so we can better understand your needs and deliver the right solution.
            </p>
          </div>

        </div>

        {/* 3. Five Service-Category Cards in Responsive Grid */}
        <div
          role="region"
          aria-label="Service categories selection"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6"
        >
          {serviceCategories.map((category, index) => {
            const styling = getThemeStyling(category.id);
            const isSelected = activeCategory === category.id;
            const staggerDelay = 220 + index * 80;

            return (
              <div
                key={category.id}
                id={`need-card-${category.id}`}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
                aria-label={`${category.title} cleaning service. ${category.description}`}
                onClick={() => {
                  setActiveCategory(category.id);
                  onSelectCategory(category.title);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveCategory(category.id);
                    onSelectCategory(category.title);
                  }
                }}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{ animationDelay: `${staggerDelay}ms` }}
                className={`group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-6 lg:p-5 xl:p-6 border border-slate-200/90 flex flex-col justify-between items-center text-center cursor-pointer relative transition-all duration-300 ease-out shadow-[0_4px_20px_-4px_rgba(3,31,94,0.06)] hover:-translate-y-2 hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1693d9] focus-visible:ring-offset-2 ${
                  styling.hoverBorder
                } ${styling.hoverShadow} ${
                  isSelected ? styling.selectedRing : ''
                } ${isVisible ? 'animate-card-reveal' : 'opacity-0'}`}
              >
                {/* Micro-glow highlight border line */}
                <div
                  className="absolute inset-x-6 top-0 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: styling.accentColor }}
                />

                {/* Top: Category Icon Container */}
                <div
                  className={`w-20 h-20 rounded-2xl border ${styling.iconBg} flex items-center justify-center mb-5 sm:mb-6 transition-all duration-300 group-hover:scale-108`}
                >
                  {renderCategoryIcon(category.icon, category.id)}
                </div>

                {/* Middle: Title & Supporting Description */}
                <div className="w-full">
                  <h4 className="text-base sm:text-lg font-extrabold text-[#031F5E] mb-2 tracking-tight group-hover:text-[#0284c7] transition-colors duration-200">
                    {category.title}
                  </h4>

                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed whitespace-pre-line mb-6 sm:mb-8 min-h-[38px] flex items-center justify-center font-normal">
                    {category.description}
                  </p>
                </div>

                {/* Bottom: Directional Arrow Button */}
                <div className="mt-auto">
                  <span
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ease-out ${styling.arrowStyle}`}
                  >
                    <ArrowRight
                      size={16}
                      strokeWidth={2.4}
                      className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Small Instructional Indicator Below Cards */}
        <div
          style={{ animationDelay: '650ms' }}
          className={`mt-10 sm:mt-14 flex justify-center ${
            isVisible ? 'animate-hero-slide-up' : 'opacity-0'
          }`}
        >
          <div
            id="need-instructional-indicator"
            className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-white/95 border border-sky-200/80 text-sky-800 text-xs sm:text-sm font-semibold shadow-xs animate-indicator-breathe backdrop-blur-sm cursor-default hover:border-sky-300 transition-colors"
          >
            <Sparkles size={14} className="text-[#1693d9] animate-pulse" />
            <span>Tap a category to get started</span>
          </div>
        </div>

      </div>
    </section>
  );
}

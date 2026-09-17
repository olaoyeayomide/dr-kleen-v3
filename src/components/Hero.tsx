import { useState, useEffect, useRef, MouseEvent } from 'react';
import { Users, TrendingUp, Play, Check, Sparkles } from 'lucide-react';
import { HeroBackground } from './HeroBackground';
import { TrustBanner } from './TrustBanner';

interface HeroProps {
  onOpenBooking: (serviceName?: string) => void;
  onCallNow: () => void;
}

export function Hero({ onOpenBooking, onCallNow }: HeroProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  // Trigger choreographed entrance sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Desktop Mouse Parallax (clamped, subtle, disabled on touch/reduced-motion)
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    let rafId: number;
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate clamped delta from center
      const deltaX = Math.max(-250, Math.min(250, e.clientX - centerX));
      const deltaY = Math.max(-250, Math.min(250, e.clientY - centerY));

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setParallaxOffset({ x: deltaX, y: deltaY });
      });
    };

    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (heroEl) {
        heroEl.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative bg-[#031F5E] overflow-hidden text-white pt-8 sm:pt-12 lg:pt-16 select-none"
    >
      {/* 1. Atmospheric Deep Blue Background with Bubbles, Orbits, Dots, and Sparkles */}
      <HeroBackground parallaxOffset={parallaxOffset} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pb-14 sm:pb-18 lg:pb-22">
          
          {/* LEFT COLUMN: Trust Badge, Headline, Paragraph, CTAs */}
          <div className="lg:col-span-6 z-20 space-y-6 sm:space-y-7 text-center lg:text-left">
            
            {/* 1. Trust / Establishment Label */}
            <div
              style={{ animationDelay: '100ms' }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#072468]/90 border border-sky-400/30 text-sky-200 text-xs font-semibold tracking-wider uppercase shadow-inner backdrop-blur-md group hover:border-sky-400/60 transition-colors ${
                hasMounted ? 'animate-hero-slide-up' : 'opacity-0'
              }`}
            >
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-sky-400/20 text-sky-300 group-hover:scale-110 transition-transform">
                <Check size={11} strokeWidth={3} />
              </span>
              <span className="tracking-widest text-[11px] sm:text-xs">
                ESTABLISHED SINCE 2019
              </span>
            </div>

            {/* 2. Main Headline with Progressive Line Stagger */}
            <h1
              id="hero-main-heading"
              className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.14] tracking-tight"
            >
              <span
                style={{ animationDelay: '180ms' }}
                className={`block transition-all ${
                  hasMounted ? 'animate-hero-slide-up' : 'opacity-0'
                }`}
              >
                A New Solutions For
              </span>
              <span
                style={{ animationDelay: '260ms' }}
                className={`block text-white transition-all ${
                  hasMounted ? 'animate-hero-slide-up' : 'opacity-0'
                }`}
              >
                Your Home Cleaning
              </span>
            </h1>

            {/* 3. Supporting Paragraph */}
            <p
              style={{ animationDelay: '340ms' }}
              className={`text-slate-300/90 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal ${
                hasMounted ? 'animate-hero-slide-up' : 'opacity-0'
              }`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </p>

            {/* 4. Action Buttons: Book Inspection (Primary) + Call Now (Secondary) */}
            <div
              style={{ animationDelay: '420ms' }}
              className={`flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-5 pt-1 sm:pt-2 ${
                hasMounted ? 'animate-hero-slide-up' : 'opacity-0'
              }`}
            >
              {/* Primary CTA: "Book Inspection" with Light Sweep Sheen */}
              <button
                id="hero-book-inspection-btn"
                onClick={() => onOpenBooking('Home Inspection')}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 sm:py-4 rounded-full bg-[#1693d9] hover:bg-[#1281bf] text-white text-sm font-bold tracking-wide shadow-lg shadow-sky-950/50 hover:shadow-[0_10px_28px_-4px_rgba(22,147,217,0.55)] hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.97] active:translate-y-0 transition-all duration-200 ease-out cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2596be] focus-visible:ring-offset-2 focus-visible:ring-offset-[#031F5E]"
                aria-label="Book a free home cleaning inspection"
              >
                {/* Diagonal Translucent Light-Sweep Sheen */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 w-[200%] h-full pointer-events-none -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-20deg]"
                />

                {/* Ambient button soft glow */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0%,transparent_70%)]"
                />

                <span className="relative z-10 flex items-center gap-2">
                  <span>Book Inspection</span>
                </span>
              </button>

              {/* Secondary CTA: "Call Now" with circle outline & micro-interaction */}
              <button
                id="hero-call-now-btn"
                onClick={onCallNow}
                className="group flex items-center gap-3 text-sm font-bold text-white hover:text-sky-300 transition-all duration-200 cursor-pointer py-2 px-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#031F5E] hover:-translate-y-0.5"
                aria-label="Call Dr.Kleen now for immediate cleaning service"
              >
                <span className="flex items-center justify-center w-10 sm:w-11 h-10 sm:h-11 rounded-full border-2 border-white/80 group-hover:border-sky-300 bg-white/10 group-hover:bg-sky-400/20 shadow-md group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] group-hover:scale-105 transition-all duration-200">
                  <Play
                    size={14}
                    className="fill-white group-hover:fill-sky-300 translate-x-0.5 transition-colors"
                  />
                </span>
                <span className="tracking-wide text-sm font-semibold">Call Now</span>
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: Layered Cleaner Composition with Floating Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-4 lg:pt-0">
            
            {/* Responsive Container with Parallax Response */}
            <div
              style={{
                transform: `translate(${parallaxOffset.x * 0.008}px, ${parallaxOffset.y * 0.008}px)`,
                transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
              className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[500px] mx-auto"
            >
              
              {/* Backplate Radial Lighting Aura behind Cleaner */}
              <div
                aria-hidden="true"
                className="absolute inset-x-8 -top-8 bottom-4 bg-gradient-to-t from-[#031F5E] via-sky-500/15 to-sky-400/20 blur-2xl rounded-[40px] pointer-events-none"
              />

              {/* Main Cleaner Photographic Subject */}
              <div
                style={{ animationDelay: '300ms' }}
                className={`relative overflow-hidden rounded-[28px] sm:rounded-[36px] border-2 border-sky-400/25 shadow-[0_20px_50px_rgba(2,19,56,0.7)] bg-gradient-to-b from-sky-950/60 via-[#031F5E]/80 to-[#031F5E] ${
                  hasMounted ? 'animate-hero-scale-up' : 'opacity-0'
                }`}
              >
                {/* Organic Idle Float on the Cleaner Image Container */}
                <div className="relative animate-float-gentle">
                  <img
                    src="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1000&q=85"
                    alt="Dr.Kleen Professional Cleaner with sanitized equipment"
                    className="w-full h-[440px] sm:h-[500px] lg:h-[520px] object-cover object-top filter contrast-[1.03] brightness-[1.02] transform transition-transform duration-700 hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient feathering overlay at base for seamless visual integration */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#031F5E] via-[#031F5E]/70 to-transparent pointer-events-none"
                  />

                  {/* Dr.Kleen Brand Badge on Uniform simulation overlay */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#031F5E]/90 border border-sky-400/40 rounded-full text-white text-xs font-semibold backdrop-blur-md z-10 flex items-center gap-2 shadow-xl whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Dr.Kleen Verified Specialist</span>
                  </div>
                </div>
              </div>

              {/* FLOATING CARD 1: Top Right "Qualified Work Team" */}
              <div
                style={{
                  animationDelay: '480ms',
                  transform: `translate(${parallaxOffset.x * 0.025}px, ${parallaxOffset.y * 0.025}px)`,
                  transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
                className={`absolute -top-4 sm:-top-5 -right-2 sm:-right-6 z-30 ${
                  hasMounted ? 'animate-badge-pop' : 'opacity-0'
                }`}
              >
                <div className="animate-float-alt">
                  <div
                    id="hero-badge-qualified"
                    className="group bg-white/98 text-slate-800 rounded-2xl p-3 sm:p-3.5 shadow-[0_12px_32px_rgba(2,19,56,0.35)] border border-white/90 flex items-center gap-3 backdrop-blur-md hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(2,19,56,0.45)] transition-all duration-300 cursor-default select-none"
                  >
                    <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-xl bg-[#ff6b4a]/15 text-[#ff6b4a] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[#ff6b4a]/20 transition-all duration-300">
                      <Users size={20} strokeWidth={2.5} />
                    </div>
                    <div className="pr-1">
                      <h2 className="text-xs sm:text-sm font-extrabold text-[#031F5E] leading-tight group-hover:text-[#ff6b4a] transition-colors">
                        Qualified
                      </h2>
                      <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                        Work Team
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOATING CARD 2: Bottom Left "Best Cleaning Service" */}
              <div
                style={{
                  animationDelay: '560ms',
                  transform: `translate(${-parallaxOffset.x * 0.02}px, ${-parallaxOffset.y * 0.02}px)`,
                  transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
                className={`absolute bottom-10 sm:bottom-12 -left-2 sm:-left-7 z-30 ${
                  hasMounted ? 'animate-badge-pop' : 'opacity-0'
                }`}
              >
                <div className="animate-float-offset">
                  <div
                    id="hero-badge-best-service"
                    className="group bg-white/98 text-slate-800 rounded-2xl p-3 sm:p-3.5 shadow-[0_12px_32px_rgba(2,19,56,0.35)] border border-white/90 flex items-center gap-3 backdrop-blur-md hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(2,19,56,0.45)] transition-all duration-300 cursor-default select-none"
                  >
                    <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-xl bg-[#ff6b4a]/15 text-[#ff6b4a] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[#ff6b4a]/20 transition-all duration-300">
                      <TrendingUp size={20} strokeWidth={2.5} />
                    </div>
                    <div className="pr-1">
                      <h2 className="text-xs sm:text-sm font-extrabold text-[#031F5E] leading-tight group-hover:text-[#ff6b4a] transition-colors">
                        Best
                      </h2>
                      <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                        Cleaning Service
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* 5. Lower Feature Indicators / Trust Banner */}
      <TrustBanner hasMounted={hasMounted} />
    </section>
  );
}

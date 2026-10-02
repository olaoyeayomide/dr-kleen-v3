import { useState, useEffect, useRef } from "react";
import { Users, TrendingUp, Check } from "lucide-react";

import { HeroBackground } from "./HeroBackground";
import { TrustBanner } from "./TrustBanner";

interface HeroProps {
  onOpenBooking: (serviceName?: string) => void;
  onCallNow: () => void;
}

export function Hero({ onOpenBooking, onCallNow }: HeroProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  const heroRef = useRef<HTMLElement>(null);

  /* -------------------------------------------------------
     HERO ENTRANCE
  ------------------------------------------------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMounted(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  /* -------------------------------------------------------
     DESKTOP PARALLAX
  ------------------------------------------------------- */
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isTouch || prefersReducedMotion) return;

    let rafId = 0;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = Math.max(-250, Math.min(250, e.clientX - centerX));
      const deltaY = Math.max(-250, Math.min(250, e.clientY - centerY));

      cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        setParallaxOffset({
          x: deltaX,
          y: deltaY,
        });
      });
    };

    const heroEl = heroRef.current;

    if (heroEl) {
      heroEl.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (heroEl) {
        heroEl.removeEventListener("mousemove", handleMouseMove);
      }

      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#031F5E]
        text-white
        select-none
        pt-8
        sm:pt-16
        lg:pt-20
      "
    >
      {/* =====================================================
          ATMOSPHERIC BACKGROUND
      ====================================================== */}
      <HeroBackground parallaxOffset={parallaxOffset} />

      {/* Soft light behind the cleaner */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-15%]
          top-[5%]
          h-[650px]
          w-[650px]
          rounded-full
          bg-[#1E9BE0]/20
          blur-[130px]
          opacity-70
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-20%]
          bottom-[-20%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#6FCBFB]/10
          blur-[120px]
        "
      />

      {/* =====================================================
          MAIN HERO
      ====================================================== */}
      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1440px]
          px-4
          xs:px-6
          sm:px-8
          lg:px-10
          xl:px-14
        "
      >
        <div
          className="
            relative
            grid
            min-h-[550px]
            grid-cols-1
            items-center
            sm:min-h-[650px]
            lg:min-h-[700px]
            lg:grid-cols-12
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================= */}
          <div
            className="
              relative
              z-30
              col-span-1
              max-w-[700px]
              pt-4
              pb-8
              text-center
              sm:pt-8
              sm:pb-10
              lg:col-span-7
              lg:pt-10
              lg:pb-24
              lg:text-left
            "
          >
            {/* TRUST LABEL */}
            <div
              style={{ animationDelay: "100ms" }}
              className={`
                inline-flex
                items-center
                gap-1.5
                sm:gap-2
                rounded-full
                border
                border-white/15
                bg-white/5
                px-3
                py-1
                sm:px-4
                sm:py-1.5
                text-[9px]
                xs:text-[10px]
                sm:text-xs
                md:text-sm
                font-bold
                uppercase
                tracking-[0.15em]
                sm:tracking-[0.18em]
                text-white/90
                shadow-lg
                backdrop-blur-md
                ${hasMounted ? "animate-hero-slide-up" : "opacity-0"}
              `}
            >
              <span
                className="
                  flex
                  h-3.5
                  w-3.5
                  sm:h-4
                  sm:w-4
                  items-center
                  justify-center
                  rounded-full
                  bg-[#1E9BE0]/20
                  text-[#6FCBFB]
                "
              >
                <Check
                  size={10}
                  strokeWidth={3}
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                />
              </span>

              <span>Established Since 2019</span>
            </div>

            {/* =================================================
                HEADLINE
            ================================================= */}
            <div className="relative mt-4 xs:mt-5 sm:mt-7">
              <h1
                id="hero-main-heading"
                className="
                  mx-auto
                  lg:mx-0
                  max-w-[660px]
                  font-display
                  font-extrabold
                  text-3xl
                  xs:text-4xl
                  sm:text-5xl
                  md:text-6xl
                  lg:text-[3.5rem]
                  xl:text-[58px]
                  2xl:text-[58px]
                  leading-[1.08]
                  tracking-tight
                  text-white
                "
              >
                {/* FIRST LINE */}
                <span
                  style={{ animationDelay: "180ms" }}
                  className={`
                    block
                    ${hasMounted ? "animate-hero-slide-up" : "opacity-0"}
                  `}
                >
                  A New Solution For Your Home Cleaning
                </span>
              </h1>

              {/* =================================================
                  LARGE SPARKLE / STAR
              ================================================= */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="
                  pointer-events-none
                  absolute
                  right-[2%]
                  top-[-10%]
                  h-8
                  w-8
                  rotate-[-8deg]
                  text-white
                  drop-shadow-[0_0_14px_rgba(255,255,255,0.35)]
                  xs:h-10
                  xs:w-10
                  sm:right-[6%]
                  sm:top-[5%]
                  sm:h-16
                  sm:w-16
                  lg:right-[3%]
                  lg:top-[10%]
                  lg:h-[72px]
                  lg:w-[72px]
                "
              >
                <path
                  fill="currentColor"
                  d="
                    M50 0
                    C55 31 69 45 100 50
                    C69 55 55 69 50 100
                    C45 69 31 55 0 50
                    C31 45 45 31 50 0
                    Z
                  "
                />
              </svg>

              {/* SMALL SPARKLE */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="
                  pointer-events-none
                  absolute
                  right-[-2%]
                  top-[-18%]
                  h-3
                  w-3
                  text-[#FFC94D]
                  xs:h-4
                  xs:w-4
                  sm:h-5
                  sm:w-5
                  lg:right-[0%]
                "
              >
                <path
                  fill="currentColor"
                  d="
                    M50 0
                    C54 31 69 46 100 50
                    C69 54 54 69 50 100
                    C46 69 31 54 0 50
                    C31 46 46 31 50 0
                    Z
                  "
                />
              </svg>
            </div>

            {/* DESCRIPTION */}
            <p
              style={{ animationDelay: "360ms" }}
              className={`
                mx-auto
                mt-4
                sm:mt-5
                lg:mt-7
                max-w-[570px]
                text-xs
                xs:text-sm
                sm:text-base
                md:text-lg
                lg:text-xl
                leading-relaxed
                text-white/80
                lg:mx-0
                ${hasMounted ? "animate-hero-slide-up" : "opacity-0"}
              `}
            >
              Professional cleaning, hygiene and pest-control solutions designed
              to keep your home spotless, healthy and protected. Booked in
              minutes, done right the first time.
            </p>

            {/* =================================================
                BUTTONS
            ================================================= */}
            <div
              style={{ animationDelay: "430ms" }}
              className={`
                mt-6
                sm:mt-8
                flex
                flex-wrap
                items-center
                justify-center
                gap-3
                xs:gap-4
                lg:justify-start
                ${hasMounted ? "animate-hero-slide-up" : "opacity-0"}
              `}
            >
              {/* PRIMARY */}
              <button
                id="hero-book-inspection-btn"
                onClick={() => onOpenBooking("Home Inspection")}
                className="
                  group
                  relative
                  inline-flex
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  bg-[#1E9BE0]
                  px-5
                  py-2.5
                  xs:px-6
                  xs:py-3
                  sm:px-7
                  sm:py-3.5
                  text-xs
                  xs:text-sm
                  sm:text-base
                  font-extrabold
                  tracking-wide
                  text-white
                  shadow-[0_12px_30px_rgba(30,155,224,0.28)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#1693d9]
                  hover:shadow-[0_18px_38px_rgba(30,155,224,0.4)]
                  active:scale-95
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#6FCBFB]
                "
                aria-label="Book a free home cleaning inspection"
              >
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    skew-x-[-20deg]
                    bg-gradient-to-r
                    from-transparent
                    via-white/30
                    to-transparent
                    transition-transform
                    duration-700
                    group-hover:translate-x-full
                  "
                />

                <span className="relative z-10">Book Inspection</span>
              </button>

              {/* SECONDARY — Call Now */}
              <button
                id="hero-call-now-btn"
                onClick={onCallNow}
                className="
                  group
                  inline-flex
                  items-center
                  gap-2.5
                  xs:gap-3
                  rounded-full
                  px-3
                  py-1.5
                  xs:px-4
                  xs:py-2
                  text-xs
                  xs:text-sm
                  sm:text-base
                  font-bold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:text-[#6FCBFB]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#6FCBFB]
                "
                aria-label="Call Dr.Kleen now"
              >
                <span
                  className="
                    flex
                    h-8
                    w-8
                    xs:h-9
                    xs:w-9
                    sm:h-10
                    sm:w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/70
                    bg-white/10
                    transition-all
                    duration-300
                    group-hover:border-[#1E9BE0]
                    group-hover:bg-[#1E9BE0]/20
                    group-hover:scale-105
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="
                      h-3.5
                      w-3.5
                      xs:h-4
                      xs:w-4
                      fill-none
                      stroke-current
                    "
                    strokeWidth="2"
                  >
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2
                      19.79 19.79 0 0 1-8.63-3.07
                      19.5 19.5 0 0 1-6-6
                      19.79 19.79 0 0 1-3.07-8.67
                      A2 2 0 0 1 4.11 2h3
                      a2 2 0 0 1 2 1.72
                      12.84 12.84 0 0 0 .7 2.81
                      2 2 0 0 1-.45 2.11L8.09 9.91
                      a16 16 0 0 0 6 6l1.27-1.27
                      a2 2 0 0 1 2.11-.45
                      12.84 12.84 0 0 0 2.81.7
                      A2 2 0 0 1 22 16.92z"
                    />
                  </svg>
                </span>

                <span>
                  <a href="tel:+2349158929174">Call Now</a>
                </span>
              </button>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE — LARGE BORDERLESS PERSON
          ================================================= */}
          <div
            className="
              relative
              z-20
              col-span-1
              flex
              min-h-[380px]
              xs:min-h-[430px]
              sm:min-h-[470px]
              items-end
              justify-center
              lg:absolute
              lg:right-[-5%]
              lg:top-20
              lg:col-span-5
              lg:h-full
              lg:w-[58%]
              lg:min-h-0
              lg:justify-end
            "
          >
            {/* PERSON LIGHT / GLOW */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                right-[5%]
                top-[15%]
                h-[280px]
                w-[280px]
                rounded-full
                bg-[#6FCBFB]/20
                blur-[80px]
                xs:h-[350px]
                xs:w-[350px]
                sm:h-[480px]
                sm:w-[480px]
                sm:blur-[100px]
                lg:right-[8%]
                lg:top-[10%]
                lg:h-[580px]
                lg:w-[580px]
              "
            />

            {/* IMAGE WRAPPER */}
            <div
              style={{
                transform: `
                  translate(
                    ${parallaxOffset.x * 0.018}px,
                    ${parallaxOffset.y * 0.012}px
                  )
                `,
                transition: "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
              className={`
                relative
                flex
                h-full
                w-full
                items-end
                justify-center
                lg:justify-end
                ${hasMounted ? "animate-hero-scale-up" : "opacity-0"}
              `}
            >
              {/* =================================================
                  BORDERLESS CLEANER IMAGE
              ================================================= */}
              <div
                className="
                  relative
                  flex
                  h-[380px]
                  w-full
                  items-end
                  justify-center
                  xs:h-[440px]
                  sm:h-[570px]
                  lg:h-[700px]
                  lg:w-[650px]
                  xl:h-[740px]
                  xl:w-[700px]
                "
              >
                <img
                  src="https://i.ibb.co/B5HwgBwN/Chat-GPT-Image-Sep-18-2026-08-14-35-PM.png"
                  alt="Dr.Kleen Professional Cleaner"
                  referrerPolicy="no-referrer"
                  className="
                    absolute
                    bottom-0
                    h-full
                    w-full
                    object-contain
                    object-bottom
                    contrast-[1.04]
                    brightness-[1.04]
                    drop-shadow-[0_30px_50px_rgba(0,0,0,0.28)]
                    transition-transform
                    duration-700
                    hover:scale-[1.015]
                  "
                />

                {/* LEFT FEATHER */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    left-0
                    bg-gradient-to-r
                    from-[#031F5E]
                    via-[#031F5E]/55
                    to-transparent
                  "
                />

                {/* BOTTOM FEATHER */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    h-[28%]
                    bg-gradient-to-t
                    from-[#031F5E]
                    via-[#031F5E]/55
                    to-transparent
                  "
                />
              </div>

              {/* =================================================
                  TOP RIGHT BADGE
              ================================================= */}
              <div
                style={{
                  animationDelay: "500ms",
                  transform: `
                    translate(
                      ${parallaxOffset.x * 0.025}px,
                      ${parallaxOffset.y * 0.025}px
                    )
                  `,
                  transition: "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
                className={`
                  absolute
                  right-0
                  top-[8%]
                  z-40
                  xs:top-[12%]
                  sm:right-2
                  lg:right-[2%]
                  ${hasMounted ? "animate-badge-pop" : "opacity-0"}
                `}
              >
                <div className="animate-float-alt">
                  <div
                    id="hero-badge-qualified"
                    className="
                      flex
                      items-center
                      gap-2
                      xs:gap-3
                      rounded-xl
                      xs:rounded-2xl
                      border
                      border-white/80
                      bg-white/95
                      p-2
                      xs:p-2.5
                      sm:p-3
                      text-slate-800
                      shadow-[0_15px_40px_rgba(2,19,56,0.3)]
                      backdrop-blur-md
                      transition-all
                      duration-300
                      hover:-translate-y-1
                    "
                  >
                    <div
                      className="
                        flex
                        h-8
                        w-8
                        xs:h-9
                        xs:w-9
                        sm:h-10
                        sm:w-10
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        xs:rounded-xl
                        bg-[#FF6F5E]/15
                        text-[#FF6F5E]
                      "
                    >
                      <Users
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        strokeWidth={2.5}
                      />
                    </div>

                    <div className="pr-1">
                      <h2 className="text-[11px] xs:text-xs sm:text-sm font-extrabold text-[#031F5E]">
                        Qualified
                      </h2>

                      <p className="mt-0.5 text-[9px] xs:text-[10px] sm:text-[11px] font-medium text-slate-400">
                        Work Team
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  BOTTOM LEFT BADGE
              ================================================= */}
              <div
                style={{
                  animationDelay: "600ms",
                  transform: `
                    translate(
                      ${-parallaxOffset.x * 0.02}px,
                      ${-parallaxOffset.y * 0.02}px
                    )
                  `,
                  transition: "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
                className={`
                  absolute
                  bottom-[10%]
                  left-0
                  z-40
                  xs:bottom-[13%]
                  sm:left-2
                  lg:bottom-[15%]
                  lg:left-[4%]
                  ${hasMounted ? "animate-badge-pop" : "opacity-0"}
                `}
              >
                <div className="animate-float-offset">
                  <div
                    id="hero-badge-best-service"
                    className="
                      flex
                      items-center
                      gap-2
                      xs:gap-3
                      rounded-xl
                      xs:rounded-2xl
                      border
                      border-white/80
                      bg-white/95
                      p-2
                      xs:p-2.5
                      sm:p-3
                      text-slate-800
                      shadow-[0_15px_40px_rgba(2,19,56,0.3)]
                      backdrop-blur-md
                      transition-all
                      duration-300
                      hover:-translate-y-1
                    "
                  >
                    <div
                      className="
                        flex
                        h-8
                        w-8
                        xs:h-9
                        xs:w-9
                        sm:h-10
                        sm:w-10
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        xs:rounded-xl
                        bg-[#FFC94D]/20
                        text-[#d99500]
                      "
                    >
                      <TrendingUp
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        strokeWidth={2.5}
                      />
                    </div>

                    <div className="pr-1">
                      <h2 className="text-[11px] xs:text-xs sm:text-sm font-extrabold text-[#031F5E]">
                        Trusted
                      </h2>

                      <p className="mt-0.5 text-[9px] xs:text-[10px] sm:text-[11px] font-medium text-slate-400">
                        Cleaning Service
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  DECORATIVE SPARKLES AROUND PERSON
              ================================================= */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="
                  pointer-events-none
                  absolute
                  left-[15%]
                  top-[20%]
                  h-5
                  w-5
                  text-white/80
                  sm:h-6
                  sm:w-6
                  sm:left-[12%]
                  lg:left-[20%]
                "
              >
                <path
                  fill="currentColor"
                  d="
                    M50 0
                    C54 31 69 46 100 50
                    C69 54 54 69 50 100
                    C46 69 31 54 0 50
                    C31 46 46 31 50 0
                    Z
                  "
                />
              </svg>

              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="
                  pointer-events-none
                  absolute
                  right-[20%]
                  top-[8%]
                  h-3.5
                  w-3.5
                  sm:h-4
                  sm:w-4
                  text-[#FFC94D]
                  lg:right-[18%]
                "
              >
                <path
                  fill="currentColor"
                  d="
                    M50 0
                    C54 31 69 46 100 50
                    C69 54 54 69 50 100
                    C46 69 31 54 0 50
                    C31 46 46 31 50 0
                    Z
                  "
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          TRUST / FEATURE BANNER
      ====================================================== */}
      <div className="relative z-40">
        <TrustBanner hasMounted={hasMounted} />
      </div>
    </section>
  );
}

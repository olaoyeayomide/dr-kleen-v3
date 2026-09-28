import { useState, useEffect, useRef } from "react";
import {
  Home,
  Building2,
  Bug,
  HardHat,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { serviceCategories } from "../data/mockData";
import { SparkleIcon } from "./common/SparkleIcon";
import { NeedSectionBackground } from "./NeedSectionBackground";

interface NeedSectionProps {
  onSelectCategory: (categoryTitle: string) => void;
}

export function NeedSection({ onSelectCategory }: NeedSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [parallaxOffset, setParallaxOffset] = useState({
    x: 0,
    y: 0,
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const sectionRef = useRef<HTMLElement>(null);

  /* =========================================================
     VIEWPORT-AWARE SECTION REVEAL
  ========================================================= */

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

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
        rootMargin: "0px 0px -80px 0px",
        threshold: 0.12,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /* =========================================================
     DESKTOP MOUSE PARALLAX
  ========================================================= */

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = Math.max(-200, Math.min(200, e.clientX - centerX));

      const deltaY = Math.max(-200, Math.min(200, e.clientY - centerY));

      cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        setParallaxOffset({
          x: deltaX,
          y: deltaY,
        });
      });
    };

    const element = sectionRef.current;

    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
      }

      cancelAnimationFrame(rafId);
    };
  }, []);

  /* =========================================================
     RESPONSIVE CAROUSEL CONFIGURATION
     
     Desktop  = 3 cards
     Tablet   = 2 cards
     Mobile   = 1 card
  ========================================================= */

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();

    window.addEventListener("resize", updateVisibleCards);

    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);

  /* =========================================================
     KEEP CAROUSEL INDEX VALID WHEN SCREEN SIZE CHANGES
  ========================================================= */

  useEffect(() => {
    const maxIndex = Math.max(0, serviceCategories.length - visibleCards);

    if (currentSlide > maxIndex) {
      setCurrentSlide(maxIndex);
    }
  }, [visibleCards, currentSlide]);

  /* =========================================================
     AUTOMATIC RIGHT-TO-LEFT CAROUSEL
  ========================================================= */

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || serviceCategories.length <= visibleCards) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentSlide((previous) => {
        const maxIndex = serviceCategories.length - visibleCards;

        return previous >= maxIndex ? 0 : previous + 1;
      });
    }, 4500);

    return () => {
      window.clearInterval(interval);
    };
  }, [visibleCards]);

  /* =========================================================
     CATEGORY ICONS
  ========================================================= */

  const renderCategoryIcon = (iconName: string, categoryId: string) => {
    const isHovered = hoveredCategory === categoryId;

    switch (iconName) {
      case "home":
        return (
          <Home
            size={32}
            strokeWidth={2.2}
            className={`transition-all duration-300 ${
              isHovered
                ? "scale-110 -translate-y-0.5 text-[#1693d9]"
                : "text-[#1693d9]"
            }`}
          />
        );

      case "building":
        return (
          <Building2
            size={32}
            strokeWidth={2.2}
            className={`transition-all duration-300 ${
              isHovered
                ? "scale-110 -translate-y-0.5 text-[#0284c7]"
                : "text-[#0284c7]"
            }`}
          />
        );

      case "bug":
        return (
          <Bug
            size={32}
            strokeWidth={2.2}
            className={`transition-all duration-300 ${
              isHovered ? "scale-110 rotate-6 text-[#ff6b4a]" : "text-[#ff6b4a]"
            }`}
          />
        );

      case "hard-hat":
        return (
          <HardHat
            size={32}
            strokeWidth={2.2}
            className={`transition-all duration-300 ${
              isHovered
                ? "scale-110 -rotate-3 text-[#d97706]"
                : "text-[#d97706]"
            }`}
          />
        );

      case "help-circle":
      default:
        return (
          <HelpCircle
            size={32}
            strokeWidth={2.2}
            className={`transition-all duration-300 ${
              isHovered
                ? "scale-110 rotate-12 text-[#0284c7]"
                : "text-[#0284c7]"
            }`}
          />
        );
    }
  };

  /* =========================================================
     CATEGORY-SPECIFIC THEMES
  ========================================================= */

  const getThemeStyling = (categoryId: string) => {
    switch (categoryId) {
      case "pest":
        return {
          iconBg:
            "bg-[#fff5f2] border-[#ffe2dc] shadow-[inset_0_0_12px_rgba(255,107,74,0.06)]",

          hoverBorder: "hover:border-[#ff6b4a]/60",

          hoverShadow: "hover:shadow-[0_22px_45px_-10px_rgba(255,107,74,0.22)]",

          arrowStyle:
            "bg-orange-50 text-[#ff6b4a] border-orange-200 group-hover:bg-[#ff6b4a] group-hover:text-white group-hover:border-[#ff6b4a] group-hover:shadow-[0_4px_12px_rgba(255,107,74,0.4)]",

          selectedRing: "ring-2 ring-[#ff6b4a] border-transparent",

          accentColor: "#ff6b4a",
        };

      case "post-construction":
        return {
          iconBg:
            "bg-[#fffbeb] border-[#fef08a] shadow-[inset_0_0_12px_rgba(217,119,6,0.06)]",

          hoverBorder: "hover:border-[#f59e0b]/60",

          hoverShadow: "hover:shadow-[0_22px_45px_-10px_rgba(217,119,6,0.22)]",

          arrowStyle:
            "bg-amber-50 text-[#d97706] border-amber-200 group-hover:bg-[#d97706] group-hover:text-white group-hover:border-[#d97706] group-hover:shadow-[0_4px_12px_rgba(217,119,6,0.4)]",

          selectedRing: "ring-2 ring-[#d97706] border-transparent",

          accentColor: "#d97706",
        };

      case "home":
        return {
          iconBg:
            "bg-[#f0f9ff] border-[#e0f2fe] shadow-[inset_0_0_12px_rgba(22,147,217,0.06)]",

          hoverBorder: "hover:border-[#1693d9]/60",

          hoverShadow: "hover:shadow-[0_22px_45px_-10px_rgba(22,147,217,0.2)]",

          arrowStyle:
            "bg-sky-50 text-[#1693d9] border-sky-200 group-hover:bg-[#1693d9] group-hover:text-white group-hover:border-[#1693d9] group-hover:shadow-[0_4px_12px_rgba(22,147,217,0.35)]",

          selectedRing: "ring-2 ring-[#1693d9] border-transparent",

          accentColor: "#1693d9",
        };

      case "business":
        return {
          iconBg:
            "bg-[#f0f7ff] border-[#dbeafe] shadow-[inset_0_0_12px_rgba(2,132,199,0.06)]",

          hoverBorder: "hover:border-[#0284c7]/60",

          hoverShadow: "hover:shadow-[0_22px_45px_-10px_rgba(2,132,199,0.2)]",

          arrowStyle:
            "bg-blue-50 text-[#0284c7] border-blue-200 group-hover:bg-[#0284c7] group-hover:text-white group-hover:border-[#0284c7] group-hover:shadow-[0_4px_12px_rgba(2,132,199,0.35)]",

          selectedRing: "ring-2 ring-[#0284c7] border-transparent",

          accentColor: "#0284c7",
        };

      case "not-sure":
      default:
        return {
          iconBg:
            "bg-[#f0f9ff] border-[#e0f2fe] shadow-[inset_0_0_12px_rgba(2,132,199,0.06)]",

          hoverBorder: "hover:border-[#0284c7]/60",

          hoverShadow: "hover:shadow-[0_22px_45px_-10px_rgba(2,132,199,0.2)]",

          arrowStyle:
            "bg-sky-50 text-[#0284c7] border-sky-200 group-hover:bg-[#0284c7] group-hover:text-white group-hover:border-[#0284c7] group-hover:shadow-[0_4px_12px_rgba(2,132,199,0.35)]",

          selectedRing: "ring-2 ring-[#0284c7] border-transparent",

          accentColor: "#0284c7",
        };
    }
  };

  /* =========================================================
     COMPONENT
  ========================================================= */

  return (
    <section
      ref={sectionRef}
      id="services"
      className="
        relative
        overflow-hidden
        scroll-mt-20
        select-none
        bg-gradient-to-b
        from-[#f5f9fe]
        via-[#f8fbfe]
        to-white
        py-16
        sm:py-20
        lg:py-28
      "
    >
      {/* =====================================================
          ATMOSPHERIC BACKGROUND
      ===================================================== */}

      <NeedSectionBackground parallaxOffset={parallaxOffset} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===================================================
            SECTION HEADER
            LEFT = MAIN HEADLINE
            RIGHT = SUPPORTING COPY
        =================================================== */}

        {/* ===================================================
    SECTION HEADER
    EXACT 50 / 50 SPLIT LIKE REFERENCE
=================================================== */}

        <div
          className={`
    grid
    grid-cols-1
    lg:grid-cols-2
    gap-8
    lg:gap-16
    xl:gap-20
    items-start
    mb-10
    sm:mb-14
    lg:mb-16
  `}
        >
          {/* =================================================
      LEFT HALF — LABEL + MAIN HEADING
  ================================================= */}

          <div
            style={{
              animationDelay: "80ms",
            }}
            className={`
      w-full
      ${isVisible ? "animate-hero-slide-up" : "opacity-0"}
    `}
          >
            {/* Small eyebrow text */}

            <p
              className="
        mb-2
        text-[9px]
        sm:text-[10px]
        font-bold
        uppercase
        tracking-[0.08em]
        text-[#031F5E]
      "
            >
              Some of our features
            </p>

            {/* Main heading */}

            <h2
              id="what-do-you-need-heading"
              className="
        max-w-[560px]
        text-[32px]
        leading-[1.02]
        tracking-[-0.035em]
        font-extrabold
        text-[#031F5E]
        sm:text-[38px]
        lg:text-[42px]
        xl:text-[46px]
      "
            >
              The <span className="text-[#1E9BE0]">benefits</span> that will
              <br />
              make you comfort.
            </h2>
          </div>

          {/* =================================================
      RIGHT HALF — SUPPORTING PARAGRAPH
  ================================================= */}

          <div
            style={{
              animationDelay: "160ms",
            }}
            className={`
      w-full
      pt-1
      lg:pt-2
      ${isVisible ? "animate-hero-slide-up" : "opacity-0"}
    `}
          >
            <p
              className="
        max-w-[560px]
        text-[12px]
        leading-[1.75]
        font-normal
        text-[#64748B]
        sm:text-[13px]
        lg:text-[14px]
      "
            >
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque. At vero eos et
              accusamus et iusto odio dignissimos ducimus qui blanditiis
              praesentium voluptatum deleniti atque.
            </p>
          </div>
        </div>

        {/* ===================================================
            PREMIUM SERVICE CAROUSEL
        =================================================== */}

        <div
          role="region"
          aria-label="Featured service categories"
          className={`
            relative
            ${isVisible ? "animate-hero-slide-up" : "opacity-0"}
          `}
          style={{
            animationDelay: "220ms",
          }}
        >
          {/* =================================================
              CAROUSEL VIEWPORT
          ================================================= */}

          <div className="relative overflow-hidden">
            {/* LEFT EDGE FADE */}

            <div
              className="
                pointer-events-none
                absolute
                bottom-0
                left-0
                top-0
                z-20
                w-8
                bg-gradient-to-r
                from-[#f5f9fe]
                to-transparent
                sm:w-12
              "
              aria-hidden="true"
            />

            {/* RIGHT EDGE FADE */}

            <div
              className="
                pointer-events-none
                absolute
                bottom-0
                right-0
                top-0
                z-20
                w-8
                bg-gradient-to-l
                from-[#f5f9fe]
                to-transparent
                sm:w-12
              "
              aria-hidden="true"
            />

            {/* =================================================
                SLIDING TRACK
            ================================================= */}

            <div
              className="
                flex
                gap-6
                transition-transform
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
              "
              style={{
                transform: `translateX(calc(-${currentSlide} * ((100% + 24px) / ${visibleCards})))`,
              }}
            >
              {serviceCategories.map((category, index) => {
                const styling = getThemeStyling(category.id);

                const isSelected = activeCategory === category.id;

                return (
                  <article
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
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();

                        setActiveCategory(category.id);

                        onSelectCategory(category.title);
                      }
                    }}
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className={`
                        group
                        relative
                        shrink-0
                        cursor-pointer
                        overflow-hidden
                        rounded-[24px]
                        border
                        border-slate-200/80
                        bg-white
                        shadow-[0_12px_35px_-12px_rgba(3,31,94,0.14)]
                        transition-all
                        duration-500
                        ease-out
                        hover:-translate-y-2
                        hover:shadow-[0_25px_55px_-18px_rgba(3,31,94,0.25)]
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#1693d9]
                        focus-visible:ring-offset-4

                        w-full
                        sm:w-[calc((100%-24px)/2)]
                        lg:w-[calc((100%-48px)/3)]

                        ${isSelected ? styling.selectedRing : ""}

                        ${styling.hoverBorder}
                        ${styling.hoverShadow}
                      `}
                  >
                    {/* =======================================
                          TOP ACCENT LINE
                      ======================================= */}

                    <div
                      className="
                          pointer-events-none
                          absolute
                          left-5
                          right-5
                          top-0
                          z-20
                          h-[3px]
                          rounded-b-full
                          opacity-0
                          transition-opacity
                          duration-500
                          group-hover:opacity-100
                        "
                      style={{
                        backgroundColor: styling.accentColor,
                      }}
                    />

                    {/* =======================================
                          CARD VISUAL AREA
                      ======================================= */}

                    <div
                      className={`
                          relative
                          h-[230px]
                          overflow-hidden
                          sm:h-[250px]
                          lg:h-[285px]
                          ${styling.iconBg}
                        `}
                    >
                      {/* Atmospheric circle */}

                      <div
                        className="
                            absolute
                            -right-12
                            -top-12
                            h-40
                            w-40
                            rounded-full
                            opacity-50
                            blur-2xl
                            transition-transform
                            duration-700
                            group-hover:scale-125
                          "
                        style={{
                          backgroundColor: `${styling.accentColor}20`,
                        }}
                      />

                      {/* Decorative ring */}

                      <div
                        className="
                            absolute
                            -bottom-2
                            -right-10
                            h-32
                            w-32
                            rounded-full
                            border
                            opacity-30
                            transition-transform
                            duration-700
                            group-hover:translate-x-4
                          "
                        style={{
                          borderColor: styling.accentColor,
                        }}
                      />

                      {/* =====================================
                            ICON BADGE
                        ===================================== */}

                      <div
                        className="
                            absolute
                            left-5
                            top-5
                            z-10
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            bg-white/90
                            shadow-[0_10px_25px_-10px_rgba(3,31,94,0.3)]
                            backdrop-blur-md
                            transition-all
                            duration-500
                            group-hover:scale-110
                            group-hover:rotate-2
                            sm:left-6
                            sm:top-6
                            sm:h-16
                            sm:w-16
                          "
                        style={{
                          borderColor: `${styling.accentColor}35`,
                        }}
                      >
                        {renderCategoryIcon(category.icon, category.id)}
                      </div>

                      {/* =====================================
                            LARGE BACKGROUND ICON
                        ===================================== */}

                      <div
                        className="
                            absolute
                            bottom-3
                            right-5
                            opacity-[0.07]
                            transition-all
                            duration-700
                            group-hover:rotate-6
                            group-hover:scale-110
                          "
                      >
                        {renderCategoryIcon(category.icon, category.id)}
                      </div>

                      {/* =====================================
                            BOTTOM ATMOSPHERIC GRADIENT
                        ===================================== */}

                      <div
                        className="
                            absolute
                            inset-x-0
                            bottom-0
                            h-32
                            bg-gradient-to-t
                            from-[#031F5E]/20
                            to-transparent
                          "
                      />
                    </div>

                    {/* =======================================
                          CARD CONTENT
                      ======================================= */}

                    <div className="relative p-5 sm:p-6 lg:p-7">
                      <div className="flex items-start justify-between gap-4">
                        {/* TEXT */}

                        <div>
                          <span
                            className="
                                mb-2
                                block
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.18em]
                                sm:text-[11px]
                              "
                            style={{
                              color: styling.accentColor,
                            }}
                          >
                            {String(index + 1).padStart(2, "0")} / SERVICE
                          </span>

                          <h4
                            className="
                                text-lg
                                font-extrabold
                                tracking-tight
                                text-[#031F5E]
                                transition-colors
                                duration-300
                                group-hover:text-[#0284c7]
                                sm:text-xl
                                lg:text-[22px]
                              "
                          >
                            {category.title}
                          </h4>

                          <p
                            className="
                                mt-2
                                max-w-sm
                                text-xs
                                leading-relaxed
                                text-slate-500
                                sm:text-sm
                              "
                          >
                            {category.description}
                          </p>
                        </div>

                        {/* =================================
                              ARROW BUTTON
                          ================================= */}

                        <span
                          className={`
                              mt-1
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              transition-all
                              duration-500
                              group-hover:translate-x-1
                              ${styling.arrowStyle}
                            `}
                        >
                          <ArrowRight
                            size={17}
                            strokeWidth={2.5}
                            className="
                                transition-transform
                                duration-500
                                group-hover:translate-x-0.5
                              "
                          />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* =================================================
              CAROUSEL CONTROLS
          ================================================= */}

          <div
            className="
              mt-7
              flex
              items-center
              justify-between
              sm:mt-9
            "
          >
            {/* PAGINATION DOTS */}

            <div className="flex items-center gap-2">
              {Array.from({
                length: Math.max(
                  1,
                  serviceCategories.length - visibleCards + 1,
                ),
              }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show service group ${index + 1}`}
                  onClick={() => setCurrentSlide(index)}
                  className={`
                    h-2
                    rounded-full
                    transition-all
                    duration-500
                    ${
                      currentSlide === index
                        ? "w-8 bg-[#0284c7]"
                        : "w-2 bg-[#0284c7]/20 hover:bg-[#0284c7]/40"
                    }
                  `}
                />
              ))}
            </div>

            {/* SLIDE COUNTER */}

            {/* <span
              className="
                text-[11px]
                font-semibold
                tracking-wide
                text-slate-400
                sm:text-xs
              "
            >
              {String(
                Math.min(currentSlide + 1, serviceCategories.length),
              ).padStart(2, "0")}{" "}
              —{" "}
              {String(
                Math.min(currentSlide + visibleCards, serviceCategories.length),
              ).padStart(2, "0")}
            </span> */}
          </div>
        </div>

        {/* ===================================================
            PRIMARY CTA
        =================================================== */}

        <div
          className={`
            mt-10
            flex
            justify-center
            sm:mt-12
            ${isVisible ? "animate-hero-slide-up" : "opacity-0"}
          `}
          style={{
            animationDelay: "500ms",
          }}
        >
          <button
            type="button"
            onClick={() => onSelectCategory("All Services")}
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-3
              rounded-full
              bg-[#1E9BE0]
              px-7
              py-3.5
              text-sm
              font-extrabold
              text-[#ffff]
              shadow-[0_12px_30px_-10px_rgba(255,201,77,0.65)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#ffd66f]
              hover:shadow-[0_18px_35px_-10px_rgba(255,201,77,0.75)]
              active:translate-y-0
              active:scale-[0.98]
              sm:px-8
              sm:py-4
            "
          >
            <Sparkles
              size={14}
              className="
                animate-pulse
                text-[#1693d9]
              "
            />

            <span>View All Services</span>

            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-[#031F5E]
                text-white
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              <ArrowRight size={14} strokeWidth={2.5} />
            </span>
          </button>
        </div>

        {/* ===================================================
            SMALL GUIDANCE INDICATOR
        =================================================== */}

        <div
          style={{
            animationDelay: "650ms",
          }}
          className={`
            mt-7
            flex
            justify-center
            sm:mt-9
            ${isVisible ? "animate-hero-slide-up" : "opacity-0"}
          `}
        ></div>
      </div>
    </section>
  );
}

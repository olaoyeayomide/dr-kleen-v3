import { useEffect, useRef, useState } from "react";
import {
  Home,
  Building2,
  HardHat,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Clock,
} from "lucide-react";
import { detailedServices } from "../data/mockData";

interface ServicesSectionProps {
  onOpenBooking: (serviceName?: string, price?: string) => void;
  onViewAllServices: () => void;
}

type Category = "all" | "residential" | "commercial" | "post-construction";

/* ------------------------------------------------------------------
 * CURVED CAROUSEL GEOMETRY
 *
 * All values are % of the full-width frame.
 * The top and bottom edges of every panel are sampled from ONE shared
 * parabola, so the curve flows continuously from panel to panel.
 *
 *  desktop / tablet (>= 768px): 4 slots  -> [partial, FULL, FULL, partial]
 *  mobile           (<  768px): 3 slots  -> [partial, FULL, partial]
 *
 * "focus" = slots that are fully visible and show the hover details.
 * ------------------------------------------------------------------ */

type Layout = { width: number; lefts: number[]; focus: number[] };

const LAYOUTS: Record<"desktop" | "mobile", Layout> = {
  desktop: { width: 31.9, lefts: [-17.25, 16.95, 51.15, 85.35], focus: [1, 2] },
  mobile: { width: 68, lefts: [-55, 16, 87], focus: [1] },
};

const TOP_MID = 0.16; // top edge: 16% down at the centre, 0% at the sides
const BOTTOM_MID = 0.84; // bottom edge: 84% down at the centre, 100% at the sides

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const mod = (n: number, m: number) => ((n % m) + m) % m;

const curve = (x: number) => {
  const t = (x - 0.5) / 0.5; // -1 (left edge) ... 0 (centre) ... 1 (right edge)
  return t * t;
};
const topAt = (x: number) => clamp01(TOP_MID * (1 - curve(x)));
const bottomAt = (x: number) =>
  clamp01(BOTTOM_MID + (1 - BOTTOM_MID) * curve(x));

function buildClip(leftPct: number, widthPct: number) {
  const steps = 16;

  const pts = Array.from({ length: steps + 1 }, (_, i) => {
    const u = i / steps;
    const x = (leftPct + widthPct * u) / 100; // position inside the whole frame
    return {
      u: (u * 100).toFixed(2),
      top: (topAt(x) * 100).toFixed(2),
      bottom: (bottomAt(x) * 100).toFixed(2),
    };
  });

  const topEdge = pts.map((p) => `${p.u}% ${p.top}%`);
  const bottomEdge = [...pts].reverse().map((p) => `${p.u}% ${p.bottom}%`);

  return `polygon(${[...topEdge, ...bottomEdge].join(", ")})`;
}

const CLIPS = {
  desktop: LAYOUTS.desktop.lefts.map((l) =>
    buildClip(l, LAYOUTS.desktop.width),
  ),
  mobile: LAYOUTS.mobile.lefts.map((l) => buildClip(l, LAYOUTS.mobile.width)),
};

function useIsMobile(query = "(max-width: 767px)") {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function ServicesSection({
  onOpenBooking,
  onViewAllServices,
}: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<Category>("all");
  const [start, setStart] = useState(0);
  const [openSlot, setOpenSlot] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const isMobile = useIsMobile();
  const layout = isMobile ? LAYOUTS.mobile : LAYOUTS.desktop;
  const clips = isMobile ? CLIPS.mobile : CLIPS.desktop;
  const lastSlot = layout.lefts.length - 1;

  const categories = [
    {
      id: "residential",
      name: "Residential",
      icon: Home,
      tagline: "Deep Cleaning • Move-In • Sofa Steam",
    },
    {
      id: "commercial",
      name: "Commercial",
      icon: Building2,
      tagline: "Office • Facility • Recurring Retainers",
    },
    {
      id: "post-construction",
      name: "Post-Construction",
      icon: HardHat,
      tagline: "Site Cleanup • Dust Debris • Final Sparkle",
    },
  ];

  const activeTagline =
    activeTab === "all"
      ? "Residential • Commercial • Post-Construction"
      : categories.find((c) => c.id === activeTab)?.tagline;

  const selectCategory = (cat: Category) => {
    setActiveTab(cat);
    setStart(0);
    setOpenSlot(null);
  };

  const filteredServices =
    activeTab === "all"
      ? detailedServices
      : detailedServices.filter((service) => service.category === activeTab);

  const total = filteredServices.length;

  // Slot 1 always holds the "current" service; the list wraps around.
  const slotServices =
    total === 0
      ? []
      : layout.lefts.map((_, i) => filteredServices[mod(start + i - 1, total)]);

  const move = (dir: 1 | -1) => {
    if (total < 2) return;
    setStart((s) => mod(s + dir, total));
    setOpenSlot(null);
  };

  const handleSlot = (i: number) => {
    if (i === 0) move(-1);
    else if (i === lastSlot) move(1);
    else setOpenSlot((o) => (o === i ? null : i));
  };

  return (
    <section
      id="services-section"
      className="relative overflow-hidden border-t border-slate-100 bg-slate-50/70 py-16 sm:py-24"
    >
      <style>{`
        @keyframes svcFade {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* AMBIENT BACKGROUND */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-200/30 blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-72 w-72 translate-x-1/2 rounded-full bg-blue-200/20 blur-3xl sm:h-96 sm:w-96" />

      {/* ============================================================
          HEADER: title LEFT, description RIGHT
      ============================================================ */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-end gap-5 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="text-3xl font-extrabold leading-[1.18] tracking-tight text-[#031F5E] sm:text-4xl lg:text-5xl">
              Professional Cleaning,
              <br className="hidden sm:inline" />
              <span className="text-[#1693d9]"> Built Around Your Space</span>
            </h2>
          </div>

          <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg md:justify-self-end md:pb-1">
            Whether restoring a high-rise executive suite or sanitizing your
            family home, our certified technicians execute hospital-grade
            hygiene checklists.
          </p>
        </div>

        {/* ==========================================================
            CATEGORY FILTERS: centred
        ========================================================== */}
        <div className="mb-10 mt-10 flex flex-col items-center gap-3 md:mb-14 md:mt-14">
          <div
            role="tablist"
            aria-label="Service categories"
            className="flex flex-wrap justify-center gap-2.5"
          >
            <button
              role="tab"
              aria-selected={activeTab === "all"}
              onClick={() => selectCategory("all")}
              className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all sm:px-5 sm:text-sm ${
                activeTab === "all"
                  ? "bg-[#031F5E] text-white shadow-md"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50"
              }`}
            >
              All Categories
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeTab === cat.id}
                onClick={() => selectCategory(cat.id as Category)}
                className={`flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all sm:px-5 sm:text-sm ${
                  activeTab === cat.id
                    ? "bg-[#031F5E] text-white shadow-md"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50"
                }`}
              >
                <cat.icon size={14} />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <p
            aria-live="polite"
            className="text-center text-xs font-medium text-slate-500 sm:text-sm"
          >
            {activeTagline}
          </p>
        </div>
      </div>

      {/* ============================================================
          CURVED CAROUSEL (full-bleed)
      ============================================================ */}
      {total > 0 && (
        <div className="relative z-10 mx-auto w-full max-w-[1600px]">
          <div
            className="relative h-[500px] w-full touch-pan-y overflow-hidden md:h-[clamp(420px,50vw,660px)]"
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 45) move(dx < 0 ? 1 : -1);
            }}
          >
            {slotServices.map((service, i) => {
              const isFocus = layout.focus.includes(i);
              const isOpen = openSlot === i;

              return (
                <div
                  key={`${service.id}-${i}`}
                  className="group absolute inset-y-0 cursor-pointer outline-none"
                  role="button"
                  tabIndex={isFocus ? 0 : -1}
                  aria-label={
                    i === 0
                      ? "Previous services"
                      : i === lastSlot
                        ? "Next services"
                        : `${service.title} details`
                  }
                  aria-expanded={isFocus ? isOpen : undefined}
                  onClick={() => handleSlot(i)}
                  onKeyDown={(e) => {
                    if (isFocus && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      handleSlot(i);
                    }
                  }}
                  style={{
                    left: `${layout.lefts[i]}%`,
                    width: `${layout.width}%`,
                    clipPath: clips[i],
                    WebkitClipPath: clips[i],
                  }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full animate-[svcFade_0.6s_ease-out] object-cover object-center transition-transform duration-700 motion-reduce:animate-none [@media(hover:hover)]:group-hover:scale-[1.05]"
                  />

                  {isFocus && (
                    <>
                      {/* Tap cue: touch devices only, hidden once open */}
                      <span
                        className={`pointer-events-none absolute bottom-[19%] left-1/2 hidden -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/40 bg-[#031F5E]/60 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md [@media(hover:none)]:flex ${
                          isOpen ? "[@media(hover:none)]:hidden" : ""
                        }`}
                      >
                        <Sparkles size={11} />
                        Tap for details
                      </span>

                      {/* BLUE BLURRED HOVER / TAP OVERLAY */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-b from-[#031F5E]/80 via-[#0b4fa8]/70 to-[#1693d9]/60 backdrop-blur-md transition-opacity duration-500 [@media(hover:hover)]:group-hover:pointer-events-auto [@media(hover:hover)]:group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 ${
                          isOpen
                            ? "pointer-events-auto opacity-100"
                            : "pointer-events-none opacity-0"
                        }`}
                      >
                        <div className="absolute inset-x-0 bottom-[17%] top-[17%] flex flex-col justify-center px-[9%] text-white">
                          {service.popular && (
                            <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-md">
                              <Sparkles size={10} />
                              Popular
                            </span>
                          )}

                          <h3 className="text-xl font-extrabold leading-tight md:text-lg lg:text-2xl xl:text-3xl">
                            {service.title}
                          </h3>

                          <div className="mt-2.5 flex flex-wrap items-center gap-2">
                            <span className="flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md sm:text-xs">
                              <Clock size={12} className="text-sky-200" />
                              {service.duration}
                            </span>

                            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-extrabold text-[#031F5E] sm:text-xs">
                              From {service.startingPrice}
                            </span>
                          </div>

                          <ul className="mt-3 space-y-1.5">
                            {service.features
                              .slice(0, 3)
                              .map((feature, featureIndex) => (
                                <li
                                  key={featureIndex}
                                  className={`items-start gap-2 text-[11px] leading-snug text-white/95 sm:text-xs lg:text-sm ${
                                    featureIndex === 2
                                      ? "flex md:hidden lg:flex"
                                      : "flex"
                                  }`}
                                >
                                  <CheckCircle2
                                    size={14}
                                    className="mt-0.5 shrink-0 text-sky-200"
                                  />
                                  <span>{feature}</span>
                                </li>
                              ))}
                          </ul>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenBooking(
                                service.title,
                                service.startingPrice,
                              );
                            }}
                            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/15 px-4 py-2.5 text-xs font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-sky-200/70 hover:bg-[#1693d9]/70 hover:shadow-[0_0_28px_rgba(22,147,217,0.75)] focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98] sm:text-sm"
                          >
                            Book This Service
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}

            {/* NAVIGATION: sits in the notch under the raised bottom curve */}
            <div className="absolute bottom-[2%] left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
              <button
                type="button"
                aria-label="Previous services"
                onClick={() => move(-1)}
                disabled={total < 2}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-[3px] border-slate-300 bg-slate-500 text-white transition-colors hover:bg-[#1693d9] disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:w-12"
              >
                <ArrowLeft size={20} strokeWidth={3} />
              </button>

              <button
                type="button"
                aria-label="Next services"
                onClick={() => move(1)}
                disabled={total < 2}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-[3px] border-slate-300 bg-slate-500 text-white transition-colors hover:bg-[#1693d9] disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:w-12"
              >
                <ArrowRight size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          VIEW ALL
      ============================================================ */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-12 text-center sm:mt-14">
          <button
            onClick={onViewAllServices}
            className="group inline-flex cursor-pointer items-center gap-3 rounded-full border-2 border-slate-200 bg-white px-6 py-3.5 text-sm font-extrabold text-[#031F5E] shadow-sm transition-all hover:border-[#1693d9] hover:text-[#1693d9] hover:shadow-md sm:px-8 sm:py-4 sm:text-base"
          >
            <span>View All Services Specifications</span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-[#1693d9] transition-transform group-hover:translate-x-1">
              <ArrowRight size={16} />
            </span>
          </button>

          <p className="mx-auto mt-2 max-w-md text-xs text-slate-500">
            Clicking explores our comprehensive dedicated catalog with custom
            square-meter calculators.
          </p>
        </div>
      </div>
    </section>
  );
}

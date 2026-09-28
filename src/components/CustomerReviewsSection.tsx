import { useEffect, useRef, useState } from "react";
import {
  Star,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  MapPin,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";
import { customerReviews } from "../data/mockData";

export interface Review {
  id: string | number;
  name: string;
  role?: string;
  avatar?: string;
  rating: number;
  comment: string;
  service?: string; // optional so Google reviews (which have none) still render
  location?: string;
  date?: string; // ISO string, e.g. '2026-08-14'
  source?: "google" | "direct";
  url?: string; // link to the original Google review
}

interface GoogleSummary {
  rating: number;
  count: number;
  url?: string;
}

interface CustomerReviewsSectionProps {
  onReadAllReviews: () => void;
  onOpenBooking: () => void;
  /** Pass real (e.g. Google) reviews here. Falls back to mock data. */
  reviews?: Review[];
  /** Optional "4.9 · 120 Google reviews" pill under the header. */
  googleSummary?: GoogleSummary;
}

const AUTOPLAY_MS = 6000;

/**
 * Arch geometry, computed from the real container width so the curve stays
 * curved on every screen. `depth` = how far the arch rises at the screen edges
 * (bigger = more curved). The avatars and the SVG curve use the same maths,
 * so avatars always sit exactly on the line.
 */
function getGeometry(width: number, count: number) {
  const visibleHalf = width < 768 ? 2 : width < 1024 ? 3 : width < 1280 ? 4 : 5;
  const half = Math.min(visibleHalf, Math.floor((count - 1) / 2));

  const depth = width < 640 ? 44 : width < 1024 ? 85 : 135;
  const activeSize = width < 640 ? 76 : 96;
  const nearSize = width < 640 ? 50 : 68;
  const pad = width < 640 ? 30 : 48;

  const base = depth + 44; // y of the centre avatar
  const height = base + activeSize / 2 + 40;
  const gap = Math.min(
    190,
    Math.max(50, (width / 2 - pad) / Math.max(half, 1)),
  );

  const cx = width / 2;
  const yAt = (x: number) => base - depth * Math.pow(x / cx, 2);
  const sizeAt = (d: number) =>
    d === 0 ? activeSize : Math.max(36, nearSize - 7 * (d - 1));

  // Parabola drawn as a quadratic curve, extended slightly past both edges.
  const uMax = 1 + 24 / cx;
  const xL = cx - uMax * cx;
  const xR = cx + uMax * cx;
  const yEnd = base - depth * uMax * uMax;
  const yCtrl = base + depth * uMax * uMax;
  const line = `M ${xL} ${yEnd} Q ${cx} ${yCtrl} ${xR} ${yEnd}`;
  const fill = `${line} L ${xR} -1200 L ${xL} -1200 Z`;

  return { half, gap, height, yAt, sizeAt, line, fill };
}

function formatDate(iso?: string) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Shows initials if the photo is missing or fails to load (common with Google photos). */
function Avatar({
  src,
  name,
  alt,
  className = "",
}: {
  src?: string;
  name: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);

  if (!src || failed) {
    const initials = name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return (
      <span
        className={`w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-[#1693d9] to-[#031F5E] text-white font-extrabold text-sm transition-all duration-500 ${className}`}
      >
        {initials}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`w-full h-full rounded-full object-cover bg-slate-100 transition-all duration-500 ${className}`}
    />
  );
}

export function CustomerReviewsSection({
  onReadAllReviews,
  onOpenBooking,
  reviews: reviewsProp,
  googleSummary,
}: CustomerReviewsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [width, setWidth] = useState(1200);
  const touchStartX = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const reviews = reviewsProp ?? (customerReviews as Review[]);
  const total = reviews.length;
  const hasReviews = total > 0;
  const safeIndex = total ? activeIndex % total : 0;
  const current = reviews[safeIndex];

  const go = (dir: 1 | -1) => {
    if (!total) return;
    setActiveIndex((i) => (i + dir + total) % total);
  };

  // Measure the real width so the arch and avatars scale together.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [hasReviews]);

  // Gentle autoplay. Pauses on hover/focus and is skipped for reduced-motion users.
  useEffect(() => {
    if (paused || total < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActiveIndex((i) => (i + 1) % total),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(id);
  }, [paused, total]);

  if (!total || !current) return null;

  const g = getGeometry(width, total);

  const arc = Array.from({ length: g.half * 2 + 1 }, (_, k) => {
    const offset = k - g.half;
    return {
      offset,
      review: reviews[(safeIndex + offset + total) % total],
    };
  });

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  };

  const date = formatDate(current.date);
  const isGoogle = current.source === "google";

  return (
    <section
      id="reviews"
      className="pb-14 sm:pb-16 bg-white relative overflow-hidden border-t border-slate-100"
    >
      <style>{`
        @keyframes reviewFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .review-fade { animation: reviewFade .45s ease both; }
        @media (prefers-reduced-motion: reduce) { .review-fade { animation: none; } }
      `}</style>

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={onKeyDown}
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer reviews"
      >
        {/* Arch + header live in ONE block, so the header sits inside the arch */}
        <div ref={wrapRef} className="relative">
          {/* Header (centered, inside the arch) */}
          <div className="relative z-10 px-4 pt-10 sm:pt-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#031F5E] tracking-tight leading-[1.15]">
              Trusted by People Who{" "}
              <span className="text-[#1693d9]">Care About Their Space</span>
            </h2>
            <p className="mt-2 mx-auto max-w-xl text-slate-600 text-sm leading-relaxed">
              From private residences in Ikoyi to commercial clinics in Abuja,
              read verified experiences from real clients.
            </p>

            {googleSummary && (
              <a
                href={googleSummary.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#031F5E] shadow-sm ring-1 ring-slate-200 hover:ring-[#1693d9] transition"
              >
                <Star size={12} className="fill-amber-400 text-amber-400" />
                {googleSummary.rating.toFixed(1)} · {googleSummary.count} Google
                reviews
              </a>
            )}
          </div>

          {/* Arch + avatars */}
          <div className="relative" style={{ height: g.height }}>
            <svg
              aria-hidden
              className="absolute inset-0 pointer-events-none overflow-visible"
              width={width}
              height={g.height}
              viewBox={`0 0 ${width} ${g.height}`}
            >
              <defs>
                <linearGradient
                  id="reviewArchFill"
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2={g.height}
                >
                  <stop offset="0" stopColor="#f6fbff" />
                  <stop offset="1" stopColor="#d9edfb" />
                </linearGradient>
                <filter
                  id="reviewArchShadow"
                  x="-5%"
                  y="-60%"
                  width="110%"
                  height="240%"
                >
                  <feDropShadow
                    dx="0"
                    dy="8"
                    stdDeviation="8"
                    floodColor="#031F5E"
                    floodOpacity="0.22"
                  />
                </filter>
              </defs>

              <path d={g.fill} fill="url(#reviewArchFill)" />
              {/* Border line with a soft blurred shadow under it */}
              <path
                d={g.line}
                fill="none"
                stroke="#1693d9"
                strokeWidth={2}
                filter="url(#reviewArchShadow)"
              />
            </svg>

            {arc.map(({ offset, review }) => {
              const d = Math.abs(offset);
              const isActive = offset === 0;
              const x = offset * g.gap;
              const size = g.sizeAt(d);
              return (
                <button
                  key={review.id}
                  type="button"
                  onClick={() =>
                    setActiveIndex((i) => (i + offset + total) % total)
                  }
                  aria-label={`Show review from ${review.name}`}
                  aria-current={isActive}
                  tabIndex={isActive ? -1 : 0}
                  className="absolute rounded-full transition-all duration-500 ease-out cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1693d9]/50"
                  style={{
                    width: size,
                    height: size,
                    left: `calc(50% + ${x}px)`,
                    top: g.yAt(x),
                    transform: "translate(-50%, -50%)",
                    zIndex: 30 - d,
                  }}
                >
                  {/* No border: a blurred shadow instead */}
                  <Avatar
                    src={review.avatar}
                    name={review.name}
                    alt={isActive ? review.name : ""}
                    className={
                      isActive
                        ? "shadow-[0_12px_32px_-4px_rgba(22,147,217,0.6)]"
                        : "shadow-[0_8px_20px_-4px_rgba(3,31,94,0.35)] opacity-90 hover:opacity-100 hover:scale-105"
                    }
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Review card (blue) */}
          <div
            className="relative mt-2 bg-[#031F5E] border border-[#031F5E] rounded-3xl shadow-[0_20px_50px_-20px_rgba(3,31,94,0.55)]"
            onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchStartX.current = null;
            }}
          >
            {/* Bold white quote mark in the top-left corner of the card */}
            <Quote
              aria-hidden
              size={56}
              strokeWidth={3}
              className="absolute top-4 left-4 sm:top-5 sm:left-7 w-9 h-9 sm:w-14 sm:h-14 fill-white text-white"
            />

            {/* Prev / Next */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="absolute top-1/2 -translate-y-1/2 left-2 sm:-left-5 w-10 h-10 rounded-full bg-white text-[#031F5E] hover:bg-[#1693d9] hover:text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1693d9]/50"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next review"
              className="absolute top-1/2 -translate-y-1/2 right-2 sm:-right-5 w-10 h-10 rounded-full bg-white text-[#031F5E] hover:bg-[#1693d9] hover:text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1693d9]/50"
            >
              <ChevronRight size={20} />
            </button>

            <div
              key={current.id}
              className="review-fade px-12 sm:px-20 pt-12 pb-8 text-center min-h-[300px] flex flex-col items-center"
              aria-live="polite"
            >
              <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-1.5">
                {current.name}
                {!isGoogle && (
                  <BadgeCheck
                    size={18}
                    className="text-emerald-300 shrink-0"
                    aria-label="Verified client"
                  />
                )}
              </h3>
              {current.role && (
                <p className="text-sm text-sky-200 font-medium mt-0.5">
                  {current.role}
                </p>
              )}

              <div
                className="flex items-center gap-1 mt-4 mb-4"
                aria-label={`Rated ${current.rating} out of 5`}
              >
                {[...Array(Math.round(current.rating))].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-2xl">
                &ldquo;{current.comment}&rdquo;
              </p>

              {/* Proof row */}
              <div className="mt-6 pt-5 border-t border-white/15 w-full flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-medium text-sky-200">
                {current.service && (
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-semibold">
                    {current.service}
                  </span>
                )}
                {current.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} className="text-sky-300" />
                    {current.location}
                  </span>
                )}
                {date && (
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays size={12} className="text-sky-300" />
                    <time dateTime={current.date}>{date}</time>
                  </span>
                )}
                {isGoogle ? (
                  current.url ? (
                    <a
                      href={current.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-white underline underline-offset-2 hover:text-sky-200"
                    >
                      <CheckCircle2 size={12} />
                      View on Google
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-white">
                      <CheckCircle2 size={12} />
                      Google review
                    </span>
                  )
                ) : (
                  <span className="inline-flex items-center gap-1 text-emerald-300">
                    <CheckCircle2 size={12} />
                    Verified client
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Position indicator */}
          <p className="mt-4 text-center text-xs font-semibold text-slate-400 tabular-nums">
            {safeIndex + 1} / {total}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onReadAllReviews}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#031F5E] font-extrabold text-sm sm:text-base border-2 border-slate-200 hover:border-[#1693d9] transition-all shadow-xs group cursor-pointer"
          >
            <span>Read All Verified Client Reviews</span>
            <ArrowRight
              size={18}
              className="text-[#1693d9] group-hover:translate-x-1 transition-transform"
            />
          </button>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center px-8 py-3.5 rounded-full bg-[#031F5E] hover:bg-[#1693d9] text-white font-extrabold text-sm sm:text-base transition-colors shadow-xs cursor-pointer"
          >
            Book a Service
          </button>
        </div>
      </div>
    </section>
  );
}

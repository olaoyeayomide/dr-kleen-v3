import { SparkleIcon } from './common/SparkleIcon';

interface NeedSectionBackgroundProps {
  parallaxOffset?: { x: number; y: number };
}

export function NeedSectionBackground({ parallaxOffset = { x: 0, y: 0 } }: NeedSectionBackgroundProps) {
  // Multipliers for subtle background parallax depth
  const bgX = parallaxOffset.x * 0.02;
  const bgY = parallaxOffset.y * 0.02;
  const midX = parallaxOffset.x * 0.04;
  const midY = parallaxOffset.y * 0.04;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Large Translucent Organic Ribbon Shapes (Soft Pastel Glows) */}
      <div
        style={{
          transform: `translate(${bgX}px, ${bgY}px)`,
          transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className="absolute -top-24 left-1/4 w-[500px] h-[400px] rounded-full blur-3xl opacity-40 bg-gradient-to-br from-sky-200/50 via-blue-100/30 to-transparent animate-atmosphere-float"
      />

      <div
        style={{
          transform: `translate(${-bgX * 1.2}px, ${-bgY * 1.2}px)`,
          transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className="absolute top-1/2 -right-20 -translate-y-1/2 w-[550px] h-[480px] rounded-full blur-3xl opacity-35 bg-gradient-to-bl from-sky-100/60 via-blue-50/40 to-transparent animate-atmosphere-float [animation-delay:4s]"
      />

      {/* 2. Curved Decorative Vector Paths & Orbit Lines */}
      <div
        style={{
          transform: `translate(${midX}px, ${midY}px)`,
          transition: 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className="absolute -top-10 right-8 sm:right-24 w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] opacity-25 text-sky-400"
      >
        <svg viewBox="0 0 500 500" fill="none" className="w-full h-full animate-subtle-wave">
          {/* Outer Dashed Wave Arc */}
          <path
            d="M 50,250 C 150,120 350,100 480,260"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            opacity="0.6"
          />
          {/* Inner Continuous Arc */}
          <path
            d="M 80,280 C 180,160 320,150 440,300"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.4"
          />
          {/* Decorative small circles along path */}
          <circle cx="280" cy="140" r="3" fill="currentColor" opacity="0.7" />
          <circle cx="160" cy="180" r="2" fill="currentColor" opacity="0.5" />
        </svg>
      </div>

      {/* 3. Dotted Matrix Patterns */}
      {/* Top Left Matrix */}
      <div
        style={{
          transform: `translate(${-midX * 0.6}px, ${-midY * 0.6}px)`,
          transition: 'transform 0.3s ease-out',
        }}
        className="absolute top-16 left-6 sm:left-14 opacity-25"
      >
        <svg width="100" height="75" viewBox="0 0 100 75" fill="none" className="text-sky-400">
          <pattern id="dot-matrix-need-top" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.25" fill="currentColor" />
          </pattern>
          <rect width="100" height="75" fill="url(#dot-matrix-need-top)" />
        </svg>
      </div>

      {/* Bottom Right Matrix */}
      <div
        style={{
          transform: `translate(${midX * 0.8}px, ${midY * 0.8}px)`,
          transition: 'transform 0.3s ease-out',
        }}
        className="absolute bottom-12 right-8 sm:right-16 opacity-20 hidden sm:block"
      >
        <svg width="112" height="70" viewBox="0 0 112 70" fill="none" className="text-sky-400">
          <pattern id="dot-matrix-need-bottom" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.25" fill="currentColor" />
          </pattern>
          <rect width="112" height="70" fill="url(#dot-matrix-need-bottom)" />
        </svg>
      </div>

      {/* 4. Small 4-Pointed Sparkle Stars */}
      {/* Sparkle 1 - Near heading */}
      <div className="absolute top-12 left-[36%] sm:left-[38%] text-sky-400/60">
        <SparkleIcon size={18} className="animate-pulse [animation-duration:3.8s]" />
      </div>

      {/* Sparkle 2 - Far right above cards */}
      <div className="absolute top-16 right-[8%] sm:right-[12%] text-sky-400/50">
        <SparkleIcon size={22} className="animate-pulse [animation-duration:4.5s] [animation-delay:1.5s]" />
      </div>

      {/* Sparkle 3 - Lower left beneath cards */}
      <div className="absolute bottom-14 left-[8%] sm:left-[12%] text-sky-300/60">
        <SparkleIcon size={16} className="animate-pulse [animation-duration:3.2s] [animation-delay:0.8s]" />
      </div>

      {/* Sparkle 4 - Lower center */}
      <div className="absolute bottom-8 right-[32%] text-sky-400/40 hidden sm:block">
        <SparkleIcon size={14} className="animate-pulse [animation-duration:5s] [animation-delay:2s]" />
      </div>
    </div>
  );
}

import { SparkleIcon } from './common/SparkleIcon';

interface HeroBackgroundProps {
  parallaxOffset?: { x: number; y: number };
}

export function HeroBackground({ parallaxOffset = { x: 0, y: 0 } }: HeroBackgroundProps) {
  // Parallax multipliers for subtle depth layers
  const bgShiftX = parallaxOffset.x * 0.015;
  const bgShiftY = parallaxOffset.y * 0.015;
  const midShiftX = parallaxOffset.x * 0.035;
  const midShiftY = parallaxOffset.y * 0.035;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Atmospheric Ambient Glows */}
      <div
        style={{
          transform: `translate(${bgShiftX}px, ${bgShiftY}px)`,
          transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className="absolute top-1/2 right-[12%] -translate-y-1/2 w-[520px] sm:w-[650px] h-[520px] sm:h-[650px] rounded-full blur-[90px] sm:blur-[120px] bg-gradient-to-br from-sky-400/25 via-blue-500/20 to-transparent animate-glow-pulse pointer-events-none"
      />

      <div
        style={{
          transform: `translate(${-bgShiftX}px, ${-bgShiftY}px)`,
          transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className="absolute -top-20 left-[10%] w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full blur-[80px] sm:blur-[100px] bg-blue-600/15 pointer-events-none"
      />

      {/* 2. Concentric Orbital Curved Lines (drawn with SVG) */}
      <div
        style={{
          transform: `translate(${midShiftX}px, ${midShiftY}px)`,
          transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className="absolute -right-24 sm:-right-16 top-1/2 -translate-y-1/2 w-[680px] sm:w-[820px] h-[680px] sm:h-[820px] opacity-30 text-sky-300"
      >
        <svg
          viewBox="0 0 800 800"
          fill="none"
          className="w-full h-full animate-orbital-spin [animation-duration:180s]"
        >
          {/* Outermost Dashed Ring */}
          <circle
            cx="400"
            cy="400"
            r="370"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeDasharray="6 8"
            opacity="0.5"
          />
          {/* Intermediate Solid Subtle Ring */}
          <circle
            cx="400"
            cy="400"
            r="310"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.35"
          />
          {/* Inner Accent Ring */}
          <circle
            cx="400"
            cy="400"
            r="240"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.45"
          />
          {/* Tiny decorative orbital ticks */}
          <circle cx="770" cy="400" r="3" fill="currentColor" opacity="0.8" />
          <circle cx="90" cy="400" r="2.5" fill="currentColor" opacity="0.6" />
          <circle cx="400" cy="30" r="3.5" fill="currentColor" opacity="0.9" />
          <circle cx="400" cy="710" r="2.5" fill="currentColor" opacity="0.5" />
        </svg>
      </div>

      {/* 3. Dotted Matrix Patterns in atmospheric corners */}
      <div
        style={{
          transform: `translate(${-midShiftX * 0.5}px, ${-midShiftY * 0.5}px)`,
          transition: 'transform 0.3s ease-out',
        }}
        className="absolute top-12 left-8 sm:left-16 opacity-25"
      >
        <svg width="120" height="90" viewBox="0 0 120 90" fill="none" className="text-sky-300">
          <pattern id="dot-matrix-hero" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.5" fill="currentColor" />
          </pattern>
          <rect width="120" height="90" fill="url(#dot-matrix-hero)" />
        </svg>
      </div>

      <div
        style={{
          transform: `translate(${midShiftX * 0.6}px, ${midShiftY * 0.6}px)`,
          transition: 'transform 0.3s ease-out',
        }}
        className="absolute bottom-24 right-12 sm:right-28 opacity-20 hidden sm:block"
      >
        <svg width="100" height="80" viewBox="0 0 100 80" fill="none" className="text-sky-300">
          <pattern id="dot-matrix-hero-bottom" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.25" fill="currentColor" />
          </pattern>
          <rect width="100" height="80" fill="url(#dot-matrix-hero-bottom)" />
        </svg>
      </div>

      {/* 4. Realistic 3D Glassy Bubbles with Reflection Sheens & Independent Drift */}
      {/* Bubble A - Top Center-Left */}
      <div
        style={{
          transform: `translate(${midShiftX * 1.2}px, ${midShiftY * 1.2}px)`,
          transition: 'transform 0.25s ease-out',
        }}
        className="absolute top-10 sm:top-14 left-[44%] sm:left-[47%] w-12 sm:w-15 h-12 sm:h-15 rounded-full border border-sky-300/40 bg-gradient-to-tr from-sky-400/10 via-white/5 to-white/25 shadow-[inset_0_0_14px_rgba(255,255,255,0.35),0_4px_16px_rgba(3,31,94,0.4)] backdrop-blur-[1.5px] animate-bubble-a pointer-events-none"
      >
        <div className="absolute top-2 left-2.5 w-3 h-1.5 bg-white/70 rounded-full rotate-[-35deg]" />
        <div className="absolute bottom-2 right-2.5 w-1.5 h-1 bg-sky-200/50 rounded-full" />
      </div>

      {/* Bubble B - Top Right high above cleaner */}
      <div
        style={{
          transform: `translate(${midShiftX * 1.4}px, ${midShiftY * 1.4}px)`,
          transition: 'transform 0.25s ease-out',
        }}
        className="absolute top-16 sm:top-20 right-[12%] sm:right-[16%] w-20 sm:w-26 h-20 sm:h-26 rounded-full border border-sky-300/35 bg-gradient-to-tr from-sky-400/10 via-white/5 to-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.3),0_8px_24px_rgba(3,31,94,0.5)] backdrop-blur-[2px] animate-bubble-b pointer-events-none"
      >
        <div className="absolute top-3.5 left-4.5 w-5 h-2 bg-white/75 rounded-full rotate-[-40deg]" />
        <div className="absolute bottom-3 right-4 w-2 h-1.5 bg-sky-200/60 rounded-full" />
      </div>

      {/* Bubble C - Mid-Right Outer Edge */}
      <div
        style={{
          transform: `translate(${midShiftX * 0.9}px, ${midShiftY * 0.9}px)`,
          transition: 'transform 0.25s ease-out',
        }}
        className="absolute top-[48%] right-4 sm:right-10 w-24 sm:w-32 h-24 sm:h-32 rounded-full border border-sky-200/25 bg-gradient-to-tr from-transparent via-white/5 to-white/15 shadow-[inset_0_0_24px_rgba(255,255,255,0.25)] backdrop-blur-[1px] animate-bubble-c pointer-events-none"
      >
        <div className="absolute top-4 sm:top-5 left-5 w-6 sm:w-8 h-2.5 bg-white/60 rounded-full rotate-[-42deg]" />
        <div className="absolute bottom-4 right-5 w-2 h-1.5 bg-sky-200/40 rounded-full" />
      </div>

      {/* Bubble D - Mid-Left behind headline area */}
      <div
        style={{
          transform: `translate(${midShiftX * 0.7}px, ${midShiftY * 0.7}px)`,
          transition: 'transform 0.25s ease-out',
        }}
        className="absolute top-[38%] left-[3%] sm:left-[8%] w-10 sm:w-12 h-10 sm:h-12 rounded-full border border-sky-300/30 bg-white/5 shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] animate-bubble-b pointer-events-none"
      >
        <div className="absolute top-1.5 left-2 w-2.5 h-1 bg-white/65 rounded-full rotate-[-30deg]" />
      </div>

      {/* Bubble E - Bottom Center-Right behind cleaner base */}
      <div
        style={{
          transform: `translate(${midShiftX * 1.1}px, ${midShiftY * 1.1}px)`,
          transition: 'transform 0.25s ease-out',
        }}
        className="absolute bottom-20 sm:bottom-28 right-[32%] sm:right-[36%] w-14 sm:w-18 h-14 sm:h-18 rounded-full border border-sky-300/30 bg-gradient-to-tr from-sky-500/10 to-white/15 shadow-[inset_0_0_14px_rgba(255,255,255,0.25)] animate-bubble-a pointer-events-none"
      >
        <div className="absolute top-2.5 left-3 w-3.5 h-1.5 bg-white/60 rounded-full rotate-[-35deg]" />
      </div>

      {/* 5. 4-Pointed Sparkle Stars at precise reference positions */}
      {/* Sparkle 1 - Above headline near center */}
      <div className="absolute top-14 left-[40%] sm:left-[43%] transition-all duration-300">
        <SparkleIcon
          size={20}
          className="text-sky-300/80 animate-pulse [animation-duration:3.2s] filter drop-shadow-[0_0_4px_rgba(56,189,248,0.7)]"
        />
      </div>

      {/* Sparkle 2 - Top right above cleaner */}
      <div className="absolute top-10 sm:top-12 right-[6%] sm:right-[8%]">
        <SparkleIcon
          size={18}
          className="text-sky-200/85 animate-pulse [animation-duration:4s] [animation-delay:1s] filter drop-shadow-[0_0_5px_rgba(125,211,252,0.8)]"
        />
      </div>

      {/* Sparkle 3 - Mid right between bubble and card */}
      <div className="absolute top-[32%] right-[29%] sm:right-[31%]">
        <SparkleIcon
          size={14}
          className="text-sky-300/70 animate-pulse [animation-duration:3.6s] [animation-delay:1.8s] filter drop-shadow-[0_0_4px_rgba(56,189,248,0.6)]"
        />
      </div>

      {/* Sparkle 4 - Lower right */}
      <div className="absolute bottom-[24%] right-[8%] sm:right-[11%]">
        <SparkleIcon
          size={15}
          className="text-sky-200/65 animate-pulse [animation-duration:4.5s] [animation-delay:0.5s]"
        />
      </div>

      {/* Sparkle 5 - Lower left near trust banner transition */}
      <div className="absolute bottom-[16%] left-[4%] sm:left-[7%]">
        <SparkleIcon
          size={16}
          className="text-sky-400/60 animate-pulse [animation-duration:5s] [animation-delay:2.2s]"
        />
      </div>
    </div>
  );
}

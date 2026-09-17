import { MouseEvent } from 'react';
import { SparkleIcon } from './SparkleIcon';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLDivElement>) => void;
  href?: string;
  asDiv?: boolean;
}

export function Logo({
  variant = 'dark',
  className = '',
  size = 'md',
  onClick,
  href = '#hero',
  asDiv = false
}: LogoProps) {
  const isLight = variant === 'light';

  const textSizes = {
    sm: 'text-lg sm:text-xl',
    md: 'text-2xl sm:text-[25px]',
    lg: 'text-3xl sm:text-4xl'
  };

  const sparkleSizes = {
    sm: 14,
    md: 18,
    lg: 22
  };

  const commonClasses = `group relative inline-flex items-center gap-1.5 font-black tracking-tight select-none transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2596be] focus-visible:ring-offset-2 rounded-lg py-1 px-0.5 ${
    isLight ? 'text-white' : 'text-[#031F5E]'
  } ${textSizes[size]} ${className}`;

  const content = (
    <>
      {/* Subtle protective/shield-inspired clean ambient glow on hover */}
      <span
        aria-hidden="true"
        className="absolute -inset-2 rounded-xl bg-sky-400/0 group-hover:bg-sky-400/10 blur-md transition-all duration-500 pointer-events-none"
      />

      <span className="relative z-10 font-extrabold tracking-tight transition-colors duration-300">
        DR
      </span>

      {/* Sparkle star with refined precision micro-interaction */}
      <span
        className={`relative z-10 inline-flex items-center justify-center transition-all duration-300 ease-out transform group-hover:scale-115 group-hover:rotate-12 ${
          isLight ? 'text-sky-300 group-hover:text-sky-200' : 'text-[#2596be] group-hover:text-[#1880a6]'
        }`}
      >
        <SparkleIcon
          size={sparkleSizes[size]}
          color="currentColor"
          className="filter drop-shadow-[0_0_3px_rgba(37,150,190,0.5)] transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(37,150,190,0.9)]"
        />
      </span>

      <span className="relative z-10 font-extrabold tracking-tight transition-colors duration-300">
        KLEEN
      </span>
    </>
  );

  if (asDiv) {
    return (
      <div
        id="brand-logo"
        className={commonClasses}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      id="brand-logo"
      className={commonClasses}
      onClick={onClick}
      aria-label="Dr.Kleen Home"
    >
      {content}
    </a>
  );
}


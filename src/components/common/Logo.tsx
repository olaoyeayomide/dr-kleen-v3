import { MouseEvent } from "react";
import { SparkleIcon } from "./SparkleIcon";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLDivElement>) => void;
  href?: string;
  asDiv?: boolean;
  showCleanSpace?: boolean;
}

export function Logo({
  variant = "dark",
  className = "",
  size = "md",
  onClick,
  href = "#hero",
  asDiv = false,
  showCleanSpace = false,
}: LogoProps) {
  const isLight = variant === "light";

  const textSizes = {
    sm: "text-lg sm:text-xl",
    md: "text-2xl sm:text-[25px]",
    lg: "text-3xl sm:text-4xl",
  };

  const sparkleSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  const commonClasses = `group relative inline-flex items-center gap-1.5 font-black tracking-tight select-none transition-all duration-500 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2596be] focus-visible:ring-offset-2 rounded-lg py-1 px-0.5 ${
    isLight ? "text-white" : "text-white"
  } ${textSizes[size]} ${className}`;

  const sparkle = (
    <span
      className={`relative z-10 inline-flex items-center justify-center transition-all duration-500 ease-out transform group-hover:scale-115 group-hover:rotate-12 ${
        isLight
          ? "text-sky-200 group-hover:text-sky-100"
          : "text-sky-200 group-hover:text-sky-100"
      }`}
    >
      <SparkleIcon
        size={sparkleSizes[size]}
        color="currentColor"
        className="filter drop-shadow-[0_0_3px_rgba(255,255,255,0.5)] transition-all duration-500 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
      />
    </span>
  );

  const drKleenContent = (
    <div className="relative flex items-center gap-1.5 overflow-hidden leading-none">
      <span className="relative z-10 font-extrabold tracking-tight transition-colors duration-500">
        Dr
      </span>
      {sparkle}
      <span className="relative z-10 font-extrabold tracking-tight transition-colors duration-500">
        Kleen
      </span>
    </div>
  );

  const cleanSpaceContent = (
    <div className="relative flex items-center gap-1.5 overflow-hidden leading-none">
      <span className="relative z-10 font-extrabold tracking-tight transition-colors duration-500">
        Clean
      </span>
      {sparkle}
      <span className="relative z-10 font-extrabold tracking-tight transition-colors duration-500">
        Space
      </span>
    </div>
  );

  const content = (
    <>
      <span
        aria-hidden="true"
        className="absolute -inset-2 rounded-xl bg-white/10 blur-md transition-all duration-500 pointer-events-none"
      />

      <div className="relative h-[1.1em] overflow-hidden flex items-center">
        <div
          className={`flex items-center gap-1.5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            showCleanSpace
              ? "-translate-y-full opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          {drKleenContent}
        </div>

        <div
          className={`absolute inset-0 flex items-center gap-1.5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            showCleanSpace
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          {cleanSpaceContent}
        </div>
      </div>
    </>
  );

  if (asDiv) {
    return (
      <div
        id="brand-logo"
        className={commonClasses}
        onClick={onClick}
        role={onClick ? "button" : undefined}
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
      aria-label={showCleanSpace ? "Clean Space Home" : "Dr.Kleen Home"}
    >
      {content}
    </a>
  );
}

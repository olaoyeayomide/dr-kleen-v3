interface SparkleIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export function SparkleIcon({ className = '', size = 20, color = 'currentColor' }: SparkleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
    </svg>
  );
}

export function FourStarCluster({ className = '' }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className}`} aria-hidden="true">
      <SparkleIcon size={14} className="text-sky-300 animate-pulse" />
    </div>
  );
}

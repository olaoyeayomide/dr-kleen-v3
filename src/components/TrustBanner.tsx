import { ShieldCheck, Sparkles, Leaf, Clock } from "lucide-react";

interface TrustBannerProps {
  hasMounted?: boolean;
}

export function TrustBanner({ hasMounted = true }: TrustBannerProps) {
  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-sky-400" />,
      title: "Trusted & Reliable",
      description: "Your satisfaction is our priority.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-sky-400" />,
      title: "Spotless Results",
      description: "We deliver a deeper clean you can see.",
    },
    {
      icon: <Leaf className="w-5 h-5 text-sky-400" />,
      title: "Safe & Eco-Friendly",
      description: "We use safe products for your home & family.",
    },
    {
      icon: <Clock className="w-5 h-5 text-sky-400" />,
      title: "On-Time Service",
      description: "We respect your time and schedule.",
    },
  ];

  return (
    <div
      id="hero-trust-banner"
      className={`w-full border-t border-sky-800/30 text-white relative z-20 transition-all duration-700 ${
        hasMounted ? "animate-hero-fade" : "opacity-0"
      }`}
      style={{ animationDelay: "400ms" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-sky-800/40">
          {features.map((feat, index) => {
            const delayMs = 450 + index * 80;
            return (
              <div
                key={feat.title}
                style={{ animationDelay: `${delayMs}ms` }}
                className={`group flex items-start gap-3.5 transition-all duration-300 ease-out hover:-translate-y-0.5 ${
                  hasMounted ? "animate-hero-slide-up" : "opacity-0"
                } ${index !== 0 ? "lg:pl-7 xl:pl-8" : ""} ${
                  index !== features.length - 1 ? "lg:pr-7 xl:pr-8" : ""
                }`}
              >
                <div className="flex-shrink-0 p-2.5 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-400 mt-0.5 group-hover:bg-sky-500/20 group-hover:border-sky-400 group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.4)] transition-all duration-300">
                  {feat.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white tracking-wide group-hover:text-sky-200 transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-300/80 mt-0.5 leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

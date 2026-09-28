import { useState, useEffect, useRef, MouseEvent } from "react";
import {
  PhoneCall,
  ShoppingBag,
  User,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Logo } from "./common/Logo";

interface NavbarProps {
  onOpenBooking: (serviceName?: string) => void;
  onOpenPestAssessment?: () => void;
  onOpenCart?: () => void;
  onOpenPortal?: () => void;
  cartCount?: number;
}

interface NavLinkItem {
  name: string;
  href: string;
  targetId: string;
  badge?: string;
}

export function Navbar({
  onOpenBooking,
  onOpenPestAssessment,
  onOpenCart,
  onOpenPortal,
  cartCount = 0,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [hasMounted, setHasMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navLinks: NavLinkItem[] = [
    {
      name: "Services",
      href: "#services-section",
      targetId: "services-section",
    },
    {
      name: "Pest Control",
      href: "#pest-control",
      targetId: "pest-control",
      badge: "Diagnostic",
    },
    { name: "Results", href: "#results", targetId: "results" },
    { name: "Plans", href: "#plans", targetId: "plans" },
    { name: "Corporate", href: "#corporate", targetId: "corporate" },
    {
      name: "Service Areas",
      href: "#service-areas",
      targetId: "service-areas",
    },
    { name: "Shop", href: "#shop", targetId: "shop" },
  ];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 16);

      const scrollPosition = scrollY + 140;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const item = navLinks[i];
        const el = document.getElementById(item.targetId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.targetId);
            return;
          }
        }
      }
      if (scrollY < 200) {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string,
    targetId: string,
  ) => {
    e.preventDefault();
    setActiveSection(targetId);
    setMobileMenuOpen(false);

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
  };

  return (
    <header
      ref={navRef}
      role="banner"
      id="main-navigation"
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hasMounted ? "animate-header-enter" : "opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between h-14 sm:h-16 rounded-full border border-white/10 transition-all duration-300 ${
            isScrolled
              ? "bg-[#0b2455]/40 backdrop-blur-xl shadow-[0_18px_45px_-25px_rgba(2,8,23,0.8)]"
              : "bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between w-full px-4 sm:px-5 lg:px-6">
            {/* Brand Logo */}
            <div className="flex-shrink-0">
              <Logo
                variant="light"
                size="md"
                showCleanSpace={isScrolled}
                onClick={(e) => handleNavClick(e, "#hero", "hero")}
              />
            </div>

            {/* Desktop Navigation Links across the 5 Ecosystem Doors */}
            <nav
              className="hidden lg:flex items-center gap-6 xl:gap-7"
              aria-label="Main Navigation"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.targetId;

                return (
                  <a
                    key={link.name}
                    id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.targetId)}
                    className={`group relative text-xs xl:text-sm font-semibold py-1.5 px-0.5 transition-all duration-200 select-none flex items-center gap-1.5 ${
                      isActive
                        ? "text-white font-extrabold"
                        : "text-sky-100/90 hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase bg-white/10 text-white border border-white/20">
                        {link.badge}
                      </span>
                    )}

                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 ease-out ${
                        isActive
                          ? "w-full bg-[#FFC94D] shadow-[0_1px_8px_rgba(255,201,77,0.8)]"
                          : "w-0 bg-white/80 group-hover:w-full"
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Right Action Icons & CTA Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={onOpenCart}
                className="relative p-2 rounded-xl transition-colors cursor-pointer text-white/90 hover:text-white hover:bg-white/10"
                title="View Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#1693d9] text-white text-[10px] font-black flex items-center justify-center shadow-xs animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={onOpenPortal}
                className="p-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold text-white/90 hover:text-white hover:bg-white/10"
                title="Customer Portal"
              >
                <User size={18} />
                <span className="hidden xl:inline">Portal</span>
              </button>

              <button
                id="nav-book-service-btn"
                onClick={() => onOpenBooking("Priority Booking")}
                className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold shadow-[0_10px_25px_-15px_rgba(30,155,224,0.8)] transition-all active:scale-95 cursor-pointer bg-[#1E9BE0] text-white border border-[#6FCBFB]/60 hover:bg-[#167fc7]"
              >
                Book a Service
              </button>
            </div>

            {/* Mobile Actions: Cart + Hamburger */}
            <div className="flex sm:hidden items-center gap-2">
              <button onClick={onOpenCart} className="text-white">
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute 0 top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#1693d9] text-white text-[9px] font-black flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-white hover:bg-white/10"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <div
                  className="w-5 h-4 relative flex flex-col justify-between items-center"
                  aria-hidden="true"
                >
                  <span
                    className={`w-5 h-0.5 rounded-full transform transition-all duration-300 bg-white ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                  />
                  <span
                    className={`w-5 h-0.5 rounded-full transition-all duration-200 bg-white ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                  />
                  <span
                    className={`w-5 h-0.5 rounded-full transform transition-all duration-300 bg-white ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        id="mobile-navigation-drawer"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileMenuOpen
            ? isScrolled
              ? "max-h-[520px] opacity-100 border-t border-white/10 bg-[#062873]/85 backdrop-blur-xl shadow-xl"
              : "max-h-[520px] opacity-100 border-t border-white/10 bg-transparent shadow-none"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 pt-3">
          <nav className="space-y-2" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.targetId;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.targetId)}
                  className={`block rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-sky-100/90 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

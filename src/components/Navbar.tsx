import { useState, useEffect, useRef, MouseEvent } from 'react';
import { PhoneCall, ShoppingBag, User, ShieldAlert, Sparkles } from 'lucide-react';
import { Logo } from './common/Logo';

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
  cartCount = 0
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [hasMounted, setHasMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navLinks: NavLinkItem[] = [
    { name: 'Services', href: '#services-section', targetId: 'services-section' },
    { name: 'Pest Control', href: '#pest-control', targetId: 'pest-control', badge: 'Diagnostic' },
    { name: 'Results', href: '#results', targetId: 'results' },
    { name: 'Plans', href: '#plans', targetId: 'plans' },
    { name: 'Corporate', href: '#corporate', targetId: 'corporate' },
    { name: 'Service Areas', href: '#service-areas', targetId: 'service-areas' },
    { name: 'Shop', href: '#shop', targetId: 'shop' },
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
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string, targetId: string) => {
    e.preventDefault();
    setActiveSection(targetId);
    setMobileMenuOpen(false);

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header
      ref={navRef}
      role="banner"
      id="main-navigation"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-out ${
        hasMounted ? 'animate-header-enter' : 'opacity-0'
      } ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(3,31,94,0.08)] border-b border-slate-100 py-2 sm:py-2.5'
          : 'bg-white border-b border-slate-100/60 py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14">
          
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Logo
              variant="dark"
              size="md"
              onClick={(e) => handleNavClick(e, '#hero', 'hero')}
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
                  id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.targetId)}
                  className={`group relative text-xs xl:text-sm font-semibold py-1.5 px-0.5 transition-all duration-200 select-none flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#031F5E] font-extrabold'
                      : 'text-slate-600 hover:text-[#1693d9]'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-rose-100 text-rose-700 uppercase">
                      {link.badge}
                    </span>
                  )}

                  {/* Animated Active Line */}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 ease-out ${
                      isActive
                        ? 'w-full bg-[#1693d9] shadow-[0_1px_4px_rgba(22,147,217,0.4)]'
                        : 'w-0 bg-[#1693d9] group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Shop Cart Trigger with Badge */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-xl text-slate-700 hover:text-[#031F5E] hover:bg-slate-100 transition-colors cursor-pointer"
              title="View Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#1693d9] text-white text-[10px] font-black flex items-center justify-center shadow-xs animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Customer Portal Trigger */}
            <button
              onClick={onOpenPortal}
              className="p-2 rounded-xl text-slate-700 hover:text-[#031F5E] hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="Customer Portal"
            >
              <User size={18} />
              <span className="hidden xl:inline">Portal</span>
            </button>

            {/* Primary Action Button: Book a Service */}
            <button
              id="nav-book-service-btn"
              onClick={() => onOpenBooking('Priority Booking')}
              className="px-5 py-2.5 rounded-full bg-[#031F5E] hover:bg-[#1693d9] text-white text-xs sm:text-sm font-extrabold shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Book a Service
            </button>
          </div>

          {/* Mobile Actions: Cart + Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenCart}
              className="relative p-2 text-slate-700"
            >
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
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-50"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between items-center" aria-hidden="true">
                <span
                  className={`w-5 h-0.5 bg-[#031F5E] rounded-full transform transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-[#031F5E] rounded-full transition-all duration-200 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-[#031F5E] rounded-full transform transition-all duration-300 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-navigation-drawer"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileMenuOpen
            ? 'max-h-[520px] opacity-100 border-t border-slate-100 bg-white shadow-xl'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-3 pb-6 space-y-2">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.targetId)}
                className="flex items-center justify-between px-3 py-2 text-sm font-bold text-slate-700 hover:bg-sky-50 hover:text-[#031F5E] rounded-xl"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-100 text-rose-700">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal?.();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 text-[#031F5E] text-xs font-bold flex items-center justify-center gap-2"
            >
              <User size={15} />
              <span>Customer Portal Dashboard</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking('Mobile Booking');
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#031F5E] text-white text-xs font-bold text-center"
            >
              Book a Service
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

import { Logo } from './common/Logo';
import { Phone, MessageCircle, Mail, MapPin, Instagram, Linkedin, Twitter, Facebook, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateSection?: (sectionId: string) => void;
  onOpenBooking?: (serviceName?: string) => void;
  onOpenPestAssessment?: () => void;
  onOpenShop?: () => void;
}

export function Footer({
  onNavigateSection,
  onOpenBooking,
  onOpenPestAssessment,
  onOpenShop
}: FooterProps) {
  return (
    <footer className="bg-[#031F5E] text-slate-300 border-t border-sky-950">
      
      {/* Main 4-Column Footer Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand Info & Motto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-2.5 rounded-2xl w-fit shadow-md">
              <Logo />
            </div>

            <div className="pt-2">
              <p className="text-xl font-black text-white tracking-wide">
                Clean. Safe. Protected.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-sm leading-relaxed">
                Nigeria's premier digital cleaning, vector pest eradication, and institutional hygiene platform. Built around precision standards and certified non-toxic chemistry.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#1693d9] hover:text-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#1693d9] hover:text-white flex items-center justify-center transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={17} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#1693d9] hover:text-white flex items-center justify-center transition-colors"
                title="Twitter"
              >
                <Twitter size={17} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#1693d9] hover:text-white flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <Facebook size={17} />
              </a>
            </div>
          </div>

          {/* Col 1: Services */}
          <div>
            <h4 className="text-sm font-extrabold text-white mb-5 uppercase tracking-wider border-b border-sky-800/80 pb-2">
              Services
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href="#services-section"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection?.('services-section');
                  }}
                  className="hover:text-[#1693d9] transition-colors cursor-pointer"
                >
                  Cleaning
                </a>
              </li>
              <li>
                <a
                  href="#pest-control"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenPestAssessment?.();
                  }}
                  className="hover:text-[#1693d9] transition-colors cursor-pointer"
                >
                  Pest Control
                </a>
              </li>
              <li>
                <a
                  href="#corporate"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection?.('corporate');
                  }}
                  className="hover:text-[#1693d9] transition-colors cursor-pointer"
                >
                  Corporate
                </a>
              </li>
              <li>
                <a
                  href="#plans"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection?.('plans');
                  }}
                  className="hover:text-[#1693d9] transition-colors cursor-pointer"
                >
                  Protection Plans
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Company */}
          <div>
            <h4 className="text-sm font-extrabold text-white mb-5 uppercase tracking-wider border-b border-sky-800/80 pb-2">
              Company
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href="#experience"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection?.('experience');
                  }}
                  className="hover:text-[#1693d9] transition-colors cursor-pointer"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection?.('team');
                  }}
                  className="hover:text-[#1693d9] transition-colors cursor-pointer"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="#results"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection?.('results');
                  }}
                  className="hover:text-[#1693d9] transition-colors cursor-pointer"
                >
                  Results (Before &amp; After)
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection?.('reviews');
                  }}
                  className="hover:text-[#1693d9] transition-colors cursor-pointer"
                >
                  Reviews
                </a>
              </li>
              <li>
                <a
                  href="#service-areas"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection?.('service-areas');
                  }}
                  className="hover:text-[#1693d9] transition-colors cursor-pointer"
                >
                  Service Areas
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Shop & Contact */}
          <div>
            <h4 className="text-sm font-extrabold text-white mb-5 uppercase tracking-wider border-b border-sky-800/80 pb-2">
              Shop &amp; Contact
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <button
                  onClick={onOpenShop}
                  className="hover:text-[#1693d9] transition-colors text-left cursor-pointer"
                >
                  Cleaning Equipment
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenShop}
                  className="hover:text-[#1693d9] transition-colors text-left cursor-pointer"
                >
                  Hygiene Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking?.('Bulk Commercial Chemical Order')}
                  className="hover:text-[#1693d9] transition-colors text-left cursor-pointer"
                >
                  Bulk Orders
                </button>
              </li>
              <li className="pt-2 border-t border-sky-800/50">
                <a href="tel:+2348003755336" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone size={14} className="text-[#1693d9]" />
                  <span>+234 800 375 5336</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/2348003755336"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Desk</span>
                </a>
              </li>
              <li>
                <a href="mailto:support@drkleen.ng" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail size={14} className="text-[#1693d9]" />
                  <span>support@drkleen.ng</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-14 pt-8 border-t border-sky-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© Dr•Kleen Services Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck size={14} /> RC: 1849202 (Licensed &amp; Insured)
            </span>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

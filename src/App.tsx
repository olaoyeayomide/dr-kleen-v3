/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { NeedSection } from "./components/NeedSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ServicesSection } from "./components/ServicesSection";
import { BeforeAfterSection } from "./components/BeforeAfterSection";
import { PestControlSection } from "./components/PestControlSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { ProtectionPlansSection } from "./components/ProtectionPlansSection";
import { CorporateSection } from "./components/CorporateSection";
import { CustomerReviewsSection } from "./components/CustomerReviewsSection";
import { ServiceAreasSection } from "./components/ServiceAreasSection";
// import { TeamSection } from "./components/TeamSection";
import { ShopSection } from "./components/ShopSection";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

// Digital Tool & Ecosystem Modals
import { BookingModal } from "./components/BookingModal";
import { DemoModal } from "./components/DemoModal";
import { SmartPestAssessmentModal } from "./components/SmartPestAssessmentModal";
import { ServicesDetailModal } from "./components/ServicesDetailModal";
import { CorporateQuoteModal } from "./components/CorporateQuoteModal";
import { PlansModal } from "./components/PlansModal";
import { CartDrawer } from "./components/CartDrawer";
import { CustomerPortalModal } from "./components/CustomerPortalModal";

import { CartItem, ShopProduct } from "./types";

export default function App() {
  // Modal states for the 5 ecosystem doors
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [servicesModalOpen, setServicesModalOpen] = useState(false);
  const [pestAssessmentModalOpen, setPestAssessmentModalOpen] = useState(false);
  const [corporateModalOpen, setCorporateModalOpen] = useState(false);
  const [plansModalOpen, setPlansModalOpen] = useState(false);
  const [portalModalOpen, setPortalModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Active service selection
  const [selectedService, setSelectedService] = useState("Home Deep Cleaning");
  const [selectedPrice, setSelectedPrice] = useState<string | undefined>(
    undefined,
  );

  // E-commerce Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleOpenBooking = (serviceName?: string, price?: string) => {
    if (serviceName) setSelectedService(serviceName);
    if (price) setSelectedPrice(price);
    setBookingModalOpen(true);
  };

  const handleAddToCart = (product: ShopProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartDrawerOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems(
      (prev) =>
        prev
          .map((item) => {
            if (item.product.id === productId) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[],
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId),
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleWhatsAppDirect = (msg?: string) => {
    const text = encodeURIComponent(
      msg ||
        "Hello Dr•Kleen! I'm reaching out from your website to inquire about your professional cleaning and pest protection services.",
    );
    window.open(`https://wa.me/2348003755336?text=${text}`, "_blank");
  };

  const handleCallNow = () => {
    window.location.href = "tel:+2348003755336";
  };

  const totalCartCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-[#1693d9] selection:text-white">
      {/* 1. Header Navigation with 5 Ecosystem Doors, Cart Badge, & Customer Portal */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenPestAssessment={() => setPestAssessmentModalOpen(true)}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenPortal={() => setPortalModalOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Main Content Sections: Exact Sequence from Comprehensive Brief */}
      <main>
        {/* 2. Hero Section with Trust Banner */}
        <Hero onOpenBooking={handleOpenBooking} onCallNow={handleCallNow} />
        {/* 4. Experienced Cleaning Services */}
        <ExperienceSection />

        {/* 3. What Do You Need? (5 Category Cards) */}
        <NeedSection
          onSelectCategory={(cat) => {
            if (cat === "Pest Problem") {
              setPestAssessmentModalOpen(true);
            } else if (cat === "Business") {
              setCorporateModalOpen(true);
            } else {
              handleOpenBooking(`${cat} Cleaning`);
            }
          }}
        />

        {/* 5. SERVICES SECTION (Residential, Commercial, Post-Construction + View All Services →) */}
        <ServicesSection
          onOpenBooking={handleOpenBooking}
          onViewAllServices={() => setServicesModalOpen(true)}
        />

        {/* 6. BEFORE → AFTER EXPERIENCE (Interactive split comparison slider) */}
        <BeforeAfterSection
          onOpenBooking={handleOpenBooking}
          onViewMoreTransformations={() => setServicesModalOpen(true)}
        />

        {/* 7. PEST CONTROL SECTION (Clean isn't enough. Stay Protected.) */}
        <PestControlSection
          onStartPestAssessment={() => setPestAssessmentModalOpen(true)}
          onCallSpecialist={handleCallNow}
        />

        {/* 9. HOW DR•KLEEN WORKS (From Request to Refresh: 01 - 05) */}
        <HowItWorksSection
          onOpenBooking={() => handleOpenBooking("New Cleaning Milestone")}
        />

        {/* 10. PROTECTION PLANS (Don't Wait for the Mess. Stay Ahead of It.) */}
        <ProtectionPlansSection
          onSelectPlan={(planName, price) =>
            handleOpenBooking(`Protection Plan: ${planName}`, price)
          }
          onExplorePlans={() => setPlansModalOpen(true)}
        />

        {/* 11. CORPORATE SECTION (A Cleaner Workplace. A Better Business.) */}
        <CorporateSection
          onExploreCorporate={() => setCorporateModalOpen(true)}
          onRequestInspection={() => setCorporateModalOpen(true)}
        />

        {/* 12. CUSTOMER REVIEWS (Trusted by People Who Care About Their Space) */}
        <CustomerReviewsSection
          onReadAllReviews={() => setPortalModalOpen(true)}
          onOpenBooking={() =>
            handleOpenBooking("Reviewer Recommended Service")
          }
        />

        {/* 13. SERVICE AREAS (Dr•Kleen Around You - Currently Serving vs Coming Soon) */}
        <ServiceAreasSection
          onCheckAreaCoverage={(city) =>
            handleOpenBooking(`Booking in ${city}`)
          }
        />

        {/* 14. THE TEAM (The People Behind the Clean) */}
        {/* <TeamSection
          onMeetTeam={() => handleOpenBooking("Leadership Consultation")}
          onOpenBooking={handleOpenBooking}
        /> */}

        {/* 15. SHOP TEASER (Keep Your Space Clean Between Visits.) */}
        <ShopSection
          onAddToCart={handleAddToCart}
          onOpenShop={() => setCartDrawerOpen(true)}
        />

        {/* 16. FINAL CTA (Ready for a Cleaner, Safer Space? [Book] [WhatsApp] [Call]) */}
        <FinalCTA
          onBookService={() => handleOpenBooking("Priority Final Dispatch")}
          onWhatsAppUs={() => handleWhatsAppDirect()}
          onCallDrKleen={handleCallNow}
        />
      </main>

      {/* 17. FOOTER (Clean. Safe. Protected. Services, Company, Shop, Contact) */}
      <Footer
        onNavigateSection={(sectionId) => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        onOpenBooking={handleOpenBooking}
        onOpenPestAssessment={() => setPestAssessmentModalOpen(true)}
        onOpenShop={() => setCartDrawerOpen(true)}
      />

      {/* ========================================================================= */}
      {/* Interactive Ecosystem Modals & Digital Tools (The 5 Doors) */}
      {/* ========================================================================= */}

      {/* 8. SMART PEST ASSESSMENT: 7-Step Interactive Digital Tool */}
      <SmartPestAssessmentModal
        isOpen={pestAssessmentModalOpen}
        onClose={() => setPestAssessmentModalOpen(false)}
      />

      {/* Door 1: Detailed Services Catalog Modal (/services) */}
      <ServicesDetailModal
        isOpen={servicesModalOpen}
        onClose={() => setServicesModalOpen(false)}
        onSelectService={(serviceName, price) =>
          handleOpenBooking(serviceName, price)
        }
      />

      {/* Door 3: Corporate Facility Inspection & Quotation Modal (/corporate) */}
      <CorporateQuoteModal
        isOpen={corporateModalOpen}
        onClose={() => setCorporateModalOpen(false)}
      />

      {/* Door 4: Protection Plans & Retainers Modal (/plans) */}
      <PlansModal
        isOpen={plansModalOpen}
        onClose={() => setPlansModalOpen(false)}
        onSubscribe={(planName, price) =>
          handleOpenBooking(`Plan Subscription: ${planName}`, price)
        }
      />

      {/* Door 5: Shop Cart Drawer & Checkout */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Unified Customer Portal Hub */}
      <CustomerPortalModal
        isOpen={portalModalOpen}
        onClose={() => setPortalModalOpen(false)}
        onOpenBooking={() => handleOpenBooking("Portal Scheduled Service")}
      />

      {/* Standard Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false);
          setSelectedPrice(undefined);
        }}
        initialService={selectedService}
        initialPrice={selectedPrice}
      />

      {/* Video Demonstration Modal */}
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onBookNow={() => {
          setDemoModalOpen(false);
          handleOpenBooking("Video Tour Follow-up");
        }}
      />
    </div>
  );
}

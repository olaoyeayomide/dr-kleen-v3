import { useState, useEffect, FormEvent } from "react";
import {
  X,
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
  Home,
  Navigation,
  Loader2,
} from "lucide-react";
import { Logo } from "./common/Logo";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialPrice?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  initialService = "Home Deep Cleaning",
  initialPrice,
}: BookingModalProps) {
  const [service, setService] = useState(initialService);
  const [customService, setCustomService] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Lagos (Island / Lekki / Ikoyi)");
  const [address, setAddress] = useState("");
  const [locationPin, setLocationPin] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) setService(initialService);
  }, [initialService]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationPin({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
      },
      (error) => {
        console.error(error);
        alert("Unable to retrieve location. Please check browser permissions.");
        setIsLocating(false);
      },
    );
  };

  const selectedServiceText = service === "Other" ? customService : service;

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   const bookingPayload = {
  //     message: "You have a new customer inspection request!",
  //     client: {
  //       fullName,
  //       phone,
  //       city,
  //       address,
  //       service: selectedServiceText,
  //       preferredDate: date,
  //       notes: note || "None",
  //       mapLocation: locationPin
  //         ? `https://www.google.com/maps?q=${locationPin.lat},${locationPin.lng}`
  //         : "Not pinned",
  //     },
  //   };

  //   try {
  //     // Send request to your backend API route (which triggers WhatsApp / Meta Graph APIs)
  //     const response = await fetch("/api/send-booking-notification", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(bookingPayload),
  //     });

  //     if (response.ok) {
  //       setIsSubmitted(true);
  //     } else {
  //       alert("There was an issue sending your request. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     // Fallback: local success state if backend isn't set up yet
  //     setIsSubmitted(true);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      fullName,
      phone,
      city,
      address,
      service: selectedServiceText,
      preferredDate: date,
      note: note || "None",
      mapLocation: locationPin
        ? `https://www.google.com/maps?q=${locationPin.lat},${locationPin.lng}`
        : "Not pinned",
    };

    try {
      await fetch(
        "https://hook.eu1.make.com/luni9pl0p9dislwjsi6bh6ygbw2o0gfw",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Could not submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#031F5E]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100 my-8">
        {/* Header */}
        <div className="bg-[#031F5E] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo variant="light" size="sm" asDiv />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-bold text-[#031F5E]">
                Request Sent Successfully!
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                Thank you,{" "}
                <span className="font-semibold">
                  {fullName || "Valued Customer"}
                </span>
                . Our team has received your details and a hygiene supervisor
                will reach out shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-8 py-2.5 rounded-full bg-[#1693d9] hover:bg-[#1281bf] text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider block mb-1">
                  Fast &amp; Reliable Scheduling
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#031F5E]">
                  Schedule Your Inspection
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Professional deep cleaning, hygiene sanitation, and pest
                  control across Nigeria.
                </p>
              </div>

              {initialPrice && (
                <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-medium text-slate-700">
                    Selected Package:
                  </span>
                  <span className="font-bold text-[#0284c7]">
                    {service} ({initialPrice})
                  </span>
                </div>
              )}

              {/* Service Select & Custom Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Service Required
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white"
                >
                  <option value="Home Deep Cleaning">Home Deep Cleaning</option>
                  <option value="Post Construction Cleaning">
                    Post Construction Cleaning
                  </option>
                  <option value="Commercial & Office Cleaning">
                    Commercial &amp; Office Cleaning
                  </option>
                  <option value="Fumigation & Pest Control">
                    Fumigation &amp; Pest Control
                  </option>
                  <option value="Steam & Upholstery Cleaning">
                    Steam &amp; Upholstery Cleaning
                  </option>
                  <option value="Regular Package ($99)">
                    Regular Package ($99)
                  </option>
                  <option value="Deluxe Package ($199)">
                    Deluxe Package ($199)
                  </option>
                  <option value="Superior Package ($299)">
                    Superior Package ($299)
                  </option>
                  <option value="Other">Other (Custom Service)</option>
                </select>

                {service === "Other" && (
                  <input
                    type="text"
                    required
                    placeholder="Specify the service you need..."
                    value={customService}
                    onChange={(e) => setCustomService(e.target.value)}
                    className="mt-2 w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white"
                  />
                )}
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Babatunde Adeyemi"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0803 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white"
                  />
                </div>
              </div>

              {/* City / State Location & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <MapPin size={13} className="text-[#0284c7]" /> Location /
                    Area
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white"
                  >
                    <option value="Lagos (Island / Lekki / Ikoyi)">
                      Lagos (Island / Lekki / Ikoyi)
                    </option>
                    <option value="Lagos (Mainland / Ikeja / Magodo)">
                      Lagos (Mainland / Ikeja / Magodo)
                    </option>
                    <option value="Abuja (Maitama / Asokoro / Wuse)">
                      Abuja (Maitama / Asokoro / Wuse)
                    </option>
                    <option value="Port Harcourt (GRA / Peter Odili)">
                      Port Harcourt (GRA / Peter Odili)
                    </option>
                    <option value="Ibadan (Bodija / Oluyole)">
                      Ibadan (Bodija / Oluyole)
                    </option>
                    <option value="Other Locations">Other Locations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Calendar size={13} className="text-[#0284c7]" /> Preferred
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white"
                  />
                </div>
              </div>

              {/* Full House Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Home size={13} className="text-[#0284c7]" /> Detailed Street
                  Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Block 4, Flat 2, Admiralty Way, Lekki Phase 1"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white"
                />
              </div>

              {/* GPS Location Pin Option */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pin House Map Location
                </label>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isLocating}
                  className="w-full py-2 px-3 bg-sky-50 border border-sky-200 hover:bg-sky-100 rounded-xl text-xs font-semibold text-[#0284c7] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Navigation
                    size={14}
                    className={isLocating ? "animate-spin" : ""}
                  />
                  {isLocating
                    ? "Fetching your coordinates..."
                    : locationPin
                      ? "✓ Map Location Pinned"
                      : "Pin My Current GPS Location"}
                </button>
                {locationPin && (
                  <p className="text-[11px] text-emerald-600 mt-1 text-center font-medium">
                    Coordinates attached: {locationPin.lat.toFixed(5)},{" "}
                    {locationPin.lng.toFixed(5)}
                  </p>
                )}
              </div>

              {/* Extra Note */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Specific Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 3-bedroom duplex, stubborn tiles, fumigation needed..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full bg-[#1693d9] hover:bg-[#1281bf] text-white text-sm font-bold shadow-lg transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Confirm Inspection Request</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-1">
                <p className="text-[11px] text-slate-400">
                  ⚡ 100% Satisfaction Guarantee • No Obligation Free Quote
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

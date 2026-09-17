import { useState, FormEvent } from 'react';
import { X, Building2, CheckCircle2, Send, MessageCircle } from 'lucide-react';

interface CorporateQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CorporateQuoteModal({ isOpen, onClose }: CorporateQuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    workEmail: '',
    phone: '',
    facilityType: 'Corporate Office',
    approxSqMeters: '100 - 300 sqm',
    frequency: 'Daily Janitorial',
    location: 'Lagos Island / VI / Ikoyi',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppB2B = () => {
    const text = `*DR•KLEEN CORPORATE FACILITY AUDIT REQUEST*%0A%0A` +
      `*Company:* ${formData.companyName || 'Corporate Client'}%0A` +
      `*Contact Person:* ${formData.contactPerson}%0A` +
      `*Facility Type:* ${formData.facilityType}%0A` +
      `*Scale:* ${formData.approxSqMeters}%0A` +
      `*Frequency:* ${formData.frequency}%0A` +
      `*Location:* ${formData.location}%0A` +
      `*Phone/Email:* ${formData.phone} | ${formData.workEmail}%0A%0A` +
      `_Requesting dedicated corporate proposal, inspection visit and monthly SLA schedule._`;
    return `https://wa.me/2348003755336?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-[#031F5E] text-white p-5 sm:p-6 flex items-center justify-between border-b border-sky-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-300 flex items-center justify-center">
              <Building2 size={20} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <span>Corporate Facility Audit &amp; SLA Quote</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500 text-white uppercase">
                  /corporate
                </span>
              </h2>
              <p className="text-xs text-sky-200/80">
                Offices, Schools, Hospitality, Estates &amp; Commercial Centers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-5 animate-hero-scale-up">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 size={36} />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-[#031F5E]">
                  Corporate Inquiry Received
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-2">
                  Our Corporate Facility Director will contact you within 2 business hours with an audit schedule and proposal draft.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={generateWhatsAppB2B()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  <MessageCircle size={18} className="fill-white" />
                  <span>Fast-Track Via WhatsApp Enterprise Desk</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Sterling Chambers Ltd"
                    value={formData.companyName}
                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#1693d9] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Officer Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Admin / Procurement Manager"
                    value={formData.contactPerson}
                    onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#1693d9] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Email</label>
                  <input
                    required
                    type="email"
                    placeholder="operations@company.com"
                    value={formData.workEmail}
                    onChange={e => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#1693d9] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp</label>
                  <input
                    required
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#1693d9] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Facility Type</label>
                  <select
                    value={formData.facilityType}
                    onChange={e => setFormData({ ...formData, facilityType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#1693d9] outline-none bg-white"
                  >
                    <option value="Corporate Office">Corporate Office</option>
                    <option value="School / College">School / College</option>
                    <option value="Hospitality / Hotel">Hospitality / Hotel</option>
                    <option value="Clinic / Hospital">Clinic / Hospital</option>
                    <option value="Residential Estate">Residential Estate</option>
                    <option value="Factory / Warehouse">Factory / Warehouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Size</label>
                  <select
                    value={formData.approxSqMeters}
                    onChange={e => setFormData({ ...formData, approxSqMeters: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#1693d9] outline-none bg-white"
                  >
                    <option value="Under 200 sqm">Under 200 sqm</option>
                    <option value="200 - 500 sqm">200 - 500 sqm</option>
                    <option value="500 - 1500 sqm">500 - 1,500 sqm</option>
                    <option value="Multi-Story Campus">Multi-Story Campus / Estate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service Schedule</label>
                  <select
                    value={formData.frequency}
                    onChange={e => setFormData({ ...formData, frequency: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#1693d9] outline-none bg-white"
                  >
                    <option value="Daily Janitorial">Daily Janitorial</option>
                    <option value="After-Hours Night Shift">After-Hours Night Shift</option>
                    <option value="Quarterly Fumigation Retainer">Quarterly Fumigation Retainer</option>
                    <option value="Post-Fitout Deep Clean">One-Time Post-Fitout Clean</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Facility Address &amp; Key Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Specify location, shift timings, or special surface considerations (e.g. marble polish, server room electrostatic dust extraction)..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#1693d9] outline-none"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#031F5E] hover:bg-[#1693d9] text-white font-extrabold text-sm tracking-wide shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  <span>Request Official Proposal &amp; Site Inspection</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

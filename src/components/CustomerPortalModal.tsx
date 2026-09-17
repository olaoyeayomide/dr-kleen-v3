import { useState } from 'react';
import { X, User, Calendar, ShieldCheck, ShoppingBag, Truck, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface CustomerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export function CustomerPortalModal({ isOpen, onClose, onOpenBooking }: CustomerPortalModalProps) {
  const [activeTab, setActiveTab] = useState<'bookings' | 'tracking' | 'plans' | 'orders'>('bookings');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#031F5E] text-white p-5 sm:p-6 flex items-center justify-between border-b border-sky-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1693d9]/20 text-[#1693d9] flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                <span>Dr•Kleen Customer Ecosystem Portal</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white uppercase">
                  Connected
                </span>
              </h2>
              <p className="text-xs text-sky-200/80">
                Unified dashboard for Bookings, Live Van Dispatch, Subscriptions &amp; Orders
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

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 overflow-x-auto">
          {[
            { id: 'bookings', label: 'My Bookings', icon: Calendar },
            { id: 'tracking', label: 'Live Service Dispatch', icon: Truck },
            { id: 'plans', label: 'Active Protection Plans', icon: ShieldCheck },
            { id: 'orders', label: 'Hygiene Shop Orders', icon: ShoppingBag }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#1693d9] text-[#031F5E] bg-white shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <tab.icon size={15} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-extrabold text-base text-[#031F5E]">Recent &amp; Upcoming Visits</h3>
                <button
                  onClick={() => {
                    onOpenBooking();
                    onClose();
                  }}
                  className="px-4 py-1.5 rounded-full bg-[#031F5E] text-white text-xs font-bold hover:bg-[#1693d9] cursor-pointer"
                >
                  + New Booking
                </button>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                    Confirmed Appointment
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm mt-1">
                    Master Suite Deep Clean &amp; Sofa Steam Wash
                  </h4>
                  <p className="text-xs text-slate-500">
                    Friday, 10:00 AM • Lekki Phase 1, Lagos • Lead: Kayode Balogun
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-[#031F5E]">₦65,000</span>
                  <p className="text-[11px] text-emerald-600 font-bold">Technicians Assigned</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tracking' && (
            <div className="space-y-4 text-center py-6">
              <div className="w-16 h-16 rounded-full bg-sky-100 text-[#1693d9] flex items-center justify-center mx-auto">
                <Truck size={32} className="animate-pulse" />
              </div>
              <h3 className="text-lg font-extrabold text-[#031F5E]">
                Dr•Kleen Mobile Van Unit #04
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                En route to Lekki Phase 1 corridor. Estimated on-site arrival: 18 minutes.
              </p>
              <div className="max-w-md mx-auto bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-[#1693d9] h-full w-3/4 rounded-full" />
              </div>
            </div>
          )}

          {activeTab === 'plans' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border border-sky-300 bg-sky-50/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1693d9] text-white text-[10px] font-extrabold uppercase">
                    Active Membership
                  </span>
                  <h4 className="font-bold text-slate-900 text-base mt-1">
                    Home Care Bi-Weekly Retainer
                  </h4>
                  <p className="text-xs text-slate-600">
                    Next Scheduled Session: Oct 4th, 2026 • 2 unused guest rollover credits
                  </p>
                </div>
                <button
                  onClick={() => {
                    onOpenBooking();
                    onClose();
                  }}
                  className="px-5 py-2 rounded-xl bg-[#031F5E] text-white text-xs font-bold cursor-pointer"
                >
                  Manage Roster
                </button>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                <div>
                  <p className="font-extrabold text-slate-800">Order #DK-9821</p>
                  <p className="text-slate-500">2x Bio-Sanitizing Floor Concentrate (2L)</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900">₦13,000</p>
                  <p className="text-emerald-600 font-bold">Dispatched</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

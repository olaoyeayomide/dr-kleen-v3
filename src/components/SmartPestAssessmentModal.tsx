import { useState, useRef, ChangeEvent } from 'react';
import {
  X,
  Bug,
  MapPin,
  AlertCircle,
  Clock,
  Upload,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  FileCheck,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { PestAssessmentData } from '../types';

interface SmartPestAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SmartPestAssessmentModal({ isOpen, onClose }: SmartPestAssessmentModalProps) {
  const [step, setStep] = useState<number>(1);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<PestAssessmentData>({
    pestType: 'Bedbugs',
    area: 'Bedroom',
    severity: 'Moderate',
    duration: '2 - 4 Weeks',
    photoUrl: '',
    address: '',
    city: 'Lagos',
    preferredDate: '',
    preferredTime: 'Morning (9:00 AM - 12:00 PM)',
    fullName: '',
    phone: '',
    notes: ''
  });

  if (!isOpen) return null;

  const totalSteps = 7;

  const pestOptions = [
    { id: 'Bedbugs', label: 'Bedbugs', icon: '🪳', desc: 'Bites at night, mattress seams, blood spots' },
    { id: 'Rats', label: 'Rats / Rodents', icon: '🐀', desc: 'Chewed wires, droppings, ceiling noises' },
    { id: 'Cockroaches', label: 'Cockroaches', icon: '🪲', desc: 'Kitchen cupboards, sink pipes, flying roaches' },
    { id: 'Termites', label: 'Termites / Ants', icon: '🪵', desc: 'Hollow doorframes, mud tubes, wood dust' },
    { id: 'Other', label: 'Mosquitoes / Other', icon: '🦟', desc: 'Yard swarm, flies, mysterious insect bites' }
  ];

  const areaOptions = [
    { id: 'Bedroom', label: 'Bedroom / Wardrobes', icon: '🛏️' },
    { id: 'Kitchen', label: 'Kitchen & Pantry', icon: '🍳' },
    { id: 'Office', label: 'Corporate Office / Store', icon: '🏢' },
    { id: 'Entire property', label: 'Entire Property (Inside & Perimeter)', icon: '🏡' }
  ];

  const severityOptions = [
    { id: 'Mild', label: 'Mild', desc: 'Occasional sighting (1 - 2 pests weekly)', color: 'text-amber-500 border-amber-300' },
    { id: 'Moderate', label: 'Moderate', desc: 'Regular sightings in multiple rooms', color: 'text-orange-500 border-orange-400' },
    { id: 'Severe', label: 'Severe / Critical', desc: 'Daily bites, nests visible, emergency situation', color: 'text-rose-500 border-rose-500' }
  ];

  const durationOptions = [
    'Just noticed (Few days)',
    '1 - 3 Weeks',
    '1 - 3 Months',
    'Over 3 Months (Chronic)'
  ];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFilePreview(url);
      setFormData(prev => ({ ...prev, photoUrl: file.name }));
    }
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const generateWhatsAppUrl = () => {
    const message = `*DR•KLEEN SMART PEST ASSESSMENT*%0A%0A` +
      `*Pest Identified:* ${formData.pestType}%0A` +
      `*Affected Area:* ${formData.area}%0A` +
      `*Infestation Level:* ${formData.severity}%0A` +
      `*Duration:* ${formData.duration}%0A` +
      `*Location:* ${formData.address || 'Not specified'}, ${formData.city}%0A` +
      `*Preferred Schedule:* ${formData.preferredDate || 'Earliest available'} (${formData.preferredTime})%0A` +
      `*Client:* ${formData.fullName || 'Valued Client'} (${formData.phone || 'Phone upon chat'})%0A%0A` +
      `_I have completed the diagnostic tool on Dr•Kleen and would like the technical team to review and dispatch a fumigation quote._`;

    return `https://wa.me/2348003755336?text=${message}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-[#031F5E] text-white p-5 sm:p-6 flex items-center justify-between border-b border-sky-800/40 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center">
              <Bug size={20} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
                <span>Smart Pest Diagnostic Tool</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white uppercase">
                  Mini Digital Tool
                </span>
              </h2>
              <p className="text-xs text-sky-200/80">
                Step {step} of {totalSteps} — {step === 7 ? 'Assessment Complete' : 'Pest Quarantine Triage'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Progress bar */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-rose-500 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Modal Body: Steps 1 to 7 */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* STEP 1: What are you dealing with? */}
          {step === 1 && (
            <div className="space-y-5 animate-hero-slide-up">
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Step 1 of 6</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  What pests are you dealing with?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Select the primary pest species observed in your space.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {pestOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFormData({ ...formData, pestType: opt.id })}
                    className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                      formData.pestType === opt.id
                        ? 'border-rose-500 bg-rose-50/60 shadow-md ring-2 ring-rose-200'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-3xl shrink-0 p-1.5 rounded-xl bg-white shadow-xs">
                      {opt.icon}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                        {opt.label}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Where is the problem? */}
          {step === 2 && (
            <div className="space-y-5 animate-hero-slide-up">
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Step 2 of 6</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  Where is the problem located?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Identifies required chemical vapor containment parameters.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {areaOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFormData({ ...formData, area: opt.id })}
                    className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3.5 cursor-pointer ${
                      formData.area === opt.id
                        ? 'border-rose-500 bg-rose-50/60 shadow-md ring-2 ring-rose-200'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-3xl shrink-0 p-1 rounded-xl bg-white shadow-xs">
                      {opt.icon}
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                      {opt.label}
                    </h4>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: How serious? */}
          {step === 3 && (
            <div className="space-y-5 animate-hero-slide-up">
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Step 3 of 6</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  How serious is the infestation?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Guides dosage between standard perimeter flush vs. dual thermal extraction.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {severityOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFormData({ ...formData, severity: opt.id as any })}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                      formData.severity === opt.id
                        ? 'border-rose-500 bg-rose-50/60 shadow-md ring-2 ring-rose-200'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <h4 className={`font-extrabold text-base ${opt.color}`}>
                        {opt.label}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {opt.desc}
                      </p>
                    </div>
                    {formData.severity === opt.id && (
                      <CheckCircle2 size={20} className="text-rose-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: How long? */}
          {step === 4 && (
            <div className="space-y-5 animate-hero-slide-up">
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Step 4 of 6</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  How long have pests been present?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Long-term infestations require egg-larval cycle interruption follow-ups.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {durationOptions.map((dur) => (
                  <button
                    key={dur}
                    onClick={() => setFormData({ ...formData, duration: dur })}
                    className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                      formData.duration === dur
                        ? 'border-rose-500 bg-rose-50/60 shadow-md ring-2 ring-rose-200'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-extrabold text-sm text-slate-900">{dur}</span>
                    <Clock size={16} className={formData.duration === dur ? 'text-rose-600' : 'text-slate-400'} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Upload photos/videos */}
          {step === 5 && (
            <div className="space-y-5 animate-hero-slide-up">
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Step 5 of 6</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  Upload photos or videos (Optional)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Our entomologist can identify insect bites, droppings, and nesting points directly.
                </p>
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-rose-400 rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all bg-slate-50 hover:bg-rose-50/20"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  className="hidden"
                />

                {filePreview ? (
                  <div className="space-y-3">
                    <img
                      src={filePreview}
                      alt="Pest infestation preview"
                      className="max-h-48 rounded-2xl mx-auto object-cover border border-slate-300"
                    />
                    <p className="text-xs font-bold text-emerald-600 flex items-center justify-center gap-1">
                      <CheckCircle2 size={14} /> Image Attached Successfully! Tap to replace.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-white text-rose-500 shadow-md flex items-center justify-center mx-auto border border-slate-200">
                      <Upload size={24} />
                    </div>
                    <p className="text-sm font-bold text-slate-800">
                      Click to upload photos of mattresses, walls, or droppings
                    </p>
                    <p className="text-xs text-slate-400">
                      PNG, JPG, MP4 accepted (Max 25MB)
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-sky-50 rounded-2xl p-4 border border-sky-200 flex items-start gap-3">
                <ShieldCheck size={18} className="text-sky-700 shrink-0 mt-0.5" />
                <p className="text-xs text-sky-800">
                  <span className="font-bold">No photo right now?</span> No problem! You can skip this step and proceed directly to scheduling.
                </p>
              </div>
            </div>
          )}

          {/* STEP 6: Location + Preferred Date */}
          {step === 6 && (
            <div className="space-y-5 animate-hero-slide-up">
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Step 6 of 6</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  Location & Contact Details
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Where should the Dr•Kleen vector control specialist inspect or dispatch?
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Babatunde Adeleke"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +234 800 000 0000"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City / Region</label>
                    <select
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-500 outline-none bg-white"
                    >
                      <option value="Lagos">Lagos State (Island & Mainland)</option>
                      <option value="Abuja">Abuja (FCT)</option>
                      <option value="Ibadan">Ibadan (Oyo State)</option>
                      <option value="Other">Other Nigerian State</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Neighborhood / Estate</label>
                    <input
                      type="text"
                      placeholder="e.g. Lekki Phase 1, Maitama, Bodija"
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Inspection Date</label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-500 outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time Window</label>
                    <select
                      value={formData.preferredTime}
                      onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-500 outline-none bg-white"
                    >
                      <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                      <option value="Evening (5:00 PM - 7:00 PM)">Evening (5:00 PM - 7:00 PM)</option>
                      <option value="Urgent Immediate Response">Urgent Immediate Response</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Assessment Received + WhatsApp Connect */}
          {step === 7 && (
            <div className="space-y-6 text-center animate-hero-scale-up py-4">
              <div className="w-18 h-18 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg border-2 border-emerald-300">
                <CheckCircle2 size={40} />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wide">
                  Diagnostic Case Logged
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#031F5E] mt-3">
                  Assessment Received!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                  A Dr•Kleen pest specialist is reviewing your diagnostic profile. We have compiled your exact infestation summary.
                </p>
              </div>

              {/* Assessment Summary Card */}
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-left max-w-md mx-auto space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Target Pest:</span>
                  <span className="font-extrabold text-slate-900">{formData.pestType}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Area Scope:</span>
                  <span className="font-bold text-slate-800">{formData.area}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Severity Triage:</span>
                  <span className="font-bold text-rose-600">{formData.severity}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Duration:</span>
                  <span className="font-bold text-slate-800">{formData.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Location:</span>
                  <span className="font-bold text-slate-800">{formData.address || 'Central'}, {formData.city}</span>
                </div>
              </div>

              {/* Direct WhatsApp Action to solve the client's information collection bottleneck */}
              <div className="pt-2">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-base tracking-wide shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle size={20} className="fill-white" />
                  <span>WhatsApp Dr•Kleen With My Assessment</span>
                </a>
                <p className="text-[11px] text-slate-400 mt-2">
                  Transfers your diagnostic data straight to our emergency WhatsApp desk.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 && step < 7 ? (
            <button
              onClick={handleBack}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-200 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 6 && (
            <button
              onClick={handleNext}
              className="px-7 py-3 rounded-full bg-[#031F5E] hover:bg-[#1693d9] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ml-auto"
            >
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          )}

          {step === 6 && (
            <button
              onClick={handleNext}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white text-xs sm:text-sm font-black flex items-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer ml-auto"
            >
              <span>Submit & Review Assessment</span>
              <FileCheck size={18} />
            </button>
          )}

          {step === 7 && (
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-200 text-xs sm:text-sm font-bold transition-all cursor-pointer mx-auto"
            >
              Done & Close Diagnostic
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

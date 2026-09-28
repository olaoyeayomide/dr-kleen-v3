import { ArrowRight, Award, ShieldCheck, Sparkles } from "lucide-react";
import { teamMembers } from "../data/mockData";

interface TeamSectionProps {
  onMeetTeam: () => void;
  onOpenBooking: (serviceName?: string) => void;
}

export function TeamSection({ onMeetTeam, onOpenBooking }: TeamSectionProps) {
  return (
    <section
      id="team"
      className="py-20 lg:py-28 bg-[#fafcff] border-t border-slate-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-14">
          {/* Left Title */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={13} className="text-[#1693d9]" />
              <span>14. Vetted Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#031F5E] tracking-tight leading-tight">
              The People{" "}
              <span className="text-[#1693d9]">Behind the Clean</span>
            </h2>
          </div>

          {/* Right Subtitle & Action Link */}
          <div className="lg:col-span-6 space-y-2 lg:pl-8">
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl">
              Cleanliness is only as reliable as the hands executing it. Our
              field managers, licensed entomologists, and QA directors undergo
              rigorous background checks and continuous chemical safety
              re-certification.
            </p>
            <div>
              <button
                onClick={onMeetTeam}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#1693d9] hover:text-[#031F5E] transition-colors cursor-pointer group pt-1"
              >
                <span>Meet the Team & Leadership</span>
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Key People Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              id={`team-member-${member.id}`}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group"
            >
              {/* Member Photo */}
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter contrast-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Department pill at top */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-sky-200 text-[10px] font-bold tracking-wider uppercase border border-white/10">
                  {member.department}
                </div>

                {/* Experience pill at bottom right */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-extrabold shadow-sm">
                  {member.experience}
                </div>
              </div>

              {/* Bio & Role */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-extrabold text-[#031F5E] group-hover:text-[#1693d9] transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs font-bold text-sky-700 mt-0.5 mb-2">
                    {member.role}
                  </p>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={13} className="text-emerald-500" />
                    Verified Specialist
                  </span>
                  <button
                    onClick={() =>
                      onOpenBooking(`Request Specialist - ${member.name}`)
                    }
                    className="text-[#1693d9] font-bold hover:underline cursor-pointer"
                  >
                    Request Lead
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

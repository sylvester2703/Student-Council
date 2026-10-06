"use client";

import React from "react";
import { Building2, Sparkles, Trophy, ShieldCheck } from "lucide-react";
import { COUNCIL_CONFIG } from "@/config/councilConfig";

export default function InstitutionalPillarsSection() {
  const pillars = [
    {
      icon: Building2,
      stat: "9+",
      label: "Academic Departments",
      detail: "AI & DS, AI & ML, Comp, IT, E&TC, Elect, Mech, MCA & MBA",
      color: "from-blue-600 to-indigo-600",
      accent: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      icon: Sparkles,
      stat: "Flagship",
      label: "Tech, Cultural & Sports Fests",
      detail: "M-Pulse National Symposium, Spandan & Shaurya Olympiad",
      color: "from-rose-600 to-amber-600",
      accent: "text-rose-600 bg-rose-50 border-rose-200",
    },
    {
      icon: Trophy,
      stat: "20+",
      label: "Active Clubs & Chapters",
      detail: "CoDE Club, IEEE, CSI, ACM, Purushottam Drama Troupe & NSS",
      color: "from-emerald-600 to-teal-600",
      accent: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      icon: ShieldCheck,
      stat: "100%",
      label: "Student-Driven Governance",
      detail: "Zero-PII Anonymous Problem Shield & Transparent Representation",
      color: "from-amber-600 to-red-600",
      accent: "text-amber-700 bg-amber-50 border-amber-200",
    },
  ];

  return (
    <section className="py-12 lg:py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-red-800 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            Institutional Pillars &amp; Legacy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-heading tracking-tight">
            The Bedrock of PES MCOE Campus Life
          </h2>
          <p className="text-sm text-slate-700 mt-2">
            Established under Progressive Education Society (est. 1934), the Students’ Council acts as the central executive organ uniting students and faculty.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="relative p-5 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-slate-300 transition-all hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl border ${pillar.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                    {pillar.stat}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-red-800 transition-colors">
                  {pillar.label}
                </h3>
                <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                  {pillar.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Departments Represented Horizontal Strip */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-center lg:text-left">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Uniting 9 Academic Departments
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                Each department is represented by an elected Departmental Representative (DR) in the Council.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-2xl">
              {COUNCIL_CONFIG.departments.map((dept) => (
                <span
                  key={dept.code}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/60 transition-colors"
                  title={dept.name}
                >
                  {dept.short}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

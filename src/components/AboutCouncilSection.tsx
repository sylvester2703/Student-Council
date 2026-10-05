"use client";

import React from "react";
import {
  Shield,
  Users,
  Award,
  Sparkles,
  Building2,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  HeartHandshake,
  GraduationCap,
} from "lucide-react";
import { EVENT_CONFIG } from "@/config/eventConfig";

interface AboutCouncilSectionProps {
  onOpenEvents: () => void;
  onOpenMembers: () => void;
}

export const AboutCouncilSection: React.FC<AboutCouncilSectionProps> = ({
  onOpenEvents,
  onOpenMembers,
}) => {
  const pillars = [
    {
      title: "Student Advocacy & Governance",
      subtitle: "The Voice of 6,000+ Students",
      description:
        "Serving as the official representative body for undergraduate and postgraduate students across all 10 engineering and management departments.",
      icon: <Shield className="w-6 h-6 text-emerald-700" />,
      color: "bg-emerald-50 border-emerald-200 text-emerald-900",
      accent: "bg-emerald-600",
    },
    {
      title: "Campus Drives & Social Impact",
      subtitle: "Civic Consciousness & Action",
      description:
        "Spearheading high-impact social and sustainability initiatives including Swachh Bharat Week (Oct 7), campus clean drives, and green audits.",
      icon: <Sparkles className="w-6 h-6 text-orange-700" />,
      color: "bg-orange-50 border-orange-200 text-orange-900",
      accent: "bg-orange-600",
    },
    {
      title: "Technical & Cultural Co-ordination",
      subtitle: "Excellence Beyond Academics",
      description:
        "Coordinating inter-departmental symposia, national hackathons, cultural festivals, sports tournaments, and innovation challenges.",
      icon: <Award className="w-6 h-6 text-indigo-700" />,
      color: "bg-indigo-50 border-indigo-200 text-indigo-900",
      accent: "bg-indigo-600",
    },
    {
      title: "Student Welfare & Certification",
      subtitle: "Mentorship & Recognition",
      description:
        "Providing peer guidance, grievance facilitation, event support, and issuing official verified E-Certificates of Participation.",
      icon: <GraduationCap className="w-6 h-6 text-sky-700" />,
      color: "bg-sky-50 border-sky-200 text-sky-900",
      accent: "bg-sky-600",
    },
  ];

  return (
    <section id="about-council" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Building2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>STUDENT GOVERNANCE BODY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
            About the PES MCOE Student Council
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {EVENT_CONFIG.council.tagline}. Dedicated to fostering student leadership, bridging student aspirations with institutional vision, and driving meaningful campus transformation.
          </p>
        </div>

        {/* 4 Impact Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 text-center shadow-2xs hover:shadow-md transition-shadow">
            <span className="block text-3xl sm:text-4xl font-black text-slate-900 font-heading">
              {EVENT_CONFIG.council.studentBodyCount}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1 block">
              Students Represented
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 text-center shadow-2xs hover:shadow-md transition-shadow">
            <span className="block text-3xl sm:text-4xl font-black text-slate-900 font-heading">
              {EVENT_CONFIG.council.departmentsCount}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1 block">
              Academic Departments
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 text-center shadow-2xs hover:shadow-md transition-shadow">
            <span className="block text-3xl sm:text-4xl font-black text-slate-900 font-heading">
              {EVENT_CONFIG.council.committeesCount}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1 block">
              Specialized Committees
            </span>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 sm:p-6 text-center shadow-2xs hover:shadow-md transition-shadow">
            <span className="block text-3xl sm:text-4xl font-black text-emerald-800 font-heading">
              100%
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 mt-1 block">
              Student-Led Initiatives
            </span>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 border shadow-xs hover:shadow-lg transition-all flex flex-col justify-between ${pillar.color}`}
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-2xs border border-slate-200/60 flex items-center justify-center">
                  {pillar.icon}
                </div>

                <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-80 block">
                  {pillar.subtitle}
                </span>

                <h3 className="text-lg font-bold font-heading text-slate-900">
                  {pillar.title}
                </h3>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Vision & Mission Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
                <HeartHandshake className="w-4 h-4" />
                <span>COUNCIL VISION & MISSION</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Empowering Every Student to Lead, Innovate, and Excel
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {EVENT_CONFIG.council.vision}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                type="button"
                onClick={onOpenMembers}
                className="w-full py-3 px-5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer text-center"
              >
                Meet Council Members
              </button>

              <button
                type="button"
                onClick={onOpenEvents}
                className="w-full py-3 px-5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>View Oct 7 Swachh Bharat Week</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

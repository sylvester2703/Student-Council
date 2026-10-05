"use client";

import React from "react";
import { UserPlus, Sparkles, UploadCloud, Trophy, ArrowRight, ShieldCheck, Award, FileText } from "lucide-react";

interface HowItWorksProps {
  onOpenRegister: () => void;
  onOpenSubmit: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onOpenRegister, onOpenSubmit }) => {
  const generalSteps = [
    {
      num: "01",
      title: "REGISTER",
      subtitle: "Get Unique Registration ID",
      desc: "Sign up individually or form a squad (up to 4 students, max 30 entries per event). Enter your details to receive an official Registration ID and digital receipt.",
      icon: <UserPlus className="w-5 h-5 text-emerald-700" />,
      color: "border-emerald-200 bg-emerald-50/50",
    },
    {
      num: "02",
      title: "PARTICIPATE",
      subtitle: "Execute Your Activity",
      desc: "Create your digital poster, record your 90s reel, or explore designated campus zones for the interactive Waste Hunt problem solver.",
      icon: <Sparkles className="w-5 h-5 text-orange-700" />,
      color: "border-orange-200 bg-orange-50/50",
    },
    {
      num: "03",
      title: "SUBMIT",
      subtitle: "Upload Through Portal",
      desc: "Submit your final artwork, MP4 reel, or 5 structured Waste Hunt findings. Our system automatically archives your files into the organizer repository.",
      icon: <UploadCloud className="w-5 h-5 text-sky-700" />,
      color: "border-sky-200 bg-sky-50/50",
    },
    {
      num: "04",
      title: "WIN",
      subtitle: "Evaluation & Trophies",
      desc: "Faculty jury evaluates entries on standardized 100-mark rubrics. Winners and runners-up receive official trophies, certificates, and campus recognition.",
      icon: <Trophy className="w-5 h-5 text-yellow-700" />,
      color: "border-yellow-200 bg-yellow-50/50",
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Four Steps to Campus Impact
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            From squad registration to final jury evaluation, here is how you participate in Swachh Bharat Week 2026.
          </p>
        </div>

        {/* 4-Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {generalSteps.map((step, idx) => (
            <div
              key={idx}
              className={`bg-white border rounded-2xl p-6 shadow-xs relative flex flex-col justify-between hover:shadow-md transition-shadow ${step.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-slate-400">{step.num}</span>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-heading mb-1">{step.title}</h3>
                <h4 className="text-xs font-semibold text-emerald-800 mb-2">{step.subtitle}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout Box */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-8 sm:p-10 text-white text-center shadow-lg relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="inline-block text-xs font-extrabold tracking-widest uppercase text-emerald-200 bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-500/30">
              JOIN THE MOVEMENT
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Ready to Make a Difference?
            </h3>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Choose your challenge. Create something meaningful. Help build a cleaner and more sustainable campus.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="#events"
                className="px-6 py-3 text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer"
              >
                Explore Events
              </a>
              <button
                onClick={onOpenRegister}
                className="px-6 py-3 text-sm font-bold text-white bg-emerald-950/80 hover:bg-emerald-950 border border-emerald-400/40 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer flex items-center gap-2"
              >
                <span>Register Squad Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

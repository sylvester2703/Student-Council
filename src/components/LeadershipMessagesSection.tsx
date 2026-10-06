"use client";

import React, { useState } from "react";
import {
  Quote,
  Shield,
  GraduationCap,
  Award,
  Sparkles,
} from "lucide-react";
import { COUNCIL_CONFIG } from "@/config/councilConfig";

export default function LeadershipMessagesSection() {
  const [activeTab, setActiveTab] = useState<"about" | "principal" | "sdo" | "gs">("about");

  const { principal, sdo, generalSecretary } = COUNCIL_CONFIG.leadershipMessages;

  return (
    <section className="py-14 lg:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Vision &amp; Governance
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 font-heading tracking-tight">
            Leadership Messages &amp; Institutional Vision
          </h2>
          <p className="text-sm text-slate-700 mt-2">
            Guided by institutional patrons and student leadership, fostering academic excellence and holistic development.
          </p>
        </div>

        {/* Tab Selector Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("about")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "about"
                ? "bg-red-800 text-white shadow-md shadow-red-900/20"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>About PES MCOE &amp; Council</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("principal")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "principal"
                ? "bg-red-800 text-white shadow-md shadow-red-900/20"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Principal’s Desk</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sdo")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "sdo"
                ? "bg-red-800 text-white shadow-md shadow-red-900/20"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Staff Advisor / SDO</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("gs")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "gs"
                ? "bg-red-800 text-white shadow-md shadow-red-900/20"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>General Secretary’s Address</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="max-w-4xl mx-auto">
          {/* TAB 1: ABOUT COUNCIL */}
          {activeTab === "about" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-red-800 text-white flex items-center justify-center font-black text-xl shadow-md border border-amber-400">
                  <Shield className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                    The Heritage of PES MCOE &amp; Students’ Council
                  </h3>
                  <p className="text-xs text-slate-700">
                    Parent Society: Progressive Education Society, Pune (Est. 1934)
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-sans">
                <p>
                  Progressive Education Society’s Modern College of Engineering, Pune was established in 1999 with the vision of creating engineering and management graduates capable of meeting global technological benchmarks. Affiliated to Savitribai Phule Pune University (SPPU) and approved by AICTE, PES MCOE is accredited with an NAAC &apos;A+&apos; grade.
                </p>
                <p>
                  The <strong>Students’ Council</strong> acts as the constitutional bridge between the student body, departmental faculty heads, and the college administration. Led by student-elected and merit-appointed office bearers across Technical, Cultural, Sports, Website Operations, and Ladies’ Welfare wings, the Council oversees annual flagship symposiums like <em>M-PULSE</em>, <em>SPANDAN</em>, and <em>SHAURYA</em>.
                </p>
              </div>

              {/* Core Objectives List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-red-800 mt-1.5 shrink-0" />
                  <span className="text-xs text-slate-700 font-medium">
                    Spearhead national technical, cultural &amp; sports festivals.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-red-800 mt-1.5 shrink-0" />
                  <span className="text-xs text-slate-700 font-medium">
                    Maintain 100% Anonymous Student Problem &amp; Grievance Resolution.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-red-800 mt-1.5 shrink-0" />
                  <span className="text-xs text-slate-700 font-medium">
                    Coordinate 20+ departmental clubs, chapters (IEEE, CSI, ACM).
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-red-800 mt-1.5 shrink-0" />
                  <span className="text-xs text-slate-700 font-medium">
                    Facilitate industry sponsorships and inter-collegiate partnerships.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRINCIPAL'S DESK */}
          {activeTab === "principal" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center font-black text-xl shadow-md border border-amber-500/30">
                    <Award className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                      {principal.name}
                    </h3>
                    <p className="text-xs text-red-800 font-semibold">
                      {principal.designation}
                    </p>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-slate-200 shrink-0 hidden sm:block" />
              </div>

              <blockquote className="p-4 rounded-2xl bg-amber-50/70 border-l-4 border-amber-600 text-amber-950 font-serif italic text-sm sm:text-base leading-relaxed">
                &ldquo;{principal.quote}&rdquo;
              </blockquote>

              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                {principal.message}
              </p>
            </div>
          )}

          {/* TAB 3: SDO / STAFF ADVISOR */}
          {activeTab === "sdo" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-blue-400 flex items-center justify-center font-black text-xl shadow-md border border-blue-500/30">
                    <GraduationCap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                      {sdo.name}
                    </h3>
                    <p className="text-xs text-blue-800 font-semibold">
                      {sdo.designation}
                    </p>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-slate-200 shrink-0 hidden sm:block" />
              </div>

              <blockquote className="p-4 rounded-2xl bg-blue-50/70 border-l-4 border-blue-600 text-blue-950 font-serif italic text-sm sm:text-base leading-relaxed">
                &ldquo;{sdo.quote}&rdquo;
              </blockquote>

              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                {sdo.message}
              </p>
            </div>
          )}

          {/* TAB 4: GENERAL SECRETARY */}
          {activeTab === "gs" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-800 text-amber-300 flex items-center justify-center font-black text-xl shadow-md border border-amber-400">
                    <Sparkles className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                      {generalSecretary.name}
                    </h3>
                    <p className="text-xs text-red-800 font-semibold">
                      {generalSecretary.designation}
                    </p>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-slate-200 shrink-0 hidden sm:block" />
              </div>

              <blockquote className="p-4 rounded-2xl bg-rose-50/70 border-l-4 border-rose-600 text-rose-950 font-serif italic text-sm sm:text-base leading-relaxed">
                &ldquo;{generalSecretary.quote}&rdquo;
              </blockquote>

              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                {generalSecretary.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

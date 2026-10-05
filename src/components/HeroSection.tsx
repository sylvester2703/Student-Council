"use client";

import React from "react";
import {
  ArrowRight,
  Shield,
  Sparkles,
  Users,
  ExternalLink,
  UploadCloud,
  Calendar,
  Award,
  CheckCircle2,
  Building2,
  Trophy,
} from "lucide-react";
import { EVENT_CONFIG } from "@/config/eventConfig";
import { CountdownTimer } from "./CountdownTimer";

interface HeroSectionProps {
  onOpenRegister: (eventId?: string) => void;
  onOpenSubmit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRegister, onOpenSubmit }) => {
  return (
    <section id="home" className="relative bg-gradient-to-b from-emerald-50/40 via-white to-white pt-10 pb-16 overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top Badges Bar */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>PES MODERN COLLEGE OF ENGINEERING, PUNE</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
            <Users className="w-3.5 h-3.5 text-slate-600" />
            <span>OFFICIAL STUDENT GOVERNANCE PORTAL</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-10">
          {/* Left: Primary Student Council Heading */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div>
              <div className="inline-flex items-center gap-2.5 bg-white border border-slate-200 shadow-xs px-3.5 py-1.5 rounded-2xl mb-4">
                <img
                  src={EVENT_CONFIG.college.logos.college}
                  alt="PES Modern College of Engineering Logo"
                  className="h-8 w-auto object-contain"
                />
                <div className="text-left border-l border-slate-200 pl-3">
                  <span className="text-[11px] font-extrabold text-slate-900 tracking-wider uppercase block">
                    PES MCOE STUDENT COUNCIL
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">NAAC &lsquo;A+&rsquo; Accredited Institution • Pune</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] font-heading">
                STUDENT <br />
                <span className="text-emerald-700 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 bg-clip-text text-transparent">
                  COUNCIL
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
              &ldquo;{EVENT_CONFIG.council.motto}&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Welcome to the official digital portal of the PES Modern College of Engineering Student Council. We represent the student voice, coordinate inter-collegiate technical & cultural fests, spearhead social impact drives, and facilitate campus development.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#events"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Swachh Bharat Week (Oct 7)</span>
              </a>

              <a
                href="#council-members"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-2xs transition-all active:scale-98 cursor-pointer"
              >
                <Users className="w-4 h-4 text-slate-600" />
                <span>Meet Council Members</span>
              </a>

              <a
                href="#about-council"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <span>About Council</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

            {/* Council Stats Summary */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>6,000+ Students Represented</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>10+ Engineering Departments</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-orange-600" />
                <span>Official Participation Certificates</span>
              </div>
            </div>
          </div>

          {/* Right: Featured Event Spotlight Banner (Oct 7 Swachh Bharat Week) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-lg bg-gradient-to-b from-white to-slate-50 p-6 rounded-3xl border-2 border-emerald-300 shadow-xl space-y-4">
              {/* Event Badge */}
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-orange-100 text-orange-900 border border-orange-200">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>UPCOMING FLAGSHIP INITIATIVE</span>
                </div>

                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Oct 7, 2026
                </span>
              </div>

              {/* Event Title & Emblem */}
              <div className="flex items-start gap-4">
                <img
                  src={EVENT_CONFIG.college.logos.swachhBharat}
                  alt="Swachh Bharat Emblem"
                  className="h-14 w-auto object-contain flex-shrink-0"
                />
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading leading-tight">
                    Swachh Bharat Week 2026
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                    Campus Cleanliness & Sustainability Drive
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Organized by the Student Council on <strong>Wednesday, 7th October 2026</strong>. Compete across 3 student challenges with a strict 30-entry limit per event:
              </p>

              {/* 3 Competition Mini-Pills */}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold">
                <div className="bg-white border border-emerald-200 p-2 rounded-xl text-emerald-900 shadow-2xs">
                  01. Poster
                </div>
                <div className="bg-white border border-orange-200 p-2 rounded-xl text-orange-900 shadow-2xs">
                  02. Reel
                </div>
                <div className="bg-white border border-sky-200 p-2 rounded-xl text-sky-900 shadow-2xs">
                  03. Waste Hunt
                </div>
              </div>

              {/* Action Buttons inside Event Spotlight */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => onOpenRegister()}
                  className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer text-center"
                >
                  Register Squad for Oct 7
                </button>

                <a
                  href={EVENT_CONFIG.googleDrive.rootFolderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 text-xs font-bold text-orange-800 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-orange-600" />
                  <span>Submission Drive</span>
                </a>
              </div>

              {/* Countdown Component */}
              <div className="pt-2">
                <CountdownTimer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

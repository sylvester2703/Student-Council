"use client";

import React from "react";
import { ArrowRight, BookOpen, CheckCircle, ShieldCheck, Sparkles, Trophy, Users, ExternalLink, UploadCloud } from "lucide-react";
import { EVENT_CONFIG } from "@/config/eventConfig";
import { CountdownTimer } from "./CountdownTimer";

interface HeroSectionProps {
  onOpenRegister: (eventId?: string) => void;
  onOpenSubmit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRegister, onOpenSubmit }) => {
  return (
    <section id="home" className="relative bg-gradient-to-b from-emerald-50/50 via-white to-white pt-8 pb-14 overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top Badges Bar */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>{EVENT_CONFIG.college.shortName} • STUDENT COUNCIL</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200">
            <Sparkles className="w-3 h-3 text-orange-600" />
            <span>3 Student Competitions</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div>
              {/* Swachh Bharat Official Emblem Showcase */}
              <div className="inline-flex items-center gap-3 bg-white border border-emerald-200 shadow-xs px-3.5 py-1.5 rounded-2xl mb-4">
                <img
                  src={EVENT_CONFIG.college.logos.swachhBharat}
                  alt="Official Swachh Bharat Logo"
                  className="h-10 w-auto object-contain"
                />
                <div className="text-left border-l border-emerald-100 pl-3">
                  <span className="text-[11px] font-extrabold text-emerald-800 tracking-wider uppercase block">
                    SWACHH BHARAT ABHIYAN
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Campus Cleanliness & Sustainability Drive</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] font-heading">
                SWACHH BHARAT <br />
                <span className="text-emerald-700 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
                  WEEK 2026
                </span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
              &ldquo;{EVENT_CONFIG.event.tagline}&rdquo;
            </p>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {EVENT_CONFIG.event.subheading}
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => onOpenRegister()}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>Register Squad</span>
              </button>

              <a
                href={EVENT_CONFIG.googleDrive.rootFolderUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-orange-800 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl shadow-2xs transition-all active:scale-98"
                title="Directly upload files into the official Google Drive folder"
              >
                <UploadCloud className="w-4 h-4 text-orange-600" />
                <span>Upload to Google Drive</span>
                <ExternalLink className="w-3.5 h-3.5 text-orange-500" />
              </a>

              <a
                href="#events"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all"
              >
                <span>View 3 Events</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Certificates for All Participants</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-orange-600" />
                <span>Trophies & Awards</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Official MCOE Event</span>
              </div>
            </div>

            {/* Embedded Live Countdown */}
            <div className="pt-2">
              <CountdownTimer />
            </div>
          </div>

          {/* Right Hero Visual / Campus Segregation Infographic */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-lg bg-white p-4 rounded-3xl border border-slate-200 shadow-md">
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                <img
                  src="/images/hero-swachh-bharat.svg"
                  alt="PES Modern College of Engineering Swachh Bharat Campus Sustainability"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Institution Identity Banner beneath image */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="font-semibold text-slate-800">PES Modern College of Engg, Pune</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500">Oct 15–20, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

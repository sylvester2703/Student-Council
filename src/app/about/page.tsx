import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileQuickBar from "@/components/MobileQuickBar";
import {
  Shield,
  Award,
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Users,
  Target,
  Quote,
  Building,
  ArrowRight,
} from "lucide-react";
import { COUNCIL_CONFIG } from "@/config/councilConfig";
import { getSiteSettings } from "@/lib/storage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Students’ Council | PES’s Modern College of Engineering, Pune",
  description:
    "Discover the vision, constitution, executive structure, and leadership desks of PES MCOE Students’ Council, Shivajinagar, Pune.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const { principal, sdo, generalSecretary } = COUNCIL_CONFIG.leadershipMessages;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-red-100 selection:text-red-900 pb-16 lg:pb-0">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* HERO BANNER */}
        <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-14 lg:py-20 px-4 border-b border-slate-800 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-3.5 py-1 rounded-full border border-amber-400/30">
              Institutional Heritage &amp; Governance
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-white font-heading">
              About PES MCOE Students’ Council
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Serving as the bridge between 5,000+ students, esteemed faculty advisors, and college administration across 9 engineering &amp; management departments.
            </p>
          </div>
        </div>

        {/* SECTION 1: CORE MISSION & VALUES */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-red-800 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                Our Constitutional Role
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                A Legacy of Student Leadership &amp; Innovation
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                Progressive Education Society (PES), established in 1934 by visionary educationist late Guruvarya Shankar Rao Kanitkar, stands as one of Maharashtra’s premier educational societies. PES’s Modern College of Engineering was established in 1999 in the heart of Pune at Shivajinagar.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                The Students’ Council is the statutory student executive body at PES MCOE. Formed under the guidelines of Savitribai Phule Pune University (SPPU) and the Maharashtra Public Universities Act, the Council champions student welfare, academic feedback, cultural vibrancy, technical innovation, and campus discipline.
              </p>

              <div className="pt-3 space-y-2 text-xs text-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Transparent representation across all 9 departments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Execution of National Fest M-Pulse &amp; Spandan Gathering</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Anonymous Student Grievance &amp; Problem Resolution</span>
                </div>
              </div>
            </div>

            {/* Right Metric Box */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white border border-amber-500/30 shadow-2xl space-y-6">
              <h3 className="text-lg font-bold text-amber-300 font-heading border-b border-slate-800 pb-3">
                Key Institutional Benchmarks
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                    1999
                  </span>
                  <p className="text-xs text-slate-400 mt-1">Year Established</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                    &apos;A+&apos;
                  </span>
                  <p className="text-xs text-slate-400 mt-1">NAAC Accreditation</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                    9
                  </span>
                  <p className="text-xs text-slate-400 mt-1">Academic Departments</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    20+
                  </span>
                  <p className="text-xs text-slate-400 mt-1">Clubs &amp; Technical Cells</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                <p>
                  <strong>Affiliation:</strong> Savitribai Phule Pune University (SPPU) • AICTE Approved • Directorate of Technical Education (DTE), Maharashtra.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: EDITORIAL LEADERSHIP DESKS */}
        <div className="bg-slate-50 py-14 lg:py-20 border-t border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Patron &amp; Executive Addresses
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-heading">
                From the Leadership Desks
              </h2>
            </div>

            {/* Principal's Desk */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    {principal.name}
                  </h3>
                  <p className="text-xs text-red-800 font-semibold">
                    {principal.designation}
                  </p>
                </div>
              </div>

              <blockquote className="p-4 rounded-2xl bg-amber-50 text-amber-950 font-serif italic text-sm border-l-4 border-amber-600">
                &ldquo;{principal.quote}&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {principal.message}
              </p>
            </div>

            {/* SDO's Desk */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-blue-400 flex items-center justify-center font-bold">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    {sdo.name}
                  </h3>
                  <p className="text-xs text-blue-800 font-semibold">
                    {sdo.designation}
                  </p>
                </div>
              </div>

              <blockquote className="p-4 rounded-2xl bg-blue-50 text-blue-950 font-serif italic text-sm border-l-4 border-blue-600">
                &ldquo;{sdo.quote}&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {sdo.message}
              </p>
            </div>

            {/* General Secretary's Address */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="w-12 h-12 rounded-2xl bg-red-800 text-amber-300 flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    {generalSecretary.name}
                  </h3>
                  <p className="text-xs text-red-800 font-semibold">
                    {generalSecretary.designation}
                  </p>
                </div>
              </div>

              <blockquote className="p-4 rounded-2xl bg-rose-50 text-rose-950 font-serif italic text-sm border-l-4 border-rose-600">
                &ldquo;{generalSecretary.quote}&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {generalSecretary.message}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: CALL TO ACTION */}
        <div className="max-w-4xl mx-auto px-4 py-14 text-center space-y-4">
          <h3 className="text-2xl font-bold text-slate-900 font-heading">
            Want to meet the office bearers driving these initiatives?
          </h3>
          <p className="text-xs sm:text-sm text-slate-700">
            Explore the complete directory of faculty advisors, core council, portfolio secretaries, and departmental representatives.
          </p>
          <div className="pt-2">
            <a
              href="/team"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs border border-amber-500/30 shadow-lg transition-transform hover:scale-105"
            >
              <span>Explore Council Team Directory</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
      <MobileQuickBar settings={settings} />
    </div>
  );
}

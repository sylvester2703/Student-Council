"use client";

import React from "react";
import {
  Lock,
  ShieldCheck,
  EyeOff,
  KeyRound,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function AnonymousPortalCalloutSection() {
  return (
    <section className="py-14 lg:py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-amber-500/40 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>100% Identity Shield Guarantee</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight leading-tight">
                Got an Academic, Lab or Campus Issue?{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                  Speak Up 100% Anonymously.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Zero personal details collected. No name, no email, no PRN, and zero IP tracking. Submit your concern safely and track the official Council resolution using a secret cryptographic tracking token.
              </p>

              {/* Security Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <EyeOff className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Zero PII / IP Fingerprint Storage</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <KeyRound className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Unique Token Status Lookup</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Escalated Directly to SDO / Principal</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Publicly Published Q&amp;A (Optional)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
                <a
                  href="/anonymous-portal"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  <Lock className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  <span>Submit Anonymous Query / Complaint</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="/anonymous-portal#tracker"
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition-colors"
                >
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <span>Track Existing Token (ANON-MCOE-XXXX)</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Mock Preview Card */}
            <div className="lg:col-span-5">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl relative space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-[11px] font-mono text-slate-400">
                    TOKEN: ANON-MCOE-8492-X7
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    RESOLVED
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase">
                    Sample Resolved Query
                  </span>
                  <p className="text-xs font-semibold text-white">
                    Request for Extended Central Library Reading Room Hours during SPPU Exams
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Official Council Action Taken:
                  </span>
                  <p className="text-slate-300 leading-snug">
                    Principal Dr. K. R. Joshi approved request: Central Library reading halls will remain open until 10:00 PM with campus security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

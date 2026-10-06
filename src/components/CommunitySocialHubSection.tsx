"use client";

import React from "react";
import {
  Radio,
  Instagram,
  Handshake,
  QrCode,
  ArrowRight,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { COUNCIL_CONFIG } from "@/config/councilConfig";
import { SiteSettings } from "@/lib/types";

interface CommunitySocialHubSectionProps {
  settings?: SiteSettings;
}

export default function CommunitySocialHubSection({
  settings,
}: CommunitySocialHubSectionProps) {
  const instagramUrl =
    settings?.instagramUrl || COUNCIL_CONFIG.socials.instagram.url;
  const instagramHandle =
    settings?.instagramHandle || COUNCIL_CONFIG.socials.instagram.handle;
  const whatsappUrl =
    settings?.whatsappChannelUrl || COUNCIL_CONFIG.socials.whatsappChannel.url;

  return (
    <section className="py-14 lg:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-red-800 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            Community &amp; Partnerships
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 font-heading tracking-tight">
            Stay Connected with PES MCOE Council
          </h2>
          <p className="text-sm text-slate-700 mt-2">
            Join thousands of Modernites receiving real-time campus broadcasts, live fest reels, and partnership opportunities.
          </p>
        </div>

        {/* 3 Main Community Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CARD 1: WHATSAPP CHANNEL WITH QR CODE */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white border border-emerald-600/40 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Radio className="w-6 h-6 animate-pulse" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Instant Broadcast
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-heading">
                WhatsApp Channel
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Receive official exam notices, fest schedule drops, and urgent announcements directly to your WhatsApp.
              </p>

              {/* QR Code Mock Box */}
              <div className="my-5 p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
                  <QrCode className="w-full h-full text-slate-900" />
                </div>
                <div className="text-xs text-slate-200">
                  <p className="font-bold text-emerald-300">Scan or Tap to Join</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Official channel for all 9 departments.
                  </p>
                </div>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform group-hover:scale-102 active:scale-98"
            >
              <span>Join Official WhatsApp Channel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* CARD 2: INSTAGRAM COMMUNITY HUB */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-pink-950 via-slate-900 to-purple-950 text-white border border-pink-600/40 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-600/20 border border-pink-500/40 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                  <Instagram className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  {instagramHandle}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-heading">
                Instagram Hub
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Catch high-energy fest trailers, live concert reels, behind-the-scenes council meetings, and student spotlights.
              </p>

              {/* Instagram Feed Highlights */}
              <div className="my-5 p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md space-y-2 text-xs">
                <div className="flex items-center gap-2 text-pink-300">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>M-Pulse 2027 Teaser Drops</span>
                </div>
                <div className="flex items-center gap-2 text-pink-300">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Spandan Cultural Audition Winners</span>
                </div>
                <div className="flex items-center gap-2 text-pink-300">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Shaurya Inter-Dept Match Highlights</span>
                </div>
              </div>
            </div>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:opacity-90 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform group-hover:scale-102 active:scale-98"
            >
              <span>Follow @pesmcoe_studentscouncil</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* CARD 3: SPONSORSHIP & INTER-COLLEGE COLLABORATION */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl flex flex-col justify-between group hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform border border-amber-500/30">
                  <Handshake className="w-6 h-6 text-amber-400" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  Sponsors &amp; Colleges
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Sponsorship &amp; Collaboration
              </h3>
              <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                Connect your brand with 5,000+ enthusiastic engineering and management students at Pune&apos;s prime educational hub.
              </p>

              <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-red-800 shrink-0" />
                  <span>Title &amp; Co-Sponsorship Packages</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-red-800 shrink-0" />
                  <span>Campus Stalls &amp; Tech Hackathon Mentorship</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-red-800 shrink-0" />
                  <span>Inter-Collegiate Fest Contingent Invites</span>
                </div>
              </div>
            </div>

            <a
              href="/student-voice#sponsorship"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors border border-amber-500/30"
            >
              <span>Partner With PES MCOE Council</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

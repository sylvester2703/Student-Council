"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Lock,
  ArrowRight,
  Radio,
  Bell,
  Download,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { InstagramIcon } from "@/components/Icons";
import { COUNCIL_CONFIG } from "@/config/councilConfig";
import { Notice, SiteSettings } from "@/lib/types";

interface HeroSectionProps {
  settings?: SiteSettings;
  pinnedNotices?: Notice[];
  onOpenNotice?: (notice: Notice) => void;
}

export default function HeroSection({
  settings,
  pinnedNotices = [],
  onOpenNotice,
}: HeroSectionProps) {
  const [activeTickerIndex, setActiveTickerIndex] = useState(0);

  const instagramUrl =
    settings?.instagramUrl || COUNCIL_CONFIG.socials.instagram.url;
  const instagramHandle =
    settings?.instagramHandle || COUNCIL_CONFIG.socials.instagram.handle;
  const whatsappUrl =
    settings?.whatsappChannelUrl || COUNCIL_CONFIG.socials.whatsappChannel.url;

  const currentNotice = pinnedNotices[activeTickerIndex] || pinnedNotices[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800">
      {/* Decorative Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Institutional Pill Badge with Official Crests */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-2xl bg-white p-1 shadow-lg border border-red-800/40 flex items-center justify-center">
              <Image
                src="/logos/pes-mcoe-college-logo.png"
                alt="PES MCOE Crest"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="w-11 h-11 rounded-2xl bg-white p-1 shadow-lg border border-emerald-800/40 flex items-center justify-center">
              <Image
                src="/logos/students-council-logo.png"
                alt="Students Council Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-amber-500/30 text-slate-200 text-xs font-semibold shadow-lg backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 font-bold uppercase tracking-wider text-[11px]">
              OFFICIAL PORTAL
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-200">
              PES’s Modern College of Engineering, Pune
            </span>
          </div>
        </div>

        {/* Main Hero Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-heading">
            Empowering Student Leadership,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-300 to-amber-300">
              Innovation & Campus Culture
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2.5xl mx-auto font-normal leading-relaxed">
            The Official Students’ Council of PES MCOE, Shivajinagar, Pune —
            uniting 9 academic departments, spearheading flagship technical &amp;
            cultural festivals, and championing every student’s voice through
            transparent governance.
          </p>

          {/* Primary Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-white font-bold text-sm shadow-xl shadow-red-950/50 hover:shadow-red-800/30 transition-all hover:-translate-y-0.5 border border-amber-500/30"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Explore Upcoming Events</span>
              <ArrowRight className="w-4 h-4 text-amber-200" />
            </Link>

            <Link
              href="/anonymous-portal"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 hover:text-amber-200 font-bold text-sm border border-amber-500/40 shadow-xl transition-all hover:-translate-y-0.5"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Ask / Report Anonymously 🔒</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-400/20 text-amber-300 font-semibold uppercase">
                Zero PII
              </span>
            </Link>

            <Link
              href="/notices"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white font-medium text-sm border border-slate-700 transition-all hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Brochures & Circulars</span>
            </Link>
          </div>
        </div>

        {/* OFFICIAL BROADCAST CHANNELS STRIP (Crucial Conversion Cards) */}
        <div className="mt-10 lg:mt-14 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* WhatsApp Channel Card */}
          <div className="relative group p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900/90 to-emerald-950/40 border border-emerald-600/40 hover:border-emerald-500 transition-all shadow-xl hover:shadow-emerald-950/30">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Radio className="w-6 h-6 text-emerald-400 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-white font-heading">
                      Join WhatsApp Channel
                    </h3>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase">
                      Official
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Instant fest circulars, round updates & emergency alerts.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-emerald-900/40">
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero spam • 100% verified alerts</span>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-transform group-hover:scale-105 active:scale-95 shadow-md"
              >
                <span>Join Channel ↗</span>
              </a>
            </div>
          </div>

          {/* Instagram Hub Card */}
          <div className="relative group p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-pink-950/40 via-slate-900/90 to-purple-950/40 border border-pink-700/40 hover:border-pink-500 transition-all shadow-xl hover:shadow-pink-950/30">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                  <InstagramIcon className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-white font-heading">
                      Follow on Instagram
                    </h3>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-pink-500/20 text-pink-300 border border-pink-500/30 font-bold uppercase">
                      {instagramHandle}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Live fest reels, stage highlights & behind-the-scenes.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-pink-900/40">
              <div className="flex items-center gap-1.5 text-[11px] text-pink-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tag @pesmcoe_studentscouncil</span>
              </div>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:opacity-95 text-white text-xs font-bold transition-transform group-hover:scale-105 active:scale-95 shadow-md"
              >
                <span>Follow Page ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* LIVE ANNOUNCEMENT TICKER (Below Hero) */}
        {currentNotice && (
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900/80 border border-amber-500/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <span className="px-2 py-0.5 rounded-md bg-red-800 text-amber-300 font-extrabold text-[10px] tracking-wider uppercase flex items-center gap-1 shrink-0">
                  <Bell className="w-3 h-3 text-amber-300 animate-bounce" />
                  PINNED NOTICE
                </span>
                <p className="text-slate-200 font-medium truncate">
                  <span className="text-amber-300 font-semibold mr-1.5">
                    [{currentNotice.refNumber}]
                  </span>
                  {currentNotice.title}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                {pinnedNotices.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTickerIndex(
                        (prev) => (prev + 1) % pinnedNotices.length
                      )
                    }
                    className="text-[11px] text-slate-400 hover:text-slate-200 underline"
                  >
                    Next ({activeTickerIndex + 1}/{pinnedNotices.length})
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onOpenNotice && onOpenNotice(currentNotice)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-semibold transition-colors"
                >
                  <span>View Notice</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

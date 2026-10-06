"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  ArrowRight,
  Sparkles,
  Share2,
  ExternalLink,
  ChevronRight,
  Flame,
} from "lucide-react";
import { CouncilEvent } from "@/lib/types";

interface FeaturedEventsSectionProps {
  events: CouncilEvent[];
  onOpenDetails: (event: CouncilEvent) => void;
  onOpenRegister: (event: CouncilEvent) => void;
}

export default function FeaturedEventsSection({
  events,
  onOpenDetails,
  onOpenRegister,
}: FeaturedEventsSectionProps) {
  // Find nearest upcoming flagship fest for the countdown timer
  const flagship =
    events.find((e) => e.category === "FLAGSHIP" && e.status === "UPCOMING") ||
    events[0];

  // Countdown state
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!flagship?.eventDate) return;

    const targetDate = new Date(`${flagship.eventDate}T09:00:00`).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [flagship?.eventDate]);

  const handleShareWhatsApp = (event: CouncilEvent) => {
    const text = `🔥 *${event.title}* at PES MCOE Pune!\n📅 Date: ${event.eventDate}\n📍 Venue: ${event.venue}\n🏆 Prize Pool: ${event.prizePool}\n\nRegister now on the Official PES MCOE Students' Council Portal:`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${text}\n${window.location.origin}/events?id=${event.id}`
    )}`;
    window.open(url, "_blank");
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "FLAGSHIP":
        return "bg-amber-500/20 text-amber-950 border-amber-500/40";
      case "TECHNICAL":
        return "bg-blue-500/20 text-blue-950 border-blue-500/40";
      case "CULTURAL":
        return "bg-rose-500/20 text-rose-950 border-rose-500/40";
      case "SPORTS":
        return "bg-emerald-500/20 text-emerald-950 border-emerald-500/40";
      case "NSS_SOCIAL":
        return "bg-orange-500/20 text-orange-950 border-orange-500/40";
      default:
        return "bg-purple-500/20 text-purple-950 border-purple-500/40";
    }
  };

  return (
    <section className="py-14 lg:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-800 bg-red-50 px-3 py-1 rounded-full border border-red-200">
              Campus Excitement &amp; Competitions
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 font-heading tracking-tight">
              Flagship Fests &amp; Upcoming Events
            </h2>
            <p className="text-sm text-slate-700 mt-1">
              Participate in national hackathons, cultural showdowns, and sports championships.
            </p>
          </div>

          <a
            href="/events"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 text-xs font-bold transition-all shrink-0 border border-amber-500/30 shadow-sm"
          >
            <span>View All Events Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Live Countdown Banner for Flagship Fest */}
        {flagship && (
          <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 text-white border border-amber-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-red-800/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center lg:text-left max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/60 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>Countdown to Next Flagship Fest</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-heading">
                  {flagship.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                  {flagship.shortDescription}
                </p>
              </div>

              {/* 4-Unit Countdown Timer Block */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex flex-col items-center justify-center w-16 sm:w-20 h-18 sm:h-22 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-inner">
                  <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">
                    Days
                  </span>
                </div>

                <span className="text-amber-400 font-bold text-lg">:</span>

                <div className="flex flex-col items-center justify-center w-16 sm:w-20 h-18 sm:h-22 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-inner">
                  <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">
                    Hours
                  </span>
                </div>

                <span className="text-amber-400 font-bold text-lg">:</span>

                <div className="flex flex-col items-center justify-center w-16 sm:w-20 h-18 sm:h-22 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-inner">
                  <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">
                    Mins
                  </span>
                </div>

                <span className="text-amber-400 font-bold text-lg">:</span>

                <div className="flex flex-col items-center justify-center w-16 sm:w-20 h-18 sm:h-22 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-inner">
                  <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">
                    Secs
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="flex flex-col justify-between rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div>
                {/* Poster Image / Banner */}
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={event.posterUrl}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Badges on poster */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider border backdrop-blur-md ${getCategoryBadgeColor(
                        event.category
                      )}`}
                    >
                      {event.category}
                    </span>

                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow-sm">
                      {event.status}
                    </span>
                  </div>

                  {/* Date & Fee Strip */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="inline-flex items-center gap-1 font-mono font-bold text-amber-300">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.eventDate}
                    </span>
                    <span className="font-semibold px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-slate-200 text-[11px]">
                      {event.entryFee}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <span className="text-[11px] font-bold text-red-800 uppercase tracking-wide">
                    {event.organizingWing}
                  </span>

                  <h3 className="text-base font-bold text-slate-900 font-heading leading-snug group-hover:text-red-800 transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">
                    {event.shortDescription}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Trophy className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="truncate font-semibold text-slate-900">
                        {event.prizePool}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2 border-t border-slate-100 mt-2">
                <button
                  type="button"
                  onClick={() => onOpenDetails(event)}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors text-center"
                >
                  View Details
                </button>

                <button
                  type="button"
                  onClick={() => onOpenRegister(event)}
                  className="py-2.5 px-3 rounded-xl bg-red-800 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-sm text-center"
                >
                  Register Now
                </button>

                <button
                  type="button"
                  onClick={() => handleShareWhatsApp(event)}
                  className="col-span-2 py-1.5 text-[11px] font-medium text-emerald-800 hover:text-emerald-900 flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3 h-3" />
                  <span>Share Event on WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileQuickBar from "@/components/MobileQuickBar";
import EventDetailsModal from "@/components/EventDetailsModal";
import EventRegistrationModal from "@/components/EventRegistrationModal";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Search,
  Filter,
  Share2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Flame,
} from "lucide-react";
import { CouncilEvent, SiteSettings, EventCategory, EventStatus } from "@/lib/types";

interface EventsClientPageProps {
  initialEvents: CouncilEvent[];
  initialSettings: SiteSettings;
}

export default function EventsClientPage({
  initialEvents,
  initialSettings,
}: EventsClientPageProps) {
  const [events] = useState<CouncilEvent[]>(initialEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  const [selectedEvent, setSelectedEvent] = useState<CouncilEvent | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const categories = [
    { label: "All Categories", value: "ALL" },
    { label: "Flagship Fests", value: "FLAGSHIP" },
    { label: "Technical & Hacks", value: "TECHNICAL" },
    { label: "Cultural & Arts", value: "CULTURAL" },
    { label: "Sports & Fitness", value: "SPORTS" },
    { label: "Social & NSS", value: "NSS_SOCIAL" },
  ];

  const statuses = [
    { label: "All Statuses", value: "ALL" },
    { label: "Upcoming & Open", value: "UPCOMING" },
    { label: "Ongoing", value: "ONGOING" },
    { label: "Past Archive", value: "COMPLETED" },
  ];

  const filteredEvents = events.filter((e) => {
    const matchesCategory =
      selectedCategory === "ALL" || e.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "ALL" || e.status === selectedStatus;
    const matchesSearch =
      searchQuery === "" ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.organizingWing.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleShareWhatsApp = (event: CouncilEvent) => {
    const text = `🔥 *${event.title}* at PES MCOE Pune!\n📅 Date: ${event.eventDate} (${event.time})\n📍 Venue: ${event.venue}\n🏆 Prize Pool: ${event.prizePool}\n\nRegister now on the Official PES MCOE Students' Council Portal:`;
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
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-red-100 selection:text-red-900 pb-16 lg:pb-0">
      <Navbar settings={initialSettings} />

      <main className="flex-1">
        {/* HERO BANNER */}
        <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-12 lg:py-16 px-4 border-b border-slate-800 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-3.5 py-1 rounded-full border border-amber-400/30">
              Campus Calendar &amp; Competitions
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-heading">
              Events, Flagship Fests &amp; Hackathons
            </h1>
            <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto">
              Explore national-level symposiums, inter-collegiate cultural gathering Spandan, and sporting championships at PES MCOE Pune.
            </p>
          </div>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Search Bar */}
              <div className="md:col-span-6 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search events by title, track, wing, venue..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none bg-white"
                />
              </div>

              {/* Status Filter */}
              <div className="md:col-span-3">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:border-red-800 outline-none"
                >
                  {statuses.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Result Count */}
              <div className="md:col-span-3 text-right text-xs text-slate-700 font-semibold">
                Showing {filteredEvents.length} Event{filteredEvents.length === 1 ? "" : "s"}
              </div>
            </div>

            {/* Category Pills Strip */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat.value
                      ? "bg-red-800 text-white shadow-sm"
                      : "bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* EVENTS GRID */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {filteredEvents.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                No events found matching your filters
              </h3>
              <p className="text-xs text-slate-500">
                Try resetting your search query or choosing &quot;All Categories&quot;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col justify-between rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                >
                  <div>
                    {/* Poster Banner */}
                    <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                      <img
                        src={event.posterUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                      {/* Top Badges */}
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

                      {/* Date & Fee */}
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

                    {/* Content */}
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

                  {/* Actions */}
                  <div className="p-5 pt-0 grid grid-cols-2 gap-2 border-t border-slate-100 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsDetailsOpen(true);
                      }}
                      className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors text-center"
                    >
                      View Details
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsRegisterOpen(true);
                      }}
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
          )}
        </div>
      </main>

      <Footer settings={initialSettings} />
      <MobileQuickBar settings={initialSettings} />

      {/* Modals */}
      <EventDetailsModal
        event={selectedEvent}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onRegister={(e) => {
          setSelectedEvent(e);
          setIsRegisterOpen(true);
        }}
        settings={initialSettings}
      />

      <EventRegistrationModal
        event={selectedEvent}
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}

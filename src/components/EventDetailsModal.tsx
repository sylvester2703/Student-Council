"use client";

import React from "react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  FileText,
  Phone,
  Radio,
  Share2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Download,
} from "lucide-react";
import { InstagramIcon } from "@/components/Icons";
import { CouncilEvent, SiteSettings } from "@/lib/types";
import { COUNCIL_CONFIG } from "@/config/councilConfig";

interface EventDetailsModalProps {
  event: CouncilEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister: (event: CouncilEvent) => void;
  settings?: SiteSettings;
}

export default function EventDetailsModal({
  event,
  isOpen,
  onClose,
  onRegister,
  settings,
}: EventDetailsModalProps) {
  if (!isOpen || !event) return null;

  const instagramUrl =
    settings?.instagramUrl || COUNCIL_CONFIG.socials.instagram.url;
  const whatsappUrl =
    settings?.whatsappChannelUrl || COUNCIL_CONFIG.socials.whatsappChannel.url;

  const handleShare = () => {
    const text = `🔥 Check out *${event.title}* at PES MCOE Pune!\n📅 Date: ${event.eventDate} (${event.time})\n📍 Venue: ${event.venue}\n🏆 Prize Pool: ${event.prizePool}\n\nRegister on the Official Students' Council Portal:`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${text}\n${window.location.origin}/events?slug=${event.slug}`
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl my-8 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Modal Header Poster */}
        <div className="relative h-48 sm:h-60 w-full bg-slate-900 shrink-0">
          <img
            src={event.posterUrl}
            alt={event.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on banner */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-800 text-white shadow-md border border-amber-400/40">
              {event.category}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-md">
              {event.status}
            </span>
          </div>

          {/* Bottom Title on Banner */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
              {event.organizingWing}
            </span>
            <h2 className="text-lg sm:text-2xl font-black font-heading leading-tight mt-0.5 text-white drop-shadow">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-800 text-sm">
          {/* Key Facts Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                <Calendar className="w-3 h-3 text-red-800" /> Date
              </span>
              <span className="font-bold text-slate-900 mt-0.5 font-mono">
                {event.eventDate}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3 text-blue-600" /> Time
              </span>
              <span className="font-bold text-slate-900 mt-0.5">
                {event.time}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-600" /> Venue
              </span>
              <span className="font-bold text-slate-900 mt-0.5 truncate">
                {event.venue}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                <Trophy className="w-3 h-3 text-emerald-600" /> Prize Pool
              </span>
              <span className="font-bold text-emerald-700 mt-0.5 truncate">
                {event.prizePool}
              </span>
            </div>
          </div>

          {/* Eligibility & Entry Fee Alert */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>Eligibility:</strong> {event.eligibility}
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-amber-200/80 text-amber-900 font-bold">
              Entry: {event.entryFee}
            </span>
          </div>

          {/* Full Description */}
          <div className="space-y-2">
            <h3 className="font-bold text-base text-slate-900 font-heading">
              About the Event
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {event.fullDescription || event.shortDescription}
            </p>
          </div>

          {/* Schedule / Timeline */}
          {event.schedule && event.schedule.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-base text-slate-900 font-heading">
                Event Schedule &amp; Timeline
              </h3>
              <div className="space-y-2">
                {event.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs"
                  >
                    <span className="font-mono font-bold text-red-800 shrink-0">
                      {item.time}
                    </span>
                    <span className="font-semibold text-slate-900 sm:text-right">
                      {item.activity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rules & Guidelines */}
          {event.rules && event.rules.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-bold text-base text-slate-900 font-heading">
                Rules &amp; Regulations
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Student Coordinator Contact & Social Follow Strip */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  Event Student Coordinator
                </span>
                <p className="text-xs font-bold text-white mt-0.5">
                  {event.coordinatorName}
                </p>
              </div>

              <a
                href={`tel:${event.coordinatorPhone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{event.coordinatorPhone}</span>
              </a>
            </div>

            {/* Social Broadcast Channels Reminder */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
              <span className="text-slate-400 text-[11px]">
                Stay updated on rounds &amp; results:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-[11px] font-semibold border border-emerald-700/40"
                >
                  <Radio className="w-3 h-3 text-emerald-400" />
                  <span>WhatsApp Updates</span>
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-pink-950 hover:bg-pink-900 text-pink-300 text-[11px] font-semibold border border-pink-700/40"
                >
                  <InstagramIcon className="w-3 h-3 text-pink-400" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share on WhatsApp</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
            >
              Close
            </button>

            {event.registrationOpen ? (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRegister(event);
                }}
                className="px-5 py-2 rounded-xl bg-red-800 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-900/20 transition-all hover:scale-105 active:scale-95"
              >
                Register for Event Now
              </button>
            ) : (
              <span className="px-4 py-2 rounded-xl bg-slate-300 text-slate-600 font-bold text-xs cursor-not-allowed">
                Registrations Closed
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

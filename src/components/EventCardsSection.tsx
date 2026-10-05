"use client";

import React, { useState } from "react";
import { Palette, Video, Trash2, Brush, Sparkles, Users, Clock, ArrowRight, ExternalLink, Info, Award, FileSpreadsheet, AlertCircle } from "lucide-react";
import { EVENT_CONFIG, EventDetail } from "@/config/eventConfig";
import { EventDetailsModal } from "./EventDetailsModal";

interface EventCardsSectionProps {
  onOpenRegister: (eventId?: string) => void;
  onOpenSubmit: (eventId?: string) => void;
}

export const EventCardsSection: React.FC<EventCardsSectionProps> = ({ onOpenRegister, onOpenSubmit }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);

  const getEventIcon = (iconName: string) => {
    switch (iconName) {
      case "Palette":
        return <Palette className="w-6 h-6 text-emerald-700" />;
      case "Video":
        return <Video className="w-6 h-6 text-orange-700" />;
      case "Trash2":
        return <Trash2 className="w-6 h-6 text-sky-700" />;
      case "Brush":
        return <Brush className="w-6 h-6 text-amber-700" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-teal-700" />;
      default:
        return <Palette className="w-6 h-6 text-emerald-700" />;
    }
  };

  return (
    <section id="events" className="py-16 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            <span>STRICT LIMIT: 30 ENTRIES PER ACTIVITY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Five Student Competitions
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Choose your activity. Every student team receives an official <strong>Certificate of Participation</strong> from the PES Modern College of Engineering Student Council.
          </p>
        </div>

        {/* 5 Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENT_CONFIG.events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between group hover:border-emerald-300"
            >
              <div>
                {/* Card Top: Number & Category Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
                    {getEventIcon(event.iconName)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-extrabold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      {event.number}
                    </span>
                    <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      30 SLOTS MAX
                    </span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors font-heading mb-1">
                  {event.title}
                </h3>
                <p className="text-xs font-semibold text-emerald-800 mb-3">{event.tagline}</p>

                {event.theme && (
                  <p className="text-xs text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    Theme: <span className="font-semibold text-slate-700">{event.theme}</span>
                  </p>
                )}

                {/* Specs */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 py-3 border-t border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>Team: <strong className="text-slate-800">{event.teamSize}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{event.duration}</span>
                  </div>
                </div>

                {/* Certificate Tag */}
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50/80 px-2.5 py-1.5 rounded-lg border border-emerald-100 mb-4 font-medium">
                  <Award className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Participation Certificate for all teams</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="w-full py-2.5 px-4 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Details & Rubrics</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onOpenRegister(event.id)}
                    className="py-2.5 px-3 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-xs cursor-pointer text-center"
                  >
                    Register Squad
                  </button>

                  <a
                    href={EVENT_CONFIG.googleDrive.rootFolderUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 text-xs font-bold text-orange-800 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl transition-colors cursor-pointer text-center flex items-center justify-center gap-1"
                  >
                    <span>Google Drive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      <EventDetailsModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onRegister={(eventId) => {
          setSelectedEvent(null);
          onOpenRegister(eventId);
        }}
        onSubmit={(eventId) => {
          setSelectedEvent(null);
          onOpenSubmit(eventId);
        }}
      />
    </section>
  );
};

"use client";

import React from "react";
import { X, Users, Clock, MapPin, FileCheck, Award, AlertTriangle, CheckCircle2, Send, ArrowRight, ExternalLink, UploadCloud } from "lucide-react";
import { EVENT_CONFIG, EventDetail } from "@/config/eventConfig";

interface EventDetailsModalProps {
  event: EventDetail | null;
  onClose: () => void;
  onRegister: (eventId: string) => void;
  onSubmit: (eventId: string) => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  onClose,
  onRegister,
  onSubmit,
}) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-1.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              EVENT {event.number}
            </span>
            {event.theme && (
              <span className="text-xs text-slate-300">
                Theme: <strong className="text-white">{event.theme}</strong>
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">{event.title}</h2>
          <p className="text-sm text-slate-300 mt-1">{event.tagline}</p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 pt-4 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Team Size</span>
                <span className="font-semibold text-white">{event.teamSize}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Duration</span>
                <span className="font-semibold text-white">{event.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Venue</span>
                <span className="font-semibold text-white truncate">{event.venue}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Format</span>
                <span className="font-semibold text-white truncate">{event.submissionFormat}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Concept / Headline */}
          {event.concept && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">Activity Concept</h4>
              <p className="text-sm text-emerald-950 leading-relaxed">{event.concept}</p>
            </div>
          )}

          {/* Waste Hunt Disqualification & Prohibited Areas Warning */}
          {event.id === "waste-hunt" && (
            <div className="space-y-4">
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-red-800">
                      CRITICAL DISQUALIFICATION CLAUSE
                    </h4>
                    <p className="text-xs text-red-900 font-medium leading-relaxed">
                      {event.disqualificationWarning}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                  STRICTLY PROHIBITED CAMPUS AREAS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                  {event.prohibitedAreas?.map((area, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Official Rules */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Official Event Rules</span>
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {event.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="font-mono text-xs font-bold text-slate-400 mt-0.5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-snug">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Judging Criteria Rubric */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-orange-600" />
                <span>Evaluation Rubrics</span>
              </h3>
              <span className="text-xs font-extrabold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                Total: 100 Marks
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {event.judgingCriteria.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80"
                >
                  <span className="text-xs font-semibold text-slate-800">{item.label}</span>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                    {item.marks} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
          <a
            href={EVENT_CONFIG.googleDrive.rootFolderUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-orange-700 hover:text-orange-900 inline-flex items-center gap-1.5 bg-white border border-orange-200 px-3.5 py-2 rounded-xl"
          >
            <UploadCloud className="w-4 h-4 text-orange-600" />
            <span>Open Google Drive Folder</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onRegister(event.id);
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <span>Register for this Event</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

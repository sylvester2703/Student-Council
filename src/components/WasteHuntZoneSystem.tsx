"use client";

import React, { useState } from "react";
import { MapPin, AlertOctagon, CheckCircle2, ShieldAlert, Camera, Lightbulb, Compass, ChevronRight, Eye } from "lucide-react";
import { EVENT_CONFIG, WasteHuntZone } from "@/config/eventConfig";

interface WasteHuntZoneSystemProps {
  onOpenRegister: (eventId: string) => void;
  onOpenSubmit: (eventId: string) => void;
}

export const WasteHuntZoneSystem: React.FC<WasteHuntZoneSystemProps> = ({ onOpenRegister, onOpenSubmit }) => {
  const [activeZone, setActiveZone] = useState<WasteHuntZone>(EVENT_CONFIG.wasteHuntZones[0]);

  const prohibitedAreas = [
    "Mechanical Workshop",
    "Pegasus Room",
    "Administration Section",
    "Staff Rooms",
    "Faculty Offices",
    "Classrooms with Ongoing Lectures",
    "Laboratories & Research Wings",
    "Examination Halls & Control Rooms",
    "Substations & Electrical Panels",
    "Any Prohibited/Locked Area",
  ];

  const steps = [
    { num: "01", title: "IDENTIFY", desc: "Spot a genuine waste-management, segregation, or drainage bottleneck in permitted campus zones." },
    { num: "02", title: "PHOTOGRAPH", desc: "Take clear photographic evidence showing context and exact location." },
    { num: "03", title: "ANALYSE", desc: "Investigate root cause: human behavior, bin placement, lack of signage, or disposal lag." },
    { num: "04", title: "SOLVE", desc: "Formulate an actionable, cost-effective engineering or operational remedy." },
    { num: "05", title: "SUBMIT", desc: "Upload up to 5 structured findings through the portal with your Registration ID." },
  ];

  return (
    <section id="waste-hunt-zones" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
            <Compass className="w-3.5 h-3.5" />
            <span>CAMPUS INVESTIGATION FRAMEWORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Waste Hunt Campus Zones & Protocol
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            &ldquo;Find the Problem. Understand It. Solve It.&rdquo; Explore approved campus zones to diagnose real environmental bottlenecks and propose viable engineering solutions.
          </p>
        </div>

        {/* 5-Step Finding Protocol Roadmap */}
        <div className="mb-14">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center mb-6">
            THE 5-STEP WASTE HUNT WORKFLOW
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 relative overflow-hidden group hover:border-sky-300 hover:bg-sky-50/40 transition-colors"
              >
                <div className="text-2xl font-black text-sky-600/30 group-hover:text-sky-600/60 font-mono transition-colors">
                  {s.num}
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-1 mb-1 font-heading">{s.title}</h4>
                <p className="text-xs text-slate-600 leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prohibited Areas Warning Card - HIGH VISIBILITY */}
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 mb-12 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-red-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-300 flex items-center justify-center text-red-700 flex-shrink-0">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-red-900 tracking-tight">
                  STRICTLY PROHIBITED CAMPUS AREAS
                </h3>
                <p className="text-xs text-red-700 font-medium">
                  Entry into these zones is strictly forbidden. Any violation results in immediate disqualification.
                </p>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-bold bg-red-200/80 text-red-900 border border-red-300">
              DISQUALIFICATION RISK
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-4">
            {prohibitedAreas.map((area, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-white/90 border border-red-200 px-3 py-2 rounded-lg text-xs font-semibold text-red-950 shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0"></span>
                <span className="truncate">{area}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-red-200/80 flex items-start gap-2 text-xs text-red-900 font-medium">
            <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Zero-Tolerance on Staged Waste:</strong> Participants MUST NOT intentionally drop, toss, or create waste to take photos. Staging problems results in disciplinary referral.
            </span>
          </div>
        </div>

        {/* Permitted Zone Explorer Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Zone Selector Buttons (Left) */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1 mb-2">
              Approved Campus Zones (Configurable)
            </span>
            {EVENT_CONFIG.wasteHuntZones.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                  activeZone.id === zone.id
                    ? "bg-sky-50 border-sky-400 text-sky-950 shadow-xs"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-xs font-extrabold px-2 py-1 rounded-md ${
                      activeZone.id === zone.id ? "bg-sky-700 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {zone.code}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold leading-tight font-heading">{zone.name}</h4>
                    <span className="text-[11px] text-slate-500">{zone.status === "ACTIVE" ? "Permitted" : "Restricted"}</span>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    activeZone.id === zone.id ? "text-sky-700 translate-x-1" : "text-slate-300"
                  }`}
                />
              </button>
            ))}

            <div className="pt-4">
              <button
                onClick={() => onOpenRegister("waste-hunt")}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Register Squad for Waste Hunt</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Zone Detail View (Right) */}
          <div className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                    {activeZone.code}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    APPROVED RECON ZONE
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 font-heading">
                  {activeZone.name}
                </h3>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Zone Scope</h4>
              <p className="text-sm text-slate-700 leading-relaxed">{activeZone.description}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Key Investigation Focus Points
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeZone.permittedHighlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-amber-900">Safety & Conduct Rule</h5>
                <p className="text-xs text-amber-900 font-medium mt-0.5">{activeZone.safetyNotes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

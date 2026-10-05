"use client";

import React, { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  Scale,
  FileText,
  Search,
  Users,
  Award,
} from "lucide-react";
import { EVENT_CONFIG } from "@/config/eventConfig";

interface RuleCategory {
  id: string;
  title: string;
  badge: string;
  content: string[];
  alertNote?: string;
  isWarning?: boolean;
}

export const RulebookSection: React.FC = () => {
  const [openSectionId, setOpenSectionId] = useState<string>("general");
  const [searchTerm, setSearchTerm] = useState("");

  const ruleCategories: RuleCategory[] = [
    {
      id: "general",
      title: "1. General Rules & Eligibility",
      badge: "Eligibility",
      content: [
        "Swachh Bharat Week 2026 is exclusively open to all currently enrolled undergraduate and postgraduate students of PES Modern College of Engineering across all departments (FE, SE, TE, BE, MCA, MBA).",
        "Participants must possess a valid college identity card and active roll number.",
        "Students may register for multiple events as long as schedules do not conflict; however, each event requires a separate registration and unique Registration ID.",
        "Each competition has a strict ceiling of 30 squad entries to ensure rigorous evaluation.",
        "All events are non-commercial and organized in full alignment with the Government of India's Swachh Bharat Mission.",
      ],
    },
    {
      id: "registration",
      title: "2. Registration & Team Composition",
      badge: "Squad Rules",
      content: [
        "Registrations must be completed online through this official portal before the stipulated registration deadline or slot fill.",
        "Poster Making: 1–2 students per squad.",
        "Reel Making: 1–3 students per squad.",
        "Waste Hunt: 2–4 students per squad (Cross-department squads permitted).",
        "The person completing the registration shall be designated as the Team Leader and primary contact.",
      ],
    },
    {
      id: "waste-hunt-rules",
      title: "3. Waste Hunt Rules & Prohibited Campus Areas",
      badge: "Strict Zones",
      isWarning: true,
      alertNote:
        "CRITICAL DISQUALIFICATION: Participants MUST NOT intentionally drop, toss, or create waste to take staged photos. Staging waste will result in immediate disqualification and reporting to the disciplinary committee.",
      content: [
        "Teams must only navigate permitted campus zones (Zone A to Zone E).",
        "STRICTLY PROHIBITED AREAS: Mechanical Workshop, Pegasus Room, Administration Section, Staff Rooms, Faculty Offices, active lecture classrooms, Laboratories, and Examination halls.",
        "Do not disturb ongoing lectures, practical sessions, faculty meetings, or office administration.",
        "Each team may document a maximum of 5 verified campus problem findings.",
        "Each finding must include: Title, Photographic Evidence, Specific Location, Root Cause Analysis, and Practical Actionable Solution.",
      ],
    },
    {
      id: "poster-rules",
      title: "4. Poster Making Guidelines",
      badge: "Digital / Graphic",
      content: [
        "Theme: 'Swachh Campus, Sustainable Future'.",
        "Poster must be created on the day of the event.",
        "Digital tools such as Canva, Adobe Express, PowerPoint, Photoshop, and Illustrator are allowed.",
        "Work must be 100% original. Pre-existing posters or AI-generated raw prompts without design effort are prohibited.",
        "Format: A4 or A3 portrait recommended. Final submission file must be PNG, JPG, or PDF (Max 15MB).",
      ],
    },
    {
      id: "reel-rules",
      title: "5. Reel Making Guidelines",
      badge: "Video / Audio",
      content: [
        "Theme: 'Swachh Bharat in Motion'.",
        "Reel must be created and edited on the day of the event.",
        "Maximum duration: 90 seconds (recommended vertical 9:16 format).",
        "Submission deadline: strictly 11:59 PM on the same day.",
        "Filming must strictly avoid prohibited zones and must not capture faculty/staff without explicit consent.",
        "No dangerous stunts, high-risk climbing, or disruptive behavior.",
      ],
    },
    {
      id: "disqualification",
      title: "6. Grounds for Disqualification",
      badge: "Zero Tolerance",
      isWarning: true,
      content: [
        ...EVENT_CONFIG.disqualificationRules,
      ],
    },
    {
      id: "judging",
      title: "7. Evaluation, Code of Conduct & Finality",
      badge: "Jury Protocol",
      content: [
        "All submissions will be evaluated by an esteemed faculty judging panel using standardized 100-mark rubrics.",
        "Criteria include Creativity, Theme Relevance, Problem Understanding, Practical Feasibility, and Environmental Impact.",
        "The decision of the judging panel and the Student Council faculty convener shall be final and binding on all participants.",
        "Official results will be authenticated and updated through the secure Jury Admin Desk.",
      ],
    },
  ];

  const toggleSection = (id: string) => {
    setOpenSectionId(openSectionId === id ? "" : id);
  };

  const filteredRules = ruleCategories.filter(
    (cat) =>
      cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.content.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section id="rulebook" className="py-16 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-800 border border-slate-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>OFFICIAL RULEBOOK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Event Rules & Code of Conduct
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Comprehensive guidelines governing eligibility, Waste Hunt boundaries, event specifications, and judging rubrics for Swachh Bharat Week 2026.
          </p>
        </div>

        {/* Search / Filter Bar */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search rules, restricted zones, file formats, or rubrics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-hidden shadow-2xs"
          />
        </div>

        {/* Accordion Categories */}
        <div className="space-y-3">
          {filteredRules.map((category) => {
            const isOpen = openSectionId === category.id;

            return (
              <div
                key={category.id}
                className={`bg-white border rounded-2xl overflow-hidden transition-all shadow-2xs ${
                  category.isWarning
                    ? "border-red-200"
                    : isOpen
                    ? "border-emerald-300"
                    : "border-slate-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleSection(category.id)}
                  className={`w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                    category.isWarning && isOpen
                      ? "bg-red-50/50"
                      : isOpen
                      ? "bg-emerald-50/40"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        category.isWarning
                          ? "bg-red-100 text-red-800 border border-red-200"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {category.badge}
                    </span>
                    <h3
                      className={`text-sm sm:text-base font-bold font-heading ${
                        category.isWarning ? "text-red-950" : "text-slate-900"
                      }`}
                    >
                      {category.title}
                    </h3>
                  </div>

                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-6 pt-2 border-t border-slate-100 space-y-4 text-xs sm:text-sm text-slate-700">
                    {category.alertNote && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 text-xs text-red-900 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>{category.alertNote}</span>
                      </div>
                    )}

                    <ul className="space-y-2.5">
                      {category.content.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Organizer Finality Notice */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-5 text-xs text-slate-600 flex items-start gap-3 shadow-2xs">
          <Scale className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block mb-0.5">Jury & Organizer Authority</span>
            <span>
              The decision of the judging panel and event organizers shall be final and binding. All activities are monitored for campus discipline.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

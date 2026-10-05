"use client";

import React, { useState } from "react";
import { Calendar, Clock, MapPin, CheckCircle, Sparkles, Filter } from "lucide-react";
import { EVENT_CONFIG, ScheduleItem } from "@/config/eventConfig";

export const ScheduleTimeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", "BRIEFING", "EVENT", "DEADLINE", "JUDGING", "VALEDICTORY"];

  const filteredSchedule = EVENT_CONFIG.schedule.filter((item) =>
    selectedCategory === "ALL" ? true : item.category === selectedCategory
  );

  const getCategoryBadge = (cat: ScheduleItem["category"]) => {
    switch (cat) {
      case "BRIEFING":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "EVENT":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "DEADLINE":
        return "bg-red-100 text-red-800 border-red-200";
      case "JUDGING":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "VALEDICTORY":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <section id="schedule" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <Calendar className="w-3.5 h-3.5" />
            <span>EVENT TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Flagship Event Schedule — 7th October 2026
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Plan your event day. All session timings, competition rounds, judging milestones, and valedictory ceremony organized by the Student Council on Wednesday, 7th October 2026.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat === "ALL" ? "All Sessions" : cat}
            </button>
          ))}
        </div>

        {/* Visual Timeline Cards */}
        <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-8">
          {filteredSchedule.map((item, idx) => (
            <div key={item.id} className="relative group">
              {/* Timeline Bullet */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-emerald-600 group-hover:scale-125 transition-transform" />

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                      {item.dayLabel}
                    </span>
                    <span className="text-xs font-bold text-slate-600">{item.dateStr}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryBadge(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-600 flex-shrink-0" />
                    <span className="font-semibold">{item.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-semibold truncate">{item.venue}</span>
                  </div>
                </div>

                {/* Tagged events */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.eventsInvolved.map((ev, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold bg-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md"
                    >
                      {ev}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import {
  Code2,
  Sparkles,
  Trophy,
  Laptop,
  HeartHandshake,
  Users2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { COUNCIL_CONFIG } from "@/config/councilConfig";

export default function CouncilPortfoliosSection() {
  const iconMap: Record<string, React.ElementType> = {
    Code2,
    Sparkles,
    Trophy,
    Laptop,
    HeartHandshake,
    Users2,
  };

  return (
    <section className="py-14 lg:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-red-800 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            Constitutional Wings &amp; Portfolios
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 font-heading tracking-tight">
            Council Portfolios at a Glance
          </h2>
          <p className="text-sm text-slate-700 mt-2">
            Each council wing operates under dedicated secretaries and faculty coordinators to execute student-centric initiatives.
          </p>
        </div>

        {/* Portfolios 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COUNCIL_CONFIG.wings.map((wing) => {
            const Icon = iconMap[wing.icon] || ShieldCheck;

            return (
              <div
                key={wing.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform border border-amber-500/30">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {wing.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-red-800 transition-colors">
                    {wing.name}
                  </h3>

                  <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                    {wing.description}
                  </p>

                  {/* Highlights Pill List */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                    {wing.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-800 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3">
                  <a
                    href="/team"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-800 hover:text-red-900 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Meet the {wing.name} Office Bearers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

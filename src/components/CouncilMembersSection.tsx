"use client";

import React, { useState } from "react";
import { Users, Shield, Award, Mail, Phone, ExternalLink, Sparkles, Building2, Code, Megaphone, Compass } from "lucide-react";
import { EVENT_CONFIG } from "@/config/eventConfig";
import { CouncilMember } from "@/lib/types";

export const CouncilMembersSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ALL" | "LEADERSHIP" | "TECHNICAL" | "COORDINATORS">("ALL");

  const filteredMembers = EVENT_CONFIG.councilMembers.filter((m) => {
    if (activeTab === "LEADERSHIP") return m.category === "PATRON" || m.category === "FACULTY" || m.category === "EXECUTIVE";
    if (activeTab === "TECHNICAL") return m.category === "TECHNICAL";
    if (activeTab === "COORDINATORS") return m.category === "EVENT_LEAD" || m.category === "CORE";
    return true;
  });

  return (
    <section id="council-members" className="py-20 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-emerald-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5 text-emerald-700" />
            <span>ORGANIZING COMMITTEE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-heading text-slate-900">
            Student Council Team & Leadership
          </h2>

          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Meet the faculty mentors and student council office bearers of PES Modern College of Engineering organizing Swachh Bharat Week 2026.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { key: "ALL", label: "All Council Members" },
            { key: "LEADERSHIP", label: "Executive Leadership" },
            { key: "TECHNICAL", label: "Technical & Portal Team" },
            { key: "COORDINATORS", label: "Event In-charges & Leads" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.key
                  ? "bg-emerald-800 text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md tracking-wider ${
                      member.category === "PATRON"
                        ? "bg-purple-100 text-purple-900 border border-purple-200"
                        : member.category === "FACULTY"
                        ? "bg-blue-100 text-blue-900 border border-blue-200"
                        : member.category === "EXECUTIVE"
                        ? "bg-emerald-100 text-emerald-900 border border-emerald-200"
                        : member.category === "TECHNICAL"
                        ? "bg-indigo-100 text-indigo-900 border border-indigo-200"
                        : "bg-orange-100 text-orange-900 border border-orange-200"
                    }`}
                  >
                    {member.badge || member.category}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-colors">
                    {member.category === "TECHNICAL" ? (
                      <Code className="w-4 h-4" />
                    ) : member.category === "PATRON" || member.category === "FACULTY" ? (
                      <Building2 className="w-4 h-4" />
                    ) : (
                      <Users className="w-4 h-4" />
                    )}
                  </div>
                </div>

                {/* Avatar Placeholder / Graphic */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-emerald-50 border border-slate-200 flex items-center justify-center text-emerald-800 font-bold text-lg mb-4 font-heading shadow-inner">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                {/* Member Info */}
                <h3 className="text-base font-extrabold text-slate-900 font-heading group-hover:text-emerald-800 transition-colors">
                  {member.name}
                </h3>

                <p className="text-xs font-bold text-emerald-700 mt-0.5">{member.role}</p>

                <p className="text-[11px] text-slate-500 font-medium mt-1">
                  {member.department} {member.year && `• ${member.year}`}
                </p>

                {member.bio && (
                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </div>

              {/* Contact Footer */}
              {(member.email || member.phone) && (
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="hover:text-emerald-700 truncate max-w-[170px] inline-flex items-center gap-1 font-mono"
                      title={member.email}
                    >
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{member.email.split("@")[0]}</span>
                    </a>
                  )}
                  {member.phone && (
                    <span className="font-mono text-slate-400 text-[10px]">{member.phone}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileQuickBar from "@/components/MobileQuickBar";
import {
  Users,
  Shield,
  Award,
  GraduationCap,
  Sparkles,
  Mail,
  Linkedin,
  Instagram,
  UserCheck,
  Search,
  Building,
} from "lucide-react";
import { CouncilMember, SiteSettings, CouncilWing } from "@/lib/types";
import { COUNCIL_CONFIG } from "@/config/councilConfig";

interface TeamClientPageProps {
  initialMembers: CouncilMember[];
  initialSettings: SiteSettings;
}

export default function TeamClientPage({
  initialMembers,
  initialSettings,
}: TeamClientPageProps) {
  const [members] = useState<CouncilMember[]>(initialMembers);
  const [selectedWing, setSelectedWing] = useState<string>("ALL");
  const [selectedTenure, setSelectedTenure] = useState<string>("2026–2027");
  const [searchQuery, setSearchQuery] = useState("");

  const wings = [
    { label: "All Members", value: "ALL" },
    { label: "Faculty Advisory Board", value: "FACULTY" },
    { label: "Executive Core Council", value: "CORE" },
    { label: "Portfolio Secretaries", value: "SECRETARY" },
    { label: "Department Representatives (DRs)", value: "DR" },
    { label: "Website Operations Team", value: "WEB_OPS" },
  ];

  const filteredMembers = members.filter((m) => {
    const matchesWing =
      selectedWing === "ALL" || m.wing === selectedWing;
    const matchesTenure =
      selectedTenure === "ALL" || m.tenure === selectedTenure;
    const matchesSearch =
      searchQuery === "" ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.department.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesWing && matchesTenure && matchesSearch;
  });

  const getWingBadgeColor = (wing: CouncilWing) => {
    switch (wing) {
      case "FACULTY":
        return "bg-purple-100 text-purple-900 border-purple-200";
      case "CORE":
        return "bg-red-100 text-red-900 border-red-200";
      case "SECRETARY":
        return "bg-blue-100 text-blue-900 border-blue-200";
      case "DR":
        return "bg-emerald-100 text-emerald-900 border-emerald-200";
      case "WEB_OPS":
        return "bg-amber-100 text-amber-900 border-amber-200";
      default:
        return "bg-slate-100 text-slate-900 border-slate-200";
    }
  };

  // Helper to generate initials avatar
  const getInitials = (name: string) => {
    const parts = name.replace(/^(Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s*/i, "").trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-red-100 selection:text-red-900 pb-16 lg:pb-0">
      <Navbar settings={initialSettings} />

      <main className="flex-1">
        {/* HERO BANNER */}
        <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-12 lg:py-16 px-4 border-b border-slate-800 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-3.5 py-1 rounded-full border border-amber-400/30">
              Students’ Council Governance Structure
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-heading">
              Council Team &amp; Hierarchy
            </h1>
            <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto">
              Meet the faculty advisors, core council executives, portfolio secretaries, and 9 departmental representatives representing PES MCOE Pune.
            </p>
          </div>
        </div>

        {/* CONTROLS: TENURE SELECTOR & WING TABS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search member by name, post, department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:border-red-800 outline-none bg-white"
                />
              </div>

              {/* Tenure Selector */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <span className="text-xs font-bold text-slate-700 shrink-0">
                  Academic Tenure:
                </span>
                <select
                  value={selectedTenure}
                  onChange={(e) => setSelectedTenure(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:border-red-800 outline-none"
                >
                  <option value="2026–2027">2026–2027 (Current Tenure)</option>
                  <option value="2025–2026">2025–2026 (Past Council Archive)</option>
                  <option value="ALL">All Tenures</option>
                </select>
              </div>
            </div>

            {/* Wing Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200">
              {wings.map((w) => (
                <button
                  key={w.value}
                  type="button"
                  onClick={() => setSelectedWing(w.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedWing === w.value
                      ? "bg-red-800 text-white shadow-sm"
                      : "bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200"
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* TEAM MEMBERS GRID */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {filteredMembers.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
              <Users className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                No council members found
              </h3>
              <p className="text-xs text-slate-500">
                Try resetting your search query or selecting &quot;All Members&quot;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between"
                >
                  <div>
                    {/* Member Portrait / Avatar */}
                    <div className="flex items-center gap-3.5 mb-4">
                      {member.photoUrl ? (
                        <img
                          src={member.photoUrl}
                          alt={member.name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400 shadow-sm"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-amber-300 flex items-center justify-center font-black text-lg shadow-md border border-amber-500/40">
                          {getInitials(member.name)}
                        </div>
                      )}

                      <div className="space-y-0.5">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider border ${getWingBadgeColor(
                            member.wing
                          )}`}
                        >
                          {member.wing}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 font-heading leading-tight group-hover:text-red-800 transition-colors">
                          {member.name}
                        </h3>
                      </div>
                    </div>

                    {/* Designation & Department */}
                    <div className="space-y-1 text-xs">
                      <p className="font-bold text-red-800 leading-snug">
                        {member.designation}
                      </p>
                      <p className="text-slate-700 flex items-center gap-1 text-[11px]">
                        <Building className="w-3 h-3 text-slate-500 shrink-0" />
                        <span>
                          {member.department}
                          {member.year ? ` • (${member.year})` : ""}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Contact / Social Links Strip */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono text-[10px] text-slate-700">
                      {member.tenure}
                    </span>

                    <div className="flex items-center gap-2">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-800 transition-colors"
                          title="Send Email"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {member.linkedinUrl && (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          title="LinkedIn Profile"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {member.instagramUrl && (
                        <a
                          href={member.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-pink-50 hover:text-pink-700 transition-colors"
                          title="Instagram Profile"
                        >
                          <Instagram className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer settings={initialSettings} />
      <MobileQuickBar settings={initialSettings} />
    </div>
  );
}

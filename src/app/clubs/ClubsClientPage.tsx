"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileQuickBar from "@/components/MobileQuickBar";
import {
  Sparkles,
  Users,
  Building,
  Radio,
  ExternalLink,
  Search,
  Layers,
} from "lucide-react";
import { InstagramIcon } from "@/components/Icons";
import { Club, SiteSettings } from "@/lib/types";

interface ClubsClientPageProps {
  initialClubs: Club[];
  initialSettings: SiteSettings;
}

export default function ClubsClientPage({
  initialClubs,
  initialSettings,
}: ClubsClientPageProps) {
  const [clubs] = useState<Club[]>(initialClubs);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { label: "All Student Bodies", value: "ALL" },
    { label: "Departmental Associations", value: "DEPARTMENTAL" },
    { label: "Technical Chapters (IEEE, CSI)", value: "TECHNICAL_CHAPTER" },
    { label: "Cultural & Theatrical", value: "CULTURAL" },
    { label: "Sports & Athletics", value: "SPORTS" },
    { label: "NSS & Social Outreach", value: "SOCIAL_OUTREACH" },
  ];

  const filteredClubs = clubs.filter((c) => {
    const matchesCategory =
      selectedCategory === "ALL" || c.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "DEPARTMENTAL":
        return "bg-blue-100 text-blue-900 border-blue-200";
      case "TECHNICAL_CHAPTER":
        return "bg-purple-100 text-purple-900 border-purple-200";
      case "CULTURAL":
        return "bg-rose-100 text-rose-900 border-rose-200";
      case "SPORTS":
        return "bg-emerald-100 text-emerald-900 border-emerald-200";
      case "SOCIAL_OUTREACH":
        return "bg-amber-100 text-amber-900 border-amber-200";
      default:
        return "bg-slate-100 text-slate-900 border-slate-200";
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
              Student Ecosystem
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-heading">
              Clubs, Chapters &amp; Associations
            </h1>
            <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto">
              Explore 20+ active departmental clubs, international technical chapters, cultural troupes, and social outreach cells at PES MCOE.
            </p>
          </div>
        </div>

        {/* CONTROLS & FILTER TABS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search clubs by name, tech track, department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:border-red-800 outline-none bg-white"
                />
              </div>

              <div className="text-xs text-slate-700 font-semibold">
                Showing {filteredClubs.length} Student Bod{filteredClubs.length === 1 ? "y" : "ies"}
              </div>
            </div>

            {/* Category Pills */}
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

        {/* CLUBS GRID */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {filteredClubs.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
              <Layers className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                No clubs found matching your search
              </h3>
              <p className="text-xs text-slate-500">
                Try resetting your search query or choosing &quot;All Student Bodies&quot;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClubs.map((club) => (
                <div
                  key={club.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between"
                >
                  <div>
                    {/* Top Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center font-black text-xs sm:text-sm border border-amber-500/30 shadow-sm group-hover:scale-110 transition-transform">
                        {club.acronym}
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${getCategoryBadgeColor(
                          club.category
                        )}`}
                      >
                        {club.category.replace("_", " ")}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 font-heading leading-snug group-hover:text-red-800 transition-colors">
                      {club.name}
                    </h3>

                    <p className="text-[11px] font-semibold text-slate-700 flex items-center gap-1 mt-1">
                      <Building className="w-3 h-3 text-slate-500 shrink-0" />
                      <span>{club.department}</span>
                    </p>

                    <p className="text-xs text-slate-700 mt-2.5 leading-relaxed">
                      {club.description}
                    </p>

                    {/* Featured Tags */}
                    {club.featuredTags && club.featuredTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100">
                        {club.featuredTags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer: Lead info & Social links */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-600 block uppercase font-semibold">
                        Student Lead
                      </span>
                      <span className="font-bold text-slate-800">
                        {club.leadName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {club.whatsappUrl && (
                        <a
                          href={club.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                          title="WhatsApp Group / Channel"
                        >
                          <Radio className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {club.instagramUrl && (
                        <a
                          href={club.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-pink-50 text-pink-700 hover:bg-pink-100 transition-colors"
                          title="Instagram Page"
                        >
                          <InstagramIcon className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <a
                        href="/events"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-white hover:bg-red-800 transition-colors text-[11px] font-bold"
                      >
                        <span>Events</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
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

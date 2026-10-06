"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileQuickBar from "@/components/MobileQuickBar";
import NoticePreviewModal from "@/components/NoticePreviewModal";
import {
  FileText,
  Calendar,
  Download,
  Eye,
  Search,
  Pin,
  Radio,
  ExternalLink,
  Shield,
  Layers,
} from "lucide-react";
import { Notice, SiteSettings, NoticeCategory } from "@/lib/types";
import { COUNCIL_CONFIG } from "@/config/councilConfig";

interface NoticesClientPageProps {
  initialNotices: Notice[];
  initialSettings: SiteSettings;
}

export default function NoticesClientPage({
  initialNotices,
  initialSettings,
}: NoticesClientPageProps) {
  const [notices] = useState<Notice[]>(initialNotices);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const whatsappUrl =
    initialSettings?.whatsappChannelUrl || COUNCIL_CONFIG.socials.whatsappChannel.url;

  const categories = [
    { label: "All Notices", value: "ALL" },
    { label: "Council Circulars", value: "CIRCULAR" },
    { label: "Event Rulebooks", value: "RULEBOOK" },
    { label: "Timetables & Schedules", value: "TIMETABLE" },
    { label: "Election & Selections", value: "ELECTION" },
  ];

  const filteredNotices = notices.filter((n) => {
    const matchesCategory =
      selectedCategory === "ALL" || n.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.refNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleOpenNotice = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsPreviewOpen(true);
  };

  const getCategoryColor = (cat: NoticeCategory) => {
    switch (cat) {
      case "CIRCULAR":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "TIMETABLE":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "RULEBOOK":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "ELECTION":
        return "bg-red-50 text-red-800 border-red-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
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
              Official Digital Notice Board
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-heading">
              Circulars, Rulebooks &amp; Notices
            </h1>
            <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto">
              Authentic, timestamped notifications and downloadable circulars issued by the Students’ Council of PES MCOE Pune.
            </p>
          </div>
        </div>

        {/* WHATSAPP BROADCAST BANNER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-emerald-950">
              <Radio className="w-4 h-4 text-emerald-600 animate-pulse shrink-0" />
              <span className="font-semibold">
                Want notices delivered instantly to your phone? Join our verified broadcast channel.
              </span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-transform hover:scale-105 active:scale-95 shadow-xs shrink-0"
            >
              <span>🟢 Join WhatsApp Channel</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* CONTROLS & FILTER TABS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by ref number, title, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:border-red-800 outline-none bg-white"
                />
              </div>

              <div className="text-xs text-slate-700 font-semibold">
                Showing {filteredNotices.length} Notice{filteredNotices.length === 1 ? "" : "s"}
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

        {/* NOTICES LIST */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {filteredNotices.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
              <FileText className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                No notices found matching your criteria
              </h3>
              <p className="text-xs text-slate-500">
                Try searching with different keywords or choosing &quot;All Notices&quot;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredNotices.map((notice) => (
                <div
                  key={notice.id}
                  className={`p-6 rounded-3xl bg-white border transition-all hover:shadow-xl flex flex-col justify-between ${
                    notice.isPinned
                      ? "border-amber-300 shadow-amber-100/50"
                      : "border-slate-200"
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getCategoryColor(
                            notice.category
                          )}`}
                        >
                          {notice.category}
                        </span>

                        {notice.isPinned && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                            <Pin className="w-3 h-3 text-red-700" />
                            <span>Pinned Notice</span>
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] font-mono text-slate-700 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {new Date(notice.publishedAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-red-800 font-semibold mb-1">
                      Ref: {notice.refNumber}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 font-heading leading-snug">
                      {notice.title}
                    </h3>

                    <p className="text-xs text-slate-700 mt-2.5 leading-relaxed">
                      {notice.summary}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-700 font-mono">
                      {notice.fileSize || "Official PDF"}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenNotice(notice)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview PDF</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenNotice(notice)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-800 hover:bg-red-700 text-white text-xs font-semibold transition-colors shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
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

      {/* Notice Preview Modal */}
      <NoticePreviewModal
        notice={selectedNotice}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}

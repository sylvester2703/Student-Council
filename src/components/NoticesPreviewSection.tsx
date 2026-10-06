"use client";

import React from "react";
import {
  FileText,
  Calendar,
  Download,
  Eye,
  ArrowRight,
  Pin,
  Radio,
  ExternalLink,
} from "lucide-react";
import { Notice, SiteSettings } from "@/lib/types";
import { COUNCIL_CONFIG } from "@/config/councilConfig";

interface NoticesPreviewSectionProps {
  notices: Notice[];
  settings?: SiteSettings;
  onOpenNotice: (notice: Notice) => void;
}

export default function NoticesPreviewSection({
  notices,
  settings,
  onOpenNotice,
}: NoticesPreviewSectionProps) {
  const whatsappUrl =
    settings?.whatsappChannelUrl || COUNCIL_CONFIG.socials.whatsappChannel.url;

  const getCategoryColor = (cat: string) => {
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
    <section className="py-14 lg:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Callout Bar: WhatsApp Channel Notification */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-emerald-950">
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse shrink-0" />
            <span className="font-semibold">
              Want official circulars delivered straight to your phone?
            </span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-transform hover:scale-105 active:scale-95 shadow-xs"
          >
            <span>🟢 Join PES MCOE WhatsApp Channel</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-800 bg-red-50 px-3 py-1 rounded-full border border-red-200">
              Official Announcements
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 font-heading tracking-tight">
              Digital Notice Board &amp; Circulars
            </h2>
            <p className="text-sm text-slate-700 mt-1">
              Verified circulars, fest guidelines, and constitution documents from the Council.
            </p>
          </div>

          <a
            href="/notices"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all shrink-0"
          >
            <span>View All Notices Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Notices Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {notices.slice(0, 4).map((notice) => (
            <div
              key={notice.id}
              className={`p-5 rounded-2xl bg-white border transition-all hover:shadow-lg flex flex-col justify-between ${
                notice.isPinned
                  ? "border-amber-300 shadow-amber-100/50"
                  : "border-slate-200"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getCategoryColor(
                        notice.category
                      )}`}
                    >
                      {notice.category}
                    </span>

                    {notice.isPinned && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                        <Pin className="w-3 h-3 text-red-700" />
                        <span>Pinned</span>
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-mono text-slate-700 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {new Date(notice.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-red-800 font-semibold mb-1">
                  Ref: {notice.refNumber}
                </div>

                <h3 className="text-base font-bold text-slate-900 font-heading leading-snug line-clamp-2">
                  {notice.title}
                </h3>

                <p className="text-xs text-slate-700 mt-2 line-clamp-2 leading-relaxed">
                  {notice.summary}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-700 font-mono">
                  {notice.fileSize || "Official PDF"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenNotice(notice)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenNotice(notice)}
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
      </div>
    </section>
  );
}

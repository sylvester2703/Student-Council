"use client";

import React from "react";
import {
  X,
  FileText,
  Download,
  Printer,
} from "lucide-react";
import { Notice } from "@/lib/types";

interface NoticePreviewModalProps {
  notice: Notice | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function NoticePreviewModal({
  notice,
  isOpen,
  onClose,
}: NoticePreviewModalProps) {
  if (!isOpen || !notice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert(`Downloading official circular: ${notice.refNumber}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl my-8 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold font-mono text-amber-300">
              {notice.refNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1"
              title="Print Circular"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Content (Styled as official college letterhead circular) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 bg-white">
          {/* Institutional Letterhead Header */}
          <div className="text-center border-b-2 border-red-900 pb-4 space-y-1">
            <p className="text-[11px] font-bold text-red-800 uppercase tracking-widest">
              Progressive Education Society’s
            </p>
            <h3 className="text-base sm:text-lg font-black text-slate-900 font-heading">
              MODERN COLLEGE OF ENGINEERING, PUNE – 05
            </h3>
            <p className="text-[10px] text-slate-500">
              1186/A, Off J.M. Road, Shivajinagar, Pune 411005 • Affiliated to SPPU, Pune
            </p>
            <div className="inline-block mt-1 px-3 py-0.5 rounded-full bg-slate-900 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
              OFFICE OF THE STUDENTS’ COUNCIL (2026–2027)
            </div>
          </div>

          {/* Reference & Date Strip */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-600 border-b border-slate-100 pb-2">
            <span>
              <strong>Ref. No:</strong> {notice.refNumber}
            </span>
            <span>
              <strong>Date:</strong>{" "}
              {new Date(notice.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Notice Subject / Title */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-800">
              OFFICIAL NOTIFICATION • {notice.category}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading leading-snug">
              {notice.title}
            </h2>
          </div>

          {/* Full Notice Body */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            <p>{notice.summary}</p>
            <p>
              All concerned Heads of Departments, Portfolio Secretaries, Student Coordinators, and General Body members of PES MCOE are requested to take note of the above circular and cooperate for smooth execution.
            </p>
          </div>

          {/* Institutional Signatures Block */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-4 text-center text-xs">
            <div className="space-y-1">
              <p className="font-bold text-slate-900">Rohan V. Kulkarni</p>
              <p className="text-[11px] text-slate-500">
                General Secretary, Students’ Council
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-bold text-slate-900">Dr. (Mrs.) K. R. Joshi</p>
              <p className="text-[11px] text-slate-500">
                Principal, PES MCOE Pune
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            {notice.fileSize || "Official PDF Document"}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
            >
              Close Preview
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-800 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

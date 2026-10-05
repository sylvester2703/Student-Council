"use client";

import React, { useState } from "react";
import { Award, Search, Printer, Download, CheckCircle, Shield, FileCheck, Sparkles, Building, ExternalLink } from "lucide-react";
import { EVENT_CONFIG } from "@/config/eventConfig";
import { RegistrationRecord } from "@/lib/types";

export const CertificateDesk: React.FC = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [record, setRecord] = useState<RegistrationRecord | null>(null);
  const [selectedMemberName, setSelectedMemberName] = useState("");

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setError("");
    setLoading(true);
    setRecord(null);

    try {
      const res = await fetch(`/api/registrations?id=${encodeURIComponent(query.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.registration) {
        setError("Registration ID not found. Please check your ID (e.g. SBW-2026-001) or register first.");
        setLoading(false);
        return;
      }

      setRecord(data.registration);
      setSelectedMemberName(data.registration.leaderName);
      setLoading(false);
    } catch {
      setError("Failed to look up certificate record. Please try again.");
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="certificates" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Subtle Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,95,70,0.25)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-950 border border-emerald-800 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>OFFICIAL CERTIFICATE DESK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-heading text-white">
            E-Certificate of Participation
          </h2>

          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            All registered and participating students of PES Modern College of Engineering are awarded an official verified Digital Certificate of Participation issued by the Student Council.
          </p>
        </div>

        {/* Certificate Lookup Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={handleLookup} className="bg-slate-800 p-2 sm:p-2.5 rounded-2xl border border-slate-700 shadow-xl flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Registration ID (e.g. SBW-2026-001)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 font-mono focus:ring-2 focus:ring-emerald-500 outline-hidden"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Get Certificate</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-3 p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs rounded-xl text-center">
              {error}
            </div>
          )}
        </div>

        {/* Certificate Preview Display */}
        {record && (
          <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Squad Member Selector if more than 1 member */}
            {record.members.length > 1 && (
              <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-300">
                  Select squad member for certificate generation:
                </span>
                <div className="flex flex-wrap gap-2">
                  {record.members.map((m, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedMemberName(m.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedMemberName === m.name
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-slate-900 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {m.name} {m.isLeader && "(Leader)"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PRINTABLE CERTIFICATE CONTAINER */}
            <div
              id="printable-certificate"
              className="bg-white text-slate-900 rounded-3xl p-8 sm:p-12 border-8 border-double border-emerald-800 shadow-2xl relative overflow-hidden"
            >
              {/* Corner Watermarks */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-emerald-100 to-transparent pointer-events-none opacity-60" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-radial from-orange-100 to-transparent pointer-events-none opacity-60" />

              {/* Top Institutional Header */}
              <div className="text-center pb-6 border-b-2 border-emerald-900/20">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center">
                    <img
                      src={EVENT_CONFIG.college.logos.swachhBharat}
                      alt="Swachh Bharat"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-900 block font-heading">
                      Progressive Education Society&apos;s
                    </span>
                    <h3 className="text-base sm:text-xl font-black text-slate-900 font-heading">
                      Modern College of Engineering, Pune
                    </h3>
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs text-slate-500 font-semibold tracking-wider uppercase">
                  Shivajinagar, Pune - 411005 • NAAC &apos;A+&apos; Grade Accredited
                </span>
              </div>

              {/* Certificate Title */}
              <div className="text-center py-8 space-y-2">
                <div className="inline-block border-y-2 border-emerald-800 py-1 px-8">
                  <span className="text-xs sm:text-sm font-extrabold tracking-[4px] uppercase text-emerald-800 font-heading">
                    CERTIFICATE OF PARTICIPATION
                  </span>
                </div>
                <p className="text-xs text-slate-500 italic pt-2">
                  This is to proudly certify that
                </p>

                {/* Candidate Name */}
                <h1 className="text-2xl sm:text-4xl font-black text-emerald-950 font-heading tracking-tight underline decoration-emerald-600 decoration-2 underline-offset-8 py-2">
                  {selectedMemberName || record.leaderName}
                </h1>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl mx-auto pt-2">
                  of <strong>{record.branch} ({record.year})</strong> has actively participated in the activity{" "}
                  <strong className="text-emerald-900 font-bold underline">{record.eventTitle}</strong> as part of team{" "}
                  <strong>&ldquo;{record.teamName}&rdquo;</strong> during the campus-wide celebration of{" "}
                  <strong>SWACHH BHARAT WEEK 2026</strong> organized by the <strong>Student Council</strong>.
                </p>
              </div>

              {/* Signatures & Credentials Row */}
              <div className="pt-8 border-t border-slate-200 grid grid-cols-3 gap-4 text-center items-end">
                {/* Principal */}
                <div>
                  <div className="font-serif italic font-bold text-slate-800 text-sm pb-1">Dr. K. R. Joshi</div>
                  <div className="w-24 h-0.5 bg-slate-400 mx-auto mb-1" />
                  <span className="text-[10px] sm:text-xs font-bold text-slate-900 block uppercase">
                    Prof. (Dr.) K. R. Joshi
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500">Principal, PES MCOE</span>
                </div>

                {/* Verification Badge */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-full border-2 border-emerald-700 bg-emerald-50 text-emerald-800 flex items-center justify-center p-1 shadow-inner">
                    <Shield className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-[9px] text-emerald-800 font-bold mt-1">
                    ID: {record.id}
                  </span>
                  <span className="text-[8px] text-slate-400">Verified Participation</span>
                </div>

                {/* Faculty Convener */}
                <div>
                  <div className="font-serif italic font-bold text-slate-800 text-sm pb-1">Dr. S. R. Patil</div>
                  <div className="w-24 h-0.5 bg-slate-400 mx-auto mb-1" />
                  <span className="text-[10px] sm:text-xs font-bold text-slate-900 block uppercase">
                    Dr. S. R. Patil
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500">Faculty Convener / Dean</span>
                </div>
              </div>
            </div>

            {/* Print & Download Action Controls */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-lg cursor-pointer flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate / Save PDF</span>
              </button>

              <a
                href={EVENT_CONFIG.googleSheet.sheetUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <span>View in Google Sheet</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

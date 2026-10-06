"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileQuickBar from "@/components/MobileQuickBar";
import AnonymousTokenModal from "@/components/AnonymousTokenModal";
import {
  Lock,
  ShieldCheck,
  EyeOff,
  KeyRound,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Send,
  HelpCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Filter,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";
import { SiteSettings, AnonymousQuery, UrgencyLevel } from "@/lib/types";
import { COUNCIL_CONFIG } from "@/config/councilConfig";

interface AnonymousPortalClientProps {
  initialSettings: SiteSettings;
  initialPublicQueries: AnonymousQuery[];
}

export default function AnonymousPortalClient({
  initialSettings,
  initialPublicQueries,
}: AnonymousPortalClientProps) {
  // Submission Form State
  const [category, setCategory] = useState("Academic / Timetable / Exam Query");
  const [departmentScope, setDepartmentScope] = useState(
    "General / Campus-wide (Prefer not to specify department)"
  );
  const [urgency, setUrgency] = useState<UrgencyLevel>("MEDIUM");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [allowPublicDisplay, setAllowPublicDisplay] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);

  // Status Lookup State
  const [lookupToken, setLookupToken] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState<AnonymousQuery | null>(null);
  const [lookupError, setLookupError] = useState("");
  const [copiedLookup, setCopiedLookup] = useState(false);

  // Public Accordion Filter State
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("ALL");
  const [expandedQueryId, setExpandedQueryId] = useState<string | null>(
    initialPublicQueries[0]?.id || null
  );

  const categories = [
    "Academic / Timetable / Exam Query",
    "Infrastructure / Classroom / Lab / Wi-Fi Issue",
    "Washroom / Hygiene / Canteen / Water Facility",
    "Safety / Ragging / Harassment / Welfare Concern",
    "Departmental Issue",
    "Council / Event / Fest Query",
    "Other General Problem",
  ];

  // Handle Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!subject.trim() || !description.trim()) {
      setSubmitError("Please fill in both the Subject and Detailed Description.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/anonymous-queries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          departmentScope,
          urgency,
          subject,
          description,
          allowPublicDisplay,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit anonymous query");
      }

      setGeneratedToken(data.data.trackingToken);
      setIsTokenModalOpen(true);

      // Reset form
      setSubject("");
      setDescription("");
      setCategory("Academic / Timetable / Exam Query");
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error ? err.message : "An error occurred while submitting."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Token Lookup
  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError("");
    setLookupResult(null);

    const token = lookupToken.trim().toUpperCase();
    if (!token) {
      setLookupError("Please enter your tracking token (e.g. ANON-MCOE-8492-X7)");
      return;
    }

    setLookupLoading(true);

    try {
      const res = await fetch(
        `/api/anonymous-queries?token=${encodeURIComponent(token)}`
      );
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.error || "No matching query found for this tracking token."
        );
      }

      setLookupResult(data.data);
    } catch (err: unknown) {
      setLookupError(
        err instanceof Error ? err.message : "Lookup failed. Please check token."
      );
    } finally {
      setLookupLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "RESOLVED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            RESOLVED / ANSWERED
          </span>
        );
      case "ESCALATED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            ESCALATED TO PRINCIPAL / SDO
          </span>
        );
      case "UNDER_REVIEW":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            UNDER COUNCIL REVIEW
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            SUBMITTED TO COUNCIL
          </span>
        );
    }
  };

  // Filter public resolved queries
  const filteredPublicQueries = initialPublicQueries.filter((q) => {
    const matchesSearch =
      searchFilter === "" ||
      q.subject.toLowerCase().includes(searchFilter.toLowerCase()) ||
      q.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (q.officialCouncilResponse &&
        q.officialCouncilResponse
          .toLowerCase()
          .includes(searchFilter.toLowerCase()));

    const matchesCategory =
      selectedCategoryFilter === "ALL" || q.category === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-amber-100 selection:text-amber-900 pb-16 lg:pb-0">
      <Navbar settings={initialSettings} />

      <main className="flex-1">
        {/* HERO BANNER: 100% IDENTITY SHIELD GUARANTEE */}
        <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-12 lg:py-16 px-4 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-900/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
            {/* Guarantee Shield Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>100% Identity Shield Guarantee</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight">
              Anonymous Student Problem &amp; Query Portal
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              A safe, zero-trace channel to report academic problems, lab equipment faults, hygiene concerns, or sensitive welfare issues directly to the Students’ Council.
            </p>

            {/* Strict Zero-PII Callout Box */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/40 text-xs text-slate-300 text-left space-y-2 max-w-2xl mx-auto shadow-xl">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero-PII Privacy Architecture</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                <strong>No Name, No Email, No Phone Number, No PRN/Roll Number, and No IP Address or Browser Fingerprint</strong> is collected or logged on this form. You receive a unique tracking token (<code className="text-amber-300">ANON-MCOE-XXXX-XX</code>) to read the Council’s official resolution note.
              </p>
            </div>
          </div>
        </div>

        {/* 2-COLUMN MAIN INTERACTIVE AREA: SUBMIT FORM & TOKEN TRACKER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* COLUMN 1 (7 Cols): ANONYMOUS SUBMISSION FORM */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center border border-amber-500/40">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                        Submit Anonymous Query / Complaint
                      </h2>
                      <p className="text-[11px] text-slate-700">
                        Zero personal information required.
                      </p>
                    </div>
                  </div>
                </div>

                {submitError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {/* Field 1: Category */}
                  <div>
                    <label className="font-bold text-slate-900 block mb-1">
                      1. Issue / Query Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none text-xs text-slate-900 bg-white"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Field 2: Department Scope (Optional) */}
                  <div>
                    <label className="font-bold text-slate-900 block mb-1">
                      2. Department Scope (Optional)
                    </label>
                    <select
                      value={departmentScope}
                      onChange={(e) => setDepartmentScope(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none text-xs text-slate-900 bg-white"
                    >
                      <option value="General / Campus-wide (Prefer not to specify department)">
                        General / Campus-wide (Prefer not to specify department)
                      </option>
                      {COUNCIL_CONFIG.departments.map((dept) => (
                        <option key={dept.code} value={dept.name}>
                          {dept.name} ({dept.short})
                        </option>
                      ))}
                      <option value="First Year Engineering (FE)">
                        First Year Engineering (FE)
                      </option>
                    </select>
                  </div>

                  {/* Field 3: Urgency / Severity */}
                  <div>
                    <label className="font-bold text-slate-900 block mb-1.5">
                      3. Urgency / Severity Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setUrgency("LOW")}
                        className={`p-2 rounded-xl text-center font-bold text-xs border transition-all ${
                          urgency === "LOW"
                            ? "bg-blue-50 border-blue-400 text-blue-800 shadow-xs"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Low
                      </button>

                      <button
                        type="button"
                        onClick={() => setUrgency("MEDIUM")}
                        className={`p-2 rounded-xl text-center font-bold text-xs border transition-all ${
                          urgency === "MEDIUM"
                            ? "bg-amber-50 border-amber-400 text-amber-900 shadow-xs"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Medium
                      </button>

                      <button
                        type="button"
                        onClick={() => setUrgency("HIGH")}
                        className={`p-2 rounded-xl text-center font-bold text-xs border transition-all ${
                          urgency === "HIGH"
                            ? "bg-red-50 border-red-400 text-red-800 shadow-xs"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        High / Urgent ⚠️
                      </button>
                    </div>
                  </div>

                  {/* Field 4: Subject / Short Title */}
                  <div>
                    <label className="font-bold text-slate-900 block mb-1">
                      4. Subject / Short Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Wi-Fi drops in Building B Lab 304 during afternoon practicals"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none text-xs text-slate-900"
                    />
                  </div>

                  {/* Field 5: Detailed Description */}
                  <div>
                    <label className="font-bold text-slate-900 block mb-1">
                      5. Detailed Problem Description &amp; Location *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Explain the exact issue, specific room/lab location, frequency, and suggested resolution..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none text-xs text-slate-900 resize-none leading-relaxed"
                    />
                  </div>

                  {/* Field 6: Public Visibility Toggle */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="allowPublic"
                      checked={allowPublicDisplay}
                      onChange={(e) => setAllowPublicDisplay(e.target.checked)}
                      className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <label
                      htmlFor="allowPublic"
                      className="text-[11px] text-slate-700 cursor-pointer leading-snug"
                    >
                      <strong>Allow Public Resolution Showcase:</strong> If this issue affects other students, the Council may publish the resolved answer on the Public Q&amp;A Board below (your submission remains 100% anonymous).
                    </label>
                  </div>

                  {/* Submit Action */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 hover:from-slate-900 hover:to-slate-800 text-amber-300 font-bold text-xs shadow-xl border border-amber-500/40 transition-all hover:scale-101 active:scale-99 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>
                      {submitting
                        ? "Encrypting & Submitting..."
                        : "Submit 100% Anonymously & Generate Token 🔒"}
                    </span>
                  </button>
                </form>
              </div>
            </div>

            {/* COLUMN 2 (5 Cols): ANONYMOUS STATUS TRACKER BOX */}
            <div id="tracker" className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white border border-amber-500/40 shadow-2xl space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white font-heading">
                      Check Query Status
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Enter your <code className="text-amber-300">ANON-MCOE-XXXX</code> token
                    </p>
                  </div>
                </div>

                <form onSubmit={handleLookup} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      Tracking Token
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ANON-MCOE-8492-X7"
                      value={lookupToken}
                      onChange={(e) => setLookupToken(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-mono text-xs focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none uppercase"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={lookupLoading}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Search className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                    <span>{lookupLoading ? "Looking up..." : "Check Council Reply"}</span>
                  </button>
                </form>

                {lookupError && (
                  <div className="p-3 rounded-xl bg-red-950/80 border border-red-700 text-red-200 text-xs">
                    {lookupError}
                  </div>
                )}

                {/* Lookup Result Card */}
                {lookupResult && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-in fade-in duration-200 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-mono text-amber-400 font-bold text-[11px]">
                        {lookupResult.trackingToken}
                      </span>
                      {getStatusBadge(lookupResult.status)}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">
                        Subject
                      </span>
                      <p className="font-bold text-white leading-snug">
                        {lookupResult.subject}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">
                        Your Query Description
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {lookupResult.description}
                      </p>
                    </div>

                    {/* Official Council Response Note */}
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 space-y-1.5 mt-2">
                      <span className="text-amber-400 font-bold text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Official Students’ Council Response:
                      </span>

                      {lookupResult.officialCouncilResponse ? (
                        <p className="text-slate-200 text-xs leading-relaxed font-medium">
                          {lookupResult.officialCouncilResponse}
                        </p>
                      ) : (
                        <p className="text-slate-400 italic text-[11px]">
                          Your query is currently under review by the respective portfolio secretary and staff advisor. Please check back shortly for the action taken note.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SECTION: PUBLIC RESOLVED ANONYMOUS QUERIES ACCORDION */}
          <div className="mt-16 lg:mt-20 pt-12 border-t border-slate-200 space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Transparent Resolution Log
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Publicly Resolved Campus Issues &amp; FAQs
              </h2>
              <p className="text-xs sm:text-sm text-slate-700">
                Browse frequently reported academic and infrastructure concerns that the Students’ Council and Administration have resolved.
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search resolved campus issues (e.g. Wi-Fi, Library, Water cooler, Lab)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none"
                />
              </div>

              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="w-full sm:w-64 px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:border-red-800 outline-none shrink-0"
              >
                <option value="ALL">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Accordion List */}
            <div className="max-w-4xl mx-auto space-y-3">
              {filteredPublicQueries.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 rounded-2xl bg-slate-50 border border-slate-200">
                  No resolved queries found matching your search.
                </div>
              ) : (
                filteredPublicQueries.map((item) => {
                  const isExpanded = expandedQueryId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedQueryId(isExpanded ? null : item.id)
                        }
                        className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 focus:outline-none"
                      >
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              Resolved
                            </span>
                            <span className="text-[10px] text-slate-700 font-mono">
                              {item.category}
                            </span>
                            <span className="text-[10px] text-slate-700">
                              • {item.departmentScope}
                            </span>
                          </div>

                          <h4 className="text-sm sm:text-base font-bold text-slate-900 font-heading leading-snug">
                            {item.subject}
                          </h4>
                        </div>

                        <div className="p-1 rounded-lg bg-slate-100 text-slate-600 shrink-0 mt-1">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-4 sm:px-5 pb-5 pt-0 space-y-3 border-t border-slate-100 text-xs text-slate-700">
                          <div className="pt-3 space-y-1">
                            <span className="text-[10px] font-bold uppercase text-slate-600">
                              Problem Stated by Student:
                            </span>
                            <p className="text-slate-700 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                            <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Official Council Action &amp; Administrative Resolution:
                            </span>
                            <p className="text-emerald-950 leading-relaxed font-medium">
                              {item.officialCouncilResponse ||
                                "Issue verified and resolved with Department / Estate Cell."}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer settings={initialSettings} />
      <MobileQuickBar settings={initialSettings} />

      {/* Anonymous Token Modal */}
      <AnonymousTokenModal
        isOpen={isTokenModalOpen}
        token={generatedToken || ""}
        onClose={() => setIsTokenModalOpen(false)}
        onGoToTracker={() => {
          if (generatedToken) {
            setLookupToken(generatedToken);
          }
          const trackerElement = document.getElementById("tracker");
          if (trackerElement) {
            trackerElement.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />
    </div>
  );
}

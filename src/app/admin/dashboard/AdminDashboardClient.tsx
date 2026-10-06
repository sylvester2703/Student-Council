"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  Lock,
  Calendar,
  Users,
  MessageSquare,
  Handshake,
  FileText,
  Settings,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Plus,
  Edit2,
  Trash2,
  Download,
  Eye,
  Phone,
  Mail,
  Radio,
  ExternalLink,
  Save,
  Check,
  RefreshCw,
  LogOut,
  Sparkles,
  Layers,
  Building,
} from "lucide-react";
import { InstagramIcon } from "@/components/Icons";
import {
  SiteSettings,
  CouncilEvent,
  CouncilMember,
  Club,
  Notice,
  AnonymousQuery,
  EventRegistration,
  StudentVoiceSubmission,
  SponsorshipEnquiry,
  AnonymousQueryStatus,
  EventStatus,
  RegistrationStatus,
  EventCategory,
  CouncilWing,
} from "@/lib/types";
import { COUNCIL_CONFIG } from "@/config/councilConfig";

interface AdminDashboardClientProps {
  initialSettings: SiteSettings;
  initialEvents: CouncilEvent[];
  initialMembers: CouncilMember[];
  initialClubs: Club[];
  initialNotices: Notice[];
  initialAnonymousQueries: AnonymousQuery[];
  initialEventRegistrations: EventRegistration[];
  initialStudentVoice: StudentVoiceSubmission[];
  initialSponsorships: SponsorshipEnquiry[];
  initialStats: {
    activeEvents: number;
    totalEvents: number;
    totalRegistrations: number;
    unreadAnonymousQueries: number;
    urgentAnonymousQueries: number;
    totalAnonymousQueries: number;
    unreadStudentVoice: number;
    totalStudentVoice: number;
    pendingSponsorships: number;
    totalSponsorships: number;
    totalNotices: number;
    totalMembers: number;
    totalClubs: number;
  };
}

export default function AdminDashboardClient({
  initialSettings,
  initialEvents,
  initialMembers,
  initialClubs,
  initialNotices,
  initialAnonymousQueries,
  initialEventRegistrations,
  initialStudentVoice,
  initialSponsorships,
  initialStats,
}: AdminDashboardClientProps) {
  const router = useRouter();

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    | "ANONYMOUS_QUERIES"
    | "REGISTRATIONS"
    | "STUDENT_VOICE"
    | "SPONSORSHIPS"
    | "CMS_EVENTS"
    | "CMS_MEMBERS"
    | "CMS_NOTICES"
    | "CMS_SETTINGS"
  >("ANONYMOUS_QUERIES");

  // State collections
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [events, setEvents] = useState<CouncilEvent[]>(initialEvents);
  const [members, setMembers] = useState<CouncilMember[]>(initialMembers);
  const [clubs, setClubs] = useState<Club[]>(initialClubs);
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [anonymousQueries, setAnonymousQueries] = useState<AnonymousQuery[]>(
    initialAnonymousQueries
  );
  const [eventRegistrations, setEventRegistrations] = useState<
    EventRegistration[]
  >(initialEventRegistrations);
  const [studentVoice, setStudentVoice] = useState<StudentVoiceSubmission[]>(
    initialStudentVoice
  );
  const [sponsorships, setSponsorships] = useState<SponsorshipEnquiry[]>(
    initialSponsorships
  );
  const [stats, setStats] = useState(initialStats);

  // Filter & Search states
  const [anonSearch, setAnonSearch] = useState("");
  const [anonStatusFilter, setAnonStatusFilter] = useState("ALL");
  const [regSearch, setRegSearch] = useState("");
  const [regEventFilter, setRegEventFilter] = useState("ALL");

  // Feedback Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogout = () => {
    localStorage.removeItem("mcoe_council_admin_logged_in");
    router.push("/admin/login");
  };

  // ---------------- MODULE 1: ANONYMOUS QUERIES ACTIONS ----------------
  const handleUpdateAnonymousQuery = async (
    queryId: string,
    updates: Partial<AnonymousQuery>
  ) => {
    try {
      const res = await fetch(`/api/anonymous-queries?id=${queryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setAnonymousQueries((prev) =>
        prev.map((q) => (q.id === queryId ? data.data : q))
      );
      showToast("Anonymous query updated successfully!");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to update query");
    }
  };

  // ---------------- MODULE 2: REGISTRATION ACTIONS ----------------
  const handleUpdateRegistration = async (
    regId: string,
    updates: Partial<EventRegistration>
  ) => {
    try {
      const res = await fetch(`/api/event-registrations?id=${regId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setEventRegistrations((prev) =>
        prev.map((r) => (r.id === regId ? data.data : r))
      );
      showToast("Registration updated");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Update failed");
    }
  };

  // Export CSV Helper
  const exportToCsv = (
    filename: string,
    rows: Record<string, string | number | boolean | undefined>[]
  ) => {
    if (rows.length === 0) {
      alert("No data available to export");
      return;
    }
    const headers = Object.keys(rows[0]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.join(","),
        ...rows.map((row) =>
          headers
            .map((h) => `"${String(row[h] || "").replace(/"/g, '""')}"`)
            .join(",")
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ---------------- MODULE 5: CMS EVENTS ACTIONS ----------------
  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "TECHNICAL" as EventCategory,
    shortDescription: "",
    fullDescription: "",
    eventDate: "2027-02-25",
    time: "10:00 AM – 05:00 PM",
    venue: "PES MCOE Auditorium",
    organizingWing: "Technical Wing",
    entryFee: "Free for MCOE Students",
    prizePool: "₹50,000 Cash Prizes",
    posterUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    coordinatorName: "Student Coordinator",
    coordinatorPhone: "+91 98220 00000",
    eligibility: "Open to All Engineering Colleges",
    status: "UPCOMING" as EventStatus,
    isFeatured: true,
    registrationOpen: true,
  });
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setEvents((prev) => [data.data, ...prev]);
      setShowAddEventModal(false);
      showToast("Event created successfully!");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to create event");
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`/api/events?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("Failed to delete event");

      setEvents((prev) => prev.filter((e) => e.id !== id));
      showToast("Event removed from database");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  // ---------------- MODULE 8: SETTINGS ACTIONS ----------------
  const [settingsForm, setSettingsForm] = useState(settings);
  const [savingSettings, setSavingSettings] = useState(false);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsForm),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setSettings(data.data);
      showToast("Global site settings & social channels saved!");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSavingSettings(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 p-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP ADMIN HEADER */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-800 text-white flex items-center justify-center border border-amber-400/50 shadow-md">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm sm:text-base text-white font-heading">
                  PES MCOE Council Admin Portal
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                  Live Operations
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Secretary of Website Operations &amp; Core Executive Committee
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors border border-slate-700"
            >
              <span>View Public Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950 hover:bg-red-900 text-red-300 text-xs font-bold border border-red-800/40 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* KPI OVERVIEW CARDS STRIP */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* KPI 1: Anonymous Queries Desk */}
          <div
            onClick={() => setActiveTab("ANONYMOUS_QUERIES")}
            className="cursor-pointer p-4 rounded-2xl bg-slate-900 border border-amber-500/40 hover:border-amber-400 transition-all space-y-1 group shadow-md"
          >
            <div className="flex items-center justify-between text-amber-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Anon Queries Desk
              </span>
              <Lock className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {anonymousQueries.length}
            </div>
            <div className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
              {stats.urgentAnonymousQueries > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              )}
              <span>{stats.unreadAnonymousQueries} Unread / Action Needed</span>
            </div>
          </div>

          {/* KPI 2: Event Registrations */}
          <div
            onClick={() => setActiveTab("REGISTRATIONS")}
            className="cursor-pointer p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500 transition-all space-y-1 group shadow-md"
          >
            <div className="flex items-center justify-between text-blue-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Event Registrations
              </span>
              <Calendar className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {eventRegistrations.length}
            </div>
            <div className="text-[11px] text-slate-400">
              Across {events.length} Active Events
            </div>
          </div>

          {/* KPI 3: Student Voice */}
          <div
            onClick={() => setActiveTab("STUDENT_VOICE")}
            className="cursor-pointer p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-rose-500 transition-all space-y-1 group shadow-md"
          >
            <div className="flex items-center justify-between text-rose-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Student Proposals
              </span>
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {studentVoice.length}
            </div>
            <div className="text-[11px] text-slate-400">
              {stats.unreadStudentVoice} Pending Review
            </div>
          </div>

          {/* KPI 4: Sponsorships */}
          <div
            onClick={() => setActiveTab("SPONSORSHIPS")}
            className="cursor-pointer p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500 transition-all space-y-1 group shadow-md"
          >
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Sponsorship Leads
              </span>
              <Handshake className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {sponsorships.length}
            </div>
            <div className="text-[11px] text-slate-400">
              {stats.pendingSponsorships} In Discussion
            </div>
          </div>

          {/* KPI 5: Active Notices */}
          <div
            onClick={() => setActiveTab("CMS_NOTICES")}
            className="cursor-pointer p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500 transition-all space-y-1 group shadow-md col-span-2 sm:col-span-1"
          >
            <div className="flex items-center justify-between text-purple-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Published Notices
              </span>
              <FileText className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {notices.length}
            </div>
            <div className="text-[11px] text-slate-400">
              {notices.filter((n) => n.isPinned).length} Pinned to Ticker
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS STRIP */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto py-2 text-xs font-bold scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("ANONYMOUS_QUERIES")}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === "ANONYMOUS_QUERIES"
                ? "bg-amber-500 text-slate-950 shadow-md font-black"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Anonymous Queries Desk 🔒</span>
            {stats.unreadAnonymousQueries > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[10px]">
                {stats.unreadAnonymousQueries}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("REGISTRATIONS")}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === "REGISTRATIONS"
                ? "bg-blue-600 text-white shadow-md font-black"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Event Registrations CRM</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("STUDENT_VOICE")}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === "STUDENT_VOICE"
                ? "bg-rose-600 text-white shadow-md font-black"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Student Voice CRM</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("SPONSORSHIPS")}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === "SPONSORSHIPS"
                ? "bg-emerald-600 text-white shadow-md font-black"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Handshake className="w-3.5 h-3.5" />
            <span>Sponsorships CRM</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("CMS_EVENTS")}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === "CMS_EVENTS"
                ? "bg-red-800 text-white shadow-md font-black"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Events CMS</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("CMS_MEMBERS")}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === "CMS_MEMBERS"
                ? "bg-indigo-600 text-white shadow-md font-black"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Council Members CMS</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("CMS_NOTICES")}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === "CMS_NOTICES"
                ? "bg-purple-600 text-white shadow-md font-black"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Notices CMS</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("CMS_SETTINGS")}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === "CMS_SETTINGS"
                ? "bg-slate-100 text-slate-950 shadow-md font-black"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Social &amp; Settings CMS</span>
          </button>
        </div>
      </div>

      {/* MAIN ADMIN DASHBOARD CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* ========================================================================= */}
        {/* TAB 1: ANONYMOUS QUERIES & PROBLEMS DESK (ZERO PII MANAGEMENT)           */}
        {/* ========================================================================= */}
        {activeTab === "ANONYMOUS_QUERIES" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>100% Anonymous Problem &amp; Grievance Desk</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Write official Council responses. Students view your reply live using their secret tracking token.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  exportToCsv(
                    `mcoe-anonymous-queries-${new Date().toISOString().slice(0, 10)}.csv`,
                    anonymousQueries.map((q) => ({
                      Token: q.trackingToken,
                      Category: q.category,
                      Dept: q.departmentScope,
                      Urgency: q.urgency,
                      Subject: q.subject,
                      Description: q.description,
                      Status: q.status,
                      Response: q.officialCouncilResponse || "",
                      Date: q.createdAt,
                    }))
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Export Queries CSV</span>
              </button>
            </div>

            {/* Query Cards List */}
            <div className="space-y-4">
              {anonymousQueries.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
                  No anonymous queries submitted yet.
                </div>
              ) : (
                anonymousQueries.map((query) => (
                  <AnonymousQueryAdminCard
                    key={query.id}
                    query={query}
                    onSaveResponse={(id, updates) =>
                      handleUpdateAnonymousQuery(id, updates)
                    }
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: EVENT REGISTRATIONS CRM                                            */}
        {/* ========================================================================= */}
        {activeTab === "REGISTRATIONS" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>Event Registrations CRM ({eventRegistrations.length})</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verify participant PRNs, manage status, and contact leaders directly.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  exportToCsv(
                    `mcoe-event-registrations-${new Date().toISOString().slice(0, 10)}.csv`,
                    eventRegistrations.map((r) => ({
                      Ref: r.referenceNumber,
                      Event: r.eventTitle,
                      Name: r.studentName,
                      College: r.collegeName,
                      Dept: r.department,
                      Year: r.academicYear,
                      PRN: r.prn,
                      Phone: r.phone,
                      Email: r.email,
                      Team: r.teamName || "N/A",
                      TeamSize: r.teamSize,
                      Status: r.status,
                      Contacted: r.isContacted ? "YES" : "NO",
                      Date: r.createdAt,
                    }))
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Registrations to Excel/CSV</span>
              </button>
            </div>

            {/* Registrations Table */}
            <div className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-3">Ref ID</th>
                    <th className="p-3">Event Title</th>
                    <th className="p-3">Candidate / Team</th>
                    <th className="p-3">Dept &amp; Year</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {eventRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-slate-800/50">
                      <td className="p-3 font-mono font-bold text-amber-300 whitespace-nowrap">
                        {reg.referenceNumber}
                      </td>
                      <td className="p-3 font-semibold text-white whitespace-nowrap max-w-xs truncate">
                        {reg.eventTitle}
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-white">{reg.studentName}</div>
                        {reg.teamName && (
                          <div className="text-[11px] text-slate-400">
                            Team: {reg.teamName} ({reg.teamSize} members)
                          </div>
                        )}
                        <div className="text-[10px] text-slate-500">PRN: {reg.prn}</div>
                      </td>
                      <td className="p-3">
                        <div>{reg.department}</div>
                        <div className="text-[11px] text-slate-400">{reg.academicYear}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-slate-200">
                          <Phone className="w-3 h-3 text-emerald-400" />
                          <span>{reg.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Mail className="w-3 h-3 text-slate-500" />
                          <span>{reg.email}</span>
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <select
                          value={reg.status}
                          onChange={(e) =>
                            handleUpdateRegistration(reg.id, {
                              status: e.target.value as RegistrationStatus,
                            })
                          }
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs font-semibold text-white outline-none"
                        >
                          <option value="REGISTERED">REGISTERED</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="WAITLISTED">WAITLISTED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`https://wa.me/${reg.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `Hello ${reg.studentName}, Students' Council PES MCOE here regarding your registration (${reg.referenceNumber}) for ${reg.eventTitle}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300"
                            title="1-Click WhatsApp Message"
                          >
                            <Radio className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={`tel:${reg.phone}`}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                            title="Call Phone"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={`mailto:${reg.email}`}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                            title="Send Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: STUDENT VOICE CRM                                                  */}
        {/* ========================================================================= */}
        {activeTab === "STUDENT_VOICE" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-rose-400" />
                  <span>Student Voice &amp; Workshop Proposals ({studentVoice.length})</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Proposals submitted by students requesting direct Council follow-up.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  exportToCsv(
                    `mcoe-student-voice-${new Date().toISOString().slice(0, 10)}.csv`,
                    studentVoice.map((v) => ({
                      Ref: v.referenceNumber,
                      Category: v.category,
                      Name: v.studentName,
                      Dept: v.department,
                      Year: v.academicYear,
                      Email: v.email,
                      Phone: v.phone,
                      Subject: v.subject,
                      Message: v.message,
                      Status: v.status,
                      Date: v.createdAt,
                    }))
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Voice Submissions CSV</span>
              </button>
            </div>

            <div className="space-y-3">
              {studentVoice.map((voice) => (
                <div
                  key={voice.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-amber-300 font-bold text-xs">
                        {voice.referenceNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                        {voice.category}
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-400">
                      {new Date(voice.createdAt).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-white">{voice.subject}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {voice.message}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="text-slate-400">
                      From: <strong className="text-white">{voice.studentName}</strong> ({voice.academicYear} - {voice.department}) • Phone: {voice.phone}
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${voice.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hello ${voice.studentName}, this is from PES MCOE Students' Council regarding your proposal: "${voice.subject}".`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 font-semibold text-[11px]"
                      >
                        Reply on WhatsApp
                      </a>

                      <a
                        href={`mailto:${voice.email}`}
                        className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 font-semibold text-[11px]"
                      >
                        Email Student
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: SPONSORSHIPS CRM                                                   */}
        {/* ========================================================================= */}
        {activeTab === "SPONSORSHIPS" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-emerald-400" />
                  <span>Sponsorship &amp; Collaboration Leads ({sponsorships.length})</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Corporate partners, stalls, and fest contingent invites.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  exportToCsv(
                    `mcoe-sponsorships-${new Date().toISOString().slice(0, 10)}.csv`,
                    sponsorships.map((s) => ({
                      Ref: s.referenceNumber,
                      Organization: s.organizationName,
                      Contact: s.contactPerson,
                      Email: s.email,
                      Phone: s.phone,
                      Type: s.partnershipType,
                      TargetEvent: s.targetEvent,
                      Message: s.message,
                      Status: s.status,
                      Date: s.createdAt,
                    }))
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Sponsorship Leads CSV</span>
              </button>
            </div>

            <div className="space-y-3">
              {sponsorships.map((spon) => (
                <div
                  key={spon.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-amber-300 font-bold text-xs">
                        {spon.referenceNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {spon.partnershipType}
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-400">
                      Target: {spon.targetEvent}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-white">
                      {spon.organizationName}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {spon.message}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="text-slate-400">
                      Contact: <strong className="text-white">{spon.contactPerson}</strong> • Phone: {spon.phone} • Email: {spon.email}
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${spon.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hello ${spon.contactPerson}, Students' Council PES MCOE here regarding your sponsorship proposal for ${spon.organizationName}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 font-semibold text-[11px]"
                      >
                        Contact on WhatsApp
                      </a>

                      <a
                        href={`mailto:${spon.email}`}
                        className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 font-semibold text-[11px]"
                      >
                        Send Official Brochure Email
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: CMS EVENTS MANAGEMENT                                              */}
        {/* ========================================================================= */}
        {activeTab === "CMS_EVENTS" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-red-400" />
                  <span>Events &amp; Fests CMS ({events.length})</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Publish new competitions, update prize pools, or toggle registration states.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddEventModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-800 hover:bg-red-700 text-white text-xs font-bold shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Publish New Event</span>
              </button>
            </div>

            {/* Event List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-amber-300">
                        {event.category}
                      </span>
                      <span className="font-mono text-slate-400">
                        {event.eventDate}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-white line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {event.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-emerald-400 font-semibold">
                      {event.registrationOpen ? "🟢 Reg Open" : "🔴 Reg Closed"}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleDeleteEvent(event.id)}
                      className="p-1.5 rounded-lg bg-red-950 hover:bg-red-900 text-red-300 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: CMS COUNCIL MEMBERS                                                */}
        {/* ========================================================================= */}
        {activeTab === "CMS_MEMBERS" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>Council Members &amp; DRs Directory ({members.length})</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Office bearers across Faculty, Core, Portfolio Secretaries, and 9 Departmental Representatives.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-amber-300">
                      {member.wing}
                    </span>
                    <span className="text-slate-500 font-mono text-[10px]">
                      Order #{member.displayOrder}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-white">{member.name}</h4>
                    <p className="text-red-400 font-medium text-[11px]">
                      {member.designation}
                    </p>
                    <p className="text-slate-400 text-[10px]">
                      {member.department}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: CMS DIGITAL NOTICES                                                */}
        {/* ========================================================================= */}
        {activeTab === "CMS_NOTICES" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>Digital Notice Board Management ({notices.length})</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Publish verified circulars, timetable notices, and pinned homepage ticker updates.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-amber-300 font-bold">
                        {notice.refNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                        {notice.category}
                      </span>
                      {notice.isPinned && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-400 border border-red-800">
                          📌 Pinned on Ticker
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-white text-sm">
                      {notice.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-slate-400 text-[11px] font-mono">
                      {new Date(notice.publishedAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: CMS SETTINGS & LIVE SOCIAL CHANNELS                                */}
        {/* ========================================================================= */}
        {activeTab === "CMS_SETTINGS" && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <Settings className="w-5 h-5 text-amber-400" />
                  <span>Manage Live Social Channels &amp; Site Configuration</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Changes saved here instantly update across the Header, Hero, Mobile Quick Bar, Notice Callout, and Footer on the public website.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-white block mb-1">
                    Academic Tenure (e.g. 2026–2027)
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.academicTenure}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        academicTenure: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-amber-400 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-emerald-400 block mb-1 flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5" />
                      <span>Official WhatsApp Channel URL *</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={settingsForm.whatsappChannelUrl}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          whatsappChannelUrl: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-emerald-300 focus:border-emerald-400 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-pink-400 block mb-1 flex items-center gap-1.5">
                      <InstagramIcon className="w-3.5 h-3.5" />
                      <span>Official Instagram Page URL *</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={settingsForm.instagramUrl}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          instagramUrl: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-pink-300 focus:border-pink-400 outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-pink-400 block mb-1">
                    Instagram Handle (Displayed on Badges)
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.instagramHandle}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        instagramHandle: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-pink-400 outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-white block mb-1">
                      Official Council Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={settingsForm.officialEmail}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          officialEmail: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-white block mb-1">
                      Contact Phone 1
                    </label>
                    <input
                      type="tel"
                      required
                      value={settingsForm.contactPhone1}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          contactPhone1: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={savingSettings}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-xl transition-all hover:scale-101 active:scale-99 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>
                    {savingSettings ? "Saving Settings..." : "Save & Update Live Settings Across Portal"}
                  </span>
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* CREATE EVENT MODAL */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg my-8 bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold font-heading">
              Publish New Event / Competition
            </h3>

            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WebCraft: Full-Stack Hackathon"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Category *</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        category: e.target.value as EventCategory,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none"
                  >
                    <option value="FLAGSHIP">Flagship Fest</option>
                    <option value="TECHNICAL">Technical &amp; Hacks</option>
                    <option value="CULTURAL">Cultural &amp; Arts</option>
                    <option value="SPORTS">Sports &amp; Athletics</option>
                    <option value="WORKSHOP">Workshop</option>
                    <option value="NSS_SOCIAL">NSS &amp; Social</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={newEvent.eventDate}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, eventDate: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Short Description *</label>
                <textarea
                  required
                  rows={2}
                  value={newEvent.shortDescription}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      shortDescription: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Venue</label>
                  <input
                    type="text"
                    value={newEvent.venue}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, venue: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Prize Pool</label>
                  <input
                    type="text"
                    value={newEvent.prizePool}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, prizePool: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-red-800 hover:bg-red-700 text-white text-xs font-bold"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------- SUBCOMPONENT: ANONYMOUS QUERY ADMIN CARD ----------------
function AnonymousQueryAdminCard({
  query,
  onSaveResponse,
}: {
  query: AnonymousQuery;
  onSaveResponse: (id: string, updates: Partial<AnonymousQuery>) => void;
}) {
  const [status, setStatus] = useState<AnonymousQueryStatus>(query.status);
  const [response, setResponse] = useState(query.officialCouncilResponse || "");
  const [isPublic, setIsPublic] = useState(query.isPubliclyPublished);
  const [isReviewed, setIsReviewed] = useState(query.isReviewed);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSaveResponse(query.id, {
      status,
      officialCouncilResponse: response,
      isPubliclyPublished: isPublic,
      isReviewed,
    });
    setSaving(false);
  };

  const getUrgencyBadge = (urg: string) => {
    switch (urg) {
      case "HIGH":
        return "bg-red-950 text-red-400 border border-red-800";
      case "MEDIUM":
        return "bg-amber-950 text-amber-400 border border-amber-800";
      default:
        return "bg-blue-950 text-blue-400 border border-blue-800";
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-amber-300 font-bold text-xs">
            Token: {query.trackingToken}
          </span>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${getUrgencyBadge(
              query.urgency
            )}`}
          >
            {query.urgency} Urgency
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
            {query.category}
          </span>
          <span className="text-[11px] text-slate-400">
            • Scope: {query.departmentScope}
          </span>
        </div>

        <span className="text-[11px] text-slate-500 font-mono">
          {new Date(query.createdAt).toLocaleString("en-IN")}
        </span>
      </div>

      {/* Query Content */}
      <div className="space-y-1 text-xs">
        <h3 className="font-bold text-sm text-white">{query.subject}</h3>
        <p className="text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/80">
          {query.description}
        </p>
      </div>

      {/* Official Council Response Textarea */}
      <div className="space-y-1.5 text-xs">
        <label className="font-bold text-amber-300 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Write Official Council Response / Action Taken Note:</span>
        </label>
        <textarea
          rows={3}
          placeholder="Write the official reply that the student will see when entering their token..."
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:border-amber-400 outline-none resize-none leading-relaxed text-xs"
        />
      </div>

      {/* Actions & Status Controls */}
      <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">Status:</span>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as AnonymousQueryStatus)
              }
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-bold outline-none"
            >
              <option value="SUBMITTED">SUBMITTED</option>
              <option value="UNDER_REVIEW">UNDER REVIEW</option>
              <option value="ESCALATED">ESCALATED TO PRINCIPAL/SDO</option>
              <option value="RESOLVED">RESOLVED / ANSWERED</option>
              <option value="ARCHIVED">ARCHIVED / SPAM</option>
            </select>
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 text-[11px]">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="rounded text-amber-500"
            />
            <span>Publish on Public Q&amp;A Board</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 text-[11px]">
            <input
              type="checkbox"
              checked={isReviewed}
              onChange={(e) => setIsReviewed(e.target.checked)}
              className="rounded text-emerald-500"
            />
            <span>Mark Reviewed</span>
          </label>
        </div>

        <button
          type="button"
          disabled={saving}
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors shadow-md disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{saving ? "Saving..." : "Save Response & Update"}</span>
        </button>
      </div>
    </div>
  );
}

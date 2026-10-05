"use client";

import React, { useState } from "react";
import {
  Lock,
  X,
  Search,
  Download,
  Eye,
  Shield,
  FileSpreadsheet,
  AlertCircle,
  ExternalLink,
  Users,
  Award,
  Calendar,
} from "lucide-react";
import { EVENT_CONFIG } from "@/config/eventConfig";
import { RegistrationRecord, SubmissionRecord } from "@/lib/types";

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const [pinInput, setPinInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  // Data
  const [stats, setStats] = useState<any>(null);
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);

  // Search & Filters
  const [activeTab, setActiveTab] = useState<"SUBMISSIONS" | "REGISTRATIONS">("SUBMISSIONS");
  const [filterEvent, setFilterEvent] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Inspect Modal
  const [inspectingSub, setInspectingSub] = useState<SubmissionRecord | null>(null);
  const [inspectingReg, setInspectingReg] = useState<RegistrationRecord | null>(null);
  const [editScore, setEditScore] = useState<number | string>("");
  const [editStatus, setEditStatus] = useState<SubmissionRecord["status"]>("SUBMITTED");
  const [editComments, setEditComments] = useState("");
  const [editShortlist, setEditShortlist] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinInput }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.error || "Invalid Admin Passkey.");
        setLoading(false);
        return;
      }

      setStats(data.stats);
      setRegistrations(data.registrations);
      setSubmissions(data.submissions);
      setIsAuthenticated(true);
      setLoading(false);
    } catch {
      setAuthError("Failed to connect to organizer backend.");
      setLoading(false);
    }
  };

  const handleOpenInspect = (sub: SubmissionRecord) => {
    setInspectingSub(sub);
    setEditScore(sub.judgingScore || "");
    setEditStatus(sub.status);
    setEditComments(sub.juryComments || "");
    setEditShortlist(!!sub.isShortlistedForPeoplesChoice);
    setUpdateMsg("");
  };

  const handleSaveEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectingSub) return;
    setUpdating(true);
    setUpdateMsg("");

    try {
      const res = await fetch("/api/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pin: pinInput,
          submissionId: inspectingSub.submissionId,
          status: editStatus,
          judgingScore: editScore === "" ? undefined : Number(editScore),
          juryComments: editComments,
          isShortlistedForPeoplesChoice: editShortlist,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setUpdateMsg("Failed to update status.");
        setUpdating(false);
        return;
      }

      setUpdateMsg("Evaluation saved successfully!");
      setSubmissions((prev) =>
        prev.map((s) => (s.submissionId === inspectingSub.submissionId ? data.submission : s))
      );
      setInspectingSub(data.submission);
      setUpdating(false);
    } catch {
      setUpdateMsg("Error connecting to server.");
      setUpdating(false);
    }
  };

  const handleExportSubmissionsCsv = () => {
    const rows = submissions.map((s) => ({
      SubmissionId: s.submissionId,
      RegistrationId: s.registrationId,
      Event: s.eventTitle,
      Team: s.teamName,
      Leader: s.leaderName,
      Email: s.leaderEmail,
      Phone: s.leaderPhone,
      Department: s.branch,
      Year: s.year,
      Title: s.submissionTitle,
      Status: s.status,
      Score: s.judgingScore || "N/A",
      Votes: s.peoplesChoiceVotes || 0,
      GoogleDrivePath: s.googleDrivePath,
      SubmittedAt: s.submittedAt,
    }));

    if (rows.length === 0) return;

    const headers = Object.keys(rows[0]).join(",");
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows.map((r) => Object.values(r).map((val) => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SBW_2026_Submissions_Sheet_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportRegistrationsCsv = () => {
    const rows = registrations.map((r) => ({
      RegistrationId: r.id,
      Event: r.eventTitle,
      TeamName: r.teamName,
      LeaderName: r.leaderName,
      LeaderEmail: r.leaderEmail,
      LeaderPhone: r.leaderPhone,
      Department: r.branch,
      Year: r.year,
      Division: r.division,
      TotalMembers: r.members.length,
      AllMembers: r.members.map((m) => `${m.name}`).join(" | "),
      RegisteredAt: r.registeredAt,
      Status: r.status,
    }));

    if (rows.length === 0) return;

    const headers = Object.keys(rows[0]).join(",");
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows.map((r) => Object.values(r).map((val) => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SBW_2026_Registrations_Master_Sheet_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Submissions
  const filteredSubmissions = submissions.filter((s) => {
    const matchEvent = filterEvent === "ALL" || s.eventId === filterEvent;
    const matchStatus = filterStatus === "ALL" || s.status === filterStatus;
    const query = searchQuery.toLowerCase();
    const matchQuery =
      !query ||
      s.submissionId.toLowerCase().includes(query) ||
      s.registrationId.toLowerCase().includes(query) ||
      s.teamName.toLowerCase().includes(query) ||
      s.leaderName.toLowerCase().includes(query) ||
      s.branch.toLowerCase().includes(query);

    return matchEvent && matchStatus && matchQuery;
  });

  // Filter Registrations
  const filteredRegistrations = registrations.filter((r) => {
    const matchEvent = filterEvent === "ALL" || r.eventId === filterEvent;
    const query = searchQuery.toLowerCase();
    const matchQuery =
      !query ||
      r.id.toLowerCase().includes(query) ||
      r.teamName.toLowerCase().includes(query) ||
      r.leaderName.toLowerCase().includes(query) ||
      r.branch.toLowerCase().includes(query) ||
      r.members.some((m) => m.name.toLowerCase().includes(query));

    return matchEvent && matchQuery;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-4">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  CONFIDENTIAL ORGANIZER PORTAL
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-heading">
                Student Council Administration & Master List
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-xl transition-colors cursor-pointer"
            aria-label="Close admin modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[78vh] overflow-y-auto">
          {!isAuthenticated ? (
            /* PIN ENTRY SCREEN */
            <div className="max-w-md mx-auto py-8 text-center space-y-5">
              <div className="w-14 h-14 bg-slate-100 text-slate-700 rounded-2xl flex items-center justify-center mx-auto border border-slate-200">
                <Lock className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">Organizer Verification</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter Student Council Admin PIN to access the participant master roster, submissions, judging, and Google Sheet exports.
                </p>
              </div>

              {authError && (
                <div className="bg-red-50 border border-red-200 text-xs text-red-800 p-3 rounded-xl">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3">
                <input
                  type="password"
                  placeholder="Enter Admin Passkey (Default: MCOE@2026)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-center text-sm font-mono tracking-widest outline-hidden focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-60"
                >
                  {loading ? "Authenticating..." : "Unlock Council Master List"}
                </button>
              </form>
            </div>
          ) : (
            /* AUTHENTICATED DASHBOARD */
            <div className="space-y-6">
              {/* Summary Stats Grid */}
              {stats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                      Total Registered
                    </span>
                    <span className="text-2xl font-black text-emerald-900 font-heading">{stats.totalRegistered}</span>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3.5 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-800 block">
                      Total Submissions
                    </span>
                    <span className="text-2xl font-black text-orange-900 font-heading">{stats.totalSubmissions}</span>
                  </div>

                  {stats.eventStats.map((es: any) => (
                    <div key={es.eventId} className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block truncate" title={es.title}>
                        {es.title.split(" ")[0]}
                      </span>
                      <span className="text-lg font-black text-slate-900 font-heading">
                        {es.registrations} <span className="text-xs font-normal text-slate-400">/ 30 max</span>
                      </span>
                      <span className="text-[9px] text-emerald-700 font-bold block mt-0.5">
                        {es.slotsAvailable} slots left
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {/* Tabs */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveTab("REGISTRATIONS")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      activeTab === "REGISTRATIONS" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Participant Master Roster ({registrations.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("SUBMISSIONS")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      activeTab === "SUBMISSIONS" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Event Submissions ({submissions.length})
                  </button>
                </div>

                {/* Filter and Google Sheet Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={filterEvent}
                    onChange={(e) => setFilterEvent(e.target.value)}
                    className="text-xs p-2 bg-slate-50 border border-slate-300 rounded-xl outline-hidden"
                  >
                    <option value="ALL">All Events</option>
                    {EVENT_CONFIG.events.map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        {ev.title}
                      </option>
                    ))}
                  </select>

                  {/* Direct Live Google Sheet Link */}
                  <a
                    href={EVENT_CONFIG.googleSheet.sheetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-3 py-2 rounded-xl transition-colors cursor-pointer shadow-2xs"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Open Live Google Sheet</span>
                    <ExternalLink className="w-3 h-3 text-emerald-700" />
                  </a>

                  {activeTab === "REGISTRATIONS" ? (
                    <button
                      onClick={handleExportRegistrationsCsv}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 px-3 py-2 rounded-xl transition-colors cursor-pointer shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Roster CSV</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleExportSubmissionsCsv}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 px-3 py-2 rounded-xl transition-colors cursor-pointer shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Submissions CSV</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Search input with live lookup */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Type any Registration ID (e.g. SBW-2026-001), Student Name, Phone, or Branch to identify who is who..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* REGISTRATIONS MASTER TABLE */}
              {activeTab === "REGISTRATIONS" ? (
                <div className="border border-slate-200 rounded-2xl overflow-x-auto shadow-2xs">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-100 text-slate-800 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="p-3">Reg ID</th>
                        <th className="p-3">Event</th>
                        <th className="p-3">Team Name</th>
                        <th className="p-3">Leader Name</th>
                        <th className="p-3">Contact (Phone & Email)</th>
                        <th className="p-3">Department & Year</th>
                        <th className="p-3">Squad Members</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Inspect</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredRegistrations.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="p-6 text-center text-slate-400">
                            No registrations matching your search.
                          </td>
                        </tr>
                      ) : (
                        filteredRegistrations.map((reg) => (
                          <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3 font-mono font-bold text-emerald-700">{reg.id}</td>
                            <td className="p-3 font-semibold text-slate-800">{reg.eventTitle}</td>
                            <td className="p-3 font-bold text-slate-900">{reg.teamName}</td>
                            <td className="p-3">
                              <span className="font-bold text-slate-900 block">{reg.leaderName}</span>
                            </td>
                            <td className="p-3">
                              <span className="text-slate-800 font-mono block">{reg.leaderPhone}</span>
                              <span className="text-slate-500 text-[10px] truncate max-w-[150px] block">
                                {reg.leaderEmail}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className="text-slate-800 font-medium">{reg.branch}</span>
                              <span className="block text-[10px] text-slate-400">
                                {reg.year} ({reg.division})
                              </span>
                            </td>
                            <td className="p-3">
                              <span className="font-bold text-slate-900">{reg.members.length} members</span>
                              <span className="block text-[10px] text-slate-500">
                                {reg.members.map((m) => m.name.split(" ")[0]).join(", ")}
                              </span>
                            </td>
                            <td className="p-3">
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                  reg.status === "SUBMITTED"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-slate-100 text-slate-700"
                                }`}
                              >
                                {reg.status}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => setInspectingReg(reg)}
                                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>View Squad</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* SUBMISSIONS TABLE */
                <div className="border border-slate-200 rounded-2xl overflow-x-auto shadow-2xs">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-100 text-slate-800 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="p-3">Submission ID</th>
                        <th className="p-3">Event</th>
                        <th className="p-3">Team & Leader</th>
                        <th className="p-3">Department</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Score</th>
                        <th className="p-3">Google Drive Folder</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredSubmissions.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="p-6 text-center text-slate-400">
                            No submissions matching your filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredSubmissions.map((sub) => (
                          <tr key={sub.submissionId} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3 font-mono font-bold text-slate-900">
                              {sub.submissionId}
                              <span className="block text-[10px] text-slate-400 font-normal">{sub.registrationId}</span>
                            </td>
                            <td className="p-3 font-semibold text-slate-800">{sub.eventTitle}</td>
                            <td className="p-3">
                              <span className="font-bold text-slate-900 block">{sub.teamName}</span>
                              <span className="text-slate-500 text-[11px]">{sub.leaderName}</span>
                            </td>
                            <td className="p-3">
                              <span className="text-slate-700">{sub.branch}</span>
                              <span className="block text-[10px] text-slate-400">{sub.year}</span>
                            </td>
                            <td className="p-3">
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold ${
                                  sub.status === "WINNER"
                                    ? "bg-yellow-100 text-yellow-900 border border-yellow-300"
                                    : sub.status === "SHORTLISTED"
                                    ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                    : sub.status === "UNDER REVIEW"
                                    ? "bg-blue-100 text-blue-900 border border-blue-200"
                                    : "bg-slate-100 text-slate-700"
                                }`}
                              >
                                {sub.status}
                              </span>
                            </td>
                            <td className="p-3 font-bold text-slate-900 font-mono">
                              {sub.judgingScore !== undefined ? `${sub.judgingScore} / 100` : "—"}
                            </td>
                            <td className="p-3 font-mono text-[10px] text-slate-500 max-w-[180px] truncate" title={sub.googleDrivePath}>
                              {sub.googleDrivePath}
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => handleOpenInspect(sub)}
                                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Inspect</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* INSPECT REGISTRATION SQUAD POPUP */}
        {inspectingReg && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-4">
              <div className="bg-emerald-900 text-white p-5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-200 bg-emerald-950 px-2 py-0.5 rounded">
                      {inspectingReg.id}
                    </span>
                    <span className="text-xs text-emerald-100 font-semibold">{inspectingReg.eventTitle}</span>
                  </div>
                  <h3 className="text-xl font-bold font-heading mt-1">
                    Team: {inspectingReg.teamName}
                  </h3>
                </div>
                <button
                  onClick={() => setInspectingReg(null)}
                  className="text-emerald-200 hover:text-white bg-emerald-950 p-1.5 rounded-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5 text-xs text-slate-700">
                {/* Department & Contact Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Leader Phone</span>
                    <span className="font-bold text-slate-900 font-mono">{inspectingReg.leaderPhone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Leader Email</span>
                    <span className="font-bold text-slate-900">{inspectingReg.leaderEmail}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Class & Div</span>
                    <span className="font-bold text-slate-900">
                      {inspectingReg.branch} • {inspectingReg.year} ({inspectingReg.division})
                    </span>
                  </div>
                </div>

                {/* Squad Members Roster */}
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-[11px] mb-2.5 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>All Registered Squad Members ({inspectingReg.members.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {inspectingReg.members.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-slate-200 p-3.5 rounded-xl flex items-center justify-between shadow-2xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{m.name}</span>
                          {m.isLeader && (
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                              LEADER
                            </span>
                          )}
                        </div>

                        <div className="text-right text-[11px] text-slate-500">
                          <span>{m.branch || inspectingReg.branch}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setInspectingReg(null)}
                    className="px-5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

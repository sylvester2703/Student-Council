"use client";

import React, { useState, useEffect } from "react";
import {
  Trophy,
  Award,
  Medal,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Lock,
  Key,
  Plus,
  Trash2,
  Save,
  LogOut,
  AlertCircle,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";
import { EVENT_CONFIG, EventWinner, ResultsData } from "@/config/eventConfig";

export const ResultsLeaderboard: React.FC = () => {
  const [results, setResults] = useState<ResultsData>(EVENT_CONFIG.initialResults);
  const [selectedEventId, setSelectedEventId] = useState<string>("poster-making");

  // Admin Modal States
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUsername, setLoginUsername] = useState("admin123");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Editable Draft state inside Admin Panel
  const [editableResults, setEditableResults] = useState<ResultsData>(EVENT_CONFIG.initialResults);
  const [adminSelectedEventId, setAdminSelectedEventId] = useState<string>("poster-making");

  useEffect(() => {
    fetchLiveResults();
  }, []);

  const fetchLiveResults = async () => {
    try {
      const res = await fetch("/api/results");
      if (res.ok) {
        const data = await res.json();
        if (data.results) {
          setResults(data.results);
          setEditableResults(data.results);
        }
      }
    } catch {
      // Fallback to local default
    }
  };

  const handleCelebrate = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore if confetti not supported
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (
      loginUsername.trim() === (EVENT_CONFIG.security.adminUsername || "admin123") &&
      loginPassword.trim() === (EVENT_CONFIG.security.adminPassword || "Admin@123")
    ) {
      setIsAuthenticated(true);
      setEditableResults(JSON.parse(JSON.stringify(results)));
      setLoginError("");
    } else {
      setLoginError("Invalid Login ID or Password. Only authorized Jury/Council Admins can manage results.");
    }
  };

  const handleSaveResults = async () => {
    setSaveLoading(true);
    setSaveMessage("");

    try {
      const res = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUsername.trim(),
          password: loginPassword.trim(),
          resultsData: editableResults,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSaveMessage(data.error || "Failed to update results.");
        setSaveLoading(false);
        return;
      }

      setResults(data.results);
      setSaveMessage("Results updated and published successfully!");
      setSaveLoading(false);
      handleCelebrate();

      setTimeout(() => {
        setSaveMessage("");
      }, 3500);
    } catch {
      setSaveMessage("Network error occurred while saving results.");
      setSaveLoading(false);
    }
  };

  // Helper to get active winners for selected event
  const currentWinners = results.eventWinners.find((w: EventWinner) => w.eventId === selectedEventId);
  const activeAdminWinnerIndex = editableResults.eventWinners.findIndex(
    (w: EventWinner) => w.eventId === adminSelectedEventId
  );

  const handleWinnerChange = (
    tier: "winner" | "runnerUp" | "secondRunnerUp",
    field: string,
    value: string | number
  ) => {
    if (activeAdminWinnerIndex === -1) return;

    const updated = JSON.parse(JSON.stringify(editableResults)) as ResultsData;
    const eventWin = updated.eventWinners[activeAdminWinnerIndex];

    if (tier === "winner") {
      eventWin.winner = { ...eventWin.winner, [field]: value };
    } else if (tier === "runnerUp") {
      eventWin.runnerUp = { ...eventWin.runnerUp, [field]: value };
    } else if (tier === "secondRunnerUp") {
      if (!eventWin.secondRunnerUp) {
        eventWin.secondRunnerUp = {
          teamName: "",
          leadName: "",
          department: "",
          score: 0,
        };
      }
      eventWin.secondRunnerUp = { ...eventWin.secondRunnerUp, [field]: value };
    }

    setEditableResults(updated);
  };

  const handleAddSpecialAward = () => {
    if (activeAdminWinnerIndex === -1) return;
    const updated = JSON.parse(JSON.stringify(editableResults)) as ResultsData;
    const eventWin = updated.eventWinners[activeAdminWinnerIndex];
    if (!eventWin.specialAwards) {
      eventWin.specialAwards = [];
    }
    eventWin.specialAwards.push({
      title: "Special Recognition",
      teamName: "Team Name",
      notes: "Remarkable creativity and campus relevance",
    });
    setEditableResults(updated);
  };

  const handleSpecialAwardChange = (
    awardIndex: number,
    field: "title" | "teamName" | "notes",
    value: string
  ) => {
    if (activeAdminWinnerIndex === -1) return;
    const updated = JSON.parse(JSON.stringify(editableResults)) as ResultsData;
    const eventWin = updated.eventWinners[activeAdminWinnerIndex];
    if (eventWin.specialAwards && eventWin.specialAwards[awardIndex]) {
      eventWin.specialAwards[awardIndex][field] = value;
      setEditableResults(updated);
    }
  };

  const handleRemoveSpecialAward = (awardIndex: number) => {
    if (activeAdminWinnerIndex === -1) return;
    const updated = JSON.parse(JSON.stringify(editableResults)) as ResultsData;
    const eventWin = updated.eventWinners[activeAdminWinnerIndex];
    if (eventWin.specialAwards) {
      eventWin.specialAwards = eventWin.specialAwards.filter((_: unknown, i: number) => i !== awardIndex);
      setEditableResults(updated);
    }
  };

  return (
    <section id="results" className="py-16 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">
              <Trophy className="w-3.5 h-3.5 text-yellow-700" />
              <span>HONOR ROLL & OFFICIAL RESULTS</span>
            </div>
            {results.isAnnounced ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Live Winners Announced
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                <Clock className="w-3 h-3 text-amber-600" />
                Evaluation In Progress
              </span>
            )}
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Official Results & Leaderboard
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Celebrating our campus changemakers, creative advocates, and problem solvers across all 3 active competitions.
          </p>

          {/* Admin Result Portal Trigger */}
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => {
                setIsAdminModalOpen(true);
                setSaveMessage("");
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 shadow-2xs transition-all cursor-pointer hover:border-slate-400"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-700" />
              <span>Jury & Admin Result Desk</span>
            </button>
          </div>
        </div>

        {!results.isAnnounced ? (
          /* ANNOUNCEMENT PENDING STATE */
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs space-y-6">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto border border-amber-200">
              <Clock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 font-heading">Results Will Be Announced Soon</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {results.announcementNotice || EVENT_CONFIG.initialResults.announcementNotice}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 text-left space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Faculty Jury Mark Tabulation</span>
              </div>
              <p className="text-slate-500 leading-snug">
                The faculty evaluation committee is reviewing entries across Poster Making, Reel Making, and Waste Hunt based on Creativity, Theme Alignment, Practicality, and Environmental Impact.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="px-5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <Key className="w-3.5 h-3.5 text-slate-600" />
                <span>Admin Login to Publish Results</span>
              </button>
            </div>
          </div>
        ) : (
          /* LIVE RESULTS PODIUM */
          <div className="space-y-8">
            {/* Event Tabs (3 Active Events) */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {EVENT_CONFIG.events.map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => setSelectedEventId(ev.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedEventId === ev.id
                      ? "bg-slate-900 text-white shadow-xs scale-102"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {ev.title}
                </button>
              ))}
            </div>

            {/* 3-Tier Podium Grid */}
            {currentWinners ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                {/* 2nd Place: Runner-Up */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-xs md:order-1 order-2">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto mb-3 border border-slate-300 font-black text-lg">
                    🥈
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Runner-Up (2nd Place)
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1 font-heading">
                    {currentWinners.runnerUp.teamName}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                    Lead: {currentWinners.runnerUp.leadName}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">{currentWinners.runnerUp.department}</p>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-xs font-extrabold text-slate-800 bg-slate-100 px-3 py-1 rounded-full">
                      Score: {currentWinners.runnerUp.score} / 100
                    </span>
                  </div>
                </div>

                {/* 1st Place: Winner (Gold Champion) */}
                <div className="bg-gradient-to-b from-yellow-50/90 via-white to-white border-2 border-yellow-300 rounded-3xl p-8 text-center shadow-md relative md:order-2 order-1 md:-translate-y-4">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-slate-950 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-xs">
                    CHAMPION
                  </div>
                  <div className="w-16 h-16 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center mx-auto mb-3 border-2 border-yellow-300 font-black text-2xl shadow-2xs">
                    🏆
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-yellow-800 block">
                    1st Place Winner
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1 font-heading">
                    {currentWinners.winner.teamName}
                  </h3>
                  <p className="text-xs font-bold text-emerald-700 mt-0.5">
                    Lead: {currentWinners.winner.leadName}
                  </p>
                  <p className="text-xs text-slate-600 mt-1 font-medium">{currentWinners.winner.department}</p>
                  <div className="mt-5 pt-3 border-t border-yellow-200/80">
                    <span className="text-sm font-black text-yellow-900 bg-yellow-100 px-4 py-1.5 rounded-full border border-yellow-300">
                      Score: {currentWinners.winner.score} / 100
                    </span>
                  </div>
                </div>

                {/* 3rd Place: 2nd Runner-Up */}
                {currentWinners.secondRunnerUp && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-xs md:order-3 order-3">
                    <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-3 border border-amber-300 font-black text-lg">
                      🥉
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      2nd Runner-Up (3rd Place)
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1 font-heading">
                    {currentWinners.secondRunnerUp.teamName}
                  </h3>
                    <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                      Lead: {currentWinners.secondRunnerUp.leadName}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">{currentWinners.secondRunnerUp.department}</p>
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-xs font-extrabold text-slate-800 bg-slate-100 px-3 py-1 rounded-full">
                        Score: {currentWinners.secondRunnerUp.score} / 100
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-xs text-slate-500">
                No winners registered yet for this competition.
              </div>
            )}

            {/* Special Recognitions Grid */}
            {currentWinners?.specialAwards && currentWinners.specialAwards.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-600" />
                  <h4 className="text-base font-bold text-slate-900 font-heading">
                    Special Category Recognitions
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {currentWinners.specialAwards.map((award: { title: string; teamName: string; notes: string }, idx: number) => (
                    <div key={idx} className="bg-orange-50/60 border border-orange-200 rounded-xl p-4 space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-orange-800">
                        {award.title}
                      </span>
                      <h5 className="text-sm font-bold text-slate-900">{award.teamName}</h5>
                      <p className="text-xs text-slate-600">{award.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ADMIN RESULTS MANAGEMENT MODAL */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-white">
                    Jury & Result Administration Desk
                  </h3>
                  <p className="text-xs text-slate-400">
                    PES Modern College of Engineering • Swachh Bharat Week 2026
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {!isAuthenticated ? (
                /* Step 1: Admin Login */
                <form onSubmit={handleAdminLogin} className="max-w-md mx-auto space-y-4 py-4">
                  <div className="text-center space-y-1">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 font-heading">
                      Admin Authentication Required
                    </h4>
                    <p className="text-xs text-slate-500">
                      Enter authorized Jury / Council credentials to upload or modify event results.
                    </p>
                  </div>

                  {loginError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-800 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Admin Login ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                        placeholder="e.g. admin123"
                        required
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono outline-hidden focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono outline-hidden focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <p className="text-[11px] text-slate-500 text-center">
                      Default Council Credentials: Login ID <code>admin123</code> • Password <code>Admin@123</code>
                    </p>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer"
                    >
                      Authenticate & Access Results Desk
                    </button>
                  </div>
                </form>
              ) : (
                /* Step 2: Authenticated Results Editor */
                <div className="space-y-6">
                  {/* Status Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                      <span className="text-xs font-bold text-emerald-900">
                        Logged in as Council Admin / Jury Head ({loginUsername})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAuthenticated(false);
                        setLoginPassword("");
                      }}
                      className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>

                  {saveMessage && (
                    <div
                      className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                        saveMessage.includes("success")
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : "bg-red-100 text-red-900 border border-red-300"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>{saveMessage}</span>
                    </div>
                  )}

                  {/* Master Publication Toggle */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          Public Results Visibility Status
                        </h4>
                        <p className="text-xs text-slate-500">
                          Toggle between Draft / Evaluation Mode and Live Winners Podium on the website.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setEditableResults((prev: ResultsData) => ({
                            ...prev,
                            isAnnounced: !prev.isAnnounced,
                          }))
                        }
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          editableResults.isAnnounced
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-amber-100 text-amber-900 border border-amber-300"
                        }`}
                      >
                        {editableResults.isAnnounced ? "✓ LIVE: Winners Published" : "⏳ DRAFT: In Evaluation"}
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Pending / Announcement Notice Message
                      </label>
                      <input
                        type="text"
                        value={editableResults.announcementNotice}
                        onChange={(e) =>
                          setEditableResults((prev: ResultsData) => ({
                            ...prev,
                            announcementNotice: e.target.value,
                          }))
                        }
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs outline-hidden focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Active Event Tabs */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Select Competition Category to Edit:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {EVENT_CONFIG.events.map((ev) => (
                        <button
                          key={ev.id}
                          type="button"
                          onClick={() => setAdminSelectedEventId(ev.id)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            adminSelectedEventId === ev.id
                              ? "bg-emerald-700 text-white shadow-xs"
                              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {ev.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category Winners Editor Form */}
                  {activeAdminWinnerIndex !== -1 && (
                    <div className="space-y-4">
                      {/* 1st Place Champion */}
                      <div className="bg-yellow-50/60 border border-yellow-200 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center gap-2 text-yellow-800 font-bold text-xs">
                          <Trophy className="w-4 h-4 text-yellow-600" />
                          <span>1st Place Winner (Champion)</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Team Name
                            </label>
                            <input
                              type="text"
                              value={
                                editableResults.eventWinners[activeAdminWinnerIndex].winner.teamName
                              }
                              onChange={(e) =>
                                handleWinnerChange("winner", "teamName", e.target.value)
                              }
                              className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Team Lead Name
                            </label>
                            <input
                              type="text"
                              value={
                                editableResults.eventWinners[activeAdminWinnerIndex].winner.leadName
                              }
                              onChange={(e) =>
                                handleWinnerChange("winner", "leadName", e.target.value)
                              }
                              className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Department & Year
                            </label>
                            <input
                              type="text"
                              value={
                                editableResults.eventWinners[activeAdminWinnerIndex].winner.department
                              }
                              onChange={(e) =>
                                handleWinnerChange("winner", "department", e.target.value)
                              }
                              className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Jury Score (Out of 100)
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={
                                editableResults.eventWinners[activeAdminWinnerIndex].winner.score
                              }
                              onChange={(e) =>
                                handleWinnerChange("winner", "score", Number(e.target.value))
                              }
                              className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 2nd Place Runner Up */}
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center gap-2 text-slate-700 font-bold text-xs">
                          <Medal className="w-4 h-4 text-slate-500" />
                          <span>Runner-Up (2nd Place)</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Team Name
                            </label>
                            <input
                              type="text"
                              value={
                                editableResults.eventWinners[activeAdminWinnerIndex].runnerUp.teamName
                              }
                              onChange={(e) =>
                                handleWinnerChange("runnerUp", "teamName", e.target.value)
                              }
                              className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Team Lead Name
                            </label>
                            <input
                              type="text"
                              value={
                                editableResults.eventWinners[activeAdminWinnerIndex].runnerUp.leadName
                              }
                              onChange={(e) =>
                                handleWinnerChange("runnerUp", "leadName", e.target.value)
                              }
                              className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Department & Year
                            </label>
                            <input
                              type="text"
                              value={
                                editableResults.eventWinners[activeAdminWinnerIndex].runnerUp.department
                              }
                              onChange={(e) =>
                                handleWinnerChange("runnerUp", "department", e.target.value)
                              }
                              className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Jury Score (Out of 100)
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={
                                editableResults.eventWinners[activeAdminWinnerIndex].runnerUp.score
                              }
                              onChange={(e) =>
                                handleWinnerChange("runnerUp", "score", Number(e.target.value))
                              }
                              className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 3rd Place 2nd Runner Up */}
                      <div className="bg-amber-50/40 border border-amber-200 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                          <Medal className="w-4 h-4 text-amber-700" />
                          <span>2nd Runner-Up (3rd Place)</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Team Name
                            </label>
                            <input
                              type="text"
                              value={
                                editableResults.eventWinners[activeAdminWinnerIndex].secondRunnerUp
                                  ?.teamName || ""
                              }
                              onChange={(e) =>
                                handleWinnerChange("secondRunnerUp", "teamName", e.target.value)
                              }
                              className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Team Lead Name
                            </label>
                            <input
                              type="text"
                              value={
                                editableResults.eventWinners[activeAdminWinnerIndex].secondRunnerUp
                                  ?.leadName || ""
                              }
                              onChange={(e) =>
                                handleWinnerChange("secondRunnerUp", "leadName", e.target.value)
                              }
                              className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Department & Year
                            </label>
                            <input
                              type="text"
                              value={
                                editableResults.eventWinners[activeAdminWinnerIndex].secondRunnerUp
                                  ?.department || ""
                              }
                              onChange={(e) =>
                                handleWinnerChange("secondRunnerUp", "department", e.target.value)
                              }
                              className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Jury Score (Out of 100)
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={
                                editableResults.eventWinners[activeAdminWinnerIndex].secondRunnerUp
                                  ?.score || 0
                              }
                              onChange={(e) =>
                                handleWinnerChange("secondRunnerUp", "score", Number(e.target.value))
                              }
                              className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Special Category Awards */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
                            <Award className="w-4 h-4 text-orange-600" />
                            <span>Special Recognitions</span>
                          </div>
                          <button
                            type="button"
                            onClick={handleAddSpecialAward}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Award</span>
                          </button>
                        </div>

                        {editableResults.eventWinners[activeAdminWinnerIndex].specialAwards?.map(
                          (award: { title: string; teamName: string; notes: string }, aIdx: number) => (
                            <div
                              key={aIdx}
                              className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2 relative"
                            >
                              <button
                                type="button"
                                onClick={() => handleRemoveSpecialAward(aIdx)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-[10px] font-bold uppercase text-slate-600">
                                    Award Title
                                  </label>
                                  <input
                                    type="text"
                                    value={award.title}
                                    onChange={(e) =>
                                      handleSpecialAwardChange(aIdx, "title", e.target.value)
                                    }
                                    className="w-full p-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold uppercase text-slate-600">
                                    Team Name
                                  </label>
                                  <input
                                    type="text"
                                    value={award.teamName}
                                    onChange={(e) =>
                                      handleSpecialAwardChange(aIdx, "teamName", e.target.value)
                                    }
                                    className="w-full p-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-slate-600">
                                  Citation / Notes
                                </label>
                                <input
                                  type="text"
                                  value={award.notes}
                                  onChange={(e) =>
                                    handleSpecialAwardChange(aIdx, "notes", e.target.value)
                                  }
                                  className="w-full p-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {isAuthenticated && (
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Close Window
                </button>

                <button
                  type="button"
                  onClick={handleSaveResults}
                  disabled={saveLoading}
                  className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-60 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{saveLoading ? "Saving & Publishing..." : "Save & Publish Changes"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

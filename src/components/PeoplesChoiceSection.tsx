"use client";

import React, { useState, useEffect } from "react";
import { Heart, Sparkles, Check, AlertCircle, Users, Award, Eye, ThumbsUp } from "lucide-react";
import confetti from "canvas-confetti";

interface ShortlistedEntry {
  submissionId: string;
  eventId: string;
  eventTitle: string;
  teamName: string;
  submissionTitle: string;
  conceptNote?: string;
  peoplesChoiceVotes: number;
}

export const PeoplesChoiceSection: React.FC = () => {
  const [entries, setEntries] = useState<ShortlistedEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Voting Modal State
  const [votingEntry, setVotingEntry] = useState<ShortlistedEntry | null>(null);
  const [voterPrn, setVoterPrn] = useState("");
  const [voterEmail, setVoterEmail] = useState("");
  const [votingStatus, setVotingStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR">("IDLE");
  const [voteMessage, setVoteMessage] = useState("");
  const [votedMap, setVotedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch("/api/vote");
      const data = await res.json();
      if (data.shortlisted) {
        setEntries(data.shortlisted);
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const handleOpenVoteModal = (entry: ShortlistedEntry) => {
    setVotingEntry(entry);
    setVotingStatus("IDLE");
    setVoteMessage("");
  };

  const handleCastVote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!votingEntry || !voterPrn || !voterEmail) return;

    setVotingStatus("SUBMITTING");
    setVoteMessage("");

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: votingEntry.submissionId,
          voterPrn: voterPrn.trim().toUpperCase(),
          voterEmail: voterEmail.trim().toLowerCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setVotingStatus("ERROR");
        setVoteMessage(data.error || "Failed to record vote.");
        return;
      }

      setVotingStatus("SUCCESS");
      setVoteMessage(data.message || "Vote recorded successfully!");
      setVotedMap((prev) => ({ ...prev, [votingEntry.eventId]: true }));

      // Update count locally
      setEntries((prev) =>
        prev.map((item) =>
          item.submissionId === votingEntry.submissionId
            ? { ...item, peoplesChoiceVotes: data.votesCount || item.peoplesChoiceVotes + 1 }
            : item
        )
      );

      try {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
    } catch {
      setVotingStatus("ERROR");
      setVoteMessage("Connection failed. Please try again.");
    }
  };

  return (
    <section id="peoples-choice" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-200">
            <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-600" />
            <span>CAMPUS OPINION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            People&apos;s Choice Award
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Review shortlisted creative submissions across Poster and Reel Making. Cast your verified student vote using your college email and roll number.
          </p>
        </div>

        {/* Shortlisted Showcase Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-slate-100 rounded-2xl"></div>
            ))}
          </div>
        ) : entries.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center text-xs text-slate-500 max-w-md mx-auto">
            Shortlisted entries for People&apos;s Choice will be published after the jury preliminary review.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {entries.map((entry) => {
              const alreadyVotedEvent = votedMap[entry.eventId];

              return (
                <div
                  key={entry.submissionId}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {entry.eventTitle}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-pink-600">
                        <Heart className="w-3.5 h-3.5 fill-pink-600" />
                        <span>{entry.peoplesChoiceVotes}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 font-heading leading-snug mb-1">
                      {entry.submissionTitle}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 mb-2">By Team: {entry.teamName}</p>

                    {entry.conceptNote && (
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        {entry.conceptNote}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleOpenVoteModal(entry)}
                      className={`w-full py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        alreadyVotedEvent
                          ? "bg-slate-100 text-slate-500 cursor-not-allowed"
                          : "bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 shadow-2xs"
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{alreadyVotedEvent ? "Voted in this category" : "Vote for this entry"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Voting Modal */}
        {votingEntry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
              <button
                onClick={() => setVotingEntry(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                ✕
              </button>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-700 bg-pink-50 px-2 py-0.5 rounded">
                  VERIFIED CAMPUS VOTING
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-heading mt-1">
                  Vote for &ldquo;{votingEntry.submissionTitle}&rdquo;
                </h3>
                <p className="text-xs text-slate-500">Team: {votingEntry.teamName}</p>
              </div>

              {votingStatus === "SUCCESS" ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center space-y-2">
                  <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">Vote Recorded!</h4>
                  <p className="text-xs text-emerald-700">{voteMessage}</p>
                  <button
                    onClick={() => setVotingEntry(null)}
                    className="mt-2 px-4 py-1.5 text-xs font-bold text-white bg-emerald-700 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCastVote} className="space-y-3">
                  {votingStatus === "ERROR" && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-800">
                      {voteMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Your Roll Number / Student ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1024 / SE-COMP"
                      value={voterPrn}
                      onChange={(e) => setVoterPrn(e.target.value)}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono uppercase outline-hidden focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Your College Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. student@moderncoe.edu.in"
                      value={voterEmail}
                      onChange={(e) => setVoterEmail(e.target.value)}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-hidden focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 leading-tight">
                    * Anti-spam rule: Only 1 vote per Student ID/Email is permitted per event category.
                  </p>

                  <button
                    type="submit"
                    disabled={votingStatus === "SUBMITTING"}
                    className="w-full py-2.5 text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {votingStatus === "SUBMITTING" ? "Verifying & Recording..." : "Confirm & Cast Vote"}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

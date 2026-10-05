"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Check,
  Copy,
  Plus,
  Trash2,
  ArrowRight,
  Printer,
  AlertCircle,
  FileText,
  ExternalLink,
  UploadCloud,
  FileSpreadsheet,
  Award,
  MailCheck,
} from "lucide-react";
import { EVENT_CONFIG } from "@/config/eventConfig";
import { RegistrationRecord, TeamMember } from "@/lib/types";

interface RegistrationModalProps {
  isOpen: boolean;
  preselectedEventId?: string;
  onClose: () => void;
  onSuccessSubmitRedirect: (regId: string) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  preselectedEventId,
  onClose,
  onSuccessSubmitRedirect,
}) => {
  const [selectedEventId, setSelectedEventId] = useState(preselectedEventId || "poster-making");
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [leaderPhone, setLeaderPhone] = useState("");
  const [branch, setBranch] = useState(EVENT_CONFIG.branches[0]);
  const [year, setYear] = useState(EVENT_CONFIG.years[2]); // Default TE
  const [division, setDivision] = useState(EVENT_CONFIG.divisions[0]);
  const [consentGiven, setConsentGiven] = useState(false);

  // Dynamic additional team members (No PRN required)
  const [additionalMembers, setAdditionalMembers] = useState<TeamMember[]>([]);

  // State for submission
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registeredData, setRegisteredData] = useState<RegistrationRecord | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedEventId) {
      setSelectedEventId(preselectedEventId);
    }
  }, [preselectedEventId]);

  const currentEvent = EVENT_CONFIG.events.find((e) => e.id === selectedEventId) || EVENT_CONFIG.events[0];
  const maxAllowedMembers = currentEvent.maxTeamMembers;
  const minRequiredMembers = currentEvent.minTeamMembers;
  const currentTotalMembers = 1 + additionalMembers.length;

  const handleAddMember = () => {
    if (currentTotalMembers < maxAllowedMembers) {
      setAdditionalMembers([
        ...additionalMembers,
        {
          name: "",
          email: "",
          phone: "",
          branch,
          year,
          division,
          isLeader: false,
        },
      ]);
    }
  };

  const handleRemoveMember = (index: number) => {
    const updated = [...additionalMembers];
    updated.splice(index, 1);
    setAdditionalMembers(updated);
  };

  const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...additionalMembers];
    updated[index] = { ...updated[index], [field]: value };
    setAdditionalMembers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!teamName.trim() || !leaderName.trim() || !leaderEmail.trim() || !leaderPhone.trim()) {
      setErrorMessage("Please fill in all mandatory primary participant details.");
      return;
    }

    if (currentTotalMembers < minRequiredMembers) {
      setErrorMessage(
        `${currentEvent.title} requires at least ${minRequiredMembers} members. Please add ${
          minRequiredMembers - currentTotalMembers
        } more squad member(s).`
      );
      return;
    }

    // Validate additional member fields
    for (let i = 0; i < additionalMembers.length; i++) {
      const m = additionalMembers[i];
      if (!m.name.trim()) {
        setErrorMessage(`Please provide the Full Name for Team Member #${i + 2}.`);
        return;
      }
    }

    if (!consentGiven) {
      setErrorMessage("You must accept the event code of conduct and institutional safety rules.");
      return;
    }

    setSubmitting(true);

    try {
      const allMembers: TeamMember[] = [
        {
          name: leaderName.trim(),
          email: leaderEmail.trim().toLowerCase(),
          phone: leaderPhone.trim(),
          branch,
          year,
          division,
          isLeader: true,
        },
        ...additionalMembers.map((m) => ({
          ...m,
          name: m.name.trim(),
          email: (m.email || leaderEmail).trim().toLowerCase(),
          phone: m.phone || leaderPhone,
          branch: m.branch || branch,
          year: m.year || year,
          division: m.division || division,
          isLeader: false,
        })),
      ];

      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: selectedEventId,
          teamName: teamName.trim(),
          leaderName: leaderName.trim(),
          leaderEmail: leaderEmail.trim().toLowerCase(),
          leaderPhone: leaderPhone.trim(),
          branch,
          year,
          division,
          members: allMembers,
          consentGiven,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to complete registration.");
        setSubmitting(false);
        return;
      }

      setRegisteredData(data.registration);
      setSubmitting(false);
    } catch {
      setErrorMessage("Network or server connection error. Please try again.");
      setSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (registeredData?.id) {
      navigator.clipboard.writeText(registeredData.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrintSlip = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-emerald-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-emerald-200 hover:text-white bg-emerald-950/60 hover:bg-emerald-950 p-1.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Close registration modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <img
              src={EVENT_CONFIG.college.logos.swachhBharat}
              alt="Swachh Bharat Emblem"
              className="h-8 w-auto bg-white p-1 rounded-lg"
            />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-300">
              OFFICIAL REGISTRATION DESK (MAX 30 ENTRIES)
            </span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight font-heading">
            {registeredData ? "Registration Confirmed" : "Swachh Bharat Week 2026 Registration"}
          </h2>
          <p className="text-xs text-emerald-100 mt-1">PES Modern College of Engineering • Student Council</p>
        </div>

        {/* Top Quick Links Bar */}
        {!registeredData && (
          <div className="bg-slate-50 border-b border-slate-200 p-2.5 px-6 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1 text-slate-600">
              <span className="font-semibold text-emerald-800">Participation Certificate:</span>
              <span>Awarded to all valid entries</span>
            </div>
            <a
              href={EVENT_CONFIG.googleSheet.sheetUrl}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-300"
            >
              <FileSpreadsheet className="w-3 h-3 text-emerald-600" />
              <span>Google Sheet</span>
            </a>
          </div>
        )}

        {/* Modal Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {registeredData ? (
            /* SUCCESS CONFIRMATION SLIP WITH PRINT OPTION */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  YOUR UNIQUE REGISTRATION ID
                </span>
                <div className="mt-2 inline-flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-xl border border-slate-800 shadow-md">
                  <span className="font-mono text-2xl sm:text-3xl font-black tracking-wider text-emerald-400">
                    {registeredData.id}
                  </span>
                  <button
                    onClick={handleCopyId}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                    title="Copy Registration ID"
                  >
                    {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                {copied && <p className="text-xs text-emerald-600 font-semibold mt-1.5">Copied to clipboard!</p>}
              </div>

              {/* Email Acknowledgment Notice */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-900 flex items-center gap-2.5 text-left">
                <MailCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                <div>
                  <strong className="block font-bold">Acknowledgment & Receipt Dispatched</strong>
                  <p className="text-[11px] text-emerald-800">
                    An official digital receipt has been sent to <strong>{registeredData.leaderEmail}</strong>.
                  </p>
                </div>
              </div>

              {/* Registration Printable Slip Card */}
              <div id="printable-receipt-card" className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-extrabold uppercase text-slate-900 text-[11px] font-heading">
                    PES MCOE SWACHH BHARAT WEEK 2026 RECEIPT
                  </span>
                  <span className="font-mono text-emerald-800 font-bold">{registeredData.id}</span>
                </div>

                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Event Activity:</span>
                  <span className="font-bold text-slate-900">{registeredData.eventTitle}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Team Name:</span>
                  <span className="font-bold text-slate-900">{registeredData.teamName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Team Leader:</span>
                  <span className="font-bold text-slate-900">
                    {registeredData.leaderName} ({registeredData.leaderPhone})
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Department & Year:</span>
                  <span className="font-bold text-slate-900">
                    {registeredData.branch} • {registeredData.year} ({registeredData.division})
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Registered Squad ({registeredData.members.length}):</span>
                  <span className="font-bold text-slate-900">
                    {registeredData.members.map((m) => m.name).join(", ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Certificate Eligibility:</span>
                  <span className="font-bold text-emerald-800">Confirmed (E-Certificate of Participation)</span>
                </div>
              </div>

              {/* Action Buttons: Print Slip, Drive, Submit */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrintSlip}
                  className="px-4 py-2.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>Print Receipt / Save PDF</span>
                </button>

                <a
                  href={EVENT_CONFIG.googleDrive.rootFolderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 text-xs font-bold text-orange-800 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <UploadCloud className="w-4 h-4 text-orange-600" />
                  <span>Open Drive Folder</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => {
                    onClose();
                    onSuccessSubmitRedirect(registeredData.id);
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <span>Go to Submission Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* REGISTRATION FORM (PRN REMOVED) */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 text-xs text-red-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Event Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Select Event Activity <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedEventId}
                  onChange={(e) => {
                    setSelectedEventId(e.target.value);
                    setAdditionalMembers([]);
                  }}
                  className="w-full text-xs sm:text-sm font-semibold p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-hidden cursor-pointer"
                >
                  {EVENT_CONFIG.events.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.number} — {ev.title} (Team: {ev.teamSize} • Limit 30)
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  {currentEvent.title} allows <strong>{currentEvent.teamSize}</strong> ({minRequiredMembers} to {maxAllowedMembers} students). Max 30 team entries accepted.
                </p>
              </div>

              {/* Team Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Team Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. EcoVisionaries or CleanSquad"
                  required
                  className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-hidden"
                />
              </div>

              {/* Team Leader Details */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Primary Participant / Team Leader Details
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    LEAD
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={leaderName}
                      onChange={(e) => setLeaderName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      required
                      className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Mobile Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={leaderPhone}
                      onChange={(e) => setLeaderPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      required
                      className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      College Email Address (For digital receipt & certificate) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={leaderEmail}
                      onChange={(e) => setLeaderEmail(e.target.value)}
                      placeholder="e.g. student@moderncoe.edu.in"
                      required
                      className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    />
                  </div>
                </div>

                {/* Academic Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-200">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Department</label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full text-[11px] p-2 bg-white border border-slate-300 rounded-lg outline-hidden"
                    >
                      {EVENT_CONFIG.branches.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Year</label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full text-[11px] p-2 bg-white border border-slate-300 rounded-lg outline-hidden"
                    >
                      {EVENT_CONFIG.years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Division</label>
                    <select
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                      className="w-full text-[11px] p-2 bg-white border border-slate-300 rounded-lg outline-hidden"
                    >
                      {EVENT_CONFIG.divisions.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Dynamic Additional Team Members (PRN Removed) */}
              {maxAllowedMembers > 1 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Additional Squad Members ({additionalMembers.length + 1} / {maxAllowedMembers})
                    </label>
                    {currentTotalMembers < maxAllowedMembers && (
                      <button
                        type="button"
                        onClick={handleAddMember}
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Member</span>
                      </button>
                    )}
                  </div>

                  {additionalMembers.map((m, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2 relative">
                      <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                        <span className="text-[11px] font-bold text-slate-700">Member #{idx + 2}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(idx)}
                          className="text-red-500 hover:text-red-700 p-1 rounded cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Member Full Name"
                          value={m.name}
                          onChange={(e) => handleMemberChange(idx, "name", e.target.value)}
                          className="text-xs p-2 bg-white border border-slate-300 rounded-lg outline-hidden"
                          required
                        />
                        <input
                          type="email"
                          placeholder="Email (Optional)"
                          value={m.email || ""}
                          onChange={(e) => handleMemberChange(idx, "email", e.target.value)}
                          className="text-xs p-2 bg-white border border-slate-300 rounded-lg outline-hidden"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Rules Consent */}
              <div className="pt-2 border-t border-slate-200">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-500 border-slate-300 mt-0.5 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 leading-snug">
                    I agree to the institutional rules and safety code of PES Modern College of Engineering.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-4 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>Registering Squad & Generating Receipt...</span>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Complete Registration & Generate ID</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

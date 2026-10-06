"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  CheckCircle2,
  Users,
  Building,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { CouncilEvent, EventRegistration } from "@/lib/types";
import { COUNCIL_CONFIG } from "@/config/councilConfig";

interface EventRegistrationModalProps {
  event: CouncilEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (registration: EventRegistration) => void;
}

export default function EventRegistrationModal({
  event,
  isOpen,
  onClose,
  onSuccess,
}: EventRegistrationModalProps) {
  const [formData, setFormData] = useState({
    studentName: "",
    collegeName: "PES’s Modern College of Engineering, Pune",
    department: "Artificial Intelligence & Data Science",
    academicYear: "TE",
    prn: "",
    phone: "",
    email: "",
    teamName: "",
    teamSize: 1,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmedReg, setConfirmedReg] = useState<EventRegistration | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.studentName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setError("Please fill in all mandatory fields (Name, Phone, Email).");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/event-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          eventTitle: event.title,
          ...formData,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit registration");
      }

      setConfirmedReg(data.data);
      if (onSuccess) onSuccess(data.data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyRef = () => {
    if (!confirmedReg) return;
    navigator.clipboard.writeText(confirmedReg.referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl my-8 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-red-900 via-red-800 to-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
              Official Registration Desk
            </span>
            <h3 className="text-base sm:text-lg font-bold font-heading line-clamp-1">
              {event.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {confirmedReg ? (
          <div className="p-6 sm:p-8 space-y-5 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-300">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-extrabold text-slate-900 font-heading">
                Registration Confirmed!
              </h4>
              <p className="text-xs text-slate-700">
                Your entry for <strong>{event.title}</strong> has been officially recorded with the Students’ Council.
              </p>
            </div>

            {/* Reference Box */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white text-left space-y-2 border border-slate-800 shadow-md">
              <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider block">
                Registration Reference ID
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-black font-mono text-white tracking-wide">
                  {confirmedReg.referenceNumber}
                </span>

                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-0.5">
                <p>Candidate: {confirmedReg.studentName} ({confirmedReg.academicYear} - {confirmedReg.department})</p>
                <p>College: {confirmedReg.collegeName}</p>
                {confirmedReg.teamName && <p>Team: {confirmedReg.teamName} ({confirmedReg.teamSize} members)</p>}
              </div>
            </div>

            <p className="text-xs text-slate-700">
              Please save this Reference ID. Show it at the registration desk on the day of the event along with your valid College Identity Card.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors"
            >
              Done &amp; Return to Portal
            </button>
          </div>
        ) : (
          /* Interactive Registration Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs text-slate-700 max-h-[80vh] overflow-y-auto">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Event Summary Pill */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-800">
                Venue: {event.venue}
              </span>
              <span className="font-bold text-red-800">
                Fee: {event.entryFee}
              </span>
            </div>

            {/* Form Fields Grid */}
            <div className="space-y-3">
              {/* Full Name */}
              <div>
                <label className="font-bold text-slate-900 block mb-1">
                  Full Name (Candidate / Team Leader) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan V. Kulkarni"
                  value={formData.studentName}
                  onChange={(e) =>
                    setFormData({ ...formData, studentName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-xs text-slate-900"
                />
              </div>

              {/* College Name */}
              <div>
                <label className="font-bold text-slate-900 block mb-1">
                  College Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PES’s Modern College of Engineering, Pune"
                  value={formData.collegeName}
                  onChange={(e) =>
                    setFormData({ ...formData, collegeName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-xs text-slate-900"
                />
              </div>

              {/* Department & Year (2 Col) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-900 block mb-1">
                    Department *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-xs text-slate-900 bg-white"
                  >
                    {COUNCIL_CONFIG.departments.map((dept) => (
                      <option key={dept.code} value={dept.name}>
                        {dept.short} ({dept.name})
                      </option>
                    ))}
                    <option value="First Year Engineering (FE)">
                      First Year Engineering (FE)
                    </option>
                    <option value="Other External Branch">
                      Other / External College Branch
                    </option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-900 block mb-1">
                    Academic Year *
                  </label>
                  <select
                    value={formData.academicYear}
                    onChange={(e) =>
                      setFormData({ ...formData, academicYear: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-xs text-slate-900 bg-white"
                  >
                    <option value="FE">First Year (FE)</option>
                    <option value="SE">Second Year (SE)</option>
                    <option value="TE">Third Year (TE)</option>
                    <option value="BE">Final Year (BE)</option>
                    <option value="FY_MCA">FY - MCA</option>
                    <option value="SY_MCA">SY - MCA</option>
                    <option value="FY_MBA">FY - MBA</option>
                    <option value="SY_MBA">SY - MBA</option>
                  </select>
                </div>
              </div>

              {/* PRN / Roll & Phone (2 Col) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-900 block mb-1">
                    College PRN / Roll Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 72145892K or Roll 34"
                    value={formData.prn}
                    onChange={(e) =>
                      setFormData({ ...formData, prn: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-xs text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-900 block mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98220 12345"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-xs text-slate-900"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="font-bold text-slate-900 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. student@moderncoe.edu.in"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-xs text-slate-900"
                />
              </div>

              {/* Team Name & Size (Optional for individual/teams) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-900 block mb-1">
                    Team Name (if applicable)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. NeuralWeavers"
                    value={formData.teamName}
                    onChange={(e) =>
                      setFormData({ ...formData, teamName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-900 block mb-1">
                    Team Size
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) =>
                      setFormData({ ...formData, teamSize: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-xs text-slate-900 bg-white"
                  >
                    <option value={1}>Individual (1 Member)</option>
                    <option value={2}>Duo (2 Members)</option>
                    <option value={3}>Trio (3 Members)</option>
                    <option value={4}>Squad (4 Members)</option>
                  </select>
                </div>
              </div>

              {/* Message / Project Idea */}
              <div>
                <label className="font-bold text-slate-900 block mb-1">
                  Project Title / Note (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief note on your project track or team details..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-xs text-slate-900 resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-red-800 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-900/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {loading ? "Submitting Registration..." : "Confirm & Submit Registration"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileQuickBar from "@/components/MobileQuickBar";
import {
  MessageSquare,
  Handshake,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Building2,
  Radio,
  Instagram,
  Sparkles,
  Lock,
  ArrowRight,
  Send,
} from "lucide-react";
import { SiteSettings, StudentVoiceSubmission, SponsorshipEnquiry, PartnershipType } from "@/lib/types";
import { COUNCIL_CONFIG } from "@/config/councilConfig";

interface StudentVoiceClientPageProps {
  initialSettings: SiteSettings;
}

export default function StudentVoiceClientPage({
  initialSettings,
}: StudentVoiceClientPageProps) {
  const [activeTab, setActiveTab] = useState<"voice" | "sponsorship">("voice");

  // Workflow B: Student Voice Form
  const [voiceData, setVoiceData] = useState({
    category: "CLUB_PROPOSAL",
    studentName: "",
    department: "Artificial Intelligence & Data Science",
    academicYear: "TE",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [voiceConfirmed, setVoiceConfirmed] = useState<StudentVoiceSubmission | null>(null);
  const [voiceCopied, setVoiceCopied] = useState(false);

  // Workflow C: Sponsorship Form
  const [sponData, setSponData] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    partnershipType: "TITLE_SPONSOR" as PartnershipType,
    targetEvent: "M-PULSE 2027 & SPANDAN 2027",
    message: "",
  });
  const [sponLoading, setSponLoading] = useState(false);
  const [sponError, setSponError] = useState("");
  const [sponConfirmed, setSponConfirmed] = useState<SponsorshipEnquiry | null>(null);
  const [sponCopied, setSponCopied] = useState(false);

  const instagramUrl =
    initialSettings?.instagramUrl || COUNCIL_CONFIG.socials.instagram.url;
  const whatsappUrl =
    initialSettings?.whatsappChannelUrl || COUNCIL_CONFIG.socials.whatsappChannel.url;

  // Submit Student Voice
  const handleVoiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVoiceError("");

    if (!voiceData.studentName.trim() || !voiceData.email.trim() || !voiceData.subject.trim() || !voiceData.message.trim()) {
      setVoiceError("Please fill in all mandatory fields.");
      return;
    }

    setVoiceLoading(true);

    try {
      const res = await fetch("/api/student-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(voiceData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit proposal");
      }

      setVoiceConfirmed(data.data);
    } catch (err: unknown) {
      setVoiceError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setVoiceLoading(false);
    }
  };

  // Submit Sponsorship
  const handleSponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSponError("");

    if (!sponData.organizationName.trim() || !sponData.contactPerson.trim() || !sponData.email.trim() || !sponData.phone.trim() || !sponData.message.trim()) {
      setSponError("Please fill in all required contact and organization fields.");
      return;
    }

    setSponLoading(true);

    try {
      const res = await fetch("/api/sponsorships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sponData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit sponsorship enquiry");
      }

      setSponConfirmed(data.data);
    } catch (err: unknown) {
      setSponError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setSponLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-red-100 selection:text-red-900 pb-16 lg:pb-0">
      <Navbar settings={initialSettings} />

      <main className="flex-1">
        {/* HERO BANNER */}
        <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-12 lg:py-16 px-4 border-b border-slate-800 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-3.5 py-1 rounded-full border border-amber-400/30">
              Direct Contact &amp; Collaboration
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-heading">
              Student Voice &amp; Sponsorships
            </h1>
            <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto">
              Submit club workshop proposals, fest volunteering applications, feedback, or corporate sponsorship enquiries to the Students’ Council.
            </p>
          </div>
        </div>

        {/* 2-TAB FORM SELECTOR STRIP */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="p-1.5 rounded-2xl bg-slate-100 border border-slate-200 grid grid-cols-2 gap-1.5 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab("voice")}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "voice"
                  ? "bg-white text-red-900 shadow-md border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <MessageSquare className="w-4 h-4 text-red-800" />
              <span>Identified Student Voice</span>
            </button>

            <button
              type="button"
              id="sponsorship"
              onClick={() => setActiveTab("sponsorship")}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "sponsorship"
                  ? "bg-slate-900 text-amber-300 shadow-md border border-amber-500/40"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Handshake className="w-4 h-4 text-amber-400" />
              <span>Sponsorship &amp; Brand Partners</span>
            </button>
          </div>
        </div>

        {/* FORM CONTAINER */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* TAB 1: IDENTIFIED STUDENT VOICE */}
          {activeTab === "voice" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                    Identified Student Proposal &amp; Feedback Form
                  </h2>
                  <p className="text-xs text-slate-700">
                    For students who want the Council or Faculty Advisor to follow up directly with them.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-800 border border-red-200">
                  Direct Reply
                </span>
              </div>

              {/* Note on Anonymous Option */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    Prefer to submit without your name or contact info?
                  </span>
                </div>
                <a
                  href="/anonymous-portal"
                  className="px-3 py-1 rounded-lg bg-slate-900 text-amber-300 font-bold text-[11px] shrink-0 hover:bg-slate-800"
                >
                  Use 100% Anonymous Shield 🔒
                </a>
              </div>

              {voiceConfirmed ? (
                <div className="p-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    Proposal Submitted Successfully!
                  </h3>
                  <div className="p-4 rounded-2xl bg-slate-900 text-white text-left space-y-2 max-w-md mx-auto">
                    <span className="text-[10px] text-amber-400 font-bold uppercase">
                      Reference ID
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-black font-mono text-white">
                        {voiceConfirmed.referenceNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            voiceConfirmed.referenceNumber
                          );
                          setVoiceCopied(true);
                          setTimeout(() => setVoiceCopied(false), 2000);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-800 text-amber-300 text-xs font-semibold"
                      >
                        {voiceCopied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700">
                    The General Secretary and Faculty Advisor committee will review your proposal and reply via email or phone.
                  </p>
                  <button
                    type="button"
                    onClick={() => setVoiceConfirmed(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold"
                  >
                    Submit Another Proposal
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVoiceSubmit} className="space-y-4 text-xs">
                  {voiceError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700">
                      {voiceError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-900 block mb-1">
                        Proposal Category *
                      </label>
                      <select
                        value={voiceData.category}
                        onChange={(e) =>
                          setVoiceData({ ...voiceData, category: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                      >
                        <option value="CLUB_PROPOSAL">Club / Workshop Proposal</option>
                        <option value="EVENT_IDEA">New Event Track Idea</option>
                        <option value="VOLUNTEERING">Fest Organizing Volunteer</option>
                        <option value="CAMPUS_IMPROVEMENT">Campus Facility Improvement</option>
                        <option value="GENERAL_FEEDBACK">General Student Feedback</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-900 block mb-1">
                        Student Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shantanu Gokhale"
                        value={voiceData.studentName}
                        onChange={(e) =>
                          setVoiceData({ ...voiceData, studentName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-900 block mb-1">
                        Department *
                      </label>
                      <select
                        value={voiceData.department}
                        onChange={(e) =>
                          setVoiceData({ ...voiceData, department: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                      >
                        {COUNCIL_CONFIG.departments.map((dept) => (
                          <option key={dept.code} value={dept.name}>
                            {dept.name} ({dept.short})
                          </option>
                        ))}
                        <option value="First Year Engineering (FE)">First Year Engineering (FE)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-900 block mb-1">
                        Academic Year *
                      </label>
                      <select
                        value={voiceData.academicYear}
                        onChange={(e) =>
                          setVoiceData({ ...voiceData, academicYear: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                      >
                        <option value="FE">First Year (FE)</option>
                        <option value="SE">Second Year (SE)</option>
                        <option value="TE">Third Year (TE)</option>
                        <option value="BE">Final Year (BE)</option>
                        <option value="MCA">MCA</option>
                        <option value="MBA">MBA</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-900 block mb-1">
                        Email ID *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. shantanu.g@moderncoe.edu.in"
                        value={voiceData.email}
                        onChange={(e) =>
                          setVoiceData({ ...voiceData, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-900 block mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98810 44332"
                        value={voiceData.phone}
                        onChange={(e) =>
                          setVoiceData({ ...voiceData, phone: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-900 block mb-1">
                      Subject / Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Proposal to conduct 6-week DevOps & Cloud Study Jam"
                      value={voiceData.subject}
                      onChange={(e) =>
                        setVoiceData({ ...voiceData, subject: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-900 block mb-1">
                      Detailed Proposal / Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe the plan, volunteers, required lab support, and expected benefits for students..."
                      value={voiceData.message}
                      onChange={(e) =>
                        setVoiceData({ ...voiceData, message: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={voiceLoading}
                    className="w-full py-3.5 rounded-xl bg-red-800 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-transform hover:scale-101 active:scale-99 disabled:opacity-50"
                  >
                    {voiceLoading ? "Submitting..." : "Submit Proposal to Council"}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: SPONSORSHIP & PARTNERSHIP ENQUIRY */}
          {activeTab === "sponsorship" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-amber-500/40 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white font-heading">
                    Sponsorship, Media &amp; Inter-College Collaboration
                  </h2>
                  <p className="text-xs text-slate-400">
                    Partner with PES MCOE Students’ Council for flagship fests, hackathons, and stalls.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Brand Connect
                </span>
              </div>

              {sponConfirmed ? (
                <div className="p-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center border border-amber-400/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    Enquiry Received!
                  </h3>
                  <div className="p-4 rounded-2xl bg-slate-950 text-white text-left space-y-2 max-w-md mx-auto border border-slate-800">
                    <span className="text-[10px] text-amber-400 font-bold uppercase">
                      Partnership Reference ID
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-black font-mono text-white">
                        {sponConfirmed.referenceNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            sponConfirmed.referenceNumber
                          );
                          setSponCopied(true);
                          setTimeout(() => setSponCopied(false), 2000);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-800 text-amber-300 text-xs font-semibold"
                      >
                        {sponCopied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300">
                    Our Council Public Relations &amp; Sponsorship Desk will reach out to you within 24–48 hours with our official sponsorship brochure and deck.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSponConfirmed(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSponSubmit} className="space-y-4 text-xs text-slate-300">
                  {sponError && (
                    <div className="p-3 rounded-xl bg-red-950 border border-red-700 text-red-200">
                      {sponError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-white block mb-1">
                        Company / Brand / Organization Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Persistent Systems / Red Bull"
                        value={sponData.organizationName}
                        onChange={(e) =>
                          setSponData({ ...sponData, organizationName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-white block mb-1">
                        Contact Person Name &amp; Designation *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mahesh Kadam (Campus Lead)"
                        value={sponData.contactPerson}
                        onChange={(e) =>
                          setSponData({ ...sponData, contactPerson: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-white block mb-1">
                        Official Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. outreach@persistent.com"
                        value={sponData.email}
                        onChange={(e) =>
                          setSponData({ ...sponData, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-white block mb-1">
                        Phone / Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98200 12345"
                        value={sponData.phone}
                        onChange={(e) =>
                          setSponData({ ...sponData, phone: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-white block mb-1">
                        Partnership Type *
                      </label>
                      <select
                        value={sponData.partnershipType}
                        onChange={(e) =>
                          setSponData({
                            ...sponData,
                            partnershipType: e.target.value as PartnershipType,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 outline-none"
                      >
                        <option value="TITLE_SPONSOR">Title Fest Sponsor</option>
                        <option value="CO_SPONSOR">Co-Sponsor / Powered By</option>
                        <option value="STALL_PARTNER">Campus Stall / Booth Partner</option>
                        <option value="WORKSHOP_PARTNER">Technical Workshop &amp; Hackathon Partner</option>
                        <option value="INTER_COLLEGE_INVITE">Inter-Collegiate Fest Contingent Invite</option>
                        <option value="MEDIA_PARTNER">Media &amp; Press Partner</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-white block mb-1">
                        Target Event
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. M-PULSE 2027 / HACK-AI 2027"
                        value={sponData.targetEvent}
                        onChange={(e) =>
                          setSponData({ ...sponData, targetEvent: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-white block mb-1">
                      Partnership Proposal / Scope Note *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Outline your sponsorship deliverables, hackathon problem statement tracks, or stall requirements..."
                      value={sponData.message}
                      onChange={(e) =>
                        setSponData({ ...sponData, message: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white resize-none focus:border-amber-400 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sponLoading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-xl transition-all hover:scale-101 active:scale-99 disabled:opacity-50"
                  >
                    {sponLoading ? "Sending Enquiry..." : "Submit Sponsorship Enquiry ↗"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* CAMPUS CONTACT & LOCATION STRIP */}
        <div className="bg-slate-50 py-12 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>Campus Address</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  1186/A, Off J.M. Road, Shivajinagar, Pune, Maharashtra 411005 (Opp. Modern High School)
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
                  <Mail className="w-4 h-4" />
                  <span>Email Contacts</span>
                </div>
                <p className="text-xs text-slate-700">
                  Council: <a href={`mailto:${COUNCIL_CONFIG.council.email}`} className="font-semibold text-red-800 underline">{COUNCIL_CONFIG.council.email}</a>
                </p>
                <p className="text-xs text-slate-700">
                  Principal Desk: <span className="font-semibold">principal@moderncoe.edu.in</span>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
                  <Phone className="w-4 h-4" />
                  <span>Telephone &amp; Social</span>
                </div>
                <p className="text-xs text-slate-700">
                  Phones: {COUNCIL_CONFIG.council.contactPhones.join(" • ")}
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold text-xs hover:underline flex items-center gap-1">
                    <Radio className="w-3 h-3" /> WhatsApp
                  </a>
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-pink-700 font-bold text-xs hover:underline flex items-center gap-1">
                    <Instagram className="w-3 h-3" /> Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer settings={initialSettings} />
      <MobileQuickBar settings={initialSettings} />
    </div>
  );
}

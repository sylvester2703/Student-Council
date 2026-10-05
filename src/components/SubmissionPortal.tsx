"use client";

import React, { useState, useEffect } from "react";
import {
  UploadCloud,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Shield,
  Trash2,
  Plus,
  Camera,
  FileText,
  Printer,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Info,
  FolderOpen,
} from "lucide-react";
import { EVENT_CONFIG } from "@/config/eventConfig";
import { RegistrationRecord, SubmissionRecord, WasteHuntFinding } from "@/lib/types";

interface SubmissionPortalProps {
  initialRegId?: string;
  onOpenRegister: () => void;
}

export const SubmissionPortal: React.FC<SubmissionPortalProps> = ({ initialRegId, onOpenRegister }) => {
  // Step State
  const [currentStep, setCurrentStep] = useState<"LOOKUP" | "FORM" | "SUCCESS">("LOOKUP");
  const [regIdInput, setRegIdInput] = useState(initialRegId || "");
  const [loadingLookup, setLoadingLookup] = useState(false);
  const [lookupError, setLookupError] = useState("");

  // Verified Data
  const [verifiedRegistration, setVerifiedRegistration] = useState<RegistrationRecord | null>(null);
  const [existingSubmission, setExistingSubmission] = useState<SubmissionRecord | null>(null);

  // Form Fields
  const [submissionTitle, setSubmissionTitle] = useState("");
  const [conceptNote, setConceptNote] = useState("");
  const [videoDurationSeconds, setVideoDurationSeconds] = useState<number | undefined>(undefined);

  // General File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string>("");
  const [fileError, setFileError] = useState("");

  // Waste Hunt Specific Findings (up to 5 findings)
  const [wasteHuntFindings, setWasteHuntFindings] = useState<WasteHuntFinding[]>([
    {
      findingNumber: 1,
      title: "",
      zone: EVENT_CONFIG.wasteHuntZones[0].name,
      specificLocation: "",
      problemDescription: "",
      identifiedCause: "",
      proposedSolution: "",
    },
  ]);

  // Submission Processing
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmedSubmission, setConfirmedSubmission] = useState<SubmissionRecord | null>(null);

  useEffect(() => {
    if (initialRegId) {
      setRegIdInput(initialRegId);
      handleLookup(initialRegId);
    }
  }, [initialRegId]);

  const handleLookup = async (idToLookUp?: string) => {
    const targetId = (idToLookUp || regIdInput).trim().toUpperCase();
    if (!targetId) {
      setLookupError("Please enter your Registration ID (e.g. SBW-2026-001).");
      return;
    }

    setLoadingLookup(true);
    setLookupError("");

    try {
      const res = await fetch(`/api/submissions?registrationId=${encodeURIComponent(targetId)}`);
      const data = await res.json();

      if (!res.ok) {
        setLookupError(data.error || "No registration found with this ID.");
        setLoadingLookup(false);
        return;
      }

      setVerifiedRegistration(data.registration);
      if (data.existingSubmission) {
        setExistingSubmission(data.existingSubmission);
        setSubmissionTitle(data.existingSubmission.submissionTitle || "");
        setConceptNote(data.existingSubmission.conceptNote || "");
        setVideoDurationSeconds(data.existingSubmission.videoDurationSeconds);
        if (data.existingSubmission.wasteHuntFindings) {
          setWasteHuntFindings(data.existingSubmission.wasteHuntFindings);
        }
      } else {
        setExistingSubmission(null);
        setSubmissionTitle("");
        setConceptNote("");
      }

      setCurrentStep("FORM");
      setLoadingLookup(false);
    } catch {
      setLookupError("Failed to verify registration. Please check your internet connection.");
      setLoadingLookup(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const event = EVENT_CONFIG.events.find((ev) => ev.id === verifiedRegistration?.eventId);

      if (event && file.size > event.maxFileSizeBytes) {
        const maxMb = Math.round(event.maxFileSizeBytes / (1024 * 1024));
        setFileError(`File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds maximum ${maxMb}MB allowed.`);
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFileBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Waste Hunt Helpers
  const handleAddFinding = () => {
    if (wasteHuntFindings.length < 5) {
      setWasteHuntFindings([
        ...wasteHuntFindings,
        {
          findingNumber: wasteHuntFindings.length + 1,
          title: "",
          zone: EVENT_CONFIG.wasteHuntZones[0].name,
          specificLocation: "",
          problemDescription: "",
          identifiedCause: "",
          proposedSolution: "",
        },
      ]);
    }
  };

  const handleRemoveFinding = (index: number) => {
    if (wasteHuntFindings.length > 1) {
      const updated = wasteHuntFindings.filter((_, i) => i !== index).map((f, i) => ({ ...f, findingNumber: i + 1 }));
      setWasteHuntFindings(updated);
    }
  };

  const handleFindingChange = (index: number, field: keyof WasteHuntFinding, value: string) => {
    const updated = [...wasteHuntFindings];
    updated[index] = { ...updated[index], [field]: value };
    setWasteHuntFindings(updated);
  };

  const handleFindingPhoto = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = [...wasteHuntFindings];
        updated[index] = {
          ...updated[index],
          photoFileName: file.name,
          photoBase64OrUrl: reader.result as string,
        };
        setWasteHuntFindings(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitWork = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!verifiedRegistration) return;

    if (!submissionTitle.trim()) {
      setSubmitError("Please enter a Submission Title.");
      return;
    }

    if (verifiedRegistration.eventId === "waste-hunt") {
      for (let i = 0; i < wasteHuntFindings.length; i++) {
        const f = wasteHuntFindings[i];
        if (!f.title || !f.specificLocation || !f.problemDescription || !f.identifiedCause || !f.proposedSolution) {
          setSubmitError(`Finding #${i + 1} has incomplete fields. Please fill in all details.`);
          return;
        }
      }
    } else if (verifiedRegistration.eventId === "reel-making") {
      if (!selectedFile && !existingSubmission?.fileName) {
        setSubmitError("Please upload your MP4 reel video file.");
        return;
      }
      if (videoDurationSeconds && videoDurationSeconds > 90) {
        setSubmitError("Reel duration cannot exceed 90 seconds.");
        return;
      }
    } else {
      if (!selectedFile && !existingSubmission?.fileName) {
        setSubmitError("Please attach your submission file.");
        return;
      }
    }

    setSubmitting(true);

    try {
      const payload = {
        registrationId: verifiedRegistration.id,
        submissionTitle: submissionTitle.trim(),
        conceptNote: conceptNote.trim(),
        videoDurationSeconds,
        fileName: selectedFile ? selectedFile.name : existingSubmission?.fileName,
        fileSizeBytes: selectedFile ? selectedFile.size : existingSubmission?.fileSizeBytes,
        fileType: selectedFile ? selectedFile.type : existingSubmission?.fileType,
        fileDataOrUrl: fileBase64 || existingSubmission?.fileDataOrUrl,
        wasteHuntFindings: verifiedRegistration.eventId === "waste-hunt" ? wasteHuntFindings : undefined,
      };

      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Failed to process submission.");
        setSubmitting(false);
        return;
      }

      setConfirmedSubmission(data.submission);
      setCurrentStep("SUCCESS");
      setSubmitting(false);
    } catch {
      setSubmitError("Network error occurred during submission. Please try again.");
      setSubmitting(false);
    }
  };

  const currentEvent = EVENT_CONFIG.events.find((e) => e.id === verifiedRegistration?.eventId);

  return (
    <section id="submit" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="flex items-center justify-center gap-2">
            <img
              src={EVENT_CONFIG.college.logos.swachhBharat}
              alt="Swachh Bharat Emblem"
              className="h-9 w-auto"
            />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
            <UploadCloud className="w-3.5 h-3.5" />
            <span>SUBMISSION & GOOGLE DRIVE DESK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Submit Your Event Entry
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Choose your preferred submission method: Upload directly into the official organizer Google Drive or submit via the portal.
          </p>
        </div>

        {/* Big Direct Google Drive Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-md mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
              <FolderOpen className="w-4 h-4" />
              <span>DIRECT GOOGLE DRIVE ACCESS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-heading">
              Official Organizer Google Drive Folder
            </h3>
            <p className="text-xs sm:text-sm text-orange-100 max-w-lg">
              Event folders for Poster Making, Reel Making, and Waste Hunt are created inside the drive root.
            </p>
          </div>

          <a
            href={EVENT_CONFIG.googleDrive.rootFolderUrl}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 bg-white hover:bg-orange-50 text-orange-900 font-extrabold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer active:scale-98"
          >
            <UploadCloud className="w-5 h-5 text-orange-600" />
            <span>Open Google Drive Folder</span>
            <ExternalLink className="w-4 h-4 text-orange-500" />
          </a>
        </div>

        {/* Step 1: Lookup Registration ID */}
        {currentStep === "LOOKUP" && (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs max-w-xl mx-auto space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">Submit via Portal with Registration ID</h3>
                <p className="text-xs text-slate-500">Auto-organizes your files and generates official submission receipt</p>
              </div>
            </div>

            {lookupError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 text-xs text-red-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{lookupError}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Enter Registration ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={regIdInput}
                  onChange={(e) => setRegIdInput(e.target.value)}
                  placeholder="e.g. SBW-2026-001"
                  className="w-full p-3.5 bg-white border border-slate-300 rounded-xl text-sm font-mono font-bold uppercase tracking-wider focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Sample demo IDs: <code>SBW-2026-001</code>, <code>SBW-2026-002</code>, <code>SBW-2026-003</code>
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleLookup()}
                disabled={loadingLookup}
                className="w-full py-3.5 px-4 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loadingLookup ? <span>Verifying ID...</span> : <span>Verify & Continue to Upload</span>}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={onOpenRegister}
                  className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
                >
                  Haven&apos;t registered your squad yet? Register here →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Submission Form */}
        {currentStep === "FORM" && verifiedRegistration && (
          <form onSubmit={handleSubmitWork} className="space-y-6">
            {/* Squad Verification Header */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      {verifiedRegistration.id}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{verifiedRegistration.eventTitle}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mt-0.5">
                    Team: {verifiedRegistration.teamName} ({verifiedRegistration.leaderName})
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {verifiedRegistration.branch} • {verifiedRegistration.year}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCurrentStep("LOOKUP")}
                className="text-xs font-bold text-slate-600 bg-white hover:bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Change ID
              </button>
            </div>

            {existingSubmission && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Existing Submission Found (Revision #{existingSubmission.revision}):</strong> You can edit
                  and replace your submission before the deadline without duplicate entries.
                </div>
              </div>
            )}

            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            {/* General Fields */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Submission Title / Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={submissionTitle}
                  onChange={(e) => setSubmissionTitle(e.target.value)}
                  placeholder="e.g. Smart Campus Waste Segregation Plan"
                  required
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Concept Note & Message
                </label>
                <textarea
                  value={conceptNote}
                  onChange={(e) => setConceptNote(e.target.value)}
                  placeholder="Briefly describe your concept, message, or solution..."
                  rows={3}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-hidden resize-y"
                />
              </div>

              {verifiedRegistration.eventId === "reel-making" && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Reel Video Duration (Seconds) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={videoDurationSeconds || ""}
                    onChange={(e) => setVideoDurationSeconds(Number(e.target.value))}
                    placeholder="e.g. 75"
                    required
                    className="w-full sm:w-48 p-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm outline-hidden font-mono"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Maximum duration: 90 seconds.</p>
                </div>
              )}
            </div>

            {/* WASTE HUNT FINDINGS BUILDER */}
            {verifiedRegistration.eventId === "waste-hunt" ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      Campus Problem Findings ({wasteHuntFindings.length} / 5)
                    </h3>
                    <p className="text-xs text-slate-500">Document up to 5 verified campus cleanliness challenges</p>
                  </div>
                  {wasteHuntFindings.length < 5 && (
                    <button
                      type="button"
                      onClick={handleAddFinding}
                      className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Finding #{wasteHuntFindings.length + 1}</span>
                    </button>
                  )}
                </div>

                {wasteHuntFindings.map((finding, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 relative shadow-2xs"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-sky-700 text-white font-mono text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 font-heading">
                          Finding #{idx + 1} Details
                        </h4>
                      </div>
                      {wasteHuntFindings.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFinding(idx)}
                          className="text-red-500 hover:text-red-700 p-1 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                          1. Problem Headline <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Overflowing bin near water dispenser"
                          value={finding.title}
                          onChange={(e) => handleFindingChange(idx, "title", e.target.value)}
                          required
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                          2. Approved Zone <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={finding.zone}
                          onChange={(e) => handleFindingChange(idx, "zone", e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs outline-hidden"
                        >
                          {EVENT_CONFIG.wasteHuntZones.map((z) => (
                            <option key={z.id} value={`${z.code} - ${z.name}`}>
                              {z.code} — {z.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                        3. Exact Location on Campus <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ground Floor East Wing Staircase Landing"
                        value={finding.specificLocation}
                        onChange={(e) => handleFindingChange(idx, "specificLocation", e.target.value)}
                        required
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs outline-hidden"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                          4. Problem Description & Cause <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          placeholder="What is the issue and why did it happen?"
                          rows={2}
                          value={finding.problemDescription}
                          onChange={(e) => handleFindingChange(idx, "problemDescription", e.target.value)}
                          required
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                          5. Practical Suggested Solution <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          placeholder="How can this be solved permanently with low cost?"
                          rows={2}
                          value={finding.proposedSolution}
                          onChange={(e) => handleFindingChange(idx, "proposedSolution", e.target.value)}
                          required
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                        6. Upload Finding Photo (JPG / PNG)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFindingPhoto(idx, e)}
                        className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer"
                      />
                      {finding.photoFileName && (
                        <p className="text-[11px] text-emerald-700 font-medium mt-1">
                          Attached: {finding.photoFileName}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* FILE UPLOAD CARD */
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Attach Submission File ({currentEvent?.submissionFormat}) <span className="text-red-500">*</span>
                </label>

                {fileError && <p className="text-xs text-red-600 font-semibold">{fileError}</p>}

                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-emerald-400 bg-white transition-colors">
                  <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <input
                    type="file"
                    accept={currentEvent?.allowedFileTypes.join(",")}
                    onChange={handleFileChange}
                    className="text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-400 mt-2">
                    Allowed formats: {currentEvent?.allowedFileTypes.join(", ")} (Max:{" "}
                    {currentEvent ? Math.round(currentEvent.maxFileSizeBytes / (1024 * 1024)) : 15}MB)
                  </p>
                  {selectedFile && (
                    <p className="text-xs font-bold text-emerald-700 mt-2">
                      Selected: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Submit Action */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setCurrentStep("LOOKUP")}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-60 flex items-center gap-2"
              >
                {submitting ? (
                  <span>Processing Submission...</span>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    <span>{existingSubmission ? "Save Revised Submission" : "Confirm & Submit Work"}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success Confirmation Receipt */}
        {currentStep === "SUCCESS" && confirmedSubmission && (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 text-center space-y-6 max-w-2xl mx-auto shadow-xs">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                SUBMISSION CONFIRMED
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 font-heading mt-1">
                Thank You, {confirmedSubmission.teamName}!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your submission has been archived for jury evaluation.
              </p>
            </div>

            {/* Official Receipt Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 text-left text-xs space-y-2.5 shadow-2xs">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Submission ID:</span>
                <span className="font-mono font-bold text-slate-900">{confirmedSubmission.submissionId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Registration ID:</span>
                <span className="font-mono font-bold text-emerald-700">{confirmedSubmission.registrationId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Event:</span>
                <span className="font-bold text-slate-900">{confirmedSubmission.eventTitle}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Title:</span>
                <span className="font-bold text-slate-900">{confirmedSubmission.submissionTitle}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Submission Timestamp:</span>
                <span className="font-mono text-slate-700">
                  {new Date(confirmedSubmission.submittedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Revision Number:</span>
                <span className="font-bold text-slate-900">#{confirmedSubmission.revision}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Google Drive Target:</span>
                <a
                  href={EVENT_CONFIG.googleDrive.rootFolderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-orange-600 hover:underline flex items-center gap-1"
                >
                  <span>Open Drive Folder</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={() => {
                  setCurrentStep("LOOKUP");
                  setVerifiedRegistration(null);
                  setConfirmedSubmission(null);
                }}
                className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
              >
                Submit Another Entry
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

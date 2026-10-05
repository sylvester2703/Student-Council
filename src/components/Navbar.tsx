"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Lock,
  ExternalLink,
  ChevronDown,
  Palette,
  Video,
  Trash2,
  Sparkles,
  FileSpreadsheet,
  Users,
  Award,
  Calendar,
  FileText,
  Building2,
  FolderOpen,
} from "lucide-react";
import { EVENT_CONFIG } from "@/config/eventConfig";

interface NavbarProps {
  onOpenRegister: (eventId?: string) => void;
  onOpenSubmit: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister, onOpenSubmit, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activitiesDropdownOpen, setActivitiesDropdownOpen] = useState(false);

  const eventIcons: Record<string, React.ReactNode> = {
    "poster-making": <Palette className="w-4 h-4 text-emerald-600" />,
    "reel-making": <Video className="w-4 h-4 text-orange-600" />,
    "waste-hunt": <Trash2 className="w-4 h-4 text-sky-600" />,
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    setActivitiesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner with Direct Links to Google Drive, Sheet, and Council Admin */}
      <div className="bg-emerald-900 text-white text-[11px] sm:text-xs py-1.5 px-4 font-medium border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{EVENT_CONFIG.college.fullName} • NAAC &apos;A+&apos; Grade Accredited</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-emerald-100">
            {/* Direct Google Sheet Link */}
            <a
              href={EVENT_CONFIG.googleSheet.sheetUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-white text-[11px] bg-emerald-950/80 hover:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700/60 transition-colors"
              title="Open Official Google Sheet Roster"
            >
              <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
              <span>Google Sheet</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>

            {/* Direct Google Drive Link */}
            <a
              href={EVENT_CONFIG.googleDrive.rootFolderUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-white text-[11px] bg-emerald-950/80 hover:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700/60 transition-colors"
              title="Open Official Google Drive Folder"
            >
              <FolderOpen className="w-3 h-3 text-emerald-400" />
              <span>Drive</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>

            {/* Council Desk Login */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 hover:text-white cursor-pointer text-[11px] bg-emerald-800 hover:bg-emerald-700 px-2 py-0.5 rounded border border-emerald-600 transition-colors font-semibold"
              title="Organizer Portal Login (Admin@123)"
            >
              <Lock className="w-3 h-3 text-emerald-300" />
              <span>Council Desk</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo Header (Links to #home) */}
          <a href="#home" className="flex items-center gap-3 group focus:outline-hidden">
            {/* College Logo */}
            <div className="relative w-11 h-11 flex-shrink-0 bg-white border border-slate-200 rounded-lg p-1 shadow-2xs flex items-center justify-center overflow-hidden">
              <img
                src={EVENT_CONFIG.college.logos.college}
                alt="PES Modern College of Engineering Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>

            {/* Student Council Logo */}
            <div className="relative w-11 h-11 flex-shrink-0 bg-white border border-slate-200 rounded-lg p-1 shadow-2xs flex items-center justify-center overflow-hidden">
              <img
                src={EVENT_CONFIG.college.logos.council}
                alt="Student Council Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  STUDENT COUNCIL
                </span>
                <span className="text-[10px] font-semibold text-slate-500 hidden md:inline">PES MCOE PUNE</span>
              </div>
              <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight group-hover:text-emerald-700 transition-colors font-heading">
                STUDENT COUNCIL
              </span>
              <span className="text-[11px] font-medium text-slate-500">Official Student Governance Portal</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-700">
            {/* Home */}
            <a
              href="#home"
              className="px-3 py-1.5 rounded-lg hover:text-emerald-800 hover:bg-emerald-50 transition-colors font-bold text-slate-900"
            >
              Home
            </a>

            {/* Council Members */}
            <a
              href="#council-members"
              className="px-3 py-1.5 rounded-lg hover:text-emerald-800 hover:bg-emerald-50 transition-colors flex items-center gap-1"
            >
              <Users className="w-3.5 h-3.5 text-emerald-700" />
              <span>Council Members</span>
            </a>

            {/* About Council */}
            <a
              href="#about-council"
              className="px-3 py-1.5 rounded-lg hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
            >
              About Council
            </a>

            {/* Activities Dropdown: Swachh Bharat Week (Oct 7) */}
            <div className="relative" onMouseLeave={() => setActivitiesDropdownOpen(false)}>
              <button
                onClick={() => setActivitiesDropdownOpen(!activitiesDropdownOpen)}
                onMouseEnter={() => setActivitiesDropdownOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg hover:text-emerald-800 hover:bg-emerald-50 transition-colors cursor-pointer text-emerald-800 font-bold"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>Swachh Bharat Week (Oct 7)</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${activitiesDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {activitiesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                    3 Competitions (Oct 7 • 30 Max Entries)
                  </div>
                  {EVENT_CONFIG.events.map((ev) => (
                    <a
                      key={ev.id}
                      href="#events"
                      onClick={() => setActivitiesDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-800 hover:text-emerald-800 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                        {eventIcons[ev.id]}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">{ev.title}</span>
                        <span className="text-[10px] text-slate-500 font-normal">
                          {ev.teamSize} • Max 30
                        </span>
                      </div>
                    </a>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1 px-3 space-y-0.5">
                    <a
                      href="#waste-hunt-zones"
                      onClick={() => setActivitiesDropdownOpen(false)}
                      className="text-[11px] font-bold text-sky-700 hover:underline block py-1"
                    >
                      Waste Hunt Zones A–E →
                    </a>
                    <a
                      href="#submit"
                      onClick={() => setActivitiesDropdownOpen(false)}
                      className="text-[11px] font-bold text-orange-700 hover:underline block py-1"
                    >
                      Submit Entry / Upload Work →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            <a
              href="#results"
              className="px-3 py-1.5 rounded-lg hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
            >
              Results Desk
            </a>

            {/* Certificate Desk */}
            <a
              href="#certificates"
              className="px-3 py-1.5 rounded-lg hover:text-emerald-800 hover:bg-emerald-50 transition-colors flex items-center gap-1 font-semibold text-emerald-800"
            >
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Certificates</span>
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => onOpenRegister()}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-sm active:scale-98 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Register Squad</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenRegister()}
              className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 rounded-lg shadow-xs"
            >
              Register
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-lg focus:outline-hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-2.5 px-3 text-center text-xs font-bold text-white bg-emerald-700 rounded-lg shadow-xs cursor-pointer"
            >
              Register Squad (Oct 7)
            </button>
            <a
              href={EVENT_CONFIG.googleSheet.sheetUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 text-center text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-center gap-1"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Google Sheet</span>
            </a>
          </div>

          <div className="space-y-1 text-xs">
            <a
              href="#home"
              onClick={handleNavClick}
              className="block px-3 py-2 font-bold text-emerald-800 hover:bg-emerald-50 rounded-md"
            >
              Home (Student Council)
            </a>

            <a
              href="#council-members"
              onClick={handleNavClick}
              className="block px-3 py-2 font-medium text-slate-700 hover:bg-emerald-50 rounded-md"
            >
              Council Members & Team
            </a>

            <a
              href="#about-council"
              onClick={handleNavClick}
              className="block px-3 py-2 font-medium text-slate-700 hover:bg-emerald-50 rounded-md"
            >
              About Council & Wings
            </a>

            <div className="py-1 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Swachh Bharat Week (Oct 7)
            </div>
            {EVENT_CONFIG.events.map((ev) => (
              <a
                key={ev.id}
                href="#events"
                onClick={handleNavClick}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-md"
              >
                <span>{ev.number}.</span>
                <span>{ev.title} (Max 30)</span>
              </a>
            ))}

            <a
              href="#submit"
              onClick={handleNavClick}
              className="block px-3 py-2 font-medium text-slate-700 hover:bg-emerald-50 rounded-md"
            >
              Submission & Drive Desk
            </a>

            <a
              href="#results"
              onClick={handleNavClick}
              className="block px-3 py-2 font-medium text-slate-700 hover:bg-emerald-50 rounded-md"
            >
              Results & Leaderboard
            </a>

            <a
              href="#certificates"
              onClick={handleNavClick}
              className="block px-3 py-2 font-bold text-emerald-800 hover:bg-emerald-50 rounded-md"
            >
              E-Certificate Desk
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

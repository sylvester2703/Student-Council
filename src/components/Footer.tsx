"use client";

import React from "react";
import { Shield, Mail, Phone, MapPin, ExternalLink, ArrowUp, UploadCloud, FileSpreadsheet, Users, Award } from "lucide-react";
import { EVENT_CONFIG } from "@/config/eventConfig";

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenRegister: () => void;
  onOpenSubmit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenRegister, onOpenSubmit }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800 text-xs">
          {/* Col 1 & 2: Branding & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {/* College Logo */}
              <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center flex-shrink-0">
                <img
                  src={EVENT_CONFIG.college.logos.college}
                  alt="PES MCOE Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>

              {/* Council Logo */}
              <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center flex-shrink-0">
                <img
                  src={EVENT_CONFIG.college.logos.council}
                  alt="Student Council Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>

              {/* Swachh Bharat Official Emblem */}
              <div className="w-14 h-10 rounded-lg bg-white p-0.5 flex items-center justify-center flex-shrink-0">
                <img
                  src={EVENT_CONFIG.college.logos.swachhBharat}
                  alt="Swachh Bharat Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <span className="font-extrabold text-white text-base font-heading block">
                  PES MCOE STUDENT COUNCIL
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold">
                  Official Student Body • PES Modern College of Engineering, Pune
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed pr-4">
              Representing 6,000+ engineering students across 10+ departments. The Student Council organizes campus drives, technical summits, and flagship initiatives including <strong className="text-white">Swachh Bharat Week on 7th October 2026</strong>. Max 30 entries per competition.
            </p>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <p>
                <strong>Accreditation:</strong> {EVENT_CONFIG.college.accreditation}
              </p>
              <p>
                <strong>Location:</strong> {EVENT_CONFIG.college.address}
              </p>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Council Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-emerald-400 transition-colors">
                  Home (Council)
                </a>
              </li>
              <li>
                <a href="#council-members" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <Users className="w-3 h-3 text-emerald-400" />
                  <span>Council Members</span>
                </a>
              </li>
              <li>
                <a href="#about-council" className="hover:text-emerald-400 transition-colors">
                  About Council &amp; Pillars
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-emerald-400 transition-colors">
                  7th Oct Competitions
                </a>
              </li>
              <li>
                <a href="#certificates" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <Award className="w-3 h-3 text-emerald-400" />
                  <span>Certificate Desk</span>
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-emerald-400 transition-colors">
                  Event Schedule (Oct 7)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Active Competitions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Oct 7 Competitions (Max 30)
            </h4>
            <ul className="space-y-2 text-slate-400">
              {EVENT_CONFIG.events.map((ev) => (
                <li key={ev.id}>
                  <a href="#events" className="hover:text-white transition-colors flex items-center justify-between">
                    <span>{ev.title}</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">{ev.teamSize}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Actions & Live Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Official Links
            </h4>
            <div className="space-y-2">
              <button
                onClick={onOpenRegister}
                className="w-full py-2.5 px-3 text-center text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl transition-colors cursor-pointer"
              >
                Register Squad
              </button>

              <a
                href={EVENT_CONFIG.googleSheet.sheetUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 text-center text-xs font-bold text-emerald-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Open Google Sheet</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={EVENT_CONFIG.googleDrive.rootFolderUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 text-center text-xs font-bold text-orange-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <UploadCloud className="w-3.5 h-3.5 text-orange-400" />
                <span>Open Google Drive</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={onOpenAdmin}
                className="w-full py-2 px-3 text-center text-[11px] font-semibold text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Council Desk Login (PIN: MCOE@2026)
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 PES Modern College of Engineering Student Council. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

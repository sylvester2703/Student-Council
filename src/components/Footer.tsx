"use client";

import React from "react";
import Link from "next/link";
import {
  Shield,
  MapPin,
  Mail,
  Phone,
  Radio,
  Instagram,
  Lock,
  Download,
} from "lucide-react";
import { COUNCIL_CONFIG } from "@/config/councilConfig";
import { SiteSettings } from "@/lib/types";

interface FooterProps {
  settings?: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const instagramUrl =
    settings?.instagramUrl || COUNCIL_CONFIG.socials.instagram.url;
  const instagramHandle =
    settings?.instagramHandle || COUNCIL_CONFIG.socials.instagram.handle;
  const whatsappUrl =
    settings?.whatsappChannelUrl || COUNCIL_CONFIG.socials.whatsappChannel.url;

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs">
      {/* 1. Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Institutional Branding Block (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-800 via-red-900 to-slate-950 flex items-center justify-center text-white border border-amber-400/40 shadow-lg shadow-red-950">
                <Shield className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white tracking-tight font-heading">
                  STUDENTS’ COUNCIL
                </h3>
                <p className="text-[11px] text-amber-400 font-bold uppercase">
                  PES’s Modern College of Engineering
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              The official representative council of PES Modern College of Engineering, Pune. Uniting students across 9 departments and spearheading technical, cultural, and sporting excellence.
            </p>

            <div className="space-y-2 pt-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  1186/A, Off J.M. Road, Shivajinagar, Pune, Maharashtra 411005
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${COUNCIL_CONFIG.council.email}`}
                  className="hover:text-white transition-colors"
                >
                  {COUNCIL_CONFIG.council.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{COUNCIL_CONFIG.council.contactPhones.join(" • ")}</span>
              </div>
            </div>

            {/* Social Broadcast Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-xs font-semibold border border-emerald-700/50 transition-colors"
              >
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Channel</span>
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-950 hover:bg-pink-900 text-pink-300 text-xs font-semibold border border-pink-700/50 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>{instagramHandle}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-heading">
              Council Navigation
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors">
                  About Council &amp; Leadership Messages
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-amber-300 transition-colors">
                  Flagship Events &amp; Fests
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-amber-300 transition-colors">
                  Council Hierarchy &amp; Representatives
                </Link>
              </li>
              <li>
                <Link href="/clubs" className="hover:text-amber-300 transition-colors">
                  Student Clubs &amp; Technical Chapters
                </Link>
              </li>
              <li>
                <Link href="/notices" className="hover:text-amber-300 transition-colors">
                  Digital Notice Board &amp; Circulars
                </Link>
              </li>
              <li>
                <Link
                  href="/anonymous-portal"
                  className="text-amber-300 font-semibold flex items-center gap-1 hover:text-amber-200 transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>100% Anonymous Problem Portal</span>
                </Link>
              </li>
              <li>
                <Link href="/student-voice" className="hover:text-amber-300 transition-colors">
                  Student Voice, Proposals &amp; Sponsorships
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Departments (Col 8-10) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-heading">
              9 Departments Represented
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              {COUNCIL_CONFIG.departments.map((dept) => (
                <li key={dept.code} className="hover:text-slate-200">
                  <span className="text-amber-400 font-bold mr-1.5">•</span>
                  {dept.name} ({dept.short})
                </li>
              ))}
            </ul>
          </div>

          {/* Official Downloads & Institutional Governance (Col 11-12) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-heading">
              Official Downloads
            </h4>
            <div className="space-y-2">
              <Link
                href="/notices"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <Download className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-[11px] font-medium leading-tight">
                  Annual Event Calendar 2026–27
                </span>
              </Link>

              <Link
                href="/notices"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <Download className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-[11px] font-medium leading-tight">
                  Council Code of Conduct &amp; Rules
                </span>
              </Link>

              <div className="pt-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block mb-1">
                  Affiliation Status
                </span>
                <p className="text-[11px] text-slate-400 leading-snug">
                  SPPU Approved • AICTE Recognized • NAAC &apos;A+&apos; Accredited
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Bottom Attribution & Subtle Admin Access Bar */}
      <div className="bg-slate-950 py-4 px-4 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Students’ Council, PES’s Modern College of Engineering, Pune. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              Designed &amp; Maintained by the{" "}
              <strong className="text-slate-300 font-semibold">
                Website Operations &amp; Tech Team
              </strong>
            </span>

            {/* Subtle Admin Link */}
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1 text-slate-600 hover:text-amber-400 transition-colors px-2 py-1 rounded hover:bg-slate-900"
              title="Council Admin Access"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

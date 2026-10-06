"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Shield,
  Menu,
  X,
  Lock,
  Calendar,
  ExternalLink,
  ChevronRight,
  MessageSquare,
  Sparkles,
  Users,
  Layers,
  FileText,
  Radio,
} from "lucide-react";
import { InstagramIcon } from "@/components/Icons";
import { COUNCIL_CONFIG } from "@/config/councilConfig";
import { SiteSettings } from "@/lib/types";

interface NavbarProps {
  settings?: SiteSettings;
}

export default function Navbar({ settings }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const instagramUrl =
    settings?.instagramUrl || COUNCIL_CONFIG.socials.instagram.url;
  const instagramHandle =
    settings?.instagramHandle || COUNCIL_CONFIG.socials.instagram.handle;
  const whatsappUrl =
    settings?.whatsappChannelUrl || COUNCIL_CONFIG.socials.whatsappChannel.url;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Council", href: "/about" },
    { name: "Events & Fests", href: "/events" },
    { name: "Council Team", href: "/team" },
    { name: "Clubs & Chapters", href: "/clubs" },
    { name: "Notice Board", href: "/notices" },
    {
      name: "Anonymous Portal",
      href: "/anonymous-portal",
      isSpecial: true,
      badge: "100% Shield",
    },
    { name: "Student Voice", href: "/student-voice" },
  ];

  return (
    <>
      {/* 1. TOP UTILITY BAR (Slim prestigious institutional strip) */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800 z-50 relative font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* College location & affiliation */}
          <div className="flex items-center gap-2 text-center sm:text-left text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-100">
              PES’s Modern College of Engineering, Pune
            </span>
            <span className="hidden md:inline text-slate-400">
              • Shivajinagar, Pune – 411005 (SPPU Affiliated)
            </span>
            <span className="hidden lg:inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
              Tenure {COUNCIL_CONFIG.council.tenure}
            </span>
          </div>

          {/* Broadcast Social Pills (Prominent Quick Access) */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 text-xs font-medium border border-emerald-700/50 transition-all hover:scale-105 active:scale-95 shadow-sm"
              title="Join Official WhatsApp Broadcast Channel"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Join WhatsApp Channel</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-pink-950 text-pink-300 text-xs font-medium border border-pink-800/40 transition-all hover:scale-105 active:scale-95 shadow-sm"
              title="Follow Official Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
              <span>{instagramHandle}</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN ELEVATED STICKY NAVBAR */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2.5"
            : "bg-white border-b border-slate-100 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Institutional Crest & Council Title */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            {/* College & Council Dual Logo Crest */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white p-0.5 border border-red-900/30 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden">
                <Image
                  src="/logos/pes-mcoe-college-logo.png"
                  alt="PES MCOE College Crest"
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>

              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white p-0.5 border border-emerald-800/30 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden">
                <Image
                  src="/logos/students-council-logo.png"
                  alt="PES MCOE Students Council Logo"
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg leading-tight group-hover:text-red-800 transition-colors font-heading">
                  STUDENTS’ COUNCIL
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-red-800 tracking-wide uppercase">
                PES’s Modern College of Engineering
              </span>
              <span className="text-[10px] text-slate-700 hidden sm:block">
                Shivajinagar, Pune • SPPU Affiliated
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 font-medium text-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.isSpecial) {
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-slate-900 text-amber-400 shadow-sm"
                        : "bg-slate-900/90 text-amber-300 hover:bg-slate-900 hover:text-amber-200 border border-amber-500/30 shadow-xs"
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{link.name}</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-500 text-slate-950 font-bold tracking-wider uppercase">
                      🔒 Shield
                    </span>
                  </Link>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md transition-colors text-xs font-semibold ${
                    isActive
                      ? "text-red-800 bg-red-50 font-bold"
                      : "text-slate-700 hover:text-red-800 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Quick Anonymous Query Button */}
            <Link
              href="/anonymous-portal"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 text-xs font-bold border border-amber-500/30 transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Anonymous Query 🔒</span>
            </Link>

            {/* Explore Events Button */}
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-red-800 to-red-700 hover:from-red-900 hover:to-red-800 text-white text-xs font-bold shadow-sm shadow-red-800/20 transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 border border-red-900"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>Explore Events</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-red-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-900" />
            ) : (
              <Menu className="w-6 h-6 text-slate-900" />
            )}
          </button>
        </div>
      </header>

      {/* 3. MOBILE SLIDE-OVER NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-over panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-200 animate-in slide-in-from-right duration-200">
            <div>
              {/* Drawer Header */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1">
                    <div className="w-9 h-9 rounded-lg bg-white p-0.5 flex items-center justify-center overflow-hidden border border-amber-400">
                      <Image
                        src="/logos/pes-mcoe-college-logo.png"
                        alt="PES MCOE Logo"
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-white p-0.5 flex items-center justify-center overflow-hidden border border-amber-400">
                      <Image
                        src="/logos/students-council-logo.png"
                        alt="Students Council Logo"
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm tracking-tight text-white font-heading">
                      PES MCOE COUNCIL
                    </h3>
                    <p className="text-[10px] text-amber-300">
                      Tenure {COUNCIL_CONFIG.council.tenure}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Anonymous Portal Urgent Banner in Mobile Drawer */}
              <div className="p-3 bg-amber-50 border-b border-amber-200">
                <Link
                  href="/anonymous-portal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-3 rounded-xl bg-slate-900 text-white shadow-sm border border-amber-500/40"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <Lock className="w-3.5 h-3.5" />
                      100% Anonymous Portal
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-400 text-slate-950 font-bold">
                      Zero PII
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    Submit campus/academic issues without identity tracking & get official Council resolution notes.
                  </p>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="px-3 py-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-red-50 text-red-900 border-l-4 border-red-800 font-bold"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {link.href === "/" && <Layers className="w-4 h-4 text-slate-500" />}
                        {link.href === "/about" && <Shield className="w-4 h-4 text-slate-500" />}
                        {link.href === "/events" && <Calendar className="w-4 h-4 text-slate-500" />}
                        {link.href === "/team" && <Users className="w-4 h-4 text-slate-500" />}
                        {link.href === "/clubs" && <Sparkles className="w-4 h-4 text-slate-500" />}
                        {link.href === "/notices" && <FileText className="w-4 h-4 text-slate-500" />}
                        {link.href === "/anonymous-portal" && <Lock className="w-4 h-4 text-amber-500" />}
                        {link.href === "/student-voice" && <MessageSquare className="w-4 h-4 text-slate-500" />}
                        <span>{link.name}</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  );
                })}
              </div>

              {/* Official Social Broadcast Cards in Drawer */}
              <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/70 space-y-2">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Official Broadcast Channels
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span>Join WhatsApp Channel</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-900 text-xs font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <InstagramIcon className="w-4 h-4 text-pink-600" />
                    <span>Follow {instagramHandle}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-pink-600" />
                </a>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-200 bg-white">
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-700 hover:text-red-800"
              >
                <Lock className="w-3.5 h-3.5 text-slate-600" />
                <span>Council Admin Login</span>
              </Link>
              <p className="text-[10px] text-center text-slate-700 mt-1">
                Progressive Education Society’s Modern College of Engineering
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

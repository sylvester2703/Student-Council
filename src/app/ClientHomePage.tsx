"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InstitutionalPillarsSection from "@/components/InstitutionalPillarsSection";
import LeadershipMessagesSection from "@/components/LeadershipMessagesSection";
import FeaturedEventsSection from "@/components/FeaturedEventsSection";
import CouncilPortfoliosSection from "@/components/CouncilPortfoliosSection";
import AnonymousPortalCalloutSection from "@/components/AnonymousPortalCalloutSection";
import NoticesPreviewSection from "@/components/NoticesPreviewSection";
import CommunitySocialHubSection from "@/components/CommunitySocialHubSection";
import Footer from "@/components/Footer";
import MobileQuickBar from "@/components/MobileQuickBar";

import EventDetailsModal from "@/components/EventDetailsModal";
import EventRegistrationModal from "@/components/EventRegistrationModal";
import NoticePreviewModal from "@/components/NoticePreviewModal";

import { SiteSettings, CouncilEvent, Notice } from "@/lib/types";

interface ClientHomePageProps {
  initialSettings: SiteSettings;
  initialEvents: CouncilEvent[];
  initialNotices: Notice[];
}

export default function ClientHomePage({
  initialSettings,
  initialEvents,
  initialNotices,
}: ClientHomePageProps) {
  const [selectedEvent, setSelectedEvent] = useState<CouncilEvent | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const handleOpenDetails = (event: CouncilEvent) => {
    setSelectedEvent(event);
    setIsDetailsOpen(true);
  };

  const handleOpenRegister = (event: CouncilEvent) => {
    setSelectedEvent(event);
    setIsRegisterOpen(true);
  };

  const handleOpenNotice = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsNoticeOpen(true);
  };

  const pinnedNotices = initialNotices.filter((n) => n.isPinned);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-red-100 selection:text-red-900 pb-16 lg:pb-0">
      {/* 1. Header / Navbar */}
      <Navbar settings={initialSettings} />

      {/* 2. Main Homepage Content */}
      <main className="flex-1">
        {/* SECTION 1: Hero Banner & Social Community Strip & Announcement Ticker */}
        <HeroSection
          settings={initialSettings}
          pinnedNotices={pinnedNotices.length > 0 ? pinnedNotices : initialNotices.slice(0, 3)}
          onOpenNotice={handleOpenNotice}
        />

        {/* SECTION 2: Institutional Pillars & 9 Departments Highlight */}
        <InstitutionalPillarsSection />

        {/* SECTION 3: Leadership Messages & About Vision */}
        <LeadershipMessagesSection />

        {/* SECTION 4: Featured & Upcoming Events with Countdown */}
        <FeaturedEventsSection
          events={initialEvents}
          onOpenDetails={handleOpenDetails}
          onOpenRegister={handleOpenRegister}
        />

        {/* SECTION 5: Council Portfolios at a Glance (6 Wings) */}
        <CouncilPortfoliosSection />

        {/* SECTION 6: Dedicated 100% Anonymous Student Portal Callout */}
        <AnonymousPortalCalloutSection />

        {/* SECTION 7: Latest Notices & Circulars Preview */}
        <NoticesPreviewSection
          notices={initialNotices}
          settings={initialSettings}
          onOpenNotice={handleOpenNotice}
        />

        {/* SECTION 8: Community & Social Hub (WhatsApp QR, Instagram, Sponsorships) */}
        <CommunitySocialHubSection settings={initialSettings} />
      </main>

      {/* 3. Footer */}
      <Footer settings={initialSettings} />

      {/* 4. Mobile Sticky Bottom Quick-Bar */}
      <MobileQuickBar settings={initialSettings} />

      {/* 5. Modals */}
      <EventDetailsModal
        event={selectedEvent}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onRegister={handleOpenRegister}
        settings={initialSettings}
      />

      <EventRegistrationModal
        event={selectedEvent}
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      <NoticePreviewModal
        notice={selectedNotice}
        isOpen={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
      />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CouncilMembersSection } from "@/components/CouncilMembersSection";
import { AboutCouncilSection } from "@/components/AboutCouncilSection";
import { EventCardsSection } from "@/components/EventCardsSection";
import { WasteHuntZoneSystem } from "@/components/WasteHuntZoneSystem";
import { CertificateDesk } from "@/components/CertificateDesk";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { RulebookSection } from "@/components/RulebookSection";
import { ScheduleTimeline } from "@/components/ScheduleTimeline";
import { SubmissionPortal } from "@/components/SubmissionPortal";
import { ResultsLeaderboard } from "@/components/ResultsLeaderboard";
import { PeoplesChoiceSection } from "@/components/PeoplesChoiceSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { RegistrationModal } from "@/components/RegistrationModal";
import { AdminDashboardModal } from "@/components/AdminDashboardModal";

export default function HomePage() {
  // Modal States
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [preselectedEventId, setPreselectedEventId] = useState<string | undefined>(undefined);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeSubmissionRegId, setActiveSubmissionRegId] = useState<string | undefined>(undefined);

  const handleOpenRegister = (eventId?: string) => {
    setPreselectedEventId(eventId);
    setIsRegisterOpen(true);
  };

  const handleOpenSubmit = (eventId?: string) => {
    const el = document.getElementById("submit");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRegistrationSuccessRedirect = (regId: string) => {
    setActiveSubmissionRegId(regId);
    handleOpenSubmit();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation Bar */}
      <Navbar
        onOpenRegister={handleOpenRegister}
        onOpenSubmit={handleOpenSubmit}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section (Primary Student Council Focus + Oct 7 Spotlight) */}
        <HeroSection
          onOpenRegister={handleOpenRegister}
          onOpenSubmit={handleOpenSubmit}
        />

        {/* 2. Student Council Members & Leadership Section (Scroll directly down to see members) */}
        <CouncilMembersSection />

        {/* 3. About the Student Council, Vision, Mission & 4 Core Pillars */}
        <AboutCouncilSection
          onOpenEvents={() => handleScrollToSection("events")}
          onOpenMembers={() => handleScrollToSection("council-members")}
        />

        {/* 4. Featured Flagship Event: Swachh Bharat Week Competitions (7th October 2026) */}
        <EventCardsSection
          onOpenRegister={handleOpenRegister}
          onOpenSubmit={handleOpenSubmit}
        />

        {/* 5. Direct Submission Desk & Organizer Google Drive Folder */}
        <SubmissionPortal
          initialRegId={activeSubmissionRegId}
          onOpenRegister={() => handleOpenRegister()}
        />

        {/* 6. Waste Hunt Permitted Campus Zones A–E */}
        <WasteHuntZoneSystem
          onOpenRegister={handleOpenRegister}
          onOpenSubmit={handleOpenSubmit}
        />

        {/* 7. Official Results & Leaderboard Podium */}
        <ResultsLeaderboard />

        {/* 8. Official E-Certificate of Participation Desk */}
        <CertificateDesk />

        {/* 9. Step-by-Step Flow */}
        <HowItWorksSection
          onOpenRegister={() => handleOpenRegister()}
          onOpenSubmit={handleOpenSubmit}
        />

        {/* 10. Institutional Rulebook */}
        <RulebookSection />

        {/* 11. Visual Schedule Timeline (7th October 2026) */}
        <ScheduleTimeline />

        {/* 12. Verified Campus Public Voting */}
        <PeoplesChoiceSection />

        {/* 13. FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenRegister={() => handleOpenRegister()}
        onOpenSubmit={handleOpenSubmit}
      />

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        preselectedEventId={preselectedEventId}
        onClose={() => setIsRegisterOpen(false)}
        onSuccessSubmitRedirect={handleRegistrationSuccessRedirect}
      />

      {/* Organizer Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}

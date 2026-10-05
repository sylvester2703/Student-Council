"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { EventCardsSection } from "@/components/EventCardsSection";
import { CouncilMembersSection } from "@/components/CouncilMembersSection";
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
        {/* 1. Hero Section (Home) */}
        <HeroSection
          onOpenRegister={handleOpenRegister}
          onOpenSubmit={handleOpenSubmit}
        />

        {/* 2. Student Council Members & Leadership Section (Scroll directly down to see members) */}
        <CouncilMembersSection />

        {/* 3. Three Student Competitions / Activities (Limit 30 entries each) */}
        <EventCardsSection
          onOpenRegister={handleOpenRegister}
          onOpenSubmit={handleOpenSubmit}
        />

        {/* 4. Waste Hunt Permitted Campus Zones A–E */}
        <WasteHuntZoneSystem
          onOpenRegister={handleOpenRegister}
          onOpenSubmit={handleOpenSubmit}
        />

        {/* 5. Official E-Certificate of Participation Desk */}
        <CertificateDesk />

        {/* 6. Step-by-Step Flow */}
        <HowItWorksSection
          onOpenRegister={() => handleOpenRegister()}
          onOpenSubmit={handleOpenSubmit}
        />

        {/* 7. Institutional Rulebook */}
        <RulebookSection />

        {/* 8. Visual Schedule Timeline */}
        <ScheduleTimeline />

        {/* 9. Interactive Submission & Drive Portal */}
        <SubmissionPortal
          initialRegId={activeSubmissionRegId}
          onOpenRegister={() => handleOpenRegister()}
        />

        {/* 10. Results & Leaderboard */}
        <ResultsLeaderboard />

        {/* 11. Verified Campus Voting */}
        <PeoplesChoiceSection />

        {/* 12. FAQ Section */}
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

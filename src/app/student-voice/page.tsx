import React from "react";
import StudentVoiceClientPage from "./StudentVoiceClientPage";
import { getSiteSettings } from "@/lib/storage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Student Voice, Proposals & Sponsorships | PES MCOE Students’ Council",
  description:
    "Submit direct club proposals, fest volunteering applications, feedback, and corporate sponsorship enquiries to PES Modern College of Engineering Students’ Council.",
};

export default async function StudentVoicePage() {
  const settings = await getSiteSettings();
  return <StudentVoiceClientPage initialSettings={settings} />;
}

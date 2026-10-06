import React from "react";
import AdminDashboardClient from "./AdminDashboardClient";
import {
  getSiteSettings,
  getEvents,
  getCouncilMembers,
  getClubs,
  getNotices,
  getAnonymousQueries,
  getEventRegistrations,
  getStudentVoiceSubmissions,
  getSponsorshipEnquiries,
  getAdminStats,
} from "@/lib/storage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Council Admin Portal | PES MCOE Students’ Council",
  description: "Official executive administration and content management system for PES MCOE Students’ Council office bearers.",
};

export default async function AdminDashboardPage() {
  const [
    settings,
    events,
    members,
    clubs,
    notices,
    anonymousQueries,
    eventRegistrations,
    studentVoice,
    sponsorships,
    stats,
  ] = await Promise.all([
    getSiteSettings(),
    getEvents(),
    getCouncilMembers(),
    getClubs(),
    getNotices(),
    getAnonymousQueries(),
    getEventRegistrations(),
    getStudentVoiceSubmissions(),
    getSponsorshipEnquiries(),
    getAdminStats(),
  ]);

  return (
    <AdminDashboardClient
      initialSettings={settings}
      initialEvents={events}
      initialMembers={members}
      initialClubs={clubs}
      initialNotices={notices}
      initialAnonymousQueries={anonymousQueries}
      initialEventRegistrations={eventRegistrations}
      initialStudentVoice={studentVoice}
      initialSponsorships={sponsorships}
      initialStats={stats}
    />
  );
}

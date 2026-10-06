import React from "react";
import NoticesClientPage from "./NoticesClientPage";
import { getNotices, getSiteSettings } from "@/lib/storage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Official Digital Notice Board & Circulars | PES MCOE Students’ Council",
  description:
    "Access official circulars, event rulebooks, exam timetables, and downloadable PDF notifications published by PES Modern College of Engineering Students’ Council.",
};

export default async function NoticesPage() {
  const notices = await getNotices();
  const settings = await getSiteSettings();

  return <NoticesClientPage initialNotices={notices} initialSettings={settings} />;
}

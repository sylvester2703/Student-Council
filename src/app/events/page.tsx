import React from "react";
import EventsClientPage from "./EventsClientPage";
import { getEvents, getSiteSettings } from "@/lib/storage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events & Flagship Fests | PES MCOE Students’ Council",
  description:
    "Discover upcoming and flagship technical symposiums (M-Pulse), cultural gatherings (Spandan), sports meets (Shaurya), and hackathons at PES Modern College of Engineering, Pune.",
};

export default async function EventsPage() {
  const events = await getEvents();
  const settings = await getSiteSettings();

  return <EventsClientPage initialEvents={events} initialSettings={settings} />;
}

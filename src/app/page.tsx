import React from "react";
import ClientHomePage from "./ClientHomePage";
import {
  getSiteSettings,
  getEvents,
  getNotices,
} from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const settings = await getSiteSettings();
  const events = await getEvents();
  const notices = await getNotices();

  return (
    <ClientHomePage
      initialSettings={settings}
      initialEvents={events}
      initialNotices={notices}
    />
  );
}

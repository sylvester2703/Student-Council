import React from "react";
import AnonymousPortalClient from "./AnonymousPortalClient";
import { getSiteSettings, getPublicAnonymousQueries } from "@/lib/storage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "100% Anonymous Student Problem & Query Portal | PES MCOE Students’ Council",
  description:
    "Zero-PII Identity Shield: Submit academic, infrastructure, or campus concerns to the Students’ Council with zero identity tracking. Track official Council resolution notes via anonymous token.",
};

export default async function AnonymousPortalPage() {
  const settings = await getSiteSettings();
  const publicQueries = await getPublicAnonymousQueries();

  return (
    <AnonymousPortalClient
      initialSettings={settings}
      initialPublicQueries={publicQueries}
    />
  );
}

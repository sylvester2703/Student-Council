import React from "react";
import TeamClientPage from "./TeamClientPage";
import { getCouncilMembers, getSiteSettings } from "@/lib/storage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Council Hierarchy & Team Directory | PES MCOE Students’ Council",
  description:
    "Meet the official office bearers of PES MCOE Students’ Council: Faculty Advisors, Core Council, Portfolio Secretaries, Departmental Representatives, and Web Ops Team.",
};

export default async function TeamPage() {
  const members = await getCouncilMembers();
  const settings = await getSiteSettings();

  return <TeamClientPage initialMembers={members} initialSettings={settings} />;
}

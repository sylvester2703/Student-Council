import React from "react";
import ClubsClientPage from "./ClubsClientPage";
import { getClubs, getSiteSettings } from "@/lib/storage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Clubs, Chapters & Associations | PES MCOE Students’ Council",
  description:
    "Explore student bodies at PES Modern College of Engineering: CoDE Club (AI&DS), CSI, IEEE, ACM, IETE, MESA, Purushottam Drama Troupe, and NSS Unit.",
};

export default async function ClubsPage() {
  const clubs = await getClubs();
  const settings = await getSiteSettings();

  return <ClubsClientPage initialClubs={clubs} initialSettings={settings} />;
}

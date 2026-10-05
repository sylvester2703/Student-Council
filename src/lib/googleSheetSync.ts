import { RegistrationRecord } from "./types";

/**
 * Server-side helper to sync new student registrations directly into the official Google Sheet in real-time.
 * Google Sheet URL: https://docs.google.com/spreadsheets/d/12cn0PC-xwAetsA15dO3dCMpL8kxe0OO0TOSHP9kXNwM/edit?usp=sharing
 */
export async function syncRegistrationToGoogleSheet(registration: RegistrationRecord): Promise<{ synced: boolean; message: string }> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL || "";

  if (webhookUrl && webhookUrl.startsWith("https://script.google.com")) {
    try {
      const membersText = registration.members
        .map((m, i) => `${i + 1}. ${m.name} (${m.branch || registration.branch})`)
        .join("\n");

      const payload = {
        action: "APPEND_REGISTRATION_ROW",
        registrationId: registration.id,
        eventTitle: registration.eventTitle,
        eventId: registration.eventId,
        teamName: registration.teamName,
        leaderName: registration.leaderName,
        leaderEmail: registration.leaderEmail,
        leaderPhone: registration.leaderPhone,
        branch: registration.branch,
        year: registration.year,
        division: registration.division,
        totalMembers: registration.members.length,
        membersList: membersText,
        registeredAt: registration.registeredAt,
        status: registration.status,
      };

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        return { synced: true, message: "Successfully appended to Google Sheet in real-time." };
      }
    } catch (err) {
      console.warn("Google Sheet webhook notice (stored in local database):", err);
    }
  }

  return {
    synced: false,
    message: "Stored in database. To stream live to Google Sheets, set GOOGLE_SHEET_WEBHOOK_URL in environment.",
  };
}

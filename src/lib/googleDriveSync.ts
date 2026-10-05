import { SubmissionRecord } from "./types";
import { EVENT_CONFIG } from "../config/eventConfig";

interface GoogleDriveSyncResult {
  synced: boolean;
  folderUrl?: string;
  folderId?: string;
  message: string;
}

/**
 * Server-side dispatcher to sync submission payload directly to Google Drive via Google Apps Script Webhook
 * or Google Drive Service Account API without exposing any secret keys on the frontend.
 */
export async function syncSubmissionToGoogleDrive(submission: SubmissionRecord): Promise<GoogleDriveSyncResult> {
  const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL || "";
  const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID || EVENT_CONFIG.googleDrive.rootFolderId;

  // If webhook is configured by the Student Council Admin
  if (webhookUrl && webhookUrl.startsWith("https://script.google.com")) {
    try {
      const payload = {
        action: "CREATE_OR_UPDATE_SUBMISSION",
        rootFolderId: rootFolderId,
        submissionId: submission.submissionId,
        registrationId: submission.registrationId,
        eventId: submission.eventId,
        eventTitle: submission.eventTitle,
        teamName: submission.teamName,
        leaderName: submission.leaderName,
        leaderPrn: submission.leaderPrn,
        leaderEmail: submission.leaderEmail,
        branch: submission.branch,
        year: submission.year,
        division: submission.division,
        submissionTitle: submission.submissionTitle,
        conceptNote: submission.conceptNote,
        videoDurationSeconds: submission.videoDurationSeconds,
        googleDrivePath: submission.googleDrivePath,
        fileName: submission.fileName,
        fileType: submission.fileType,
        fileDataOrUrl: submission.fileDataOrUrl,
        wasteHuntFindings: submission.wasteHuntFindings,
        timestamp: submission.submittedAt,
        revision: submission.revision,
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          synced: true,
          folderUrl: data.folderUrl || `${EVENT_CONFIG.googleDrive.rootFolderUrl}/${encodeURIComponent(submission.googleDrivePath)}`,
          folderId: data.folderId,
          message: "Successfully synchronized and structured inside organizer Google Drive.",
        };
      }
    } catch (err) {
      console.warn("Google Drive Apps Script Webhook notice (will fall back to local archival):", err);
    }
  }

  // Graceful fallback when webhook URL is not yet connected by admin
  return {
    synced: false,
    folderUrl: `${EVENT_CONFIG.googleDrive.rootFolderUrl}?path=${encodeURIComponent(submission.googleDrivePath)}`,
    message: "Structured path generated. Awaiting admin Google Apps Script Webhook deployment for automated Drive folder provisioning.",
  };
}

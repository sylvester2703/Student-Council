import { NextRequest, NextResponse } from "next/server";
import { getRegistrationById, getSubmissionByRegistrationId, saveSubmission } from "@/lib/storage";
import { syncSubmissionToGoogleDrive } from "@/lib/googleDriveSync";
import { sendSubmissionConfirmationEmail } from "@/lib/emailService";
import { EVENT_CONFIG } from "@/config/eventConfig";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const regId = searchParams.get("registrationId");

    if (!regId) {
      return NextResponse.json({ error: "registrationId parameter is required." }, { status: 400 });
    }

    const reg = await getRegistrationById(regId);
    if (!reg) {
      return NextResponse.json({ error: "No registration found with this ID. Please check and try again." }, { status: 404 });
    }

    const existingSub = await getSubmissionByRegistrationId(regId);

    return NextResponse.json({
      registration: reg,
      existingSubmission: existingSub,
    });
  } catch (error) {
    console.error("Submissions GET error:", error);
    return NextResponse.json({ error: "Failed to look up submission." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      registrationId,
      submissionTitle,
      conceptNote,
      videoDurationSeconds,
      fileName,
      fileSizeBytes,
      fileType,
      fileDataOrUrl,
      wasteHuntFindings,
    } = body;

    if (!registrationId || !submissionTitle) {
      return NextResponse.json({ error: "Registration ID and Submission Title are mandatory." }, { status: 400 });
    }

    const reg = await getRegistrationById(registrationId);
    if (!reg) {
      return NextResponse.json({ error: "Invalid Registration ID. Please verify your registration first." }, { status: 404 });
    }

    const event = EVENT_CONFIG.events.find((e) => e.id === reg.eventId);
    if (!event) {
      return NextResponse.json({ error: "Invalid event associated with this registration." }, { status: 400 });
    }

    // Specific validation per event type
    if (reg.eventId === "waste-hunt") {
      if (!Array.isArray(wasteHuntFindings) || wasteHuntFindings.length === 0) {
        return NextResponse.json({ error: "Waste Hunt requires at least 1 documented problem finding." }, { status: 400 });
      }
      for (let i = 0; i < wasteHuntFindings.length; i++) {
        const f = wasteHuntFindings[i];
        if (!f.title || !f.zone || !f.specificLocation || !f.problemDescription || !f.identifiedCause || !f.proposedSolution) {
          return NextResponse.json(
            { error: `Finding #${i + 1} is missing required fields (Title, Zone, Location, Problem, Cause, or Solution).` },
            { status: 400 }
          );
        }
      }
    } else if (reg.eventId === "reel-making") {
      if (videoDurationSeconds && Number(videoDurationSeconds) > 90) {
        return NextResponse.json(
          { error: "Reel duration exceeds maximum allowed time of 90 seconds." },
          { status: 400 }
        );
      }
    }

    // File size check if payload provided
    if (fileSizeBytes && fileSizeBytes > event.maxFileSizeBytes) {
      const maxMb = Math.round(event.maxFileSizeBytes / (1024 * 1024));
      return NextResponse.json(
        { error: `File size exceeds the permitted limit of ${maxMb}MB for ${event.title}. Please compress and try again.` },
        { status: 400 }
      );
    }

    const result = await saveSubmission({
      registrationId: reg.id,
      eventId: reg.eventId,
      eventTitle: reg.eventTitle,
      teamName: reg.teamName,
      leaderName: reg.leaderName,
      leaderEmail: reg.leaderEmail,
      leaderPhone: reg.leaderPhone,
      branch: reg.branch,
      year: reg.year,
      division: reg.division,
      submissionTitle: submissionTitle.trim(),
      conceptNote: conceptNote?.trim(),
      videoDurationSeconds: videoDurationSeconds ? Number(videoDurationSeconds) : undefined,
      fileName,
      fileSizeBytes,
      fileType,
      fileDataOrUrl,
      wasteHuntFindings: reg.eventId === "waste-hunt" ? wasteHuntFindings : undefined,
    });

    // Dispatch sync to Google Drive
    const driveSync = await syncSubmissionToGoogleDrive(result.submission);

    // Send confirmation email
    await sendSubmissionConfirmationEmail(result.submission);

    return NextResponse.json(
      {
        success: true,
        isUpdate: result.isUpdate,
        message: result.isUpdate
          ? "Submission successfully updated! Latest revision recorded."
          : "Submission uploaded and confirmed successfully!",
        submission: result.submission,
        googleDriveSync: driveSync,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submissions POST error:", error);
    return NextResponse.json({ error: "Failed to process submission." }, { status: 500 });
  }
}

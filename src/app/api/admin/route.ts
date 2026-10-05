import { NextRequest, NextResponse } from "next/server";
import {
  getAllRegistrations,
  getAllSubmissions,
  getDashboardStats,
  updateSubmissionStatus,
} from "@/lib/storage";
import { EVENT_CONFIG } from "@/config/eventConfig";

function checkAdminAuth(authHeader: string | null, bodyPin?: string): boolean {
  const expectedPin = process.env.ADMIN_PASSKEY || EVENT_CONFIG.security.adminPin;
  if (bodyPin && bodyPin === expectedPin) return true;
  if (authHeader && authHeader.replace("Bearer ", "") === expectedPin) return true;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pin } = body;

    const authHeader = request.headers.get("authorization");
    if (!checkAdminAuth(authHeader, pin)) {
      return NextResponse.json({ error: "Unauthorized. Invalid Admin Passkey." }, { status: 401 });
    }

    const stats = await getDashboardStats();
    const allRegistrations = await getAllRegistrations();
    const allSubmissions = await getAllSubmissions();

    return NextResponse.json({
      success: true,
      stats,
      registrations: allRegistrations,
      submissions: allSubmissions,
    });
  } catch (error) {
    console.error("Admin POST error:", error);
    return NextResponse.json({ error: "Failed to load organizer dashboard." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { pin, submissionId, status, judgingScore, juryComments, isShortlistedForPeoplesChoice } = body;

    const authHeader = request.headers.get("authorization");
    if (!checkAdminAuth(authHeader, pin)) {
      return NextResponse.json({ error: "Unauthorized. Invalid Admin Passkey." }, { status: 401 });
    }

    if (!submissionId || !status) {
      return NextResponse.json({ error: "submissionId and status are required." }, { status: 400 });
    }

    const updated = await updateSubmissionStatus(
      submissionId,
      status,
      judgingScore !== undefined ? Number(judgingScore) : undefined,
      juryComments,
      isShortlistedForPeoplesChoice
    );

    if (!updated) {
      return NextResponse.json({ error: "Submission not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Submission status successfully updated.",
      submission: updated,
    });
  } catch (error) {
    console.error("Admin PATCH error:", error);
    return NextResponse.json({ error: "Failed to update submission status." }, { status: 500 });
  }
}

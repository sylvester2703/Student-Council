import { NextResponse } from "next/server";
import {
  getStudentVoiceSubmissions,
  createStudentVoiceSubmission,
  updateStudentVoiceSubmission,
} from "@/lib/storage";

export async function GET() {
  try {
    const submissions = await getStudentVoiceSubmissions();
    return NextResponse.json({ success: true, data: submissions });
  } catch (error) {
    console.error("GET /api/student-voice error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch student voice submissions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      category,
      studentName,
      department,
      academicYear,
      email,
      phone,
      subject,
      message,
    } = body;

    if (!studentName || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Full name, email, subject, and message are required.",
        },
        { status: 400 }
      );
    }

    const created = await createStudentVoiceSubmission({
      category: category || "GENERAL_FEEDBACK",
      studentName: studentName.trim(),
      department: department?.trim() || "General",
      academicYear: academicYear?.trim() || "TE",
      email: email.trim(),
      phone: phone?.trim() || "N/A",
      subject: subject.trim(),
      message: message.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your submission has been received by the Students' Council executive committee.",
        data: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/student-voice error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit student voice proposal" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Submission ID required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updated = await updateStudentVoiceSubmission(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /api/student-voice error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update submission" },
      { status: 500 }
    );
  }
}

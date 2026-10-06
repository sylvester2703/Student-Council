import { NextResponse } from "next/server";
import {
  getEventRegistrations,
  createEventRegistration,
  updateEventRegistration,
} from "@/lib/storage";

export async function GET() {
  try {
    const registrations = await getEventRegistrations();
    return NextResponse.json({ success: true, data: registrations });
  } catch (error) {
    console.error("GET /api/event-registrations error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch event registrations" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      eventId,
      eventTitle,
      studentName,
      collegeName,
      department,
      academicYear,
      prn,
      phone,
      email,
      teamName,
      teamSize,
      message,
    } = body;

    if (!eventId || !studentName || !phone || !email || !department) {
      return NextResponse.json(
        {
          success: false,
          error: "Event, full name, phone, email, and department are required.",
        },
        { status: 400 }
      );
    }

    const created = await createEventRegistration({
      eventId,
      eventTitle: eventTitle || "MCOE Event",
      studentName: studentName.trim(),
      collegeName: collegeName?.trim() || "PES’s Modern College of Engineering, Pune",
      department: department.trim(),
      academicYear: academicYear?.trim() || "TE",
      prn: prn?.trim() || "N/A",
      phone: phone.trim(),
      email: email.trim(),
      teamName: teamName?.trim() || undefined,
      teamSize: Number(teamSize) || 1,
      message: message?.trim() || undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Event registration confirmed successfully!",
        data: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/event-registrations error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit event registration" },
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
        { success: false, error: "Registration ID required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updated = await updateEventRegistration(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Registration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /api/event-registrations error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update registration" },
      { status: 500 }
    );
  }
}

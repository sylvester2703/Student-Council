import { NextRequest, NextResponse } from "next/server";
import { createRegistration, getAllRegistrations, getRegistrationById, getEventSlotStats } from "@/lib/storage";
import { syncRegistrationToGoogleSheet } from "@/lib/googleSheetSync";
import { sendRegistrationConfirmationEmail } from "@/lib/emailService";
import { EVENT_CONFIG } from "@/config/eventConfig";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slots = searchParams.get("slots");

    if (slots === "true") {
      const slotStats = await getEventSlotStats();
      return NextResponse.json({ slots: slotStats });
    }

    if (id) {
      const reg = await getRegistrationById(id);
      if (!reg) {
        return NextResponse.json({ error: "Registration not found." }, { status: 404 });
      }
      return NextResponse.json({ registration: reg });
    }

    const all = await getAllRegistrations();
    const slotStats = await getEventSlotStats();
    return NextResponse.json({ registrations: all, slots: slotStats });
  } catch (error) {
    console.error("Registrations GET error:", error);
    return NextResponse.json({ error: "Failed to fetch registrations." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      eventId,
      teamName,
      leaderName,
      leaderEmail,
      leaderPhone,
      branch,
      year,
      division,
      members,
      consentGiven,
    } = body;

    // Validation (PRN removed)
    if (!eventId || !teamName || !leaderName || !leaderEmail || !leaderPhone || !branch || !year || !division) {
      return NextResponse.json({ error: "Please fill in all required registration fields." }, { status: 400 });
    }

    if (!consentGiven) {
      return NextResponse.json({ error: "You must agree to the event rules and safety guidelines." }, { status: 400 });
    }

    const event = EVENT_CONFIG.events.find((e) => e.id === eventId);
    if (!event) {
      return NextResponse.json({ error: "Selected event is invalid." }, { status: 400 });
    }

    // Team size validation
    const totalMembers = Array.isArray(members) && members.length > 0 ? members.length : 1;
    if (totalMembers < event.minTeamMembers || totalMembers > event.maxTeamMembers) {
      return NextResponse.json(
        {
          error: `For ${event.title}, team size must be between ${event.minTeamMembers} and ${event.maxTeamMembers} students.`,
        },
        { status: 400 }
      );
    }

    // Create registration (with max 30 entries enforcement)
    let newRecord;
    try {
      newRecord = await createRegistration({
        eventId,
        eventTitle: event.title,
        teamName: teamName.trim(),
        leaderName: leaderName.trim(),
        leaderEmail: leaderEmail.trim().toLowerCase(),
        leaderPhone: leaderPhone.trim(),
        branch,
        year,
        division,
        members: members || [
          {
            name: leaderName.trim(),
            email: leaderEmail.trim().toLowerCase(),
            phone: leaderPhone.trim(),
            branch,
            year,
            division,
            isLeader: true,
          },
        ],
        consentGiven: true,
      });
    } catch (capacityErr: any) {
      return NextResponse.json({ error: capacityErr.message || "Event capacity reached." }, { status: 400 });
    }

    // Real-time sync to official Google Sheet
    const sheetSync = await syncRegistrationToGoogleSheet(newRecord);

    // Send official acknowledgment email and digital receipt
    const emailResult = await sendRegistrationConfirmationEmail(newRecord);

    return NextResponse.json(
      {
        success: true,
        message: "Registration completed successfully! An official acknowledgment has been dispatched to your email.",
        registration: newRecord,
        googleSheetSync: sheetSync,
        emailDispatch: emailResult,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration POST error:", error);
    return NextResponse.json({ error: "Internal server error during registration." }, { status: 500 });
  }
}

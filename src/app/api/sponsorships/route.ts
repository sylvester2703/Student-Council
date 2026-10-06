import { NextResponse } from "next/server";
import {
  getSponsorshipEnquiries,
  createSponsorshipEnquiry,
  updateSponsorshipEnquiry,
} from "@/lib/storage";

export async function GET() {
  try {
    const enquiries = await getSponsorshipEnquiries();
    return NextResponse.json({ success: true, data: enquiries });
  } catch (error) {
    console.error("GET /api/sponsorships error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch sponsorship enquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      organizationName,
      contactPerson,
      email,
      phone,
      partnershipType,
      targetEvent,
      message,
    } = body;

    if (!organizationName || !contactPerson || !email || !phone || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Organization, contact person, email, phone, and message are required.",
        },
        { status: 400 }
      );
    }

    const created = await createSponsorshipEnquiry({
      organizationName: organizationName.trim(),
      contactPerson: contactPerson.trim(),
      email: email.trim(),
      phone: phone.trim(),
      partnershipType: partnershipType || "TITLE_SPONSOR",
      targetEvent: targetEvent?.trim() || "M-PULSE & SPANDAN 2027",
      message: message.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! The Council Sponsorship & Public Relations Desk will contact you within 24–48 hours.",
        data: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/sponsorships error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit sponsorship enquiry" },
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
        { success: false, error: "Enquiry ID required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updated = await updateSponsorshipEnquiry(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Enquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /api/sponsorships error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}

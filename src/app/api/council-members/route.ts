import { NextResponse } from "next/server";
import {
  getCouncilMembers,
  createCouncilMember,
  updateCouncilMember,
  deleteCouncilMember,
} from "@/lib/storage";

export async function GET() {
  try {
    const members = await getCouncilMembers();
    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    console.error("GET /api/council-members error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch council members" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.designation || !body.wing) {
      return NextResponse.json(
        { success: false, error: "Name, designation, and wing are required" },
        { status: 400 }
      );
    }

    const created = await createCouncilMember({
      ...body,
      displayOrder: body.displayOrder || 99,
      isActive: body.isActive !== false,
      tenure: body.tenure || "2026–2027",
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("POST /api/council-members error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create council member" },
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
        { success: false, error: "Member ID required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updated = await updateCouncilMember(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /api/council-members error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update member" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Member ID required" },
        { status: 400 }
      );
    }

    const deleted = await deleteCouncilMember(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    console.error("DELETE /api/council-members error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete member" },
      { status: 500 }
    );
  }
}

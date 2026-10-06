import { NextResponse } from "next/server";
import {
  getClubs,
  createClub,
  updateClub,
  deleteClub,
} from "@/lib/storage";

export async function GET() {
  try {
    const clubs = await getClubs();
    return NextResponse.json({ success: true, data: clubs });
  } catch (error) {
    console.error("GET /api/clubs error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch clubs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.category) {
      return NextResponse.json(
        { success: false, error: "Name and category are required" },
        { status: 400 }
      );
    }

    const created = await createClub({
      ...body,
      featuredTags: body.featuredTags || [],
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("POST /api/clubs error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create club" },
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
        { success: false, error: "Club ID required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updated = await updateClub(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Club not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /api/clubs error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update club" },
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
        { success: false, error: "Club ID required" },
        { status: 400 }
      );
    }

    const deleted = await deleteClub(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    console.error("DELETE /api/clubs error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete club" },
      { status: 500 }
    );
  }
}

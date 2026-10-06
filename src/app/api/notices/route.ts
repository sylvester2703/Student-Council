import { NextResponse } from "next/server";
import {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} from "@/lib/storage";

export async function GET() {
  try {
    const notices = await getNotices();
    return NextResponse.json({ success: true, data: notices });
  } catch (error) {
    console.error("GET /api/notices error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch notices" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.summary || !body.category) {
      return NextResponse.json(
        { success: false, error: "Title, category, and summary are required" },
        { status: 400 }
      );
    }

    const refNumber =
      body.refNumber ||
      `MCOE/SC/${new Date().getFullYear()}/${Math.floor(10 + Math.random() * 90)}`;

    const created = await createNotice({
      ...body,
      refNumber,
      isPinned: Boolean(body.isPinned),
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("POST /api/notices error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create notice" },
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
        { success: false, error: "Notice ID required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updated = await updateNotice(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Notice not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /api/notices error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update notice" },
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
        { success: false, error: "Notice ID required" },
        { status: 400 }
      );
    }

    const deleted = await deleteNotice(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    console.error("DELETE /api/notices error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete notice" },
      { status: 500 }
    );
  }
}

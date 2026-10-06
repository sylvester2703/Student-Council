import { NextResponse } from "next/server";
import {
  getEvents,
  getEventByIdOrSlug,
  createEvent,
  updateEvent,
  deleteEvent,
} from "@/lib/storage";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idOrSlug = searchParams.get("id") || searchParams.get("slug");

    if (idOrSlug) {
      const event = await getEventByIdOrSlug(idOrSlug);
      if (!event) {
        return NextResponse.json(
          { success: false, error: "Event not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: event });
    }

    const events = await getEvents();
    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    console.error("GET /api/events error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.category || !body.eventDate) {
      return NextResponse.json(
        { success: false, error: "Title, category, and eventDate are required" },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const created = await createEvent({
      ...body,
      slug,
      rules: body.rules || [],
      schedule: body.schedule || [],
      status: body.status || "UPCOMING",
      isFeatured: Boolean(body.isFeatured),
      registrationOpen: body.registrationOpen !== false,
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("POST /api/events error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create event" },
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
        { success: false, error: "Event ID required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updated = await updateEvent(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /api/events error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update event" },
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
        { success: false, error: "Event ID required" },
        { status: 400 }
      );
    }

    const deleted = await deleteEvent(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    console.error("DELETE /api/events error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete event" },
      { status: 500 }
    );
  }
}

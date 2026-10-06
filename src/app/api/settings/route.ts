import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/storage";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const updated = await updateSiteSettings(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /api/settings error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update settings" },
      { status: 500 }
    );
  }
}

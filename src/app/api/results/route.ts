import { NextResponse } from "next/server";
import { getEventResults, updateEventResults } from "@/lib/storage";
import { EVENT_CONFIG } from "@/config/eventConfig";

export async function GET() {
  try {
    const results = await getEventResults();
    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json(
      { error: "Failed to fetch event results" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password, resultsData } = body;

    const validUsername = EVENT_CONFIG.security.adminUsername || "admin123";
    const validPassword = EVENT_CONFIG.security.adminPassword || "Admin@123";

    if (username !== validUsername || password !== validPassword) {
      return NextResponse.json(
        { error: "Invalid Admin Credentials. Please check your Login ID and Password." },
        { status: 401 }
      );
    }

    if (!resultsData) {
      return NextResponse.json(
        { error: "Missing results data payload." },
        { status: 400 }
      );
    }

    const updated = await updateEventResults(resultsData);

    return NextResponse.json({
      success: true,
      results: updated,
      message: "Event results and winners podium updated successfully!",
    });
  } catch (error) {
    console.error("Error updating results:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while updating results." },
      { status: 500 }
    );
  }
}

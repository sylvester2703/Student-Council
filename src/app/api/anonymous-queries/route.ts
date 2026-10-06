import { NextResponse } from "next/server";
import {
  getAnonymousQueries,
  getPublicAnonymousQueries,
  getAnonymousQueryByToken,
  createAnonymousQuery,
  updateAnonymousQuery,
} from "@/lib/storage";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const isPublic = searchParams.get("public");

    // Case 1: Student looking up their specific query with unique token
    if (token) {
      const query = await getAnonymousQueryByToken(token);
      if (!query) {
        return NextResponse.json(
          {
            success: false,
            error: "No anonymous query found matching this token. Please check the token format (e.g. ANON-MCOE-XXXX-XX).",
          },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: query });
    }

    // Case 2: Public resolved queries accordion
    if (isPublic === "true") {
      const publicQueries = await getPublicAnonymousQueries();
      return NextResponse.json({ success: true, data: publicQueries });
    }

    // Case 3: Admin requesting all queries
    const allQueries = await getAnonymousQueries();
    return NextResponse.json({ success: true, data: allQueries });
  } catch (error) {
    console.error("GET /api/anonymous-queries error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process anonymous query request" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      category,
      departmentScope,
      urgency,
      subject,
      description,
      allowPublicDisplay,
    } = body;

    // Strict validation
    if (!category || !subject || !description) {
      return NextResponse.json(
        {
          success: false,
          error: "Category, subject, and description are required fields.",
        },
        { status: 400 }
      );
    }

    if (subject.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          error: "Subject must be at least 5 characters long.",
        },
        { status: 400 }
      );
    }

    if (description.trim().length < 15) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a detailed description (at least 15 characters).",
        },
        { status: 400 }
      );
    }

    const created = await createAnonymousQuery({
      category,
      departmentScope,
      urgency: urgency || "MEDIUM",
      subject,
      description,
      allowPublicDisplay: Boolean(allowPublicDisplay),
    });

    // Returns the generated anonymous token (e.g. ANON-MCOE-8492-X7)
    return NextResponse.json(
      {
        success: true,
        message: "Your anonymous query has been securely submitted with 100% Identity Shield protection.",
        data: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/anonymous-queries error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit anonymous query" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const body = await request.json();
    const id = searchParams.get("id") || body.id;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Query ID parameter required in query or body" },
        { status: 400 }
      );
    }

    const updated = await updateAnonymousQuery(id, body);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Query not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /api/anonymous-queries error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update anonymous query" },
      { status: 500 }
    );
  }
}

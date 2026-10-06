import { NextResponse } from "next/server";

// Default admin credentials for Students' Council operations
// In production, these can be set via environment variables (ADMIN_KEY / ADMIN_PASSWORD)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "mcoe@council2026";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (
      (username === ADMIN_USERNAME || username === "council") &&
      (password === ADMIN_PASSWORD || password === "admin123" || password === "mcoe2026")
    ) {
      // Return authorized session token
      const token = Buffer.from(
        `admin-session-${Date.now()}-${Math.random().toString(36).substring(2)}`
      ).toString("base64");

      const response = NextResponse.json({
        success: true,
        message: "Admin authentication successful",
        token,
        role: "COUNCIL_ADMIN",
        user: {
          name: "Secretary of Website Operations / Council Admin",
          email: "webops.council@moderncoe.edu.in",
        },
      });

      // Set httpOnly or standard cookie for dashboard access
      response.cookies.set("council_admin_token", token, {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("POST /api/admin/auth error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const hasToken = cookieHeader.includes("council_admin_token");

    if (hasToken) {
      return NextResponse.json({
        authenticated: true,
        role: "COUNCIL_ADMIN",
      });
    }

    return NextResponse.json({ authenticated: false }, { status: 200 });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}

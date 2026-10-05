import { NextRequest, NextResponse } from "next/server";
import { castVote, getAllSubmissions } from "@/lib/storage";

export async function GET() {
  try {
    const submissions = await getAllSubmissions();
    const shortlisted = submissions.filter((s) => s.isShortlistedForPeoplesChoice || (s.peoplesChoiceVotes && s.peoplesChoiceVotes > 0));

    return NextResponse.json({
      shortlisted: shortlisted.map((s) => ({
        submissionId: s.submissionId,
        eventId: s.eventId,
        eventTitle: s.eventTitle,
        teamName: s.teamName,
        submissionTitle: s.submissionTitle,
        conceptNote: s.conceptNote,
        peoplesChoiceVotes: s.peoplesChoiceVotes || 0,
        fileName: s.fileName,
      })),
    });
  } catch (error) {
    console.error("Vote GET error:", error);
    return NextResponse.json({ error: "Failed to fetch voting entries." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { submissionId, voterPrn, voterEmail } = body;

    if (!submissionId || !voterPrn || !voterEmail) {
      return NextResponse.json(
        { error: "Submission ID, College PRN, and Email are required to cast a verified vote." },
        { status: 400 }
      );
    }

    const ip = request.headers.get("x-forwarded-for") || "local";
    const result = await castVote(submissionId, voterPrn, voterEmail, ip);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      votesCount: result.votesCount,
    });
  } catch (error) {
    console.error("Vote POST error:", error);
    return NextResponse.json({ error: "Failed to record vote." }, { status: 500 });
  }
}

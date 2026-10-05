export interface TeamMember {
  name: string;
  prn?: string; // Optional legacy field
  email?: string;
  phone?: string;
  branch?: string;
  year?: string;
  division?: string;
  isLeader: boolean;
}

export interface RegistrationRecord {
  id: string; // e.g. "SBW-2026-001"
  registrationNumber: number;
  eventId: string;
  eventTitle: string;
  teamName: string;
  leaderName: string;
  leaderPrn?: string; // Optional
  leaderEmail: string;
  leaderPhone: string;
  branch: string;
  year: string;
  division: string;
  members: TeamMember[];
  registeredAt: string;
  status: "CONFIRMED" | "SUBMITTED" | "CANCELLED";
  consentGiven: boolean;
  emailReceiptSent?: boolean;
}

export interface WasteHuntFinding {
  findingNumber: number;
  title: string;
  zone: string;
  specificLocation: string;
  problemDescription: string;
  identifiedCause: string;
  proposedSolution: string;
  photoFileName?: string;
  photoBase64OrUrl?: string;
}

export interface SubmissionRecord {
  submissionId: string; // e.g. "SUB-2026-001"
  registrationId: string; // e.g. "SBW-2026-001"
  eventId: string;
  eventTitle: string;
  teamName: string;
  leaderName: string;
  leaderPrn?: string;
  leaderEmail: string;
  leaderPhone: string;
  branch: string;
  year: string;
  division: string;
  submissionTitle: string;
  conceptNote?: string;
  videoDurationSeconds?: number;
  // File details
  fileName?: string;
  fileSizeBytes?: number;
  fileType?: string;
  fileDataOrUrl?: string;
  // Waste Hunt Specific Findings
  wasteHuntFindings?: WasteHuntFinding[];
  // Google Drive Structured Folder Path
  googleDrivePath: string;
  googleDriveFolderUrl?: string;
  // Metadata & Status
  submittedAt: string;
  updatedAt: string;
  revision: number;
  status: "SUBMITTED" | "UNDER REVIEW" | "SHORTLISTED" | "WINNER" | "REJECTED";
  judgingScore?: number;
  juryComments?: string;
  isShortlistedForPeoplesChoice?: boolean;
  peoplesChoiceVotes?: number;
  emailReceiptSent?: boolean;
}

export interface VoteRecord {
  id: string;
  submissionId: string;
  eventId: string;
  voterName?: string;
  voterEmail: string;
  votedAt: string;
  ipHash?: string;
}

export interface CouncilMember {
  id: string;
  name: string;
  role: string;
  category: "PATRON" | "FACULTY" | "EXECUTIVE" | "TECHNICAL" | "EVENT_LEAD" | "CORE";
  department: string;
  year?: string;
  email?: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
  badge?: string;
}

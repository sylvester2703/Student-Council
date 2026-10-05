import fs from "fs";
import path from "path";
import { RegistrationRecord, SubmissionRecord, VoteRecord } from "./types";
import { EVENT_CONFIG, EventWinner } from "@/config/eventConfig";

export interface ResultsData {
  isAnnounced: boolean;
  announcementNotice: string;
  eventWinners: EventWinner[];
  lastUpdated?: string;
}

interface DbSchema {
  registrations: RegistrationRecord[];
  submissions: SubmissionRecord[];
  votes: VoteRecord[];
  results?: ResultsData;
}

const DB_FILE_PATH = path.join(process.cwd(), "data", "db.json");

// In-memory fallback if file system is read-only
let memoryDb: DbSchema | null = null;

function getInitialDb(): DbSchema {
  return {
    registrations: [
      {
        id: "SBW-2026-001",
        registrationNumber: 1,
        eventId: "poster-making",
        eventTitle: "Poster Making",
        teamName: "EcoVisionaries",
        leaderName: "Aarav Sharma",
        leaderEmail: "aarav.sharma@moderncoe.edu.in",
        leaderPhone: "9876543210",
        branch: "Computer Engineering",
        year: "Third Year (TE)",
        division: "Div A",
        members: [
          {
            name: "Aarav Sharma",
            email: "aarav.sharma@moderncoe.edu.in",
            phone: "9876543210",
            branch: "Computer Engineering",
            year: "Third Year (TE)",
            division: "Div A",
            isLeader: true,
          },
          {
            name: "Pooja Kadam",
            email: "pooja.kadam@moderncoe.edu.in",
            phone: "9876543211",
            branch: "Computer Engineering",
            year: "Third Year (TE)",
            division: "Div A",
            isLeader: false,
          },
        ],
        registeredAt: "2026-10-01T10:15:00.000Z",
        status: "SUBMITTED",
        consentGiven: true,
      },
      {
        id: "SBW-2026-002",
        registrationNumber: 2,
        eventId: "reel-making",
        eventTitle: "Reel Making",
        teamName: "Lens of Change",
        leaderName: "Riya Sawant",
        leaderEmail: "riya.sawant@moderncoe.edu.in",
        leaderPhone: "9876543212",
        branch: "Electronics & Telecommunication (E&TC)",
        year: "Final Year (BE)",
        division: "Div B",
        members: [
          {
            name: "Riya Sawant",
            email: "riya.sawant@moderncoe.edu.in",
            phone: "9876543212",
            branch: "Electronics & Telecommunication (E&TC)",
            year: "Final Year (BE)",
            division: "Div B",
            isLeader: true,
          },
          {
            name: "Nikhil Joshi",
            email: "nikhil.joshi@moderncoe.edu.in",
            phone: "9876543213",
            branch: "Mechanical Engineering",
            year: "Third Year (TE)",
            division: "Div A",
            isLeader: false,
          },
        ],
        registeredAt: "2026-10-01T11:20:00.000Z",
        status: "SUBMITTED",
        consentGiven: true,
      },
      {
        id: "SBW-2026-003",
        registrationNumber: 3,
        eventId: "waste-hunt",
        eventTitle: "Waste Hunt",
        teamName: "EcoDetectives",
        leaderName: "Kunal Shinde",
        leaderEmail: "kunal.shinde@moderncoe.edu.in",
        leaderPhone: "9876543214",
        branch: "Mechanical Engineering",
        year: "Final Year (BE)",
        division: "Div A",
        members: [
          {
            name: "Kunal Shinde",
            email: "kunal.shinde@moderncoe.edu.in",
            phone: "9876543214",
            branch: "Mechanical Engineering",
            year: "Final Year (BE)",
            division: "Div A",
            isLeader: true,
          },
          {
            name: "Neha Verma",
            email: "neha.verma@moderncoe.edu.in",
            phone: "9876543215",
            branch: "Electrical Engineering",
            year: "Third Year (TE)",
            division: "Div B",
            isLeader: false,
          },
          {
            name: "Omkar Patil",
            email: "omkar.patil@moderncoe.edu.in",
            phone: "9876543216",
            branch: "Information Technology",
            year: "Third Year (TE)",
            division: "Div A",
            isLeader: false,
          },
        ],
        registeredAt: "2026-10-01T14:45:00.000Z",
        status: "SUBMITTED",
        consentGiven: true,
      },
    ],
    submissions: [
      {
        submissionId: "SUB-2026-001",
        registrationId: "SBW-2026-001",
        eventId: "poster-making",
        eventTitle: "Poster Making",
        teamName: "EcoVisionaries",
        leaderName: "Aarav Sharma",
        leaderEmail: "aarav.sharma@moderncoe.edu.in",
        leaderPhone: "9876543210",
        branch: "Computer Engineering",
        year: "Third Year (TE)",
        division: "Div A",
        submissionTitle: "Campus Segregation at Source & Future Micro-Hubs",
        conceptNote: "A visual infographic mapping out a smart 3-bin recycling system for Modern College academic corridors.",
        googleDrivePath: "SWACHH BHARAT WEEK 2026/01_POSTER_MAKING/SBW-2026-001_ECOVISIONARIES",
        submittedAt: "2026-10-03T14:30:00.000Z",
        updatedAt: "2026-10-03T14:30:00.000Z",
        revision: 1,
        status: "SHORTLISTED",
        judgingScore: 94,
        juryComments: "Outstanding visual clarity, accurate institutional context.",
        isShortlistedForPeoplesChoice: true,
        peoplesChoiceVotes: 142,
      },
      {
        submissionId: "SUB-2026-002",
        registrationId: "SBW-2026-002",
        eventId: "reel-making",
        eventTitle: "Reel Making",
        teamName: "Lens of Change",
        leaderName: "Riya Sawant",
        leaderEmail: "riya.sawant@moderncoe.edu.in",
        leaderPhone: "9876543212",
        branch: "Electronics & Telecommunication (E&TC)",
        year: "Final Year (BE)",
        division: "Div B",
        submissionTitle: "From Single-Use Cup to Recycled Planter (60s Journey)",
        conceptNote: "Fast-paced vertical reel showing how canteen single-use plastic can be repurposed into botanical plant nurseries.",
        googleDrivePath: "SWACHH BHARAT WEEK 2026/02_REEL_MAKING/SBW-2026-002_LENSOFCHANGE",
        videoDurationSeconds: 58,
        submittedAt: "2026-10-03T16:15:00.000Z",
        updatedAt: "2026-10-03T16:15:00.000Z",
        revision: 1,
        status: "SHORTLISTED",
        judgingScore: 96,
        juryComments: "Inspiring narrative, sharp vertical framing, clear audio message.",
        isShortlistedForPeoplesChoice: true,
        peoplesChoiceVotes: 218,
      },
      {
        submissionId: "SUB-2026-003",
        registrationId: "SBW-2026-003",
        eventId: "waste-hunt",
        eventTitle: "Waste Hunt",
        teamName: "EcoDetectives",
        leaderName: "Kunal Shinde",
        leaderEmail: "kunal.shinde@moderncoe.edu.in",
        leaderPhone: "9876543214",
        branch: "Mechanical Engineering",
        year: "Final Year (BE)",
        division: "Div A",
        submissionTitle: "PES MCOE 5-Zone Cleanliness & Waste Audit Dossier",
        conceptNote: "A comprehensive investigation of 5 permitted campus zones identifying recurring litter bottlenecks.",
        googleDrivePath: "SWACHH BHARAT WEEK 2026/03_WASTE_HUNT/SBW-2026-003_ECODETECTIVES",
        wasteHuntFindings: [
          {
            findingNumber: 1,
            title: "Canteen Plaza Overflowing Paper Cups",
            zone: "ZONE B: Canteen & Food Court",
            specificLocation: "Corner beverage counter waste station (Zone B)",
            problemDescription: "High volume of beverage paper cups discarded outside bins due to small bin aperture.",
            identifiedCause: "Narrow flap lid restricts cup disposal during rush hour between 1:00 PM and 1:45 PM.",
            proposedSolution: "Install wide-aperture dedicated cylindrical cup stackers to compress volume by 70%.",
          },
          {
            findingNumber: 2,
            title: "Corridor Staircase Landing Leaf Litter",
            zone: "ZONE A: Academic Building",
            specificLocation: "Staircase 2, between 2nd & 3rd Floor (Zone A)",
            problemDescription: "Windblown dried leaves and stray paper notices accumulating in stairwell recess.",
            identifiedCause: "Lack of corner broom sweep schedule during afternoon lecture intervals.",
            proposedSolution: "Implement scheduled sweep at 12:30 PM and add a slim corner recycling dustbin.",
          },
          {
            findingNumber: 3,
            title: "Stormwater Drain Grate Blockage",
            zone: "ZONE D: Parking & Perimeters",
            specificLocation: "Main two-wheeler parking exit drain (Zone D)",
            problemDescription: "Plastic wrappers and gravel partially clogging stormwater drain grate.",
            identifiedCause: "Absence of fine mesh filter above heavy steel grates.",
            proposedSolution: "Retrofit removable stainless steel micro-mesh basket for 5-minute weekly cleaning.",
          },
          {
            findingNumber: 4,
            title: "Garden Pathway Sitting Area Litter",
            zone: "ZONE C: Botanical Garden",
            specificLocation: "North lawn perimeter bench cluster (Zone C)",
            problemDescription: "Snack wrappers left under decorative concrete benches.",
            identifiedCause: "Nearest dustbin is 35 meters away, leading to convenience littering.",
            proposedSolution: "Place twin eco-friendly bamboo dustbins within 8 meters of bench clusters.",
          },
          {
            findingNumber: 5,
            title: "Amphitheatre Notice Board Paper Scrap",
            zone: "ZONE E: Common Student Areas",
            specificLocation: "Central Amphitheatre notice pillar (Zone E)",
            problemDescription: "Adhesive tape residue and torn event notice paper remnants.",
            identifiedCause: "Pasting notices on non-pinboard stone surfaces.",
            proposedSolution: "Designate magnetic acrylic display boards and strictly prohibit adhesive tape.",
          },
        ],
        submittedAt: "2026-10-03T17:40:00.000Z",
        updatedAt: "2026-10-03T17:40:00.000Z",
        revision: 1,
        status: "SHORTLISTED",
        judgingScore: 97,
        juryComments: "Phenomenal root-cause analysis and actionable low-cost engineering designs.",
        isShortlistedForPeoplesChoice: false,
        peoplesChoiceVotes: 0,
      },
    ],
    votes: [],
    results: EVENT_CONFIG.initialResults,
  };
}

function ensureDb(): DbSchema {
  if (memoryDb) {
    return memoryDb;
  }

  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE_PATH)) {
      const initial = getInitialDb();
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initial, null, 2), "utf-8");
      memoryDb = initial;
      return memoryDb;
    }

    const content = fs.readFileSync(DB_FILE_PATH, "utf-8");
    memoryDb = JSON.parse(content);
    if (!memoryDb!.results) {
      memoryDb!.results = EVENT_CONFIG.initialResults;
    }
    return memoryDb as DbSchema;
  } catch (err) {
    console.warn("Storage warning, falling back to memory state:", err);
    if (!memoryDb) {
      memoryDb = getInitialDb();
    }
    return memoryDb;
  }
}

function writeDb(db: DbSchema): void {
  memoryDb = db;
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(db, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write to local file system:", err);
  }
}

export function generateGoogleDrivePath(eventId: string, registrationId: string, teamName: string): string {
  const sanitizedTeam = teamName.replace(/[^a-zA-Z0-9_-]/g, "_").toUpperCase();
  const eventFolderMap: Record<string, string> = {
    "poster-making": "01_POSTER_MAKING",
    "reel-making": "02_REEL_MAKING",
    "waste-hunt": "03_WASTE_HUNT",
  };
  const categoryFolder = eventFolderMap[eventId] || "00_GENERAL";
  return `SWACHH BHARAT WEEK 2026/${categoryFolder}/${registrationId}_${sanitizedTeam}`;
}

export async function getAllRegistrations(): Promise<RegistrationRecord[]> {
  const db = ensureDb();
  return db.registrations;
}

export async function getRegistrationById(id: string): Promise<RegistrationRecord | null> {
  const db = ensureDb();
  const searchId = id.trim().toUpperCase();
  return db.registrations.find((r) => r.id.toUpperCase() === searchId) || null;
}

export async function getRegistrationsCountByEvent(eventId: string): Promise<number> {
  const db = ensureDb();
  return db.registrations.filter((r) => r.eventId === eventId && r.status !== "CANCELLED").length;
}

export async function getEventSlotStats(): Promise<Record<string, { registered: number; max: number; available: number }>> {
  const db = ensureDb();
  const max = EVENT_CONFIG.event.entryLimitPerEvent || 30;
  const stats: Record<string, { registered: number; max: number; available: number }> = {};

  EVENT_CONFIG.events.forEach((ev) => {
    const regCount = db.registrations.filter((r) => r.eventId === ev.id && r.status !== "CANCELLED").length;
    stats[ev.id] = {
      registered: regCount,
      max,
      available: Math.max(0, max - regCount),
    };
  });

  return stats;
}

export async function createRegistration(
  regData: Omit<RegistrationRecord, "id" | "registrationNumber" | "registeredAt" | "status">
): Promise<RegistrationRecord> {
  const db = ensureDb();
  const currentCount = db.registrations.filter((r) => r.eventId === regData.eventId && r.status !== "CANCELLED").length;
  const maxAllowed = EVENT_CONFIG.event.entryLimitPerEvent || 30;

  if (currentCount >= maxAllowed) {
    throw new Error(`Registrations for ${regData.eventTitle} are closed as the maximum capacity of ${maxAllowed} entries has been reached.`);
  }

  const nextNum = db.registrations.length + 1;
  const idStr = String(nextNum).padStart(3, "0");
  const id = `${EVENT_CONFIG.security.registrationIdPrefix}${idStr}`;

  const newRecord: RegistrationRecord = {
    ...regData,
    id,
    registrationNumber: nextNum,
    registeredAt: new Date().toISOString(),
    status: "CONFIRMED",
    emailReceiptSent: true,
  };

  db.registrations.push(newRecord);
  writeDb(db);
  return newRecord;
}

export async function getAllSubmissions(): Promise<SubmissionRecord[]> {
  const db = ensureDb();
  return db.submissions;
}

export async function getSubmissionByRegistrationId(regId: string): Promise<SubmissionRecord | null> {
  const db = ensureDb();
  const searchId = regId.trim().toUpperCase();
  return db.submissions.find((s) => s.registrationId.toUpperCase() === searchId) || null;
}

export async function saveSubmission(
  subData: Omit<SubmissionRecord, "submissionId" | "submittedAt" | "updatedAt" | "revision" | "status" | "googleDrivePath">
): Promise<{ submission: SubmissionRecord; isUpdate: boolean }> {
  const db = ensureDb();
  const existingIndex = db.submissions.findIndex(
    (s) => s.registrationId.toUpperCase() === subData.registrationId.toUpperCase()
  );

  const googleDrivePath = generateGoogleDrivePath(subData.eventId, subData.registrationId, subData.teamName);

  if (existingIndex >= 0) {
    const existing = db.submissions[existingIndex];
    const updated: SubmissionRecord = {
      ...existing,
      ...subData,
      googleDrivePath,
      updatedAt: new Date().toISOString(),
      revision: existing.revision + 1,
      status: existing.status === "REJECTED" ? "SUBMITTED" : existing.status,
    };
    db.submissions[existingIndex] = updated;
    writeDb(db);
    return { submission: updated, isUpdate: true };
  } else {
    const subNum = db.submissions.length + 1;
    const submissionId = `SUB-2026-${String(subNum).padStart(3, "0")}`;
    const now = new Date().toISOString();

    const newSub: SubmissionRecord = {
      ...subData,
      submissionId,
      googleDrivePath,
      submittedAt: now,
      updatedAt: now,
      revision: 1,
      status: "SUBMITTED",
      peoplesChoiceVotes: 0,
      isShortlistedForPeoplesChoice: false,
      emailReceiptSent: true,
    };

    db.submissions.push(newSub);

    const reg = db.registrations.find((r) => r.id.toUpperCase() === subData.registrationId.toUpperCase());
    if (reg) {
      reg.status = "SUBMITTED";
    }

    writeDb(db);
    return { submission: newSub, isUpdate: false };
  }
}

export async function updateSubmissionStatus(
  submissionId: string,
  status: SubmissionRecord["status"],
  score?: number,
  juryComments?: string,
  isShortlisted?: boolean
): Promise<SubmissionRecord | null> {
  const db = ensureDb();
  const sub = db.submissions.find((s) => s.submissionId === submissionId);
  if (!sub) return null;

  sub.status = status;
  if (score !== undefined) sub.judgingScore = score;
  if (juryComments !== undefined) sub.juryComments = juryComments;
  if (isShortlisted !== undefined) sub.isShortlistedForPeoplesChoice = isShortlisted;
  sub.updatedAt = new Date().toISOString();

  writeDb(db);
  return sub;
}

export async function castVote(submissionId: string, voterName: string, voterEmail: string, ipHash?: string): Promise<{ success: boolean; message: string; votesCount?: number }> {
  const db = ensureDb();
  const cleanEmail = voterEmail.trim().toLowerCase();

  const sub = db.submissions.find((s) => s.submissionId === submissionId);
  if (!sub) {
    return { success: false, message: "Submission not found." };
  }

  const alreadyVoted = db.votes.find(
    (v) => v.eventId === sub.eventId && v.voterEmail === cleanEmail
  );

  if (alreadyVoted) {
    return {
      success: false,
      message: `You have already cast your vote for ${sub.eventTitle}. One vote per college email is permitted per event.`,
    };
  }

  const newVote: VoteRecord = {
    id: `VOTE-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    submissionId,
    eventId: sub.eventId,
    voterName: voterName.trim(),
    voterEmail: cleanEmail,
    votedAt: new Date().toISOString(),
    ipHash,
  };

  db.votes.push(newVote);
  sub.peoplesChoiceVotes = (sub.peoplesChoiceVotes || 0) + 1;

  writeDb(db);
  return { success: true, message: "Your vote has been recorded successfully!", votesCount: sub.peoplesChoiceVotes };
}

export async function getEventResults(): Promise<ResultsData> {
  const db = ensureDb();
  return db.results || EVENT_CONFIG.initialResults;
}

export async function updateEventResults(resultsData: Partial<ResultsData>): Promise<ResultsData> {
  const db = ensureDb();
  db.results = {
    ...(db.results || EVENT_CONFIG.initialResults),
    ...resultsData,
    lastUpdated: new Date().toISOString(),
  };
  writeDb(db);
  return db.results;
}

export async function getAdminDashboardStats(): Promise<any> {
  const db = ensureDb();
  const totalRegistered = db.registrations.length;
  const totalSubmissions = db.submissions.length;
  const totalVotes = db.votes.length;

  const eventStats = EVENT_CONFIG.events.map((ev) => {
    const regCount = db.registrations.filter((r) => r.eventId === ev.id).length;
    const subCount = db.submissions.filter((s) => s.eventId === ev.id).length;
    return {
      eventId: ev.id,
      title: ev.title,
      registrations: regCount,
      submissions: subCount,
      maxCapacity: EVENT_CONFIG.event.entryLimitPerEvent || 30,
      slotsAvailable: Math.max(0, (EVENT_CONFIG.event.entryLimitPerEvent || 30) - regCount),
    };
  });

  return {
    totalRegistered,
    totalSubmissions,
    totalVotes,
    eventStats,
  };
}

export const getDashboardStats = getAdminDashboardStats;

import fs from "fs/promises";
import path from "path";
import {
  DatabaseSchema,
  SiteSettings,
  AnonymousQuery,
  CouncilEvent,
  CouncilMember,
  Club,
  Notice,
  EventRegistration,
  StudentVoiceSubmission,
  SponsorshipEnquiry,
} from "./types";
import { INITIAL_DB_DATA } from "@/config/initialDbData";

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "db.json");

let memoryCache: DatabaseSchema | null = null;

export async function ensureDb(): Promise<DatabaseSchema> {
  if (memoryCache) {
    return memoryCache;
  }

  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    const content = await fs.readFile(DB_FILE, "utf-8");
    const parsed = JSON.parse(content) as DatabaseSchema;

    // Merge with default schema structure in case new fields were added
    const merged: DatabaseSchema = {
      siteSettings: parsed.siteSettings || INITIAL_DB_DATA.siteSettings,
      anonymousQueries: parsed.anonymousQueries || INITIAL_DB_DATA.anonymousQueries,
      events: parsed.events || INITIAL_DB_DATA.events,
      councilMembers: parsed.councilMembers || INITIAL_DB_DATA.councilMembers,
      clubs: parsed.clubs || INITIAL_DB_DATA.clubs,
      notices: parsed.notices || INITIAL_DB_DATA.notices,
      eventRegistrations: parsed.eventRegistrations || INITIAL_DB_DATA.eventRegistrations,
      studentVoiceSubmissions:
        parsed.studentVoiceSubmissions || INITIAL_DB_DATA.studentVoiceSubmissions,
      sponsorshipEnquiries:
        parsed.sponsorshipEnquiries || INITIAL_DB_DATA.sponsorshipEnquiries,
    };

    memoryCache = merged;
    return merged;
  } catch {
    // If file doesn't exist or is corrupt, initialize with default seed data
    memoryCache = INITIAL_DB_DATA;
    await fs.writeFile(DB_FILE, JSON.stringify(INITIAL_DB_DATA, null, 2), "utf-8");
    return INITIAL_DB_DATA;
  }
}

export async function saveDb(data: DatabaseSchema): Promise<void> {
  memoryCache = data;
  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to db.json:", error);
  }
}

// ---------------- SITE SETTINGS ----------------
export async function getSiteSettings(): Promise<SiteSettings> {
  const db = await ensureDb();
  return db.siteSettings;
}

export async function updateSiteSettings(
  updates: Partial<SiteSettings>
): Promise<SiteSettings> {
  const db = await ensureDb();
  db.siteSettings = {
    ...db.siteSettings,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  await saveDb(db);
  return db.siteSettings;
}

// ---------------- ANONYMOUS QUERIES (ZERO-PII) ----------------
export async function getAnonymousQueries(): Promise<AnonymousQuery[]> {
  const db = await ensureDb();
  return [...db.anonymousQueries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getPublicAnonymousQueries(): Promise<AnonymousQuery[]> {
  const db = await ensureDb();
  return db.anonymousQueries
    .filter((q) => q.isPubliclyPublished && q.status === "RESOLVED")
    .sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
}

export async function getAnonymousQueryByToken(
  token: string
): Promise<AnonymousQuery | null> {
  const db = await ensureDb();
  const normalizedToken = token.trim().toUpperCase();
  const match = db.anonymousQueries.find(
    (q) => q.trackingToken.toUpperCase() === normalizedToken
  );
  return match || null;
}

function generateAnonymousToken(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  let randomCode = "";
  for (let i = 0; i < 2; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ANON-MCOE-${randomNum}-${randomCode}`;
}

export async function createAnonymousQuery(input: {
  category: string;
  departmentScope?: string;
  urgency: "LOW" | "MEDIUM" | "HIGH";
  subject: string;
  description: string;
  allowPublicDisplay?: boolean;
}): Promise<AnonymousQuery> {
  const db = await ensureDb();

  // Generate unique token
  let token = generateAnonymousToken();
  while (db.anonymousQueries.some((q) => q.trackingToken === token)) {
    token = generateAnonymousToken();
  }

  const newQuery: AnonymousQuery = {
    id: `anon-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    trackingToken: token,
    category: input.category.trim(),
    departmentScope: input.departmentScope?.trim() || "General / Campus-wide",
    urgency: input.urgency,
    subject: input.subject.trim(),
    description: input.description.trim(),
    allowPublicDisplay: Boolean(input.allowPublicDisplay),
    status: "SUBMITTED",
    officialCouncilResponse: "",
    isPubliclyPublished: false,
    isReviewed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.anonymousQueries.unshift(newQuery);
  await saveDb(db);
  return newQuery;
}

export async function updateAnonymousQuery(
  id: string,
  updates: Partial<AnonymousQuery>
): Promise<AnonymousQuery | null> {
  const db = await ensureDb();
  const index = db.anonymousQueries.findIndex((q) => q.id === id);
  if (index === -1) return null;

  const existing = db.anonymousQueries[index];
  const updated: AnonymousQuery = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  if (updates.officialCouncilResponse && updates.officialCouncilResponse !== existing.officialCouncilResponse) {
    updated.responseTimestamp = new Date().toISOString();
  }

  db.anonymousQueries[index] = updated;
  await saveDb(db);
  return updated;
}

// ---------------- EVENTS ----------------
export async function getEvents(): Promise<CouncilEvent[]> {
  const db = await ensureDb();
  return db.events;
}

export async function getEventByIdOrSlug(
  idOrSlug: string
): Promise<CouncilEvent | null> {
  const db = await ensureDb();
  const match = db.events.find(
    (e) => e.id === idOrSlug || e.slug.toLowerCase() === idOrSlug.toLowerCase()
  );
  return match || null;
}

export async function createEvent(
  eventData: Omit<CouncilEvent, "id" | "createdAt">
): Promise<CouncilEvent> {
  const db = await ensureDb();
  const newEvent: CouncilEvent = {
    ...eventData,
    id: `evt-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  db.events.unshift(newEvent);
  await saveDb(db);
  return newEvent;
}

export async function updateEvent(
  id: string,
  updates: Partial<CouncilEvent>
): Promise<CouncilEvent | null> {
  const db = await ensureDb();
  const index = db.events.findIndex((e) => e.id === id);
  if (index === -1) return null;

  db.events[index] = { ...db.events[index], ...updates };
  await saveDb(db);
  return db.events[index];
}

export async function deleteEvent(id: string): Promise<boolean> {
  const db = await ensureDb();
  const initialLength = db.events.length;
  db.events = db.events.filter((e) => e.id !== id);
  if (db.events.length !== initialLength) {
    await saveDb(db);
    return true;
  }
  return false;
}

// ---------------- COUNCIL MEMBERS ----------------
export async function getCouncilMembers(): Promise<CouncilMember[]> {
  const db = await ensureDb();
  return [...db.councilMembers].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function createCouncilMember(
  memberData: Omit<CouncilMember, "id">
): Promise<CouncilMember> {
  const db = await ensureDb();
  const newMember: CouncilMember = {
    ...memberData,
    id: `mem-${Date.now()}`,
  };
  db.councilMembers.push(newMember);
  await saveDb(db);
  return newMember;
}

export async function updateCouncilMember(
  id: string,
  updates: Partial<CouncilMember>
): Promise<CouncilMember | null> {
  const db = await ensureDb();
  const index = db.councilMembers.findIndex((m) => m.id === id);
  if (index === -1) return null;

  db.councilMembers[index] = { ...db.councilMembers[index], ...updates };
  await saveDb(db);
  return db.councilMembers[index];
}

export async function deleteCouncilMember(id: string): Promise<boolean> {
  const db = await ensureDb();
  const initialLength = db.councilMembers.length;
  db.councilMembers = db.councilMembers.filter((m) => m.id !== id);
  if (db.councilMembers.length !== initialLength) {
    await saveDb(db);
    return true;
  }
  return false;
}

// ---------------- CLUBS ----------------
export async function getClubs(): Promise<Club[]> {
  const db = await ensureDb();
  return db.clubs;
}

export async function createClub(clubData: Omit<Club, "id">): Promise<Club> {
  const db = await ensureDb();
  const newClub: Club = {
    ...clubData,
    id: `club-${Date.now()}`,
  };
  db.clubs.push(newClub);
  await saveDb(db);
  return newClub;
}

export async function updateClub(
  id: string,
  updates: Partial<Club>
): Promise<Club | null> {
  const db = await ensureDb();
  const index = db.clubs.findIndex((c) => c.id === id);
  if (index === -1) return null;

  db.clubs[index] = { ...db.clubs[index], ...updates };
  await saveDb(db);
  return db.clubs[index];
}

export async function deleteClub(id: string): Promise<boolean> {
  const db = await ensureDb();
  const initialLength = db.clubs.length;
  db.clubs = db.clubs.filter((c) => c.id !== id);
  if (db.clubs.length !== initialLength) {
    await saveDb(db);
    return true;
  }
  return false;
}

// ---------------- NOTICES ----------------
export async function getNotices(): Promise<Notice[]> {
  const db = await ensureDb();
  return [...db.notices].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function createNotice(
  noticeData: Omit<Notice, "id" | "publishedAt">
): Promise<Notice> {
  const db = await ensureDb();
  const newNotice: Notice = {
    ...noticeData,
    id: `not-${Date.now()}`,
    publishedAt: new Date().toISOString(),
  };
  db.notices.unshift(newNotice);
  await saveDb(db);
  return newNotice;
}

export async function updateNotice(
  id: string,
  updates: Partial<Notice>
): Promise<Notice | null> {
  const db = await ensureDb();
  const index = db.notices.findIndex((n) => n.id === id);
  if (index === -1) return null;

  db.notices[index] = { ...db.notices[index], ...updates };
  await saveDb(db);
  return db.notices[index];
}

export async function deleteNotice(id: string): Promise<boolean> {
  const db = await ensureDb();
  const initialLength = db.notices.length;
  db.notices = db.notices.filter((n) => n.id !== id);
  if (db.notices.length !== initialLength) {
    await saveDb(db);
    return true;
  }
  return false;
}

// ---------------- IDENTIFIED FORM 1: EVENT REGISTRATIONS ----------------
export async function getEventRegistrations(): Promise<EventRegistration[]> {
  const db = await ensureDb();
  return [...db.eventRegistrations].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createEventRegistration(
  input: Omit<EventRegistration, "id" | "referenceNumber" | "createdAt" | "status" | "isContacted">
): Promise<EventRegistration> {
  const db = await ensureDb();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const ref = `MCOE-EVT-2026-${randomSuffix}`;

  const newReg: EventRegistration = {
    ...input,
    id: `reg-${Date.now()}`,
    referenceNumber: ref,
    status: "REGISTERED",
    isContacted: false,
    createdAt: new Date().toISOString(),
  };

  db.eventRegistrations.unshift(newReg);
  await saveDb(db);
  return newReg;
}

export async function updateEventRegistration(
  id: string,
  updates: Partial<EventRegistration>
): Promise<EventRegistration | null> {
  const db = await ensureDb();
  const index = db.eventRegistrations.findIndex((r) => r.id === id);
  if (index === -1) return null;

  db.eventRegistrations[index] = { ...db.eventRegistrations[index], ...updates };
  await saveDb(db);
  return db.eventRegistrations[index];
}

// ---------------- IDENTIFIED FORM 2: STUDENT VOICE & SUGGESTIONS ----------------
export async function getStudentVoiceSubmissions(): Promise<StudentVoiceSubmission[]> {
  const db = await ensureDb();
  return [...db.studentVoiceSubmissions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createStudentVoiceSubmission(
  input: Omit<StudentVoiceSubmission, "id" | "referenceNumber" | "createdAt" | "status" | "isReviewed">
): Promise<StudentVoiceSubmission> {
  const db = await ensureDb();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const ref = `MCOE-VOICE-${randomSuffix}`;

  const newSubmission: StudentVoiceSubmission = {
    ...input,
    id: `voice-${Date.now()}`,
    referenceNumber: ref,
    status: "RECEIVED",
    isReviewed: false,
    createdAt: new Date().toISOString(),
  };

  db.studentVoiceSubmissions.unshift(newSubmission);
  await saveDb(db);
  return newSubmission;
}

export async function updateStudentVoiceSubmission(
  id: string,
  updates: Partial<StudentVoiceSubmission>
): Promise<StudentVoiceSubmission | null> {
  const db = await ensureDb();
  const index = db.studentVoiceSubmissions.findIndex((s) => s.id === id);
  if (index === -1) return null;

  db.studentVoiceSubmissions[index] = {
    ...db.studentVoiceSubmissions[index],
    ...updates,
  };
  await saveDb(db);
  return db.studentVoiceSubmissions[index];
}

// ---------------- IDENTIFIED FORM 3: SPONSORSHIP ENQUIRIES ----------------
export async function getSponsorshipEnquiries(): Promise<SponsorshipEnquiry[]> {
  const db = await ensureDb();
  return [...db.sponsorshipEnquiries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createSponsorshipEnquiry(
  input: Omit<SponsorshipEnquiry, "id" | "referenceNumber" | "createdAt" | "status" | "isContacted">
): Promise<SponsorshipEnquiry> {
  const db = await ensureDb();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const ref = `MCOE-SPON-${randomSuffix}`;

  const newEnquiry: SponsorshipEnquiry = {
    ...input,
    id: `spon-${Date.now()}`,
    referenceNumber: ref,
    status: "NEW",
    isContacted: false,
    createdAt: new Date().toISOString(),
  };

  db.sponsorshipEnquiries.unshift(newEnquiry);
  await saveDb(db);
  return newEnquiry;
}

export async function updateSponsorshipEnquiry(
  id: string,
  updates: Partial<SponsorshipEnquiry>
): Promise<SponsorshipEnquiry | null> {
  const db = await ensureDb();
  const index = db.sponsorshipEnquiries.findIndex((s) => s.id === id);
  if (index === -1) return null;

  db.sponsorshipEnquiries[index] = {
    ...db.sponsorshipEnquiries[index],
    ...updates,
  };
  await saveDb(db);
  return db.sponsorshipEnquiries[index];
}

// ---------------- ADMIN KPI METRICS ----------------
export async function getAdminStats() {
  const db = await ensureDb();
  const activeEvents = db.events.filter(
    (e) => e.status === "UPCOMING" || e.status === "ONGOING"
  ).length;
  const totalRegistrations = db.eventRegistrations.length;
  const unreadAnonymousQueries = db.anonymousQueries.filter(
    (q) => !q.isReviewed || q.status === "SUBMITTED"
  ).length;
  const urgentAnonymousQueries = db.anonymousQueries.filter(
    (q) => q.urgency === "HIGH" && q.status !== "RESOLVED"
  ).length;
  const unreadStudentVoice = db.studentVoiceSubmissions.filter(
    (v) => !v.isReviewed || v.status === "RECEIVED"
  ).length;
  const pendingSponsorships = db.sponsorshipEnquiries.filter(
    (s) => s.status === "NEW" || s.status === "IN_DISCUSSION"
  ).length;

  return {
    activeEvents,
    totalEvents: db.events.length,
    totalRegistrations,
    unreadAnonymousQueries,
    urgentAnonymousQueries,
    totalAnonymousQueries: db.anonymousQueries.length,
    unreadStudentVoice,
    totalStudentVoice: db.studentVoiceSubmissions.length,
    pendingSponsorships,
    totalSponsorships: db.sponsorshipEnquiries.length,
    totalNotices: db.notices.length,
    totalMembers: db.councilMembers.length,
    totalClubs: db.clubs.length,
  };
}

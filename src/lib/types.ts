export type UrgencyLevel = "LOW" | "MEDIUM" | "HIGH";

export type AnonymousQueryStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "ESCALATED"
  | "RESOLVED"
  | "ARCHIVED";

export type EventCategory =
  | "FLAGSHIP"
  | "TECHNICAL"
  | "CULTURAL"
  | "SPORTS"
  | "WORKSHOP"
  | "NSS_SOCIAL";

export type EventStatus = "UPCOMING" | "ONGOING" | "COMPLETED";

export type CouncilWing =
  | "FACULTY"
  | "CORE"
  | "SECRETARY"
  | "DR"
  | "WEB_OPS";

export type ClubCategory =
  | "DEPARTMENTAL"
  | "TECHNICAL_CHAPTER"
  | "CULTURAL"
  | "SPORTS"
  | "SOCIAL_OUTREACH";

export type NoticeCategory =
  | "CIRCULAR"
  | "RULEBOOK"
  | "TIMETABLE"
  | "ELECTION"
  | "ANNOUNCEMENT";

export type PartnershipType =
  | "TITLE_SPONSOR"
  | "CO_SPONSOR"
  | "STALL_PARTNER"
  | "WORKSHOP_PARTNER"
  | "INTER_COLLEGE_INVITE"
  | "MEDIA_PARTNER";

export interface SiteSettings {
  id: string;
  academicTenure: string; // e.g. "2026–2027"
  instagramUrl: string;
  instagramHandle: string;
  whatsappChannelUrl: string;
  officialEmail: string;
  contactPhone1: string;
  contactPhone2: string;
  annualBrochurePdfUrl?: string;
  codeOfConductPdfUrl?: string;
  collegeAddress: string;
  affiliationNotice: string;
  updatedAt: string;
}

export interface AnonymousQuery {
  id: string;
  trackingToken: string; // e.g. "ANON-MCOE-8492-X7"
  category: string;
  departmentScope: string;
  urgency: UrgencyLevel;
  subject: string;
  description: string;
  allowPublicDisplay: boolean;
  status: AnonymousQueryStatus;
  officialCouncilResponse?: string;
  responseTimestamp?: string;
  isPubliclyPublished: boolean;
  isReviewed: boolean;
  createdAt: string;
  updatedAt: string;
  // NOTE: STRICT ZERO-PII ARCHITECTURE. No name, email, phone, roll, IP, or user-agent is ever logged.
}

export interface EventScheduleItem {
  time: string;
  activity: string;
  details?: string;
}

export interface CouncilEvent {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  shortDescription: string;
  fullDescription: string;
  rules: string[];
  eventDate: string;
  time: string;
  venue: string;
  organizingWing: string;
  entryFee: string;
  prizePool: string;
  posterUrl: string;
  rulebookPdfUrl?: string;
  schedule: EventScheduleItem[];
  coordinatorName: string;
  coordinatorPhone: string;
  eligibility: string;
  status: EventStatus;
  isFeatured: boolean;
  registrationOpen: boolean;
  externalRegUrl?: string;
  createdAt: string;
}

export interface CouncilMember {
  id: string;
  name: string;
  designation: string;
  wing: CouncilWing;
  department: string;
  year?: string;
  tenure: string;
  photoUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  email?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Club {
  id: string;
  name: string;
  acronym: string;
  category: ClubCategory;
  department: string;
  description: string;
  leadName: string;
  leadContact?: string;
  instagramUrl?: string;
  whatsappUrl?: string;
  logoUrl?: string;
  featuredTags: string[];
}

export interface Notice {
  id: string;
  refNumber: string; // e.g. "MCOE/SC/2026/04"
  title: string;
  category: NoticeCategory;
  summary: string;
  pdfUrl?: string;
  fileSize?: string;
  isPinned: boolean;
  publishedAt: string;
}

export interface EventRegistration {
  id: string;
  referenceNumber: string; // e.g. "MCOE-EVT-2026-8291"
  eventId: string;
  eventTitle: string;
  studentName: string;
  collegeName: string;
  department: string;
  academicYear: string;
  prn: string;
  phone: string;
  email: string;
  teamName?: string;
  teamSize: number;
  message?: string;
  status: "REGISTERED" | "CONFIRMED" | "WAITLISTED" | "CANCELLED";
  adminNotes?: string;
  isContacted: boolean;
  createdAt: string;
}

export interface StudentVoiceSubmission {
  id: string;
  referenceNumber: string; // e.g. "MCOE-VOICE-7104"
  category: string;
  studentName: string;
  department: string;
  academicYear: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "RECEIVED" | "UNDER_REVIEW" | "ACCEPTED" | "CLOSED";
  adminNotes?: string;
  isReviewed: boolean;
  createdAt: string;
}

export interface SponsorshipEnquiry {
  id: string;
  referenceNumber: string; // e.g. "MCOE-SPON-3921"
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  partnershipType: PartnershipType;
  targetEvent: string;
  message: string;
  status: "NEW" | "IN_DISCUSSION" | "CONFIRMED" | "DECLINED";
  adminNotes?: string;
  isContacted: boolean;
  createdAt: string;
}

export interface DatabaseSchema {
  siteSettings: SiteSettings;
  anonymousQueries: AnonymousQuery[];
  events: CouncilEvent[];
  councilMembers: CouncilMember[];
  clubs: Club[];
  notices: Notice[];
  eventRegistrations: EventRegistration[];
  studentVoiceSubmissions: StudentVoiceSubmission[];
  sponsorshipEnquiries: SponsorshipEnquiry[];
}

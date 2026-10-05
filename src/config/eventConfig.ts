import { CouncilMember } from "@/lib/types";

export interface JudgingRubric {
  label: string;
  marks: number;
}

export interface EventDetail {
  id: string;
  number: string;
  title: string;
  tagline: string;
  theme?: string;
  headline?: string;
  concept?: string;
  teamSize: string;
  minTeamMembers: number;
  maxTeamMembers: number;
  maxEntries: number; // 30 entries max
  duration: string;
  venue: string;
  submissionDeadline: string;
  submissionFormat: string;
  allowedFileTypes: string[];
  maxFileSizeBytes: number;
  rules: string[];
  judgingCriteria: JudgingRubric[];
  awardInfo?: string;
  specialAwards?: string[];
  prohibitedAreas?: string[];
  permittedAreas?: string[];
  disqualificationWarning?: string;
  iconName: string;
  colorTheme: {
    badgeBg: string;
    badgeText: string;
    accent: string;
    border: string;
    lightBg: string;
  };
}

export interface WasteHuntZone {
  id: string;
  code: string;
  name: string;
  description: string;
  permittedHighlights: string[];
  safetyNotes: string;
  status: "ACTIVE" | "MAINTENANCE" | "RESTRICTED";
}

export interface ScheduleItem {
  id: string;
  dayLabel: string;
  dateStr: string;
  timeSlot: string;
  title: string;
  category: "BRIEFING" | "EVENT" | "DEADLINE" | "JUDGING" | "VALEDICTORY";
  venue: string;
  description: string;
  eventsInvolved: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Events" | "Waste Hunt" | "Submissions" | "Certificates";
}

export interface EventWinner {
  eventId: string;
  eventTitle: string;
  winner: { teamName: string; leadName: string; department: string; score: number };
  runnerUp: { teamName: string; leadName: string; department: string; score: number };
  secondRunnerUp?: { teamName: string; leadName: string; department: string; score: number };
  specialAwards?: { title: string; teamName: string; leadName?: string; notes: string }[];
}

export interface ResultsData {
  isAnnounced: boolean;
  announcementNotice: string;
  lastUpdated?: string;
  eventWinners: EventWinner[];
}

export const EVENT_CONFIG = {
  // Institution & Identity
  college: {
    fullName: "PES Modern College of Engineering, Pune",
    shortName: "PES MCOE",
    city: "Pune, Maharashtra",
    address: "1186/A, Off J.M. Road, Shivajinagar, Pune - 411005",
    accreditation: "NAAC 'A+' Grade Accredited • Approved by AICTE • Affiliated to SPPU",
    organizer: "Student Council, PES Modern College of Engineering",
    email: "studentcouncil@moderncoe.edu.in",
    supportPhone: "+91 20 2553 3638 / +91 98765 43210",
    logos: {
      college: "/images/logo-college.svg",
      council: "/images/logo-council.svg",
      swachhBharat: "/images/swachh-bharat-emblem.svg",
    },
  },

  // Event Branding
  event: {
    name: "SWACHH BHARAT WEEK 2026",
    code: "SBW-2026",
    edition: "Annual Campus Sustainability Edition",
    tagline: "Clean Campus. Responsible Citizens. Sustainable Future.",
    subheading: "An inter-collegiate campus initiative encouraging students to identify, create, express and act for a cleaner and more sustainable campus.",
    heroStatement: "PES Modern College of Engineering Student Council brings together students across all departments to foster civic consciousness, creative advocacy, and practical solutions for environmental stewardship across 3 core competitions.",
    entryLimitPerEvent: 30,
    certificationNote: "Official Certificate of Participation awarded to all verified entries from the Student Council.",
  },

  // Central Timelines
  dates: {
    eventDayTarget: "2026-10-15T09:00:00+05:30",
    eventStartDate: "2026-10-15T09:00:00+05:30",
    eventEndDate: "2026-10-20T18:00:00+05:30",
    registrationDeadline: "2026-10-14T23:59:00+05:30",
    posterSubmissionDeadline: "2026-10-15T17:00:00+05:30",
    reelSubmissionDeadline: "2026-10-15T23:59:00+05:30",
    wasteHuntSubmissionDeadline: "2026-10-16T15:00:00+05:30",
    resultsAnnouncementDate: "2026-10-20T16:00:00+05:30",
  },

  // Google Drive & Google Sheet Official Links (Updated submission folder)
  googleDrive: {
    rootFolderUrl: "https://drive.google.com/drive/folders/1t6vnXjm7Bl_maPXcCGQYUFeFkyoROFVb?usp=sharing",
    rootFolderId: "1t6vnXjm7Bl_maPXcCGQYUFeFkyoROFVb",
  },

  googleSheet: {
    sheetUrl: "https://docs.google.com/spreadsheets/d/12cn0PC-xwAetsA15dO3dCMpL8kxe0OO0TOSHP9kXNwM/edit?usp=sharing",
    maxEntriesPerEvent: 30,
  },

  // Security Credentials (Updated)
  security: {
    adminUsername: "admin123",
    adminPassword: "Admin@123",
    adminPin: "Admin@123",
    registrationIdPrefix: "SBW-2026-",
  },

  // The 3 Active Activities (Poster Making, Reel Making, Waste Hunt - Strict Limit: 30 entries each)
  events: [
    {
      id: "poster-making",
      number: "01",
      title: "Poster Making",
      tagline: "Turn an idea into a visual message.",
      theme: "Swachh Campus, Sustainable Future",
      teamSize: "1–2 Students",
      minTeamMembers: 1,
      maxTeamMembers: 2,
      maxEntries: 30,
      duration: "Day of the Event (Submissions by 5:00 PM)",
      venue: "Digital / Central Computer Labs & Online Portal",
      submissionDeadline: "5:00 PM on Event Day",
      submissionFormat: "PNG / JPG / PDF (Max 15MB)",
      allowedFileTypes: [".png", ".jpg", ".jpeg", ".pdf"],
      maxFileSizeBytes: 15 * 1024 * 1024,
      awardInfo: "Official Certificate of Participation for all valid entries.",
      iconName: "Palette",
      colorTheme: {
        badgeBg: "bg-emerald-100",
        badgeText: "text-emerald-800",
        accent: "emerald",
        border: "border-emerald-200",
        lightBg: "bg-emerald-50/60",
      },
      rules: [
        "Maximum 30 team entries accepted on a first-come, first-served basis.",
        "Poster must be created on the day of the event.",
        "Digital tools such as Canva, Adobe Express, PowerPoint, Photoshop, Illustrator or similar tools are allowed.",
        "Previously created posters cannot be submitted.",
        "Poster must be completely original work of the registered participant(s).",
        "Poster content must relate directly to Swachh Bharat, cleanliness, sustainability, waste management, or environmental responsibility.",
        "Recommended aspect ratio: A4 or A3 portrait format.",
        "All registered teams receive an official Certificate of Participation.",
      ],
      judgingCriteria: [
        { label: "Creativity", marks: 25 },
        { label: "Theme Relevance", marks: 25 },
        { label: "Visual Design", marks: 20 },
        { label: "Message Clarity", marks: 15 },
        { label: "Originality", marks: 10 },
        { label: "Overall Impact", marks: 5 },
      ],
    },
    {
      id: "reel-making",
      number: "02",
      title: "Reel Making",
      tagline: "Tell the story of cleanliness in 90 seconds.",
      theme: "Swachh Bharat in Motion",
      teamSize: "1–3 Students",
      minTeamMembers: 1,
      maxTeamMembers: 3,
      maxEntries: 30,
      duration: "Maximum 90 Seconds",
      venue: "Campus Approved Zones & Online Upload",
      submissionDeadline: "11:59 PM on the same day",
      submissionFormat: "MP4 / MOV (9:16 Vertical, Max 50MB)",
      allowedFileTypes: [".mp4", ".mov"],
      maxFileSizeBytes: 50 * 1024 * 1024,
      awardInfo: "Official Certificate of Participation for all valid entries.",
      iconName: "Video",
      colorTheme: {
        badgeBg: "bg-orange-100",
        badgeText: "text-orange-800",
        accent: "orange",
        border: "border-orange-200",
        lightBg: "bg-orange-50/60",
      },
      rules: [
        "Maximum 30 team entries accepted on a first-come, first-served basis.",
        "Reel must be created on the event day.",
        "Maximum duration: 90 seconds (recommended 30–90 seconds).",
        "Recommended format: 9:16 vertical video (1080x1920, MP4).",
        "Content must directly relate to cleanliness, sustainability, waste management, or Swachh Bharat.",
        "STRICT: Do not disturb lectures, practicals, or any academic activities during shooting.",
        "STRICT: Do not film in prohibited or restricted areas (Mechanical Workshop, Pegasus Room, Admin, Faculty Cabins, Labs, etc.).",
        "All registered teams receive an official Certificate of Participation.",
      ],
      judgingCriteria: [
        { label: "Creativity & Concept", marks: 25 },
        { label: "Swachh Bharat Relevance", marks: 20 },
        { label: "Storytelling", marks: 20 },
        { label: "Editing Quality", marks: 15 },
        { label: "Awareness Impact", marks: 15 },
        { label: "Originality", marks: 5 },
      ],
    },
    {
      id: "waste-hunt",
      number: "03",
      title: "Waste Hunt",
      headline: "Find the Problem. Understand It. Solve It.",
      tagline: "Find the problem. Understand it. Solve it.",
      concept: "Participants explore permitted areas of the PES Modern College of Engineering campus to identify existing waste-management or cleanliness bottlenecks and propose practical engineering solutions.",
      teamSize: "2–4 Students",
      minTeamMembers: 2,
      maxTeamMembers: 4,
      maxEntries: 30,
      duration: "2 Hours Campus Reconnaissance + Submission",
      venue: "Permitted Campus Zones (Zones A to E)",
      submissionDeadline: "3:00 PM on Waste Hunt Day",
      submissionFormat: "Photos (JPG/PNG) + Location + Cause + Suggested Solution per finding",
      allowedFileTypes: [".png", ".jpg", ".jpeg", ".webp"],
      maxFileSizeBytes: 10 * 1024 * 1024,
      awardInfo: "Official Certificate of Participation for all valid entries.",
      iconName: "Trash2",
      colorTheme: {
        badgeBg: "bg-sky-100",
        badgeText: "text-sky-800",
        accent: "sky",
        border: "border-sky-200",
        lightBg: "bg-sky-50/60",
      },
      prohibitedAreas: [
        "Mechanical Workshop",
        "Pegasus Room",
        "Administration Section & Principal Office",
        "Staff Rooms & Department Cabins",
        "Faculty Offices",
        "Classrooms where lectures or tutorials are in progress",
        "Laboratories and Research Centres",
        "Examination rooms/halls and confidential sections",
        "Substations, Electrical panels & Roof edges",
        "Any restricted-access area specifically marked or prohibited by college authorities",
      ],
      permittedAreas: [
        "Corridors & Main Hallways (quietly without disturbing classes)",
        "Staircases & Landings",
        "College Grounds & Sports Area",
        "Open Campus Walkways & Plazas",
        "Canteen Surroundings & Food Kiosks",
        "Parking Areas (Two-wheeler & Four-wheeler bays)",
        "Botanical Gardens & Lawn perimeters",
        "Common Student Amphitheatre & Reading verandas",
      ],
      disqualificationWarning: "CRITICAL: Participants MUST NOT intentionally create waste for the competition. For example, throwing a bottle or wrapper on the ground and photographing it as a 'waste problem' will result in immediate disqualification and reporting to the disciplinary committee.",
      rules: [
        "Strict limit: Only 30 squads accepted.",
        "Teams must consist of 2 to 4 registered students.",
        "Maximum recommended findings: 5 findings per team.",
        "For each finding, team must document: 1) Problem Title, 2) Clear Photograph, 3) Campus Location/Zone, 4) Root Cause Analysis, 5) Realistic Actionable Solution.",
        "Teams must only navigate permitted campus zones (Zones A to E).",
        "All registered squads receive an official Certificate of Participation.",
      ],
      judgingCriteria: [
        { label: "Problem Identification", marks: 25 },
        { label: "Photographic Evidence", marks: 15 },
        { label: "Problem Understanding", marks: 15 },
        { label: "Creativity of Solution", marks: 20 },
        { label: "Practicality & Feasibility", marks: 15 },
        { label: "Environmental Impact", marks: 10 },
      ],
      specialAwards: [
        "Best Waste Hunt Team",
        "Best Waste Identification",
        "Most Innovative Solution",
      ],
    },
  ] as EventDetail[],

  // Waste Hunt Permitted Zones
  wasteHuntZones: [
    {
      id: "zone-a",
      code: "ZONE A",
      name: "Main Academic Building & Common Corridors",
      description: "Ground floor main entrance lobby, central atrium walkways, central staircase landings, notice board verandas.",
      permittedHighlights: ["Entrance lobby dustbin points", "Stairwell landings", "Water cooler stations", "Central foyer waste bins"],
      safetyNotes: "Maintain complete silence near lecture rooms. Do not enter any administrative cabins or active classrooms.",
      status: "ACTIVE",
    },
    {
      id: "zone-b",
      code: "ZONE B",
      name: "Canteen Surroundings & Food Court Plaza",
      description: "Cafeteria outdoor seating perimeter, food packaging disposal stations, snack corner surroundings, handwash drain areas.",
      permittedHighlights: ["Single-use plastic disposal points", "Food waste bin segregation", "Wash basin drainage", "Packaging collection points"],
      safetyNotes: "Watch out for wet floors and kitchen delivery vehicles. Do not enter inside commercial cooking zones.",
      status: "ACTIVE",
    },
    {
      id: "zone-c",
      code: "ZONE C",
      name: "Botanical Garden & Open Campus Walkways",
      description: "Lawn pathways, perimeter green corridors, tree leaf compost beds, sitting benches.",
      permittedHighlights: ["Dry leaf & organic litter management", "Garden pathway bin availability", "Compost pit surroundings", "Lawn perimeter cleanliness"],
      safetyNotes: "Stay strictly on designated pathways. Do not disturb flora or botanical nameplates.",
      status: "ACTIVE",
    },
    {
      id: "zone-d",
      code: "ZONE D",
      name: "Parking Areas & Gate Perimeters",
      description: "Two-wheeler parking bays, four-wheeler lanes, main security gate barrier area, side bicycle racks.",
      permittedHighlights: ["Vehicle bay litter accumulation", "Storm-water drain grates", "Entry gate waste clearance", "Signage readability"],
      safetyNotes: "Be cautious of moving student and staff two-wheelers. Wear bright clothing.",
      status: "ACTIVE",
    },
    {
      id: "zone-e",
      code: "ZONE E",
      name: "Student Common Areas & Amphitheatre",
      description: "Amphitheatre seating tiers, gazebo pavilion, reading room porch, club notice kiosks.",
      permittedHighlights: ["Banner & poster cleanup", "Tier seating litter", "Club kiosk notice clearing", "General waste bin coverage"],
      safetyNotes: "Ensure steps and seating tiers are checked safely without climbing railings.",
      status: "ACTIVE",
    },
  ] as WasteHuntZone[],

  // Student Council Members & Organizing Body
  councilMembers: [
    {
      id: "mem-patron",
      name: "Prof. (Dr.) K. R. Joshi",
      role: "Patron & Principal",
      category: "PATRON",
      department: "PES Modern College of Engineering",
      bio: "Leading institutional excellence and sustainability initiatives across Pune campus.",
      badge: "PRINCIPAL",
    },
    {
      id: "mem-convener",
      name: "Dr. S. R. Patil",
      role: "Faculty Convener & Dean Student Affairs",
      category: "FACULTY",
      department: "Dean Student Affairs / NSS Cell",
      email: "studentaffairs@moderncoe.edu.in",
      phone: "+91 20 2553 3638",
      bio: "Guiding student initiatives, NSS activities, and Swachh Bharat community outreach.",
      badge: "FACULTY IN-CHARGE",
    },
    {
      id: "mem-president",
      name: "Aditya Deshmukh",
      role: "Student Council President",
      category: "EXECUTIVE",
      department: "BE Computer Engineering",
      year: "Final Year (BE)",
      email: "president.council@moderncoe.edu.in",
      phone: "+91 98765 12340",
      bio: "Overseeing college-wide execution of Swachh Bharat Week 2026 events and student representation.",
      badge: "PRESIDENT",
    },
    {
      id: "mem-vice-president",
      name: "Sneha Kulkarni",
      role: "Vice President",
      category: "EXECUTIVE",
      department: "BE Electronics & Telecommunication",
      year: "Final Year (BE)",
      email: "vp.council@moderncoe.edu.in",
      bio: "Coordinating inter-departmental student participation and jury communications.",
      badge: "VICE PRESIDENT",
    },
    {
      id: "mem-gen-secretary",
      name: "Prathamesh More",
      role: "General Secretary",
      category: "EXECUTIVE",
      department: "TE Information Technology",
      year: "Third Year (TE)",
      email: "gs.council@moderncoe.edu.in",
      bio: "Managing event administrative clearances, stage operations, and official notices.",
      badge: "GENERAL SECRETARY",
    },
    {
      id: "mem-tech-lead",
      name: "Tanvi Kulkarni",
      role: "Technical & Portal Lead",
      category: "TECHNICAL",
      department: "TE Information Technology",
      year: "Third Year (TE)",
      email: "tech.council@moderncoe.edu.in",
      bio: "Architecting the official Swachh Bharat digital portal, Google Drive automation, and certificate engine.",
      badge: "TECH LEAD",
    },
    {
      id: "mem-tech-co-lead",
      name: "Omkar Patil",
      role: "Web & Database Head",
      category: "TECHNICAL",
      department: "TE AI & Data Science",
      year: "Third Year (TE)",
      email: "data.council@moderncoe.edu.in",
      bio: "Ensuring real-time Google Sheets sync, participant rosters, and submission pipeline.",
      badge: "WEB HEAD",
    },
    {
      id: "mem-waste-hunt-lead",
      name: "Rohan Shinde",
      role: "Waste Hunt Head & Coordinator",
      category: "EVENT_LEAD",
      department: "TE Mechanical Engineering",
      year: "Third Year (TE)",
      email: "wastehunt.council@moderncoe.edu.in",
      bio: "Managing Zone A to E campus reconnaissance, volunteer marshals, and audit verification.",
      badge: "WASTE HUNT LEAD",
    },
    {
      id: "mem-pr-lead",
      name: "Kunal Kadam",
      role: "Media & PR In-charge",
      category: "CORE",
      department: "SE AI & Data Science",
      year: "Second Year (SE)",
      email: "pr.council@moderncoe.edu.in",
      bio: "Handling campus-wide outreach, Reel Making promotions, and social media coverage.",
      badge: "MEDIA & PR",
    },
    {
      id: "mem-logistics-lead",
      name: "Ananya Joshi",
      role: "Campus Logistics & Safety Lead",
      category: "CORE",
      department: "SE Electrical Engineering",
      year: "Second Year (SE)",
      email: "logistics.council@moderncoe.edu.in",
      bio: "Supervising venue setups, zone safety boundaries, and participant assistance desks.",
      badge: "LOGISTICS LEAD",
    },
  ] as CouncilMember[],

  // Schedule Timeline for the 3 Activities
  schedule: [
    {
      id: "sch-1",
      dayLabel: "Day 1",
      dateStr: "Thursday, Oct 15, 2026",
      timeSlot: "09:00 AM - 10:00 AM",
      title: "Inauguration & Swachhta Pledge",
      category: "BRIEFING",
      venue: "Main Auditorium, Ground Floor",
      description: "Official flag-off by Principal, Dean of Student Affairs, and Student Council President. Swachhta pledge by all registered participants.",
      eventsInvolved: ["All Competitions"],
    },
    {
      id: "sch-2",
      dayLabel: "Day 1",
      dateStr: "Thursday, Oct 15, 2026",
      timeSlot: "10:30 AM - 05:00 PM",
      title: "Poster Making Competition",
      category: "EVENT",
      venue: "Digital Labs & Online Submission Portal",
      description: "On-site and digital poster creations depicting campus sustainability, source segregation, and eco-initiatives.",
      eventsInvolved: ["Poster Making"],
    },
    {
      id: "sch-3",
      dayLabel: "Day 2",
      dateStr: "Friday, Oct 16, 2026",
      timeSlot: "10:00 AM - 01:00 PM",
      title: "Waste Hunt Campus Reconnaissance",
      category: "EVENT",
      venue: "Approved Campus Zones (A to E)",
      description: "Registered student squads fan out across campus zones to inspect, document, analyze, and formulate engineering remedies for waste bottlenecks.",
      eventsInvolved: ["Waste Hunt"],
    },
    {
      id: "sch-4",
      dayLabel: "Day 2",
      dateStr: "Friday, Oct 16, 2026",
      timeSlot: "03:00 PM - 03:30 PM",
      title: "Waste Hunt Findings Submission Deadline",
      category: "DEADLINE",
      venue: "Online Event Portal & Google Drive",
      description: "Final deadline for Waste Hunt teams to upload photographs, cause analysis, and suggested solutions.",
      eventsInvolved: ["Waste Hunt"],
    },
    {
      id: "sch-5",
      dayLabel: "Day 3",
      dateStr: "Saturday, Oct 17, 2026",
      timeSlot: "09:00 AM - 11:59 PM",
      title: "Reel Making Filming & Submission Window",
      category: "EVENT",
      venue: "Campus Grounds & Digital Upload",
      description: "Short vertical video creations showcasing campus cleanliness, awareness drives, and student initiatives.",
      eventsInvolved: ["Reel Making"],
    },
    {
      id: "sch-6",
      dayLabel: "Day 4",
      dateStr: "Monday, Oct 19, 2026",
      timeSlot: "10:00 AM - 05:00 PM",
      title: "Jury Evaluation & Shortlist Reviews",
      category: "JUDGING",
      venue: "Student Council Portal & Council Room",
      description: "Faculty judges review rubrics and verify submissions.",
      eventsInvolved: ["All Competitions"],
    },
    {
      id: "sch-7",
      dayLabel: "Day 5",
      dateStr: "Tuesday, Oct 20, 2026",
      timeSlot: "04:00 PM - 06:00 PM",
      title: "Grand Valedictory & E-Certificate Distribution",
      category: "VALEDICTORY",
      venue: "Main Auditorium, PES MCOE",
      description: "Celebration of all participating students, Certificate of Participation distribution, and felicitation.",
      eventsInvolved: ["All Competitions"],
    },
  ] as ScheduleItem[],

  // Disqualification Rules
  disqualificationRules: [
    "Entering restricted or prohibited areas (Mechanical Workshop, Pegasus Room, Administration, Staff Rooms, Faculty Cabins, Labs, Exam Halls).",
    "Disturbing ongoing lectures, laboratory practicals, examinations, or official administrative duties.",
    "Intentionally creating or throwing waste to photograph/film it as a staged problem (Immediate disqualification and disciplinary referral).",
    "Plagiarism, submission of pre-existing work, or copying designs from previous competitions or online repositories without original contribution.",
    "Submitting work executed by someone other than the registered team members.",
    "Providing false or misleading registration information.",
    "Unsafe behavior, climbing on high ledges, hanging over railings, or performing hazardous stunts.",
    "Inclusion of offensive, discriminatory, political, obscene, or defamatory content in posters or reels.",
    "Missing the stipulated submission deadline without prior written authorization from the Student Council.",
  ],

  // Academic Branches
  branches: [
    "Computer Engineering",
    "Information Technology",
    "Electronics & Telecommunication (E&TC)",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Artificial Intelligence & Data Science (AI&DS)",
    "Master of Computer Applications (MCA)",
    "Master of Business Administration (MBA)",
  ],

  years: ["First Year (FE)", "Second Year (SE)", "Third Year (TE)", "Final Year (BE)", "Postgraduate (PG)"],

  divisions: ["Div A", "Div B", "Div C", "Div D", "Div E", "Div F", "Div G"],

  // FAQs
  faqs: [
    {
      id: "faq-1",
      category: "General",
      question: "Who is eligible to participate in Swachh Bharat Week 2026?",
      answer: "All currently enrolled undergraduate and postgraduate students of PES Modern College of Engineering across all departments (FE, SE, TE, BE, MCA, MBA) are eligible to participate.",
    },
    {
      id: "faq-2",
      category: "General",
      question: "What is the maximum entry limit per event?",
      answer: "Each of the 3 events (Poster Making, Reel Making, Waste Hunt) has a strict limit of 30 entries (30 teams/participants maximum) to ensure high-quality on-site management and fair evaluation.",
    },
    {
      id: "faq-3",
      category: "Certificates",
      question: "Will all participants receive a certificate?",
      answer: "Yes! All verified participating students who complete their registration and event submission will receive an official digital E-Certificate of Participation issued by the PES Modern College of Engineering Student Council.",
    },
    {
      id: "faq-4",
      category: "Waste Hunt",
      question: "Which areas of the campus are strictly prohibited for the Waste Hunt?",
      answer: "Participants MUST NOT enter the Mechanical Workshop, Pegasus Room, Administration Section, Staff Rooms, Faculty Offices, active lecture classrooms, Laboratories, or Examination halls. You must only explore designated zones: Corridors, Staircases, Grounds, Canteen surroundings, Parking, Gardens, and Student Common areas.",
    },
    {
      id: "faq-5",
      category: "Waste Hunt",
      question: "What happens if a team intentionally creates waste for the competition?",
      answer: "Intentionally creating or littering waste to capture staged photographs is considered serious academic misconduct. The team will be immediately disqualified from all events and reported to the college disciplinary committee.",
    },
    {
      id: "faq-6",
      category: "Events",
      question: "Can I use Canva or Adobe Express for Poster Making?",
      answer: "Yes! Digital design tools including Canva, Adobe Express, Photoshop, Illustrator, and PowerPoint are permitted. However, the poster must be created on the day of the event and must be 100% original work.",
    },
    {
      id: "faq-7",
      category: "Events",
      question: "What is the duration and submission deadline for Reel Making?",
      answer: "The reel must have a maximum duration of 90 seconds (recommended vertical 9:16 format). The submission deadline is strictly 11:59 PM on the day of the event.",
    },
    {
      id: "faq-8",
      category: "Submissions",
      question: "How do I upload my final submission?",
      answer: "Visit the Submit portal on this website or use the direct Google Drive submission link provided. Enter your unique Registration ID (e.g. SBW-2026-001) to link your submission.",
    },
  ] as FaqItem[],

  // Initial Results & Podium Data for the 3 Events
  initialResults: {
    isAnnounced: true,
    announcementNotice: "Official Results & E-Certificates of Participation are live.",
    eventWinners: [
      {
        eventId: "poster-making",
        eventTitle: "Poster Making",
        winner: { teamName: "EcoVisionaries", leadName: "Aarav Sharma", department: "Computer Engg (TE)", score: 94 },
        runnerUp: { teamName: "Green Pixels", leadName: "Pooja Kadam", department: "IT (SE)", score: 89 },
        secondRunnerUp: { teamName: "Clean Wave", leadName: "Sahil More", department: "AI&DS (FE)", score: 85 },
      },
      {
        eventId: "reel-making",
        eventTitle: "Reel Making",
        winner: { teamName: "Lens of Change", leadName: "Riya Sawant", department: "E&TC (BE)", score: 96 },
        runnerUp: { teamName: "Campus Pulse", leadName: "Nikhil Joshi", department: "Mechanical (TE)", score: 91 },
        secondRunnerUp: { teamName: "Swachh Frame", leadName: "Ananya Deshmukh", department: "Computer (SE)", score: 87 },
      },
      {
        eventId: "waste-hunt",
        eventTitle: "Waste Hunt",
        winner: { teamName: "EcoDetectives", leadName: "Kunal Shinde", department: "Mechanical Engg (BE)", score: 97 },
        runnerUp: { teamName: "Solution Squad", leadName: "Neha Verma", department: "Electrical (TE)", score: 92 },
        secondRunnerUp: { teamName: "Campus Guardians", leadName: "Omkar Patil", department: "IT (TE)", score: 88 },
        specialAwards: [
          { title: "Best Waste Hunt Team", teamName: "EcoDetectives", leadName: "Kunal Shinde", notes: "Flawless audit of 5 campus zones with engineering solutions." },
          { title: "Best Waste Identification", teamName: "Solution Squad", leadName: "Neha Verma", notes: "Identified micro-plastic bottleneck near canteen stormwater drain." },
          { title: "Most Innovative Solution", teamName: "Green Mechanix", leadName: "Yash Gaikwad", notes: "Low-cost gravity-fed rainwater leaf filtration design." },
        ],
      },
    ] as EventWinner[],
  },
};

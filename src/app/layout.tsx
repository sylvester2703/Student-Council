import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { EVENT_CONFIG } from "@/config/eventConfig";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0d7844",
};

export const metadata: Metadata = {
  title: `${EVENT_CONFIG.event.name} | ${EVENT_CONFIG.college.shortName}`,
  description: `${EVENT_CONFIG.event.tagline} — Official event portal organized by the Student Council of ${EVENT_CONFIG.college.fullName}. Explore 3 active student competitions: Poster Making, Reel Making, and Waste Hunt.`,
  keywords: [
    "Swachh Bharat Week 2026",
    "PES Modern College of Engineering",
    "Student Council PES MCOE",
    "Waste Hunt",
    "Poster Making",
    "Reel Making",
    "Clean Campus Pune",
    "Swachhata Abhiyan",
  ],
  authors: [{ name: "Student Council, PES Modern College of Engineering" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { COUNCIL_CONFIG } from "@/config/councilConfig";

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

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#991b1b",
};

export const metadata: Metadata = {
  title: `${COUNCIL_CONFIG.council.name} • ${COUNCIL_CONFIG.college.name}`,
  description: `${COUNCIL_CONFIG.council.tagline} — Official Students’ Council Institutional Portal of PES’s Modern College of Engineering, Shivajinagar, Pune (Affiliated to SPPU). Access flagship fest registrations, 100% Anonymous Query Shield, digital notice board, and club directory.`,
  keywords: [
    "PES MCOE",
    "Modern College of Engineering Pune",
    "Students Council PES MCOE",
    "PES MCOE Students Council",
    "M-PULSE 2027",
    "SPANDAN 2027",
    "SHAURYA Sports Meet",
    "CoDE Club AI DS",
    "SPPU Pune Engineering College",
    "Shivajinagar Pune College Portal",
    "PES MCOE Council Anonymous Portal",
  ],
  authors: [{ name: "Website Operations Team, Students’ Council, PES MCOE Pune" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900 selection:bg-red-100 selection:text-red-900">
        {children}
      </body>
    </html>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Radio, Instagram, Lock } from "lucide-react";
import { COUNCIL_CONFIG } from "@/config/councilConfig";
import { SiteSettings } from "@/lib/types";

interface MobileQuickBarProps {
  settings?: SiteSettings;
}

export default function MobileQuickBar({ settings }: MobileQuickBarProps) {
  const instagramUrl =
    settings?.instagramUrl || COUNCIL_CONFIG.socials.instagram.url;
  const whatsappUrl =
    settings?.whatsappChannelUrl || COUNCIL_CONFIG.socials.whatsappChannel.url;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2 shadow-2xl safe-area-inset-bottom">
      <div className="grid grid-cols-3 gap-1.5 max-w-md mx-auto">
        {/* WhatsApp Channel */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/40 text-[10px] font-bold transition-transform active:scale-95 text-center"
        >
          <Radio className="w-4 h-4 text-emerald-400 mb-0.5 animate-pulse" />
          <span className="truncate">WhatsApp</span>
        </a>

        {/* Instagram Hub */}
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-900 hover:bg-pink-950 text-pink-300 border border-pink-700/40 text-[10px] font-bold transition-transform active:scale-95 text-center"
        >
          <Instagram className="w-4 h-4 text-pink-400 mb-0.5" />
          <span className="truncate">Instagram</span>
        </a>

        {/* Anonymous Query 🔒 */}
        <Link
          href="/anonymous-portal"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border border-amber-400 text-[10px] font-black transition-transform active:scale-95 text-center shadow-md shadow-amber-950/50"
        >
          <Lock className="w-4 h-4 text-slate-950 mb-0.5 stroke-[2.5]" />
          <span className="truncate">Anon Query 🔒</span>
        </Link>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import {
  Lock,
  CheckCircle2,
  Copy,
  Check,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  X,
} from "lucide-react";

interface AnonymousTokenModalProps {
  isOpen: boolean;
  token: string;
  onClose: () => void;
  onGoToTracker: () => void;
}

export default function AnonymousTokenModal({
  isOpen,
  token,
  onClose,
  onGoToTracker,
}: AnonymousTokenModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !token) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg my-8 bg-slate-900 text-white rounded-3xl shadow-2xl overflow-hidden border border-amber-500/40 p-6 sm:p-8 space-y-6 text-center">
        {/* Top Icon Shield */}
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/40 mx-auto flex items-center justify-center">
          <Lock className="w-9 h-9 stroke-[2.2]" />
        </div>

        {/* Title & Badge */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Identity Shield Active</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Anonymous Query Submitted
          </h3>
          <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
            Zero personal details or IP addresses were recorded. Please save your secret tracking token below to check the official Council response.
          </p>
        </div>

        {/* Token Display Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/50 space-y-2">
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
            Your Secret Tracking Token
          </span>

          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-base sm:text-lg font-black font-mono text-amber-300 tracking-wider">
              {token}
            </span>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Token</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* How to check status guidance */}
        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-left space-y-1 text-xs text-slate-300">
          <span className="font-bold text-amber-300 flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5" />
            How to get your Council reply:
          </span>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Paste this token anytime into the <strong>&ldquo;Check Anonymous Query Status&rdquo;</strong> box on the Anonymous Portal page.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
          >
            Close &amp; Save Token
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onGoToTracker();
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg transition-transform hover:scale-102 active:scale-98"
          >
            Track Status Now ↗
          </button>
        </div>
      </div>
    </div>
  );
}

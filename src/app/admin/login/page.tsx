"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  Lock,
  User,
  KeyRound,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("mcoe@council2026");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed. Invalid credentials.");
      }

      // Successful login
      localStorage.setItem("mcoe_council_admin_logged_in", "true");
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col justify-center items-center p-4 selection:bg-amber-100 selection:text-amber-900">
      <div className="w-full max-w-md space-y-6 animate-in fade-in duration-300">
        {/* Top Emblem & Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-800 via-red-900 to-slate-950 text-white mx-auto flex items-center justify-center border-2 border-amber-400 shadow-xl shadow-red-950">
            <Shield className="w-8 h-8 text-amber-400 stroke-[2.2]" />
          </div>

          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">
              COUNCIL OPERATIONS PORTAL
            </span>
            <h1 className="text-2xl font-black text-white font-heading tracking-tight">
              PES MCOE Students’ Council
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Authorized Council Office Bearers &amp; Web Ops Desk
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-white shadow-2xl backdrop-blur-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs font-bold text-slate-300">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Secure Admin Authentication</span>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/90 border border-red-700 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-300 block mb-1">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="admin or council"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">
                Admin Security Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
                />
              </div>
            </div>

            {/* Quick Demo Credentials Reminder Box */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="font-bold text-amber-400">
                Default Council Admin Access:
              </span>
              <p>User: <code className="text-slate-200">admin</code> | Pass: <code className="text-slate-200">mcoe@council2026</code></p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-white font-bold text-xs shadow-lg shadow-red-950 transition-all hover:scale-101 active:scale-99 flex items-center justify-center gap-2 disabled:opacity-50 border border-amber-500/30"
            >
              <span>{loading ? "Authenticating..." : "Sign In to Council Dashboard"}</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </form>
        </div>

        {/* Back to Public Portal Link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← Back to Official PES MCOE Public Portal
          </Link>
        </div>
      </div>
    </div>
  );
}

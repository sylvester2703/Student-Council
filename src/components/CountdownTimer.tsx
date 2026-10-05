"use client";

import React, { useState, useEffect } from "react";
import { Clock, Calendar, AlertCircle } from "lucide-react";
import { EVENT_CONFIG } from "@/config/eventConfig";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(EVENT_CONFIG.dates.eventDayTarget).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds, isPast: false });
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs animate-pulse flex items-center justify-center min-h-[100px]">
        <div className="h-6 bg-slate-200 rounded w-48"></div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">SWACHH BHARAT WEEK COUNTDOWN</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                {timeLeft.isPast ? "EVENT IN PROGRESS" : "OCTOBER 7, 2026"}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Event Day: Wednesday, October 7, 2026 • 09:00 AM IST</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>Venue: PES MCOE Campus</span>
        </div>
      </div>

      {/* Countdown Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-4 text-center">
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 sm:p-3.5 transition-transform hover:scale-102">
          <span className="block text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            {String(timeLeft.days).padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Days</span>
        </div>
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 sm:p-3.5 transition-transform hover:scale-102">
          <span className="block text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Hours</span>
        </div>
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 sm:p-3.5 transition-transform hover:scale-102">
          <span className="block text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Minutes</span>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 sm:p-3.5 transition-transform hover:scale-102">
          <span className="block text-2xl sm:text-4xl font-extrabold text-emerald-700 font-heading">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800">Seconds</span>
        </div>
      </div>
    </div>
  );
};

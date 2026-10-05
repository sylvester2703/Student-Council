"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Mail, Phone, MapPin, Building, ShieldCheck } from "lucide-react";
import { EVENT_CONFIG } from "@/config/eventConfig";

export const FaqSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string>("faq-1");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "General", "Events", "Waste Hunt", "Submissions", "Judging"];

  const filteredFaqs = EVENT_CONFIG.faqs.filter((faq) =>
    selectedCategory === "All" ? true : faq.category === selectedCategory
  );

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>HELP & GUIDELINES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Got questions about registration, Waste Hunt rules, prohibited campus zones, or file uploads? Find quick answers below.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-emerald-800 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion Grid */}
        <div className="space-y-3 max-w-3xl mx-auto">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className={`border rounded-2xl overflow-hidden transition-all shadow-2xs ${
                  isOpen ? "border-emerald-300 bg-emerald-50/20" : "border-slate-200 bg-white"
                }`}
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? "" : faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                      {faq.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* About Card Beneath FAQ */}
        <div className="mt-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                ABOUT SWACHH BHARAT WEEK
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
                PES Modern College of Engineering
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Swachh Bharat Week at PES Modern College of Engineering is a student-driven initiative designed to encourage awareness, creativity, and practical action around cleanliness, waste management, and campus sustainability.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-emerald-200">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Student Council Driven</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-emerald-400" />
                  <span>PES MCOE Pune Campus</span>
                </span>
              </div>
            </div>

            <div className="md:col-span-4 bg-slate-800/80 border border-slate-700 p-5 rounded-2xl space-y-3 text-xs">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Help Desk Contacts</h4>
              <div className="space-y-2 text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+91 20 2553 3638</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>studentcouncil@moderncoe.edu.in</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>1186/A, Off J.M. Road, Shivajinagar, Pune - 411005</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

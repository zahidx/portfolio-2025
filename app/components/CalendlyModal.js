"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Video, ArrowUpRight, X, Sparkles, Check } from "lucide-react";

export default function CalendlyModal({ isOpen, onClose }) {
  const calendlyUrl = "https://calendly.com/zahidxislam";

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl rounded-3xl border border-white/15 bg-[#09081a] p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Header Ambient Glow */}
          <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-400">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400">
                DIRECT CALENDLY BOOKING
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Schedule a 1-on-1 Call
              </h3>
            </div>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
            Skip back-and-forth emails. Pick a time directly on my calendar to discuss your freelance project, architecture, or potential collaboration.
          </p>

          {/* Call Duration Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* 15 min call */}
            <a
              href={`${calendlyUrl}/15min`}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-indigo-400/40 hover:bg-white/[0.08] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" /> 15 Minutes
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                    FREE
                  </span>
                </div>
                <h4 className="text-sm font-bold text-indigo-300 mb-1">Quick Discovery Chat</h4>
                <p className="text-[11px] text-slate-400">Initial intro, project scope fit, &amp; timeline alignment.</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-indigo-400 group-hover:text-indigo-300">
                <span>Book Slot</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            {/* 30 min consultation */}
            <a
              href={`${calendlyUrl}/30min`}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-purple-400/40 hover:bg-white/[0.08] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-purple-400" /> 30 Minutes
                  </span>
                  <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 font-bold">
                    TECH FOCUS
                  </span>
                </div>
                <h4 className="text-sm font-bold text-purple-300 mb-1">Technical Consultation</h4>
                <p className="text-[11px] text-slate-400">Architecture review, stack evaluation, &amp; deep-dive scope.</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-purple-400 group-hover:text-purple-300">
                <span>Book Slot</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          </div>

          {/* Direct Calendly Main Link */}
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/25 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Open Full Calendly Calendar</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

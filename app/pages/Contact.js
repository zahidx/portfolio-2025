"use client";

import React, { useState } from "react";
import { db, addDoc, collection } from "../components/firebase";
import {
  Mail, Phone, MapPin, Send, CheckCircle2, Github,
  Linkedin, Twitter, MessageSquare, Clock, ArrowRight, Calendar, Video, ArrowUpRight
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import CalendlyModal from "../components/CalendlyModal";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "zahid.imx@gmail.com",
    href: "mailto:zahid.imx@gmail.com",
    gradient: "from-indigo-500 to-purple-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    text: "text-indigo-400",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 175 430 9016",
    href: "tel:+8801754309016",
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Baridhara, Dhaka, Bangladesh",
    href: "https://maps.google.com/?q=Baridhara,Dhaka",
    gradient: "from-pink-500 to-rose-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    text: "text-pink-400",
  },
  {
    icon: Clock,
    label: "Availability",
    value: "Sat – Thu, 10AM – 7PM",
    href: null,
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
  },
];

const socialLinks = [
  { icon: Github,   href: "https://github.com/zahidx",          label: "GitHub",   cls: "hover:bg-slate-700 hover:text-white hover:border-slate-600" },
  { icon: Linkedin, href: "https://linkedin.com/in/zahidx",     label: "LinkedIn", cls: "hover:bg-blue-600 hover:text-white hover:border-blue-500" },
  { icon: Twitter,  href: "https://twitter.com",                label: "Twitter",  cls: "hover:bg-sky-500 hover:text-white hover:border-sky-400" },
  { icon: FaWhatsapp, href: "https://wa.me/8801754309016",      label: "WhatsApp", cls: "hover:bg-green-500 hover:text-white hover:border-green-400" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await addDoc(collection(db, "contacts"), {
        ...form,
        timestamp: new Date(),
      });
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to send. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-slate-950 py-12 sm:py-24 px-4 sm:px-10 lg:px-16 overflow-hidden"
    >
      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />

      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 sm:w-80 h-72 sm:h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      {/* Top gradient border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3.5 sm:mb-5">
            <MessageSquare className="w-3.5 h-3.5" />
            Contact &amp; Booking
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Touch
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-lg max-w-xl mx-auto px-2">
            Schedule a 1-on-1 discovery call directly or send a direct message below.
          </p>
        </div>

        {/* ── High-Converting Calendly Direct Booking Banner ── */}
        <div className="mb-10 p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/70 via-purple-950/60 to-slate-950/80 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-indigo-950/50">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/20">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase">
                  ⚡ HIGHEST CONVERSION
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">• Instant Calendar Lock</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">Prefer a 1-on-1 Call? Schedule on Calendly</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Pick a 15-min discovery or 30-min technical consultation slot directly on my calendar. No back-and-forth emails required.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setIsCalendlyOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/30 transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Call via Calendly</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="https://calendly.com/zahidxislam"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border border-white/15 bg-white/[0.04] text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              <span>External Link</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 xl:gap-12">
          {/* ── LEFT PANEL ── */}
          <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-5">
            {/* Contact info cards */}
            {contactInfo.map(({ icon: Icon, label, value, href, bg, border, text, gradient }) => (
              <div
                key={label}
                className={`group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border ${border} ${bg} backdrop-blur-sm transition-all duration-300 active:scale-98 hover:scale-[1.02] hover:shadow-lg`}
              >
                <div className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`text-xs sm:text-sm font-semibold ${text} hover:underline underline-offset-2 truncate block`}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className={`text-xs sm:text-sm font-semibold ${text} truncate`}>{value}</p>
                  )}
                </div>
                {href && (
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 ml-auto flex-shrink-0 transition-colors" />
                )}
              </div>
            ))}

            {/* Social links */}
            <div className="p-4 sm:p-5 rounded-2xl border border-slate-800/60 bg-slate-900/50 backdrop-blur-sm">
              <p className="text-[11px] sm:text-xs text-slate-500 font-semibold uppercase tracking-widest mb-3 sm:mb-4">
                Find me on
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label, cls }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`flex items-center justify-center w-10 h-10 rounded-xl border border-slate-700/60 bg-slate-800/60 text-slate-400 active:scale-90 transition-all duration-200 hover:scale-110 hover:shadow-lg ${cls}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
              <span className="relative flex h-3 w-3 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <p className="text-xs sm:text-sm text-emerald-400 font-medium leading-snug">
                Available for freelance &amp; full-time opportunities
              </p>
            </div>
          </div>

          {/* ── RIGHT PANEL: FORM ── */}
          <div className="lg:col-span-3">
            <div className="relative p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-800/60 bg-slate-900/70 backdrop-blur-md shadow-2xl shadow-black/20">
              <div className="absolute top-0 inset-x-0 h-px rounded-t-3xl bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center gap-4 sm:gap-5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Message Sent! 🎉</h3>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-sm">
                      Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Send a message</h3>
                    <p className="text-slate-500 text-xs sm:text-sm">I&apos;ll reply within 24 hours.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label htmlFor="v2-name" className="block text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                        Your Name
                      </label>
                      <input
                        id="v2-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="v2-email" className="block text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                        Email Address
                      </label>
                      <input
                        id="v2-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="v2-subject" className="block text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                      Subject
                    </label>
                    <input
                      id="v2-subject"
                      name="subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Project inquiry, collaboration..."
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="v2-message" className="block text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                      Message
                    </label>
                    <textarea
                      id="v2-message"
                      name="message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or idea..."
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-xs sm:text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-3.5 py-2">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-95 text-white text-xs sm:text-sm font-bold transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
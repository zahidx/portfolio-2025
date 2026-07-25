"use client";

import React, { useState } from "react";
import { db, addDoc, collection } from "../components/firebase";
import {
  Mail, Phone, MapPin, Send, CheckCircle2, Github,
  Linkedin, Twitter, MessageSquare, Clock, ArrowRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

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
      className="relative bg-slate-950 py-24 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      {/* Top gradient border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-5">
            <MessageSquare className="w-3.5 h-3.5" />
            Contact
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Touch
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            Have a project in mind or just want to say hello? My inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-12">

          {/* ── LEFT PANEL ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Contact info cards */}
            {contactInfo.map(({ icon: Icon, label, value, href, bg, border, text, gradient }) => (
              <div
                key={label}
                className={`group flex items-center gap-4 p-4 rounded-2xl border ${border} ${bg} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
              >
                <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`text-sm font-semibold ${text} hover:underline underline-offset-2 truncate block`}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className={`text-sm font-semibold ${text} truncate`}>{value}</p>
                  )}
                </div>
                {href && (
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 ml-auto flex-shrink-0 transition-colors" />
                )}
              </div>
            ))}

            {/* Social links */}
            <div className="p-5 rounded-2xl border border-slate-800/60 bg-slate-900/50 backdrop-blur-sm">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-4">
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
                    className={`flex items-center justify-center w-10 h-10 rounded-xl border border-slate-700/60 bg-slate-800/60 text-slate-400 transition-all duration-200 hover:scale-110 hover:shadow-lg ${cls}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
              <span className="relative flex h-3 w-3 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <p className="text-sm text-emerald-400 font-medium">
                Available for freelance &amp; full-time opportunities
              </p>
            </div>
          </div>

          {/* ── RIGHT PANEL: FORM ── */}
          <div className="lg:col-span-3">
            <div className="relative p-8 sm:p-10 rounded-3xl border border-slate-800/60 bg-slate-900/70 backdrop-blur-md shadow-2xl shadow-black/20">
              {/* Card gradient top border */}
              <div className="absolute top-0 inset-x-0 h-px rounded-t-3xl bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

              {sent ? (
                /* ── Success state ── */
                <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent! 🎉</h3>
                    <p className="text-slate-400 text-sm max-w-sm">
                      Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-sm text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Send a message</h3>
                    <p className="text-slate-500 text-sm">I&apos;ll reply within 24 hours.</p>
                  </div>

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="v2-name" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="v2-email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="v2-subject" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
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
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="v2-message" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      id="v2-message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or idea..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
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
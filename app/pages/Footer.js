"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub, FaWhatsapp,
} from "react-icons/fa";
import {
  MapPin, Mail, Phone, ArrowUp, Send, ExternalLink,
  Home, User, Briefcase, Layers, FolderOpen, MessageSquare, BookOpen,
} from "lucide-react";
import { db, collection, addDoc } from "../components/firebase";

const socialLinks = [
  { icon: FaGithub,    href: "https://github.com/zahidx",        label: "GitHub",    color: "hover:text-white hover:bg-gray-700" },
  { icon: FaLinkedinIn,href: "https://linkedin.com/in/zahidx",   label: "LinkedIn",  color: "hover:text-white hover:bg-blue-600" },
  { icon: FaFacebookF, href: "https://facebook.com",             label: "Facebook",  color: "hover:text-white hover:bg-blue-500" },
  { icon: FaTwitter,   href: "https://twitter.com",              label: "Twitter",   color: "hover:text-white hover:bg-sky-500" },
  { icon: FaInstagram, href: "https://instagram.com",            label: "Instagram", color: "hover:text-white hover:bg-pink-600" },
  { icon: FaWhatsapp,  href: "https://wa.me/8801754309016",      label: "WhatsApp",  color: "hover:text-white hover:bg-green-500" },
];

const quickLinks = [
  { href: "/#home",       label: "Home",       icon: Home },
  { href: "/#about",      label: "About Me",   icon: User },
  { href: "/#skills",     label: "Skills",     icon: Layers },
  { href: "/#experience", label: "Experience", icon: Briefcase },
  { href: "/#projects",   label: "Projects",   icon: FolderOpen },
  { href: "/#contact",    label: "Contact",    icon: MessageSquare },
  { href: "/blog",        label: "Blog",       icon: BookOpen },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      } else {
        setError(data.error || "Failed to subscribe. Try again.");
      }
    } catch (err) {
      console.error("Error subscribing:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden">
      {/* Gradient top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

      {/* Subtle background glows */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-14">
          {/* Brand column */}
          <div className="xl:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-3 mb-4 sm:mb-5">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 text-xs sm:text-sm tracking-tighter">
                    &lt;Z/&gt;
                  </span>
                </div>
              </div>
              <span className="text-lg sm:text-xl font-black tracking-tight text-white">
                Zahid<span className="text-indigo-400">ul</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5 sm:mb-6">
              Software Engineer &amp; Full-Stack Developer building modern web experiences with React, Next.js, and Node.js.
            </p>

            {/* Contact mini-info */}
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
              <li className="flex items-center gap-2.5 sm:gap-3 text-slate-400">
                <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>Baridhara, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5 sm:gap-3 text-slate-400">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <a href="mailto:zahid.imx@gmail.com" className="hover:text-indigo-400 transition-colors truncate">
                  zahid.imx@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 sm:gap-3 text-slate-400">
                <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <a href="tel:+8801754309016" className="hover:text-indigo-400 transition-colors">
                  +880 175 430 9016
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-widest mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-5 sm:w-6 h-px bg-indigo-500 inline-block" />
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 sm:gap-3">
              {quickLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-indigo-400 transition-colors duration-200"
                  >
                    <Icon className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                    <span>{label}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto hidden sm:inline" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-widest mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-5 sm:w-6 h-px bg-indigo-500 inline-block" />
              Connect
            </h3>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-400 active:scale-95 transition-all duration-200 ${color} hover:border-transparent hover:scale-105 hover:shadow-lg`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="mt-5 sm:mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for new projects
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-widest mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-5 sm:w-6 h-px bg-indigo-500 inline-block" />
              Newsletter
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-3.5 sm:mb-4 leading-relaxed">
              Get the latest articles, projects, and updates — no spam, ever.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm">
                <span>🎉</span>
                <span>You&apos;re subscribed! Thank you.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                  />
                </div>
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-95 text-white text-xs sm:text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Subscribe
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-6 sm:mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] sm:text-xs text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-slate-400 font-medium">Zahidul Islam</span>. All rights reserved.
            <span className="mx-1.5 text-slate-700">·</span>
            Built with{" "}
            <span className="text-indigo-400">Next.js</span> &amp;{" "}
            <span className="text-indigo-400">Tailwind CSS</span>
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="group flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-slate-700/60 text-xs text-slate-400 hover:text-indigo-400 active:scale-95 transition-all duration-200"
          >
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

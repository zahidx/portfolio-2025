"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Copy,
  Check,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  ArrowUpRight,
  Heart,
  Home,
  User,
  Laptop,
  Archive,
  Folder,
  Phone,
  Edit,
} from "lucide-react";

export default function BlogFooter() {
  const [copied, setCopied] = useState(false);
  const email = "zahidxislam@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { href: "/#home", label: "Home", icon: Home },
    { href: "/#about", label: "About", icon: User },
    { href: "/#skills", label: "Skills", icon: Laptop },
    { href: "/#experience", label: "Experience", icon: Archive },
    { href: "/#projects", label: "Projects", icon: Folder },
    { href: "/#contact", label: "Contact", icon: Phone },
    { href: "/blog", label: "Blog", icon: Edit },
  ];

  const socials = [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  ];

  return (
    <footer id="connect" className="relative mt-24 w-full bg-[#04040d] border-t border-white/10 text-slate-300">
      {/* Ambient glow behind footer */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-4xl h-64 bg-gradient-to-r from-indigo-600/15 via-purple-600/15 to-pink-600/15 blur-[120px] rounded-full" />

      {/* ── Main CTA Card Section ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-xl p-8 sm:p-14 shadow-2xl shadow-indigo-950/50"
        >
          {/* Drifting grid background */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Availability Status Badge */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for new projects & opportunities
            </div>
          </div>

          {/* Headline & Subtitle */}
          <div className="text-center mt-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Enjoyed the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">vibe?</span>
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              This is the human side of my work. Whether you have an exciting project, a question, or just want to say hello — my inbox is always open.
            </p>
          </div>

          {/* One-Click Copy Email Pill */}
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <Mail className="w-4 h-4 text-indigo-400" />
              <span className="text-xs sm:text-sm font-mono text-slate-200 select-all">
                {email}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="ml-2 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
                title="Copy Email"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-bold text-sm text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Let&apos;s Connect</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              <span>Back to Portfolio</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Footer Navigation & Links Bar ── */}
      <div className="border-t border-white/10 bg-[#03030a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-between">
            {/* Brand Logo */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-md shadow-indigo-500/20">
                  <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                    <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 text-xs">
                      &lt;Z/&gt;
                    </span>
                  </div>
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Zahid<span className="text-indigo-400">ul</span>
                </span>
              </Link>
              <p className="text-xs text-slate-400 max-w-xs text-center md:text-left">
                Full-Stack Software Engineer & Creative AI Explorer.
              </p>
            </div>

            {/* Nav Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-300">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Social Link Badges */}
            <div className="flex items-center justify-center md:justify-end gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-400/50 hover:text-indigo-300 transition-all"
                    title={s.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <p>© {new Date().getFullYear()} Zahidul Islam. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> & Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

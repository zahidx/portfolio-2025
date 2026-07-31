"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Heart,
  Home,
  User,
  Laptop,
  Archive,
  Folder,
  Phone,
  Edit,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Copy,
  Check,
  ArrowRight,
  ArrowUpRight,
  MessageSquare,
  Zap,
  Coffee,
  Star,
  Globe,
  Sparkles,
  Send,
} from "lucide-react";

/* ── Interactive Particle Beam Dot Matrix ── */
function InteractiveDotMatrix() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = 28;
    const rows = 12;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.03;

      const spacingX = canvas.width / (cols + 1);
      const spacingY = canvas.height / (rows + 1);

      for (let i = 1; i <= cols; i++) {
        for (let j = 1; j <= rows; j++) {
          const x = i * spacingX;
          const y = j * spacingY;
          const dist = Math.sin(time + i * 0.3 + j * 0.2);
          const size = Math.max(1, 1.8 + dist * 1.2);
          const alpha = 0.12 + Math.sin(time + i * 0.2) * 0.08;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? "#818cf8" : "#c084fc";
          ctx.globalAlpha = Math.max(0.04, alpha);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
    />
  );
}

/* ── Live Copy Email Pill ── */
function CopyEmailBeam({ email }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <button
      onClick={handleCopy}
      className="group relative inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-indigo-400/40 hover:bg-white/[0.08] backdrop-blur-md transition-all duration-300 text-left"
    >
      <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-400/30">
        <Mail className="w-3 h-3 text-indigo-300" />
      </div>
      <span className="text-xs font-mono text-slate-200 select-all">{email}</span>
      <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-slate-300 group-hover:text-white transition-colors">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="c"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-emerald-400 flex items-center gap-1 font-bold"
            >
              <Check className="w-3 h-3" /> Copied!
            </motion.span>
          ) : (
            <motion.span
              key="n"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1"
            >
              <Copy className="w-3 h-3" /> Copy
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}

export default function BlogFooter() {
  const email = "zahidxislam@gmail.com";

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
    { name: "GitHub", href: "https://github.com/zahidxislam", icon: Github, color: "#e2e8f0" },
    { name: "LinkedIn", href: "https://linkedin.com/in/zahidxislam", icon: Linkedin, color: "#60a5fa" },
    { name: "Twitter", href: "https://twitter.com/zahidxislam", icon: Twitter, color: "#a78bfa" },
  ];

  const stats = [
    { icon: Coffee, val: "24+", label: "Projects" },
    { icon: Zap, val: "3.2k+", label: "Code Hours" },
    { icon: Star, val: "18+", label: "Clients" },
    { icon: Globe, val: "7+", label: "Countries" },
  ];

  return (
    <footer
      id="connect"
      className="relative mt-16 w-full overflow-hidden select-none"
      style={{ background: "linear-gradient(to bottom, #03030a, #010105)" }}
    >
      {/* Top Ambient Glow & Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
      <InteractiveDotMatrix />

      {/* Ambient Radial Auroras */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 left-1/4 w-[500px] h-[300px] rounded-full bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-pink-600/20 blur-[130px]"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">

        {/* ──────────────── BORDERLESS CARD-FREE HERO ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">

          {/* Left Column: Bold Kinetic Headline & Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start gap-4"
          >
            {/* Live Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-mono tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              AVAILABLE FOR NEW OPPORTUNITIES
            </div>

            {/* Kinetic Typography Headline */}
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] text-white">
              Let&apos;s build{" "}
              <motion.span
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #818cf8, #c084fc, #f472b6, #38bdf8, #818cf8)",
                  backgroundSize: "200% auto",
                }}
              >
                something great.
              </motion.span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed">
              Have an ambitious project, creative idea, or just want to connect? My inbox is always open.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/#contact"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest text-white overflow-hidden shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow duration-300"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)",
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 rounded-full" />
                <MessageSquare className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Let&apos;s Connect</span>
                <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.04] text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/[0.08] hover:border-white/30 backdrop-blur-md transition-all duration-200"
              >
                <span>Portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Holographic Stats & Quick Email Beam */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col items-start lg:items-end gap-5"
          >
            {/* Email Copy Pill */}
            <CopyEmailBeam email={email} />

            {/* Floating Holographic Stat Badges Grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-md hover:border-indigo-400/30 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-400/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-base font-black text-white leading-none">{s.val}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{s.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Shortcuts Row */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mr-1">
                SOCIALS:
              </span>
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/25 text-xs text-slate-300 hover:text-white transition-all"
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                    <span className="text-[11px] font-medium">{s.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ──────────────── SLIM FOOTER NAVIGATION BAR ──────────────── */}
        <div className="border-t border-white/[0.06] mt-8 pt-6 pb-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Brand Logo & Tagline */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] shadow-md shadow-indigo-500/20">
                <div className="w-full h-full bg-[#03030a] rounded-[6px] flex items-center justify-center">
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 text-[10px]">
                    &lt;Z/&gt;
                  </span>
                </div>
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                Zahid<span className="text-indigo-400">ul</span>
              </span>
            </Link>

            {/* Navigation Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-400">
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

            {/* Copyright */}
            <p className="text-[11px] text-slate-500 shrink-0">
              © {new Date().getFullYear()} Zahidul Islam. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

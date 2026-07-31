"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Copy,
  Check,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
  MessageSquare,
  ArrowUpRight,
  Zap,
  Coffee,
  Calendar,
  ExternalLink,
} from "lucide-react";

/* ── Tilt Card ── */
function TiltCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const px = (e.clientX - left) / width - 0.5;
    const py = (e.clientY - top) / height - 0.5;
    rx.set(-py * 14);
    ry.set(px * 14);
  }, [rx, ry]);

  const handleMouseLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
  }, [rx, ry]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated Counter ── */
function Counter({ to, suffix = "" }) {
  const [count, setCount] = useState(0);
  const inViewRef = useRef(null);

  useEffect(() => {
    const el = inViewRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        let start = 0;
        const dur = 1400;
        const step = (ts) => {
          if (!start) start = ts;
          const prog = Math.min((ts - start) / dur, 1);
          const eased = 1 - Math.pow(1 - prog, 3);
          setCount(Math.floor(eased * to));
          if (prog < 1) requestAnimationFrame(step);
          else setCount(to);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return (
    <span ref={inViewRef}>
      {count}{suffix}
    </span>
  );
}

/* ── Floating Orb ── */
function FloatingOrb({ color, size, top, left, delay = 0, duration = 8 }) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full blur-[80px]"
      style={{
        background: color,
        width: size,
        height: size,
        top,
        left,
      }}
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ── Social Card ── */
function SocialCard({ href, icon: Icon, name, handle, color, bgGlow, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <TiltCard className="flex-1 min-w-[160px]">
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative flex flex-col gap-3 p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden group transition-all duration-300 hover:border-white/20 block"
        style={{ transform: "translateZ(0)" }}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Glow blob */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: bgGlow }}
            />
          )}
        </AnimatePresence>

        <div
          className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: color + "22", border: `1px solid ${color}44` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div className="relative z-10">
          <p className="text-sm font-bold text-white">{name}</p>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{handle}</p>
        </div>
        <p className="relative z-10 text-[11px] text-slate-500 leading-relaxed">{desc}</p>
        <div className="relative z-10 flex items-center gap-1 text-[11px] font-semibold mt-auto" style={{ color }}>
          Follow <ArrowUpRight className="w-3 h-3" />
        </div>
      </motion.a>
    </TiltCard>
  );
}

/* ── Email Beam ── */
function EmailBeam({ email }) {
  const [copied, setCopied] = useState(false);
  const [beaming, setBeaming] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setBeaming(true);
    setTimeout(() => setCopied(false), 2500);
    setTimeout(() => setBeaming(false), 800);
  };

  return (
    <div className="relative group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:border-indigo-400/30 transition-all duration-300 cursor-pointer w-full max-w-md" onClick={handleCopy}>
      {/* Beam pulse on copy */}
      <AnimatePresence>
        {beaming && (
          <motion.div
            key="beam"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 rounded-2xl origin-left bg-gradient-to-r from-indigo-500/40 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/15 border border-indigo-400/20">
        <Mail className="w-4 h-4 text-indigo-400" />
      </div>
      <span className="flex-1 text-sm font-mono text-slate-200 select-all">{email}</span>
      <motion.button
        whileTap={{ scale: 0.92 }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-400/40 text-xs font-semibold text-slate-300 hover:text-white transition-all"
        title="Copy Email"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span key="check" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-emerald-400">
              <Check className="w-3.5 h-3.5" /> Copied!
            </motion.span>
          ) : (
            <motion.span key="copy" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1">
              <Copy className="w-3.5 h-3.5" /> Copy
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

/* ── Stats Badge ── */
function StatBadge({ icon: Icon, label, value, color }) {
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-sm">
      <Icon className="w-4 h-4 mb-1" style={{ color }} />
      <p className="text-xl font-black text-white"><Counter to={value} suffix="+" /></p>
      <p className="text-[11px] text-slate-500 text-center leading-tight">{label}</p>
    </div>
  );
}

/* ── Main Export ── */
export default function ConnectCTA() {
  const email = "zahidxislam@gmail.com";

  const socials = [
    {
      name: "GitHub",
      handle: "@zahidxislam",
      href: "https://github.com/zahidxislam",
      icon: Github,
      color: "#e2e8f0",
      bgGlow: "radial-gradient(ellipse at 20% 20%, rgba(226,232,240,0.08) 0%, transparent 60%)",
      desc: "Open-source projects & contributions",
    },
    {
      name: "LinkedIn",
      handle: "@zahidxislam",
      href: "https://linkedin.com/in/zahidxislam",
      icon: Linkedin,
      color: "#60a5fa",
      bgGlow: "radial-gradient(ellipse at 20% 20%, rgba(96,165,250,0.10) 0%, transparent 60%)",
      desc: "Professional network & career updates",
    },
    {
      name: "Twitter / X",
      handle: "@zahidxislam",
      href: "https://twitter.com/zahidxislam",
      icon: Twitter,
      color: "#a78bfa",
      bgGlow: "radial-gradient(ellipse at 20% 20%, rgba(167,139,250,0.10) 0%, transparent 60%)",
      desc: "Thoughts on tech, design & life",
    },
  ];

  return (
    <section id="connect" className="relative my-20 sm:my-32 overflow-hidden">
      {/* ── Ambient orbs ── */}
      <FloatingOrb color="radial-gradient(circle, rgba(99,102,241,0.5), transparent)" size="420px" top="-10%" left="-8%" delay={0} duration={10} />
      <FloatingOrb color="radial-gradient(circle, rgba(168,85,247,0.4), transparent)" size="360px" top="30%" left="60%" delay={2} duration={13} />
      <FloatingOrb color="radial-gradient(circle, rgba(236,72,153,0.3), transparent)" size="300px" top="70%" left="20%" delay={4} duration={9} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* ── Top pill ── */}
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ boxShadow: ["0 0 0px 0px rgba(16,185,129,0)", "0 0 18px 4px rgba(16,185,129,0.25)", "0 0 0px 0px rgba(16,185,129,0)"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-widest uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for new projects &amp; opportunities
          </motion.div>
        </div>

        {/* ── Kinetic headline ── */}
        <div className="text-center mb-4">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
            {"Let's build".split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.03 * i, ease: "easeOut" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 drop-shadow-[0_0_60px_rgba(139,92,246,0.5)]"
            >
              something great.
            </motion.span>
          </h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-center leading-relaxed mb-10"
        >
          Whether you have an exciting project, a wild idea, or just want to say hello — my inbox is always open and I reply to every message.
        </motion.p>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <StatBadge icon={Coffee} label="Projects Shipped" value={24} color="#fb923c" />
          <StatBadge icon={Zap} label="Hours of Code" value={3200} color="#a78bfa" />
          <StatBadge icon={Sparkles} label="Happy Clients" value={18} color="#34d399" />
        </motion.div>

        {/* ── Email beam ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="flex justify-center mb-8"
        >
          <EmailBeam email={email} />
        </motion.div>

        {/* ── Action buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <Link
            href="/#contact"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm text-white overflow-hidden shadow-lg shadow-indigo-500/25 hover:shadow-[0_0_40px_rgba(99,102,241,0.55)] transition-shadow duration-500"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)" }}
          >
            {/* shimmer */}
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 rounded-full" />
            <MessageSquare className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Let&apos;s Connect</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/15 bg-white/[0.04] text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-300"
          >
            <span>Back to Portfolio</span>
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <a
            href={`mailto:${email}`}
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-emerald-500/25 bg-emerald-500/8 text-sm font-semibold text-emerald-300 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-400/40 backdrop-blur-md transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
            <span>Send Email</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>

        {/* ── Social cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mb-10"
        >
          <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500 text-center mb-5">Find me on</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {socials.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.85 + i * 0.08 }}
                className="w-full sm:w-auto sm:flex-1 sm:min-w-[160px] sm:max-w-[220px]"
              >
                <SocialCard {...s} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-white/[0.06] text-xs text-slate-500"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Designed &amp; Built with passion by Zahid</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-600" />
            <span>Usually replies within 24h</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

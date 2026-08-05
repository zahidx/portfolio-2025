"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  FaJava, FaPython, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaBootstrap, FaVuejs,
  FaHtml5, FaCss3Alt, FaDatabase,
  FaLightbulb, FaUsers, FaComments, FaClock, FaBrain, FaLeaf, FaCrown, FaPalette,
  FaChartLine, FaHandshake, FaSearch, FaBullseye,
} from "react-icons/fa";
import {
  SiTypescript, SiMongodb, SiNextdotjs, SiTailwindcss, SiFirebase, SiCplusplus,
  SiPostgresql, SiDocker, SiLinux, SiVscodium,
} from "react-icons/si";

// ─── Data ────────────────────────────────────────────────────────────────────
const programmingSkills = [
  { name: "JavaScript", icon: FaJs,         level: 90, tag: "Core Language", rank: "Expert",     gradient: ["#F7DF1E", "#F0A500"], glow: "rgba(247,223,30,0.4)" },
  { name: "React JS",   icon: FaReact,      level: 85, tag: "Frontend Library", rank: "Advanced", gradient: ["#61DAFB", "#0891B2"], glow: "rgba(97,218,251,0.4)" },
  { name: "Java",       icon: FaJava,       level: 80, tag: "Backend / OOP", rank: "Proficient", gradient: ["#F89820", "#EA2D2E"], glow: "rgba(234,45,46,0.35)" },
  { name: "Next.js",    icon: SiNextdotjs,  level: 80, tag: "Full-Stack Framework", rank: "Advanced", gradient: ["#e2e8f0", "#64748b"], glow: "rgba(226,232,240,0.3)" },
  { name: "C++",        icon: SiCplusplus,  level: 75, tag: "System / Algorithmic", rank: "Proficient", gradient: ["#659BD3", "#1A4F8A"], glow: "rgba(101,155,211,0.4)" },
  { name: "Python",     icon: FaPython,     level: 70, tag: "AI / Data Science", rank: "Proficient", gradient: ["#4B8BBE", "#FFE873"], glow: "rgba(75,139,190,0.4)" },
  { name: "TypeScript", icon: SiTypescript, level: 65, tag: "Typed JavaScript", rank: "Proficient", gradient: ["#3178C6", "#235A97"], glow: "rgba(49,120,198,0.4)" },
  { name: "Node.js",    icon: FaNodeJs,     level: 60, tag: "Backend Runtime", rank: "Intermediate", gradient: ["#68A063", "#3C873A"], glow: "rgba(104,160,99,0.4)" },
];

const marqueeTools = [
  { name: "HTML5",       icon: FaHtml5,      color: "#E34F26" },
  { name: "CSS3",        icon: FaCss3Alt,    color: "#1572B6" },
  { name: "Tailwind",    icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Bootstrap",   icon: FaBootstrap,  color: "#7C3AED" },
  { name: "Vue.js",      icon: FaVuejs,      color: "#42B883" },
  { name: "MongoDB",     icon: SiMongodb,    color: "#47A248" },
  { name: "Firebase",    icon: SiFirebase,   color: "#FFCA28" },
  { name: "Git",         icon: FaGitAlt,     color: "#F05032" },
  { name: "GitHub",      icon: FaGithub,     color: "#aaa" },
  { name: "PostgreSQL",  icon: SiPostgresql, color: "#336791" },
  { name: "Docker",      icon: SiDocker,     color: "#2496ED" },
  { name: "Linux",       icon: SiLinux,      color: "#FCC624" },
  { name: "VS Code",     icon: SiVscodium,   color: "#007ACC" },
  { name: "SQL / DB",    icon: FaDatabase,   color: "#6366F1" },
];

const softSkills = [
  { name: "Problem Solving",     icon: FaLightbulb, color: "#EAB308", bg: "rgba(234,179,8,0.1)"   },
  { name: "Teamwork",            icon: FaUsers,     color: "#3B82F6", bg: "rgba(59,130,246,0.1)"  },
  { name: "Communication",       icon: FaComments,  color: "#10B981", bg: "rgba(16,185,129,0.1)"  },
  { name: "Time Management",     icon: FaClock,     color: "#8B5CF6", bg: "rgba(139,92,246,0.1)"  },
  { name: "Critical Thinking",   icon: FaBrain,     color: "#6366F1", bg: "rgba(99,102,241,0.1)"  },
  { name: "Adaptability",        icon: FaLeaf,      color: "#14B8A6", bg: "rgba(20,184,166,0.1)"  },
  { name: "Leadership",          icon: FaCrown,     color: "#F97316", bg: "rgba(249,115,22,0.1)"  },
  { name: "Creativity",          icon: FaPalette,   color: "#EC4899", bg: "rgba(236,72,153,0.1)"  },
  { name: "Management",          icon: FaChartLine, color: "#06B6D4", bg: "rgba(6,182,212,0.1)"   },
  { name: "Collaboration",       icon: FaHandshake, color: "#F59E0B", bg: "rgba(245,158,11,0.1)"  },
  { name: "Attention to Detail", icon: FaSearch,    color: "#F43F5E", bg: "rgba(244,63,94,0.1)"   },
  { name: "Decision Making",     icon: FaBullseye,  color: "#7C3AED", bg: "rgba(124,58,237,0.1)"  },
];

// ─── Animated Counter ────────────────────────────────────────────────────────
function Counter({ target, inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) { setCount(0); return; }
    let start = 0;
    const duration = 1000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <>{count}</>;
}

// ─── Lightweight High-Performance Skill Card ─────────────────────────────────
function FastSkillCard({ skill, index }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect(); // Disconnect immediately to save CPU/GPU cycles!
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Icon = skill.icon;
  const [g1, g2] = skill.gradient;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
      className="group relative rounded-2xl p-5 sm:p-6 overflow-hidden cursor-pointer bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-xl will-change-transform"
    >
      {/* Top Accent Gradient Border Glow */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${g1}, transparent)` }}
      />

      {/* Ambient Radial Hover Glow (Pure CSS Opacity) */}
      <div
        className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
        style={{ background: skill.glow }}
      />

      {/* Header: Icon + Title + Rank */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center border shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
            style={{
              background: `rgba(15, 23, 42, 0.9)`,
              borderColor: `${g1}33`,
              boxShadow: `0 0 12px ${skill.glow}`,
            }}
          >
            <Icon className="text-2xl" style={{ color: g1 }} />
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-white group-hover:text-indigo-300 transition-colors">
              {skill.name}
            </h4>
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 block mt-0.5">
              {skill.tag}
            </span>
          </div>
        </div>

        <span
          className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border shrink-0"
          style={{
            color: g1,
            borderColor: `${g1}33`,
            background: `${g1}10`,
          }}
        >
          {skill.rank}
        </span>
      </div>

      {/* High-Tech Progress Bar & Level Metric */}
      <div className="space-y-2 mt-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Proficiency Gauge</span>
          <div
            className="px-2.5 py-0.5 rounded-lg text-xs font-black font-mono border flex items-center gap-0.5 shadow-sm"
            style={{
              color: g1,
              borderColor: `${g1}44`,
              background: `${g1}15`,
              boxShadow: `0 0 10px ${skill.glow}`,
            }}
          >
            <span>{inView ? <Counter target={skill.level} inView={inView} /> : 0}%</span>
          </div>
        </div>

        {/* Cyber Neon Track Container with Ticks */}
        <div className="relative w-full bg-slate-900/90 rounded-xl h-3.5 p-0.5 border border-slate-800/90 overflow-hidden shadow-inner shadow-black/80">
          {/* Subtle Grid Ticks */}
          <div className="absolute inset-0 flex justify-between px-3 pointer-events-none z-10">
            <span className="w-px h-full bg-slate-800/50" />
            <span className="w-px h-full bg-slate-800/50" />
            <span className="w-px h-full bg-slate-800/50" />
          </div>

          {/* Animated Neon Progress Fill */}
          <div
            className="h-full rounded-lg transition-all duration-1000 ease-out relative flex items-center justify-end overflow-hidden"
            style={{
              width: inView ? `${skill.level}%` : "0%",
              background: `linear-gradient(90deg, ${g1}, ${g2})`,
              boxShadow: `0 0 14px ${skill.glow}`,
            }}
          >
            {/* Leading Illuminated Photon Tip */}
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff] mr-0.5 shrink-0 z-20" />

            {/* Hardware-Accelerated CSS Shimmer Sweep */}
            <div
              className="absolute inset-0 opacity-70 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
                animation: "shimmer-pass 2.8s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Infinite Marquee ────────────────────────────────────────────────────────
const marqueeKeyframes = `
  @keyframes marquee-ltr {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes marquee-rtl {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  @keyframes shimmer-pass {
    0%   { transform: translateX(-100%); }
    50%, 100% { transform: translateX(200%); }
  }
`;

function InfiniteMarquee({ items, direction = 1 }) {
  const doubled = [...items, ...items];
  const animName = direction > 0 ? "marquee-ltr" : "marquee-rtl";
  const duration = `${items.length * 2.8}s`;

  return (
    <div className="relative overflow-hidden py-2 sm:py-3">
      <style>{marqueeKeyframes}</style>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-slate-900 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-slate-900 to-transparent" />

      <div
        className="flex gap-3 sm:gap-4"
        style={{
          width: "max-content",
          animation: `${animName} ${duration} linear infinite`,
          willChange: "transform",
        }}
      >
        {doubled.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-2 sm:gap-3 px-5 sm:px-7 py-3.5 sm:py-5 rounded-2xl select-none active:scale-95 transition-transform"
              style={{
                minWidth: "105px",
                background: "rgba(15,23,42,0.8)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              <Icon
                style={{
                  color: tool.color,
                  fontSize: "2.1rem",
                  filter: `drop-shadow(0 0 8px ${tool.color}99)`,
                  flexShrink: 0,
                }}
              />
              <span className="text-[11px] sm:text-xs font-semibold text-slate-300 whitespace-nowrap">
                {tool.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Soft Skill Badge ────────────────────────────────────────────────────────
function SoftBadge({ skill, index }) {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
      whileHover={{ y: -5, scale: 1.05, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-2.5 sm:gap-3 p-4 sm:p-5 rounded-2xl cursor-pointer active:scale-95"
      style={{
        background: skill.bg,
        border: `1px solid ${skill.color}33`,
        transition: "background 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="transition-transform duration-300 group-hover:scale-110">
        <Icon style={{ color: skill.color, fontSize: "1.9rem", filter: `drop-shadow(0 0 6px ${skill.color}88)` }} />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-center text-slate-200 leading-tight">
        {skill.name}
      </span>
    </motion.div>
  );
}

// ─── Section Label ───────────────────────────────────────────────────────────
function SectionLabel({ children, accent }) {
  return (
    <motion.h3
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-lg sm:text-2xl font-extrabold mb-6 sm:mb-8 text-white flex items-center gap-2.5 sm:gap-3"
    >
      <span className="w-1.5 h-6 sm:h-7 rounded-full inline-block" style={{ background: accent }} />
      {children}
    </motion.h3>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SkillPage() {
  return (
    <section
      id="skills"
      className="relative bg-slate-900 text-slate-100 py-14 sm:py-24 overflow-hidden px-4 sm:px-12 lg:px-16"
    >
      {/* ── Ambient background blobs ── */}
      <div
        className="absolute -top-40 -left-40 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        className="absolute top-1/2 -right-40 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] rounded-full pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%)", filter: "blur(70px)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-14 sm:space-y-24">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          {/* Floating badge */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3.5 border"
            style={{
              background: "rgba(99,102,241,0.08)",
              borderColor: "rgba(99,102,241,0.25)",
              color: "#818CF8",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            What I Know
          </div>

          <h2 className="text-3xl sm:text-6xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Skills &amp;
            </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Expertise
            </span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto px-2">
            Technologies and tools I use daily — from programming languages to professional people skills.
          </p>

          {/* Decorative line */}
          <div
            className="mx-auto mt-5 h-px w-20 sm:w-24 rounded"
            style={{ background: "linear-gradient(90deg, #6366F1, #EC4899, #06B6D4)" }}
          />
        </motion.div>

        {/* ── Programming Skills Grid ── */}
        <div>
          <SectionLabel accent="linear-gradient(180deg,#6366F1,#8B5CF6)">
            Programming Languages &amp; Frameworks
          </SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {programmingSkills.map((skill, i) => (
              <FastSkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>

        {/* ── Tools Marquee ── */}
        <div>
          <SectionLabel accent="linear-gradient(180deg,#06B6D4,#3B82F6)">
            Web Technologies &amp; Tools
          </SectionLabel>
          <div className="space-y-3 sm:space-y-4 overflow-hidden rounded-2xl">
            <InfiniteMarquee items={marqueeTools} direction={1} />
            <InfiniteMarquee items={[...marqueeTools].reverse()} direction={-1} />
          </div>
        </div>

        {/* ── Soft Skills ── */}
        <div>
          <SectionLabel accent="linear-gradient(180deg,#EC4899,#F43F5E)">
            Soft Skills
          </SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-5">
            {softSkills.map((skill, i) => (
              <SoftBadge key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useMemo } from "react";
import {
  FaJava, FaPython, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaBootstrap, FaVuejs,
  FaHtml5, FaCss3Alt, FaDatabase,
  FaLightbulb, FaUsers, FaComments, FaClock, FaBrain, FaLeaf, FaCrown, FaPalette,
  FaChartLine, FaHandshake, FaSearch, FaBullseye, FaCode, FaLayerGroup, FaStar
} from "react-icons/fa";
import {
  SiTypescript, SiMongodb, SiNextdotjs, SiTailwindcss, SiFirebase, SiCplusplus,
  SiPostgresql, SiDocker, SiLinux, SiVscodium,
} from "react-icons/si";

// ─── Data ────────────────────────────────────────────────────────────────────
const programmingSkills = [
  { 
    id: "js",
    name: "JavaScript", 
    category: "frontend",
    icon: FaJs,         
    level: 90, 
    tag: "Core Language", 
    rank: "Expert",     
    gradient: ["#F7DF1E", "#F0A500"], 
    glow: "rgba(247,223,30,0.4)",
    isFeatured: true,
    highlight: "Primary web engine & Async ES6+",
    badge: "Daily Driver",
  },
  { 
    id: "react",
    name: "React JS",   
    category: "frontend",
    icon: FaReact,      
    level: 85, 
    tag: "Frontend Library", 
    rank: "Advanced", 
    gradient: ["#61DAFB", "#0891B2"], 
    glow: "rgba(97,218,251,0.4)",
    isFeatured: true,
    highlight: "Component Architecture, Hooks & Redux",
    badge: "Production Ready",
  },
  { 
    id: "next",
    name: "Next.js",    
    category: "frontend",
    icon: SiNextdotjs,  
    level: 80, 
    tag: "Full-Stack Framework", 
    rank: "Advanced", 
    gradient: ["#38BDF8", "#818CF8"], 
    glow: "rgba(56,189,248,0.4)",
    isFeatured: true,
    highlight: "App Router, SSR, Turbopack & API Routes",
    badge: "Full-Stack Engine",
  },
  { 
    id: "java",
    name: "Java",       
    category: "backend",
    icon: FaJava,       
    level: 80, 
    tag: "Backend / OOP", 
    rank: "Proficient", 
    gradient: ["#F89820", "#EA2D2E"], 
    glow: "rgba(234,45,46,0.35)",
    isFeatured: false,
    highlight: "Enterprise OOP & Multithreading",
  },
  { 
    id: "cpp",
    name: "C++",        
    category: "system",
    icon: SiCplusplus,  
    level: 75, 
    tag: "System / Algorithmic", 
    rank: "Proficient", 
    gradient: ["#659BD3", "#1A4F8A"], 
    glow: "rgba(101,155,211,0.4)",
    isFeatured: false,
    highlight: "Memory Management & Data Structures",
  },
  { 
    id: "python",
    name: "Python",     
    category: "system",
    icon: FaPython,     
    level: 70, 
    tag: "AI / Data Science", 
    rank: "Proficient", 
    gradient: ["#4B8BBE", "#FFE873"], 
    glow: "rgba(75,139,190,0.4)",
    isFeatured: false,
    highlight: "Computer Vision & Scripting",
  },
  { 
    id: "ts",
    name: "TypeScript", 
    category: "frontend",
    icon: SiTypescript, 
    level: 65, 
    tag: "Typed JavaScript", 
    rank: "Proficient", 
    gradient: ["#3178C6", "#235A97"], 
    glow: "rgba(49,120,198,0.4)",
    isFeatured: false,
    highlight: "Strict Typing & Interfaces",
  },
  { 
    id: "node",
    name: "Node.js",    
    category: "backend",
    icon: FaNodeJs,     
    level: 60, 
    tag: "Backend Runtime", 
    rank: "Intermediate", 
    gradient: ["#68A063", "#3C873A"], 
    glow: "rgba(104,160,99,0.4)",
    isFeatured: false,
    highlight: "REST APIs & Express Servers",
  },
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

// ─── Circular SVG Radial Progress Ring ────────────────────────────────────────
function RadialGauge({ level, color, glow, inView }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = inView ? circumference - (level / 100) * circumference : circumference;

  return (
    <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
        {/* Track Ring */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="4"
          fill="transparent"
        />
        {/* Progress Ring */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{
            transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
            filter: `drop-shadow(0 0 6px ${glow})`,
          }}
        />
      </svg>
      <div className="absolute font-mono font-black text-xs text-white">
        {inView ? <Counter target={level} inView={inView} /> : 0}%
      </div>
    </div>
  );
}

// ─── Featured Hero Bento Card Component ──────────────────────────────────────
function FeaturedBentoCard({ skill, index }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Icon = skill.icon;
  const [g1, g2] = skill.gradient;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group relative rounded-3xl p-6 sm:p-7 overflow-hidden cursor-pointer bg-slate-950/40 border border-slate-800/80 hover:border-slate-700 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl flex flex-col justify-between"
    >
      {/* Background Accent Gradient Aura */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none"
        style={{ background: skill.glow }}
      />
      <div
        className="absolute top-0 inset-x-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${g1}, transparent)` }}
      />

      <div>
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div
              className="w-13 h-13 rounded-2xl flex items-center justify-center border shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 bg-slate-900/50"
              style={{
                borderColor: `${g1}44`,
                boxShadow: `0 0 16px ${skill.glow}`,
              }}
            >
              <Icon className="text-3xl" style={{ color: g1 }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-lg sm:text-xl text-white group-hover:text-indigo-300 transition-colors">
                  {skill.name}
                </h4>
                <span
                  className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase border items-center gap-1 shrink-0"
                  style={{
                    color: g1,
                    background: `${g1}12`,
                    borderColor: `${g1}44`,
                  }}
                >
                  <FaStar className="text-[8px]" style={{ color: g1 }} />
                  {skill.badge}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400 block mt-0.5">
                {skill.tag}
              </span>
            </div>
          </div>

          <RadialGauge level={skill.level} color={g1} glow={skill.glow} inView={inView} />
        </div>

        {/* Feature Highlight Description */}
        <p
          className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light mb-5 p-3 rounded-xl border border-slate-800/60 bg-transparent"
        >
          <span style={{ color: g1 }}>✦</span> {skill.highlight}
        </p>
      </div>

      {/* Cyber Neon Track Container */}
      <div className="space-y-1.5 mt-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>PROFICIENCY GAUGE</span>
          <span className="font-bold uppercase tracking-wider" style={{ color: g1 }}>{skill.rank}</span>
        </div>

        <div className="relative w-full bg-slate-900 rounded-xl h-3 p-0.5 border border-slate-800/90 overflow-hidden shadow-inner">
          <div
            className="h-full rounded-lg transition-all duration-1000 ease-out relative flex items-center justify-end overflow-hidden"
            style={{
              width: inView ? `${skill.level}%` : "0%",
              background: `linear-gradient(90deg, ${g1}, ${g2})`,
              boxShadow: `0 0 14px ${skill.glow}`,
            }}
          >
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff] mr-0.5 shrink-0 z-20" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Compact Skill Card Component ────────────────────────────────────────────
function CompactSkillCard({ skill, index }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Icon = skill.icon;
  const [g1, g2] = skill.gradient;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group relative rounded-2xl p-4 sm:p-5 overflow-hidden cursor-pointer bg-slate-950/40 border border-slate-800/80 hover:border-slate-700 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
    >
      <div
        className="absolute top-0 inset-x-0 h-[2px] opacity-30 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${g1}, transparent)` }}
      />

      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm transition-transform duration-300 group-hover:scale-105 bg-slate-900/50"
            style={{
              borderColor: `${g1}33`,
              boxShadow: `0 0 10px ${skill.glow}`,
            }}
          >
            <Icon className="text-xl" style={{ color: g1 }} />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-white group-hover:text-indigo-300 transition-colors">
              {skill.name}
            </h4>
            <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
              {skill.tag}
            </span>
          </div>
        </div>

        <span
          className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider border shrink-0"
          style={{ color: g1, borderColor: `${g1}33`, background: `${g1}10` }}
        >
          {skill.rank}
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-400">Proficiency</span>
          <span className="font-extrabold" style={{ color: g1 }}>
            {inView ? <Counter target={skill.level} inView={inView} /> : 0}%
          </span>
        </div>

        <div className="w-full bg-slate-900 rounded-full h-2.5 p-0.5 border border-slate-800/80 overflow-hidden relative">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out relative flex items-center justify-end"
            style={{
              width: inView ? `${skill.level}%` : "0%",
              background: `linear-gradient(90deg, ${g1}, ${g2})`,
              boxShadow: `0 0 10px ${skill.glow}`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff] mr-0.5 shrink-0" />
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
`;

function InfiniteMarquee({ items, direction = 1 }) {
  const doubled = [...items, ...items];
  const animName = direction > 0 ? "marquee-ltr" : "marquee-rtl";
  const duration = `${items.length * 2.8}s`;

  return (
    <div className="relative overflow-hidden py-2 sm:py-3">
      <style>{marqueeKeyframes}</style>

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
  const [filter, setFilter] = useState("all"); // 'all' | 'frontend' | 'backend' | 'system'

  const filteredSkills = useMemo(() => {
    if (filter === "all") return programmingSkills;
    return programmingSkills.filter((s) => s.category === filter);
  }, [filter]);

  const featuredSkills = useMemo(() => filteredSkills.filter((s) => s.isFeatured), [filteredSkills]);
  const regularSkills = useMemo(() => filteredSkills.filter((s) => !s.isFeatured), [filteredSkills]);

  return (
    <section
      id="skills"
      className="relative bg-slate-900 text-slate-100 py-14 sm:py-24 overflow-hidden px-4 sm:px-12 lg:px-16"
    >
      {/* Ambient background blobs */}
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

          <div
            className="mx-auto mt-5 h-px w-20 sm:w-24 rounded"
            style={{ background: "linear-gradient(90deg, #6366F1, #EC4899, #06B6D4)" }}
          />
        </motion.div>

        {/* ── Programming Skills Bento Grid & Filter ── */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <SectionLabel accent="linear-gradient(180deg,#6366F1,#8B5CF6)">
              Programming Languages &amp; Frameworks
            </SectionLabel>

            {/* Interactive Category Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/90 border border-slate-800/90 text-xs font-mono backdrop-blur-md self-stretch sm:self-auto">
              {[
                { id: "all", label: `All (${programmingSkills.length})` },
                { id: "frontend", label: "Frontend" },
                { id: "backend", label: "Backend" },
                { id: "system", label: "AI & System" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl font-bold transition-all duration-200 whitespace-nowrap ${
                    filter === tab.id
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Bento Layout */}
          <div className="space-y-5">
            {/* Top Row: Spotlight Featured Bento Cards */}
            {featuredSkills.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {featuredSkills.map((skill, i) => (
                    <FeaturedBentoCard key={skill.id} skill={skill} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Bottom Row: Compact Skill Cards Grid */}
            {regularSkills.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <AnimatePresence mode="popLayout">
                  {regularSkills.map((skill, i) => (
                    <CompactSkillCard key={skill.id} skill={skill} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            )}
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

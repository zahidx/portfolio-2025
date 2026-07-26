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
  { name: "JavaScript", icon: FaJs,         level: 90, gradient: ["#F7DF1E", "#F0A500"], glow: "rgba(247,223,30,0.4)" },
  { name: "React JS",   icon: FaReact,      level: 85, gradient: ["#61DAFB", "#0891B2"], glow: "rgba(97,218,251,0.4)" },
  { name: "Java",       icon: FaJava,       level: 80, gradient: ["#F89820", "#EA2D2E"], glow: "rgba(234,45,46,0.35)" },
  { name: "Next.js",    icon: SiNextdotjs,  level: 80, gradient: ["#9ca3af", "#374151"], glow: "rgba(156,163,175,0.3)" },
  { name: "C++",        icon: SiCplusplus,  level: 75, gradient: ["#659BD3", "#1A4F8A"], glow: "rgba(101,155,211,0.4)" },
  { name: "Python",     icon: FaPython,     level: 70, gradient: ["#4B8BBE", "#FFE873"], glow: "rgba(75,139,190,0.4)" },
  { name: "TypeScript", icon: SiTypescript, level: 65, gradient: ["#3178C6", "#235A97"], glow: "rgba(49,120,198,0.4)" },
  { name: "Node.js",    icon: FaNodeJs,     level: 60, gradient: ["#68A063", "#3C873A"], glow: "rgba(104,160,99,0.4)" },
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
    const duration = 1200;
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

// ─── Skill Card ──────────────────────────────────────────────────────────────
function SkillCard({ skill, index }) {
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Icon = skill.icon;
  const [g1, g2] = skill.gradient;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl p-5 sm:p-7 overflow-hidden cursor-pointer active:scale-98 group transition-all"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        boxShadow: hovered
          ? `0 0 36px ${skill.glow}, 0 10px 36px rgba(0,0,0,0.2)`
          : "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      {/* Glow blob on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.35 }}
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl pointer-events-none"
        style={{ background: skill.glow }}
      />

      {/* Icon + name */}
      <div className="flex items-center gap-3.5 sm:gap-4 mb-4 sm:mb-5">
        <div>
          <Icon
            className="text-3xl sm:text-4xl drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
            style={{ color: skill.gradient[0] }}
          />
        </div>
        <span className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
          {skill.name}
        </span>
      </div>

      {/* Progress track */}
      <div className="w-full bg-slate-200 dark:bg-slate-700/60 rounded-full h-2 sm:h-2.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.05 }}
          className="h-2 sm:h-2.5 rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${g1}, ${g2})`,
            boxShadow: `0 0 10px ${skill.glow}`,
          }}
        >
          {/* Shimmer sweep */}
          <motion.span
            className="absolute inset-0 rounded-full"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.5 + index * 0.05 }}
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)" }}
          />
        </motion.div>
      </div>

      {/* Percentage counter */}
      <div className="mt-2.5 sm:mt-3 flex justify-between items-center">
        <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Proficiency</span>
        <span
          className="text-sm sm:text-base font-extrabold tabular-nums"
          style={{ color: skill.gradient[0] }}
        >
          <Counter target={skill.level} inView={inView} />%
        </span>
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

      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent" />

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
              className="flex flex-col items-center justify-center gap-2 sm:gap-3 px-5 sm:px-7 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl select-none active:scale-95 transition-transform"
              style={{
                minWidth: "105px",
                background: "rgba(255,255,255,0.045)",
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
              <span className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.06, transition: { duration: 0.2, ease: "easeOut" } }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-2.5 sm:gap-3 p-4 sm:p-6 rounded-xl sm:rounded-2xl cursor-pointer active:scale-95"
      style={{
        background: skill.bg,
        border: `1px solid ${skill.color}33`,
        transition: "background 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="transition-transform duration-300 group-hover:scale-110">
        <Icon style={{ color: skill.color, fontSize: "2rem", filter: `drop-shadow(0 0 7px ${skill.color}88)` }} />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-center text-slate-700 dark:text-slate-200 leading-tight">
        {skill.name}
      </span>
    </motion.div>
  );
}

// ─── Section Label ───────────────────────────────────────────────────────────
function SectionLabel({ children, accent }) {
  return (
    <motion.h3
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      className="text-lg sm:text-2xl font-extrabold mb-6 sm:mb-8 text-slate-800 dark:text-slate-100 flex items-center gap-2.5 sm:gap-3"
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
      className="relative bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-14 sm:py-24 overflow-hidden px-4 sm:px-12 lg:px-16"
    >
      {/* ── Ambient background blobs ── */}
      <motion.div
        className="absolute -top-40 -left-40 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", filter: "blur(60px)" }}
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 -right-40 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%)", filter: "blur(70px)" }}
        animate={{ scale: [1, 1.2, 1], x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-14 sm:space-y-24">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-center"
        >
          {/* Floating badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3.5 border"
            style={{
              background: "rgba(99,102,241,0.08)",
              borderColor: "rgba(99,102,241,0.25)",
              color: "#818CF8",
            }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            What I Know
          </motion.div>

          <h2 className="text-3xl sm:text-6xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Skills &amp;
            </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Expertise
            </span>
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto px-2">
            Technologies and tools I use daily — from programming languages to professional people skills.
          </p>

          {/* Decorative line */}
          <motion.div
            className="mx-auto mt-5 h-px w-20 sm:w-24 rounded"
            style={{ background: "linear-gradient(90deg, #6366F1, #EC4899, #06B6D4)" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* ── Programming Skills ── */}
        <div>
          <SectionLabel accent="linear-gradient(180deg,#6366F1,#8B5CF6)">
            Programming Languages &amp; Frameworks
          </SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {programmingSkills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
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

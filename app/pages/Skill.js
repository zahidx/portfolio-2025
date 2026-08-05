"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
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

// ─── 3D Interactive Tilt Skill Card ─────────────────────────────────────────
function TiltSkillCard({ skill, index }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);

  // 3D Tilt Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Icon = skill.icon;
  const [g1, g2] = skill.gradient;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.07, type: "spring", stiffness: 110, damping: 16 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative rounded-3xl p-6 sm:p-7 overflow-hidden cursor-pointer group transition-all duration-300 bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 backdrop-blur-xl shadow-xl hover:shadow-2xl"
    >
      {/* Background Radial Ambient Glow */}
      <div
        className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-20 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none"
        style={{ background: skill.glow }}
      />

      {/* Top Header: Icon + Name + Category Tag */}
      <div className="flex items-start justify-between gap-3 mb-5" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center gap-3.5">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
            style={{
              background: `radial-gradient(circle, ${g1}22 0%, rgba(15,23,42,0.9) 100%)`,
              borderColor: `${g1}44`,
              boxShadow: `0 0 16px ${skill.glow}`,
            }}
          >
            <Icon className="text-2xl drop-shadow" style={{ color: g1 }} />
          </div>
          <div>
            <h4 className="font-extrabold text-base text-white group-hover:text-indigo-300 transition-colors">
              {skill.name}
            </h4>
            <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
              {skill.tag}
            </span>
          </div>
        </div>

        <span
          className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border shrink-0"
          style={{
            color: g1,
            borderColor: `${g1}44`,
            background: `${g1}11`,
          }}
        >
          {skill.rank}
        </span>
      </div>

      {/* Modern Neon Progress Track & Percentage Counter */}
      <div className="space-y-2.5" style={{ transform: "translateZ(15px)" }}>
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 font-medium">Proficiency</span>
          <span className="font-extrabold text-sm sm:text-base tracking-tight" style={{ color: g1 }}>
            <Counter target={skill.level} inView={inView} />%
          </span>
        </div>

        <div className="w-full bg-slate-900 rounded-full h-3 p-0.5 border border-slate-800 overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
            className="h-full rounded-full relative flex items-center justify-end"
            style={{
              background: `linear-gradient(90deg, ${g1}, ${g2})`,
              boxShadow: `0 0 14px ${skill.glow}`,
            }}
          >
            {/* Glowing Leading Pulse Energy Dot */}
            <span className="w-2.5 h-2.5 rounded-full bg-white shadow-md shadow-white mr-0.5 animate-ping opacity-75 shrink-0" />
            <span className="w-2 h-2 rounded-full bg-white shadow-md shadow-white mr-0.5 shrink-0" />

            {/* Continuous Shimmer Light Sweep */}
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: index * 0.1 }}
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
          </motion.div>
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.06, transition: { duration: 0.2, ease: "easeOut" } }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-2.5 sm:gap-3 p-4 sm:p-6 rounded-2xl cursor-pointer active:scale-95"
      style={{
        background: skill.bg,
        border: `1px solid ${skill.color}33`,
        transition: "background 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="transition-transform duration-300 group-hover:scale-110">
        <Icon style={{ color: skill.color, fontSize: "2rem", filter: `drop-shadow(0 0 7px ${skill.color}88)` }} />
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
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
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
          <p className="mt-3 text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto px-2">
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

        {/* ── Programming Skills Grid ── */}
        <div>
          <SectionLabel accent="linear-gradient(180deg,#6366F1,#8B5CF6)">
            Programming Languages &amp; Frameworks
          </SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {programmingSkills.map((skill, i) => (
              <TiltSkillCard key={skill.name} skill={skill} index={i} />
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

"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  FlaskConical,
  Palette,
  Plane,
  Gamepad2,
  BookOpen,
  Music,
  Dumbbell,
  Rocket,
  Orbit,
} from "lucide-react";

const NODES = [
  {
    name: "Coding",
    icon: Code2,
    accent: "#818cf8",
    tagline: "Where logic meets craft",
    detail:
      "Building web apps, exploring frameworks, and solving hard problems. Most days start and end inside an editor.",
    tags: ["React", "Next.js", "Node.js"],
    level: 95,
    orbit: 1,
    angle: 20,
  },
  {
    name: "Research",
    icon: FlaskConical,
    accent: "#c084fc",
    tagline: "Asking better questions",
    detail:
      "AI, computer vision, and human-robot interaction — turning curiosity into prototypes.",
    tags: ["AI", "CV", "HRI"],
    level: 85,
    orbit: 2,
    angle: 70,
  },
  {
    name: "Design",
    icon: Palette,
    accent: "#34d399",
    tagline: "Pixels with purpose",
    detail:
      "UI/UX, motion, and the small details users feel but never notice.",
    tags: ["UI/UX", "Motion"],
    level: 80,
    orbit: 1,
    angle: 140,
  },
  {
    name: "Travel",
    icon: Plane,
    accent: "#fb923c",
    tagline: "Collecting horizons",
    detail:
      "New destinations, nature, and cultures that reset perspective.",
    tags: ["Nature", "Culture"],
    level: 75,
    orbit: 2,
    angle: 180,
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    accent: "#f472b6",
    tagline: "Play is design school",
    detail:
      "Esports and story-driven games — great games are great design lessons.",
    tags: ["Esports", "RPG"],
    level: 88,
    orbit: 1,
    angle: 230,
  },
  {
    name: "Learning",
    icon: BookOpen,
    accent: "#f87171",
    tagline: "Forever a student",
    detail:
      "Technical skills, fiction, and self-help — one new concept a day.",
    tags: ["Books", "Growth"],
    level: 92,
    orbit: 2,
    angle: 260,
  },
  {
    name: "Music",
    icon: Music,
    accent: "#e879f9",
    tagline: "Soundtrack of focus",
    detail:
      "Lo-fi for deep work, energy tracks for everything else.",
    tags: ["Lo-fi", "Focus"],
    level: 70,
    orbit: 1,
    angle: 300,
  },
  {
    name: "Fitness",
    icon: Dumbbell,
    accent: "#38bdf8",
    tagline: "Strong body, sharp mind",
    detail:
      "Sports, cricket, outdoors — the best debugging happens off-keyboard.",
    tags: ["Cricket", "Sports"],
    level: 78,
    orbit: 2,
    angle: 320,
  },
  {
    name: "Projects",
    icon: Rocket,
    accent: "#fbbf24",
    tagline: "Ideas shipped",
    detail:
      "Open-source tools, full-stack apps, and AI experiments that ship.",
    tags: ["OSS", "AI"],
    level: 90,
    orbit: 1,
    angle: 80,
  },
];

const ORBIT_R = { 1: 38, 2: 58 }; // % of container

export default function Interest() {
  const [active, setActive] = useState(NODES[0].name);
  const [hovered, setHovered] = useState(null);
  const [spinning, setSpinning] = useState(true);
  const current = useMemo(
    () => NODES.find((n) => n.name === (hovered || active)) || NODES[0],
    [active, hovered]
  );
  const Icon = current.icon;

  // keyboard: left/right to cycle nodes
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const idx = NODES.findIndex((n) => n.name === active);
      const next =
        e.key === "ArrowRight"
          ? NODES[(idx + 1) % NODES.length]
          : NODES[(idx - 1 + NODES.length) % NODES.length];
      setActive(next.name);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section className="py-8 sm:py-12" id="constellation">
      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400">
          <Orbit className="w-3.5 h-3.5" />
          Interactive constellation
        </span>
        <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight">
          My interest{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">
            universe
          </span>
        </h2>
        <p className="mt-1.5 text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
          Hover or click a planet. Use ← → keys. Pause the orbit anytime.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-10 items-center">
        {/* ── Orbital map ── */}
        <div className="relative mx-auto w-full max-w-[420px] aspect-square select-none">
          {/* rings */}
          {[ORBIT_R[1], ORBIT_R[2]].map((r) => (
            <div
              key={r}
              className="absolute rounded-full border border-dashed border-white/10"
              style={{
                width: `${r * 2}%`,
                height: `${r * 2}%`,
                top: `${50 - r}%`,
                left: `${50 - r}%`,
              }}
            />
          ))}

          {/* connecting line to active */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
            <motion.line
              x1="50"
              y1="50"
              x2={50 + ORBIT_R[current.orbit] * Math.cos(((current.angle - 90) * Math.PI) / 180)}
              y2={50 + ORBIT_R[current.orbit] * Math.sin(((current.angle - 90) * Math.PI) / 180)}
              stroke={current.accent}
              strokeWidth="0.15"
              strokeOpacity="0.45"
              initial={false}
              animate={{
                x2: 50 + ORBIT_R[current.orbit] * Math.cos(((current.angle - 90) * Math.PI) / 180),
                y2: 50 + ORBIT_R[current.orbit] * Math.sin(((current.angle - 90) * Math.PI) / 180),
              }}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
            />
          </svg>

          {/* core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.25), transparent 45%), linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
                boxShadow: `0 0 50px ${current.accent}55, 0 0 100px ${current.accent}22`,
              }}
            >
              <span className="text-[10px] sm:text-xs font-extrabold tracking-widest uppercase">
                Me
              </span>
              <div
                className="absolute inset-0 rounded-full animate-[core-pulse_3s_ease-in-out_infinite]"
                style={{ boxShadow: `inset 0 0 25px ${current.accent}44` }}
              />
            </div>
          </div>

          {/* spinning orbits */}
          <div
            className="absolute inset-0"
            style={{
              animation: spinning ? "orbit-spin 48s linear infinite" : "none",
            }}
          >
            {NODES.map((node) => {
              const r = ORBIT_R[node.orbit];
              const rad = ((node.angle - 90) * Math.PI) / 180;
              const x = 50 + r * Math.cos(rad);
              const y = 50 + r * Math.sin(rad);
              const isOn = (hovered || active) === node.name;
              const NodeIcon = node.icon;

              return (
                <button
                  key={node.name}
                  type="button"
                  aria-label={node.name}
                  onMouseEnter={() => setHovered(node.name)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(node.name)}
                  onBlur={() => setHovered(null)}
                  onClick={() => setActive(node.name)}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group outline-none"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {/* counter-rotate so icons stay upright */}
                  <div
                    style={{
                      animation: spinning
                        ? "orbit-spin 48s linear infinite reverse"
                        : "none",
                    }}
                  >
                    <div
                      className="relative flex flex-col items-center gap-1 transition-transform duration-300"
                      style={{ transform: isOn ? "scale(1.2)" : "scale(1)" }}
                    >
                      <div
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-300"
                        style={{
                          background: isOn
                            ? `${node.accent}33`
                            : "rgba(255,255,255,0.04)",
                          borderColor: isOn ? node.accent : "rgba(255,255,255,0.15)",
                          boxShadow: isOn
                            ? `0 0 24px ${node.accent}66`
                            : "none",
                        }}
                      >
                        <NodeIcon
                          className="w-4 h-4"
                          style={{ color: isOn ? node.accent : "#cbd5e1" }}
                        />
                      </div>
                      <span
                        className="text-[9px] sm:text-[11px] font-semibold tracking-wide whitespace-nowrap transition-colors"
                        style={{ color: isOn ? node.accent : "#94a3b8" }}
                      >
                        {node.name}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* orbit control */}
          <button
            type="button"
            onClick={() => setSpinning((s) => !s)}
            className="absolute bottom-1 left-1/2 -translate-x-1/2 z-30 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-widest border border-white/15 bg-black/40 backdrop-blur-md text-slate-300 hover:text-white hover:border-white/30 transition-colors"
          >
            {spinning ? "Pause orbit" : "Resume orbit"}
          </button>
        </div>

        {/* ── Live detail panel (not a modal card grid) ── */}
        <div className="relative min-h-[260px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -16, filter: "blur(8px)" }}
              transition={{ duration: 0.35 }}
            >
              <div
                className="text-[10px] uppercase tracking-[0.35em] mb-2"
                style={{ color: current.accent }}
              >
                Focused passion
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border"
                  style={{
                    background: `${current.accent}22`,
                    borderColor: `${current.accent}55`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: current.accent }} />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {current.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{current.tagline}</p>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed text-sm sm:text-base max-w-md">
                {current.detail}
              </p>

              <div className="mt-4">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-slate-500 mb-1.5">
                  <span>Intensity</span>
                  <span className="text-white font-semibold">{current.level}%</span>
                </div>
                <div className="h-[3px] bg-white/10 overflow-hidden rounded-full">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: current.accent }}
                    initial={{ width: 0 }}
                    animate={{ width: `${current.level}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs tracking-wide"
                    style={{ color: current.accent }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* node picker strip */}
              <div className="mt-6 flex flex-wrap gap-1.5">
                {NODES.map((n) => (
                  <button
                    key={n.name}
                    type="button"
                    onClick={() => setActive(n.name)}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background:
                        n.name === current.name ? n.accent : "rgba(255,255,255,0.2)",
                      transform: n.name === current.name ? "scale(1.6)" : "scale(1)",
                      boxShadow:
                        n.name === current.name ? `0 0 10px ${n.accent}` : "none",
                    }}
                    aria-label={`Select ${n.name}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes core-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
      `}</style>
    </section>
  );
}

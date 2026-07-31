"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Film,
  Play,
  Pause,
  Sparkles,
} from "lucide-react";

/* ── Dark & Vibrant Accent Quotes Collection ── */
const IMAX_QUOTES = [
  {
    id: "q1",
    quote: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
    role: "32nd U.S. President",
    genre: "VISION & DESTINY",
    gradientText: "from-indigo-300 via-purple-300 to-pink-400",
    borderGlow: "rgba(129, 140, 248, 0.35)",
    bgGlow: "rgba(99, 102, 241, 0.22)",
    accentColor: "#818cf8",
  },
  {
    id: "q2",
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    role: "Statesman & Author",
    genre: "RESILIENCE",
    gradientText: "from-rose-300 via-amber-300 to-yellow-400",
    borderGlow: "rgba(244, 63, 94, 0.35)",
    bgGlow: "rgba(244, 63, 94, 0.22)",
    accentColor: "#f43f5e",
  },
  {
    id: "q3",
    quote: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
    role: "26th U.S. President",
    genre: "ACTION & DRIVE",
    gradientText: "from-emerald-300 via-teal-300 to-cyan-400",
    borderGlow: "rgba(52, 211, 153, 0.35)",
    bgGlow: "rgba(16, 185, 129, 0.22)",
    accentColor: "#34d399",
  },
  {
    id: "q4",
    quote: "Believe you can, and you're halfway there.",
    author: "Theodore Roosevelt",
    role: "26th U.S. President",
    genre: "MINDSET",
    gradientText: "from-blue-300 via-indigo-300 to-violet-400",
    borderGlow: "rgba(96, 165, 250, 0.35)",
    bgGlow: "rgba(59, 130, 246, 0.22)",
    accentColor: "#60a5fa",
  },
  {
    id: "q5",
    quote: "Stay hungry. Stay foolish.",
    author: "Steve Jobs",
    role: "Co-Founder, Apple Inc.",
    genre: "CURIOSITY",
    gradientText: "from-fuchsia-300 via-purple-300 to-pink-400",
    borderGlow: "rgba(232, 121, 249, 0.35)",
    bgGlow: "rgba(217, 70, 239, 0.22)",
    accentColor: "#e879f9",
  },
  {
    id: "q6",
    quote: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    role: "Polymath & Artist",
    genre: "DESIGN PHILOSOPHY",
    gradientText: "from-cyan-300 via-sky-300 to-indigo-400",
    borderGlow: "rgba(56, 189, 248, 0.35)",
    bgGlow: "rgba(34, 211, 238, 0.22)",
    accentColor: "#38bdf8",
  },
];

/* ── Dark 3D IMAX Card Component ── */
function IMAXCard({ item, index, activeIndex, total, onSelect }) {
  const cardRef = useRef(null);
  const offset = index - activeIndex;
  const isActive = offset === 0;

  // Ultra-smooth mouse tilt spring physics
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
    stiffness: 140,
    damping: 22,
    mass: 0.5,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), {
    stiffness: 140,
    damping: 22,
    mass: 0.5,
  });

  const handleMouseMove = (e) => {
    if (!isActive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // 3D positioning transform values
  const translateX = offset * 215;
  const translateZ = isActive ? 0 : -200 - Math.abs(offset) * 80;
  const rotateYOffset = offset < 0 ? 24 : offset > 0 ? -24 : 0;
  const opacity = isActive ? 1 : Math.max(0.18, 0.55 - Math.abs(offset) * 0.22);
  const scale = isActive ? 1 : Math.max(0.75, 0.86 - Math.abs(offset) * 0.08);

  return (
    <motion.div
      ref={cardRef}
      onClick={() => onSelect(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={false}
      animate={{
        x: translateX,
        z: translateZ,
        rotateY: isActive ? rotateY.get() : rotateYOffset,
        rotateX: isActive ? rotateX.get() : 0,
        scale,
        opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 0.7,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`absolute w-full max-w-lg cursor-pointer select-none rounded-[2rem] transition-all duration-500 ${
        isActive
          ? "z-30 shadow-[0_20px_60px_rgba(0,0,0,0.85)]"
          : "z-10 hover:opacity-80"
      }`}
    >
      <div
        className="relative overflow-hidden rounded-[2rem] p-6 sm:p-7 border backdrop-blur-3xl"
        style={{
          background: isActive
            ? "linear-gradient(145deg, rgba(14, 13, 30, 0.96) 0%, rgba(9, 8, 20, 0.95) 100%)"
            : "linear-gradient(145deg, rgba(10, 9, 22, 0.85) 0%, rgba(6, 5, 14, 0.9) 100%)",
          borderColor: isActive ? item.borderGlow : "rgba(255, 255, 255, 0.08)",
          boxShadow: isActive
            ? `0 0 40px ${item.bgGlow}, inset 0 0 20px rgba(255, 255, 255, 0.03)`
            : "none",
        }}
      >
        {/* Subtle Ambient Color Burst inside Dark Card */}
        <div
          className="pointer-events-none absolute -top-14 -right-14 w-40 h-40 rounded-full blur-3xl opacity-20"
          style={{ background: item.accentColor }}
        />

        {/* Specular Flare on Mouse Hover */}
        {isActive && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[2rem]"
            style={{
              background: `radial-gradient(circle at ${mouseX.get() * 100}% ${
                mouseY.get() * 100
              }%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Card Header */}
        <div className="relative z-10 flex items-center justify-between gap-3 mb-4 border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ background: item.accentColor }}
            />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-slate-400 uppercase">
              FRAME // 0{index + 1}
            </span>
          </div>

          <div
            className="px-2.5 py-0.5 rounded-full border text-[9px] font-mono font-extrabold uppercase tracking-widest"
            style={{
              borderColor: `${item.accentColor}40`,
              backgroundColor: `${item.accentColor}12`,
              color: item.accentColor,
            }}
          >
            {item.genre}
          </div>
        </div>

        {/* Quote Content */}
        <div className="relative z-10 min-h-[90px] flex items-center">
          <Quote className="absolute -top-3 -left-2 w-12 h-12 text-white/[0.03] rotate-180 pointer-events-none" />
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
            &ldquo;{item.quote}&rdquo;
          </h3>
        </div>

        {/* Author Footer */}
        <div className="relative z-10 mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
          <div>
            <p
              className={`text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${item.gradientText}`}
            >
              {item.author}
            </p>
            <p className="text-[10px] text-slate-400 font-mono">{item.role}</p>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-slate-300 font-mono text-[10px]">
            <Sparkles className="w-3 h-3" style={{ color: item.accentColor }} />
            <span>0{index + 1}/0{total}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main IMAX Quotes Component ── */
export default function Quite() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const next = () => setActiveIndex((prev) => (prev + 1) % IMAX_QUOTES.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + IMAX_QUOTES.length) % IMAX_QUOTES.length);
  const shuffle = () => {
    let nextIdx = activeIndex;
    while (nextIdx === activeIndex) {
      nextIdx = Math.floor(Math.random() * IMAX_QUOTES.length);
    }
    setActiveIndex(nextIdx);
  };

  // Autoplay
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, activeIndex]);

  const activeQuote = IMAX_QUOTES[activeIndex];

  return (
    <section className="relative py-6 overflow-hidden select-none" id="words">
      {/* Dynamic Ambient Background Aura */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[520px] h-[320px] rounded-full blur-[120px] transition-colors duration-1000"
          style={{ background: activeQuote.bgGlow }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 mb-5 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-[10px] font-mono uppercase tracking-widest mb-1.5">
          <Film className="w-3 h-3 text-indigo-400" />
          3D IMAX Cinema Reel
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          Words that{" "}
          <span
            className={`text-transparent bg-clip-text bg-gradient-to-r ${activeQuote.gradientText} transition-all duration-700`}
          >
            Shape Mindset
          </span>
        </h2>
      </motion.div>

      {/* Compact 3D IMAX Stage Viewport */}
      <div className="relative h-[245px] sm:h-[260px] flex items-center justify-center perspective-[1000px]">
        <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
          {IMAX_QUOTES.map((item, idx) => (
            <IMAXCard
              key={item.id}
              item={item}
              index={idx}
              activeIndex={activeIndex}
              total={IMAX_QUOTES.length}
              onSelect={setActiveIndex}
            />
          ))}
        </div>
      </div>

      {/* Compact 3D IMAX Controls Bar */}
      <div className="relative z-20 mt-3 flex flex-col items-center gap-2.5">
        {/* Navigation Controls */}
        <div className="flex items-center gap-2.5 p-1.5 rounded-full border border-white/10 bg-slate-950/85 backdrop-blur-2xl shadow-2xl">
          <button
            onClick={prev}
            className="p-2.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-all active:scale-90"
            title="Previous"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-all active:scale-90"
            title={isPlaying ? "Pause" : "Play"}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-indigo-400" />
            ) : (
              <Play className="w-4 h-4 text-emerald-400" />
            )}
          </button>

          <button
            onClick={shuffle}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
          >
            <Shuffle className="w-3 h-3" />
            Shuffle Reel
          </button>

          <button
            onClick={next}
            className="p-2.5 rounded-full hover:bg-white/10 text-slate-200 hover:text-white transition-all active:scale-90"
            title="Next"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filmstrip Progress Indicators */}
        <div className="flex items-center gap-1.5">
          {IMAX_QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "w-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 shadow-md shadow-indigo-500/40"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to frame ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

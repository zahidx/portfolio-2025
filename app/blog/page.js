"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import {
  Sparkles,
  ArrowUp,
  ArrowRight,
  MousePointer2,
  Compass,
  Volume2,
  VolumeX,
  Command,
} from "lucide-react";
import Interest from "./Interest";
import Quite from "./Quite";
import Journey from "./Journey";
import BlogFooter from "./BlogFooter";
import ArticlesShowcase from "./ArticlesShowcase";

/* ─────────────────────────  Typewriter  ───────────────────────── */
const ROLES = ["a developer", "a traveler", "a gamer", "a lifelong learner", "a creator"];

function Typewriter() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];
    const speed = deleting ? 40 : 90;
    const tick = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1600);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(tick);
  }, [text, deleting, roleIdx]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 font-semibold">
      {text}
      <span className="inline-block w-[2px] h-[1em] align-middle ml-0.5 bg-fuchsia-400 animate-[cursor-blink_0.9s_step-end_infinite]" />
    </span>
  );
}



/* ─────────────────────  Quick jump command  ───────────────────── */
const JUMPS = [
  { id: "constellation", label: "Interest universe", hint: "Orbit" },
  { id: "journey", label: "A day in my life", hint: "Scroll story" },
  { id: "words", label: "Words & manifesto", hint: "Quotes" },
  { id: "connect", label: "Connect", hint: "CTA" },
];

function CommandJump({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      const n = Number(e.key);
      if (n >= 1 && n <= JUMPS.length) {
        document.getElementById(JUMPS[n - 1].id)?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center pt-[18vh] px-4">
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-[#0c0c1e]/95 shadow-2xl shadow-black/60"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2 text-slate-400 text-sm">
              <Command className="w-4 h-4" />
              Jump to section
              <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded border border-white/15">
                ESC
              </kbd>
            </div>
            <ul>
              {JUMPS.map((j, i) => (
                <li key={j.id}>
                  <button
                    type="button"
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-white/[0.05] transition-colors"
                    onClick={() => {
                      document.getElementById(j.id)?.scrollIntoView({ behavior: "smooth" });
                      onClose();
                    }}
                  >
                    <span className="font-mono text-[11px] text-slate-500 w-5">
                      {i + 1}
                    </span>
                    <span className="font-semibold text-white">{j.label}</span>
                    <span className="ml-auto text-[11px] uppercase tracking-widest text-slate-500">
                      {j.hint}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────  Ambient audio (Web Audio)  ───────────────────── */
function useAmbientDrone() {
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);
  const [on, setOn] = useState(false);

  const stop = () => {
    const n = nodesRef.current;
    if (n) {
      try {
        n.gain.gain.exponentialRampToValueAtTime(0.0001, n.ctx.currentTime + 0.4);
        setTimeout(() => {
          n.oscs.forEach((o) => o.stop());
          n.ctx.close();
        }, 450);
      } catch {
        /* ignore */
      }
      nodesRef.current = null;
      ctxRef.current = null;
    }
    setOn(false);
  };

  const start = async () => {
    stop();
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const gain = ctx.createGain();
    gain.gain.value = 0.0001;
    gain.connect(ctx.destination);

    const freqs = [110, 164.81, 220];
    const oscs = freqs.map((f, i) => {
      const o = ctx.createOscillator();
      o.type = i === 0 ? "sine" : "triangle";
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = i === 0 ? 0.35 : 0.12;
      o.connect(g);
      g.connect(gain);
      o.start();
      return o;
    });

    gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.2);
    ctxRef.current = ctx;
    nodesRef.current = { ctx, gain, oscs };
    setOn(true);
  };

  useEffect(() => () => stop(), []);

  const toggle = () => {
    if (on) stop();
    else start();
  };

  return { on, toggle };
}

/* ─────────────────────  Marquee  ───────────────────── */
const MARQUEE_WORDS = [
  "Coding", "Design", "Travel", "Gaming", "Music",
  "Fitness", "Research", "Learning", "Projects",
];

function Marquee() {
  const row = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className="relative py-5 border-y border-white/[0.06] overflow-hidden select-none">
      <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#060613] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#060613] to-transparent pointer-events-none" />
      <div className="flex w-max animate-[marquee_28s_linear_infinite]">
        {row.map((word, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white/15 uppercase">
              {word}
            </span>
            <Sparkles className="w-4 h-4 mx-6 text-fuchsia-500/35" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────  Page  ───────────────────── */
export default function Page() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const [showTop, setShowTop] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const { on: ambientOn, toggle: toggleAmbient } = useAmbientDrone();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
      if (e.key === "/" && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        setCmdOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className={`relative min-h-screen bg-[#060613] text-white overflow-x-clip transition-[filter] duration-700 ${
        ambientOn ? "brightness-[0.92]" : ""
      }`}
    >
      <CommandJump open={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
        style={{ scaleX: progress }}
      />

      {/* floating controls */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2">
        <button
          type="button"
          onClick={toggleAmbient}
          data-cursor
          className={`p-3 rounded-full border backdrop-blur-md transition-all ${
            ambientOn
              ? "border-fuchsia-400/50 bg-fuchsia-500/20 text-fuchsia-200 shadow-[0_0_24px_rgba(232,121,249,0.35)]"
              : "border-white/15 bg-[#0a0a1c]/80 text-slate-300 hover:text-white"
          }`}
          aria-label={ambientOn ? "Mute ambient sound" : "Play ambient sound"}
          title="Ambient focus tone"
        >
          {ambientOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
        <button
          type="button"
          onClick={() => setCmdOpen(true)}
          data-cursor
          className="p-3 rounded-full border border-white/15 bg-[#0a0a1c]/80 backdrop-blur-md text-slate-300 hover:text-white transition-colors"
          aria-label="Open jump menu"
          title="Press Ctrl/⌘ K"
        >
          <Command className="w-5 h-5" />
        </button>
      </div>

      {/* ambient layers */}
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          }}
        />
        <div className="absolute -top-40 -left-32 w-[34rem] h-[34rem] rounded-full bg-indigo-600/25 blur-[130px] animate-[aurora-a_16s_ease-in-out_infinite]" />
        <div className="absolute top-1/4 -right-40 w-[30rem] h-[30rem] rounded-full bg-fuchsia-600/20 blur-[130px] animate-[aurora-b_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/3 w-[28rem] h-[28rem] rounded-full bg-violet-700/15 blur-[130px] animate-[aurora-c_24s_ease-in-out_infinite]" />
        {ambientOn && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]" />
        )}
      </div>

      {/* hero — editorial, not a dashboard */}
      <header className="relative z-10 pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-medium tracking-widest uppercase text-indigo-300 mb-8"
        >
          <Compass className="w-3.5 h-3.5" />
          Lifestyle · Experiential
        </motion.div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
          {["Beyond", "the", "Code."].map((word, i) => (
            <motion.span
              key={word}
              className="inline-block mr-3 sm:mr-5"
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.12 + i * 0.12 }}
            >
              {word === "Code." ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400">
                  {word}
                </span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
        >
          An interactive look at who I am outside the repo — because I&apos;m{" "}
          <Typewriter />
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3 text-[11px] uppercase tracking-[0.22em] text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <span className="inline-flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded border border-white/15 text-slate-400">
              Ctrl K
            </kbd>
            jump
          </span>
          <span className="text-white/20">·</span>
          <span>Orbit the planets</span>
          <span className="text-white/20">·</span>
          <span>Scroll the day</span>
        </motion.div>

        <motion.div
          className="mt-14 flex flex-col items-center gap-2 text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <MousePointer2 className="w-4 h-4 animate-bounce" />
          <span className="text-[11px] uppercase tracking-[0.25em]">Begin exploring</span>
        </motion.div>
      </header>

      <div className="relative z-10">
        <Marquee />
      </div>

      <main className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ArticlesShowcase />
          <Interest />
        </div>

        <Journey />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Quite />
        </div>

        <BlogFooter />
      </main>

      <AnimatePresence>
        {showTop && (
          <motion.button
            key="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-cursor
            className="fixed bottom-6 right-44 sm:right-48 z-50 p-3 rounded-full border border-white/15 bg-[#0a0a1c]/80 backdrop-blur-md text-slate-300 hover:text-white hover:border-fuchsia-400/50 transition-colors"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* Regular cursor with purple accent glow style */
        html, body {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%236366f1' stroke='%23ffffff' stroke-width='1.5'%3E%3Cpath d='M3 3l7 18 3-7 7-3L3 3z'/%3E%3C/svg%3E"), auto;
        }

        a, button, [role="button"], input, select, textarea, [data-cursor] {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23a855f7' stroke='%23ffffff' stroke-width='1.5'%3E%3Cpath d='M3 3l7 18 3-7 7-3L3 3z'/%3E%3C/svg%3E"), pointer !important;
        }

        @keyframes cursor-blink {
          50% { opacity: 0; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes aurora-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, 40px) scale(1.15); }
        }
        @keyframes aurora-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-70px, 60px) scale(1.1); }
        }
        @keyframes aurora-c {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, -50px) scale(1.2); }
        }
      `}</style>
    </div>
  );
}

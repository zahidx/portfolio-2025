"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Maximize2, Minimize2, Copy, Check, ChevronRight } from "lucide-react";

/* THEMES */
const THEMES = {
  cyberpunk: { name: "Cyberpunk 2077", bg: "#09081a", border: "#6366f1", prompt: "#818cf8", accent: "#f43f5e", success: "#34d399", warn: "#fbbf24", info: "#60a5fa", text: "#e2e8f0", dim: "#64748b", scanline: false, glow: "shadow-[0_0_40px_rgba(99,102,241,0.25)]" },
  matrix:    { name: "Matrix Green",   bg: "#010d03", border: "#22c55e", prompt: "#4ade80", accent: "#86efac", success: "#4ade80", warn: "#a3e635", info: "#6ee7b7", text: "#bbf7d0", dim: "#166534", scanline: true,  glow: "shadow-[0_0_40px_rgba(34,197,94,0.25)]" },
  dracula:   { name: "Dracula Dark",   bg: "#1e1e2e", border: "#bd93f9", prompt: "#ff79c6", accent: "#50fa7b", success: "#50fa7b", warn: "#f1fa8c", info: "#8be9fd", text: "#f8f8f2", dim: "#6272a4", scanline: false, glow: "shadow-[0_0_40px_rgba(189,147,249,0.2)]" },
  monokai:   { name: "Monokai Pro",    bg: "#1a1916", border: "#e6db74", prompt: "#a6e22e", accent: "#f92672", success: "#a6e22e", warn: "#e6db74", info: "#66d9e8", text: "#f8f8f2", dim: "#75715e", scanline: false, glow: "shadow-[0_0_40px_rgba(230,219,116,0.15)]" },
  nord:      { name: "Nord Arctic",    bg: "#1a1f2e", border: "#88c0d0", prompt: "#81a1c1", accent: "#bf616a", success: "#a3be8c", warn: "#ebcb8b", info: "#88c0d0", text: "#eceff4", dim: "#4c566a", scanline: false, glow: "shadow-[0_0_40px_rgba(136,192,208,0.2)]" },
};

const ALL_PROJECTS = [
  { id: 1, name: "Social Interactive Robot", tag: "ai",    tech: "PyTorch, OpenCV, ROS",       desc: "Real-time HRI violence detection · 94.2% accuracy", url: "https://github.com/zahidx/social_robot.git" },
  { id: 2, name: "ScreenHub",                tag: "web",   tech: "Next.js, TMDB API, Firebase", desc: "Movie discovery platform · <120ms latency",         url: "https://screen-hub-u.netlify.app/" },
  { id: 3, name: "Tele Craft",               tag: "ai",    tech: "Gemini AI, React, Node.js",   desc: "Interactive AI story generation studio",            url: "https://tele-craft.netlify.app/" },
  { id: 4, name: "OrbitX",                   tag: "web",   tech: "Next.js, Three.js, GSAP",     desc: "3D orbital simulation & space data explorer",       url: "https://orbitx.netlify.app/" },
  { id: 5, name: "Financial Tracker",        tag: "web",   tech: "React, Firebase, Recharts",   desc: "Real-time personal finance dashboard",              url: "https://financial-tracker-n.netlify.app/" },
  { id: 6, name: "QuizArena",                tag: "web",   tech: "Next.js, Socket.io",          desc: "Multiplayer real-time quiz battle arena",           url: "https://quizarena-z.netlify.app/" },
  { id: 7, name: "Utility Pro",              tag: "tools", tech: "React, Web APIs",             desc: "30+ browser-based developer utilities",             url: "https://utilitypro.netlify.app/" },
  { id: 8, name: "ChatLoom",                 tag: "api",   tech: "Socket.io, Node, MongoDB",    desc: "E2E encrypted real-time chat platform",             url: "#" },
];

const SKILLS_DATA = [
  { name: "JavaScript / TypeScript", level: 92, color: "#fbbf24", category: "lang" },
  { name: "React / Next.js 15",      level: 90, color: "#60a5fa", category: "web" },
  { name: "Node.js / Express",        level: 78, color: "#34d399", category: "web" },
  { name: "Python / FastAPI",          level: 74, color: "#818cf8", category: "lang" },
  { name: "Firebase / PostgreSQL",    level: 76, color: "#f43f5e", category: "db" },
  { name: "PyTorch / OpenCV",         level: 70, color: "#e879f9", category: "ai" },
  { name: "Docker / CI-CD",           level: 62, color: "#38bdf8", category: "devops" },
  { name: "Three.js / WebGL / GSAP",  level: 65, color: "#fb923c", category: "creative" },
];

const CMD_REGISTRY = [
  { cmd: "help",        args: "",                           desc: "Show all commands and flags" },
  { cmd: "whoami",      args: "",                           desc: "Display bio, education & location" },
  { cmd: "skills",      args: "[--category=ai|web|lang]",   desc: "Interactive animated skill bars" },
  { cmd: "projects",    args: "[--tag=ai|web|api|tools]",   desc: "Browse & open project links" },
  { cmd: "experience",  args: "",                           desc: "Career timeline & achievements" },
  { cmd: "research",    args: "",                           desc: "Research paper & publication info" },
  { cmd: "articles",    args: "",                           desc: "Published technical blog posts" },
  { cmd: "contact",     args: "",                           desc: "Interactive multi-step message wizard" },
  { cmd: "download-cv", args: "",                           desc: "Download latest resume PDF" },
  { cmd: "stats",       args: "",                           desc: "Live session & system stats panel" },
  { cmd: "matrix",      args: "",                           desc: "Digital rain easter egg" },
  { cmd: "theme",       args: "<name>",                     desc: "Switch: cyberpunk|matrix|dracula|monokai|nord" },
  { cmd: "history",     args: "",                           desc: "Show session command history" },
  { cmd: "clear",       args: "",                           desc: "Clear terminal screen" },
  { cmd: "exit",        args: "",                           desc: "Close terminal" },
];

const BOOT_LINES = [
  { text: "Initializing ZahidOS Terminal v5.0.0...",                              color: "#818cf8", delay: 0    },
  { text: "Loading kernel modules: [react] [nextjs] [framer-motion]",             color: "#60a5fa", delay: 260  },
  { text: "Mounting filesystem: /portfolio/zahidul-islam...",                      color: "#64748b", delay: 520  },
  { text: "Starting services: [analytics] [firebase] [vercel-edge]",              color: "#64748b", delay: 780  },
  { text: "All systems nominal. Welcome, Engineer.",                               color: "#34d399", delay: 1040 },
  { text: "",                                                                      delay: 1160 },
  { text: "┌─────────────────────────────────────────────────────┐",              color: "#818cf8", delay: 1220 },
  { text: "│  ZAHIDUL ISLAM ◆ Software Engineer & AI Researcher  │",              color: "#e2e8f0", delay: 1280 },
  { text: "│  BSc CSE · Dhaka, BD · Available for Opportunities  │",              color: "#94a3b8", delay: 1340 },
  { text: "└─────────────────────────────────────────────────────┘",              color: "#818cf8", delay: 1400 },
  { text: "",                                                                      delay: 1460 },
  { text: "  Type 'help' for commands  ·  TAB autocomplete  ·  ↑↓ history",      color: "#475569", delay: 1520 },
];

/* Matrix Rain */
function MatrixRain({ onStop }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let id;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const chars = "ZAHIDULISLAM01アイウエオ∞∆∑πΩ</>{}[]01";
    const sz = 13;
    const cols = Math.floor(canvas.width / sz);
    const drops = Array.from({ length: cols }, () => Math.random() * -100);
    const draw = () => {
      ctx.fillStyle = "rgba(1,13,3,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const b = Math.random();
        ctx.fillStyle = b > 0.95 ? "#fff" : b > 0.7 ? "#86efac" : "#22c55e";
        ctx.font = sz + "px monospace";
        ctx.fillText(ch, i * sz, drops[i] * sz);
        if (drops[i] * sz > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center overflow-hidden rounded-b-2xl bg-[#010d03]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 text-center space-y-4 px-4">
        <pre className="text-green-400 font-mono text-[8px] sm:text-[11px] opacity-90 leading-tight">{`
 ███╗   ███╗ █████╗ ████████╗██████╗ ██╗██╗  ██╗
 ████╗ ████║██╔══██╗╚══██╔══╝██╔══██╗██║╚██╗██╔╝
 ██╔████╔██║███████║   ██║   ██████╔╝██║ ╚███╔╝
 ██║╚██╔╝██║██╔══██║   ██║   ██╔══██╗██║ ██╔██╗
 ██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║██║██╔╝ ██╗
 ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝`}</pre>
        <button onClick={onStop} className="mt-4 px-6 py-2 bg-green-500/20 border border-green-500/60 text-green-400 font-mono text-xs rounded-lg hover:bg-green-500/30 transition-all">
          [ PRESS ESC OR CLICK TO EXIT MATRIX ]
        </button>
      </div>
    </div>
  );
}

/* Animated Skill Bar */
function SkillBar({ skill, index, theme }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(skill.level), index * 80 + 120); return () => clearTimeout(t); }, [skill.level, index]);
  const filled = Math.round(skill.level / 5);
  const empty = 20 - filled;
  return (
    <div className="font-mono text-xs py-0.5">
      <div className="flex items-center justify-between mb-0.5">
        <span style={{ color: skill.color }}>{skill.name}</span>
        <span style={{ color: theme.dim }}>{skill.level}% [{skill.category}]</span>
      </div>
      <div><span style={{ color: skill.color }}>{"█".repeat(filled)}</span><span style={{ color: theme.dim }}>{"░".repeat(empty)}</span></div>
    </div>
  );
}

/* Contact Wizard */
function ContactWizard({ theme }) {
  const [step, setStep] = useState(0);
  const [vals, setVals] = useState(["", "", ""]);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef(null);
  const prompts = ["Your name:", "Your email:", "Your message:"];

  useEffect(() => { inputRef.current?.focus(); }, [step]);

  const handleKey = async (e) => {
    if (e.key !== "Enter") return;
    if (!vals[step].trim()) return;
    if (step < 2) { setStep(s => s + 1); return; }
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setDone(true);
  };

  if (done) return (
    <div className="font-mono text-xs space-y-1 mt-1" style={{ color: theme.success }}>
      <p>&#x2714; Message queued for delivery.</p>
      <p>&#x2714; Zahid will respond within 24-48h.</p>
      <p style={{ color: theme.dim }}>&#8212; Type &apos;help&apos; to continue.</p>
    </div>
  );

  return (
    <div className="font-mono text-xs space-y-2 mt-1">
      <p style={{ color: theme.info }}>{"// CONTACT WIZARD — interactive message protocol"}</p>
      {prompts.slice(0, step + 1).map((pr, i) => (
        <div key={i} className="flex items-center gap-2 flex-wrap">
          <span style={{ color: theme.prompt }}>&#10095;</span>
          <span style={{ color: theme.dim }}>{pr}</span>
          {i < step
            ? <span style={{ color: theme.text }}>{vals[i]}</span>
            : <input ref={inputRef} type={i === 1 ? "email" : "text"} value={vals[i]}
                onChange={e => { const v = [...vals]; v[i] = e.target.value; setVals(v); }}
                onKeyDown={handleKey} disabled={sending}
                className="bg-transparent border-none outline-none flex-1 font-mono min-w-0"
                style={{ color: theme.text, caretColor: theme.prompt }}
              />
          }
        </div>
      ))}
      {sending && <div style={{ color: theme.warn }} className="flex items-center gap-1"><span className="animate-pulse">&#9658;</span> Encrypting &amp; transmitting...</div>}
      {!sending && <p style={{ color: theme.dim }} className="text-[10px]">Step {step + 1}/3 &#8212; Press Enter to continue</p>}
    </div>
  );
}

/* Stats Panel */
function StatsPanel({ theme, sessionStart, cmdCount }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const elapsed = Math.round((now - sessionStart) / 1000);
  const mm = Math.floor(elapsed / 60).toString().padStart(2, "0");
  const ss = (elapsed % 60).toString().padStart(2, "0");
  const rows = [
    ["Session Time",  mm + ":" + ss,             theme.success],
    ["Commands Run",  String(cmdCount),           theme.info],
    ["Terminal",      "ZahidOS v5.0.0",           theme.text],
    ["Runtime",       "Next.js 15 / React 18",   theme.text],
    ["Renderer",      "Framer Motion + Canvas",  theme.text],
    ["Status",        "● READY",                 theme.success],
  ];
  return (
    <div className="font-mono text-xs p-3 rounded-lg border mt-1" style={{ borderColor: theme.border + "44", background: "rgba(0,0,0,0.3)" }}>
      <p style={{ color: theme.accent }} className="font-bold mb-2">{"// SESSION STATS"}</p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-0.5">
        {rows.map(([k, v, c]) => [
          <span key={k + "k"} style={{ color: theme.dim }}>{k}</span>,
          <span key={k + "v"} style={{ color: c }}>{v}</span>,
        ])}
      </div>
    </div>
  );
}

/* Ghost Input */
function GhostInput({ value, theme, inputRef, onChange, onKeyDown }) {
  const ghost = value && !value.includes(" ")
    ? CMD_REGISTRY.map(c => c.cmd).find(c => c.startsWith(value) && c !== value)
    : null;
  return (
    <div className="relative flex-1 font-mono text-xs overflow-hidden">
      <span className="absolute inset-0 pointer-events-none whitespace-pre" aria-hidden>
        <span className="invisible">{value}</span>
        {ghost && <span style={{ color: theme.dim, opacity: 0.45 }}>{ghost.slice(value.length)}</span>}
      </span>
      <input ref={inputRef} type="text" value={value} onChange={onChange} onKeyDown={onKeyDown}
        className="w-full bg-transparent border-none outline-none font-mono relative z-10"
        style={{ color: theme.text, caretColor: theme.prompt }}
        placeholder={value ? "" : "type a command or 'help'..."}
        autoComplete="off" spellCheck={false}
      />
    </div>
  );
}

/* MAIN COMPONENT */
export default function TerminalModal({ isOpen: extOpen, onClose: extClose }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen  = extOpen  !== undefined ? extOpen  : internalOpen;
  const onClose = extClose !== undefined ? extClose : () => setInternalOpen(false);

  const [input,        setInput]        = useState("");
  const [lines,        setLines]        = useState([]);
  const [cmdHistory,   setCmdHistory]   = useState([]);
  const [histIdx,      setHistIdx]      = useState(-1);
  const [themeKey,     setThemeKey]     = useState("cyberpunk");
  const [showMatrix,   setShowMatrix]   = useState(false);
  const [isMaximized,  setIsMaximized]  = useState(false);
  const [booted,       setBooted]       = useState(false);
  const [sessionStart] = useState(Date.now());
  const [cmdCount,     setCmdCount]     = useState(0);
  const [copied,       setCopied]       = useState(false);

  const inputRef  = useRef(null);
  const bottomRef = useRef(null);
  const konamiRef = useRef([]);
  const theme = THEMES[themeKey] || THEMES.cyberpunk;

  const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);

  useEffect(() => {
    if (!isOpen || booted) return;
    setBooted(true);
    setLines([]);
    BOOT_LINES.forEach(({ text, color, delay }) => {
      setTimeout(() => setLines(p => [...p, { type: "boot", text, color: color || theme.text }]), delay);
    });
    setTimeout(() => inputRef.current?.focus(), 1600);
  }, [isOpen]);

  useEffect(() => {
    const handler = e => {
      const inInput = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "t" && !inInput) {
        e.preventDefault();
        setInternalOpen(p => !p);
      }
      if (e.key === "Escape") {
        if (showMatrix) setShowMatrix(false);
        else if (isOpen) onClose();
      }
      konamiRef.current = [...konamiRef.current, e.key].slice(-10);
      if (JSON.stringify(konamiRef.current) === JSON.stringify(KONAMI)) {
        setShowMatrix(true);
        konamiRef.current = [];
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, showMatrix, onClose]);

  const push = useCallback(line => setLines(p => [...p, line]), []);

  const execute = useCallback((raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    setCmdHistory(p => [...p, trimmed]);
    setHistIdx(-1);
    setCmdCount(c => c + 1);
    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const argStr = parts.slice(1).join(" ");
    const flags = {};
    parts.slice(1).forEach(p => { const m = p.match(/^--([^=]+)=?(.*)/); if (m) flags[m[1]] = m[2] || true; });

    push({ type: "cmd", command: trimmed });

    const t = theme;

    switch (cmd) {
      case "help":
        push({ type: "jsx", content: (
          <div className="font-mono text-xs space-y-0.5 mt-1">
            <p style={{ color: t.info }} className="mb-2 font-bold">ZAHIDOS COMMAND REFERENCE</p>
            {CMD_REGISTRY.map(r => (
              <div key={r.cmd} className="flex gap-3 items-start py-0.5 border-b border-white/[0.04]">
                <span style={{ color: t.accent }} className="w-28 shrink-0 font-bold">{r.cmd}</span>
                <span style={{ color: t.dim    }} className="w-36 shrink-0 text-[10px]">{r.args}</span>
                <span style={{ color: t.text   }}>{r.desc}</span>
              </div>
            ))}
          </div>
        )});
        break;

      case "whoami": case "about":
        push({ type: "jsx", content: (
          <div className="font-mono text-xs space-y-1 mt-1 p-3 rounded-lg border" style={{ borderColor: t.border + "44" }}>
            <p style={{ color: t.prompt }} className="font-bold text-sm">Zahidul Islam // Software Engineer &amp; AI Researcher</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 mt-1">
              {[["Degree","BSc Computer Science & Engineering, 2024"],["University","Independent University, Bangladesh"],["Location","Baridhara, Dhaka, Bangladesh"],["Research","Spatial-Temporal CV · Violence Detection"],["Stack","React · Next.js 15 · Node · Python · Firebase"],["Languages","English · Bangla · Hindi · French"],["Status","● Open to Opportunities"]].map(([k, v]) => [
                <span key={k+"k"} style={{ color: t.dim }}>{k}</span>,
                <span key={k+"v"} style={{ color: k === "Status" ? t.success : t.text }}>{v}</span>,
              ])}
            </div>
          </div>
        )});
        break;

      case "skills": {
        const cat = flags.category;
        const filtered = cat ? SKILLS_DATA.filter(s => s.category === cat) : SKILLS_DATA;
        push({ type: "jsx", content: (
          <div className="mt-1 space-y-1.5">
            <p style={{ color: t.info }} className="font-mono text-xs font-bold mb-2">{"// TECHNICAL PROFICIENCY MATRIX "}{cat ? "[" + cat + "]" : "[ALL]"}</p>
            {filtered.map((sk, i) => <SkillBar key={sk.name} skill={sk} index={i} theme={t} />)}
            <p style={{ color: t.dim }} className="font-mono text-[10px] mt-2">Tip: skills --category=ai|web|db|lang|devops|creative</p>
          </div>
        )});
        break;
      }

      case "projects": {
        const tag = flags.tag;
        const filtered = tag ? ALL_PROJECTS.filter(p => p.tag === tag) : ALL_PROJECTS;
        push({ type: "jsx", content: (
          <div className="font-mono text-xs space-y-2 mt-1">
            <p style={{ color: t.info }} className="font-bold">{"// PROJECTS "}{tag ? "[--tag=" + tag + "]" : "[ALL]"} — {filtered.length} results</p>
            {filtered.map(p => (
              <div key={p.id} className="p-2.5 rounded-lg border border-white/[0.06] hover:border-white/20 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <span style={{ color: t.accent }} className="font-bold">{String(p.id).padStart(2,"0")}. {p.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0" style={{ background: t.border+"22", color: t.border }}>{p.tag}</span>
                </div>
                <p style={{ color: t.dim }} className="mt-0.5">{p.desc}</p>
                <p style={{ color: t.dim }} className="text-[10px] mt-0.5">Stack: {p.tech}</p>
                {p.url !== "#" && <a href={p.url} target="_blank" rel="noreferrer" style={{ color: t.info }} className="underline text-[10px] mt-0.5 inline-block hover:opacity-80">→ {p.url.replace("https://","")}</a>}
              </div>
            ))}
            <p style={{ color: t.dim }} className="text-[10px]">Tip: projects --tag=ai|web|api|tools</p>
          </div>
        )});
        break;
      }

      case "experience":
        push({ type: "jsx", content: (
          <div className="font-mono text-xs mt-1 space-y-3">
            <p style={{ color: t.warn }} className="font-bold">{"// CAREER TIMELINE"}</p>
            {[
              { period:"2023 – Present", role:"Student Research Assistant",     org:"Independent University, Bangladesh", detail:"Co-authored CV paper · MobileNetV3+Bi-LSTM · 94.2% accuracy" },
              { period:"2022 – Present", role:"Freelance Full-Stack Developer", org:"Self-employed · Remote",             detail:"50+ web apps · React · Next.js · Firebase · Stripe · Shopify" },
              { period:"2020 – 2022",    role:"Junior Web Developer",           org:"Personal Projects & Open Source",    detail:"20+ open-source tools built & shipped during undergrad" },
            ].map((e, i) => (
              <div key={i} className="pl-3 border-l-2" style={{ borderColor: t.accent + "66" }}>
                <p style={{ color: t.dim }} className="text-[10px]">{e.period}</p>
                <p style={{ color: t.text }} className="font-bold">{e.role}</p>
                <p style={{ color: t.accent }}>{e.org}</p>
                <p style={{ color: t.dim }} className="mt-0.5 text-[11px]">{e.detail}</p>
              </div>
            ))}
          </div>
        )});
        break;

      case "research":
        push({ type: "jsx", content: (
          <div className="font-mono text-xs mt-1 space-y-2 p-3 rounded-lg border" style={{ borderColor: t.border + "44" }}>
            <p style={{ color: t.prompt }} className="font-bold">{"// PUBLISHED RESEARCH"}</p>
            <p style={{ color: t.text }} className="font-bold">&quot;Efficient Violence Detection Techniques in Autonomous Interactive Robots&quot;</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 mt-1">
              {[["Accuracy","94.2%",t.success],["Model Size","19.4 MB",t.text],["Inference","48 FPS",t.text],["Architecture","MobileNetV3 + Bi-LSTM",t.text],["Dataset","Custom + RWF-2000",t.text]].map(([k,v,c]) => [
                <span key={k+"k"} style={{ color: t.dim }}>{k}</span>,
                <span key={k+"v"} style={{ color: c }}>{v}</span>,
              ])}
            </div>
          </div>
        )});
        break;

      case "articles": case "blog": {
        const posts = [
          { title:"Next.js 15 & Turbopack: A Deep Dive",                 slug:"building-high-performance-nextjs-15",          tag:"Web Dev" },
          { title:"Automated Surveillance with Computer Vision AI",       slug:"automated-surveillance-computer-vision-ai",    tag:"AI" },
          { title:"Micro-Frontend Architecture: Module Federation",       slug:"micro-frontend-architecture-module-federation",tag:"Architecture" },
          { title:"Full-Stack State Management: React & Firebase",        slug:"fullstack-state-management-react-firebase",    tag:"Web Dev" },
          { title:"PWA & Offline-First Web Applications",                slug:"pwa-offline-first-web-apps",                   tag:"Web Dev" },
        ];
        push({ type: "jsx", content: (
          <div className="font-mono text-xs mt-1 space-y-1.5">
            <p style={{ color: t.info }} className="font-bold mb-2">{"// TECHNICAL BLOG — "}{posts.length} articles</p>
            {posts.map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <span style={{ color: t.dim }}>{String(i+1).padStart(2,"0")}.</span>
                <a href={"/blog/" + p.slug} style={{ color: t.text }} className="hover:underline flex-1">{p.title}</a>
                <span className="px-1 py-0.5 rounded text-[10px] shrink-0" style={{ background: t.border+"22", color: t.border }}>{p.tag}</span>
              </div>
            ))}
          </div>
        )});
        break;
      }

      case "contact":
        push({ type: "wizard" });
        break;

      case "download-cv": case "resume":
        if (typeof window !== "undefined") window.open("/resume.pdf", "_blank");
        push({ type: "jsx", content: <p style={{ color: t.success }} className="font-mono text-xs">✔ Resume PDF download triggered — /resume.pdf</p> });
        break;

      case "stats":
        push({ type: "stats" });
        break;

      case "history":
        push({ type: "jsx", content: (
          <div className="font-mono text-xs mt-1 space-y-0.5">
            <p style={{ color: t.info }} className="font-bold mb-1">{"// SESSION HISTORY ("}{cmdHistory.length} commands)</p>
            {cmdHistory.map((c, i) => (
              <div key={i} className="flex gap-2">
                <span style={{ color: t.dim }}>{String(i+1).padStart(3," ")}</span>
                <span style={{ color: t.text }}>{c}</span>
              </div>
            ))}
          </div>
        )});
        break;

      case "matrix":
        setShowMatrix(true);
        push({ type: "jsx", content: <p style={{ color: "#4ade80" }} className="font-mono text-xs">{"// Initializing Matrix digital rain... (ESC to exit)"}</p> });
        break;

      case "theme":
        if (THEMES[argStr.toLowerCase()]) {
          const tk = argStr.toLowerCase();
          setThemeKey(tk);
          push({ type: "jsx", content: <p style={{ color: THEMES[tk].success }} className="font-mono text-xs">✔ Theme switched to &apos;{THEMES[tk].name}&apos;</p> });
        } else {
          push({ type: "jsx", content: (
            <div className="font-mono text-xs">
              <p style={{ color: t.accent }}>✘ Unknown theme. Click to switch:</p>
              <div className="flex gap-2 mt-1 flex-wrap">
                {Object.entries(THEMES).map(([k, v]) => (
                  <button key={k} onClick={() => setThemeKey(k)} className="px-2 py-0.5 rounded text-[10px] transition-all hover:opacity-80" style={{ background: v.border+"22", color: v.border, border: "1px solid "+v.border+"44" }}>{k}</button>
                ))}
              </div>
            </div>
          )});
        }
        break;

      case "clear": case "cls":
        setLines([]);
        setInput("");
        return;

      case "exit": case "quit":
        onClose();
        setInput("");
        return;

      default:
        push({ type: "jsx", content: (
          <p style={{ color: t.accent }} className="font-mono text-xs">
            zsh: command not found: <strong>{cmd}</strong>. Type &apos;help&apos; to see all commands.
          </p>
        )});
    }
    setInput("");
  }, [theme, cmdHistory, onClose, push]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") { execute(input); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const ni = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(ni);
      setInput(cmdHistory[cmdHistory.length - 1 - ni] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx > 0) { const ni = histIdx - 1; setHistIdx(ni); setInput(cmdHistory[cmdHistory.length - 1 - ni] || ""); }
      else { setHistIdx(-1); setInput(""); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const m = CMD_REGISTRY.map(c => c.cmd).find(c => c.startsWith(input.trim()) && c !== input.trim());
      if (m) setInput(m);
    }
  };

  const copyOutput = () => {
    const text = lines.map(l => l.type === "cmd" ? "$ " + l.command : l.text || "").join("\n");
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setInternalOpen(true)}
            className="fixed bottom-20 right-6 z-50 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full border shadow-lg backdrop-blur-md text-xs font-mono font-bold group transition-all active:scale-95"
            style={{ background:"rgba(9,8,26,0.92)", borderColor:"#6366f1aa", color:"#818cf8", boxShadow:"0 0 20px rgba(99,102,241,0.2)" }}
            title="Open Developer Terminal (Ctrl + Shift + T)"
          >
            <Terminal className="w-4 h-4 group-hover:animate-pulse" />
            <span>&gt;_ CLI</span>
            <span className="hidden sm:flex items-center gap-1 ml-1 px-1.5 py-0.5 rounded text-[10px] opacity-50 border" style={{ borderColor:"#6366f155" }}>⌃⇧T</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className={"relative flex flex-col overflow-hidden rounded-2xl border " + theme.glow + " transition-all duration-300"}
              style={{ width:"100%", maxWidth: isMaximized ? "1200px" : "800px", height: isMaximized ? "92vh" : "600px", background: theme.bg, borderColor: theme.border + "66" }}
            >
              {showMatrix && <MatrixRain onStop={() => setShowMatrix(false)} />}

              {theme.scanline && (
                <div className="absolute inset-0 z-20 pointer-events-none rounded-2xl" style={{ background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,100,0.015) 2px,rgba(0,255,100,0.015) 4px)" }} />
              )}

              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b shrink-0 select-none" style={{ borderColor: theme.border + "33", background: theme.bg + "ee" }}>
                <div className="flex items-center gap-2">
                  <button onClick={onClose}                          className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
                  <button onClick={() => setIsMaximized(!isMaximized)} className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-400 transition-colors" />
                  <div                                                className="w-3 h-3 rounded-full bg-emerald-500 opacity-40" />
                  <span className="ml-3 font-mono text-xs font-bold flex items-center gap-1.5" style={{ color: theme.dim }}>
                    <Terminal className="w-3.5 h-3.5" style={{ color: theme.prompt }} />
                    zahid@dev-terminal <span style={{ color: theme.border }}>~</span>
                  </span>
                </div>
                <div className="hidden md:flex items-center gap-1.5">
                  {Object.entries(THEMES).map(([k, v]) => (
                    <button key={k} onClick={() => setThemeKey(k)} title={v.name}
                      className="w-3 h-3 rounded-full border-2 transition-all hover:scale-125"
                      style={{ background: v.border, borderColor: k === themeKey ? "#fff" : "transparent", opacity: k === themeKey ? 1 : 0.35 }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={copyOutput} className="p-1.5 rounded hover:bg-white/10 transition-colors" style={{ color: theme.dim }}>
                    {copied ? <Check className="w-3.5 h-3.5" style={{ color: theme.success }} /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => setIsMaximized(!isMaximized)} className="p-1.5 rounded hover:bg-white/10 transition-colors" style={{ color: theme.dim }}>
                    {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={onClose} className="p-1.5 rounded hover:bg-white/10 transition-colors" style={{ color: theme.dim }}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2 font-mono text-xs leading-relaxed"
                onClick={() => inputRef.current?.focus()}
                style={{ scrollbarWidth:"thin", scrollbarColor: theme.border + "33 transparent" }}
              >
                {lines.map((line, i) => (
                  <div key={i}>
                    {line.type === "boot" && (
                      <motion.p initial={{ opacity:0, x:-4 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.15 }}
                        className="font-mono text-xs whitespace-pre" style={{ color: line.color }}>{line.text}</motion.p>
                    )}
                    {line.type === "cmd" && (
                      <div className="flex items-center gap-2 mt-2 flex-wrap" style={{ color: theme.text }}>
                        <ChevronRight className="w-3 h-3 shrink-0" style={{ color: theme.prompt }} />
                        <span style={{ color: theme.prompt }} className="shrink-0 font-bold">zahid@dev</span>
                        <span style={{ color: theme.dim }}>~$</span>
                        <span className="font-bold break-all">{line.command}</span>
                      </div>
                    )}
                    {line.type === "jsx" && (
                      <motion.div initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.15 }}>
                        {line.content}
                      </motion.div>
                    )}
                    {line.type === "wizard" && <ContactWizard theme={theme} />}
                    {line.type === "stats"  && <StatsPanel theme={theme} sessionStart={sessionStart} cmdCount={cmdCount} />}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 px-4 py-3 border-t shrink-0" style={{ borderColor: theme.border + "33", background: "rgba(0,0,0,0.35)" }}>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" style={{ color: theme.prompt }} />
                <span style={{ color: theme.prompt }} className="font-mono text-xs font-bold shrink-0">zahid@dev</span>
                <span style={{ color: theme.dim }} className="font-mono text-xs shrink-0">~$</span>
                <GhostInput value={input} theme={theme} inputRef={inputRef} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} />
                <button onClick={() => execute(input)} className="shrink-0 p-1.5 rounded hover:bg-white/10 transition-all hover:scale-110" style={{ color: theme.prompt }}>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-4 py-1 text-[10px] font-mono border-t shrink-0" style={{ borderColor: theme.border + "22", color: theme.dim, background: "rgba(0,0,0,0.45)" }}>
                <div className="flex items-center gap-3">
                  <span style={{ color: theme.success }}>● READY</span>
                  <span>{THEMES[themeKey].name}</span>
                  <span>{cmdCount} cmds</span>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <span>TAB autocomplete</span>
                  <span>↑↓ history</span>
                  <span>Konami = matrix</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";
import { Heart } from "lucide-react";
import { useCallback, useRef, useState } from "react";

/* ═══════════════════════════════════════════════
   ANIMATION COMPONENTS
═══════════════════════════════════════════════ */

// 🎵 MUSIC — Live equalizer bars
function EqBars() {
  const EQ = ["eq-a","eq-b","eq-c","eq-d","eq-e","eq-f","eq-g"];
  return (
    <div className="absolute bottom-0 inset-x-0 h-24 flex items-end px-5 gap-[2.5px] pointer-events-none">
      {Array.from({ length: 36 }).map((_, i) => (
        <div key={i} style={{
          flex: 1, borderRadius: "3px 3px 0 0", minHeight: 3,
          background: `hsl(${265 + (i % 25) * 4}, 80%, ${50 + (i % 10) * 3}%)`,
          animation: `${EQ[i % EQ.length]} ${(0.28 + (i % 9) * 0.07).toFixed(2)}s ease-in-out ${(i * 0.022).toFixed(3)}s infinite alternate`,
          opacity: 0.75,
        }} />
      ))}
    </div>
  );
}

// 📷 PHOTOGRAPHY — Spinning aperture
function Aperture() {
  return (
    <div className="absolute top-1/2 right-6 -translate-y-1/2 w-28 h-28 pointer-events-none flex items-center justify-center">
      {[22, 40, 56].map((r, i) => (
        <div key={i} className="absolute rounded-full border"
          style={{ width: r*2, height: r*2,
            borderColor: `rgba(236,72,153,${0.5 - i * 0.12})`,
            borderWidth: i === 0 ? 2 : 1,
            animation: `ring-pulse ${1.2 + i * 0.5}s ease-in-out ${i * 0.3}s infinite` }} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="absolute"
          style={{ width: 2, height: 44,
            background: "linear-gradient(to bottom, transparent, rgba(236,72,153,0.5), transparent)",
            transform: `rotate(${i * 60}deg)`,
            animation: "aperture-spin 6s linear infinite",
            transformOrigin: "center center" }} />
      ))}
      <div className="w-4 h-4 rounded-full bg-pink-500/50 border border-pink-400/80"
        style={{ animation: "ring-pulse 1s ease-in-out infinite" }} />
    </div>
  );
}

// 🎬 CINEMA — Scrolling film strip
function FilmStrip() {
  const frames = Array.from({ length: 8 });
  return (
    <div className="absolute bottom-0 inset-x-0 h-[52px] overflow-hidden pointer-events-none">
      <div style={{ display: "flex", width: "max-content", animation: "film-scroll 7s linear infinite" }}>
        {[...frames, ...frames, ...frames].map((_, i) => (
          <div key={i} style={{ flexShrink: 0, width: 40, height: 52,
            borderRight: "1px solid rgba(251,146,60,0.25)",
            display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "3px 4px" }}>
            <div style={{ display: "flex", gap: 2, justifyContent: "center" }}>
              {[0,1,2].map(h => <div key={h} style={{ width: 7, height: 5, background: "rgba(251,146,60,0.45)", borderRadius: 1 }} />)}
            </div>
            <div style={{ flex: 1, margin: "3px 0", background: `rgba(251,146,60,${0.08 + (i % 4) * 0.05})`, borderRadius: 2 }} />
            <div style={{ display: "flex", gap: 2, justifyContent: "center" }}>
              {[0,1,2].map(h => <div key={h} style={{ width: 7, height: 5, background: "rgba(251,146,60,0.45)", borderRadius: 1 }} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎮 GAMING — Radar scanner with blips
function Radar() {
  return (
    <div className="absolute top-4 right-4 w-32 h-32 pointer-events-none">
      {[16, 32, 48, 64].map((r, i) => (
        <div key={i} className="absolute rounded-full"
          style={{ width: r*2, height: r*2, top: 64-r, left: 64-r,
            border: `1px solid rgba(16,185,129,${0.15 + i * 0.05})` }} />
      ))}
      <div className="absolute" style={{ top: "50%", insetInline: 0, height: 1, background: "rgba(16,185,129,0.2)", transform: "translateY(-50%)" }} />
      <div className="absolute" style={{ left: "50%", insetBlock: 0, width: 1, background: "rgba(16,185,129,0.2)", transform: "translateX(-50%)" }} />
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div style={{ width: "100%", height: "100%", borderRadius: "50%",
          background: "conic-gradient(from 0deg, rgba(16,185,129,0.45) 0deg, rgba(16,185,129,0.1) 50deg, transparent 90deg)",
          animation: "radar-spin 2s linear infinite" }} />
      </div>
      {[[38,22],[70,58],[18,65],[80,30]].map(([x,y], i) => (
        <div key={i} className="absolute rounded-full bg-emerald-400"
          style={{ width: 5, height: 5, top: `${y}%`, left: `${x}%`,
            boxShadow: "0 0 6px rgba(16,185,129,0.8)",
            animation: `blip ${1.8 + i * 0.4}s ease-in-out ${i * 0.5}s infinite` }} />
      ))}
    </div>
  );
}

// 📚 READING — Floating word cloud (for right panel)
const READ_WORDS = [
  { text: "Fiction",    x: 8,  delay: 0,   dur: 7,   size: 12, op: 0.75 },
  { text: "Philosophy", x: 42, delay: 1.4, dur: 9,   size: 10, op: 0.6  },
  { text: "Self-help",  x: 18, delay: 0.7, dur: 8,   size: 11, op: 0.7  },
  { text: "Tech",       x: 62, delay: 2.3, dur: 6.5, size: 14, op: 0.75 },
  { text: "Psychology", x: 30, delay: 3.2, dur: 10,  size: 10, op: 0.55 },
  { text: "React",      x: 55, delay: 1.8, dur: 7.5, size: 11, op: 0.65 },
  { text: "Design",     x: 5,  delay: 4.0, dur: 8.5, size: 10, op: 0.6  },
  { text: "Stoicism",   x: 72, delay: 2.7, dur: 9,   size: 10, op: 0.55 },
  { text: "Novel",      x: 25, delay: 0.3, dur: 6.5, size: 12, op: 0.7  },
  { text: "Biography",  x: 50, delay: 3.8, dur: 8,   size: 10, op: 0.55 },
];
function BookWords() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {READ_WORDS.map((w, i) => (
        <span key={i} className="absolute font-extrabold select-none pointer-events-none"
          style={{ left: `${w.x}%`, bottom: "-28px", fontSize: w.size,
            whiteSpace: "nowrap", letterSpacing: "0.03em",
            color: `rgba(251,191,36,${w.op})`,
            animation: `word-float ${w.dur}s linear ${w.delay}s infinite` }}>
          {w.text}
        </span>
      ))}
      <div className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(245,158,11,0.15), transparent)" }} />
    </div>
  );
}

// ✈️ TRAVEL — Vivid world map SVG (for right panel)
function FlightPath() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(rgba(14,165,233,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.09) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }} />
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle, rgba(14,165,233,0.28) 1.5px, transparent 1.5px)",
        backgroundSize: "18px 18px",
      }} />
      <svg viewBox="0 0 160 180" className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
        <defs>
          <filter id="pglow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="cglow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {/* Arcs */}
        <path d="M 30 140 Q 80 50 138 95" fill="none" stroke="rgba(14,165,233,0.8)" strokeWidth="2.2" strokeDasharray="7 4" />
        <path d="M 30 140 Q 60 155 105 148" fill="none" stroke="rgba(14,165,233,0.3)" strokeWidth="1" strokeDasharray="3 5" />
        {/* Dhaka */}
        <g filter="url(#cglow)">
          <circle cx="30" cy="140" r="9" fill="rgba(14,165,233,0.2)" stroke="#38bdf8" strokeWidth="2">
            <animate attributeName="r" values="9;15;9" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="30" cy="140" r="4" fill="#7dd3fc"/>
        </g>
        <text x="38" y="136" fontSize="9" fill="#7dd3fc" fontWeight="800">Dhaka</text>
        {/* Dubai */}
        <g filter="url(#cglow)">
          <circle cx="138" cy="95" r="9" fill="rgba(14,165,233,0.2)" stroke="#38bdf8" strokeWidth="2">
            <animate attributeName="r" values="9;15;9" dur="2.4s" begin="0.6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0.4;1" dur="2.4s" begin="0.6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="138" cy="95" r="4" fill="#7dd3fc"/>
        </g>
        <text x="118" y="88" fontSize="9" fill="#7dd3fc" fontWeight="800">Dubai</text>
        {/* Singapore */}
        <g filter="url(#cglow)">
          <circle cx="105" cy="148" r="7" fill="rgba(14,165,233,0.15)" stroke="rgba(14,165,233,0.8)" strokeWidth="1.5">
            <animate attributeName="r" values="7;12;7" dur="2.8s" begin="1.2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="105" cy="148" r="3" fill="#bae6fd"/>
        </g>
        <text x="112" y="145" fontSize="8" fill="rgba(14,165,233,0.9)" fontWeight="700">Singapore</text>
        {/* Glowing plane */}
        <g filter="url(#pglow)">
          <circle r="12" fill="rgba(14,165,233,0.1)">
            <animateMotion dur="4s" repeatCount="indefinite" path="M 30 140 Q 80 50 138 95"/>
          </circle>
          <circle r="7" fill="#0ea5e9" stroke="#bae6fd" strokeWidth="1.5">
            <animateMotion dur="4s" repeatCount="indefinite" path="M 30 140 Q 80 50 138 95"/>
          </circle>
          <circle r="3" fill="white">
            <animateMotion dur="4s" repeatCount="indefinite" path="M 30 140 Q 80 50 138 95"/>
          </circle>
        </g>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   HOBBY DATA
═══════════════════════════════════════════════ */
const hobbies = [
  {
    emoji: "🎵", title: "Music", subtitle: "Listening",
    description: "From lo-fi chill to orchestral epics — music is the constant backdrop to everything I create.",
    stat: "8h+", statLabel: "daily listening",
    accent: "#8b5cf6", spotlight: "rgba(139,92,246,0.18)",
    tags: ["Lo-fi", "Classical", "Indie"],
    Animation: EqBars, size: "large", layout: "overlay",
    cardBg: "bg-gradient-to-br from-violet-950/60 via-slate-900/80 to-slate-900/90",
    border: "border-violet-800/30", hoverBorder: "hover:border-violet-500/50",
  },
  {
    emoji: "📷", title: "Photography", subtitle: "Visual Storytelling",
    description: "Every shot is a story frozen in time. Travel and street photography are my favourite canvases.",
    stat: "2K+", statLabel: "shots captured",
    accent: "#ec4899", spotlight: "rgba(236,72,153,0.18)",
    tags: ["Street", "Travel", "Portrait"],
    Animation: Aperture, size: "small", layout: "overlay",
    cardBg: "bg-gradient-to-br from-pink-950/60 via-slate-900/80 to-slate-900/90",
    border: "border-pink-800/30", hoverBorder: "hover:border-pink-500/50",
  },
  {
    emoji: "🎬", title: "Cinema", subtitle: "Film & Stories",
    description: "Sci-fi worlds, indie dramas, cult thrillers — every film is a masterclass in storytelling.",
    stat: "300+", statLabel: "films watched",
    accent: "#f97316", spotlight: "rgba(249,115,22,0.18)",
    tags: ["Sci-fi", "Thriller", "Indie"],
    Animation: FilmStrip, size: "small", layout: "overlay",
    cardBg: "bg-gradient-to-br from-orange-950/60 via-slate-900/80 to-slate-900/90",
    border: "border-orange-800/30", hoverBorder: "hover:border-orange-500/50",
  },
  {
    emoji: "🎮", title: "Gaming", subtitle: "Strategy & RPG",
    description: "Open worlds and strategy maps — gaming sharpens every decision-making and creative instinct I have.",
    stat: "500h+", statLabel: "playtime logged",
    accent: "#10b981", spotlight: "rgba(16,185,129,0.18)",
    tags: ["RPG", "Strategy", "Open World"],
    Animation: Radar, size: "large", layout: "overlay",
    cardBg: "bg-gradient-to-br from-emerald-950/60 via-slate-900/80 to-slate-900/90",
    border: "border-emerald-800/30", hoverBorder: "hover:border-emerald-500/50",
  },
  {
    emoji: "📚", title: "Reading", subtitle: "Books & Articles",
    description: "Self-help, philosophy, fiction and tech — reading keeps me growing far beyond any IDE.",
    stat: "50+", statLabel: "books this year",
    accent: "#f59e0b", spotlight: "rgba(245,158,11,0.18)",
    tags: ["Self-help", "Tech", "Fiction"],
    Animation: BookWords, size: "small", layout: "split",
    cardBg: "bg-gradient-to-br from-amber-950/60 via-slate-900/80 to-slate-900/90",
    border: "border-amber-800/30", hoverBorder: "hover:border-amber-500/50",
  },
  {
    emoji: "✈️", title: "Travel", subtitle: "Explore & Wander",
    description: "New cities, new cultures, new perspectives. Every trip plants a dozen new ideas.",
    stat: "12+", statLabel: "cities explored",
    accent: "#0ea5e9", spotlight: "rgba(14,165,233,0.18)",
    tags: ["Asia", "Street Food", "Adventure"],
    Animation: FlightPath, size: "small", layout: "split",
    cardBg: "bg-gradient-to-br from-sky-950/60 via-slate-900/80 to-slate-900/90",
    border: "border-sky-800/30", hoverBorder: "hover:border-sky-500/50",
  },
];

/* ═══════════════════════════════════════════════
   OVERLAY CARD  (original style — Music/Photo/Cinema/Gaming)
═══════════════════════════════════════════════ */
function OverlayCard({ hobby, wide = true }) {
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50, opacity: 0 });
  const [hovered, setHovered] = useState(false);
  const { Animation } = hobby;

  const onMove = useCallback((e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, opacity: 1 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPos(p => ({ ...p, opacity: 0 })); }}
      className={`group relative overflow-hidden rounded-3xl border ${hobby.border} ${hobby.hoverBorder} ${hobby.cardBg}
        transition-all duration-300 cursor-default
        ${hobby.size === "large" && wide ? "sm:col-span-2" : ""}
        ${hovered ? "shadow-2xl -translate-y-1.5 scale-[1.01]" : ""}
      `}
      style={{ minHeight: hobby.size === "large" ? 220 : 200 }}
    >
      {/* Mouse spotlight */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl z-10"
        style={{ background: `radial-gradient(280px circle at ${pos.x}% ${pos.y}%, ${hobby.spotlight}, transparent 70%)`, opacity: pos.opacity }} />

      {/* Accent top border */}
      <div className="absolute top-0 inset-x-0 h-px z-20"
        style={{ background: `linear-gradient(90deg, transparent, ${hobby.accent}90, transparent)`, opacity: hovered ? 1 : 0.4 }} />

      {/* Animation — full overlay behind content */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-50"}`}>
        <Animation />
      </div>

      {/* Content */}
      <div className={`relative z-20 p-7 flex gap-6 ${hobby.size === "large" ? "flex-row items-center" : "flex-col"}`}>
        <div className="flex-shrink-0 transition-all duration-300"
          style={{ transform: hovered ? "scale(1.2) rotate(-6deg)" : "scale(1)", fontSize: hobby.size === "large" ? "3.5rem" : "2.8rem", lineHeight: 1 }}>
          {hobby.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-0.5" style={{ color: hobby.accent }}>{hobby.subtitle}</p>
              <h3 className="text-xl font-black text-white leading-tight">{hobby.title}</h3>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-black leading-none" style={{ color: hobby.accent }}>{hobby.stat}</div>
              <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{hobby.statLabel}</div>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">{hobby.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {hobby.tags.map(tag => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border"
                style={{ borderColor: `${hobby.accent}40`, background: `${hobby.accent}12`, color: hobby.accent }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom expanding line */}
      <div className="absolute bottom-0 left-0 h-[2px] z-20 transition-all duration-500"
        style={{ width: hovered ? "100%" : "0%", background: `linear-gradient(90deg, ${hobby.accent}, transparent)` }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SPLIT CARD  (text left | animation right — Reading & Travel only)
═══════════════════════════════════════════════ */
function SplitCard({ hobby }) {
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50, opacity: 0 });
  const [hovered, setHovered] = useState(false);
  const { Animation } = hobby;

  const onMove = useCallback((e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, opacity: 1 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPos(p => ({ ...p, opacity: 0 })); }}
      className={`group relative overflow-hidden rounded-3xl border ${hobby.border} ${hobby.hoverBorder} ${hobby.cardBg}
        transition-all duration-300 cursor-default
        ${hovered ? "shadow-2xl -translate-y-1.5 scale-[1.01]" : ""}
      `}
      style={{ minHeight: 200 }}
    >
      {/* Mouse spotlight */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl z-10"
        style={{ background: `radial-gradient(280px circle at ${pos.x}% ${pos.y}%, ${hobby.spotlight}, transparent 70%)`, opacity: pos.opacity }} />

      {/* Accent top border */}
      <div className="absolute top-0 inset-x-0 h-px z-20"
        style={{ background: `linear-gradient(90deg, transparent, ${hobby.accent}90, transparent)`, opacity: hovered ? 1 : 0.4 }} />

      {/* Two-zone row layout */}
      <div className="relative flex flex-row h-full z-20">

        {/* LEFT — text content, always clean */}
        <div className="flex-1 p-7 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-0.5" style={{ color: hobby.accent }}>{hobby.subtitle}</p>
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl leading-none flex-shrink-0 transition-all duration-300"
                    style={{ transform: hovered ? "scale(1.2) rotate(-6deg)" : "scale(1)" }}>
                    {hobby.emoji}
                  </span>
                  <h3 className="text-xl font-black text-white leading-tight">{hobby.title}</h3>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-black leading-none" style={{ color: hobby.accent }}>{hobby.stat}</div>
                <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{hobby.statLabel}</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mt-2 mb-4">{hobby.description}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {hobby.tags.map(tag => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border"
                style={{ borderColor: `${hobby.accent}40`, background: `${hobby.accent}12`, color: hobby.accent }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — animation zone, fully clipped */}
        <div className="relative w-52 xl:w-60 flex-shrink-0 overflow-hidden"
          style={{ borderLeft: `1px solid ${hobby.accent}20` }}>
          <div className={`absolute inset-0 transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-60"}`}>
            <Animation />
          </div>
          {/* Left-edge fade so animation blends smoothly */}
          <div className="absolute inset-y-0 left-0 w-8 pointer-events-none z-10"
            style={{ background: "linear-gradient(to right, rgba(2,6,23,0.9), transparent)" }} />
        </div>
      </div>

      {/* Bottom expanding line */}
      <div className="absolute bottom-0 left-0 h-[2px] z-30 transition-all duration-500"
        style={{ width: hovered ? "100%" : "0%", background: `linear-gradient(90deg, ${hobby.accent}, transparent)` }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════════ */
export default function Hobbies() {
  return (
    <section className="relative bg-slate-950 py-24 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <style>{`
        /* Equalizer */
        @keyframes eq-a { 0%{height:4px}  100%{height:58px} }
        @keyframes eq-b { 0%{height:10px} 100%{height:42px} }
        @keyframes eq-c { 0%{height:18px} 100%{height:70px} }
        @keyframes eq-d { 0%{height:6px}  100%{height:50px} }
        @keyframes eq-e { 0%{height:22px} 100%{height:38px} }
        @keyframes eq-f { 0%{height:12px} 100%{height:62px} }
        @keyframes eq-g { 0%{height:8px}  100%{height:46px} }
        /* Aperture */
        @keyframes ring-pulse {
          0%,100% { transform:scale(1);    opacity:0.6 }
          50%     { transform:scale(1.12); opacity:1   }
        }
        @keyframes aperture-spin { to { transform:rotate(360deg) } }
        /* Film */
        @keyframes film-scroll { from{transform:translateX(0)} to{transform:translateX(-33.33%)} }
        /* Radar */
        @keyframes radar-spin { to { transform:rotate(360deg) } }
        @keyframes blip {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:0.2;transform:scale(0.4)}
        }
        /* Reading words */
        @keyframes word-float {
          0%   { transform:translateY(0);      opacity:0 }
          8%   { opacity:1 }
          85%  { opacity:1 }
          100% { transform:translateY(-240px); opacity:0 }
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.07),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(14,165,233,0.07),transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-semibold uppercase tracking-widest mb-5">
            <Heart className="w-3.5 h-3.5" />
            Life Beyond Code
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-sky-400">
              Hobbies
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto">
            Hover each card — every one comes alive with its own world.
          </p>
        </div>

        {/* First row — Music and Photography share a wider first column */}
        <div className="grid gap-4">
          <div className="grid grid-cols-1 sm:[grid-template-columns:1.7fr_1fr] gap-4">
            {hobbies.slice(0, 2).map((h, i) =>
              h.layout === "split"
                ? <SplitCard key={i} hobby={h} />
                : <OverlayCard key={i} hobby={h} wide={false} />
            )}
          </div>

          {/* Remaining cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hobbies.slice(2).map((h, i) =>
              h.layout === "split"
                ? <SplitCard key={i + 2} hobby={h} />
                : <OverlayCard key={i + 2} hobby={h} wide={h.size === "large" ? false : true} />
            )}
          </div>
        </div>

        <p className="text-center text-slate-700 text-sm mt-10">
          ✦ These keep me creative, curious, and human ✦
        </p>
      </div>
    </section>
  );
}

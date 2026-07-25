"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

/* ── Service Data ─────────────────────────────── */
const MODULES = [
  {
    id: "WEB-01",
    title: "Web Development",
    category: "FRONTEND / BACKEND",
    status: "ONLINE",
    description:
      "Full-stack solutions engineered with React, Next.js, Node.js & MySQL. Pixel-precise, blazing-fast, production-hardened.",
    specs: ["React · Next.js · Node.js", "REST APIs · GraphQL", "MySQL · MongoDB", "PWA · SEO Optimized"],
    progress: 94,
    color: "#00f0ff",
    shadow: "rgba(0,240,255,0.35)",
    accent2: "#0066ff",
    size: "large", // spans 2 cols
    icon: "⬡",
    tag: "CORE MODULE",
  },
  {
    id: "DSN-02",
    title: "Photoshop & Design",
    category: "VISUAL SYSTEMS",
    status: "ONLINE",
    description:
      "Brand identities, photo manipulation & visual systems crafted in Adobe Photoshop. Clean. Bold. Iconic.",
    specs: ["Adobe Photoshop", "Logo · Brand Systems", "Photo Retouching", "Social Graphics"],
    progress: 96,
    color: "#bf00ff",
    shadow: "rgba(191,0,255,0.35)",
    accent2: "#7700cc",
    size: "small",
    icon: "◈",
    tag: "DESIGN ENGINE",
  },
  {
    id: "DBG-03",
    title: "Bug Fixing & Perf",
    category: "SYSTEM REPAIR",
    status: "ACTIVE",
    description:
      "Deep-code forensics, root-cause analysis, refactoring & performance profiling for bulletproof results.",
    specs: ["Root Cause Analysis", "Perf Profiling", "Code Refactoring", "Unit Tests"],
    progress: 98,
    color: "#00ff88",
    shadow: "rgba(0,255,136,0.35)",
    accent2: "#009944",
    size: "small",
    icon: "⟁",
    tag: "REPAIR UNIT",
  },
  {
    id: "EML-04",
    title: "Email Templates",
    category: "CAMPAIGN SYSTEMS",
    status: "ONLINE",
    description:
      "Responsive HTML email templates tested across Gmail, Outlook & Apple Mail. Dark-mode ready. High deliverability.",
    specs: ["HTML · Inline CSS", "Cross-client Tested", "Dark Mode Variants", "Campaign A/B Kits"],
    progress: 99,
    color: "#ffaa00",
    shadow: "rgba(255,170,0,0.35)",
    accent2: "#cc7700",
    size: "large",
    icon: "◉",
    tag: "BROADCAST CORE",
  },
];

/* ── SVG Circular Progress Ring ──────────────── */
function RingProgress({ value, color, size = 80 }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setProgress(value), 400);
    return () => clearTimeout(t);
  }, [value]);

  const offset = circ - (progress / 100) * circ;

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth="5"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)", filter: `drop-shadow(0 0 6px ${color})` }}
      />
    </svg>
  );
}

/* ── Corner Bracket SVG ───────────────────────── */
function Bracket({ color, pos }) {
  const isTop = pos.includes("top");
  const isLeft = pos.includes("left");
  const style = {
    position: "absolute",
    [isTop ? "top" : "bottom"]: "10px",
    [isLeft ? "left" : "right"]: "10px",
    width: "18px",
    height: "18px",
    borderTop: isTop ? `2px solid ${color}` : "none",
    borderBottom: !isTop ? `2px solid ${color}` : "none",
    borderLeft: isLeft ? `2px solid ${color}` : "none",
    borderRight: !isLeft ? `2px solid ${color}` : "none",
    opacity: 0.7,
  };
  return <div style={style} />;
}

/* ── Glitch Text ─────────────────────────────── */
function GlitchText({ text, color }) {
  return (
    <span
      className="glitch-text"
      data-text={text}
      style={{ color, "--glitch-color": color }}
    >
      {text}
    </span>
  );
}

/* ── Module Card ─────────────────────────────── */
function ModuleCard({ mod, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scanY, setScanY] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (cardRef.current) ob.observe(cardRef.current);
    return () => ob.disconnect();
  }, []);

  // Scanline animation
  useEffect(() => {
    if (!hovered) return;
    let y = 0;
    const loop = () => {
      y = (y + 1.5) % 100;
      setScanY(y);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hovered]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / (rect.height / 2)) * -10,
      y: ((e.clientX - cx) / (rect.width / 2)) * 10,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`module-card ${mod.size === "large" ? "col-span-2" : "col-span-1"}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.96)",
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s`,
      }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
        style={{
          position: "relative",
          borderRadius: "16px",
          padding: "28px",
          background: "linear-gradient(145deg, rgba(10,10,18,0.97), rgba(5,5,15,0.99))",
          border: `1px solid ${hovered ? mod.color : "rgba(255,255,255,0.07)"}`,
          boxShadow: hovered
            ? `0 0 0 1px ${mod.color}33, 0 20px 80px ${mod.shadow}, inset 0 0 30px ${mod.color}08`
            : "0 4px 40px rgba(0,0,0,0.6)",
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
          transition: "transform 0.2s ease, border 0.4s ease, box-shadow 0.4s ease",
          overflow: "hidden",
          cursor: "default",
          height: "100%",
        }}
      >
        {/* Corner brackets */}
        {["top-left", "top-right", "bottom-left", "bottom-right"].map((p) => (
          <Bracket key={p} color={mod.color} pos={p} />
        ))}

        {/* Scanline sweep */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              left: 0, right: 0,
              top: `${scanY}%`,
              height: "2px",
              background: `linear-gradient(90deg, transparent, ${mod.color}55, transparent)`,
              pointerEvents: "none",
              zIndex: 5,
            }}
          />
        )}

        {/* CRT noise overlay */}
        <div className="crt-noise" />

        {/* Floating hex grid bg */}
        <div
          className="hex-grid-bg"
          style={{ "--hex-color": `${mod.color}08` }}
        />

        {/* Top row: ID + status */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.05)",
                padding: "3px 8px",
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              MOD::{mod.id}
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "9px",
                letterSpacing: "0.15em",
                color: mod.color,
                opacity: 0.75,
              }}
            >
              {mod.tag}
            </span>
          </div>

          {/* Status pill */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: "6px", height: "6px",
                borderRadius: "50%",
                background: mod.color,
                boxShadow: `0 0 8px ${mod.color}`,
                animation: "statusPulse 1.8s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "9px",
                color: mod.color,
                letterSpacing: "0.2em",
              }}
            >
              {mod.status}
            </span>
          </div>
        </div>

        {/* Icon + Title row */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
          {/* Big icon */}
          <div
            style={{
              flexShrink: 0,
              width: "56px", height: "56px",
              borderRadius: "14px",
              background: `${mod.color}12`,
              border: `1px solid ${mod.color}33`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "24px",
              color: mod.color,
              boxShadow: hovered ? `0 0 20px ${mod.color}30` : "none",
              transition: "box-shadow 0.4s ease",
            }}
          >
            {mod.icon}
          </div>
          <div>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: "10px",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.2em",
                marginBottom: "4px",
              }}
            >
              {mod.category}
            </p>
            <h3
              style={{
                fontSize: mod.size === "large" ? "22px" : "18px",
                fontWeight: "900",
                color: "#fff",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {mod.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.55)",
            lineHeight: "1.7",
            marginBottom: "20px",
          }}
        >
          {mod.description}
        </p>

        {/* Bottom: specs + ring */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px" }}>
          {/* Specs list */}
          <div style={{ flex: 1 }}>
            {mod.specs.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "5px",
                }}
              >
                <span
                  style={{
                    width: "4px", height: "4px",
                    borderRadius: "50%",
                    background: mod.color,
                    flexShrink: 0,
                    boxShadow: `0 0 4px ${mod.color}`,
                  }}
                />
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>

          {/* Ring + label */}
          <div style={{ flexShrink: 0, textAlign: "center" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <RingProgress value={visible ? mod.progress : 0} color={mod.color} size={72} />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <span style={{ fontFamily: "monospace", fontSize: "14px", fontWeight: "900", color: mod.color }}>
                  {mod.progress}
                </span>
                <span style={{ fontFamily: "monospace", fontSize: "7px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
                  PERF
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom border glow */}
        <div
          style={{
            position: "absolute",
            bottom: 0, left: "20%", right: "20%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${mod.color}, transparent)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

/* ── Typing Status Line ───────────────────────── */
function BootLine({ text, delay, color = "rgba(255,255,255,0.4)" }) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, 28);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);

  return (
    <div
      style={{
        fontFamily: "monospace",
        fontSize: "12px",
        color,
        letterSpacing: "0.05em",
        lineHeight: "1.8",
        opacity: shown.length > 0 ? 1 : 0,
        transition: "opacity 0.2s",
      }}
    >
      <span style={{ color: "rgba(255,255,255,0.2)", marginRight: "8px" }}>›</span>
      {shown}
      {!done && <span className="cursor-blink">▋</span>}
    </div>
  );
}

/* ── Main Export ─────────────────────────────── */
export default function ServicePage() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      id="service"
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#020208",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        /* ── Animations ── */
        @keyframes statusPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.7); }
        }

        @keyframes cursor-blink {
          0%,100% { opacity:1; }
          50%      { opacity:0; }
        }

        @keyframes flicker {
          0%,100% { opacity:1; }
          92%      { opacity:1; }
          93%      { opacity:0.6; }
          94%      { opacity:1; }
          96%      { opacity:0.7; }
          97%      { opacity:1; }
        }

        @keyframes gridMove {
          from { background-position: 0 0; }
          to   { background-position: 40px 40px; }
        }

        @keyframes rotateRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @keyframes scanlineScroll {
          from { transform: translateY(-100%); }
          to   { transform: translateY(100vh); }
        }

        @keyframes glitchA {
          0%,100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          20% { clip-path: inset(20% 0 60% 0); transform: translate(-3px, 1px); }
          40% { clip-path: inset(50% 0 30% 0); transform: translate(3px, -1px); }
          60% { clip-path: inset(70% 0 10% 0); transform: translate(-2px, 2px); }
          80% { clip-path: inset(10% 0 80% 0); transform: translate(2px, -2px); }
        }

        @keyframes glitchB {
          0%,100% { clip-path: inset(100% 0 0 0); transform: translate(0); }
          20% { clip-path: inset(60% 0 20% 0); transform: translate(3px, -1px); }
          40% { clip-path: inset(30% 0 50% 0); transform: translate(-3px, 1px); }
          60% { clip-path: inset(10% 0 70% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(80% 0 10% 0); transform: translate(-2px, 2px); }
        }

        @keyframes neonPulse {
          0%,100% { text-shadow: 0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 40px #00f0ff; }
          50%      { text-shadow: 0 0 5px #00f0ff, 0 0 10px #00f0ff; }
        }

        @keyframes borderRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .cursor-blink { animation: cursor-blink 0.8s step-end infinite; }

        /* Glitch heading */
        .glitch-heading {
          position: relative;
          display: inline-block;
        }
        .glitch-heading::before,
        .glitch-heading::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          font-size: inherit;
          font-weight: inherit;
          color: #fff;
        }
        .glitch-heading::before {
          color: #00f0ff;
          animation: glitchA 6s steps(1) infinite;
        }
        .glitch-heading::after {
          color: #ff00aa;
          animation: glitchB 6s steps(1) infinite;
        }

        /* CRT noise */
        .crt-noise {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          pointer-events: none;
          z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 150px 150px;
        }

        /* Hex grid bg */
        .hex-grid-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.6;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        /* Module card grid */
        .module-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 768px) {
          .module-grid {
            grid-template-columns: 1fr;
          }
          .module-card.col-span-2 {
            grid-column: span 1 !important;
          }
        }

        .module-card { grid-column: span 1; }
        .module-card.col-span-2 { grid-column: span 2; }

        /* Rotating border conic */
        .rotating-border {
          position: absolute;
          inset: -1px;
          border-radius: 18px;
          background: conic-gradient(from var(--angle, 0deg), transparent 70%, #00f0ff 80%, transparent 90%);
          animation: borderRotate 4s linear infinite;
          opacity: 0;
          transition: opacity 0.4s;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>

      {/* ── Global scanline ── */}
      <div
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          height: "3px",
          background: "linear-gradient(90deg, transparent 0%, rgba(0,240,255,0.15) 50%, transparent 100%)",
          animation: "scanlineScroll 8s linear infinite",
          pointerEvents: "none",
          zIndex: 1000,
        }}
      />

      {/* ── Animated grid ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,240,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          animation: "gridMove 12s linear infinite",
          pointerEvents: "none",
        }}
      />

      {/* ── Ambient orbs ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)",
          top: "-100px", left: "-100px",
          animation: "flicker 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(191,0,255,0.06) 0%, transparent 70%)",
          bottom: "-80px", right: "-80px",
          animation: "flicker 10s ease-in-out 3s infinite",
        }} />
      </div>

      {/* ── Main content ── */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: "1100px", margin: "0 auto", padding: "80px 20px 100px" }}>

        {/* ── System header ── */}
        <div style={{ marginBottom: "64px" }}>

          {/* Top bar */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
            padding: "10px 16px",
            background: "rgba(0,240,255,0.04)",
            border: "1px solid rgba(0,240,255,0.12)",
            borderRadius: "8px",
            fontFamily: "monospace",
          }}>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <span style={{ color: "#00ff88", fontSize: "10px", letterSpacing: "0.2em" }}>● SYSTEM ONLINE</span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "10px" }}>|</span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "0.1em" }}>NEURAL-SVC-v4.2.1</span>
            </div>
            <span style={{ color: "rgba(0,240,255,0.6)", fontSize: "11px", letterSpacing: "0.1em" }}>
              {time}
            </span>
          </div>

          {/* Boot lines */}
          <div style={{ marginBottom: "24px", paddingLeft: "4px" }}>
            <BootLine text="Initializing service modules..." delay={0} color="rgba(0,240,255,0.5)" />
            <BootLine text="Loading neural interface layer... [OK]" delay={600} color="rgba(0,255,136,0.5)" />
            <BootLine text="All 4 service modules operational." delay={1400} color="rgba(255,255,255,0.35)" />
          </div>

          {/* Main heading */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "6px",
                background: "rgba(0,240,255,0.06)",
                border: "1px solid rgba(0,240,255,0.15)",
                fontFamily: "monospace",
                fontSize: "10px",
                letterSpacing: "0.25em",
                color: "rgba(0,240,255,0.7)",
                marginBottom: "20px",
              }}
            >
              <span style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: "#00f0ff", boxShadow: "0 0 8px #00f0ff",
                display: "inline-block",
                animation: "statusPulse 1.5s infinite"
              }} />
              CAPABILITY MATRIX — ACTIVE
            </div>

            <h2
              className="glitch-heading"
              data-text="Services"
              style={{
                fontSize: "clamp(52px, 8vw, 88px)",
                fontWeight: "900",
                color: "#fff",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                marginBottom: "16px",
                animation: "flicker 12s ease-in-out infinite",
              }}
            >
              Services
            </h2>

            <p style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "14px",
              fontFamily: "monospace",
              letterSpacing: "0.08em",
            }}>
              {'// SELECT A MODULE TO ENGAGE'}
            </p>
          </div>
        </div>

        {/* ── Module grid ── */}
        <div className="module-grid">
          {MODULES.map((mod, i) => (
            <ModuleCard key={mod.id} mod={mod} index={i} />
          ))}
        </div>

        {/* ── Footer bar ── */}
        <div
          style={{
            marginTop: "48px",
            padding: "16px 20px",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.02)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {[
            { label: "MODULES ACTIVE", value: "04", color: "#00f0ff" },
            { label: "AVG PERFORMANCE", value: "97%", color: "#00ff88" },
            { label: "UPTIME", value: "99.9%", color: "#bf00ff" },
            { label: "PROJECTS DEPLOYED", value: "50+", color: "#ffaa00" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center", flex: "1 1 80px" }}>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: "22px",
                  fontWeight: "900",
                  color: s.color,
                  textShadow: `0 0 12px ${s.color}`,
                }}
              >
                {s.value}
              </div>
              <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", marginTop: "2px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
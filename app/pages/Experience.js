"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────
   Experience Data
───────────────────────────────────────── */
const EXPERIENCES = [
  {
    id: "EXP-001",
    title: "Student Research Assistant",
    org: "Independent University, Bangladesh",
    type: "RESEARCH",
    period: { from: "Jan 2023", to: "Present", years: "2+ yrs" },
    description:
      "Collaborated with professors on research projects in computer vision & machine learning. Led data collection pipelines, statistical analysis, and model implementation for published studies.",
    skills: ["Python", "OpenCV", "TensorFlow", "Data Analysis", "Research Writing"],
    color: "#818cf8",
    glow: "rgba(129,140,248,0.4)",
    dark: "#4f46e5",
    symbol: "⬡",
    highlight: "ACADEMIC",
    metric: { value: "3", label: "PAPERS ASSISTED" },
  },
  {
    id: "EXP-002",
    title: "Freelance Web Designer & Developer",
    org: "Various Clients — Global",
    type: "FREELANCE",
    period: { from: "May 2022", to: "Present", years: "3+ yrs" },
    description:
      "Designed and shipped 50+ production websites for international clients across e-commerce, SaaS, and portfolio domains. Full ownership from wireframe to deployment.",
    skills: ["React", "Next.js", "Node.js", "MySQL", "Tailwind", "Figma"],
    color: "#34d399",
    glow: "rgba(52,211,153,0.4)",
    dark: "#059669",
    symbol: "◈",
    highlight: "FREELANCE",
    metric: { value: "50+", label: "PROJECTS SHIPPED" },
  },
  {
    id: "EXP-003",
    title: "Private Tutor",
    org: "Self-Employed",
    type: "EDUCATION",
    period: { from: "Sep 2020", to: "Present", years: "4+ yrs" },
    description:
      "Delivered one-on-one tutoring in Mathematics, Physics, and ICT to high-school students. Designed custom study plans that improved student grades by an average of 35%.",
    skills: ["Mathematics", "Physics", "ICT", "Curriculum Design", "Mentorship"],
    color: "#f472b6",
    glow: "rgba(244,114,182,0.4)",
    dark: "#db2777",
    symbol: "◉",
    highlight: "MENTORSHIP",
    metric: { value: "35%", label: "AVG GRADE BOOST" },
  },
  {
    id: "EXP-004",
    title: "Photo Editing & Logo Design",
    org: "Freelance Projects",
    type: "DESIGN",
    period: { from: "Jan 2020", to: "Dec 2021", years: "2 yrs" },
    description:
      "Provided high-end photo retouching and brand identity design for clients across retail, fashion, and hospitality. Delivered 100+ logo concepts and full brand kits.",
    skills: ["Photoshop", "Illustrator", "Branding", "Typography", "Color Theory"],
    color: "#fb923c",
    glow: "rgba(251,146,60,0.4)",
    dark: "#ea580c",
    symbol: "⟁",
    highlight: "CREATIVE",
    metric: { value: "100+", label: "DESIGNS DELIVERED" },
  },
];

/* ─────────────────────────────────────────
   Skill Chip
───────────────────────────────────────── */
function SkillChip({ label, color, delay }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        borderRadius: "20px",
        fontSize: "10px",
        fontWeight: "700",
        letterSpacing: "0.08em",
        fontFamily: "monospace",
        background: `${color}15`,
        border: `1px solid ${color}40`,
        color: color,
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0) scale(1)" : "translateY(6px) scale(0.9)",
        transition: `opacity 0.4s ease, transform 0.4s ease`,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────
   Single Experience Card
───────────────────────────────────────── */
function ExperienceCard({ exp, index, isLast, isActive, cardParallax, innerRef }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isLeft = index % 2 === 0;

  // Merge outer ref + inner ref
  const setRef = useCallback((el) => {
    ref.current = el;
    if (typeof innerRef === "function") innerRef(el);
  }, [innerRef]);

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <div
      ref={setRef}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 56px 1fr",
        alignItems: "start",
        marginBottom: isLast ? 0 : "48px",
        gap: 0,
        // Subtle horizontal parallax per side based on scroll
        transform: `translateX(${isLeft ? cardParallax * -0.4 : cardParallax * 0.4}px)`,
        transition: "transform 0.1s linear",
      }}
    >
      {/* LEFT content or spacer */}
      <div style={{ padding: "0 24px 0 0", display: "flex", justifyContent: "flex-end" }}>
        {isLeft ? (
          <CardBody
            exp={exp}
            index={index}
            visible={visible}
            expanded={expanded}
            hovered={hovered}
            isActive={isActive}
            setExpanded={setExpanded}
            setHovered={setHovered}
            isLeft={true}
          />
        ) : (
          <div style={{ width: "100%" }} />
        )}
      </div>

      {/* CENTER spine node */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
        {/* Line above */}
        {index !== 0 && (
          <div style={{ width: "2px", height: "40px", background: `linear-gradient(to bottom, transparent, ${exp.color}60)` }} />
        )}

        {/* Node — active state adds pulsing rings */}
        <div style={{ position: "relative", flexShrink: 0, zIndex: 2 }}>
          {/* Pulse rings when active */}
          {isActive && (
            <>
              <div style={{
                position: "absolute", inset: "-10px",
                borderRadius: "50%",
                border: `1px solid ${exp.color}`,
                animation: "nodeRing1 1.6s ease-out infinite",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", inset: "-10px",
                borderRadius: "50%",
                border: `1px solid ${exp.color}`,
                animation: "nodeRing1 1.6s ease-out 0.5s infinite",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", inset: "-10px",
                borderRadius: "50%",
                border: `1px solid ${exp.color}`,
                animation: "nodeRing1 1.6s ease-out 1s infinite",
                pointerEvents: "none",
              }} />
            </>
          )}
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: isActive
                ? `radial-gradient(circle at 35% 35%, ${exp.color}55, #0a0a12)`
                : `radial-gradient(circle at 35% 35%, ${exp.color}33, #0a0a12)`,
              border: `2px solid ${exp.color}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              color: exp.color,
              boxShadow: isActive
                ? `0 0 0 4px ${exp.color}25, 0 0 40px ${exp.glow}, 0 0 60px ${exp.color}20`
                : visible ? `0 0 0 6px ${exp.color}15, 0 0 24px ${exp.glow}` : "none",
              transition: "box-shadow 0.4s ease, background 0.4s ease, transform 0.3s ease",
              cursor: "pointer",
              transform: isActive ? "scale(1.2)" : hovered ? "scale(1.15)" : "scale(1)",
            }}
            onClick={() => setExpanded(!expanded)}
          >
            {exp.symbol}
          </div>
        </div>

        {/* Line below */}
        {!isLast && (
          <div style={{ flex: 1, width: "2px", minHeight: "60px", background: `linear-gradient(to bottom, ${exp.color}60, transparent)` }} />
        )}
      </div>

      {/* RIGHT content or spacer */}
      <div style={{ padding: "0 0 0 24px", display: "flex", justifyContent: "flex-start" }}>
        {!isLeft ? (
          <CardBody
            exp={exp}
            index={index}
            visible={visible}
            expanded={expanded}
            hovered={hovered}
            isActive={isActive}
            setExpanded={setExpanded}
            setHovered={setHovered}
            isLeft={false}
          />
        ) : (
          <div style={{ width: "100%" }} />
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Card Body
───────────────────────────────────────── */
function CardBody({ exp, index, visible, expanded, hovered, isActive, setExpanded, setHovered, isLeft }) {
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setExpanded(!expanded)}
      style={{
        width: "100%",
        maxWidth: "420px",
        background: hovered || isActive
          ? "linear-gradient(145deg, rgba(15,15,28,0.98), rgba(8,8,20,0.99))"
          : "linear-gradient(145deg, rgba(10,10,20,0.95), rgba(5,5,14,0.97))",
        border: `1px solid ${hovered || expanded || isActive ? exp.color : "rgba(255,255,255,0.07)"}`,
        borderRadius: "16px",
        padding: "22px",
        cursor: "pointer",
        boxShadow: isActive
          ? `0 24px 80px ${exp.glow}, 0 0 0 1px ${exp.color}40, inset 0 0 30px ${exp.color}06`
          : hovered
          ? `0 20px 60px ${exp.glow}, 0 0 0 1px ${exp.color}30`
          : "0 4px 30px rgba(0,0,0,0.5)",
        transform: visible
          ? `translateX(0) translateY(0) scale(${isActive ? 1.01 : 1})`
          : `translateX(${isLeft ? "-40px" : "40px"}) translateY(20px)`,
        opacity: visible ? 1 : 0,
        transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.5s ease, border 0.3s ease, box-shadow 0.4s ease`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Shimmer sweep on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(105deg, transparent 40%, ${exp.color}08 50%, transparent 60%)`,
          backgroundSize: "200% 100%",
          backgroundPosition: hovered ? "100% 0" : "-100% 0",
          transition: "background-position 0.8s ease",
          pointerEvents: "none",
          borderRadius: "16px",
        }}
      />

      {/* Corner accent */}
      <div
        style={{
          position: "absolute",
          top: 0, right: 0,
          width: "60px", height: "60px",
          background: `radial-gradient(circle at top right, ${exp.color}18, transparent 70%)`,
          borderRadius: "0 16px 0 0",
        }}
      />

      {/* Top row: ID + type badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <span style={{
          fontFamily: "monospace", fontSize: "9px",
          letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)",
          background: "rgba(255,255,255,0.04)",
          padding: "3px 8px", borderRadius: "4px",
          border: "1px solid rgba(255,255,255,0.07)",
        }}>
          {exp.id}
        </span>
        <span style={{
          fontFamily: "monospace", fontSize: "9px",
          letterSpacing: "0.18em",
          color: exp.color,
          background: `${exp.color}12`,
          border: `1px solid ${exp.color}35`,
          padding: "3px 8px", borderRadius: "4px",
        }}>
          {exp.highlight}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: "16px", fontWeight: "800", color: "#fff",
        lineHeight: "1.25", marginBottom: "4px",
        letterSpacing: "-0.01em",
      }}>
        {exp.title}
      </h3>

      {/* Org */}
      <p style={{
        fontSize: "11px", color: exp.color,
        fontWeight: "600", fontFamily: "monospace",
        letterSpacing: "0.05em", marginBottom: "14px",
      }}>
        {exp.org}
      </p>

      {/* Period + metric row */}
      <div style={{
        display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap",
      }}>
        <div style={{
          flex: "1", minWidth: "120px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "10px",
          padding: "8px 12px",
        }}>
          <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", marginBottom: "3px" }}>
            DURATION
          </div>
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#fff" }}>
            {exp.period.from} — {exp.period.to}
          </div>
          <div style={{ fontFamily: "monospace", fontSize: "9px", color: exp.color, marginTop: "2px" }}>
            {exp.period.years}
          </div>
        </div>

        <div style={{
          background: `${exp.color}10`,
          border: `1px solid ${exp.color}25`,
          borderRadius: "10px",
          padding: "8px 14px",
          textAlign: "center",
          flexShrink: 0,
        }}>
          <div style={{ fontSize: "20px", fontWeight: "900", color: exp.color, lineHeight: 1 }}>
            {exp.metric.value}
          </div>
          <div style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", marginTop: "3px" }}>
            {exp.metric.label}
          </div>
        </div>
      </div>

      {/* Expandable section */}
      <div style={{
        maxHeight: expanded ? "300px" : "0",
        overflow: "hidden",
        transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div
          style={{
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${exp.color}40, transparent)`,
            marginBottom: "14px",
          }}
        />
        <p style={{
          fontSize: "12px", color: "rgba(255,255,255,0.6)",
          lineHeight: "1.75", marginBottom: "14px",
        }}>
          {exp.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {exp.skills.map((s, i) => (
            <SkillChip key={s} label={s} color={exp.color} delay={i * 60} />
          ))}
        </div>
      </div>

      {/* Expand toggle hint */}
      <div style={{
        display: "flex", alignItems: "center", gap: "6px",
        marginTop: expanded ? "14px" : "0",
        paddingTop: expanded ? "10px" : "0",
        borderTop: expanded ? `1px solid rgba(255,255,255,0.06)` : "none",
      }}>
        <div style={{
          width: "16px", height: "16px",
          borderRadius: "50%",
          background: `${exp.color}20`,
          border: `1px solid ${exp.color}50`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.4s ease",
          flexShrink: 0,
        }}>
          <svg width="8" height="8" viewBox="0 0 8 8" fill={exp.color}>
            <path d="M4 5.5L0.5 2h7L4 5.5z" />
          </svg>
        </div>
        <span style={{
          fontFamily: "monospace", fontSize: "9px",
          color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em",
        }}>
          {expanded ? "COLLAPSE" : "EXPAND DETAILS"}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Career Arc Header Bar
───────────────────────────────────────── */
function CareerArc() {
  const ref = useRef(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setW(78); },
      { threshold: 0.3 }
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  const stops = [
    { year: "2020", label: "STARTED", color: "#fb923c" },
    { year: "2022", label: "FREELANCE", color: "#34d399" },
    { year: "2023", label: "RESEARCH", color: "#818cf8" },
    { year: "2025", label: "NOW", color: "#f472b6" },
  ];

  return (
    <div ref={ref} style={{ marginBottom: "64px" }}>
      <div style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px",
        padding: "20px 24px",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "14px",
          flexWrap: "wrap",
          gap: "8px",
        }}>
          <span style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}>
            CAREER TIMELINE — 5 YEARS ACTIVE
          </span>
          <span style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.15em", color: "#34d399" }}>
            ● ACTIVELY GROWING
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ position: "relative", height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", marginBottom: "16px" }}>
          <div style={{
            height: "100%",
            width: `${w}%`,
            borderRadius: "4px",
            background: "linear-gradient(90deg, #fb923c, #818cf8, #34d399, #f472b6)",
            boxShadow: "0 0 12px rgba(129,140,248,0.5)",
            transition: "width 1.8s cubic-bezier(0.16,1,0.3,1)",
          }} />

          {/* Year markers */}
          {stops.map((s, i) => (
            <div key={s.year} style={{
              position: "absolute",
              top: "-3px",
              left: `${[0, 32, 55, 96][i]}%`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
              <div style={{
                width: "10px", height: "10px",
                borderRadius: "50%",
                background: s.color,
                border: "2px solid #0a0a14",
                boxShadow: `0 0 8px ${s.color}`,
              }} />
            </div>
          ))}
        </div>

        {/* Year labels */}
        <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "4%" }}>
          {stops.map((s) => (
            <div key={s.year} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: "700", color: s.color }}>{s.year}</div>
              <div style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Mobile Card (stacked for small screens)
───────────────────────────────────────── */
function MobileCard({ exp, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: "16px",
        marginBottom: "32px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-30px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      {/* Left: line + node */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        {index !== 0 && (
          <div style={{ width: "2px", height: "20px", background: `linear-gradient(to bottom, transparent, ${exp.color}50)` }} />
        )}
        <div
          onClick={() => setExpanded(!expanded)}
          style={{
            width: "40px", height: "40px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${exp.color}22, #0a0a12)`,
            border: `2px solid ${exp.color}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px", color: exp.color,
            boxShadow: `0 0 16px ${exp.glow}`,
            flexShrink: 0,
            cursor: "pointer",
          }}
        >
          {exp.symbol}
        </div>
        <div style={{ flex: 1, width: "2px", background: `linear-gradient(to bottom, ${exp.color}50, transparent)`, minHeight: "40px" }} />
      </div>

      {/* Card */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setExpanded(!expanded)}
        style={{
          flex: 1,
          background: "rgba(10,10,20,0.97)",
          border: `1px solid ${expanded || hovered ? exp.color : "rgba(255,255,255,0.07)"}`,
          borderRadius: "14px",
          padding: "16px",
          cursor: "pointer",
          boxShadow: hovered ? `0 12px 40px ${exp.glow}` : "0 4px 20px rgba(0,0,0,0.4)",
          transition: "border 0.3s, box-shadow 0.3s",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em" }}>{exp.id}</span>
          <span style={{ fontFamily: "monospace", fontSize: "8px", color: exp.color, letterSpacing: "0.15em" }}>{exp.highlight}</span>
        </div>
        <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#fff", marginBottom: "3px" }}>{exp.title}</h3>
        <p style={{ fontSize: "11px", color: exp.color, fontFamily: "monospace", marginBottom: "10px" }}>{exp.org}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>
            {exp.period.from} — {exp.period.to}
          </span>
          <span style={{ fontSize: "16px", fontWeight: "900", color: exp.color }}>{exp.metric.value}</span>
        </div>

        <div style={{ maxHeight: expanded ? "260px" : "0", overflow: "hidden", transition: "max-height 0.5s ease" }}>
          <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${exp.color}40, transparent)`, margin: "12px 0" }} />
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", lineHeight: "1.7", marginBottom: "12px" }}>{exp.description}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {exp.skills.map((s, i) => <SkillChip key={s} label={s} color={exp.color} delay={i * 50} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Export
───────────────────────────────────────── */
/* ─────────────────────────────────────────
   Scroll-driven floating particle
───────────────────────────────────────── */
function ScrollParticle({ x, y, color, size, delay }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 6px ${color}`,
        pointerEvents: "none",
        animation: `particleRise 1.4s ease-out ${delay}s forwards`,
        opacity: 0,
      }}
    />
  );
}

export default function ExperiencePage() {
  const [isMobile, setIsMobile]   = useState(false);
  const [scrollPct, setScrollPct] = useState(0);   // 0-1 through section
  const [activeIdx, setActiveIdx] = useState(0);   // which card is in focus
  const [orbParallax, setOrbParallax] = useState(0); // px offset for orbs
  const [cardDrift, setCardDrift]     = useState(0); // subtle card parallax
  const [particles, setParticles]     = useState([]); // floating particles
  const [sectionVisible, setSectionVisible] = useState(false);

  const sectionRef  = useRef(null);
  const cardRefs    = useRef([]);           // refs to each ExperienceCard DOM node
  const particleId  = useRef(0);
  const prevActive  = useRef(-1);

  // Mobile check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Section visibility (for progress bar)
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => setSectionVisible(e.isIntersecting),
      { threshold: 0.05 }
    );
    if (sectionRef.current) ob.observe(sectionRef.current);
    return () => ob.disconnect();
  }, []);

  // ── Master scroll handler ──
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect    = el.getBoundingClientRect();
      const secH    = el.offsetHeight;
      const vh      = window.innerHeight;

      // Section scroll progress 0→1
      const rawPct = Math.max(0, Math.min(1, -rect.top / Math.max(secH - vh, 1)));
      setScrollPct(rawPct);

      // Parallax offsets
      const scrolled = -rect.top;
      setOrbParallax(scrolled * 0.18);
      setCardDrift(Math.sin(scrolled * 0.003) * 6); // gentle wave

      // Active card: whose vertical center is closest to 42% viewport
      const target = vh * 0.42;
      let best = 0, bestDist = Infinity;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const r   = el.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const d   = Math.abs(mid - target);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActiveIdx(best);

      // Emit particles when active node changes
      if (best !== prevActive.current) {
        prevActive.current = best;
        const exp = EXPERIENCES[best];
        const newParticles = Array.from({ length: 8 }, (_, i) => ({
          id: particleId.current++,
          x: `calc(50% + ${(Math.random() - 0.5) * 40}px)`,
          y: `calc(${42}% - ${Math.random() * 30}px)`,
          color: exp.color,
          size: `${3 + Math.random() * 4}px`,
          delay: i * 0.07,
        }));
        setParticles(prev => [...prev.slice(-20), ...newParticles]);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active experience color for progress bar
  const activeColor = EXPERIENCES[activeIdx]?.color ?? "#818cf8";

  return (
    <div
      id="experience"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #060610 0%, #08081a 50%, #050510 100%)",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        @keyframes bgDrift {
          from { background-position: 0 0; }
          to   { background-position: 50px 50px; }
        }
        @keyframes headerGlow {
          0%,100% { text-shadow: 0 0 30px rgba(129,140,248,0.3); }
          50%      { text-shadow: 0 0 60px rgba(129,140,248,0.6), 0 0 100px rgba(129,140,248,0.2); }
        }
        @keyframes orbPulse {
          0%,100% { opacity: 0.08; transform: scale(1); }
          50%      { opacity: 0.14; transform: scale(1.05); }
        }
        /* Node pulse rings */
        @keyframes nodeRing1 {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(2.6); opacity: 0;   }
        }
        /* Floating particles rise upward */
        @keyframes particleRise {
          0%   { opacity: 0;   transform: translateY(0)   scale(0.5); }
          20%  { opacity: 0.9; transform: translateY(-10px) scale(1);   }
          100% { opacity: 0;   transform: translateY(-80px) scale(0.3); }
        }
        /* Scroll progress bar shimmer */
        @keyframes barShimmer {
          0%   { background-position: -100% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>

      {/* ── SCROLL PROGRESS BAR (left edge, fixed) ── */}
      {sectionVisible && (
        <div style={{
          position: "fixed",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "3px",
          height: "160px",
          borderRadius: "3px",
          background: "rgba(255,255,255,0.06)",
          zIndex: 9999,
          overflow: "hidden",
        }}>
          {/* Track fill */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: `${scrollPct * 100}%`,
            background: `linear-gradient(to top, ${activeColor}, ${activeColor}88)`,
            boxShadow: `0 0 10px ${activeColor}`,
            borderRadius: "3px",
            transition: "height 0.15s linear, background 0.5s ease, box-shadow 0.5s ease",
          }} />
          {/* Shimmer sweep */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, transparent, ${activeColor}60, transparent)`,
            backgroundSize: "100% 40%",
            animation: "barShimmer 2s linear infinite",
            opacity: 0.5,
          }} />
        </div>
      )}

      {/* Step dots on progress bar */}
      {sectionVisible && (
        <div style={{
          position: "fixed",
          left: "8px",
          top: "50%",
          transform: "translateY(-50%)",
          height: "160px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10000,
          pointerEvents: "none",
        }}>
          {EXPERIENCES.map((exp, i) => (
            <div key={exp.id} style={{
              width: i === activeIdx ? "9px" : "6px",
              height: i === activeIdx ? "9px" : "6px",
              borderRadius: "50%",
              background: i === activeIdx ? exp.color : "rgba(255,255,255,0.2)",
              boxShadow: i === activeIdx ? `0 0 8px ${exp.color}` : "none",
              transition: "all 0.4s ease",
              border: i <= activeIdx ? `1px solid ${exp.color}` : "1px solid rgba(255,255,255,0.15)",
            }} />
          ))}
        </div>
      )}

      {/* ── Floating scroll particles ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9998 }}>
        {particles.map(p => (
          <ScrollParticle key={p.id} {...p} />
        ))}
      </div>

      {/* ── Drifting grid (parallax: slow) ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(129,140,248,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.03) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
        animation: "bgDrift 15s linear infinite",
        transform: `translateY(${orbParallax * 0.3}px)`,
        transition: "transform 0.1s linear",
      }} />

      {/* ── Ambient orbs (parallax: medium) ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", width: "600px", height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${EXPERIENCES[activeIdx]?.color ?? "#818cf8"}18 0%, transparent 70%)`,
          top: "-150px", left: "-150px",
          transform: `translateY(${orbParallax * -0.15}px)`,
          transition: "background 0.6s ease, transform 0.1s linear",
          animation: "orbPulse 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: "400px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(52,211,153,0.09) 0%, transparent 70%)",
          bottom: "-100px", right: "-80px",
          transform: `translateY(${orbParallax * 0.1}px)`,
          transition: "transform 0.1s linear",
          animation: "orbPulse 10s ease-in-out 3s infinite",
        }} />

        {/* Ghost text (parallax: fast) */}
        <div style={{
          position: "absolute", right: "-40px", top: "40%",
          fontSize: "200px", fontWeight: "900",
          color: "rgba(255,255,255,0.015)",
          fontFamily: "monospace",
          lineHeight: 1,
          userSelect: "none",
          transform: `rotate(-90deg) translateY(-50%) translateX(${orbParallax * 0.25}px)`,
          transformOrigin: "right center",
          letterSpacing: "-0.05em",
          transition: "transform 0.1s linear",
        }}>
          EXP
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: "1000px", margin: "0 auto", padding: "80px 20px 100px" }}>

        {/* ── Section Header ── */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "6px", marginBottom: "20px",
            background: "rgba(129,140,248,0.08)",
            border: "1px solid rgba(129,140,248,0.2)",
            fontFamily: "monospace", fontSize: "10px",
            letterSpacing: "0.25em", color: "rgba(129,140,248,0.8)",
          }}>
            <span style={{
              width: "5px", height: "5px", borderRadius: "50%",
              background: "#818cf8", boxShadow: "0 0 8px #818cf8",
              display: "inline-block",
            }} />
            PROFESSIONAL JOURNEY
          </div>

          {/* Heading */}
          <h2 style={{
            fontSize: "clamp(48px, 7vw, 80px)",
            fontWeight: "900",
            color: "#fff",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginBottom: "16px",
            animation: "headerGlow 4s ease-in-out infinite",
          }}>
            Experience
          </h2>

          <p style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: "13px",
            fontFamily: "monospace",
            letterSpacing: "0.1em",
          }}>
            {'// TAP A NODE OR CARD TO EXPAND'}
          </p>

          {/* Decorative line */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "20px" }}>
            {EXPERIENCES.map((e) => (
              <div key={e.id} style={{
                width: "28px", height: "3px",
                borderRadius: "3px",
                background: e.color,
                boxShadow: `0 0 8px ${e.color}`,
              }} />
            ))}
          </div>
        </div>

        {/* ── Career Arc ── */}
        <CareerArc />

        {/* ── Timeline ── */}
        {isMobile ? (
          <div style={{ paddingLeft: "4px" }}>
            {EXPERIENCES.map((exp, i) => (
              <MobileCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        ) : (
          <div>
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                index={i}
                isLast={i === EXPERIENCES.length - 1}
                isActive={activeIdx === i}
                cardParallax={cardDrift}
                innerRef={(el) => { cardRefs.current[i] = el; }}
              />
            ))}
          </div>
        )}

        {/* ── Bottom summary ── */}
        <div style={{
          marginTop: "64px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "12px",
        }}>
          {[
            { label: "YEARS ACTIVE", value: "5+", color: "#818cf8" },
            { label: "ROLES HELD", value: "4", color: "#34d399" },
            { label: "PROJECTS", value: "50+", color: "#fb923c" },
            { label: "STUDENTS TAUGHT", value: "30+", color: "#f472b6" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center",
            }}>
              <div style={{
                fontSize: "28px", fontWeight: "900",
                color: s.color,
                textShadow: `0 0 16px ${s.color}60`,
                fontFamily: "monospace",
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: "monospace", fontSize: "8px",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.18em",
                marginTop: "4px",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FaMicrophone,
  FaHandsHelping,
  FaFutbol,
  FaGamepad,
  FaTrophy,
  FaStar,
  FaMedal,
  FaBolt,
} from "react-icons/fa";
import {
  MdSportsCricket,
  MdGroups,
  MdRecordVoiceOver,
  MdVolunteerActivism,
} from "react-icons/md";
import { GiCrossedSwords, GiLaurelCrown, GiPodium } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi";

const activities = [
  {
    id: 1,
    title: "Debating Society",
    subtitle: "National Level Competitor",
    description:
      "Participated in inter-school & inter-college debates, honing critical thinking and persuasive communication. Won multiple awards for excellence in public speaking and logical argumentation.",
    icon: <FaMicrophone className="text-3xl" />,
    secondaryIcon: <MdRecordVoiceOver className="text-xl" />,
    gradient: "from-violet-600 via-purple-600 to-indigo-700",
    glow: "shadow-violet-500/40",
    accentColor: "#8b5cf6",
    glowColor: "rgba(139,92,246,0.35)",
    achievements: ["1st Place – Regional Debate", "Best Speaker Award", "3× District Champion"],
    stats: [
      { label: "Events", value: "12+" },
      { label: "Awards", value: "7" },
      { label: "Years", value: "3" },
    ],
    badgeIcon: <GiLaurelCrown />,
    badgeText: "Champion",
    particleColor: "#a78bfa",
  },
  {
    id: 2,
    title: "Community Service",
    subtitle: "Social Impact Volunteer",
    description:
      "Actively involved in local charity drives, disaster relief camps, and NGO outreach programs. Led a team of 20+ volunteers in organizing community health awareness events.",
    icon: <FaHandsHelping className="text-3xl" />,
    secondaryIcon: <MdVolunteerActivism className="text-xl" />,
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    glow: "shadow-emerald-500/40",
    accentColor: "#10b981",
    glowColor: "rgba(16,185,129,0.35)",
    achievements: ["Led 20+ Volunteers", "500+ Hours of Service", "Community Hero Award"],
    stats: [
      { label: "Hours", value: "500+" },
      { label: "Events", value: "18" },
      { label: "Lives", value: "200+" },
    ],
    badgeIcon: <FaMedal />,
    badgeText: "Hero",
    particleColor: "#34d399",
  },
  {
    id: 3,
    title: "Cricket & Sports",
    subtitle: "Regional Tournament Player",
    description:
      "Represented school and college teams in regional cricket tournaments. Also engaged in athletics, developing teamwork, discipline, and competitive spirit at every level.",
    icon: <MdSportsCricket className="text-3xl" />,
    secondaryIcon: <FaFutbol className="text-xl" />,
    gradient: "from-amber-500 via-orange-500 to-red-500",
    glow: "shadow-orange-500/40",
    accentColor: "#f59e0b",
    glowColor: "rgba(245,158,11,0.35)",
    achievements: ["Regional Tournament Winner", "Best All-Rounder 2023", "Captain – College XI"],
    stats: [
      { label: "Matches", value: "40+" },
      { label: "Wins", value: "28" },
      { label: "Titles", value: "4" },
    ],
    badgeIcon: <FaTrophy />,
    badgeText: "Captain",
    particleColor: "#fbbf24",
  },
  {
    id: 4,
    title: "Competitive Gaming",
    subtitle: "eSports Tournament Finalist",
    description:
      "Competed in national-level eSports tournaments across multiple titles. Ranked in top percentile globally, combining strategic thinking, reflexes, and team coordination.",
    icon: <FaGamepad className="text-3xl" />,
    secondaryIcon: <GiCrossedSwords className="text-xl" />,
    gradient: "from-pink-600 via-rose-500 to-fuchsia-600",
    glow: "shadow-pink-500/40",
    accentColor: "#ec4899",
    glowColor: "rgba(236,72,153,0.35)",
    achievements: ["Top 1% Global Ranking", "National Finalist 2023", "Team MVP 3× Seasons"],
    stats: [
      { label: "Tournaments", value: "20+" },
      { label: "Rank", value: "Top 1%" },
      { label: "Seasons", value: "5" },
    ],
    badgeIcon: <GiPodium />,
    badgeText: "Pro",
    particleColor: "#f472b6",
  },
];

// Floating particle component
function FloatingParticle({ color, delay, duration, x, y, size }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        left: `${x}%`,
        top: `${y}%`,
        opacity: 0,
        animation: `floatParticle ${duration}s ease-in-out ${delay}s infinite`,
        filter: "blur(1px)",
      }}
    />
  );
}

// Single Activity Card
function ActivityCard({ activity, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-700 ease-out`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : `translateY(60px) scale(0.95)`,
        transitionDelay: `${index * 120}ms`,
      }}
    >
      <div
        className={`relative rounded-2xl overflow-hidden cursor-pointer group`}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
          transition: "transform 0.25s ease, box-shadow 0.3s ease",
          boxShadow: hovered
            ? `0 30px 80px ${activity.glowColor}, 0 0 0 1px ${activity.accentColor}30`
            : `0 8px 32px ${activity.glowColor}`,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${activity.gradient} opacity-90`} />

        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

        {/* Animated mesh glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${activity.accentColor}25 0%, transparent 60%)`,
          }}
        />

        {/* Corner glow orb */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
          style={{ background: activity.accentColor }}
        />

        {/* Badge */}
        <div
          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-md"
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff",
          }}
        >
          <span className="text-sm">{activity.badgeIcon}</span>
          {activity.badgeText}
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8">
          {/* Header row */}
          <div className="flex items-start gap-5 mb-6">
            {/* Icon bubble */}
            <div
              className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl text-white"
              style={{
                background: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.35)",
                boxShadow: `0 8px 32px ${activity.glowColor}`,
                backdropFilter: "blur(8px)",
                transform: hovered ? "rotate(10deg) scale(1.1)" : "rotate(0deg) scale(1)",
                transition: "transform 0.3s ease",
              }}
            >
              {activity.icon}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                {activity.title}
              </h3>
              <p
                className="text-sm font-semibold mt-0.5 flex items-center gap-1"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                <HiSparkles className="text-xs" />
                {activity.subtitle}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
            {activity.description}
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {activity.stats.map((stat, i) => (
              <div
                key={i}
                className="text-center rounded-xl py-3 px-2"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <div className="text-xl sm:text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-white/60 font-medium uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="space-y-2">
            <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
              <FaBolt className="text-yellow-300" />
              Key Achievements
            </p>
            {activity.achievements.map((ach, i) => (
              <div
                key={i}
                className="flex items-center gap-3 group/ach"
              >
                <div
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: activity.accentColor, boxShadow: `0 0 10px ${activity.accentColor}` }}
                >
                  <FaStar className="text-white text-[8px]" />
                </div>
                <span className="text-sm text-white/85 font-medium group-hover/ach:text-white transition-colors">
                  {ach}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom shimmer line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${activity.accentColor}, transparent)`,
          }}
        />
      </div>
    </div>
  );
}

export default function ExtraCurricularPage() {
  const sectionRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Generate random particles
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    color: activities[i % activities.length].particleColor,
    delay: (i * 0.7) % 5,
    duration: 4 + (i % 3) * 2,
    x: (i * 23 + 7) % 95,
    y: (i * 17 + 11) % 90,
    size: `${4 + (i % 4) * 3}px`,
  }));

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-slate-950 dark:bg-slate-950 overflow-hidden py-20"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Animated CSS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        @keyframes floatParticle {
          0%   { opacity: 0;    transform: translateY(0px) scale(0.8); }
          20%  { opacity: 0.7; }
          80%  { opacity: 0.5; }
          100% { opacity: 0;    transform: translateY(-80px) scale(1.2); }
        }

        @keyframes pulseglow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.8; transform: scale(1.08); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @keyframes shimmerText {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .shimmer-text {
          background: linear-gradient(90deg, #a78bfa, #60a5fa, #34d399, #fbbf24, #f472b6, #a78bfa);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerText 4s linear infinite;
        }

        .header-animate {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* ── Background orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] -top-32 -left-32"
          style={{ background: "rgba(139,92,246,0.15)", animation: "pulseglow 6s ease-in-out infinite" }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] -bottom-20 -right-20"
          style={{ background: "rgba(236,72,153,0.12)", animation: "pulseglow 8s ease-in-out 2s infinite" }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ background: "rgba(16,185,129,0.08)", animation: "pulseglow 10s ease-in-out 4s infinite" }}
        />

        {/* Floating particles */}
        {particles.map((p) => (
          <FloatingParticle key={p.id} {...p} />
        ))}

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Section Header ── */}
      <div
        className="relative z-10 text-center mb-16 px-4"
        style={{ opacity: headerVisible ? 1 : 0, transition: "opacity 0.8s ease" }}
      >
        {/* Eyebrow label */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-bold uppercase tracking-[0.2em]"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <MdGroups className="text-base text-violet-400" />
          Beyond The Code
        </div>

        {/* Main heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
          <span className="text-white">Extra-Curricular</span>
          <br />
          <span className="shimmer-text">Activities</span>
        </h2>

        {/* Subheading */}
        <p className="mt-4 text-sm sm:text-base text-white/40 max-w-xl mx-auto leading-relaxed">
          Leadership, sport, community — every arena shaped who I am beyond the screen.
        </p>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-violet-500/60" />
          <div className="w-2 h-2 rounded-full bg-violet-500" style={{ boxShadow: "0 0 10px #8b5cf6" }} />
          <div className="h-px w-32 bg-gradient-to-r from-violet-500/60 via-pink-500/60 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-pink-500" style={{ boxShadow: "0 0 10px #ec4899" }} />
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-500/60" />
        </div>
      </div>

      {/* ── Cards Grid ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {activities.map((activity, index) => (
            <ActivityCard key={activity.id} activity={activity} index={index} />
          ))}
        </div>

        {/* Bottom CTA / quote */}
        <div
          className="mt-16 text-center py-8 px-6 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <GiLaurelCrown className="text-4xl text-yellow-400 mx-auto mb-3" style={{ filter: "drop-shadow(0 0 10px #fbbf24)" }} />
          <p className="text-white/60 text-sm sm:text-base italic max-w-2xl mx-auto">
            &quot;Excellence is not a skill — it&apos;s an attitude, forged on every field, stage, and screen.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
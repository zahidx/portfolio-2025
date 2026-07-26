"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMicrophone,
  FaHandsHelping,
  FaGamepad,
  FaTrophy,
  FaMedal,
  FaPlay,
  FaPause,
  FaChevronLeft,
  FaChevronRight,
  FaThLarge,
  FaLayerGroup,
  FaBolt,
  FaCheckCircle,
} from "react-icons/fa";
import { GiLaurelCrown, GiPodium } from "react-icons/gi";
import { MdSportsCricket } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";

const activities = [
  {
    id: 1,
    number: "01",
    title: "Debating Society",
    subtitle: "National Level Competitor",
    category: "Public Speaking & Logic",
    description:
      "Engaged in inter-school and national debate championships. Mastered structured logical reasoning, rapid critical thinking, and persuasive audience engagement under intense pressure.",
    icon: <FaMicrophone className="text-xl sm:text-2xl" />,
    badgeIcon: <GiLaurelCrown />,
    badgeText: "Champion",
    accentColor: "#a855f7", // Purple / Violet
    glowColor: "rgba(168,85,247,0.25)",
    achievements: [
      "1st Place – Regional Debate Championship",
      "Best Speaker Award out of 120+ participants",
      "3× Consecutive District Debate Winner",
    ],
    stats: [
      { label: "Tournaments", value: "12+" },
      { label: "Awards Won", value: "7" },
      { label: "Active Years", value: "3 Yrs" },
    ],
    tags: ["Persuasive Oratory", "Logical Argumentation", "Spontaneous Thinking"],
  },
  {
    id: 2,
    number: "02",
    title: "Community Service",
    subtitle: "Social Impact Volunteer",
    category: "Leadership & Social Outreach",
    description:
      "Organized local relief drives, health awareness programs, and youth mentorship workshops. Led a coordinated team of 20+ volunteers to maximize community impact.",
    icon: <FaHandsHelping className="text-xl sm:text-2xl" />,
    badgeIcon: <FaMedal />,
    badgeText: "Hero",
    accentColor: "#10b981", // Emerald
    glowColor: "rgba(16,185,129,0.25)",
    achievements: [
      "Mobilized 20+ volunteers for local social causes",
      "Logged over 500+ hours of community work",
      "Awarded Community Service Excellence Citation",
    ],
    stats: [
      { label: "Hours Served", value: "500+" },
      { label: "Outreach Events", value: "18" },
      { label: "People Helped", value: "200+" },
    ],
    tags: ["Volunteer Management", "Event Planning", "Empathy & Impact"],
  },
  {
    id: 3,
    number: "03",
    title: "Cricket & Sports",
    subtitle: "Regional Tournament Player",
    category: "Team Athletics & Discipline",
    description:
      "Represented school and college teams in regional cricket tournaments. Developed high-stakes situational awareness, disciplined sportsmanship, and tactical team coordination.",
    icon: <MdSportsCricket className="text-xl sm:text-2xl" />,
    badgeIcon: <FaTrophy />,
    badgeText: "Captain",
    accentColor: "#f59e0b", // Amber
    glowColor: "rgba(245,158,11,0.25)",
    achievements: [
      "Regional Tournament Champions 2023",
      "Awarded Best All-Rounder of the Tournament",
      "Appointed Captain of the College XI Squad",
    ],
    stats: [
      { label: "Matches", value: "40+" },
      { label: "Win Rate", value: "70%" },
      { label: "Trophies", value: "4" },
    ],
    tags: ["Tactical Strategy", "Team Leadership", "Resilience & Focus"],
  },
  {
    id: 4,
    number: "04",
    title: "Competitive Gaming",
    subtitle: "eSports Tournament Finalist",
    category: "Tactical Strategy & eSports",
    description:
      "Competed at national eSports tournaments requiring sub-second decision making, real-time spatial awareness, complex multi-tier strategy, and high-frequency communication.",
    icon: <FaGamepad className="text-xl sm:text-2xl" />,
    badgeIcon: <GiPodium />,
    badgeText: "Pro",
    accentColor: "#ec4899", // Pink / Rose
    glowColor: "rgba(236,72,153,0.25)",
    achievements: [
      "Ranked in top 1% globally in tactical eSports",
      "National Tournament Finalist 2023",
      "3× Team MVP for tactical playmaking",
    ],
    stats: [
      { label: "Tournaments", value: "20+" },
      { label: "Global Rank", value: "Top 1%" },
      { label: "Seasons", value: "5" },
    ],
    tags: ["Micro & Macro Strategy", "Split-Second Reflexes", "Clutch Performance"],
  },
];

export default function ExtraCurricularPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState("spotlight"); // "spotlight" | "matrix"
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);

  const activeActivity = activities[activeIndex];
  const autoPlayRef = useRef(null);

  // Auto-play timer logic
  useEffect(() => {
    if (!isAutoPlay || viewMode !== "spotlight") {
      setProgress(0);
      return;
    }

    const intervalTime = 50; // ms
    const totalTime = 6000; // 6s per slide
    const increment = (intervalTime / totalTime) * 100;

    autoPlayRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((idx) => (idx + 1) % activities.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlay, activeIndex, viewMode]);

  const handleSelect = (index) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + activities.length) % activities.length);
    setProgress(0);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % activities.length);
    setProgress(0);
  };

  return (
    <section className="relative min-h-screen bg-slate-950 text-slate-100 py-12 sm:py-20 px-4 sm:px-6 lg:px-12 overflow-hidden selection:bg-purple-500/30 selection:text-purple-200">
      {/* Background Subtle Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full blur-[140px] opacity-20 -top-40 -left-40 transition-all duration-1000 ease-out"
          style={{ background: activeActivity.accentColor }}
        />
        <div
          className="absolute w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[140px] opacity-15 bottom-0 right-0 transition-all duration-1000 ease-out"
          style={{ background: activeActivity.accentColor }}
        />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-5 sm:pb-6 border-b border-slate-800/60 gap-5 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-slate-900/80 border border-slate-800 text-slate-400 mb-3 sm:mb-4">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: activeActivity.accentColor }} />
              {"// BEYOND THE CODE"}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Extra-Curricular <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">Activities</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-base mt-2 max-w-xl">
              Leadership, high-stakes competition, and community engagement — shaping versatility beyond software engineering.
            </p>
          </div>

          {/* View Mode Toggle Controls - Mobile Touch Bar */}
          <div className="flex items-center gap-2 self-stretch md:self-auto bg-slate-900/90 p-1.5 rounded-xl border border-slate-800/80 shadow-lg backdrop-blur-md">
            <button
              onClick={() => setViewMode("spotlight")}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold active:scale-95 transition-all duration-300 ${
                viewMode === "spotlight"
                  ? "bg-slate-800 text-white shadow-md border border-slate-700/60"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FaLayerGroup className="text-xs sm:text-sm" />
              <span>Spotlight</span>
            </button>
            <button
              onClick={() => setViewMode("matrix")}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold active:scale-95 transition-all duration-300 ${
                viewMode === "matrix"
                  ? "bg-slate-800 text-white shadow-md border border-slate-700/60"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FaThLarge className="text-xs sm:text-sm" />
              <span>Bento Grid</span>
            </button>
          </div>
        </div>

        {/* SPOTLIGHT STAGE MODE */}
        {viewMode === "spotlight" && (
          <div className="space-y-6 sm:space-y-8">
            {/* Minimalist Horizontal Node Navigation Tabs */}
            <div className="relative">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
                {activities.map((act, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={act.id}
                      onClick={() => handleSelect(idx)}
                      className={`relative text-left p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border active:scale-95 transition-all duration-300 group overflow-hidden ${
                        isActive
                          ? "bg-slate-900/90 border-slate-700 shadow-xl"
                          : "bg-slate-950/60 border-slate-800/60 hover:bg-slate-900/50 hover:border-slate-700/50"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nodeAccent"
                          className="absolute top-0 left-0 right-0 h-1"
                          style={{ background: act.accentColor }}
                        />
                      )}

                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <span
                          className={`text-xs font-mono font-bold transition-colors ${
                            isActive ? "text-white" : "text-slate-500 group-hover:text-slate-400"
                          }`}
                        >
                          {act.number}
                        </span>
                        <div
                          className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-base sm:text-lg transition-transform duration-300 group-hover:scale-110 ${
                            isActive ? "bg-slate-800 text-white" : "bg-slate-900/80 text-slate-400"
                          }`}
                          style={{ color: isActive ? act.accentColor : undefined }}
                        >
                          {act.icon}
                        </div>
                      </div>

                      <div className="font-bold text-xs sm:text-sm text-slate-200 group-hover:text-white truncate">
                        {act.title}
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-400 truncate mt-0.5">{act.category}</div>
                    </button>
                  );
                })}
              </div>

              {isAutoPlay && (
                <div className="w-full bg-slate-900 h-1 rounded-full mt-3 sm:mt-4 overflow-hidden border border-slate-800">
                  <div
                    className="h-full transition-all duration-75 ease-linear"
                    style={{
                      width: `${progress}%`,
                      background: activeActivity.accentColor,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Stage Showcase Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeActivity.id}
                initial={{ opacity: 0, y: 15, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.99 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative rounded-2xl sm:rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl p-5 sm:p-10 overflow-hidden shadow-2xl"
                style={{
                  boxShadow: `0 20px 60px -15px ${activeActivity.glowColor}`,
                }}
              >
                {/* Background Giant Watermark Index */}
                <div
                  className="absolute -right-4 -bottom-8 sm:-right-6 sm:-bottom-10 text-[140px] sm:text-[240px] font-black tracking-tighter pointer-events-none select-none opacity-[0.03] text-white leading-none font-mono"
                >
                  {activeActivity.number}
                </div>

                <div
                  className="absolute -top-32 -right-32 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-[100px] pointer-events-none opacity-20"
                  style={{ background: activeActivity.accentColor }}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                  {/* Left Column: Details & Stats */}
                  <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide uppercase border backdrop-blur-md"
                        style={{
                          background: `${activeActivity.accentColor}15`,
                          borderColor: `${activeActivity.accentColor}40`,
                          color: activeActivity.accentColor,
                        }}
                      >
                        <HiSparkles className="text-xs sm:text-sm" />
                        {activeActivity.category}
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono text-slate-400 bg-slate-950/60 border border-slate-800">
                        {activeActivity.badgeIcon}
                        {activeActivity.badgeText}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                        {activeActivity.title}
                      </h3>
                      <p className="text-sm sm:text-lg font-medium text-slate-300 mt-1">
                        {activeActivity.subtitle}
                      </p>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-2xl font-light">
                      {activeActivity.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                      {activeActivity.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg text-[11px] sm:text-xs font-medium bg-slate-950/80 border border-slate-800 text-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-2 sm:pt-4">
                      {activeActivity.stats.map((stat, i) => (
                        <div
                          key={i}
                          className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center transition-transform hover:-translate-y-1 duration-200"
                        >
                          <div
                            className="text-lg sm:text-2xl font-extrabold text-white"
                            style={{ color: activeActivity.accentColor }}
                          >
                            {stat.value}
                          </div>
                          <div className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5 sm:mt-1 truncate">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Key Achievements & Controls */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4 sm:space-y-6">
                    <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 sm:pb-3">
                        <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                          <FaBolt style={{ color: activeActivity.accentColor }} />
                          Key Milestones
                        </div>
                        <span className="text-[10px] sm:text-xs text-slate-500 font-mono">
                          {activeActivity.achievements.length} Highlights
                        </span>
                      </div>

                      <div className="space-y-2.5 sm:space-y-3">
                        {activeActivity.achievements.map((ach, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 group">
                            <div
                              className="mt-0.5 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center text-[9px] sm:text-[10px]"
                              style={{
                                background: `${activeActivity.accentColor}25`,
                                color: activeActivity.accentColor,
                              }}
                            >
                              <FaCheckCircle className="text-[10px] sm:text-xs" />
                            </div>
                            <span className="leading-snug text-slate-300 group-hover:text-white transition-colors">
                              {ach}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Stage Navigation Controls */}
                    <div className="flex items-center justify-between pt-1 sm:pt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsAutoPlay(!isAutoPlay)}
                          className="p-2 sm:p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white active:scale-95 transition-all text-xs flex items-center gap-1.5 font-mono"
                          title={isAutoPlay ? "Pause slideshow" : "Play slideshow"}
                        >
                          {isAutoPlay ? <FaPause className="text-[10px]" /> : <FaPlay className="text-[10px]" />}
                          <span>{isAutoPlay ? "Pause" : "Auto"}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={handlePrev}
                          className="p-2.5 sm:p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white active:scale-90 transition-all"
                          aria-label="Previous Activity"
                        >
                          <FaChevronLeft className="text-xs" />
                        </button>
                        <span className="text-xs font-mono text-slate-400 px-1 sm:px-2">
                          {activeIndex + 1} / {activities.length}
                        </span>
                        <button
                          onClick={handleNext}
                          className="p-2.5 sm:p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white active:scale-90 transition-all"
                          aria-label="Next Activity"
                        >
                          <FaChevronRight className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* BENTO MATRIX VIEW MODE */}
        {viewMode === "matrix" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {activities.map((act, idx) => (
              <div
                key={act.id}
                onClick={() => {
                  setActiveIndex(idx);
                  setViewMode("spotlight");
                }}
                className="group relative rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-slate-800/80 p-5 sm:p-6 flex flex-col justify-between cursor-pointer active:scale-98 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-700 shadow-xl"
                style={{
                  boxShadow: `0 10px 30px -10px ${act.glowColor}`,
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: act.accentColor }}
                />

                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-xs font-mono font-bold text-slate-500">{act.number}</span>
                    <div
                      className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-lg transition-transform duration-300 group-hover:scale-110"
                      style={{ color: act.accentColor }}
                    >
                      {act.icon}
                    </div>
                  </div>

                  <span
                    className="inline-block text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 mb-2"
                    style={{ color: act.accentColor }}
                  >
                    {act.badgeText}
                  </span>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {act.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{act.subtitle}</p>

                  <p className="text-slate-300 text-xs mt-3 line-clamp-3 leading-relaxed">
                    {act.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-800/60">
                  <div className="grid grid-cols-3 gap-1 text-center">
                    {act.stats.map((s, i) => (
                      <div key={i} className="p-1 rounded-lg bg-slate-950/60">
                        <div className="text-xs font-bold text-white">{s.value}</div>
                        <div className="text-[8px] text-slate-500 uppercase truncate">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400 group-hover:text-white font-mono transition-colors">
                    <span>View Spotlight</span>
                    <FaChevronRight className="text-[10px] transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Bottom Quote */}
        <div className="mt-10 sm:mt-16 text-center py-5 px-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm max-w-3xl mx-auto">
          <p className="text-slate-400 text-xs sm:text-sm font-mono tracking-tight italic">
            &quot;Excellence is not a singular skill — it is a discipline forged across debate stages, volunteer fields, and competitive arenas.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
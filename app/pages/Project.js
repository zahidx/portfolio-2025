"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaTasks,
  FaShoppingCart,
  FaFilm,
  FaBook,
  FaRocket,
  FaRegClipboard,
  FaDollarSign,
  FaUtensils,
  FaCloudSun,
  FaNewspaper,
  FaTools,
  FaPlayCircle,
  FaImage,
  FaBookOpen,
  FaExternalLinkAlt,
  FaGithub,
  FaFileAlt,
} from "react-icons/fa";

const projects = [
  {
    title: "ScreenHub",
    slug: "screen-hub",
    description:
      "ScreenHub allows users to fetch movie data, reviews, and related information from the TMDB API. Explore movie details, read reviews, and get genre recommendations.",
    icon: <FaFilm className="text-4xl sm:text-5xl text-red-500 mx-auto" />,
    githubLink: "https://github.com/zahidx/screen-hub.git",
    livePreview: "https://screen-hub-u.netlify.app/",
    tag: "Entertainment / API",
    category: "API & Integration",
    techStack: ["React", "TMDB API", "Tailwind", "JavaScript"],
  },
  {
    title: "LitVerse",
    description:
      "LitVerse fetches book reviews, ratings, and data using the Google Books API. Search books, read reviews, and discover new titles across curated genres.",
    icon: <FaBook className="text-4xl sm:text-5xl text-amber-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/lit-verse.git",
    livePreview: "https://lit-verse.netlify.app/",
    tag: "Literature / API",
    category: "API & Integration",
    techStack: ["React", "Google Books API", "CSS3", "JavaScript"],
  },
  {
    title: "OrbitX",
    slug: "orbitx",
    description:
      "OrbitX fetches data from NASA APIs, delivering space-related imagery, videos, and articles. Explore missions and celestial discoveries in real-time.",
    icon: <FaRocket className="text-4xl sm:text-5xl text-cyan-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/orbitx.git",
    livePreview: "https://orbitx-u.netlify.app/",
    tag: "Space / NASA API",
    category: "API & Integration",
    techStack: ["Next.js", "NASA API", "Tailwind", "REST API"],
  },
  {
    title: "QuizArena",
    description:
      "Interactive quiz platform using Trivia APIs, offering diverse quiz categories and difficulty levels for real-time knowledge testing.",
    icon: <FaRegClipboard className="text-4xl sm:text-5xl text-purple-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/quiz-arena.git",
    livePreview: "https://quiz-arena-u.netlify.app/",
    tag: "Interactive / Trivia",
    category: "Web Apps",
    techStack: ["React", "Trivia API", "Hooks", "Tailwind"],
  },
  {
    title: "Financial Tracker",
    slug: "financial-tracker",
    description:
      "Personal finance tracking app where users add and manage expenses, categorize spending, and visualize financial growth over time.",
    icon: <FaDollarSign className="text-4xl sm:text-5xl text-emerald-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/financial-tracker.git",
    livePreview: "https://financial-tracker-u.netlify.app/",
    tag: "FinTech / Analytics",
    category: "Tools & Utilities",
    techStack: ["React", "Chart.js", "Node.js", "MongoDB"],
  },
  {
    title: "Insta-Recipe",
    description:
      "Insta-Recipe provides food recipes using the Spoonacular API. Find, save, and discover new culinary dishes based on available ingredients.",
    icon: <FaUtensils className="text-4xl sm:text-5xl text-orange-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/insta-recipe.git",
    livePreview: "https://insta-recipe.netlify.app/",
    tag: "Culinary / API",
    category: "API & Integration",
    techStack: ["React", "Spoonacular API", "Tailwind", "JavaScript"],
  },
  {
    title: "Weather Forecast App",
    description:
      "Real-time weather forecast web app fetching temperature, humidity, wind speeds, and 7-day outlooks for global cities.",
    icon: <FaCloudSun className="text-4xl sm:text-5xl text-blue-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/weather-forecast-app-u.git",
    livePreview: "https://weather-forecast-app-u.netlify.app/",
    tag: "Utilities / API",
    category: "API & Integration",
    techStack: ["React", "OpenWeather API", "CSS3", "JavaScript"],
  },
  {
    title: "The Daily Sunrise Newspaper",
    description:
      "News aggregator website pulling breaking news stories and articles using live news APIs with category filtering and sharing options.",
    icon: <FaNewspaper className="text-4xl sm:text-5xl text-rose-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/the-daily-sunrise.git",
    livePreview: "https://the-daily-sunrise-newspaper.netlify.app/",
    tag: "News / Media",
    category: "API & Integration",
    techStack: ["React", "News API", "Tailwind", "JavaScript"],
  },
  {
    title: "Utility Pro",
    description:
      "Comprehensive web app integrating 20 essential utilities into one platform — including converters, calculators, and tools.",
    icon: <FaTools className="text-4xl sm:text-5xl text-indigo-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/utility-pro.git",
    livePreview: "https://utility-pro.netlify.app/",
    tag: "Productivity Suite",
    category: "Tools & Utilities",
    techStack: ["React", "JavaScript", "Tailwind", "PWA"],
  },
  {
    title: "Snap Vault",
    description:
      "Wallpaper storage & sharing platform similar to Unsplash. Explore, upload, and download high-resolution imagery.",
    icon: <FaImage className="text-4xl sm:text-5xl text-emerald-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/snap-vault.git",
    livePreview: "https://snap-vault-u.netlify.app/",
    tag: "Media Storage",
    category: "Web Apps",
    techStack: ["React", "Unsplash API", "Firebase", "Tailwind"],
  },
  {
    title: "Tele Craft",
    slug: "tele-craft",
    description:
      "AI-powered storytelling web application generating dynamic narratives based on custom prompt inputs and creative parameters.",
    icon: <FaBookOpen className="text-4xl sm:text-5xl text-orange-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/tele-craft.git",
    livePreview: "https://tele-craft.netlify.app/",
    tag: "Generative AI",
    category: "AI & Research",
    techStack: ["React", "Generative AI", "Node.js", "Tailwind"],
  },
  {
    title: "Prime Hub",
    description:
      "Subscription-based OTT streaming platform offering a video playback experience with intuitive navigation.",
    icon: <FaPlayCircle className="text-4xl sm:text-5xl text-fuchsia-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/prime-hub.git",
    livePreview: "https://prime-hub.netlify.app/",
    tag: "OTT Streaming",
    category: "Web Apps",
    techStack: ["React", "Video.js", "CSS3", "JavaScript"],
  },
  {
    title: "Social Interactive Robot",
    slug: "social-robot",
    description:
      "Human-robot interaction research project incorporating advanced AI models, natural language processing, and robotics control.",
    icon: <FaRobot className="text-4xl sm:text-5xl text-blue-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/social_robot.git",
    livePreview: "https://social-robot.netlify.app/",
    tag: "AI & Robotics",
    category: "AI & Research",
    techStack: ["Python", "OpenCV", "PyTorch", "ROS / AI"],
  },
  {
    title: "To-Do List App",
    description:
      "Task management app with task creation, real-time persistence, and completion states built using React and Firebase.",
    icon: <FaTasks className="text-4xl sm:text-5xl text-sky-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/to-do-list-u.git",
    livePreview: "https://to-do-list-up.netlify.app/",
    tag: "Productivity",
    category: "Tools & Utilities",
    techStack: ["React", "Firebase Firestore", "Tailwind", "JavaScript"],
  },
  {
    title: "Simple Shopping Cart",
    description:
      "E-commerce storefront featuring cart management, state persistence, and checkout logic built with React, Node.js & MongoDB.",
    icon: <FaShoppingCart className="text-4xl sm:text-5xl text-teal-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/tech-store.git",
    livePreview: "https://tech-store-u.netlify.app/",
    tag: "E-Commerce",
    category: "Web Apps",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
  },
];

const CATEGORIES = [
  "All",
  "Web Apps",
  "AI & Research",
  "API & Integration",
  "Tools & Utilities",
];

export default function ProjectsResearchPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeTab === "All") return projects;
    return projects.filter((p) => p.category === activeTab);
  }, [activeTab]);

  return (
    <section
      className="py-12 sm:py-20 px-4 sm:px-12 lg:px-16 bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-900 dark:text-slate-100"
      id="projects"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-indigo-950/40 border border-indigo-500/30 text-indigo-400 mb-3">
            {"// FEATURED WORK & LABS"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-tight">
            Projects &amp; Experiments
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto px-2">
            A curated showcase of full-stack applications, AI research experiments, and API utility platforms.
          </p>
        </div>

        {/* Category Filter Tabs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-14">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat;
            const count =
              cat === "All"
                ? projects.length
                : projects.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 active:scale-95 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400/40"
                    : "bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-500/40"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] font-mono font-extrabold px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filtered Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`
                  bg-white dark:bg-slate-800/90 shadow-xl border border-slate-200/80 dark:border-slate-700/60 
                  p-5 sm:p-6 rounded-2xl text-center flex flex-col justify-between
                  transition-all duration-300 transform-gpu active:scale-98
                  hover:scale-105 sm:hover:scale-105 hover:shadow-2xl hover:border-indigo-500/50
                  ${
                    index % 3 === 0
                      ? "sm:hover:-rotate-1"
                      : index % 3 === 2
                      ? "sm:hover:rotate-1"
                      : ""
                  }
                `}
              >
                <div>
                  {/* Category Tag & Index */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400">
                      {project.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="p-3 mb-3 inline-block rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-700/50">
                    {project.icon}
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-light mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack Chips Bar */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6">
                    {project.techStack?.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons Dock (Single Horizontal Row) */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-center gap-2">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold active:scale-95 transition-all"
                    title="View Source Code"
                  >
                    <FaGithub className="text-xs text-indigo-500" />
                    <span>Code</span>
                  </a>

                  {project.slug && (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group/cs relative p-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white text-xs font-bold active:scale-95 shadow-lg shadow-amber-500/30 border border-amber-300/40 transition-all duration-300"
                      title="Read Detailed Case Study"
                      aria-label="Read Case Study"
                    >
                      <FaFileAlt className="text-xs text-white transition-transform duration-500 ease-out group-hover/cs:rotate-[360deg] group-hover/cs:scale-115" />
                    </Link>
                  )}

                  <a
                    href={project.livePreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 active:scale-95 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 transition-all"
                    title="Open Live Preview"
                  >
                    <FaExternalLinkAlt className="text-[10px]" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

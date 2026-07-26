"use client";

import React from "react";
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
} from "react-icons/fa";

const projects = [
  {
    title: "ScreenHub",
    description:
      "ScreenHub allows users to fetch movie data, reviews, and related information from the TMDB API. Explore movie details, read reviews, and get genre recommendations.",
    icon: <FaFilm className="text-4xl sm:text-5xl text-red-500 mx-auto" />,
    githubLink: "https://github.com/zahidx/screen-hub.git",
    livePreview: "https://screen-hub-u.netlify.app/",
    tag: "Entertainment / API",
  },
  {
    title: "LitVerse",
    description:
      "LitVerse fetches book reviews, ratings, and data using the Google Books API. Search books, read reviews, and discover new titles across curated genres.",
    icon: <FaBook className="text-4xl sm:text-5xl text-amber-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/lit-verse.git",
    livePreview: "https://lit-verse.netlify.app/",
    tag: "Literature / API",
  },
  {
    title: "OrbitX",
    description:
      "OrbitX fetches data from NASA APIs, delivering space-related imagery, videos, and articles. Explore missions and celestial discoveries in real-time.",
    icon: <FaRocket className="text-4xl sm:text-5xl text-cyan-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/orbitx.git",
    livePreview: "https://orbitx-u.netlify.app/",
    tag: "Space / NASA API",
  },
  {
    title: "QuizArena",
    description:
      "Interactive quiz platform using Trivia APIs, offering diverse quiz categories and difficulty levels for real-time knowledge testing.",
    icon: <FaRegClipboard className="text-4xl sm:text-5xl text-purple-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/quiz-arena.git",
    livePreview: "https://quiz-arena-u.netlify.app/",
    tag: "Interactive / Trivia",
  },
  {
    title: "Financial Tracker",
    description:
      "Personal finance tracking app where users add and manage expenses, categorize spending, and visualize financial growth over time.",
    icon: <FaDollarSign className="text-4xl sm:text-5xl text-emerald-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/financial-tracker.git",
    livePreview: "https://financial-tracker-u.netlify.app/",
    tag: "FinTech / Analytics",
  },
  {
    title: "Insta-Recipe",
    description:
      "Insta-Recipe provides food recipes using the Spoonacular API. Find, save, and discover new culinary dishes based on available ingredients.",
    icon: <FaUtensils className="text-4xl sm:text-5xl text-orange-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/insta-recipe.git",
    livePreview: "https://insta-recipe.netlify.app/",
    tag: "Culinary / API",
  },
  {
    title: "Weather Forecast App",
    description:
      "Real-time weather forecast web app fetching temperature, humidity, wind speeds, and 7-day outlooks for global cities.",
    icon: <FaCloudSun className="text-4xl sm:text-5xl text-blue-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/weather-forecast-app-u.git",
    livePreview: "https://weather-forecast-app-u.netlify.app/",
    tag: "Utilities / API",
  },
  {
    title: "The Daily Sunrise Newspaper",
    description:
      "News aggregator website pulling breaking news stories and articles using live news APIs with category filtering and sharing options.",
    icon: <FaNewspaper className="text-4xl sm:text-5xl text-rose-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/the-daily-sunrise.git",
    livePreview: "https://the-daily-sunrise-newspaper.netlify.app/",
    tag: "News / Media",
  },
  {
    title: "Utility Pro",
    description:
      "Comprehensive web app integrating 20 essential utilities into one platform — including converters, calculators, and tools.",
    icon: <FaTools className="text-4xl sm:text-5xl text-indigo-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/utility-pro.git",
    livePreview: "https://utility-pro.netlify.app/",
    tag: "Productivity Suite",
  },
  {
    title: "Snap Vault",
    description:
      "Wallpaper storage & sharing platform similar to Unsplash. Explore, upload, and download high-resolution imagery.",
    icon: <FaImage className="text-4xl sm:text-5xl text-emerald-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/snap-vault.git",
    livePreview: "https://snap-vault-u.netlify.app/",
    tag: "Media Storage",
  },
  {
    title: "Tele Craft",
    description:
      "AI-powered storytelling web application generating dynamic narratives based on custom prompt inputs and creative parameters.",
    icon: <FaBookOpen className="text-4xl sm:text-5xl text-orange-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/tele-craft.git",
    livePreview: "https://tele-craft.netlify.app/",
    tag: "Generative AI",
  },
  {
    title: "Prime Hub",
    description:
      "Subscription-based OTT streaming platform offering a video playback experience with intuitive navigation.",
    icon: <FaPlayCircle className="text-4xl sm:text-5xl text-fuchsia-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/prime-hub.git",
    livePreview: "https://prime-hub.netlify.app/",
    tag: "OTT Streaming",
  },
  {
    title: "Social Interactive Robot",
    description:
      "Human-robot interaction research project incorporating advanced AI models, natural language processing, and robotics control.",
    icon: <FaRobot className="text-4xl sm:text-5xl text-blue-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/social_robot.git",
    livePreview: "https://social-robot.netlify.app/",
    tag: "AI & Robotics",
  },
  {
    title: "To-Do List App",
    description:
      "Task management app with task creation, real-time persistence, and completion states built using React and Firebase.",
    icon: <FaTasks className="text-4xl sm:text-5xl text-sky-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/to-do-list-u.git",
    livePreview: "https://to-do-list-up.netlify.app/",
    tag: "Productivity",
  },
  {
    title: "Simple Shopping Cart",
    description:
      "E-commerce storefront featuring cart management, state persistence, and checkout logic built with React, Node.js & MongoDB.",
    icon: <FaShoppingCart className="text-4xl sm:text-5xl text-teal-400 mx-auto" />,
    githubLink: "https://github.com/zahidx/tech-store.git",
    livePreview: "https://tech-store-u.netlify.app/",
    tag: "E-Commerce",
  },
];

export default function ProjectsResearchPage() {
  return (
    <section
      className="py-12 sm:py-20 px-4 sm:px-12 lg:px-16 bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-900 dark:text-slate-100"
      id="projects"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-indigo-950/40 border border-indigo-500/30 text-indigo-400 mb-3">
            {"// FEATURED WORK & LABS"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-tight">
            Projects
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto px-2">
            A curated showcase of full-stack applications, AI experiments, and web utility platforms built for production.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
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
                {/* Category Tag & Icon */}
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
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-light mb-6">
                  {project.description}
                </p>
              </div>

              {/* Mobile Action Buttons Dock */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-center gap-3">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold active:scale-95 transition-all"
                >
                  <FaGithub className="text-xs text-indigo-500" />
                  <span>Code</span>
                </a>

                <a
                  href={project.livePreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 transition-all"
                >
                  <FaExternalLinkAlt className="text-[10px]" />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Profile from "../images/profile.png";
import {
  FaArrowRight,
  FaFileDownload,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCode,
  FaRobot,
  FaLaptopCode,
  FaCalendarAlt,
} from "react-icons/fa";

export default function Home() {
  return (
    <div
      className="profile_section relative min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 bg-slate-900 text-white overflow-hidden flex flex-col justify-between"
      id="home"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 w-full my-auto py-6 sm:py-8">
        {/* Availability Badge - Mobile App Header Style */}
        <div className="flex justify-center lg:justify-start mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-lg shadow-indigo-950/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Available for New Opportunities</span>
          </div>
        </div>

        {/* Hero Content Grid */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
          {/* Profile Details Column */}
          <div className="profile_info text-center lg:text-left max-w-2xl w-full">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 sm:mb-4 leading-tight whitespace-nowrap">
              Hi, I am{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-pink-400">
                Zahidul Islam
              </span>
            </h1>

            <h2 className="text-base sm:text-2xl font-semibold text-indigo-300 mb-4 sm:mb-6 text-center lg:text-left">
              <span className="inline-flex items-center justify-center lg:justify-start gap-2 flex-wrap">
                <FaLaptopCode className="text-pink-400 text-lg sm:text-xl shrink-0" />
                <span>Software Engineer &amp; Full-Stack Developer</span>
              </span>
            </h2>

            <p className="text-gray-300 text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
              Passionate Computer Science professional skilled in full-stack web development, database engineering, and computer vision research. Focused on crafting responsive, high-performance web applications and intuitive digital experiences.
            </p>

            <div className="profile_buttons flex flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-4">
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 hover:from-indigo-900 hover:to-purple-900 active:scale-95 text-white font-semibold py-3.5 px-6 sm:px-7 rounded-xl border border-indigo-500/40 hover:border-indigo-400 shadow-lg shadow-indigo-950/60 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 text-sm sm:text-base whitespace-nowrap"
              >
                <span>Get In Touch</span>
                <FaArrowRight className="text-xs sm:text-sm text-indigo-400 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="https://calendly.com/zahidxislam"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 hover:from-emerald-900 hover:to-teal-900 active:scale-95 border border-emerald-500/40 hover:border-emerald-400 text-white font-semibold py-3.5 px-6 sm:px-7 rounded-xl shadow-lg shadow-emerald-950/60 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 text-sm sm:text-base whitespace-nowrap"
              >
                <FaCalendarAlt className="text-emerald-400 text-sm transition-transform duration-300 group-hover:scale-110" />
                <span>Book 1 Call</span>
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 hover:from-slate-800 hover:to-indigo-900 active:scale-95 border border-slate-700 hover:border-slate-500 text-white font-semibold py-3.5 px-6 sm:px-7 rounded-xl shadow-lg shadow-slate-950/60 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 text-sm sm:text-base whitespace-nowrap"
              >
                <FaFileDownload className="text-indigo-400 text-sm transition-transform duration-300 group-hover:scale-110" />
                <span>View Resume</span>
              </a>
            </div>

            {/* Quick Links - Left Aligned */}
            <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-5 mt-6 sm:mt-8">
              <a
                href="https://github.com/zahidx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white flex items-center justify-center text-xl sm:text-2xl shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-md"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 text-slate-300 hover:text-blue-400 flex items-center justify-center text-xl sm:text-2xl shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-md"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:zahid.imx@gmail.com"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-pink-500/50 text-slate-300 hover:text-pink-400 flex items-center justify-center text-xl sm:text-2xl shadow-lg hover:shadow-pink-500/20 active:scale-95 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-md"
                aria-label="Email Me"
                title="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Avatar & Floating Badges - Native Mobile App Card */}
          <div className="profile_image relative flex-shrink-0 my-2 sm:my-0">
            {/* Glowing Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-full blur-2xl opacity-40 animate-pulse" />

            <div className="relative w-52 h-52 sm:w-80 sm:h-80 rounded-full p-1.5 sm:p-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-2xl">
              <Image
                src={Profile}
                alt="Zahidul Islam - Software Engineer"
                width={320}
                height={320}
                priority
                className="w-full h-full rounded-full object-cover border-4 border-slate-900 shadow-inner"
              />
            </div>

            {/* Floating Mobile App Chips */}
            <div
              className="absolute -top-1 -left-2 sm:-top-2 sm:-left-4 bg-slate-800/95 border border-slate-700/80 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-indigo-300 animate-bounce"
              style={{ animationDuration: "4s" }}
            >
              <FaCode className="text-blue-400 text-xs sm:text-sm" />
              <span>Full-Stack Web</span>
            </div>

            <div
              className="absolute -bottom-1 -right-2 sm:-bottom-2 sm:-right-4 bg-slate-800/95 border border-slate-700/80 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-pink-300 animate-bounce"
              style={{ animationDuration: "5s" }}
            >
              <FaRobot className="text-pink-400 text-xs sm:text-sm" />
              <span>AI & Vision Research</span>
            </div>
          </div>
        </div>
      </div>

      {/* Landing Page Stats Counter Bar - Mobile Native App Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 w-full pt-6 sm:pt-8 border-t border-slate-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-800/50 border border-slate-800/80 backdrop-blur-md">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-400">15+</h3>
            <p className="text-[11px] sm:text-sm text-gray-400 mt-0.5">Web Projects</p>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-800/50 border border-slate-800/80 backdrop-blur-md">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-pink-400">RA</h3>
            <p className="text-[11px] sm:text-sm text-gray-400 mt-0.5">Research Assistant</p>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-800/50 border border-slate-800/80 backdrop-blur-md">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-400">CS</h3>
            <p className="text-[11px] sm:text-sm text-gray-400 mt-0.5">Degree Graduate</p>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-800/50 border border-slate-800/80 backdrop-blur-md">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-purple-400">100%</h3>
            <p className="text-[11px] sm:text-sm text-gray-400 mt-0.5">Dedication to Quality</p>
          </div>
        </div>
      </div>
    </div>
  );
}

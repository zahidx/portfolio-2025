"use client";

import Image from "next/image";
import Profile from "../images/profile.png";
import { FaArrowRight, FaFileDownload, FaGithub, FaLinkedin, FaEnvelope, FaCode, FaRobot, FaLaptopCode } from "react-icons/fa";

export default function Home() {
  return (
    <div className="profile_section relative min-h-screen pt-24 pb-16 bg-slate-900 text-white overflow-hidden flex flex-col justify-between" id="home">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full my-auto py-8">
        {/* Availability Badge */}
        <div className="flex justify-center lg:justify-start mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4" />
            <span>Available for New Opportunities</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Profile Details Column */}
          <div className="profile_info text-center lg:text-left max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
              Hi, I am{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-pink-400">
                Zahidul Islam
              </span>
            </h1>

            <h2 className="text-xl sm:text-2xl font-semibold text-indigo-300 mb-6 flex items-center justify-center lg:justify-start gap-2">
              <FaLaptopCode className="text-pink-400" />
              <span>Software Engineer & Full-Stack Developer</span>
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
              Passionate Computer Science professional skilled in full-stack web development, database engineering, and computer vision research. Focused on crafting responsive, high-performance web applications and intuitive digital experiences.
            </p>

            {/* Action CTAs */}
            <div className="profile_buttons flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3.5 px-8 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Get In Touch</span>
                <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold py-3.5 px-8 rounded-xl backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <FaFileDownload className="text-indigo-400" />
                <span>View Resume</span>
              </a>
            </div>

            {/* Quick Links */}
            <div className="flex items-center justify-center lg:justify-start gap-6 mt-8 text-gray-400">
              <a
                href="https://github.com/zahidx"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 text-xl transition-colors"
                aria-label="GitHub Profile"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 text-xl transition-colors"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:zahid.imx@gmail.com"
                className="hover:text-indigo-400 text-xl transition-colors"
                aria-label="Email Me"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Avatar & Floating Badges */}
          <div className="profile_image relative flex-shrink-0">
            {/* Glowing Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-full blur-2xl opacity-40 animate-pulse" />

            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-2xl">
              <Image
                src={Profile}
                alt="Zahidul Islam - Software Engineer"
                width={320}
                height={320}
                priority
                className="w-full h-full rounded-full object-cover border-4 border-slate-900 shadow-inner"
              />
            </div>

            {/* Floating Skill Badges */}
            <div className="absolute -top-2 -left-4 bg-slate-800/90 border border-slate-700/80 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold text-indigo-300 animate-bounce" style={{ animationDuration: '4s' }}>
              <FaCode className="text-blue-400 text-sm" />
              <span>Full-Stack Web</span>
            </div>

            <div className="absolute -bottom-2 -right-4 bg-slate-800/90 border border-slate-700/80 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold text-pink-300 animate-bounce" style={{ animationDuration: '5s' }}>
              <FaRobot className="text-pink-400 text-sm" />
              <span>AI & Vision Research</span>
            </div>
          </div>
        </div>
      </div>

      {/* Landing Page Stats Counter Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full pt-8 border-t border-slate-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
            <h3 className="text-3xl font-extrabold text-indigo-400">15+</h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Web Projects</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
            <h3 className="text-3xl font-extrabold text-pink-400">RA</h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Research Assistant</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
            <h3 className="text-3xl font-extrabold text-emerald-400">CS</h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Degree Graduate</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
            <h3 className="text-3xl font-extrabold text-purple-400">100%</h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Dedication to Quality</p>
          </div>
        </div>
      </div>
    </div>
  );
}

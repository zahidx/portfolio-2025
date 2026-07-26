"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaBriefcase,
  FaEnvelope,
  FaPhone,
  FaAward,
  FaBookReader,
  FaGlobe,
  FaCertificate,
  FaMicroscope,
} from "react-icons/fa";

export default function About() {
  const personalDetails = [
    { icon: FaUser, label: "Name", value: "Zahidul Islam", color: "text-indigo-400" },
    { icon: FaMapMarkerAlt, label: "Location", value: "Baridhara, Dhaka, Bangladesh", color: "text-red-400" },
    { icon: FaBriefcase, label: "Profession", value: "Software Engineer / Web Developer", color: "text-emerald-400" },
    { icon: FaBookReader, label: "Hobbies", value: "Reading, Photography, Gaming", color: "text-purple-400" },
    { icon: FaEnvelope, label: "Email", value: "zahid.imx@gmail.com", color: "text-blue-400", href: "mailto:zahid.imx@gmail.com" },
    { icon: FaPhone, label: "Phone", value: "+880 1754 309016", color: "text-teal-400", href: "tel:+8801754309016" },
  ];

  const languages = ["English", "Bangla", "Hindi", "French"];

  const educationTimeline = [
    {
      title: "Bachelor's in Computer Science & Engineering (CSE)",
      subtitle: "Independent University, Bangladesh — Graduated 2024",
      icon: FaGraduationCap,
      description: "Specialized in Artificial Intelligence, Machine Learning, and Software Engineering.",
      color: "bg-indigo-500",
      glowColor: "shadow-indigo-500/30",
    },
    {
      title: "Research Publication",
      subtitle: "Computer Vision & AI Field",
      icon: FaMicroscope,
      description:
        'Published research paper titled "Efficient Violence Detection Techniques" focusing on automated real-time surveillance video analysis.',
      color: "bg-purple-500",
      glowColor: "shadow-purple-500/30",
    },
    {
      title: "Certifications & Training",
      subtitle: "Full-Stack Development & Python",
      icon: FaCertificate,
      description:
        "Certified Full-Stack Web Developer and Python Specialist. Active practitioner in modern React & Next.js ecosystems.",
      color: "bg-emerald-500",
      glowColor: "shadow-emerald-500/30",
    },
    {
      title: "Achievements & Hackathons",
      subtitle: "Competitive & Project Experience",
      icon: FaAward,
      description:
        "Participated in Hackathon 2023. Built vocabulary learning platforms, interactive AI storytellers, and real-time chat tools.",
      color: "bg-pink-500",
      glowColor: "shadow-pink-500/30",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-12 sm:py-20 px-4 sm:px-12 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-indigo-950/40 border border-indigo-500/30 text-indigo-400 mb-3">
            {"// BIOGRAPHY & MILESTONES"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            About Me
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto px-2">
            Get to know my background, educational milestones, and passion for computer science & web engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-stretch">
          {/* Personal Info Card - Mobile App Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 bg-white dark:bg-slate-800/90 p-5 sm:p-8 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700/60 backdrop-blur-md transition-shadow duration-300 hover:shadow-2xl"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-slate-900 dark:text-white flex items-center gap-2.5 border-b border-slate-200 dark:border-slate-700/80 pb-3.5">
              <FaUser className="text-indigo-500 text-lg sm:text-xl" />
              <span>Personal Details</span>
            </h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              className="space-y-3 sm:space-y-4"
            >
              {personalDetails.map((item, idx) => {
                const IconComponent = item.icon;
                const isInteractive = Boolean(item.href);

                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className={`flex items-center gap-3.5 p-3 rounded-xl bg-slate-100/70 dark:bg-slate-700/30 border border-slate-200/60 dark:border-slate-700/40 transition-all ${
                      isInteractive ? "hover:bg-indigo-50/50 dark:hover:bg-slate-700/60 active:scale-98 cursor-pointer" : ""
                    }`}
                  >
                    {isInteractive ? (
                      <a href={item.href} className="flex items-center gap-3.5 w-full">
                        <div className={`p-2.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 ${item.color}`}>
                          <IconComponent className="text-base sm:text-lg" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                            {item.label}
                          </p>
                          <p className="text-xs sm:text-base font-medium text-slate-800 dark:text-slate-200 truncate">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <>
                        <div className={`p-2.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 ${item.color}`}>
                          <IconComponent className="text-base sm:text-lg" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                            {item.label}
                          </p>
                          <p className="text-xs sm:text-base font-medium text-slate-800 dark:text-slate-200 truncate">
                            {item.value}
                          </p>
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}

              {/* Languages Spoken */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700/80">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FaGlobe className="text-indigo-400" />
                  <span>Languages Spoken</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/60"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Education & Achievements Timeline Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-white dark:bg-slate-800/90 p-5 sm:p-8 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700/60 backdrop-blur-md transition-shadow duration-300 hover:shadow-2xl"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-slate-900 dark:text-white flex items-center gap-2.5 border-b border-slate-200 dark:border-slate-700/80 pb-3.5">
              <FaGraduationCap className="text-indigo-500 text-lg sm:text-xl" />
              <span>Education & Milestones</span>
            </h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              className="relative border-l-2 border-indigo-200 dark:border-indigo-900/60 ml-2.5 sm:ml-4 space-y-6 sm:space-y-8 pl-5 sm:pl-6"
            >
              {educationTimeline.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="relative group cursor-pointer"
                  >
                    {/* Node Dot Icon */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full ${item.color} text-white flex items-center justify-center shadow-md ${item.glowColor} group-hover:scale-110 active:scale-95 transition-transform duration-200`}
                    >
                      <IconComponent className="text-[10px] sm:text-xs" />
                    </div>

                    <div className="p-3 -ml-2 sm:-ml-3 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 sm:bg-transparent border border-slate-200/40 dark:border-slate-700/40 sm:border-none group-hover:bg-indigo-50/50 dark:group-hover:bg-slate-700/30 transition-colors">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-400 transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5 mb-1.5">
                        {item.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

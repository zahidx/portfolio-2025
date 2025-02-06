"use client"; // Mark this file as a client component

import React, { useEffect, useRef } from "react";
import { FaBriefcase, FaLaptopCode, FaChalkboardTeacher, FaPhotoVideo } from "react-icons/fa"; // Importing relevant icons for each card

export default function ExperiencePage() {
  const cardRefs = useRef([]);

  useEffect(() => {
    // Smooth scrolling for the Experience section
    if (window.location.hash === "#experience") {
      const experienceSection = document.getElementById("experience");
      if (experienceSection) {
        experienceSection.scrollIntoView({ behavior: "smooth" });
      }
    }

    // Handle scroll animations
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.85; // Trigger animation when the card is 85% in view
      cardRefs.current.forEach((card) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          if (rect.top < triggerPoint) {
            card.style.opacity = 1;
            card.style.transform = "translateY(0) scale(1)";
          } else {
            card.style.opacity = 0;
            card.style.transform = "translateY(80px) scale(0.85)";
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const experiences = [
    {
      title: "Student Research Assistant",
      organization: "Independent University, Bangladesh",
      duration: "Jan 2023 - Present",
      description:
        "Collaborated with professors on research projects related to computer vision and machine learning. Assisted in data collection, analysis, and model implementation.",
      lightColor: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white", // Light mode color
      darkColor: "bg-gradient-to-r from-indigo-700 to-purple-800 text-white", // Dark mode color
      icon: <FaBriefcase className="text-7xl mb-4" />, // Larger icon
    },
    {
      title: "Freelance Web Designer & Developer",
      organization: "Various Clients",
      duration: "May 2022 - Present",
      description:
        "Worked as a freelance web designer and developer for multiple clients. Designed and developed responsive websites using HTML, CSS, JavaScript, React, Node.js, and MySQL.",
      lightColor: "bg-gradient-to-r from-teal-500 to-green-600 text-white", // Light mode color
      darkColor: "bg-gradient-to-r from-teal-700 to-green-800 text-white", // Dark mode color
      icon: <FaLaptopCode className="text-7xl mb-4" />, // Larger icon
    },
    {
      title: "Tutor",
      organization: "Self-Employed",
      duration: "Sep 2020 - Present",
      description:
        "Offered private tutoring services to high school students in subjects like Mathematics, Physics, and ICT. Helped students improve their understanding and performance in their academics.",
      lightColor: "bg-gradient-to-r from-pink-500 to-red-600 text-white", // Light mode color
      darkColor: "bg-gradient-to-r from-pink-700 to-red-800 text-white", // Dark mode color
      icon: <FaChalkboardTeacher className="text-7xl mb-4" />, // Larger icon
    },
    {
      title: "Photo Editing & Logo Design",
      organization: "Freelance Projects",
      duration: "Jan 2020 - Dec 2021",
      description:
        "Provided photo editing and logo design services for clients from various industries. Utilized Adobe Photoshop and Illustrator to create visually appealing and professional designs that met clients' requirements.",
      lightColor: "bg-gradient-to-r from-yellow-500 to-orange-600 text-white", // Light mode color
      darkColor: "bg-gradient-to-r from-yellow-700 to-orange-800 text-white", // Dark mode color
      icon: <FaPhotoVideo className="text-7xl mb-4" />, // Larger icon
    },
  ];

  return (
    <div
      id="experience"
      className="min-h-screen pl-8 pr-8 lg:pl-40 lg:pr-40 bg-gray-100 py-10 dark:bg-gradient-to-b dark:from-[#220E35] dark:to-[#0E1628] dark:text-white"
    >
      <h1 className="mt-5 font-bold text-5xl text-center flex items-center justify-center space-x-3 decoration-blue-500 dark:decoration-gray-100">
        <FaBriefcase className="text-3xl" /> {/* Icon added to title */}
        <span>Experience</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6 py-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`shadow-lg p-6 rounded-xl transform transition-all duration-[800ms] ease-out hover:shadow-2xl hover:scale-[1.07] hover:rotate-[3deg] ${exp.lightColor} dark:${exp.darkColor} dark:bg-transparent dark:text-white flex flex-col items-center text-center`} // Added flexbox for centering text
            style={{
              opacity: 0, // Hidden by default
              transform: "translateY(80px) scale(0.85)", // Initial state
            }}
          >
            {exp.icon} {/* Icon for each experience */}
            <h3 className="text-2xl font-semibold dark:text-white">{exp.title}</h3>
            <p className="text-sm mt-2 dark:text-gray-100">{exp.organization}</p>
            <p className="text-sm dark:text-gray-50">{exp.duration}</p>
            <p className="mt-4 text-base dark:text-gray-50">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

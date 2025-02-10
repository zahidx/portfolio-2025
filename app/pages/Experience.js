"use client"; // Mark this file as a client component

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { FaBriefcase, FaLaptopCode, FaChalkboardTeacher, FaPhotoVideo } from "react-icons/fa"; // Importing relevant icons for each card

export default function ExperiencePage() {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out" });
  
    // Smooth scrolling for the Experience section
    if (window.location.hash === "#experience") {
      const experienceSection = document.getElementById("experience");
      if (experienceSection) {
        experienceSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  

  const experiences = [
    {
      title: "Student Research Assistant",
      organization: "Independent University, Bangladesh",
      duration: "Jan 2023 - Present",
      description:
        "Collaborated with professors on research projects related to computer vision and machine learning. Assisted in data collection, analysis, and model implementation.",
      lightColor: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white",
      darkColor: "bg-gradient-to-r from-indigo-700 to-purple-800 text-white",
      icon: <FaBriefcase className="text-7xl mb-4" />,
    },
    {
      title: "Freelance Web Designer & Developer",
      organization: "Various Clients",
      duration: "May 2022 - Present",
      description:
        "Worked as a freelance web designer and developer for multiple clients. Designed and developed responsive websites using HTML, CSS, JavaScript, React, Node.js, and MySQL.",
      lightColor: "bg-gradient-to-r from-teal-500 to-green-600 text-white",
      darkColor: "bg-gradient-to-r from-teal-700 to-green-800 text-white",
      icon: <FaLaptopCode className="text-7xl mb-4" />,
    },
    {
      title: "Tutor",
      organization: "Self-Employed",
      duration: "Sep 2020 - Present",
      description:
        "Offered private tutoring services to high school students in subjects like Mathematics, Physics, and ICT. Helped students improve their understanding and performance in their academics.",
      lightColor: "bg-gradient-to-r from-pink-500 to-red-600 text-white",
      darkColor: "bg-gradient-to-r from-pink-700 to-red-800 text-white",
      icon: <FaChalkboardTeacher className="text-7xl mb-4" />,
    },
    {
      title: "Photo Editing & Logo Design",
      organization: "Freelance Projects",
      duration: "Jan 2020 - Dec 2021",
      description:
        "Provided photo editing and logo design services for clients from various industries. Utilized Adobe Photoshop and Illustrator to create visually appealing and professional designs that met clients' requirements.",
      lightColor: "bg-gradient-to-r from-yellow-500 to-orange-600 text-white",
      darkColor: "bg-gradient-to-r from-yellow-700 to-orange-800 text-white",
      icon: <FaPhotoVideo className="text-7xl mb-4" />,
    },
  ];

  return (
    <div
      id="experience"
      className="min-h-screen px-8 py-10 lg:px-40 bg-gray-100 dark:bg-gradient-to-b dark:from-[#220E35] dark:to-[#0E1628] dark:text-white"
    >
      <h1
        className="mt-5 font-bold text-4xl sm:text-5xl text-center flex items-center justify-center space-x-3 decoration-blue-500 dark:decoration-gray-100"
        data-aos="fade-up"
      >
        <FaBriefcase className="text-3xl" /> <span>Experience</span>
      </h1>
  
      <div className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-2 gap-8 px-4 sm:px-6 py-8">
  {experiences.map((exp, index) => (
    <div
      key={index}
      className={`shadow-lg p-6 rounded-xl transition-all duration-700 ease-out hover:shadow-2xl hover:scale-[1.07] hover:rotate-[3deg] ${exp.lightColor} dark:${exp.darkColor} dark:bg-transparent dark:text-white flex flex-col items-center text-center`}
      data-aos="fade-up"
      data-aos-delay={`${index * 200}`}
    >
      {exp.icon}
      <h3 className="text-2xl sm:text-3xl font-semibold dark:text-white">{exp.title}</h3>
      <p className="text-sm mt-2 dark:text-gray-100">{exp.organization}</p>
      <p className="text-sm dark:text-gray-50">{exp.duration}</p>
      <p className="mt-4 text-justify dark:text-gray-50">{exp.description}</p>
    </div>
  ))}
</div>

    </div>
  );
}  
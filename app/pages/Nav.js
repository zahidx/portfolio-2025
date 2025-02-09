"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import DarkModeToggle from "../components/DarkModeToggle";
import MobileNav from "./mobile-nav"; // Import MobileNav component

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const isActive = (section) => (activeSection === section ? "text-red-500" : "");

  return (
    <div className="fixed top-0 w-full bg-gray-100 text-gray-900 dark:bg-[#220E37] dark:text-gray-100 flex justify-between items-center min-h-16 z-20">
      <div className="ml-8 md:ml-48">
        <Link
          href="/"
          className="text-4xl font-extrabold text-gray-900 dark:text-gray-200 dark:hover:text-purple-400 transition-all duration-500 ease-in-out"
          style={{
            fontFamily: "'Dancing Script', cursive",
            textShadow:
              "3px 3px 10px rgba(0, 52, 18, 0.1), 0px 0px 15px rgba(32, 196, 128, 0.1)",
          }}
        >
          Zahid😊
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-8 mr-36 font-semibold">
        <div className="group relative">
          <Link
            href="/#home"
            className={`text-lg text-gray-900 dark:text-gray-200 ${isActive("home")}`}
          >
            🏠 Home
          </Link>
          <span className="absolute bottom-[-6px] left-0 w-0 h-[4px] bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
        </div>

        <div className="group relative">
          <Link
            href="/#about"
            className={`text-lg text-gray-900 dark:text-gray-200 ${isActive("about")}`}
          >
            🔒 About Me
          </Link>
          <span className="absolute bottom-[-6px] left-0 w-0 h-[4px] bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
        </div>

        <div className="group relative">
          <Link
            href="/#skills"
            className={`text-lg text-gray-900 dark:text-gray-200 ${isActive("skills")}`}
          >
            💻 Skills
          </Link>
          <span className="absolute bottom-[-6px] left-0 w-0 h-[4px] bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
        </div>

        <div className="group relative">
          <Link
            href="/#experience"
            className={`text-lg text-gray-900 dark:text-gray-200 ${isActive("experience")}`}
          >
            🛠️ Experience
          </Link>
          <span className="absolute bottom-[-6px] left-0 w-0 h-[4px] bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
        </div>

        <div className="group relative">
          <Link
            href="/#projects"
            className={`text-lg text-gray-900 dark:text-gray-200 ${isActive("projects")}`}
          >
            📁 Projects
          </Link>
          <span className="absolute bottom-[-6px] left-0 w-0 h-[4px] bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
        </div>

        <div className="group relative">
          <Link
            href="/#contact"
            className={`text-lg text-gray-900 dark:text-gray-200 ${isActive("contact")}`}
          >
            📞 Contact
          </Link>
          <span className="absolute bottom-[-6px] left-0 w-0 h-[4px] bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
        </div>

        <div className="group relative">
          <Link
            href="/blog"
            className={`text-lg text-gray-900 dark:text-gray-200 ${isActive("blog")}`}
          >
            📝 Blog
          </Link>
          <span className="absolute bottom-[-6px] left-0 w-0 h-[4px] bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
        </div>

        <DarkModeToggle />
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}

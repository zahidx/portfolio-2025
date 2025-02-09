"use client";

import { useState } from "react";
import Link from "next/link";
import DarkModeToggle from "../components/DarkModeToggle";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Mobile Navigation Bar */}
      <div className="flex justify-between items-center p-4">
        {/* Hamburger icon with animation */}
        <button
          onClick={toggleMenu}
          className={`md:hidden p-4 text-2xl text-gray-900 dark:text-gray-100 transition-all duration-300 ease-in-out transform ${isOpen ? "rotate-45" : ""}`}
        >
          ☰
        </button>
      </div>

      {/* Dark Mode Toggle outside menu toggle, placed to the left */}
      <div className="absolute top-[26px] left-4 z-20 block lg:hidden"> {/* Show on mobile, hide on large screens */}
  <DarkModeToggle />
</div>


      {/* Overlay Effect */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-2/3 h-full bg-gray-900 text-gray-100 dark:bg-[#220E37] transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-20`}
      >
        <div className="flex justify-between items-center p-4">
          <button
            onClick={toggleMenu}
            className="text-3xl text-gray-100 transition-all duration-300 ease-in-out"
          >
            ✖
          </button>
          <div className="flex items-center">
            {/* Add User Profile Section */}
            <div className="flex items-center space-x-3">
              <img
                src="/profile.png"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-gray-100 font-semibold">Zahid</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-8 mt-16">
          <Link
            href="/#home"
            className="relative text-lg text-gray-100 transition-all duration-300 ease-in-out group"
          >
            🏠 Home
            {/* Hover Effect */}
            <span className="absolute bottom-[-6px] left-0 w-0 h-1 bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
          <Link
            href="/#about"
            className="relative text-lg text-gray-100 transition-all duration-300 ease-in-out group"
          >
            🔒 About Me
            <span className="absolute bottom-[-6px] left-0 w-0 h-1 bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
          <Link
            href="/#skills"
            className="relative text-lg text-gray-100 transition-all duration-300 ease-in-out group"
          >
            💻 Skills
            <span className="absolute bottom-[-6px] left-0 w-0 h-1 bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
          <Link
            href="/#experience"
            className="relative text-lg text-gray-100 transition-all duration-300 ease-in-out group"
          >
            🛠️ Experience
            <span className="absolute bottom-[-6px] left-0 w-0 h-1 bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
          <Link
            href="/#projects"
            className="relative text-lg text-gray-100 transition-all duration-300 ease-in-out group"
          >
            📁 Projects
            <span className="absolute bottom-[-6px] left-0 w-0 h-1 bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
          <Link
            href="/#contact"
            className="relative text-lg text-gray-100 transition-all duration-300 ease-in-out group"
          >
            📞 Contact
            <span className="absolute bottom-[-6px] left-0 w-0 h-1 bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
          <Link
            href="/blog"
            className="relative text-lg text-gray-100 transition-all duration-300 ease-in-out group"
          >
            📝 Blog
            <span className="absolute bottom-[-6px] left-0 w-0 h-1 bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}

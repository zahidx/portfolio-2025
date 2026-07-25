"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaHome, FaUser, FaLaptopCode, FaHammer, FaFolder, FaPhone, FaBlog } from "react-icons/fa";
import DarkModeToggle from "../components/DarkModeToggle";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/#home", label: "Home", icon: <FaHome className="text-xl text-blue-500" /> },
    { href: "/#about", label: "About Me", icon: <FaUser className="text-xl text-pink-500" /> },
    { href: "/#skills", label: "Skills", icon: <FaLaptopCode className="text-xl text-green-500" /> },
    { href: "/#experience", label: "Experience", icon: <FaHammer className="text-xl text-yellow-500" /> },
    { href: "/#projects", label: "Projects", icon: <FaFolder className="text-xl text-purple-500" /> },
    { href: "/#contact", label: "Contact", icon: <FaPhone className="text-xl text-teal-500" /> },
    { href: "/blog", label: "Blog", icon: <FaBlog className="text-xl text-orange-500" /> },
  ];

  return (
    <div className="md:hidden">
      {/* Header bar controls: Dark Mode Toggle + Hamburger */}
      <div className="flex items-center space-x-2 mr-4">
        <DarkModeToggle />
        <button
          onClick={toggleMenu}
          className="p-2 text-2xl text-gray-900 dark:text-gray-100 focus:outline-none transition-transform duration-200 active:scale-95"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Slide-out Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 max-w-[80vw] bg-gray-900 text-gray-100 dark:bg-[#1e1b4b] shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-gray-800 dark:border-indigo-900/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/profile.png"
              alt="Zahid"
              className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover"
            />
            <div>
              <h3 className="font-bold text-white">Zahidul Islam</h3>
              <p className="text-xs text-gray-400">Software Engineer</p>
            </div>
          </div>
          <button
            onClick={closeMenu}
            className="text-gray-400 hover:text-white text-xl p-1"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 py-6 px-6 space-y-4 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 dark:hover:bg-indigo-900/40 text-gray-200 hover:text-white transition-colors duration-200"
            >
              {link.icon}
              <span className="font-medium text-base">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-gray-800 dark:border-indigo-900/50 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Zahidul Islam
        </div>
      </div>
    </div>
  );
}

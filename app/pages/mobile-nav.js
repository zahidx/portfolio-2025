"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUser, FaLaptopCode, FaHammer, FaFolder, FaPhone, FaBlog } from "react-icons/fa";
import DarkModeToggle from "../components/DarkModeToggle";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isV1 = pathname === "/v1";

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

  const base = isV1 ? "/v1" : "";
  const navLinks = [
    { href: `${base}/#home`,       label: "Home",       icon: <FaHome className="text-xl text-blue-500" /> },
    { href: `${base}/#about`,      label: "About Me",   icon: <FaUser className="text-xl text-pink-500" /> },
    { href: `${base}/#skills`,     label: "Skills",     icon: <FaLaptopCode className="text-xl text-green-500" /> },
    { href: `${base}/#experience`, label: "Experience", icon: <FaHammer className="text-xl text-yellow-500" /> },
    { href: `${base}/#projects`,   label: "Projects",   icon: <FaFolder className="text-xl text-purple-500" /> },
    { href: `${base}/#contact`,    label: "Contact",    icon: <FaPhone className="text-xl text-teal-500" /> },
    { href: "/blog",               label: "Blog",       icon: <FaBlog className="text-xl text-orange-500" /> },
  ];

  return (
    <div className="lg:hidden">
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
        className={`fixed top-16 inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Slide-out Mobile Menu */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-72 max-w-[80vw] bg-gray-900 text-gray-100 dark:bg-[#1e1b4b] shadow-2xl z-40 transform transition-transform duration-300 ease-out flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
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
        <div className="p-6 border-t border-gray-800 dark:border-indigo-900/50 text-center text-xs text-gray-400 space-y-3">
          {/* Version Switcher */}
          <div className="flex items-center justify-center gap-1 bg-gray-800 rounded-full p-0.5 w-fit mx-auto">
            <Link
              href="/"
              onClick={closeMenu}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                !isV1
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              V2
            </Link>
            <Link
              href="/v1"
              onClick={closeMenu}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                isV1
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              V1
            </Link>
          </div>
          <p>© {new Date().getFullYear()} Zahidul Islam</p>
        </div>
      </div>
    </div>
  );
}

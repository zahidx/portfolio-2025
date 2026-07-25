"use client";

import React, { useState, useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function DarkModeToggle({ className = "" }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Retrieve dark mode preference from localStorage
    const storedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedMode);

    // Apply the initial theme
    if (storedMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    // Apply dark mode classes based on state
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Store preference in localStorage
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`text-2xl focus:outline-none p-2 rounded-lg transition-all duration-300 hover:scale-110 ${className}`}
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? (
        <FiSun className="text-yellow-400 hover:text-yellow-300" />
      ) : (
        <FiMoon className="text-indigo-600 hover:text-indigo-500" />
      )}
    </button>
  );
}

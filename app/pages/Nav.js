"use client"; // Mark this file as a client component

import Link from 'next/link';
import { useState, useEffect } from 'react';
import DarkModeToggle from '../components/DarkModeToggle';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('section'); // Select all sections

    // Set up the Intersection Observer to track which section is in the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id); // Set active section when it's in view
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    sections.forEach((section) => observer.observe(section)); // Start observing each section

    return () => {
      sections.forEach((section) => observer.unobserve(section)); // Clean up observer on unmount
    };
  }, []);

  // Function to apply the active class based on the section in view
  const isActive = (section) => (activeSection === section ? 'text-red-500' : '');

  return (
    <div className="fixed top-0 w-full bg-gray-100 text-gray-900 dark:bg-[#220E37] dark:text-gray-100 flex justify-between items-center min-h-16 z-20 ">
      <div className="ml-8 md:ml-48">
        <Link
          href="/"
          className="text-4xl font-extrabold text-gray-900 dark:text-gray-200 hover:scale-110 dark:hover:text-purple-400 transition-all duration-500 ease-in-out"
          style={{
            fontFamily: "'Dancing Script', cursive",
            textShadow: "3px 3px 10px rgba(0, 52, 18, 0.1), 0px 0px 15px rgba(32, 196, 128, 0.1)",
          }}
        >
          Zahid😊 {/* Emoji added to the title */}
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-8 mr-36 font-semibold">
        <Link
          href="/#home"
          className={`text-lg text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all duration-300 ease-in-out ${isActive('home')}`}
        >
          🏠 Home {/* Emoji added to Home */}
        </Link>
        <Link
          href="/#about"
          className={`text-lg text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all duration-300 ease-in-out ${isActive('about')}`}
        >
          🔒 About Me {/* Emoji added to About Me */}
        </Link>
        <Link
          href="/#skills"
          className={`text-lg text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all duration-300 ease-in-out ${isActive('skills')}`}
        >
          💻 Skills {/* Emoji added to Skills */}
        </Link>
        <Link
          href="/#experience"
          className={`text-lg text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all duration-300 ease-in-out ${isActive('experience')}`}
        >
          🛠️ Experience {/* Emoji added to Experience */}
        </Link>
        <Link
          href="/#projects"
          className={`text-lg text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all duration-300 ease-in-out ${isActive('projects')}`}
        >
          📁 Projects {/* Emoji added to Projects */}
        </Link>
        <Link
          href="/#contact"
          className={`text-lg text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all duration-300 ease-in-out ${isActive('contact')}`}
        >
          📞 Contact {/* Emoji added to Contact */}
        </Link>
        <Link
          href="/blog"
          className={`text-lg text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all duration-300 ease-in-out ${isActive('blog')}`}
        >
          📝 Blog {/* Emoji added to Blog */}
        </Link>

        {/* Dark Mode Toggle */}
        <DarkModeToggle />
      </div>
    </div>
  );
}

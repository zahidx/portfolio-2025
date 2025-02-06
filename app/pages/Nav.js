"use client"; // Add this directive to mark this file as a client component

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Use useRouter from next/navigation
import DarkModeToggle from '../components/DarkModeToggle';

export default function Navbar() {
  const router = useRouter(); // Get the current route
  const isActive = (path) => router.pathname === path ? 'text-red-500' : ''; // Check if the link is active

  return (
    <div className="fixed top-0 w-full bg-gray-100 text-gray-900 dark:bg-[#220E37] dark:text-gray-100 flex justify-between items-center min-h-12 z-20">
      <div className="ml-8 md:ml-48">
        <Link
          href="/"
          className="text-3xl md:text-4xl font-bold text-white-100 dark:text-gray-200 hover:scale-110 dark:hover:text-purple-400 transition-transform duration-500 ease-in-out"
          style={{
            fontFamily: "'Dancing Script', cursive",
            textShadow: "3px 3px 10px rgba(0, 52, 18, 0.1), 0px 0px 15px rgba(32, 196, 128, 0.1)",
          }}
        >
          Zahid
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6 mr-36 font-semibold">
        <Link
          href="/#home"
          className={`text-lg text-gray-900 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 hover:scale-105 transition-all duration-300 ease-in-out ${isActive('/#home')}`}
        >
          Home
        </Link>
        <Link
          href="/#about"
          className={`text-lg text-gray-900 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 hover:scale-105 transition-all duration-300 ease-in-out ${isActive('/#about')}`}
        >
          About Me
        </Link>
        <Link
          href="/#skills"
          className={`text-lg text-gray-900 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 hover:scale-105 transition-all duration-300 ease-in-out ${isActive('/#skills')}`}
        >
          Skills
        </Link>
        <Link
          href="/#experience"
          className={`text-lg text-gray-900 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 hover:scale-105 transition-all duration-300 ease-in-out ${isActive('/#experience')}`}
        >
          Experience
        </Link>
        <Link
          href="/#projects"
          className={`text-lg text-gray-900 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 hover:scale-105 transition-all duration-300 ease-in-out ${isActive('/#projects')}`}
        >
          Projects
        </Link>
        <Link
          href="/#contact"
          className={`text-lg text-gray-900 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 hover:scale-105 transition-all duration-300 ease-in-out ${isActive('/#contact')}`}
        >
          Contact
        </Link>
        <Link
          href="/blog"
          className={`text-lg text-gray-900 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 hover:scale-105 transition-all duration-300 ease-in-out ${isActive('/blog')}`}
        >
          Blog
        </Link>

        {/* Dark Mode Toggle */}
        <DarkModeToggle />
      </div>
    </div>
  );
}

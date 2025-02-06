"use client";
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 w-full bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 min-h-12 px-4 md:px-12 md:hidden">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold text-gray-600 dark:text-gray-200" style={{
          fontFamily: "'Dancing Script', cursive",
          textShadow: "2px 2px 8px rgba(156, 0, 128, 0.8), 0px 0px 12px rgba(32, 196, 128, 0.5)",
        }}>
          <Link href="/">Zahid</Link>
        </div>

        <button className="text-gray-900 dark:text-gray-200 text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✖' : '☰'}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-12 left-0 w-full bg-gray-100 dark:bg-gray-800 p-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-lg text-gray-900 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
              {link.label}
            </Link>
          ))}
          <DarkModeToggle />
        </div>
      )}
    </div>
  );
}

const navLinks = [
  { href: '/.', label: 'Home' },
  { href: '#about', label: 'About Me' },
  { href: '/skill', label: 'Skill' },
  { href: '/experience', label: 'Experience' },
  { href: '/service', label: 'Service' },
  { href: '/project', label: 'Project & Research' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

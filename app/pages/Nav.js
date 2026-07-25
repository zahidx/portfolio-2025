"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Home, User, Laptop, Archive, Folder, Phone, Edit } from "lucide-react";
import DarkModeToggle from "../components/DarkModeToggle";
import MobileNav from "./mobile-nav";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isV1 = pathname === "/v1";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "experience", "projects", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-64px 0px 0px 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [pathname]);

  /* ─────────────── V1 nav links (point to /v1#anchor) ─────────────── */
  const v1NavItems = [
    { href: "/v1#home",       id: "home",       label: "Home",       icon: Home },
    { href: "/v1#about",      id: "about",      label: "About Me",   icon: User },
    { href: "/v1#skills",     id: "skills",     label: "Skills",     icon: Laptop },
    { href: "/v1#experience", id: "experience", label: "Experience", icon: Archive },
    { href: "/v1#projects",   id: "projects",   label: "Projects",   icon: Folder },
    { href: "/v1#contact",    id: "contact",    label: "Contact",    icon: Phone },
    { href: "/blog",          id: "blog",       label: "Blog",       icon: Edit },
  ];

  /* ─────────────── V2 nav links ─────────────── */
  const v2NavItems = [
    { href: "/#home",       id: "home",       label: "Home",       icon: Home },
    { href: "/#about",      id: "about",      label: "About Me",   icon: User },
    { href: "/#skills",     id: "skills",     label: "Skills",     icon: Laptop },
    { href: "/#experience", id: "experience", label: "Experience", icon: Archive },
    { href: "/#projects",   id: "projects",   label: "Projects",   icon: Folder },
    { href: "/#contact",    id: "contact",    label: "Contact",    icon: Phone },
    { href: "/blog",        id: "blog",       label: "Blog",       icon: Edit },
  ];

  /* ─────────── Version switcher pill (shared in both navs) ─────────── */
  const VersionSwitcher = ({ light = false }) => (
    <div
      className={`flex items-center rounded-full p-0.5 gap-0.5 ${
        light
          ? "bg-slate-100 dark:bg-slate-800"
          : "bg-white/20 dark:bg-white/10"
      }`}
    >
      <Link
        href="/"
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
          !isV1
            ? "bg-indigo-600 text-white shadow-sm"
            : light
            ? "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            : "text-white/70 hover:text-white"
        }`}
      >
        V2
      </Link>
      <Link
        href="/v1"
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
          isV1
            ? "bg-indigo-600 text-white shadow-sm"
            : light
            ? "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            : "text-white/70 hover:text-white"
        }`}
      >
        V1
      </Link>
    </div>
  );

  /* ══════════════════════  V1 NAVBAR  ══════════════════════ */
  if (isV1) {
    return (
      <div
        className={`fixed top-0 w-full z-[60] transition-all duration-300 ${
          scrolled
            ? "bg-gray-100/95 dark:bg-[#220E37]/95 backdrop-blur-md shadow-md"
            : "bg-gray-100 dark:bg-[#220E37]"
        } text-gray-900 dark:text-gray-100 flex justify-between items-center min-h-16`}
      >
        {/* Brand */}
        <div className="ml-8 md:ml-16">
          <Link
            href="/v1"
            className="text-4xl font-extrabold text-gray-900 dark:text-gray-200 dark:hover:text-purple-400 transition-all duration-500 ease-in-out"
            style={{
              fontFamily: "'Dancing Script', cursive",
              textShadow:
                "3px 3px 10px rgba(0, 52, 18, 0.1), 0px 0px 15px rgba(32, 196, 128, 0.1)",
            }}
          >
            Zahid
          </Link>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-6 mr-8 font-semibold">
          {v1NavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <div key={item.id} className="group relative">
                <Link
                  href={item.href}
                  className={`text-base text-gray-900 dark:text-gray-200 flex items-center gap-1.5 transition-colors duration-200 ${
                    isActive ? "text-red-500 dark:text-red-400" : ""
                  } hover:text-red-500 dark:hover:text-red-400`}
                >
                  <Icon className="inline-block text-gray-900 dark:text-yellow-400 w-4 h-4" />
                  {item.label}
                </Link>
                <span className="absolute bottom-[-6px] left-0 w-0 h-[4px] bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </div>
            );
          })}

          {/* Version switcher + Dark mode */}
          <div className="flex items-center gap-2 pl-4 border-l border-gray-300 dark:border-gray-700">
            <VersionSwitcher light={false} />
            <DarkModeToggle />
          </div>
        </div>

        {/* Mobile nav */}
        <MobileNav />
      </div>
    );
  }

  /* ══════════════════════  V2 NAVBAR  ══════════════════════ */
  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-[60] transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-slate-900/85 backdrop-blur-md shadow-md border-b border-slate-200/50 dark:border-slate-800/50 py-3"
          : "bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm py-4 border-b border-slate-200/30 dark:border-slate-800/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 text-sm tracking-tighter">
                &lt;Z/&gt;
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Zahid<span className="text-indigo-500">ul</span>
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/60 uppercase tracking-widest">
              DEV
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {v2NavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 font-semibold shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-400 dark:text-slate-400"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pl-3 border-l border-slate-200 dark:border-slate-800 ml-2 flex items-center gap-2">
            <VersionSwitcher light={true} />
            <DarkModeToggle className="hover:bg-slate-100 dark:hover:bg-slate-800" />
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </header>
  );
}

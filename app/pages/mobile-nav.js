"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  User, 
  Laptop, 
  Archive, 
  Folder, 
  Phone, 
  Edit, 
  X, 
  Menu, 
  ChevronRight 
} from "lucide-react";
import DarkModeToggle from "../components/DarkModeToggle";

export default function MobileNav({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isV1 = pathname === "/v1";

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    { 
      href: `${base}/#home`, 
      id: "home", 
      label: "Home", 
      icon: Home, 
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20" 
    },
    { 
      href: `${base}/#about`, 
      id: "about", 
      label: "About Me", 
      icon: User, 
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20" 
    },
    { 
      href: `${base}/#skills`, 
      id: "skills", 
      label: "Skills", 
      icon: Laptop, 
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
    },
    { 
      href: `${base}/#experience`, 
      id: "experience", 
      label: "Experience", 
      icon: Archive, 
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20" 
    },
    { 
      href: `${base}/#projects`, 
      id: "projects", 
      label: "Projects", 
      icon: Folder, 
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20" 
    },
    { 
      href: `${base}/#contact`, 
      id: "contact", 
      label: "Contact", 
      icon: Phone, 
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" 
    },
    { 
      href: "/blog", 
      id: "blog", 
      label: "Blog", 
      icon: Edit, 
      color: "text-orange-400 bg-orange-500/10 border-orange-500/20" 
    },
  ];

  return (
    <div className="lg:hidden">
      {/* Header bar controls: Dark Mode Toggle + Hamburger button */}
      <div className="flex items-center gap-2">
        <DarkModeToggle className="hover:bg-slate-100 dark:hover:bg-slate-800" />
        <button
          onClick={toggleMenu}
          className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 focus:outline-none transition-all duration-200 active:scale-95 border border-slate-200/60 dark:border-slate-800/80"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6 text-indigo-500" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Render Mobile Drawer via Portal on document.body to bypass parent backdrop-blur containing block */}
      {mounted &&
        createPortal(
          <>
            {/* Backdrop Overlay */}
            <div
              className={`fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[9998] transition-opacity duration-300 ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
              onClick={closeMenu}
            />

            {/* Slide-out Mobile Menu Panel */}
            <aside
              className={`fixed top-0 right-0 bottom-0 h-full h-[100dvh] w-80 max-w-[85vw] bg-slate-900 dark:bg-[#0b0f19] text-white border-l border-slate-800 shadow-2xl z-[9999] transform transition-transform duration-300 ease-out flex flex-col justify-between ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-800 shrink-0">
                <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-sm">
                    <div className="w-full h-full bg-slate-900 rounded-[6px] flex items-center justify-center">
                      <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400 text-xs">
                        &lt;Z/&gt;
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-black tracking-tight text-white">
                      Zahid<span className="text-indigo-400">ul</span>
                    </span>
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-indigo-950 text-indigo-400 border border-indigo-800">
                      DEV
                    </span>
                  </div>
                </Link>

                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Navigation Links */}
              <div className="flex-1 min-h-0 py-4 px-4 space-y-2 overflow-y-auto">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.id;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`group flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 border ${
                        isActive
                          ? "bg-indigo-950/80 border-indigo-800/90 text-white shadow-sm"
                          : "border-transparent text-slate-300 hover:text-white hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-lg border transition-transform duration-200 group-hover:scale-110 ${link.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span
                          className={`font-semibold text-sm transition-colors ${
                            isActive ? "text-indigo-400" : "text-slate-200 group-hover:text-white"
                          }`}
                        >
                          {link.label}
                        </span>
                      </div>

                      <div className="flex items-center">
                        {isActive ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-950/90 shrink-0 space-y-3">
                {/* Version Switcher */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-slate-400">Version</span>
                  <div className="flex items-center rounded-full p-0.5 gap-0.5 bg-slate-800 border border-slate-700">
                    <Link
                      href="/"
                      onClick={closeMenu}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                        !isV1
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      V2
                    </Link>
                    <Link
                      href="/v1"
                      onClick={closeMenu}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                        isV1
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      V1
                    </Link>
                  </div>
                </div>

                <div className="pt-1 text-center text-[11px] text-slate-500 font-medium">
                  © {new Date().getFullYear()} Zahidul Islam. All rights reserved.
                </div>
              </div>
            </aside>
          </>,
          document.body
        )}
    </div>
  );
}

"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import GithubActivityGraph from "./components/GithubActivityGraph";
import VisitorGlobe from "./components/VisitorGlobe";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Experience from "./pages/Experience";
import Extra from "./pages/Extra";
import Footer from "./pages/Footer";
import Hobby from "./pages/Hobby";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Services from "./pages/Services";
import Skills from "./pages/Skill";

export default function Page() {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const deferredPrompt = useRef(null);
  const installButtonTimeout = useRef(null);

  // Register Service Worker for PWA
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("Service Worker registered!", reg))
        .catch((err) =>
          console.log("Service Worker registration failed:", err)
        );
    }
  }, []);

  // Listen for the beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setShowInstallButton(true); // Show button initially
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Clean up the event listener when the component unmounts
    return () =>
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  // Manage showing and hiding the install button every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (deferredPrompt.current) {
        setShowInstallButton(true); // Show the button
        // Hide the button after 2 seconds
        installButtonTimeout.current = setTimeout(() => {
          setShowInstallButton(false);
        }, 2000);
      }
    }, 10000); // Every 10 seconds

    // Clear the interval and timeout on cleanup
    return () => {
      clearInterval(interval);
      if (installButtonTimeout.current) {
        clearTimeout(installButtonTimeout.current);
      }
    };
  }, []);

  // Handler for the install button click
  const handleInstallClick = async () => {
    setShowInstallButton(false); // Hide the button
    if (!deferredPrompt.current) return;
    deferredPrompt.current.prompt();
    const choiceResult = await deferredPrompt.current.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }
    deferredPrompt.current = null;
  };

  return (
    <>
      <div>
        <Home />
        <About />
        <Skills />
        <GithubActivityGraph />
        <VisitorGlobe />
        <Experience />
        <Services />
        <Project />
        <Extra />
        <Hobby />
        <Contact />
        <Footer />

        {/* Conditionally render the install button */}
        {showInstallButton && (
          <button
            onClick={handleInstallClick}
            className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-95 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
            aria-label="Install this app"
          >
            <Download className="w-4 h-4" />
            <span>Install App</span>
          </button>
        )}
      </div>
    </>
  );
}

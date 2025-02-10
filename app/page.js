"use client";
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import About from "./pages/About";
import Skills from "./pages/Skill";
import Experience from "./pages/Experience";
import Services from "./pages/Services";
import Project from "./pages/Project";
import Extra from "./pages/Extra";
import Hobby from "./pages/Hobby";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import HashLoader from "react-spinners/HashLoader"; // Import HashLoader
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const deferredPrompt = useRef(null);
  const installButtonTimeout = useRef(null);

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>

      <div>
        {loading ? (
          <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <HashLoader color="#0015ff" size={100} />
          </div>
        ) : (
          <>
            <Home />
            <About />
            <Skills />
            <Experience />
            <Services />
            <Project />
            <Extra />
            <Hobby />
            <Contact />
            <Footer />
          </>
        )}

        {/* Conditionally render the install button */}
        {showInstallButton && (
          <button
            onClick={handleInstallClick}
            className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 p-3  text-white rounded-lg shadow-xl transition-transform duration-300 transform hover:scale-105 "
          >
            
          </button>
        )}
      </div>
    </>
  );
}

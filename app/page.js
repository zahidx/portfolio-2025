"use client";
import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Register Service Worker for PWA
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((reg) => console.log("Service Worker registered!", reg))
        .catch((err) => console.log("Service Worker registration failed:", err));
    }
  }, []);
  
  useEffect(() => {
    let deferredPrompt;
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if (window.confirm("Would you like to install this app?")) {
        deferredPrompt.prompt();
      }
    });
  }, []);
  

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
      </div>
    </>
  );
}

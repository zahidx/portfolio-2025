"use client";
import React, { useState, useEffect } from "react";
import About from "./pages/About";
import Skills from "./pages/Skill";
import Experence from "./pages/Experience";
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
    const timer = setTimeout(() => setLoading(false), 2000); // 2-second loader
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
          <HashLoader color="#00BFFF" size={80} />
        </div>
      ) : (
        <>
          <Home />
          <About />
          <Skills />
          <Experence />
          <Services />
          <Project />
          <Extra />
          <Hobby />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
}

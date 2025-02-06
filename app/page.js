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
import { Puff } from "react-loader-spinner"; // Corrected import for Puff loader
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a page loading time
    const timer = setTimeout(() => setLoading(false), 2000); // 2-second loader

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <Puff
            color="#00BFFF" // Color of the loader
            height={100} // Height of the loader
            width={100} // Width of the loader
          />
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

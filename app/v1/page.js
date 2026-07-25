"use client";
import React from "react";
import V1Home from "../v1-pages/Home";
import V1About from "../v1-pages/About";
import V1SkillPage from "../v1-pages/Skill";
import V1ExperiencePage from "../v1-pages/Experience";
import V1ServicePage from "../v1-pages/Services";
import V1ProjectsPage from "../v1-pages/Project";
import V1ExtraCurricularPage from "../v1-pages/Extra";
import V1Hobbies from "../v1-pages/Hobby";
import V1Contact from "../v1-pages/Contact";
import V1Footer from "../v1-pages/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function V1Page() {
  return (
    <div>
      <V1Home />
      <V1About />
      <V1SkillPage />
      <V1ExperiencePage />
      <V1ServicePage />
      <V1ProjectsPage />
      <V1ExtraCurricularPage />
      <V1Hobbies />
      <V1Contact />
      <V1Footer />
    </div>
  );
}

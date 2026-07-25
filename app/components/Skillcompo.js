"use client";
import React, { useEffect, useRef } from "react";

export default function SkillsSection() {
  const skills = [
    { name: "HTML", color: "bg-[#E54C21]" },
    { name: "CSS", color: "bg-[#264EE4]" },
    { name: "JavaScript", color: "bg-[#F29111]" },
    { name: "React", color: "bg-[#258aa1]" },
    { name: "Node.js", color: "bg-[#3FC066]" },
    { name: "MongoDB", color: "bg-[#12924F]" },
    { name: "Git", color: "bg-[#E74E30]" },
    { name: "GitHub", color: "bg-[#080808]" },
    { name: "VS Code", color: "bg-[#0889D2]" },
    { name: "Bootstrap", color: "bg-[#7511F6]" },
    { name: "Vue.js", color: "bg-[#2a9666]" },
    { name: "TypeScript", color: "bg-[#3178C6]" },
  ];

  const cardRefs = useRef([]);

  useEffect(() => {
    const observers = cardRefs.current.map((el, index) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.transitionDelay = `${index * 60}ms`;
            el.classList.add("skill-visible");
            observer.unobserve(el);
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((obs) => obs && obs.disconnect());
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-100 dark:bg-slate-900 py-12 overflow-hidden dark:text-white">
      <h3 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-300 mb-20 pt-5">
        Web
      </h3>

      <style>{`
        .skill-card {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
          transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.3s ease;
        }
        .skill-card.skill-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .skill-card:hover {
          transform: translateY(-6px) scale(1.04);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
        }
      `}</style>

      <div className="max-w-5xl p-5 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 relative z-10">
        {skills.map((skill, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`skill-card flex items-center justify-center p-4 rounded-lg shadow-md ${skill.color}`}
            style={{
              width: "120px",
              height: "120px",
            }}
          >
            <p className="text-center text-white font-semibold dark:text-gray-200">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

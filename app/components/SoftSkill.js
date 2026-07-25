"use client";
import { useEffect, useRef } from "react";

export default function SoftSkillPage() {
  const softSkills = [
    { name: "Problem Solving", color: "bg-[#6A0DAD]", emoji: "🧩" },
    { name: "Teamwork", color: "bg-[#1E40AF]", emoji: "🤝" },
    { name: "Communication", color: "bg-[#2F855A]", emoji: "💬" },
    { name: "Time Management", color: "bg-[#ba8c14]", emoji: "⏰" },
    { name: "MS Office", color: "bg-[#D32F2F]", emoji: "💻" },
    { name: "Critical Thinking", color: "bg-[#4C51BF]", emoji: "🤔" },
    { name: "Adaptability", color: "bg-[#38B2AC]", emoji: "🌱" },
    { name: "Leadership", color: "bg-[#DD6B20]", emoji: "👑" },
    { name: "Creativity", color: "bg-[#D61C72]", emoji: "🎨" },
    { name: "Management", color: "bg-[#00B5D8]", emoji: "📈" },
    { name: "Collaboration", color: "bg-[#a86a20]", emoji: "🤗" },
    { name: "Decision Making", color: "bg-[#2B6CB0]", emoji: "💡" },
    { name: "Attention to Detail", color: "bg-[#38B2AC]", emoji: "🔍" },
    { name: "Negotiation", color: "bg-[#9B2C2C]", emoji: "🤝💬" },
  ];

  const cardRefs = useRef([]);

  useEffect(() => {
    const observers = cardRefs.current.map((el, index) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.transitionDelay = `${index * 55}ms`;
            el.classList.add("soft-visible");
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
    <div
      id="softSkills"
      className="bg-slate-100 dark:bg-slate-900 py-1 dark:text-white"
    >
      {/* Page Heading */}
      <h3 className="font-bold text-2xl text-center text-blue-600 dark:text-blue-300 pt-4 pb-0 sm:pt-16 sm:pb-12">
        Soft Skills
      </h3>

      {/* Animation styles */}
      <style>{`
        .soft-card {
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.3s ease;
        }
        .soft-card:nth-child(even) {
          transform: translateX(24px);
        }
        .soft-card.soft-visible {
          opacity: 1;
          transform: translateX(0);
        }
        .soft-card:hover {
          transform: translateX(6px) scale(1.03);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      {/* Soft Skills Grid */}
      <div className="w-full mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-6 px-6 py-8">
        {softSkills.map((skill, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`soft-card h-10 w-full sm:w-44 flex items-center justify-center p-4 rounded-lg shadow-md text-white font-semibold text-center dark:shadow-lg ${skill.color}`}
          >
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  );
}

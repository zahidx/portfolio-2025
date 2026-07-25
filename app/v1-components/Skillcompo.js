"use client";
import React from "react";

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

  return (
    <div className="relative min-h-screen bg-gray-100 py-12 overflow-hidden dark:bg-gradient-to-b dark:from-[#270C48] dark:to-[#220E36] dark:text-white">
      <h1 className="text-2xl font-bold text-center bg-clip-text text-blue-600 dark:text-blue-300 mb-20 pt-5">
        Web
      </h1>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .bouncing {
          animation: bounce 3s infinite ease-in-out;
        }
      `}</style>

      <div className="max-w-5xl p-5 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 relative z-10">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`flex items-center justify-center p-4 rounded-lg shadow-md ${skill.color} bouncing`}
            style={{
              width: "120px",
              height: "120px",
              animationDelay: `${index * 0.3}s`,
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

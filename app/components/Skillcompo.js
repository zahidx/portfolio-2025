"use client";
import React from "react";

export default function SkillsSection() {
  const skills = [
    { name: "HTML", color: "bg-yellow-300" },
    { name: "CSS", color: "bg-blue-300" },
    { name: "JavaScript", color: "bg-yellow-500" },
    { name: "React", color: "bg-blue-500" },
    { name: "Node.js", color: "bg-green-500" },
    { name: "MongoDB", color: "bg-green-300" },
    { name: "Git", color: "bg-red-400" },
    { name: "GitHub", color: "bg-gray-800" },
    { name: "VS Code", color: "bg-blue-800" },
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

      <div className="max-w-5xl p-5 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`flex items-center justify-center p-4 rounded-lg shadow-md ${skill.color} bouncing dark:${skill.color.replace(
              "bg",
              "dark:bg"
            )}`}
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

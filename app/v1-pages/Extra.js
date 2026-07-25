"use client";

import React, { useEffect, useRef } from "react";
import { FaMicrophone, FaHandsHelping, FaFutbol, FaGamepad, FaReact } from "react-icons/fa";

export default function V1ExtraCurricularPage() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.8;

      cardRefs.current.forEach((card) => {
        if (card) {
          const rect = card.getBoundingClientRect();

          if (rect.top < triggerPoint) {
            card.style.opacity = 1;
            card.style.transform = "translateY(0)";
          } else {
            card.style.opacity = 0;
            card.style.transform = "translateY(40px)";
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    {
      title: "Debating Society",
      description: "Participated in inter-school debates and won awards for public speaking and critical thinking.",
      cardGradient: "bg-gradient-to-r from-blue-600 to-cyan-600",
      icon: <FaMicrophone className="text-4xl text-white" />,
    },
    {
      title: "Community Service",
      description: "Actively involved in volunteering at local charity organizations, contributing to social causes.",
      cardGradient: "bg-gradient-to-r from-green-600 to-teal-600",
      icon: <FaHandsHelping className="text-4xl text-white" />,
    },
    {
      title: "Sports",
      description: "Played cricket and represented the school team in regional tournaments.",
      cardGradient: "bg-gradient-to-r from-yellow-500 to-yellow-400",
      icon: <FaFutbol className="text-4xl text-white" />,
    },
    {
      title: "Gaming",
      description: "Played many esports tournaments and won awards.",
      cardGradient: "bg-gradient-to-r from-purple-600 to-pink-500",
      icon: <FaGamepad className="text-4xl text-white" />,
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-100 to-cyan-50 dark:bg-gradient-to-r dark:from-[#0E1628] dark:to-[#380643] overflow-x-hidden">
      <div className="relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-indigo-600 dark:text-indigo-400 tracking-wide pt-10 mb-8 sm:mb-0">
          Extra-Curricular Activities
        </h1>
      </div>

      <div className="items-center justify-center h-24 w-24 sm:h-32 sm:w-32 rounded-full -mb-10 ml-12 hidden md:block">
        <FaReact className="text-4xl sm:text-6xl text-indigo-600 dark:text-indigo-400 animate-rotate-icon" />
      </div>

      <style>{`
        @keyframes rotateIcon {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-rotate-icon {
          animation: rotateIcon 10s linear infinite;
        }
      `}</style>

      <div className="pb-10 relative mx-auto max-w-4xl space-y-4">
        {sections.map((section, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`relative flex items-center gap-4 p-6 rounded-lg shadow-lg transition-all duration-[800ms] ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] ${section.cardGradient}`}
            style={{ opacity: 0, transform: "translateY(40px)" }}
          >
            <div className="flex-shrink-0">{section.icon}</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-50 dark:text-gray-200">{section.title}</h2>
              <p className="mt-2 text-sm sm:text-base text-gray-50 dark:text-gray-300 font-medium">{section.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

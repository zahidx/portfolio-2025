"use client";

import React, { useEffect, useRef } from "react";
import { FaMicrophone, FaHandsHelping, FaFutbol, FaGamepad, FaReact } from "react-icons/fa";

export default function ExtraCurricularPage() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.8; // Trigger animation when 80% of the card is in view

      cardRefs.current.forEach((card) => {
        if (card) {
          const rect = card.getBoundingClientRect();

          // Show animation
          if (rect.top < triggerPoint) {
            card.style.opacity = 1;
            card.style.transform = "translateY(0)";
          } else {
            // Hide animation (smooth)
            card.style.opacity = 0;
            card.style.transform = "translateY(40px)";
          }
        }
      });
    };

    // Attach scroll event
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    {
      title: "Debating Society",
      description:
        "Participated in inter-school debates and won awards for public speaking and critical thinking.",
      cardGradient: "bg-gradient-to-r from-blue-600 to-cyan-600", // Normal mode gradient
      cardDark: "bg-gradient-to-r from-blue-900 to-cyan-900", // Dark mode gradient
      icon: <FaMicrophone className="text-4xl text-white" />,
    },
    {
      title: "Community Service",
      description:
        "Actively involved in volunteering at local charity organizations, contributing to social causes.",
      cardGradient: "bg-gradient-to-r from-green-600 to-teal-600",
      cardDark: "bg-gradient-to-r from-green-900 to-teal-900", // Dark mode gradient
      icon: <FaHandsHelping className="text-4xl text-white" />,
    },
    {
      title: "Sports",
      description:
        "Played cricket and represented the school team in regional tournaments.",
      cardGradient: "bg-gradient-to-r from-yellow-500 to-yellow-400",
      cardDark: "bg-gradient-to-r from-yellow-700 to-yellow-600", // Dark mode gradient
      icon: <FaFutbol className="text-4xl text-white" />,
    },
    {
      title: "Gaming",
      description: "Played many esports tournaments and won awards.",
      cardGradient: "bg-gradient-to-r from-purple-600 to-pink-500",
      cardDark: "bg-gradient-to-r from-purple-800 to-pink-700", // Dark mode gradient
      icon: <FaGamepad className="text-4xl text-white" />,
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-100 to-cyan-50 dark:bg-gradient-to-r dark:from-[#0E1628] dark:to-[#380643] overflow-x-hidden">
      {/* Page Heading */}
      <div className="relative z-10">
        <h1 className="text-5xl font-extrabold text-center text-indigo-600 dark:text-indigo-400 -mb-14 tracking-wide pt-10">
          Extra-Curricular Activities
        </h1>
      </div>

      {/* React Icon Inside Card */}
      <div className="flex items-center justify-center h-32 w-32 rounded-full bg-blue-100 dark:bg-gray-800 ml-10">
        <FaReact className="text-6xl text-indigo-600 dark:text-indigo-400 animate-rotate-icon" />
      </div>

      <style>{`
        @keyframes rotateIcon {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-rotate-icon {
          animation: rotateIcon 10s linear infinite; /* Increased duration to 10s for slower rotation */
        }
      `}</style>

      {/* Scroll Cards */}
      <div className="pb-10 relative mx-auto max-w-4xl space-y-4">
        {sections.map((section, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`relative flex items-center gap-4 p-6 rounded-lg shadow-lg transition-all duration-[800ms] ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] ${section.cardGradient} dark:${section.cardDark} shadow-lg`}
            style={{
              opacity: 0, // Hidden by default
              transform: "translateY(40px)", // Initial position
            }}
          >
            {/* Icon on the left */}
            <div className="flex-shrink-0">{section.icon}</div>

            {/* Content */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-50 dark:text-gray-200">{section.title}</h2>
              <p className="mt-2 text-base text-gray-50 dark:text-gray-300 font-medium">{section.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

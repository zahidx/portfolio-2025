"use client";
import React from "react";

export default function Address() {
  return (
    <div className="flex justify-start items-center py-16 px-8 -ml-28 sm:-ml-28  ">
      <div className="grid grid-cols-3 gap-10 w-full">
        {/* Home Icon */}
        <div className="flex flex-col items-center">
          <div className="icon-container home-icon w-24 h-24 bg-indigo-500 text-white flex justify-center items-center rounded-full shadow-lg">
            <i className="fas fa-home text-4xl"></i>
          </div>
        </div>

        {/* Phone Icon */}
        <div className="flex flex-col items-center">
          <div className="icon-container phone-icon w-24 h-24 bg-green-500 text-white flex justify-center items-center rounded-full shadow-lg">
            <i className="fas fa-phone text-4xl"></i>
          </div>
        </div>

        {/* Email Icon */}
        <div className="flex flex-col items-center">
          <div className="icon-container email-icon w-24 h-24 bg-red-500 text-white flex justify-center items-center rounded-full shadow-lg">
            <i className="fas fa-envelope text-4xl"></i>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .icon-container {
          animation: floatHorizontal 7s ease-in-out infinite;
        }

        @keyframes floatHorizontal {
          0% {
            transform: translateX(-80px);
          }
          50% {
            transform: translateX(80px);
          }
          100% {
            transform: translateX(-80px);
          }
        }

        /* Specific adjustments for staggered animations */
        .home-icon {
          animation-delay: 0.8s;
        }
        .phone-icon {
          animation-delay: 0.4s;
        }
        .email-icon {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
}

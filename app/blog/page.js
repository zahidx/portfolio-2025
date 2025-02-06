'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Quite from './Quite';
import { Inter } from "next/font/google";
import Interest from "./Interest";


const Page = () => {
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    setTyping(true); // Start typing animation immediately
  }, []);

  return (
    <div className="pt-36 pb-10 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-8 py-12">
      {/* Header Section */}
      <header className="text-center mb-16">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
          style={{
            lineHeight: "1.2", // Prevents clipping
            whiteSpace: "nowrap", // Ensures text doesn't wrap
          }}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Welcome to My Lifestyle
        </motion.h1>
        {/* Typing animation for "A glimpse..." */}
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className={typing ? "typing-animation" : ""}>
            A glimpse into my interests, facts, and favorite quotes.
          </span>
        </motion.p>
      </header>

      {/* Main Content */}
      <Quite />
      <Interest />

      {/* Add the CSS for typing animation */}
      <style jsx>{`
        .typing-animation {
          display: inline-block;
          font-family: monospace;
          white-space: nowrap;
          overflow: hidden;
          width: 0;
          animation: typing 4s steps(30) infinite, blink 0.75s step-end infinite;
        }

        @keyframes typing {
          to {
            width: 100%;
          }
        }

        @keyframes blink {
          50% {
            border-color: transparent;
          }
        }
      `}</style>
    </div>
  );
};

export default Page;

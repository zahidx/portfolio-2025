'use client';

import React from "react";
import { motion } from "framer-motion";

const Interest = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Section 1: Life Facts */}
      <motion.div
        className="p-8 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transform transition hover:scale-105"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-semibold text-purple-500 mb-4">Life Facts</h2>
        <ul className="space-y-4 text-gray-300">
          <li>📚 I am passionate about learning and growth.</li>
          <li>🌍 I love exploring new cultures and ideas.</li>
          <li>🎨 Creativity is at the heart of everything I do.</li>
          <li>💻 Tech enthusiast with a knack for problem-solving.</li>
        </ul>
      </motion.div>

      {/* Section 2: Favorite Quotes */}
      <motion.div
        className="p-8 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transform transition hover:scale-105"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl font-semibold text-red-500 mb-4"
          animate={{
            y: [0, -10, 0], // Very subtle movement
          }}
          transition={{
            duration: 1, // Duration of one cycle
            repeat: Infinity, // Infinite loop
            repeatType: "reverse", // Reverses smoothly
            ease: "easeInOut", // Smooth easing
          }}
        >
          Favorite Quotes
        </motion.h2>
        <ul className="space-y-4 text-gray-300 italic">
          <li>🌟 "The only limit to our realization of tomorrow is our doubts of today."</li>
          <li>💡 "Success is not final, failure is not fatal: It is the courage to continue that counts."</li>
          <li>🔥 "Do what you can, with what you have, where you are."</li>
          <li>✨ "Believe you can, and you're halfway there."</li>
        </ul>
      </motion.div>
    </main>
  );
};

export default Interest;

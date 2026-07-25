"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

const blocks = [
  { name: "Coding", color: "bg-[#007AFF]", detail: "Building web applications, exploring new frameworks, and solving algorithmic challenges." },
  { name: "Research", color: "bg-[#8E44AD]", detail: "Investigating AI, computer vision, and human-robot interaction." },
  { name: "Design", color: "bg-[#32CD32]", detail: "Crafting UI/UX layouts, graphics, and interactive user interfaces." },
  { name: "Travel", color: "bg-[#FF8C00]", detail: "Discovering new destinations, nature, and cultural experiences." },
  { name: "Gaming", color: "bg-[#FF1493]", detail: "Competing in esports and enjoying immersive story-driven games." },
  { name: "Learning", color: "bg-[#FF6347]", detail: "Continuously growing technical skills and reading self-help & fiction books." },
  { name: "Music", color: "bg-[#FF69B4]", detail: "Listening to uplifting music during work and relaxation sessions." },
  { name: "Fitness", color: "bg-[#00BFFF]", detail: "Staying active through sports, cricket, and outdoor activities." },
  { name: "Projects", color: "bg-[#FF9F43]", detail: "Creating open-source tools, full-stack web apps, and AI experiments." },
];

const Interest = () => {
  const [selectedBlock, setSelectedBlock] = useState(null);

  const generateRandomMovement = useMemo(() => {
    return blocks.reduce((acc, block) => {
      acc[block.name] = {
        x: [0, Math.random() * 250 - 125, 0],
        y: [100, 150, 100],
        transition: {
          duration: Math.random() * 4 + 3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        },
      };
      return acc;
    }, {});
  }, []);

  const activeBlock = blocks.find((b) => b.name === selectedBlock);

  return (
    <div className="pt-24 pb-10 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 sm:px-12">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Life Event Highlights
      </h2>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {blocks.map((block) => (
          <motion.div
            key={block.name}
            className={`p-6 max-w-xs sm:max-w-sm lg:max-w-[180px] ${block.color} rounded-lg shadow-lg cursor-pointer text-center`}
            animate={generateRandomMovement[block.name]}
            onClick={() => setSelectedBlock(block.name)}
            whileTap={{ scale: 0.9 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold">{block.name}</h3>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedBlock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="relative bg-gray-900 text-white p-6 sm:p-8 rounded-lg max-w-md w-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              {activeBlock?.name}
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              {activeBlock?.detail}
            </p>
            <button
              className="absolute top-3 right-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              onClick={() => setSelectedBlock(null)}
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Interest;

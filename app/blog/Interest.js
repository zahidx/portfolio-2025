"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

const blocks = [
  { name: "Today", color: "bg-[#007AFF]" },
  { name: "Milk", color: "bg-[#FFD700]" },
  { name: "Butter", color: "bg-[#32CD32]" },
  { name: "Peanuts", color: "bg-[#FF8C00]" },
  { name: "Beans", color: "bg-[#FF1493]" },
  { name: "Carrot", color: "bg-[#FF6347]" },
  { name: "Sweet", color: "bg-[#FF69B4]" },
  { name: "Ice", color: "bg-[#00BFFF]" },
  { name: "Love", color: "bg-[#FFDAB9]" },
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
              {selectedBlock} Details
            </h2>
            <p className="text-sm sm:text-base">
              Here are some details about {selectedBlock}.
            </p>
            <button
              className="absolute top-3 right-3 px-4 py-2 bg-red-500 text-white rounded-lg"
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

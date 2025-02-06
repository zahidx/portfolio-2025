'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";

const Interest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState("");

  // Function to handle opening the modal
  const openModal = (blockName) => {
    setSelectedBlock(blockName);
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlock("");
  };

  // Function to generate random movement for each block with smoother transitions
  const generateRandomMovement = (blockName) => {
    const randomX = Math.random() * 300 - 150;
    const randomY = Math.random() * 100 + 200;

    return {
      x: [0, randomX, 0, randomX, 0],
      y: [randomY, randomY, randomY, randomY, randomY],
      transition: {
        duration: Math.random() * 4 + 3, // Random duration between 3s and 7s
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeOut", // Smooth easing for smoother transitions
      },
    };
  };

  return (
    <div className="pt-36 pb-10 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-8 py-12">
      {/* Section with left and right padding */}
      <div className="px-12 py-8">
        <h2 className="text-3xl font-semibold text-white -mb-24">Life Event Highlights</h2>

        {/* Colorful blocks with random movement */}
        <div className="flex space-x-4 relative">
          <motion.div
            className="w-36 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg cursor-pointer"
            initial={{ x: 0, y: 0 }}
            animate={generateRandomMovement("Today")}
            onClick={() => openModal("Today")}
          >
            <h3 className="text-2xl font-bold text-white">Today</h3>
          </motion.div>

          <motion.div
            className="w-48 p-6 bg-gradient-to-r from-yellow-400 to-red-500 rounded-lg shadow-lg cursor-pointer"
            initial={{ x: 0, y: 0 }}
            animate={generateRandomMovement("Power Milk")}
            onClick={() => openModal("Power Milk")}
          >
            <h3 className="text-2xl font-bold text-white">Power Milk</h3>
          </motion.div>

          <motion.div
            className="w-36 p-6 bg-gradient-to-r from-green-400 to-teal-500 rounded-lg shadow-lg cursor-pointer"
            initial={{ x: 0, y: 0 }}
            animate={generateRandomMovement("Butter")}
            onClick={() => openModal("Butter")}
          >
            <h3 className="text-2xl font-bold text-white">Butter</h3>
          </motion.div>

          <motion.div
            className="w-36 p-6 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg shadow-lg cursor-pointer"
            initial={{ x: 0, y: 0 }}
            animate={generateRandomMovement("Peanuts")}
            onClick={() => openModal("Peanuts")}
          >
            <h3 className="text-2xl font-bold text-white">Peanuts</h3>
          </motion.div>

          {/* New Blocks */}
          <motion.div
            className="w-36 p-6 bg-gradient-to-r from-pink-500 to-purple-700 rounded-lg shadow-lg cursor-pointer"
            initial={{ x: 0, y: 0 }}
            animate={generateRandomMovement("Beans")}
            onClick={() => openModal("Beans")}
          >
            <h3 className="text-2xl font-bold text-white">Beans</h3>
          </motion.div>

          <motion.div
            className="w-36 p-6 bg-gradient-to-r from-orange-500 to-yellow-700 rounded-lg shadow-lg cursor-pointer"
            initial={{ x: 0, y: 0 }}
            animate={generateRandomMovement("Carrot")}
            onClick={() => openModal("Carrot")}
          >
            <h3 className="text-2xl font-bold text-white">Carrot</h3>
          </motion.div>

          <motion.div
            className="w-36 p-6 bg-gradient-to-r from-pink-300 to-red-500 rounded-lg shadow-lg cursor-pointer"
            initial={{ x: 0, y: 0 }}
            animate={generateRandomMovement("Sweet")}
            onClick={() => openModal("Sweet")}
          >
            <h3 className="text-2xl font-bold text-white">Sweet</h3>
          </motion.div>

          <motion.div
            className="w-36 p-6 bg-gradient-to-r from-blue-300 to-indigo-500 rounded-lg shadow-lg cursor-pointer"
            initial={{ x: 0, y: 0 }}
            animate={generateRandomMovement("Ice")}
            onClick={() => openModal("Ice")}
          >
            <h3 className="text-2xl font-bold text-white">Ice</h3>
          </motion.div>

          <motion.div
            className="w-36 p-6 bg-gradient-to-r from-yellow-300 to-orange-500 rounded-lg shadow-lg cursor-pointer"
            initial={{ x: 0, y: 0 }}
            animate={generateRandomMovement("Love")}
            onClick={() => openModal("Love")}
          >
            <h3 className="text-2xl font-bold text-white">Love</h3>
          </motion.div>
        </div>
      </div>

      {/* Modal to show details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="relative bg-gray-900 text-white p-8 rounded-lg max-w-lg w-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 border-2 border-green-500 animate-border rounded-lg"></div>
            <h2 className="text-3xl font-semibold mb-4 z-10">{selectedBlock} Details</h2>
            <p className="z-10">
              Here are some details about {selectedBlock}. This is where you can display more information or any extra content about the selected block.
            </p>
            <button
              className="absolute top-4 right-4 px-6 py-2 bg-red-500 text-white rounded-lg z-20"
              onClick={closeModal}
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      {/* Add the CSS for typing animation and border animation */}
      <style jsx>{`
        @keyframes animate-border {
          0% {
            border-width: 2px;
          }
          50% {
            border-width: 4px;
          }
          100% {
            border-width: 2px;
          }
        }

        .animate-border {
          animation: animate-border 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Interest;

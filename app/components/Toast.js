// Toast.js
"use client";

import React, { useState, useEffect } from "react";

export const Toast = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Toast will disappear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white p-4 rounded-lg shadow-lg">
      {message}
    </div>
  );
};

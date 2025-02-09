// Contact.js
"use client";

import React, { useState } from "react";
import { db, addDoc, collection } from "../components/firebase"; // Import Firestore methods
import Address from "../components/Address";
import { Toast } from "../components/Toast"; // Import Toast component

export default function Contact() {
  // State for form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [toastMessage, setToastMessage] = useState(""); // Toast message state

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const docRef = await addDoc(collection(db, "contacts"), {
        name,
        email,
        subject,
        message,
        timestamp: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      setToastMessage("Message sent successfully!"); // Show success toast
      // Reset form after submission
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (e) {
      console.error("Error adding document: ", e);
      setToastMessage("Failed to send message. Please try again."); // Show error toast
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div
    className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20 px-6 sm:px-12 md:px-24 lg:px-36 relative"
    id="contact"
  >
    {/* Decorative Background Circles */}
    <div className="absolute -top-10 -left-10 w-72 sm:w-96 h-72 sm:h-96 bg-blue-400 rounded-full mix-blend-multiply opacity-30 filter blur-3xl animate-pulse"></div>
    <div className="absolute -bottom-10 -right-10 w-72 sm:w-96 h-72 sm:h-96 bg-purple-400 rounded-full mix-blend-multiply opacity-30 filter blur-3xl animate-pulse"></div>
  
    {/* Heading */}
    <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-indigo-600 dark:text-indigo-400 mb-6 sm:mb-10 tracking-wide">
      Get in Touch
    </h1>
    <p className="text-center text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-12 sm:mb-16">
      Whether you have a question or just want to say hi, I’ll try my best to get back to you!
    </p>
  
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
      {/* Left Section: Address and Calling Section */}
      <div className="space-y-10 ml-28 sm:ml-0">
        {/* Address Icons */}
        <div className="space-y-8 ">
          <div className="flex items-center space-x-4 ">
            <span className="w-6 h-6 flex justify-center items-center bg-indigo-500 text-white rounded-full shadow-md"></span>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">zahid.imx@gmail.com</p>
            </div>
          </div>
  
          <div className="flex items-center space-x-4">
            <span className="w-6 h-6 flex justify-center items-center bg-green-500 text-white rounded-full shadow-md"></span>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Phone</h3>
              <p className="text-gray-600 dark:text-gray-400">+88 01754 309016</p>
            </div>
          </div>
  
          <div className="flex items-center space-x-4">
            <span className="w-6 h-6 flex justify-center items-center bg-red-500 text-white rounded-full shadow-md"></span>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Address</h3>
              <p className="text-gray-600 dark:text-gray-400">
                1212 Main Street, Dhaka City, Bangladesh
              </p>
            </div>
          </div>
        </div>
  
        {/* Additional Component (Loaded Below Address Section) */}
        <Address />
      </div>
  
      {/* Right Section: Contact Form */}
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md hover:shadow-lg transform transition-transform hover:scale-105 space-y-4 w-full max-w-lg"
        >
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:text-gray-50 dark:border-gray-600 focus:ring-indigo-400 transition"
            />
          </div>
  
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 dark:text-gray-50 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-indigo-400 transition"
            />
          </div>
  
          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:text-gray-50 dark:border-gray-600 focus:ring-indigo-400 transition"
            />
          </div>
  
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here"
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:text-gray-50 dark:border-gray-600 focus:ring-indigo-400 transition"
            ></textarea>
          </div>
  
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg text-lg font-semibold hover:from-indigo-600 hover:to-purple-600 shadow-lg transition-transform transform hover:scale-105 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-4 border-t-4 border-white border-solid rounded-full animate-spin mx-auto"></div>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </div>
  
    {/* Toast Notification */}
    <Toast message={toastMessage} onClose={() => setToastMessage("")} />
  </div>
  );
}  
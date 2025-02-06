"use client";

import React from "react";
import Address from "../components/Address";

export default function Contact() {
  return (
    <div
      className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20 px-8 md:px-36 relative"
      id="contact"
    >
      {/* Decorative Background Circles */}
      <div className="absolute -top-10 -left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply opacity-30 filter blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply opacity-30 filter blur-3xl animate-pulse"></div>

      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-center text-indigo-600 dark:text-indigo-400 mb-10 tracking-wide">
        Get in Touch
      </h1>
      <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-16">
        Whether you have a question or just want to say hi, I’ll try my best to get back to you!
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Section: Address and Calling Section */}
        <div className="space-y-8 pt-28">
          {/* Address Icons */}
          <div className="space-y-10">
            <div className="flex items-center">
              <span className="w-5 h-5 flex justify-center items-center bg-indigo-500 text-white rounded-full shadow-md">
                
              </span>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Email
                </h3>
                <p className="text-gray-600 dark:text-gray-400">zahid.imx@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center">
              <span className="w-5 h-5 flex justify-center items-center bg-green-500 text-white rounded-full shadow-md">
             
              </span>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Phone
                </h3>
                <p className="text-gray-600 dark:text-gray-400">+88 01754 309016</p>
              </div>
            </div>

            <div className="flex items-center">
              <span className="w-5 h-5 flex justify-center items-center bg-red-500 text-white rounded-full shadow-md">
               
              </span>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Address
                </h3>
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
        <div className="flex justify-center items-center py-6 px-4">
  <form className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transform transition-transform hover:scale-105 space-y-4 w-full max-w-md">
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
        placeholder="Enter your name"
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-400 transition"
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
        placeholder="Enter your email"
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-400 transition"
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
        placeholder="Enter subject"
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-400 transition"
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
        rows="3"
        placeholder="Type your message here"
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-400 transition"
      ></textarea>
    </div>
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-lg text-lg font-semibold hover:from-indigo-600 hover:to-purple-600 shadow-lg transition-transform transform hover:scale-105"
    >
      Send Message
    </button>
  </form>
</div>



      </div>
    </div>
  );
}

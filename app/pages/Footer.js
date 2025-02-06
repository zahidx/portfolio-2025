'use client';

import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import { db, collection, addDoc } from "../components/firebase"; // Firebase methods

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    setIsLoading(true);
    try {
      // Add the email to Firestore
      await addDoc(collection(db, "newsletter"), {
        email,
        timestamp: new Date(),
      });

      showToast("Subscription successful!", "success");
      setEmail(""); // Clear email input
    } catch (error) {
      console.error("Error subscribing:", error);
      showToast("Something went wrong, please try again later.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message, type) => {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-20">
      <div className="max-w-screen-xl mx-auto">
        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Home Address */}
          <div className="footer-section">
            <h3 className="text-xl font-semibold text-white mb-6">Home Address</h3>
            <p className="mb-4 flex items-center">
              <span className="mr-2 pb-1 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75l9-6 9 6M3 9.75v10.5a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 20.25V9.75M3 9.75l9 6 9-6" />
                </svg>
              </span>
              Level-4, K/62, Baridhara, Dhaka
            </p>
            <p className="mb-4 flex items-center">
              <span className="mr-2 pb-1 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75V10.5a4.5 4.5 0 00-9 0v2.25m-3 0a6 6 0 0112 0v2.25m3 0v2.25m0 0h-3.75m3.75 0a6 6 0 01-12 0m12 0H6.75" />
                </svg>
              </span>
              zahid.imx@gmail.com
            </p>
            <p className="mb-4 pb-1 flex items-center">
              <span className="mr-2 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25v7.5c0 1.243 1.007 2.25 2.25 2.25h15c1.243 0 2.25-1.007 2.25-2.25v-7.5M2.25 8.25l9.75 5.625m0 0L21.75 8.25M12 13.875V21" />
                </svg>
              </span>
              01754309016, +8809638641421
            </p>
            <p className="text-gray-400 text-left">(Available: Sat - Thu, 10:00 AM to 7:00)</p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">Quick Links</h3>
            <ul className="space-y-4 text-center">
              <li><a href="/" className="hover:text-blue-500 transition duration-300 transform hover:scale-105">Home</a></li>
              <li><a href="/about" className="hover:text-blue-500 transition duration-300 transform hover:scale-105">About</a></li>
              <li><a href="/services" className="hover:text-blue-500 transition duration-300 transform hover:scale-105">Services</a></li>
              <li><a href="/contact" className="hover:text-blue-500 transition duration-300 transform hover:scale-105">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="footer-section text-white px-8 md:px-28">
            <h3 className="text-xl -ml-6 font-semibold text-white mb-6 w-32 text-center">Follow Me</h3>
            <div className="grid -ml-4 grid-cols-3 gap-8 text-center mx-auto">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon hover:text-blue-500"><FaFacebookF size={28} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon hover:text-blue-500"><FaTwitter size={28} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon hover:text-pink-500"><FaInstagram size={28} /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon hover:text-gray-500"><FaGithub size={28} /></a>
              <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" className="social-icon hover:text-green-500"><FaWhatsapp size={28} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon hover:text-blue-700"><FaLinkedinIn size={28} /></a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h3 className="text-xl font-semibold text-white text-center mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to receive the latest updates.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition transform hover:scale-105"
                required
              />
              <button
                type="submit"
                className={`bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition transform hover:scale-105 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg transition transform hover:scale-105">
            Back to Top
          </button>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .footer-section {
          transition: all 0.3s ease;
        }

        .footer-section:hover {
          transform: translateY(-10px);
        }

        .social-icon {
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .social-icon:hover {
          transform: scale(1.2);
        }

        .toast {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #333;
          color: white;
          padding: 10px;
          border-radius: 5px;
          z-index: 9999;
          font-size: 14px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          transition: opacity 0.5s ease;
        }

        .toast-success {
          background-color: #4caf50;
        }

        .toast-error {
          background-color: #f44336;
        }
      `}</style>
    </footer>
  );
}

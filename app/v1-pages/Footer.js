"use client";
import { Home, Info, Briefcase, Phone } from "lucide-react";
import React, { useState } from "react";
import {
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub, FaWhatsapp,
} from "react-icons/fa";
import { db, collection, addDoc } from "../v1-components/firebase";

export default function V1Footer() {
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
      await addDoc(collection(db, "newsletter"), {
        email,
        timestamp: new Date(),
      });
      showToast("Subscription successful!", "success");
      setEmail("");
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
    setTimeout(() => { toast.remove(); }, 3000);
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-20">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 w-full">
          {/* Home Address */}
          <div className="footer-section text-center sm:text-left">
            <h3 className="text-xl font-semibold text-white mb-6">Home Address</h3>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <p className="flex items-center gap-2">Level-4, K/62, Baridhara, Dhaka</p>
              <p className="flex items-center gap-2">zahid.imx@gmail.com</p>
              <p className="flex items-center gap-2">01754309016, +8809638641421</p>
              <p className="text-gray-400">(Available: Sat - Thu, 10:00 AM to 7:00)</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section text-center sm:text-left sm:ml-32">
            <h3 className="text-xl font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4 inline-block sm:block">
              <li>
                <a href="/v1#home" className="flex justify-center sm:justify-start items-center gap-2 hover:text-blue-500 transition duration-300 transform hover:scale-105">
                  <Home size={20} /> <span>Home</span>
                </a>
              </li>
              <li>
                <a href="/v1#about" className="flex justify-center sm:justify-start items-center gap-2 hover:text-blue-500 transition duration-300 transform hover:scale-105">
                  <Info size={20} /> <span>About</span>
                </a>
              </li>
              <li>
                <a href="/v1#service" className="flex justify-center sm:justify-start items-center gap-2 hover:text-blue-500 transition duration-300 transform hover:scale-105">
                  <Briefcase size={20} /> <span>Services</span>
                </a>
              </li>
              <li>
                <a href="/v1#contact" className="flex justify-center sm:justify-start items-center gap-2 hover:text-blue-500 transition duration-300 transform hover:scale-105">
                  <Phone size={20} /> <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="footer-section text-white px-6 md:px-28">
            <h3 className="text-xl font-semibold text-white mb-6 w-32 mx-auto text-center sm:-ml-1">
              Follow Me
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-6 sm:gap-10 text-center mx-auto w-fit">
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
            <h3 className="text-xl font-semibold text-white text-left mb-6">Newsletter</h3>
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

        <div className="text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            Back to Top
          </button>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Zahidul Islam. All rights reserved.</p>
        </div>
      </div>

      <style>{`
        .footer-section { transition: all 0.3s ease; }
        .footer-section:hover { transform: translateY(-10px); }
        .social-icon { transition: transform 0.3s ease, color 0.3s ease; }
        .social-icon:hover { transform: scale(1.2); }
      `}</style>
    </footer>
  );
}

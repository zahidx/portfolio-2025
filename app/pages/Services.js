"use client";
import React from "react";
import { motion } from "framer-motion";
import Web from "../images/web.png";
import Ps from "../images/ps.png";
import Bug from "../images/bug.png";
import Email from "../images/email.png";
import Image from "next/image";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function ServicePage() {
  return (
    <div className="bg-gray-100 dark:bg-gradient-to-r dark:from-[#0E1628] dark:to-[#380643] min-h-screen sm:-mb-24">
      <h1 className="pt-12 pb-4 font-bold text-5xl text-center text-black dark:text-white">
        Services
      </h1>
  
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 px-4 py-2 pt-16 pb-20 sm:pb-0">
        {/* Service Card 1: Web Development */}
        <motion.div
          className="bg-gray-50 dark:bg-gray-800 shadow-md p-6 rounded-lg w-full mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          variants={cardVariants}
        >
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
            <Image src={Web} alt="Web Development" className="w-24 h-24 object-cover mb-4 sm:mb-0 sm:mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Web Development</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                I can develop a responsive website using HTML, CSS, JavaScript, jQuery, Bootstrap, React, Node.js, PHP, MySQL, etc.
              </p>
            </div>
          </div>
        </motion.div>
  
        {/* Service Card 2: Photoshop */}
        <motion.div
          className="bg-gray-50 dark:bg-gray-800 shadow-md p-6 rounded-lg w-full mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          variants={cardVariants}
        >
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
            <Image src={Ps} alt="Photoshop" className="w-24 h-24 object-cover rounded-full mb-4 sm:mb-0 sm:mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Photoshop</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                I can edit photos using Adobe Photoshop. I can also design logos, banners, posters, etc. using Adobe Photoshop.
              </p>
            </div>
          </div>
        </motion.div>
  
        {/* Service Card 3: Bug Fixing */}
        <motion.div
          className="bg-gray-50 dark:bg-gray-800 shadow-md p-6 rounded-lg w-full mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          variants={cardVariants}
        >
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
            <Image src={Bug} alt="Bug Fixing" className="w-32 h-32 object-cover rounded-full mb-4 sm:mb-0 sm:mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Bug Fixing</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                I can fix bugs in your website or software. I can also add new features to your website or software.
              </p>
            </div>
          </div>
        </motion.div>
  
        {/* Service Card 4: Email Template */}
        <motion.div
          className="bg-gray-50 dark:bg-gray-800 shadow-md p-6 rounded-lg w-full mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          variants={cardVariants}
        >
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
            <Image src={Email} alt="Email Template" className="w-32 h-32 object-cover rounded-full mb-4 sm:mb-0 sm:mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Email Template</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                I can design an email template for your business. I can also design a newsletter for your business or organization.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}  
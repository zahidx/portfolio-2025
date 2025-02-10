"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  useEffect(() => {
    // Initialize AOS with repeated animations on every scroll
    AOS.init({
      duration: 1200,  // Duration of the animation
      easing: "ease-in-out",  // Easing function
      once: false,  // Set to false to re-trigger animation every time the element comes into view
      offset: 200,  // Distance from the viewport when the animation triggers
    });
  }, []);

  return (
    <div
      id="about"
      className="dark:bg-gradient-to-b dark:from-[#220E36] dark:to-[#270B4A] dark:text-gray-100 sm:pt-2"
    >
      <h1 className="pb-4 font-bold text-4xl sm:text-5xl text-center dark:decoration-white -pt-10">
        About Me
      </h1>
      <div className="pb-20 pt-8 px-6 flex flex-col lg:flex-row justify-between gap-8">
        {/* Personal Details Section */}
        <div className="flex flex-col lg:w-1/2 mb-6 lg:mb-0">
          <h2 className="text-xl font-bold mb-4 dark:text-green-400">
            Personal Details
          </h2>
          <div className="dark:text-gray-300">
            <p>
              <span className="font-semibold">Name:</span> Zahidul Islam
            </p>
            <p>
              <span className="font-semibold">Location:</span> Baridhara, Dhaka
            </p>
            <p>
              <span className="font-semibold">Profession:</span> Aspiring Web Developer
            </p>
            <p>
              <span className="font-semibold">Hobbies:</span> Reading Book
            </p>
            <p>
              <span className="font-semibold">Age:</span> 24
            </p>
            <p>
              <span className="font-semibold">Languages Spoken:</span> English, Bangla, Hindi, French
            </p>
            <p>
              <span className="font-semibold">Email:</span> zahid.imx@gmail.com
            </p>
            <p>
              <span className="font-semibold">Phone:</span> +880 175 430 9016
            </p>
          </div>
        </div>

        {/* Educational Background Section */}
        <div
          className="flex flex-col lg:w-1/2"
          data-aos="fade-up"  // Animation type
          data-aos-duration="1500"  // Duration of animation
          data-aos-offset="200"  // Offset value to trigger animation earlier or later
          data-aos-delay="100"  // Delay before animation starts
        >
          <h2 className="text-xl font-bold mb-4 dark:text-green-400">
            Educational Background
          </h2>
          <div className="dark:text-gray-300 border-l-4 dark:border-green-400 pl-4">
            <p
              className="education-text"
              data-aos="fade-right"  // Animation for each paragraph
              data-aos-duration="1200"  // Animation duration
              data-aos-delay="200"  // Delay before animation starts
            >
              <span className="font-semibold">Degree:</span> Bachelor's in Computer Science (CSE)
            </p>
            <p
              className="education-text"
              data-aos="fade-right"
              data-aos-duration="1200"
              data-aos-delay="300"
            >
              <span className="font-semibold">Graduation Year:</span> 2024
            </p>
            <p
              className="education-text"
              data-aos="fade-right"
              data-aos-duration="1200"
              data-aos-delay="400"
            >
              <span className="font-semibold">Specialization:</span> Artificial Intelligence and Machine Learning
            </p>
            <p
              className="education-text"
              data-aos="fade-right"
              data-aos-duration="1200"
              data-aos-delay="500"
            >
              <span className="font-semibold">Certifications:</span> Certified Web Developer, Python Programmer
            </p>
            <p
              className="education-text"
              data-aos="fade-right"
              data-aos-duration="1200"
              data-aos-delay="600"
            >
              <span className="font-semibold">Research Work:</span> Published a paper on "Efficient Violence Detection Techniques"
            </p>
            <p
              className="education-text"
              data-aos="fade-right"
              data-aos-duration="1200"
              data-aos-delay="700"
            >
              <span className="font-semibold">Projects:</span> Developed a real-time chatbot and a vocabulary learning website
            </p>
            <p
              className="education-text"
              data-aos="fade-right"
              data-aos-duration="1200"
              data-aos-delay="800"
            >
              <span className="font-semibold">Achievements:</span> Participated in Hackathon 2023, Working in Machine Learning Field
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

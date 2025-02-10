"use client";
import { useEffect } from "react";
import Skillcompo from "../components/Skillcompo";
import SoftSkill from "../components/SoftSkill";

export default function SkillPage() {
  useEffect(() => {
    // Smooth scroll functionality for navigating to the Skills section
    if (window.location.hash === "#skills") {
      const skillSection = document.getElementById("skills");
      if (skillSection) {
        skillSection.scrollIntoView({ behavior: "smooth" });
      }
    }

    const progressBars = document.querySelectorAll(".progress-bar");

    // Initialize IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const progressBar = entry.target;
          if (entry.isIntersecting) {
            // Animate progress bar when it comes into view
            const progress = progressBar.dataset.progress;
            progressBar.style.transition = "width 1s ease-in-out";
            progressBar.style.width = progress;
          } else {
            // Reset width when out of view
            progressBar.style.width = "0%";
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe each progress bar
    progressBars.forEach((progressBar) => {
      observer.observe(progressBar);
    });

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      id="skills"
      className="min-h-screen py-1 dark:bg-gradient-to-b dark:from-[#270C48] dark:to-[#220E36] dark:text-white"
    >
      {/* Page Heading */}
      <h1 className="sm:pt-14 pb-1 font-bold text-5xl text-center text-black dark:text-gray-50">
        Skills
      </h1>

      {/* Skills Sections */}
      <div className="flex flex-col lg:flex-row justify-between px-8 py-6 space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Programming Skills */}
        <div className="flex-1 p-5 bg-gray-100 text-center rounded-lg dark:bg-gradient-to-b dark:from-[#270C48] dark:to-[#220E36] dark:text-white">
          <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-300 pt-12">
            Programming Languages and Frameworks
          </h2>
          <div className="space-y-6">
            {/* Java */}
            <div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Java</span>
              </div>
              <div className="w-full bg-gray-200 h-7 rounded-full overflow-hidden relative dark:bg-gray-600">
                <div
                  className="h-7 rounded-full progress-bar bg-java"
                  data-progress="80%"
                  style={{ width: "0%" }}
                ></div>
                <span className="absolute inset-0 flex justify-center items-center text-white font-semibold">
                  80%
                </span>
              </div>
            </div>

            {/* Python */}
            <div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Python</span>
              </div>
              <div className="w-full bg-gray-200 h-7 rounded-full overflow-hidden relative dark:bg-gray-600">
                <div
                  className="h-7 rounded-full progress-bar bg-python"
                  data-progress="70%"
                  style={{ width: "0%" }}
                ></div>
                <span className="absolute inset-0 flex justify-center items-center text-white font-semibold">
                  70%
                </span>
              </div>
            </div>

            {/* JavaScript */}
            <div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span className="font-semibold">JavaScript</span>
              </div>
              <div className="w-full bg-gray-200 h-7 rounded-full overflow-hidden relative dark:bg-gray-600">
                <div
                  className="h-7 rounded-full progress-bar bg-yellow-500"
                  data-progress="90%"
                  style={{ width: "90%" }}
                ></div>
                <span className="absolute inset-0 flex justify-center items-center text-white font-semibold">
                  90%
                </span>
              </div>
            </div>

            {/* C++ */}
            <div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span className="font-semibold">C++</span>
              </div>
              <div className="w-full bg-gray-200 h-7 rounded-full overflow-hidden relative dark:bg-gray-600">
                <div
                  className="h-7 rounded-full progress-bar bg-blue-700"
                  data-progress="80%"
                  style={{ width: "80%" }}
                ></div>
                <span className="absolute inset-0 flex justify-center items-center text-white font-semibold">
                  80%
                </span>
              </div>
            </div>


              {/* {Node Js} */}
              <div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Node Js</span>
              </div>
              <div className="w-full bg-gray-200 h-7 rounded-full overflow-hidden relative dark:bg-gray-600">
                <div
                  className="h-7 rounded-full progress-bar bg-green-700"
                  data-progress="50%"
                  style={{ width: "50%" }}
                ></div>
                <span className="absolute inset-0 flex justify-center items-center text-white font-semibold">
                  50%
                </span>
              </div>
            </div>




            {/* React JS */}
            <div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span className="font-semibold">React JS</span>
              </div>
              <div className="w-full bg-gray-200 h-7 rounded-full overflow-hidden relative dark:bg-gray-600">
                <div
                  className="h-7 rounded-full progress-bar bg-cyan-500"
                  data-progress="70%"
                  style={{ width: "70%" }}
                ></div>
                <span className="absolute inset-0 flex justify-center items-center text-white font-semibold">
                  70%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Skillcompo and SoftSkill */}
        <Skillcompo />
        <SoftSkill />
      </div>
    </div>
  );
}

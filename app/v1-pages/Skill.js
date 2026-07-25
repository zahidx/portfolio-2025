"use client";
import { useEffect } from "react";
import Skillcompo from "../v1-components/Skillcompo";
import SoftSkill from "../v1-components/SoftSkill";

export default function V1SkillPage() {
  useEffect(() => {
    if (window.location.hash === "#skills") {
      const skillSection = document.getElementById("skills");
      if (skillSection) {
        skillSection.scrollIntoView({ behavior: "smooth" });
      }
    }

    const progressBars = document.querySelectorAll(".v1-progress-bar");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const progressBar = entry.target;
          if (entry.isIntersecting) {
            const progress = progressBar.dataset.progress;
            progressBar.style.transition = "width 1s ease-in-out";
            progressBar.style.width = progress;
          } else {
            progressBar.style.width = "0%";
          }
        });
      },
      { threshold: 0.5 }
    );

    progressBars.forEach((progressBar) => {
      observer.observe(progressBar);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      id="skills"
      className="min-h-screen py-1 dark:bg-gradient-to-b dark:from-[#270C48] dark:to-[#220E36] dark:text-white"
    >
      <h1 className="sm:pt-14 pb-1 font-bold text-5xl text-center text-black dark:text-gray-50">
        Skills
      </h1>

      <div className="flex flex-col lg:flex-row justify-between px-8 py-6 space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Programming Skills */}
        <div className="flex-1 p-5 bg-gray-100 text-center rounded-lg dark:bg-gradient-to-b dark:from-[#270C48] dark:to-[#220E36] dark:text-white">
          <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-300 pt-12">
            Programming Languages and Frameworks
          </h2>
          <div className="space-y-6">
            {[
              { name: "Java", progress: "80%", color: "bg-orange-500" },
              { name: "Python", progress: "70%", color: "bg-yellow-500" },
              { name: "JavaScript", progress: "90%", color: "bg-yellow-400" },
              { name: "C++", progress: "80%", color: "bg-blue-700" },
              { name: "Node Js", progress: "50%", color: "bg-green-700" },
              { name: "React JS", progress: "70%", color: "bg-cyan-500" },
            ].map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">{skill.name}</span>
                </div>
                <div className="w-full bg-gray-200 h-7 rounded-full overflow-hidden relative dark:bg-gray-600">
                  <div
                    className={`h-7 rounded-full v1-progress-bar ${skill.color}`}
                    data-progress={skill.progress}
                    style={{ width: "0%" }}
                  ></div>
                  <span className="absolute inset-0 flex justify-center items-center text-white font-semibold">
                    {skill.progress}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skillcompo and SoftSkill */}
        <Skillcompo />
        <SoftSkill />
      </div>
    </div>
  );
}

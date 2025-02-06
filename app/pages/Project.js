"use client";
import React, { useEffect } from "react";
import { FaRobot, FaTasks, FaShoppingCart, FaFilm, FaBook, FaRocket, FaRegClipboard, FaDollarSign, FaUtensils, FaCloudSun, FaNewspaper, FaTools } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const projects = [
  {
    title: "Social Interactive Robot",
    description: "A cutting-edge project designed to facilitate human-robot interaction, incorporating advanced AI and natural language processing.",
    icon: <FaRobot className="text-6xl text-blue-600 dark:text-blue-400 mx-auto" />,
    githubLink: "https://github.com/your-repo-link",
    livePreview: "https://your-live-preview-link"
  },
  {
    title: "To-Do List App",
    description: "A simple and intuitive to-do list application with features like adding tasks, marking completed tasks, and more. Developed using React and Firebase.",
    icon: <FaTasks className="text-6xl text-blue-600 dark:text-blue-400 mx-auto" />,
    githubLink: "https://github.com/your-repo-link",
    livePreview: "https://your-live-preview-link"
  },
  {
    title: "Simple Shopping Cart",
    description: "An e-commerce website with basic shopping cart functionality. Developed using React, Node.js, and MongoDB.",
    icon: <FaShoppingCart className="text-6xl text-blue-600 dark:text-blue-400 mx-auto" />,
    githubLink: "https://github.com/your-repo-link",
    livePreview: "https://your-live-preview-link"
  },
  {
    title: "ScreenHub",
    description: "ScreenHub allows users to fetch movie data, reviews, and other related information from the TMDB API. Users can explore movie details, read reviews, and find recommendations based on their favorite genres.",
    icon: <FaFilm className="text-6xl text-red-600 dark:text-red-400 mx-auto" />,
    githubLink: "https://github.com/your-repo-link",
    livePreview: "https://your-live-preview-link"
  },
  {
    title: "LitVerse",
    description: "LitVerse fetches book reviews, ratings, and other data using the Google Books API. Users can search for books, read reviews, and discover new titles based on genres and recommendations.",
    icon: <FaBook className="text-6xl text-yellow-600 dark:text-yellow-400 mx-auto" />,
    githubLink: "https://github.com/your-repo-link",
    livePreview: "https://your-live-preview-link"
  },
  {
    title: "OrbitX",
    description: "OrbitX allows users to fetch data from the NASA API, providing space-related content, such as images, videos, and articles. Explore space missions, view celestial imagery, and get updates from NASA's latest discoveries.",
    icon: <FaRocket className="text-6xl text-gray-600 dark:text-gray-400 mx-auto" />,
    githubLink: "https://github.com/your-repo-link",
    livePreview: "https://your-live-preview-link"
  },
  {
    title: "QuizArena",
    description: "QuizArena is an interactive quiz platform using the Trivia API, offering various quiz categories and difficulty levels. Test your knowledge and compete with others in real-time.",
    icon: <FaRegClipboard className="text-6xl text-purple-600 dark:text-purple-400 mx-auto" />,
    githubLink: "https://github.com/your-repo-link",
    livePreview: "https://your-live-preview-link"
  },
  {
    title: "Financial Tracker",
    description: "A personal finance tracking application where users can add and manage expenses, categorize spending, and visualize financial progress over time.",
    icon: <FaDollarSign className="text-6xl text-green-600 dark:text-green-400 mx-auto" />,
    githubLink: "https://github.com/your-repo-link",
    livePreview: "https://your-live-preview-link"
  },
  {
    title: "Insta-Recipe",
    description: "Insta-Recipe provides users with food recipes using the Spoonacular API. Find, share, and discover new recipes based on ingredients or cuisines.",
    icon: <FaUtensils className="text-6xl text-orange-600 dark:text-orange-400 mx-auto" />,
    githubLink: "https://github.com/your-repo-link",
    livePreview: "https://your-live-preview-link"
  },
  {
    title: "Weather Forecast App",
    description: "A weather forecast application that fetches real-time weather data from a weather API. Users can check weather forecasts for different cities, including temperature, humidity, wind speed, and more.",
    icon: <FaCloudSun className="text-6xl text-blue-500 dark:text-blue-400 mx-auto" />,
    githubLink: "https://github.com/your-repo-link",
    livePreview: "https://your-live-preview-link"
  },
  {
    title: "The Daily Sunrise Newspaper",
    description: "The Daily Sunrise is a news website that fetches the latest headlines and articles using a news API. Users can read the latest news stories, filter by categories, and share news directly from the platform.",
    icon: <FaNewspaper className="text-6xl text-red-500 dark:text-red-400 mx-auto" />,
    githubLink: "https://github.com/your-repo-link",
    livePreview: "https://your-live-preview-link"
  },
  {
    title: "Utility Pro",
    description: "Utility Pro is a comprehensive toolset web app that integrates 20 different utilities in one platform. From currency converters to calculators and more, it's designed to provide a variety of tools for everyday use.",
    icon: <FaTools className="text-6xl text-gray-600 dark:text-gray-400 mx-auto" />,
    githubLink: "https://github.com/your-repo-link",
    livePreview: "https://your-live-preview-link"
  }
];

export default function ProjectsResearchPage() {
  useEffect(() => {
    // Initialize AOS with configurations
    AOS.init({
      duration: 200, // Animation duration
      easing: "ease-out", // Easing function for smooth transitions
      once: false, // Allow animation to be triggered every time the element is in view
      anchorPlacement: "top-bottom", // Animation triggers when the element reaches the top of the viewport
    });
  }, []);

  return (
    <div className="pl-14 pr-14 bg-gray-100 dark:bg-gradient-to-r dark:from-[#0E1628] dark:to-[#380643] min-h-screen" id="projects">
      <h1 className="text-5xl font-extrabold text-center text-indigo-600 dark:text-indigo-400 pt-16 tracking-wide">Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 px-6 py-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`bg-white dark:bg-gray-800 shadow-lg transition-transform duration-500 p-6 rounded-lg text-center
            transform-gpu hover:scale-110 hover:shadow-2xl hover:bg-gradient-to-r hover:from-[#FFFFFF] hover:to-[#FFFFFF] dark:hover:from-[#1F2937] dark:hover:to-[#1F2937] hover:z-10
            ${index % 3 === 0 ? "hover:-rotate-3" : index % 3 === 2 ? "hover:rotate-3" : ""}`}
            data-aos="fade-up" // Apply animation on scroll
            data-aos-delay={index * 100} // Delay based on index
            data-aos-duration="1500" // Duration for each animation
          >
            <div className="icon-container">
              {project.icon}
            </div>
            <div className="pt-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{project.title}</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{project.description}</p>
              <div className="flex justify-center gap-4 mt-4">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  GitHub Link
                </a>
                <a
                  href={project.livePreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                >
                  Live Preview
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
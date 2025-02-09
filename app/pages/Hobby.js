"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Music from "../images/music.png";
import Photography from "../images/photography.png";
import Movie from "../images/movie.png";
import Game from "../images/game.png";
import Book from "../images/book.png";
import Travel from "../images/travel.png";

export default function Hobbies() {
  const lineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const [animationState, setAnimationState] = useState({});

  const hobbies = [
    {
      title: "Listening to Music",
      description:
        "I enjoy listening to various genres of music, especially while working or relaxing. Music helps me stay focused and enhances my creativity.",
      image: Music,
    },
    {
      title: "Photography",
      description:
        "Photography is one of my passions. I love capturing beautiful moments and scenes, especially during my travels and outdoor activities.",
      image: Photography,
    },
    {
      title: "Watching Movies",
      description:
        "Watching movies is one of my favorite pastimes. I enjoy films from various genres, and it allows me to unwind and be entertained.",
      image: Movie,
    },
    {
      title: "Gaming",
      description:
        "Gaming is another hobby that I indulge in during my free time. Playing video games helps me relax and challenge my strategic thinking.",
      image: Game,
    },
    {
      title: "Reading Books",
      description:
        "Reading books is one of my favorite hobbies. I enjoy reading books from various genres, especially fiction and self-help.",
      image: Book,
    },
    {
      title: "Travelling",
      description:
        "Travelling is one of my passions. I love exploring new places and experiencing different cultures. ",
      image: Travel,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimationState((prevState) => ({
              ...prevState,
              [entry.target.id]: true,
            }));
          } else {
            setAnimationState((prevState) => ({
              ...prevState,
              [entry.target.id]: false,
            }));
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = document.querySelectorAll(".hobby-card");
    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  useEffect(() => {
    const bottomLineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            bottomLineRef.current.classList.add("animate-bottomLine");
          } else {
            bottomLineRef.current.classList.remove("animate-bottomLine");
          }
        });
      },
      { threshold: 0.5 }
    );

    bottomLineObserver.observe(bottomLineRef.current);

    return () => {
      bottomLineObserver.disconnect();
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-400 to-[#D1C7FE] dark:bg-gradient-to-r dark:from-blue-900 dark:via-blue-900 dark:to-[#0c0d51] text-gray-50 dark:text-gray-200 pt-28 pb-12 px-4 sm:px-8 md:px-28 overflow-x-hidden">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-indigo-800 dark:text-red-100 mb-3 tracking-wide">
        Hobbies
      </h1>
  
      {/* Animated Horizontal Line */}
      <div ref={lineRef} className="w-full h-[2px] mx-auto mb-8 animate-line"></div>
  
      {/* Animated Bottom Line */}
      <div
        ref={bottomLineRef}
        className="w-0 h-[5px] mx-auto -pt-20 mb-8 bg-[#e31ac5] dark:bg-[#071b27] transition-all duration-1000"
      ></div>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
        {hobbies.map((hobby, index) => (
          <div
            key={index}
            id={`hobby-card-${index}`}
            className={`hobby-card group bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transform transition duration-700 ease-out p-6 ${
              animationState[`hobby-card-${index}`] ? "animate-slideIn" : ""
            }`}
          >
            <div className="w-24 h-24 relative text-center mx-auto">
              <Image
                src={hobby.image}
                alt={hobby.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="mt-4 text-center mx-auto group">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 transition-transform duration-400 ease-out transform group-hover:scale-105 group-hover:rotate-2 group-hover:translate-y-1 group-hover:shadow-xl group-hover:tracking-wide">
                {hobby.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 transition-all duration-400 ease-out group-hover:scale-100 group-hover:translate-y-1 group-hover:opacity-80 group-hover:tracking-wide">
                {hobby.description}
              </p>
            </div>
          </div>
        ))}
      </div>
  
      <style jsx>{`
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateX(50px) scale(0.9);
          }
          30% {
            opacity: 0.8;
            transform: translateX(10px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
  
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          60% {
            opacity: 1;
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
  
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
  
        @keyframes lineAnimation {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
  
        @keyframes bottomLineAnimation {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
  
        .animate-line {
          animation: lineAnimation 1s ease-out forwards;
        }
  
        .animate-bottomLine {
          animation: bottomLineAnimation 1s ease-out forwards;
        }
  
        .animate-slideIn {
          animation: slideIn 1s ease-out forwards;
          will-change: transform, opacity;
        }
  
        .animate-bounceIn {
          animation: bounceIn 1s ease-out forwards;
        }
  
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}  
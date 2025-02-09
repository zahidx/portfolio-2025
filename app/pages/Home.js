import Image from "next/image";
import Profile from "../images/profile.png"; // Correct path

export default function Home() {
  return (
    <div className="profile_section h-auto mt-12 pt-10 pb-20 bg-slate-100 dark:bg-[#220E37]" id="home">
      <div className="bg-gradient-to-r from-[#1a0336] via-[#3f024f] to-[#5c1526] dark:bg-gradient-to-r dark:from-[#101529] dark:via-[#240C3E] dark:to-[#220D38] animate-gradient-x bg-[length:200%_200%] h-auto py-8 px-4 sm:px-8 md:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
          <div className="profile_image flex-shrink-0">
            <Image
              src={Profile}
              alt="profile"
              width={220}
              height={220}
              className="w-72 h-72 rounded-full object-cover mx-auto lg:ml-0"
            />
          </div>

          <div className="profile_info text-white text-center lg:text-left">
            <h1 className="text-3xl font-bold mb-2 typing-animation">
              Hi, I am <span className="text-red-500">Zahid</span>
            </h1>
            <h2 className="text-xl font-semibold mb-4">Software Engineer</h2>
            <p className="leading-relaxed text-justify pb-10 mx-4 md:mx-8">
              Passionate computer science professional skilled in problem-solving, database management, and web development.
              Committed to optimizing solutions and enhancing user experiences. Seeking opportunities to drive technological
              advancements, to work in a challenging environment where I can utilize my knowledge and skills for the growth of the organization and myself.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

export default function SoftSkillPage() {
  const softSkills = [
    { name: "Problem Solving", color: "bg-purple-500" },
    { name: "Teamwork", color: "bg-blue-500" },
    { name: "Communication", color: "bg-green-500" },
    { name: "Time Management", color: "bg-yellow-500" },
    { name: "MS Office", color: "bg-red-500" },
    { name: "Critical Thinking", color: "bg-indigo-500" },
    { name: "Adaptability", color: "bg-teal-500" },
    { name: "Leadership", color: "bg-orange-500" },
    { name: "Creativity", color: "bg-pink-500" }, // New item
    { name: "Management", color: "bg-cyan-500" }, // New item
    
  ];

  return (
    <div
      id="softSkills"
      className="min-h-screen bg-gray-100 py-1 dark:bg-gradient-to-b dark:from-[#270C48] dark:to-[#220E36] dark:text-white"
    >
      {/* Page Heading */}
      <h1
  className="font-bold text-2xl text-center text-blue-600 dark:text-blue-300"
  style={{ paddingTop: "4.2rem", paddingBottom: "3rem" }}
>
  Soft Skills
</h1>


      {/* Add animation styles */}
      <style>{`
        @keyframes move-left-right {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(20px);
          }
        }
        .animated {
          animation: move-left-right 3s ease-in-out infinite;
        }
      `}</style>

      {/* Soft Skills Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-6 px-6 py-8">
        {softSkills.map((skill, index) => (
          <div
            key={index}
            className={`animated h-10 w-full sm:w-44 flex items-center justify-center p-4 rounded-lg shadow-md text-white font-semibold text-center dark:shadow-lg ${skill.color}`}
            style={{
              animationDelay: `${index * 0.2}s`, // Delay for staggered animations
            }}
          >
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  );
}

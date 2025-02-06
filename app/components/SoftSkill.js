"use client";

export default function SoftSkillPage() {
const softSkills = [
    { name: "Problem Solving", color: "bg-[#6A0DAD]", emoji: "🧩" },  // Custom purple
    { name: "Teamwork", color: "bg-[#1E40AF]", emoji: "🤝" },  // Custom blue
    { name: "Communication", color: "bg-[#2F855A]", emoji: "💬" },  // Custom green
    { name: "Time Management", color: "bg-[#ba8c14]", emoji: "⏰" },  // Custom yellow
    { name: "MS Office", color: "bg-[#D32F2F]", emoji: "💻" },  // Custom red
    { name: "Critical Thinking", color: "bg-[#4C51BF]", emoji: "🤔" },  // Custom indigo
    { name: "Adaptability", color: "bg-[#38B2AC]", emoji: "🌱" },  // Custom teal
    { name: "Leadership", color: "bg-[#DD6B20]", emoji: "👑" },  // Custom orange
    { name: "Creativity", color: "bg-[#D61C72]", emoji: "🎨" },  // Custom pink
    { name: "Management", color: "bg-[#00B5D8]", emoji: "📈" },  // Custom cyan
    { name: "Collaboration", color: "bg-[#a86a20]", emoji: "🤗" },  // Custom peach
    { name: "Decision Making", color: "bg-[#2B6CB0]", emoji: "💡" },  // Custom blue
    { name: "Attention to Detail", color: "bg-[#38B2AC]", emoji: "🔍" },  // Custom teal
    { name: "Negotiation", color: "bg-[#9B2C2C]", emoji: "🤝💬" },  // Custom dark red
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

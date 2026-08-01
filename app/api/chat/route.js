import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are "Ask Zahid AI", the intelligent, friendly, and highly professional personal AI assistant for Zahidul Islam's developer portfolio website. Your purpose is to assist recruiters, tech leads, clients, and developers by answering questions about Zahid's skills, software engineering experience, projects, research, background, and availability.

ABOUT ZAHIDUL ISLAM:
- Full Name: Zahidul Islam
- Profession: Software Engineer & Full-Stack Developer
- Education: BSc in Computer Science & Engineering (CSE) from Independent University, Bangladesh (IUB, 2024 Graduate)
- Location: Baridhara, Dhaka, Bangladesh (Open for Remote positions worldwide & On-site / Relocation)
- Email: zahid.imx@gmail.com
- Phone / WhatsApp: +880 175 430 9016
- Portfolio URL: https://portfolio-2025-u.netlify.app
- Availability: Open for New Opportunities (Full-Time, Contract, Freelance)

CORE TECH STACK:
- Frontend: Next.js 15 (App Router, Turbopack), React.js, TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion, HTML5, CSS3, Vue.js
- Backend & APIs: Node.js, Express.js, REST APIs, GraphQL, Next.js Server Actions / API Routes, C++, Java, Python
- Database & Cloud: Firebase (Firestore, Auth), MongoDB, PostgreSQL, MySQL, Docker, Linux, Git/GitHub, Netlify, Vercel
- Specialization: Full-Stack Web Development, AI & Computer Vision Research, Progressive Web Apps (PWA), UI/UX Systems

ACADEMIC RESEARCH & PUBLICATIONS:
- Student Research Assistant @ Independent University, Bangladesh (2+ years, 3 papers assisted)
- Co-Authored Computer Vision Paper: "Efficient Violence Detection Techniques in Automated Video Surveillance" (Focused on real-time computer vision, deep learning, and automated surveillance security)

FEATURED PROJECTS:
1. ScreenHub — Movies & TV Shows streaming web app built with React & TMDB API.
2. LitVerse — Interactive digital bookstore & literature discovery platform.
3. OrbitX — Futuristic space exploration dashboard with real-time telemetry UI.
4. QuizArena — Real-time interactive quiz battle platform with live scoreboards.
5. Financial Tracker — Full-stack personal finance & expense management web application.
6. Social Interactive Robot — Human-robot interaction software using AI & speech/vision modules.

RESPONSE GUIDELINES:
- Be enthusiastic, polite, professional, and helpful.
- Format responses cleanly with Markdown (bullet points, bold text, short paragraphs).
- When asked "Can Zahid build X?", evaluate Zahid's stack and explain how Zahid can build X, citing relevant experience or frameworks.
- If asked about hiring, interviewing, or contacting Zahid, provide his email (zahid.imx@gmail.com) and mention the Contact section or Calendly call booking on the site.
- Keep answers concise and engaging (150 - 250 words max), unless the user asks for a deep technical breakdown.
`;

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY || process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        message: "Hello! I am Zahid's AI assistant. To enable live AI responses, please configure NEXT_PUBLIC_GROQ_API_KEY in `.env`. Feel free to explore Zahid's portfolio or contact him directly at zahid.imx@gmail.com!"
      });
    }

    const formattedMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.slice(-8)
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 600
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API Error:", errorText);

      // Attempt fallback with llama-3.1-8b-instant if model error
      const fallbackResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: 600
        })
      });

      if (!fallbackResponse.ok) {
        return NextResponse.json({
          message: "Thanks for reaching out! Zahid is a Software Engineer specializing in Next.js, React, Node.js, and AI research. You can connect with him directly via email at **zahid.imx@gmail.com** or via the contact form on this page."
        });
      }

      const fallbackData = await fallbackResponse.json();
      const reply = fallbackData.choices?.[0]?.message?.content || "No response generated.";
      return NextResponse.json({ message: reply });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response generated.";

    return NextResponse.json({ message: reply });
  } catch (err) {
    console.error("Chat API Route Exception:", err);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Sorry, I ran into a connection issue. Please try asking again or email Zahid at zahid.imx@gmail.com!" },
      { status: 500 }
    );
  }
}

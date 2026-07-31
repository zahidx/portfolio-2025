export const CASE_STUDIES = [
  {
    slug: "social-robot",
    title: "Social Interactive Robot",
    subtitle: "Human-Robot Interaction & Real-Time Computer Vision Platform",
    tag: "AI & Robotics Research",
    category: "AI & Research",
    date: "2024",
    status: "Research Published",
    githubLink: "https://github.com/zahidx/social_robot.git",
    livePreview: "https://social-robot.netlify.app/",
    techStack: ["Python", "OpenCV", "PyTorch", "ROS / AI", "React", "WebSocket"],
    coverColor: "from-blue-600 via-indigo-600 to-purple-600",
    metrics: [
      { label: "Frame Rate", val: "48 FPS" },
      { label: "Inference Latency", val: "22ms" },
      { label: "Detection Accuracy", val: "94.2%" },
      { label: "Tested Scenarios", val: "120+" },
    ],
    overview:
      "A cutting-edge Human-Robot Interaction (HRI) project integrating spatial-temporal deep learning models to enable autonomous social robots to perceive, analyze, and react to human gestures and facial expressions in real time.",
    problemStatement:
      "Conventional robotic vision systems often struggle with lighting variance, occlusion, and real-time inference latency. In social HRI environments, delayed response times disrupt natural human communication and degrade user trust.",
    solution:
      "We developed a lightweight MobileNetV3 + Bi-LSTM neural network architecture connected via WebSocket streams to a responsive web dashboard. This achieved 48 FPS real-time processing while running on low-power edge GPUs.",
    architecture: [
      "Camera Feed Capture -> OpenCV Frame Preprocessing",
      "Feature Extraction -> Lightweight MobileNetV3 Convolutional Backbone",
      "Temporal Modeling -> Bidirectional LSTM Sequence Encoder",
      "Decision Pipeline -> Action Classification & Robotic Arm Command Signal",
      "Telemetry Dashboard -> Real-time WebSocket Data Visualization",
    ],
    challenges: [
      {
        title: "High Latency During Multi-Person Tracking",
        solution: "Implemented frame-skipping heuristics and dynamic region-of-interest (ROI) cropping to prioritize the primary speaker, reducing GPU memory bandwidth by 40%.",
      },
      {
        title: "False Positives in Low-Light Conditions",
        solution: "Applied adaptive histogram equalization and temporal smoothing across 5-frame rolling windows to stabilize detection confidence scores.",
      },
    ],
    results:
      "Published in peer-reviewed research, achieving a 94.2% gesture classification accuracy and reducing false-alarm rates to under 3.8% across 120 live benchmark tests.",
  },
  {
    slug: "screen-hub",
    title: "ScreenHub",
    subtitle: "High-Performance Movie Intelligence & TMDB API Analytics Platform",
    tag: "Entertainment / API",
    category: "API & Integration",
    date: "2024",
    status: "Production Live",
    githubLink: "https://github.com/zahidx/screen-hub.git",
    livePreview: "https://screen-hub-u.netlify.app/",
    techStack: ["React", "TMDB API", "Tailwind CSS", "JavaScript", "REST API"],
    coverColor: "from-red-600 via-pink-600 to-purple-600",
    metrics: [
      { label: "API Query Speed", val: "< 120ms" },
      { label: "Monthly Data Queries", val: "10k+" },
      { label: "Lighthouse Score", val: "98/100" },
      { label: "Curated Categories", val: "25+" },
    ],
    overview:
      "ScreenHub is a modern media discovery web application leveraging the TMDB REST API. It offers dynamic genre filtering, trending analytics, trailer streaming, and personalized recommendation engines.",
    problemStatement:
      "Many third-party movie browsing apps feel sluggish due to unoptimized image fetching, sequential API calls, and missing client-side caching.",
    solution:
      "Engineered an asynchronous parallel data fetch pipeline with local memory caching, progressive image lazy loading, and responsive Tailwind styling.",
    architecture: [
      "Client UI -> React Hooks State Manager",
      "API Layer -> TMDB REST Endpoint Aggregator",
      "Cache Layer -> LocalStorage & Session Memory Cache",
      "View Renderer -> Lazy-loaded Responsive Poster Grids",
    ],
    challenges: [
      {
        title: "API Rate Limits & Repeated Requests",
        solution: "Implemented an in-memory query cache with TTL invalidation, reducing redundant network requests by 65%.",
      },
    ],
    results:
      "Delivered a sub-120ms page load experience with a 98/100 Lighthouse performance rating across mobile and desktop viewports.",
  },
  {
    slug: "orbitx",
    title: "OrbitX",
    subtitle: "Interactive Space Exploration Portal Powered by NASA Open APIs",
    tag: "Space / NASA API",
    category: "API & Integration",
    date: "2024",
    status: "Production Live",
    githubLink: "https://github.com/zahidx/orbitx.git",
    livePreview: "https://orbitx-u.netlify.app/",
    techStack: ["Next.js", "NASA API", "Tailwind CSS", "REST API", "Framer Motion"],
    coverColor: "from-cyan-600 via-sky-600 to-indigo-600",
    metrics: [
      { label: "NASA Datasets", val: "5 APIs" },
      { label: "Image Resolution", val: "4K HD" },
      { label: "First Contentful Paint", val: "0.6s" },
      { label: "Interactive Views", val: "3D Spheres" },
    ],
    overview:
      "OrbitX brings space exploration to life by consuming live NASA APIs — including Astronomy Picture of the Day (APOD), Mars Rover Photos, Near-Earth Asteroids, and Earth Observatory imagery.",
    problemStatement:
      "Raw NASA API responses return massive uncompressed high-resolution images and unstructured JSON payloads that can cause browser memory spikes if not handled properly.",
    solution:
      "Built a Next.js API proxy with image optimization and thumbnail generation, paired with smooth Framer Motion entrance animations.",
    architecture: [
      "User Request -> Next.js Edge Server Handler",
      "External API -> NASA Open Data Endpoints",
      "Transform Pipeline -> Image Compression & Data Normalization",
      "UI Stage -> Framer Motion Interactive Cards",
    ],
    challenges: [
      {
        title: "Massive 4K Image Assets Impacting Initial Load",
        solution: "Utilized Next.js Image Optimization to serve responsive WebP formats based on client screen size.",
      },
    ],
    results:
      "Achieved a 0.6s First Contentful Paint and seamlessly serves 4K celestial imagery without browser lag.",
  },
  {
    slug: "tele-craft",
    title: "Tele Craft",
    subtitle: "AI-Powered Dynamic Storytelling & Creative Prompt Studio",
    tag: "Generative AI",
    category: "AI & Research",
    date: "2024",
    status: "Production Live",
    githubLink: "https://github.com/zahidx/tele-craft.git",
    livePreview: "https://tele-craft.netlify.app/",
    techStack: ["React", "Generative AI", "Node.js", "Tailwind CSS", "Express"],
    coverColor: "from-orange-500 via-amber-600 to-red-600",
    metrics: [
      { label: "Generation Time", val: "1.4s" },
      { label: "Story Genres", val: "12" },
      { label: "Prompt Styles", val: "30+" },
      { label: "User Satisfaction", val: "96%" },
    ],
    overview:
      "Tele Craft is an interactive AI storytelling application that generates rich, branching narratives based on user custom parameters, tone settings, and creative prompt inputs.",
    problemStatement:
      "AI text outputs often feel unformatted or plain. Users need interactive choices, visual theme adaptation, and persistent story bookmarking.",
    solution:
      "Designed a streamed typewriter interface connected to LLM endpoints, featuring genre-specific CSS themes and instant export controls.",
    architecture: [
      "User Input Form -> Parameter Builder",
      "Backend Router -> Node.js Express API Proxy",
      "LLM Pipeline -> Streamed Text Generation",
      "UI Layer -> Typewriter Text Streamer & Theme Switcher",
    ],
    challenges: [
      {
        title: "Perceived Latency During LLM Text Generation",
        solution: "Implemented chunked text streaming with typewriter animations so users see words generate progressively in real-time.",
      },
    ],
    results:
      "Reduced drop-off rates during text generation by 80% through live streaming animations and dynamic theme customization.",
  },
  {
    slug: "financial-tracker",
    title: "Financial Tracker",
    subtitle: "Full-Stack FinTech Expense Analytics & Growth Dashboard",
    tag: "FinTech / Analytics",
    category: "Tools & Utilities",
    date: "2024",
    status: "Production Live",
    githubLink: "https://github.com/zahidx/financial-tracker.git",
    livePreview: "https://financial-tracker-u.netlify.app/",
    techStack: ["React", "Chart.js", "Node.js", "MongoDB", "Express", "Tailwind"],
    coverColor: "from-emerald-600 via-teal-600 to-indigo-600",
    metrics: [
      { label: "Data Persistence", val: "MongoDB" },
      { label: "Chart Render Speed", val: "60 FPS" },
      { label: "Calculation Accuracy", val: "100%" },
      { label: "Export Formats", val: "CSV / PDF" },
    ],
    overview:
      "A comprehensive personal finance web app enabling users to track multi-category expenses, visualize spending trends via interactive Chart.js graphs, and project future savings.",
    problemStatement:
      "Many expense tracking spreadsheets are hard to navigate on mobile devices and lack real-time visual chart breakdowns.",
    solution:
      "Built a mobile-first responsive dashboard with Node.js/MongoDB persistence, Chart.js visualizers, and instant budget alerts.",
    architecture: [
      "React Frontend -> State Store & Chart.js Wrapper",
      "Node.js Backend -> Express REST API Endpoints",
      "Database Layer -> MongoDB Document Collections",
      "Export Module -> Client-side CSV/PDF Report Generator",
    ],
    challenges: [
      {
        title: "Complex Expense Aggregation & Month-over-Month Comparisons",
        solution: "Wrote optimized MongoDB Aggregation Pipelines to calculate real-time category totals directly inside the database.",
      },
    ],
    results:
      "Provides smooth 60 FPS interactive financial charts and instant CSV export capabilities across all devices.",
  },
];

export function getCaseStudyBySlug(slug) {
  return CASE_STUDIES.find((cs) => cs.slug === slug) || null;
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, CASE_STUDIES } from "@/lib/projectsData";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  TrendingUp,
  Calendar,
  Zap,
} from "lucide-react";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const cs = getCaseStudyBySlug(resolvedParams.slug);
  if (!cs) return { title: "Case Study Not Found" };

  return {
    title: `${cs.title} Case Study — Zahidul Islam`,
    description: cs.subtitle,
    openGraph: {
      title: `${cs.title} — Case Study`,
      description: cs.subtitle,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const resolvedParams = await params;
  const cs = getCaseStudyBySlug(resolvedParams.slug);

  if (!cs) {
    notFound();
  }

  const otherStudies = CASE_STUDIES.filter((item) => item.slug !== cs.slug).slice(0, 2);

  return (
    <div className="relative min-h-screen bg-[#050512] text-white overflow-x-clip py-12 px-4 sm:px-6 lg:px-8">
      {/* Ambient background lighting */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-indigo-600/15 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto pt-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono font-semibold text-slate-300 hover:text-white hover:border-white/25 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Projects Matrix
          </Link>
        </div>

        {/* Hero Header Card */}
        <header className="mb-12 p-8 sm:p-12 rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${cs.coverColor}`} />

          {/* Top Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider">
                {cs.tag}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
                {cs.status}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{cs.date}</span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight mb-4">
            {cs.title}
          </h1>
          <p className="text-lg sm:text-xl text-indigo-200 font-medium mb-8 max-w-3xl">
            {cs.subtitle}
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pt-6 border-t border-white/10">
            {cs.metrics.map((m) => (
              <div key={m.label} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
                <p className="text-xl sm:text-2xl font-black text-white">{m.val}</p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={cs.livePreview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/25 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Live Demo</span>
            </a>

            <a
              href={cs.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/15 bg-white/[0.04] text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              <Github className="w-4 h-4 text-indigo-400" />
              <span>Source Repository</span>
            </a>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold text-xs uppercase tracking-widest hover:bg-emerald-500/20 transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>Discuss Similar Project</span>
            </Link>
          </div>
        </header>

        {/* ── Main Content Grid ── */}
        <main className="space-y-10 mb-16">

          {/* Overview & Problem Statement */}
          <section className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest mb-2 block">
                  PROJECT OVERVIEW
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">What was built?</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{cs.overview}</p>
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-2 block">
                  THE CHALLENGE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Problem Statement</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{cs.problemStatement}</p>
              </div>
            </div>
          </section>

          {/* Solution & Technical Architecture */}
          <section className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-2 block">
              THE SOLUTION
            </span>
            <h3 className="text-2xl font-bold text-white mb-4">Engineering Approach &amp; Architecture</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">{cs.solution}</p>

            {/* Architecture Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/10 font-mono text-xs">
              <div className="flex items-center gap-2 mb-4 text-indigo-400 font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>System Architecture Data Flow</span>
              </div>

              <div className="space-y-2">
                {cs.architecture.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-[11px]">
                      0{idx + 1}
                    </span>
                    <span className="text-slate-200">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Challenges & Solutions */}
          <section className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl">
            <span className="text-xs font-mono font-bold text-pink-400 uppercase tracking-widest mb-2 block">
              PROBLEM SOLVING
            </span>
            <h3 className="text-2xl font-bold text-white mb-6">Key Engineering Obstacles</h3>

            <div className="space-y-6">
              {cs.challenges.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <h4>Obstacle: {item.title}</h4>
                  </div>
                  <div className="flex items-start gap-2 text-emerald-400 text-xs sm:text-sm pl-6 border-l-2 border-emerald-500/40">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <p className="text-slate-300">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack Chips Bar */}
          <section className="p-8 rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-base font-bold text-white mb-1">Technologies &amp; Tools Used</h4>
              <p className="text-xs text-slate-400">Core libraries, frameworks, and deployment services.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {cs.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 font-mono text-xs font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </main>

        {/* ── Other Case Studies Footer Nav ── */}
        <footer className="pt-8 border-t border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Explore Other Case Studies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherStudies.map((other) => (
              <Link
                key={other.slug}
                href={`/projects/${other.slug}`}
                className="p-6 rounded-2xl border border-white/10 bg-slate-950/60 hover:border-indigo-400/40 transition-all group"
              >
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-400/20">
                  {other.tag}
                </span>
                <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mt-3 mb-1">
                  {other.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">{other.subtitle}</p>
              </Link>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

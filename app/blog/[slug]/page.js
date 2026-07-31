import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import ArticleContent from "./ArticleContent";
import ArticleShareBar from "./ArticleShareBar";
import { ArrowLeft, Calendar, Clock, User, Share2, Sparkles, BookOpen, Send, Check } from "lucide-react";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} — Zahidul Islam Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function ArticlePage({ params }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  // Filter related articles by category or tags (excluding current post)
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 2);

  return (
    <div className="relative min-h-screen bg-[#060613] text-white overflow-x-clip py-12 px-4 sm:px-6 lg:px-8">
      {/* Top Floating Reading Bar & Share */}
      <ArticleShareBar title={post.title} slug={post.slug} />

      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/15 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto pt-8">
        {/* Top Back Navigation */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono font-semibold text-slate-300 hover:text-white hover:border-white/25 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Blog &amp; Articles
          </Link>
        </div>

        {/* Article Header Container */}
        <header className="mb-10 p-8 sm:p-12 rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${post.coverColor}`} />

          {/* Meta Info Pill Row */}
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-mono text-slate-400">
            <span className="px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              {post.readTime}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.15] mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 font-normal border-l-2 border-indigo-500/50 pl-4 italic">
            {post.excerpt}
          </p>

          {/* Author info */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-sm shadow-md">
                ZI
              </div>
              <div>
                <p className="text-sm font-bold text-white">{post.author}</p>
                <p className="text-[11px] text-slate-400 font-mono">Software Engineer &amp; Researcher</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Verified Technical Writing</span>
            </div>
          </div>
        </header>

        {/* Article Body Content */}
        <main className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl mb-10 shadow-2xl">
          <ArticleContent content={post.content} />
        </main>

        {/* Author Bio Card */}
        <div className="mb-10 p-8 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-white text-lg">
                &lt;Z/&gt;
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Written by {post.author}</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Full-Stack Software Engineer &amp; AI Researcher. Passionate about Next.js, distributed systems, and real-world web performance.
              </p>
            </div>
          </div>

          <Link
            href="/#contact"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/25 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </Link>
        </div>

        {/* Related Articles Showcase */}
        {relatedPosts.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="p-6 rounded-2xl border border-white/10 bg-slate-950/70 hover:border-indigo-400/40 transition-all group"
                >
                  <span className="text-[10px] font-mono font-bold uppercase text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-400/20">
                    {r.category}
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mt-3 mb-2">
                    {r.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Next / Previous Article Footer Nav */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="p-6 rounded-2xl border border-white/10 bg-slate-950/60 hover:border-indigo-400/40 transition-all flex flex-col justify-between"
            >
              <span className="text-[10px] font-mono uppercase text-slate-400 mb-2">← Previous Article</span>
              <p className="text-sm font-bold text-white line-clamp-2">{prevPost.title}</p>
            </Link>
          ) : <div />}

          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="p-6 rounded-2xl border border-white/10 bg-slate-950/60 hover:border-indigo-400/40 transition-all flex flex-col justify-between text-right"
            >
              <span className="text-[10px] font-mono uppercase text-slate-400 mb-2">Next Article →</span>
              <p className="text-sm font-bold text-white line-clamp-2">{nextPost.title}</p>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}

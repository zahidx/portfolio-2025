"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    BookOpen,
    Calendar,
    Clock,
    Search
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function ArticlesShowcase({ posts: initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (initialPosts.length === 0) {
      fetch("/api/posts")
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
        .then((data) => {
          if (Array.isArray(data)) setPosts(data);
        })
        .catch((err) => console.error("Error fetching posts:", err));
    }
  }, [initialPosts]);

  const categories = useMemo(() => {
    const set = new Set(["All"]);
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <section className="py-16 id='articles'">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-mono uppercase tracking-widest mb-3">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          Technical Articles &amp; Insights
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Written{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400">
            Articles &amp; Guides
          </span>
        </h2>
        <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Deep dives into software architecture, computer vision research, and modern web application development.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles or tags..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[0.05] border border-white/10 text-white placeholder-slate-400 text-xs font-mono focus:outline-none focus:border-indigo-400/50 transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                  : "bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl overflow-hidden hover:border-indigo-400/40 hover:shadow-2xl hover:shadow-indigo-950/50 transition-all duration-300"
            >
              {/* Top Cover Gradient Banner */}
              <div className={`h-2.5 w-full bg-gradient-to-r ${post.coverColor}`} />

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  {/* Meta Bar */}
                  <div className="flex items-center justify-between gap-2 mb-4 text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-indigo-400" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-purple-400" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-400/20 text-[10px] font-mono font-bold text-indigo-300 uppercase tracking-wider mb-3">
                    {post.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug mb-3">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-400 text-xs leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.06]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Read Article CTA */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 group-hover:text-indigo-300 group-hover:translate-x-1 transition-all"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 text-slate-500 font-mono text-xs">
          No articles found matching &ldquo;{searchQuery}&rdquo;. Try another search term!
        </div>
      )}
    </section>
  );
}

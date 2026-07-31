"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Share2, Check, Copy, Twitter, Linkedin } from "lucide-react";

export default function ArticleShareBar({ title, slug }) {
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 25 });

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://portfolio-2025-u.netlify.app/blog/${slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const shareTwitter = () => {
    const text = encodeURIComponent(`Check out "${title}" by @zahidx`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const shareLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Floating Share Controls Bar */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 p-2 rounded-full border border-white/15 bg-slate-950/85 backdrop-blur-xl shadow-2xl">
        <button
          onClick={copyLink}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.06] hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all"
          title="Copy article link"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Link Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Share</span>
            </>
          )}
        </button>

        <button
          onClick={shareTwitter}
          className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-sky-400 transition-colors"
          title="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
        </button>

        <button
          onClick={shareLinkedin}
          className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-blue-400 transition-colors"
          title="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}

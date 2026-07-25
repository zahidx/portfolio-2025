"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Shuffle, ChevronLeft, ChevronRight } from "lucide-react";

const QUOTES = [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
  },
  {
    text: "Believe you can, and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "Stay hungry. Stay foolish.",
    author: "Steve Jobs",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
];

const MANIFESTO = [
  { k: "01", label: "Learn daily", v: "One new idea, every single day." },
  { k: "02", label: "Explore widely", v: "Cultures, places, and wild ideas." },
  { k: "03", label: "Create first", v: "Creativity sits at the center." },
  { k: "04", label: "Solve hard things", v: "Tech is the craft; problems are the game." },
  { k: "05", label: "Ship often", v: "Ideas are cheap. Finished work isn't." },
  { k: "06", label: "Share freely", v: "Open source, mentor, give feedback." },
];

const AUTOPLAY_MS = 7000;

function KineticQuote({ text }) {
  const words = text.split(" ");
  return (
    <p className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.25] tracking-tight max-w-4xl mx-auto">
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.3em] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-500"
          initial={{ opacity: 0, y: 28, rotateX: 40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.45,
            delay: i * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

export default function Quite() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeFact, setActiveFact] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % QUOTES.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + QUOTES.length) % QUOTES.length),
    []
  );
  const shuffle = useCallback(() => {
    setIndex((i) => {
      if (QUOTES.length < 2) return i;
      let n = i;
      while (n === i) n = Math.floor(Math.random() * QUOTES.length);
      return n;
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, next, index]);

  // manifesto auto-highlight
  useEffect(() => {
    const t = setInterval(
      () => setActiveFact((i) => (i + 1) % MANIFESTO.length),
      2800
    );
    return () => clearInterval(t);
  }, []);

  const quote = QUOTES[index];

  return (
    <section className="py-8" id="words">
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-fuchsia-400">
          Kinetic theater
        </span>
        <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight">
          Words that{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400">
            move me
          </span>
        </h2>
      </motion.div>

      {/* immersive quote stage */}
      <div
        className="relative py-16 sm:py-24"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Quote className="absolute top-4 left-4 sm:left-8 w-20 h-20 text-white/[0.04] rotate-180 pointer-events-none" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[70%] h-[70%] rounded-full bg-fuchsia-600/10 blur-[100px]" />
        </div>

        <div className="relative text-center px-4 min-h-[200px] sm:min-h-[240px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <KineticQuote text={quote.text} />
              <motion.p
                className="mt-8 text-xs sm:text-sm uppercase tracking-[0.35em] text-fuchsia-300/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                — {quote.author}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            className="p-2.5 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-colors"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={shuffle}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/15 text-xs uppercase tracking-widest text-slate-300 hover:text-white hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 transition-all"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Shuffle
          </button>
          <button
            type="button"
            onClick={next}
            className="p-2.5 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-colors"
            aria-label="Next quote"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === index ? "w-10 bg-fuchsia-400" : "w-2 bg-white/20"
              }`}
              aria-label={`Quote ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* manifesto — editorial list, not cards */}
      <div className="mt-20 max-w-3xl mx-auto">
        <div className="flex items-end justify-between mb-8 px-1">
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Life manifesto
          </h3>
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
            Auto-highlight
          </span>
        </div>

        <ul className="divide-y divide-white/[0.06]">
          {MANIFESTO.map((item, i) => {
            const on = i === activeFact;
            return (
              <li key={item.k}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveFact(i)}
                  onFocus={() => setActiveFact(i)}
                  onClick={() => setActiveFact(i)}
                  className="w-full text-left py-5 sm:py-6 flex items-baseline gap-4 sm:gap-8 group transition-colors"
                >
                  <span
                    className={`font-mono text-xs sm:text-sm transition-colors duration-300 ${
                      on ? "text-fuchsia-400" : "text-slate-600"
                    }`}
                  >
                    {item.k}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span
                      className={`block text-lg sm:text-2xl font-bold tracking-tight transition-all duration-300 ${
                        on
                          ? "text-white translate-x-1 sm:translate-x-2"
                          : "text-slate-500 group-hover:text-slate-300"
                      }`}
                    >
                      {item.label}
                    </span>
                    <AnimatePresence>
                      {on && (
                        <motion.span
                          className="block mt-1 text-sm text-slate-400"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          {item.v}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

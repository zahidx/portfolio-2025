"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sunrise,
  Code2,
  Coffee,
  Dumbbell,
  Gamepad2,
  Moon,
  Sparkles,
} from "lucide-react";

const MOMENTS = [
  {
    time: "06:30",
    title: "Wake & reset",
    text: "Quiet morning, stretch, and a clear head before the noise starts.",
    icon: Sunrise,
    hue: "#fbbf24",
  },
  {
    time: "09:00",
    title: "Deep work",
    text: "Focused coding blocks — no meetings, just building.",
    icon: Code2,
    hue: "#818cf8",
  },
  {
    time: "13:00",
    title: "Coffee & ideas",
    text: "Sketch features, read a paper, or dump half-formed thoughts.",
    icon: Coffee,
    hue: "#fb923c",
  },
  {
    time: "17:00",
    title: "Move the body",
    text: "Cricket, walk, or a quick workout — debugging outdoors.",
    icon: Dumbbell,
    hue: "#38bdf8",
  },
  {
    time: "20:00",
    title: "Play & unwind",
    text: "A game, a film, or music loud enough to reset the day.",
    icon: Gamepad2,
    hue: "#f472b6",
  },
  {
    time: "23:00",
    title: "Night notes",
    text: "Journal one win, one lesson, then sleep like a pro.",
    icon: Moon,
    hue: "#c084fc",
  },
];

export default function Journey() {
  const trackRef = useRef(null);
  const cardsRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const calculateScroll = () => {
      if (cardsRef.current) {
        // Distance needed to scroll all cards completely across the screen
        const totalTrackWidth = cardsRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setScrollWidth(Math.max(0, totalTrackWidth - viewportWidth + 96));
      }
    };

    calculateScroll();
    const timer = setTimeout(calculateScroll, 400);
    window.addEventListener("resize", calculateScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateScroll);
    };
  }, []);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, scrollWidth ? -scrollWidth : -1200]
  );
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={trackRef} className="relative h-[320vh]" id="journey">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full mb-6 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/90">
              <Sparkles className="w-3.5 h-3.5" />
              Scroll-driven story
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight">
              A day in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400">
                my life
              </span>
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-md">
              Keep scrolling — the timeline moves horizontally to the end before continuing down.
            </p>
          </motion.div>

          {/* progress rail */}
          <div className="mt-5 h-[3px] bg-white/10 rounded-full overflow-hidden max-w-xs">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-fuchsia-500"
              style={{ width: progress }}
            />
          </div>
        </div>

        <motion.div
          ref={cardsRef}
          style={{ x }}
          className="flex gap-6 sm:gap-10 px-4 sm:px-8 will-change-transform"
        >
          {MOMENTS.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={m.time}
                className="relative shrink-0 w-[78vw] sm:w-[380px] max-w-[420px]"
              >
                {/* timeline connector */}
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="font-mono text-sm font-bold tracking-wider"
                    style={{ color: m.hue }}
                  >
                    {m.time}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/30 to-transparent" />
                  <span className="text-[10px] uppercase tracking-widest text-slate-500">
                    0{i + 1} / 0{MOMENTS.length}
                  </span>
                </div>

                <div className="relative pl-1">
                  <div
                    className="absolute -left-1 top-0 bottom-0 w-[2px] rounded-full"
                    style={{
                      background: `linear-gradient(to bottom, ${m.hue}, transparent)`,
                    }}
                  />
                  <div className="pl-6">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                      style={{
                        background: `${m.hue}18`,
                        boxShadow: `0 0 40px ${m.hue}33`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: m.hue }} />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {m.title}
                    </h3>
                    <p className="mt-3 text-slate-400 leading-relaxed text-base max-w-sm">
                      {m.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {/* end spacer */}
          <div className="shrink-0 w-16 sm:w-32" />
        </motion.div>
      </div>
    </section>
  );
}

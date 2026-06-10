"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  {
    title: "Smart Revision",
    description: "Our spaced repetition engine surfaces problems right before you forget them. No more cramming — just steady, science-backed recall that compounds over time.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    accent: "from-cyan-500 to-blue-500",
    visual: {
      type: "calendar",
      items: [
        { day: "Mon", problems: 3, done: true },
        { day: "Tue", problems: 5, done: true },
        { day: "Wed", problems: 2, done: true },
        { day: "Thu", problems: 4, done: false },
        { day: "Fri", problems: 6, done: false },
      ],
    },
  },
  {
    title: "Organized Learning",
    description: "Tag, filter, and group problems by topic, difficulty, or platform. Your personal DSA library — always structured, never chaotic.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
      </svg>
    ),
    accent: "from-violet-500 to-purple-500",
    visual: {
      type: "tags",
      items: ["Dynamic Programming", "Graphs", "Trees", "Greedy", "Sliding Window", "Binary Search"],
    },
  },
  {
    title: "Long-Term Retention",
    description: "Real mastery means remembering what you solved months ago. We make that effortless with intelligent scheduling and progress tracking.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    accent: "from-amber-500 to-orange-500",
    visual: {
      type: "progress",
      items: [
        { label: "Week 1", value: 30 },
        { label: "Week 4", value: 55 },
        { label: "Week 8", value: 78 },
        { label: "Week 12", value: 94 },
      ],
    },
  },
  {
    title: "Multi-Platform Sync",
    description: "Import solved problems from LeetCode, Codeforces, CodeChef, and GeeksForGeeks. One unified hub for all your progress across platforms.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-3.02a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.374" />
      </svg>
    ),
    accent: "from-rose-500 to-pink-500",
    visual: {
      type: "platforms",
      items: [
        { name: "LeetCode", count: 342, color: "bg-amber-500" },
        { name: "Codeforces", count: 128, color: "bg-blue-500" },
        { name: "CodeChef", count: 95, color: "bg-orange-500" },
        { name: "GFG", count: 210, color: "bg-green-500" },
      ],
    },
  },
];

/* ── Sticky Panel Visuals ── */
function CalendarVisual({ data }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-foreground">This Week</span>
        <span className="text-xs text-muted-foreground">3/5 completed</span>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {data.items.map((d, i) => (
          <motion.div key={d.day} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.08 }} className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{d.day}</span>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${d.done ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-white/[0.04] text-muted-foreground border border-white/[0.06]"}`}>
              {d.problems}
            </div>
            {d.done && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
          </motion.div>
        ))}
      </div>
      <div className="mt-4 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
        <p className="text-xs text-cyan-400 font-medium">🧠 Next revision: &quot;Merge Intervals&quot; in 2 hours</p>
      </div>
    </div>
  );
}

function TagsVisual({ data }) {
  return (
    <div className="space-y-4">
      <span className="text-sm font-semibold text-foreground">Your Topics</span>
      <div className="flex flex-wrap gap-2">
        {data.items.map((tag, i) => (
          <motion.span key={tag} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.07, type: "spring" }} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-violet-500/15 text-violet-400 border border-violet-500/20 hover:bg-violet-500/25 transition-colors cursor-pointer">
            {tag}
          </motion.span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {["Easy", "Medium", "Hard", "All"].map((d, i) => (
          <motion.div key={d} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 + i * 0.06 }} className={`p-2.5 rounded-lg text-center text-xs font-medium border ${i === 3 ? "bg-violet-500/20 border-violet-500/30 text-violet-400" : "bg-white/[0.03] border-white/[0.06] text-muted-foreground"}`}>
            {d}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProgressVisual({ data }) {
  return (
    <div className="space-y-4">
      <span className="text-sm font-semibold text-foreground">Retention Curve</span>
      <div className="space-y-3">
        {data.items.map((item, i) => (
          <motion.div key={item.label} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="text-amber-400 font-semibold">{item.value}%</span>
            </div>
            <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${item.value}%` }} transition={{ delay: i * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }} className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PlatformsVisual({ data }) {
  const total = data.items.reduce((s, p) => s + p.count, 0);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-foreground">Connected Platforms</span>
        <span className="text-xs text-muted-foreground">{total} total</span>
      </div>
      <div className="space-y-2">
        {data.items.map((p, i) => (
          <motion.div key={p.name} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors cursor-pointer">
            <div className={`w-8 h-8 rounded-lg ${p.color} flex items-center justify-center`}>
              <span className="text-white text-[10px] font-bold">{p.name[0]}</span>
            </div>
            <div className="flex-1">
              <span className="text-sm text-foreground font-medium">{p.name}</span>
            </div>
            <span className="text-xs font-semibold text-muted-foreground">{p.count} solved</span>
            <div className="w-2 h-2 rounded-full bg-green-400" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const visualComponents = { calendar: CalendarVisual, tags: TagsVisual, progress: ProgressVisual, platforms: PlatformsVisual };

function StickyPanel({ activeIndex }) {
  const section = sections[activeIndex];
  const VisualComp = visualComponents[section.visual.type];
  return (
    <div className="relative w-full min-h-[420px] rounded-2xl dark:bg-white/[0.03] bg-card backdrop-blur-xl border border-border dark:border-white/[0.08] p-6">
      <div className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none" style={{ background: "linear-gradient(135deg, transparent 40%, rgba(120,200,255,0.08))" }} />
      <div className="flex items-center gap-2 mb-1">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-amber-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
        <div className="flex-1 mx-3 h-6 rounded-md dark:bg-white/[0.04] bg-secondary border border-border dark:border-white/[0.06] flex items-center px-3">
          <span className="text-[10px] text-muted-foreground font-mono">tryagainlater.app</span>
        </div>
      </div>
      <div className="relative z-10 mt-4">
        <AnimatePresence mode="wait">
          <motion.div key={activeIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35, ease: "easeOut" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${section.accent} flex items-center justify-center text-white`}>
                {section.icon}
              </div>
              <h4 className="text-sm font-bold text-foreground">{section.title}</h4>
            </div>
            <VisualComp data={section.visual} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function WhoWeAre() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const triggerRefs = useRef([]);

  // Scroll-based active card detection using trigger divs
  const handleScroll = useCallback(() => {
    const viewportCenter = window.innerHeight / 2;
    let closest = 0;
    let closestDist = Infinity;
    triggerRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const dist = Math.abs(elCenter - viewportCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section id="who-we-are" className="relative py-8 sm:py-16 px-4 sm:px-6 lg:px-8 bg-background">
      {/* BG blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div animate={{ y: [0, -30, 0], opacity: [0.04, 0.07, 0.04] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, oklch(0.55 0.15 195) 0%, transparent 70%)", filter: "blur(100px)" }} />
        <motion.div animate={{ y: [0, 25, 0], opacity: [0.03, 0.06, 0.03] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-0 -right-32 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, oklch(0.60 0.18 280) 0%, transparent 70%)", filter: "blur(120px)" }} />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-primary" />
              Who We Are
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
            We don&apos;t just solve problems.<br />
            <motion.span initial={{ backgroundPosition: "100% center" }} animate={{ backgroundPosition: "0% center" }} transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }} className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent bg-[length:200%_auto]">
              We remember them.
            </motion.span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            We&apos;re DSA enthusiasts who know the frustration of forgetting solved questions. So we built a platform that makes revision systematic — because{" "}
            <span className="text-foreground font-medium">consistency beats volume, every time.</span>
          </p>
        </div>

        {/* ── Desktop Scrollytelling ── */}
        <div ref={containerRef} className="hidden lg:block relative">
          {/* This is the tall scroll container — each card gets 100vh of scroll space */}
          <div style={{ height: `${sections.length * 100}vh` }} className="relative">
            {/* Invisible trigger divs — one per card, stacked vertically */}
            {sections.map((_, i) => (
              <div
                key={i}
                ref={(el) => { triggerRefs.current[i] = el; }}
                className="absolute w-1/2"
                style={{
                  top: `${i * 100}vh`,
                  height: "100vh",
                }}
              />
            ))}

            {/* Sticky wrapper for both columns — sticks for entire scroll duration */}
            <div className="sticky top-0 h-screen flex items-center">
              <div className="w-full grid grid-cols-2 gap-16 items-center ">
                {/* Left: stacking cards */}
                <div className="relative" style={{ height: "460px" }}>
                  <AnimatePresence mode="wait">
                    {sections.map((section, i) => {
                      const isActive = activeIndex === i;
                      // Show: active card, one before (behind), one after (behind)
                      const diff = i - activeIndex;
                      const isVisible = diff >= 0 && diff <= 1;
                      if (!isVisible) return null;

                      return (
                        <motion.div
                          key={section.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{
                            opacity: diff === 0 ? 1 : diff === 1 ? 0.2 : 0.15,
                            y: diff * 10,
                            scale: 1 - diff * 0.055,
                          }}
                          exit={{ opacity: 0.2  , y: -10 }}
                          transition={{ duration: 0.2, ease: [0.23, 0.86, 0.39, 0.96] }}
                          className={`absolute inset-x-0 top-16 p-6 sm:p-7 rounded-2xl backdrop-blur-xl border
                            ${isActive
                              ? "dark:bg-background/95 bg-card border-primary/30 shadow-xl shadow-primary/10"
                              : "dark:bg-background/80 bg-card/80 border-border dark:border-white/[0.06]"
                            }`}
                          style={{ zIndex: sections.length - diff }}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="cardGlow"
                              className="absolute inset-0 rounded-2xl border-2 border-primary/25 pointer-events-none"
                              transition={{ duration: 0.3 }}
                            />
                          )}
                          <div className="relative z-10 flex gap-4 items-start">
                            <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${section.accent} flex items-center justify-center text-white shadow-lg transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                              {section.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-mono font-bold tracking-widest text-primary/50">0{i + 1}</span>
                              <h3 className="font-bold text-lg text-foreground tracking-tight mb-2">{section.title}</h3>
                              <p className="text-sm text-muted-foreground leading-relaxed">{section.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Right: sticky preview panel */}
                <div>
                  <StickyPanel activeIndex={activeIndex} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile: simple vertical layout ── */}
        <div className="lg:hidden flex flex-col gap-6">
          {sections.map((section, i) => {
            const isActive = activeIndex === i;
            return (
              <div key={section.title} ref={(el) => { if (typeof window !== "undefined" && window.innerWidth < 1024) triggerRefs.current[i] = el; }}>
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0.5 }}
                  transition={{ duration: 0.4 }}
                  className={`p-6 rounded-2xl border backdrop-blur-xl ${isActive ? "bg-card border-primary/30 shadow-lg shadow-primary/10" : "bg-card/50 border-border"}`}
                >
                  <div className="flex gap-4 items-start">
                    <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${section.accent} flex items-center justify-center text-white shadow-lg`}>
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-primary/50">0{i + 1}</span>
                      <h3 className="font-bold text-lg text-foreground tracking-tight mb-2">{section.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{section.description}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
          <div className="mt-4">
            <StickyPanel activeIndex={activeIndex} />
          </div>
        </div>
      </div>
    </section>
  );
}

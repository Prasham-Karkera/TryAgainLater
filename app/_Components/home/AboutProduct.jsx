"use client";

import { motion } from "framer-motion";

const productFeatures = [
  {
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
    title: "Spaced Repetition Engine",
    desc: "Scientifically timed reminders resurface problems before you forget them. Each review strengthens the neural pathway.",
  },
  {
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>),
    title: "Analytics Dashboard",
    desc: "Visualize your strengths and weaknesses across topics. Track streaks, revision history, and mastery progress over time.",
  },
  {
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-3.02a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.374" /></svg>),
    title: "Multi-Platform Sync",
    desc: "Import solved problems from LeetCode, Codeforces, CodeChef, and GeeksForGeeks. One place for all your progress.",
  },
  {
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>),
    title: "Smart Tagging & Filters",
    desc: "Auto-tag problems by pattern (DP, Graphs, Trees, etc.) and filter by difficulty, platform, or mastery level.",
  },
];

const stats = [
  { value: "50K+", label: "Problems Tracked", icon: "📊" },
  { value: "10K+", label: "Active Users", icon: "👥" },
  { value: "95%", label: "Retention Rate", icon: "🧠" },
  { value: "4.9★", label: "User Rating", icon: "⭐" },
];

function FeatureItem({ feature, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.23, 0.86, 0.39, 0.96] }}
      whileHover={{ x: 8, transition: { duration: 0.2 } }}
      className="group flex gap-5 items-start p-5 rounded-xl hover:bg-white/[0.03] transition-all duration-300 cursor-pointer"
    >
      <motion.div whileHover={{ scale: 1.15, rotate: 8 }} transition={{ duration: 0.2 }} className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary group-hover:from-primary/35 group-hover:to-primary/10 transition-all duration-300 shadow-lg shadow-primary/5 group-hover:shadow-primary/15">
        {feature.icon}
      </motion.div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground text-base mb-1 tracking-tight">{feature.title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
      </div>
    </motion.div>
  );
}

export default function AboutProduct() {
  return (
    <section id="about-product" className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <motion.div animate={{ y: [0, -25, 0], x: [0, 10, 0], opacity: [0.03, 0.06, 0.03] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 -left-20 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, oklch(0.55 0.15 195) 0%, transparent 70%)", filter: "blur(120px)" }} />
        <motion.div animate={{ y: [0, 20, 0], opacity: [0.02, 0.05, 0.02] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }} className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, oklch(0.60 0.15 280) 0%, transparent 70%)", filter: "blur(100px)" }} />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.012]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold tracking-[0.2em] uppercase text-violet-400">
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              The Product
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
            Your DSA journey,{" "}<br className="hidden sm:block" />
            <motion.span initial={{ backgroundPosition: "100% center" }} animate={{ backgroundPosition: "0% center" }} transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }} className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent bg-[length:200%_auto]">
              reimagined
            </motion.span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            TRYAGAINLATER isn&apos;t just another problem tracker. It&apos;s a complete revision ecosystem designed to make every solved problem count — forever.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Product mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 0.86, 0.39, 0.96] }}
            className="relative"
          >
            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 overflow-hidden">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <div className="flex-1 mx-4 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center px-3">
                  <span className="text-[10px] text-muted-foreground font-mono">tryagainlater.app/dashboard</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Revision Dashboard</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">12 problems due today</p>
                </div>
                <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="px-3 py-1.5 rounded-lg bg-green-500/15 border border-green-500/20 text-xs font-semibold text-green-400">
                  🔥 42 day streak
                </motion.div>
              </div>
              <div className="space-y-3 mb-5">
                {[
                  { label: "Dynamic Programming", progress: 78, color: "bg-cyan-500" },
                  { label: "Graph Theory", progress: 62, color: "bg-violet-500" },
                  { label: "Trees & BST", progress: 91, color: "bg-emerald-500" },
                ].map((item, i) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="text-foreground font-medium">{item.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 1.2, delay: 0.5 + i * 0.2, ease: "easeOut" }}
                        className={`h-full ${item.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  { name: "Merge K Sorted Lists", diff: "Hard", platform: "LC", status: "Due" },
                  { name: "LCA of Binary Tree", diff: "Medium", platform: "GFG", status: "Revised" },
                  { name: "Sliding Window Maximum", diff: "Hard", platform: "CF", status: "Due" },
                ].map((problem, i) => (
                  <motion.div key={problem.name} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + i * 0.15, duration: 0.4 }} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-bold bg-white/[0.06] text-muted-foreground px-2 py-1 rounded">{problem.platform}</span>
                      <span className="text-sm text-foreground font-medium">{problem.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${problem.diff === "Hard" ? "bg-red-500/15 text-red-400" : "bg-amber-500/15 text-amber-400"}`}>{problem.diff}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${problem.status === "Due" ? "bg-blue-500/15 text-blue-400" : "bg-green-500/15 text-green-400"}`}>{problem.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5, ease: "backOut" }}
              className="absolute -bottom-4 -right-4 sm:-right-6 bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] rounded-xl p-4 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Pattern Mastered!</p>
                  <p className="text-[10px] text-muted-foreground">Sliding Window • 12 problems</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Features list */}
          <div className="flex flex-col gap-2">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
                Everything you need to <span className="text-primary">never forget</span>
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A complete toolkit designed around how your brain actually learns and retains information.
              </p>
            </div>
            {productFeatures.map((feature, i) => (
              <FeatureItem key={feature.title} feature={feature} index={i} />
            ))}
            <div className="mt-6 pl-5">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 20px 40px -8px rgba(120,200,255,0.2)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-xl transition-shadow duration-300"
              >
                Try It Free
                <motion.svg animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </motion.svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.2 } }}
              className="group flex flex-col items-center gap-2 p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] hover:border-primary/20 transition-all duration-300 cursor-pointer"
            >
              <span className="text-2xl mb-1">{stat.icon}</span>
              <span className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{stat.value}</span>
              <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

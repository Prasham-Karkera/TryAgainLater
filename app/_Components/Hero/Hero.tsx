"use client";

import { motion } from "framer-motion";

const platforms = [
  { name: "LeetCode", color: "bg-amber-500" },
  { name: "Codeforces", color: "bg-blue-500" },
  { name: "CodeChef", color: "bg-orange-600" },
  { name: "GFG", color: "bg-green-600" },
];

const floatingProblems = [
  { name: "Two Sum", difficulty: "Easy", platform: "LC" },
  { name: "Binary Search", difficulty: "Easy", platform: "GFG" },
  { name: "DP on Trees", difficulty: "Hard", platform: "CF" },
];

export function HeroSection() {
  return (
    <section className="min-h-screen pt-24 pb-16 px-6 flex items-center justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance"
            >
              Never forget a{" "}
              <span className="text-primary pl-10 md:pl-20">problem</span> you
              {"'"}ve already solved
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              Daily revision questions from problems you{"'"}ve already cracked.
              Stay sharp for placements, contests, and interviews.
            </motion.p>

            {/* Platform Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {platforms.map((platform, index) => (
                <motion.span
                  key={platform.name}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                  className={`px-3 py-1.5 ${platform.color} text-white rounded-full text-xs font-medium`}
                >
                  {platform.name}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
              >
                Start Revising Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium text-sm border border-border hover:bg-muted transition-colors"
              >
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex gap-8 pt-6"
            >
              {[
                { value: "10K+", label: "Students" },
                { value: "50K+", label: "Problems Revised" },
                { value: "4.9", label: "Rating" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                  className="flex flex-col"
                >
                  <span className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative block"
          >
            {/* Main Card */}
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="bg-card border border-border rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Today{"'"}s Revision
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      3 problems waiting
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {floatingProblems.map((problem, index) => (
                    <motion.div
                      key={problem.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.15 }}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono bg-secondary px-2 py-1 rounded text-muted-foreground">
                          {problem.platform}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {problem.name}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          problem.difficulty === "Easy"
                            ? "bg-green-100 text-green-700"
                            : problem.difficulty === "Medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm"
                >
                  Start Revision Session
                </motion.button>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-2 rounded-lg text-xs font-medium shadow-lg"
              >
                ✓ 99 day streak!
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

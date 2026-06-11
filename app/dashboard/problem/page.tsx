"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Problem {
  id: string;
  title: string;
  platform: string;
  difficulty: "Easy" | "Medium" | "Hard";
  link: string;
  date: string;
  tags: string[];
}

const mockProblems: Problem[] = [
  {
    id: "1",
    title: "Two Sum",
    platform: "LeetCode",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/two-sum/",
    date: "2024-01-23",
    tags: ["Array", "Hash Map"],
  },
  {
    id: "2",
    title: "A+B",
    platform: "Codeforces",
    difficulty: "Easy",
    link: "https://codeforces.com/problemset/problem/1/A",
    date: "2024-01-23",
    tags: ["Math", "Implementation"],
  },
  {
    id: "3",
    title: "Reverse String",
    platform: "CodeChef",
    difficulty: "Easy",
    link: "https://www.codechef.com/problems/STRREV",
    date: "2024-01-23",
    tags: ["String", "Basic"],
  },
];

export default function ProblemOfTheDayPage() {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Randomly select a problem
    const randomProblem =
      mockProblems[Math.floor(Math.random() * mockProblems.length)];
    setProblem(randomProblem);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30";
      case "Hard":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getDifficultyGlow = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "shadow-green-500/20";
      case "Medium":
        return "shadow-yellow-500/20";
      case "Hard":
        return "shadow-red-500/20";
      default:
        return "";
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "LeetCode":
        return "💻";
      case "Codeforces":
        return "⚡";
      case "CodeChef":
        return "🍳";
      default:
        return "📝";
    }
  };

  const getPlatformGradient = (platform: string) => {
    switch (platform) {
      case "LeetCode":
        return "from-amber-500/10 to-orange-500/5";
      case "Codeforces":
        return "from-blue-500/10 to-cyan-500/5";
      case "CodeChef":
        return "from-orange-500/10 to-red-500/5";
      default:
        return "from-primary/10 to-primary/5";
    }
  };

  if (!isMounted || !problem) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="w-12 h-12 border-4 border-border border-t-primary rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute inset-0 w-12 h-12 border-4 border-transparent border-b-primary/30 rounded-full"
            />
          </div>
          <p className="text-sm text-muted-foreground animate-pulse">Loading problem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 20, -10, 0], y: [0, -30, 15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 right-0 w-72 h-72 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -15, 25, 0], y: [0, 20, -10, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 -left-20 w-64 h-64 bg-chart-4/5 dark:bg-chart-4/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-2.5 h-2.5 rounded-full bg-primary shadow-lg shadow-primary/50"
            />
            <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
              Daily Challenge
            </span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">
            Today&apos;s Problem
          </h1>
          <p className="text-muted-foreground text-lg">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        {/* Problem Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="max-w-3xl"
        >
          <div className={`relative bg-card/50 dark:bg-card/30 backdrop-blur-xl border border-border/60 rounded-2xl p-8 shadow-lg overflow-hidden group`}>
            {/* Top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b ${getPlatformGradient(problem.platform)} to-transparent`} />

            <div className="relative z-10">
              {/* Platform Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-12 rounded-xl bg-card/80 dark:bg-card/50 border border-border/50 flex items-center justify-center shadow-sm">
                  <span className="text-2xl">
                    {getPlatformIcon(problem.platform)}
                  </span>
                </div>
                <span className="px-4 py-2 bg-primary/10 dark:bg-primary/15 text-primary rounded-full font-semibold text-sm border border-primary/20">
                  {problem.platform}
                </span>
              </motion.div>

              {/* Problem Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight"
              >
                {problem.title}
              </motion.h2>

              {/* Difficulty and Tags */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                <div
                  className={`px-4 py-2 rounded-full border ${getDifficultyColor(problem.difficulty)} font-semibold shadow-sm ${getDifficultyGlow(problem.difficulty)}`}
                >
                  {problem.difficulty}
                </div>
                {problem.tags.map((tag, index) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35 + index * 0.05 }}
                    className="px-3 py-2 bg-secondary/50 dark:bg-secondary/30 text-muted-foreground rounded-full text-sm border border-border/50"
                  >
                    {tag}
                  </motion.div>
                ))}
              </motion.div>

              {/* Separator */}
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-8" />

              {/* Info Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 mb-8"
              >
                <div className="flex justify-between items-center py-2 px-4 rounded-lg bg-secondary/20 dark:bg-secondary/10">
                  <span className="text-muted-foreground text-sm">Problem ID</span>
                  <span className="font-mono font-semibold text-foreground bg-secondary/50 dark:bg-secondary/30 px-3 py-1 rounded-md text-sm">
                    #{problem.id}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 px-4 rounded-lg bg-secondary/20 dark:bg-secondary/10">
                  <span className="text-muted-foreground text-sm">Date</span>
                  <span className="font-semibold text-foreground text-sm">
                    {problem.date}
                  </span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex gap-4 flex-col sm:flex-row"
              >
                <motion.a
                  href={problem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all text-center relative overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Solve Problem
                    <span className="text-sm">↗</span>
                  </span>
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-8 py-4 border-2 border-border/60 text-foreground rounded-xl font-bold text-lg hover:bg-secondary/50 dark:hover:bg-secondary/30 transition-all backdrop-blur-sm"
                  onClick={() => {
                    const randomProblem =
                      mockProblems[Math.floor(Math.random() * mockProblems.length)];
                    setProblem(randomProblem);
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: [0, 0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    >
                      🔄
                    </motion.span>
                    Get Another
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: "Problems Solved Today", value: "1", icon: "✓", gradient: "from-green-500/10 to-emerald-500/5", borderColor: "border-green-500/20" },
            { label: "Daily Streak", value: "7 days", icon: "🔥", gradient: "from-orange-500/10 to-amber-500/5", borderColor: "border-orange-500/20" },
            { label: "This Week", value: "5", icon: "📊", gradient: "from-blue-500/10 to-cyan-500/5", borderColor: "border-blue-500/20" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative bg-card/50 dark:bg-card/30 backdrop-blur-sm border ${stat.borderColor} rounded-2xl p-6 text-center overflow-hidden group cursor-default`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

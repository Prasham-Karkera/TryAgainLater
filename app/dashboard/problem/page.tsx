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
        return "bg-green-500/10 text-green-600 border-green-500/30";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30";
      case "Hard":
        return "bg-red-500/10 text-red-600 border-red-500/30";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/30";
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

  if (!isMounted || !problem) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-12 h-12 border-4 border-border border-t-primary rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Today's Problem
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="max-w-3xl"
      >
        <div className="bg-background border-2 border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          {/* Platform Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="text-3xl">
              {getPlatformIcon(problem.platform)}
            </span>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold text-sm">
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
              className={`px-4 py-2 rounded-full border ${getDifficultyColor(problem.difficulty)} font-semibold`}
            >
              {problem.difficulty}
            </div>
            {problem.tags.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + index * 0.05 }}
                className="px-3 py-2 bg-secondary/50 text-muted-foreground rounded-full text-sm border border-border"
              >
                {tag}
              </motion.div>
            ))}
          </motion.div>

          {/* Separator */}
          <div className="h-px bg-border my-8" />

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 mb-8"
          >
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Problem ID:</span>
              <span className="font-mono font-semibold text-foreground">
                {problem.id}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-semibold text-foreground">
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
              className="flex-1 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors text-center"
            >
              Solve Problem
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-8 py-4 border-2 border-border text-foreground rounded-xl font-bold text-lg hover:bg-secondary transition-colors"
              onClick={() => {
                const randomProblem =
                  mockProblems[Math.floor(Math.random() * mockProblems.length)];
                setProblem(randomProblem);
              }}
            >
              Get Another Problem
            </motion.button>
          </motion.div>
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
          { label: "Problems Solved Today", value: "1", icon: "✓" },
          { label: "Daily Streak", value: "7 days", icon: "🔥" },
          { label: "This Week", value: "5", icon: "📊" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 + index * 0.1 }}
            className="bg-secondary/30 border border-border rounded-xl p-6 text-center"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold text-foreground mb-2">
              {stat.value}
            </div>
            <div className="text-muted-foreground text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

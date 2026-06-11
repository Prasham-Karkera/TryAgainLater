"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface PlatformConfig {
  name: string;
  id: string;
  icon: string;
  color: string;
  borderColor: string;
  gradient: string;
  glowColor: string;
}

const platforms: PlatformConfig[] = [
  {
    name: "Codeforces",
    id: "codeforces",
    icon: "⚡",
    color: "bg-blue-500/10 dark:bg-blue-500/15",
    borderColor: "border-blue-500/20 dark:border-blue-400/20",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    glowColor: "bg-blue-500",
  },
  {
    name: "CodeChef",
    id: "codechef",
    icon: "👨‍🍳",
    color: "bg-orange-500/10 dark:bg-orange-500/15",
    borderColor: "border-orange-500/20 dark:border-orange-400/20",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    glowColor: "bg-orange-500",
  },
  {
    name: "LeetCode",
    id: "leetcode",
    icon: "💻",
    color: "bg-amber-500/10 dark:bg-amber-500/15",
    borderColor: "border-amber-500/20 dark:border-amber-400/20",
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    glowColor: "bg-amber-500",
  },
];

export default function DashboardHome() {
  const [configuredPlatforms, setConfiguredPlatforms] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load configured platforms from localStorage
    const codeforces = localStorage.getItem("codeforces_id");
    const codechef = localStorage.getItem("codechef_id");
    const leetcode = localStorage.getItem("leetcode_id");

    const configured = [];
    if (codeforces) configured.push("codeforces");
    if (codechef) configured.push("codechef");
    if (leetcode) configured.push("leetcode");

    setConfiguredPlatforms(configured);
    setLoading(false);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin" />
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-b-primary/30 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
          </div>
          <p className="text-muted-foreground text-sm animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const allConfigured = configuredPlatforms.length === 3;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 30, 0],
            y: [0, 30, -20, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -left-32 w-80 h-80 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 20, -30, 0],
            y: [0, -20, 40, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 right-1/4 w-72 h-72 bg-chart-2/5 dark:bg-chart-2/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-lg shadow-green-500/50"
            />
            <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
              Dashboard
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3 tracking-tight">
            Welcome Back!
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Keep your DSA skills sharp with daily revision problems
          </p>
        </motion.div>

        {/* Status Card */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-2xl border border-border/60 p-6 sm:p-8 mb-10 bg-card/50 dark:bg-card/30 backdrop-blur-xl shadow-sm overflow-hidden group"
        >
          {/* Subtle top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-primary/5 to-transparent" />

          <div className="relative flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center">
                <span className="text-lg">🎯</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Setup Status</h2>
            </div>
            <div className="flex gap-2">
              {platforms.map((platform) => (
                <motion.div
                  key={platform.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className={`w-3 h-3 rounded-full transition-colors duration-500 ${
                    configuredPlatforms.includes(platform.id)
                      ? "bg-green-500 shadow-lg shadow-green-500/40"
                      : "bg-muted-foreground/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative mb-4">
            <div className="h-1.5 bg-secondary/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(configuredPlatforms.length / 3) * 100}%` }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-chart-2 rounded-full"
              />
            </div>
          </div>

          <p className="text-muted-foreground">
            {allConfigured
              ? "✓ All platforms connected! You can start revising now."
              : `${configuredPlatforms.length} of 3 platforms configured`}
          </p>
        </motion.div>

        {/* Platform Configuration Cards */}
        {!allConfigured && (
          <motion.div variants={itemVariants} className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <span className="text-sm">🔗</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Connect Your Platforms
              </h2>
            </div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {platforms.map((platform) => {
                const isConfigured = configuredPlatforms.includes(platform.id);
                return (
                  <motion.div
                    key={platform.id}
                    variants={cardVariants}
                    whileHover="hover"
                    className={`relative rounded-2xl border p-6 transition-all duration-300 overflow-hidden group cursor-pointer ${
                      isConfigured
                        ? `${platform.borderColor} bg-card/50 dark:bg-card/30 backdrop-blur-sm shadow-md`
                        : `border-border/50 bg-card/30 dark:bg-card/20 backdrop-blur-sm hover:border-border`
                    }`}
                  >
                    {/* Card gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    {/* Glow dot */}
                    {isConfigured && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4"
                      >
                        <div className={`w-2.5 h-2.5 rounded-full bg-green-500 shadow-lg shadow-green-500/50`} />
                      </motion.div>
                    )}

                    <div className="relative z-10">
                      <div className="text-4xl mb-3">{platform.icon}</div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {platform.name}
                      </h3>
                      {isConfigured ? (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            Connected
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Click to add your username
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}

        {/* Quick Actions */}
        {allConfigured && (
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <span className="text-sm">⚡</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Quick Actions
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="relative rounded-2xl border border-border/50 p-8 cursor-pointer group overflow-hidden bg-card/30 dark:bg-card/20 backdrop-blur-sm"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-chart-2/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <Link href="/dashboard/problem" className="block relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    Problem of the Day
                  </h3>
                  <p className="text-muted-foreground">
                    Solve a random DSA problem from your platforms
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                    <span className="text-sm font-semibold">Get started</span>
                    <span>→</span>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="relative rounded-2xl border border-border/50 p-8 cursor-pointer group overflow-hidden bg-card/30 dark:bg-card/20 backdrop-blur-sm"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-chart-4/10 via-chart-5/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-chart-4/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <Link href="/dashboard/profile" className="block relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-chart-4/10 dark:bg-chart-4/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-chart-4 transition-colors duration-300">
                    Your Profile
                  </h3>
                  <p className="text-muted-foreground">
                    Track your progress and statistics
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-chart-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                    <span className="text-sm font-semibold">View profile</span>
                    <span>→</span>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Setup Redirect */}
        {!allConfigured && (
          <motion.div variants={itemVariants} className="mt-10 text-center">
            <Link href="/dashboard/setup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl transition-all overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Complete Setup
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

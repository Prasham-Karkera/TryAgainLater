"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PlatformStats {
  name: string;
  icon: string;
  username: string;
  totalSolved: number;
  revisionsSolved: number;
  lastActive: string;
}

export default function ProfilePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [userStats, setUserStats] = useState({
    name: "Student User",
    email: "student@example.com",
    joinDate: "2024-01-15",
    totalProblemsSolved: 285,
    problemsSolvedViaApp: 42,
    currentStreak: 7,
    longestStreak: 14,
    badge: "Gold",
  });

  const [platformStats, setPlatformStats] = useState<PlatformStats[]>([]);

  const prevSolvedQuestion: {
    action: string;
    platform: string;
    time: string;
  }[] = [
    {
      action: "Solved 'Two Sum'",
      platform: "LeetCode",
      time: "2 hours ago",
    },
    {
      action: "Solved 'A+B'",
      platform: "Codeforces",
      time: "Yesterday",
    },
    {
      action: "Connected CodeChef",
      platform: "CodeChef",
      time: "3 days ago",
    },
  ];

  useEffect(() => {
    setIsMounted(true);
    fetch("/api/auth/session")
      .then(async (response) => {
        if (!response.ok) {
          return null;
        }

        return response.json();
      })
      .then((payload) => {
        if (!payload?.user) {
          return;
        }

        setUserStats((previous) => ({
          ...previous,
          name: payload.user.name,
          email: payload.user.email,
          joinDate: payload.user.memberSince,
        }));
      })
      .catch(() => {
        // Keep the fallback profile if auth is unavailable.
      });

    // Load platform data from localStorage
    const savedPlatforms = localStorage.getItem("platformIds");
    if (savedPlatforms) {
      try {
        const parsed = JSON.parse(savedPlatforms);
        const stats: PlatformStats[] = [
          {
            name: "Codeforces",
            icon: "⚡",
            username: parsed.codeforces?.username || "Not connected",
            totalSolved: 156,
            revisionsSolved: 12,
            lastActive: "2024-01-23",
          },
          {
            name: "CodeChef",
            icon: "🍳",
            username: parsed.codechef?.username || "Not connected",
            totalSolved: 89,
            revisionsSolved: 8,
            lastActive: "2024-01-22",
          },
          {
            name: "LeetCode",
            icon: "💻",
            username: parsed.leetcode?.username || "Not connected",
            totalSolved: 40,
            revisionsSolved: 22,
            lastActive: "2024-01-23",
          },
        ];
        setPlatformStats(stats);
      } catch (error) {
        console.log("[v0] Error loading platform stats:", error);
      }
    }
  }, []);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin" />
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-b-primary/30 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
          </div>
          <p className="text-sm text-muted-foreground animate-pulse">Loading profile...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Problems Solved",
      value: userStats.totalProblemsSolved,
      icon: "✓",
      gradient: "from-blue-500/10 to-blue-400/5",
      border: "border-blue-500/20",
      iconBg: "bg-blue-500/10 dark:bg-blue-500/15",
    },
    {
      label: "Via TRYAGAINLATER",
      value: userStats.problemsSolvedViaApp,
      icon: "🎯",
      gradient: "from-purple-500/10 to-purple-400/5",
      border: "border-purple-500/20",
      iconBg: "bg-purple-500/10 dark:bg-purple-500/15",
    },
    {
      label: "Current Streak",
      value: `${userStats.currentStreak} days`,
      icon: "🔥",
      gradient: "from-orange-500/10 to-orange-400/5",
      border: "border-orange-500/20",
      iconBg: "bg-orange-500/10 dark:bg-orange-500/15",
    },
    {
      label: "Longest Streak",
      value: `${userStats.longestStreak} days`,
      icon: "🏆",
      gradient: "from-yellow-500/10 to-yellow-400/5",
      border: "border-yellow-500/20",
      iconBg: "bg-yellow-500/10 dark:bg-yellow-500/15",
    },
  ];

  const getPlatformColor = (name: string) => {
    switch (name) {
      case "Codeforces":
        return { gradient: "from-blue-500 to-cyan-400", bg: "bg-blue-500/10 dark:bg-blue-500/15", border: "border-blue-500/20" };
      case "CodeChef":
        return { gradient: "from-orange-500 to-amber-400", bg: "bg-orange-500/10 dark:bg-orange-500/15", border: "border-orange-500/20" };
      case "LeetCode":
        return { gradient: "from-amber-500 to-yellow-400", bg: "bg-amber-500/10 dark:bg-amber-500/15", border: "border-amber-500/20" };
      default:
        return { gradient: "from-primary to-primary/50", bg: "bg-primary/10", border: "border-primary/20" };
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 25, -15, 0], y: [0, -35, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 30, 0], y: [0, 25, -15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 -left-20 w-72 h-72 bg-chart-4/5 dark:bg-chart-4/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="w-2.5 h-2.5 rounded-full bg-chart-4 shadow-lg shadow-chart-4/50"
                />
                <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
                  Profile
                </span>
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">
                My Profile
              </h1>
              <p className="text-muted-foreground text-lg">
                Track your progress and achievements
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-lg shadow-primary/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              <span className="relative z-10">{userStats.name.charAt(0).toUpperCase()}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative bg-card/50 dark:bg-card/30 backdrop-blur-xl border border-border/60 rounded-2xl p-8 mb-10 overflow-hidden"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-primary/5 to-transparent" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <p className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider">
                  Full Name
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {userStats.name}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider">
                  Email
                </p>
                <p className="text-lg text-foreground">{userStats.email}</p>
              </div>

              <div>
                <p className="text-muted-foreground text-xs font-medium mb-1 uppercase tracking-wider">
                  Member Since
                </p>
                <p className="text-lg text-foreground">
                  {new Date(userStats.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <p className="text-muted-foreground text-xs font-medium mb-2 uppercase tracking-wider">
                  Badge
                </p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-500/10 dark:bg-yellow-500/15 border border-yellow-500/30 rounded-xl mb-6 shadow-sm"
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    className="text-2xl"
                  >
                    ⭐
                  </motion.span>
                  <span className="font-bold text-yellow-600 dark:text-yellow-400">
                    {userStats.badge} Member
                  </span>
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all self-start relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Edit Profile</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-2xl p-6 border ${stat.border} overflow-hidden group cursor-default`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <p className="text-muted-foreground text-sm font-medium">
                    {stat.label}
                  </p>
                  <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                    <span className="text-lg">{stat.icon}</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Platform Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-chart-2/10 flex items-center justify-center">
              <span className="text-sm">📊</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Platform Statistics
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platformStats.map((platform, index) => {
              const colors = getPlatformColor(platform.name);
              return (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`relative bg-card/50 dark:bg-card/30 backdrop-blur-sm border ${colors.border} rounded-2xl p-6 overflow-hidden group`}
                >
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-${platform.name === "Codeforces" ? "blue" : platform.name === "CodeChef" ? "orange" : "amber"}-500/30 to-transparent`} />

                  {/* Platform Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                      <span className="text-2xl">{platform.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">
                        {platform.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {platform.username !== "Not connected"
                          ? platform.username
                          : "Not connected"}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-secondary/20 dark:bg-secondary/10">
                      <span className="text-muted-foreground text-sm">
                        Total Solved
                      </span>
                      <span className="font-bold text-foreground text-lg">
                        {platform.totalSolved}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-secondary/20 dark:bg-secondary/10">
                      <span className="text-muted-foreground text-sm">Via App</span>
                      <span className="font-bold text-primary">
                        {platform.revisionsSolved}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-secondary/20 dark:bg-secondary/10">
                      <span className="text-muted-foreground text-sm">
                        Last Active
                      </span>
                      <span className="text-sm text-foreground font-medium">
                        {platform.lastActive}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        Revision Progress
                      </span>
                      <span className="text-xs font-bold text-foreground bg-secondary/30 dark:bg-secondary/20 px-2 py-0.5 rounded-md">
                        {Math.round(
                          (platform.revisionsSolved / platform.totalSolved) * 100,
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full h-2 bg-secondary/50 dark:bg-secondary/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(platform.revisionsSolved / platform.totalSolved) * 100}%`,
                        }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                        className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 relative bg-card/50 dark:bg-card/30 backdrop-blur-sm border border-border/60 rounded-2xl p-8 overflow-hidden"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-chart-2/50 to-transparent" />

          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-chart-2/10 flex items-center justify-center">
              <span className="text-sm">⏱️</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Recent Activity
            </h2>
          </div>
          <div className="space-y-1">
            {prevSolvedQuestion.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + index * 0.1 }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-secondary/20 dark:hover:bg-secondary/10 transition-colors group cursor-default"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <span className="text-sm">
                      {activity.platform === "LeetCode" ? "💻" : activity.platform === "Codeforces" ? "⚡" : "🍳"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.platform}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-medium">{activity.time}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

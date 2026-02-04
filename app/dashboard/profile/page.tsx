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
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              My Profile
            </h1>
            <p className="text-muted-foreground text-lg">
              Track your progress and achievements
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-lg"
          >
            S
          </motion.div>
        </div>
      </motion.div>

      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-background border-2 border-border rounded-2xl p-8 mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-muted-foreground text-sm font-medium mb-1">
              Full Name
            </p>
            <p className="text-2xl font-bold text-foreground mb-6">
              {userStats.name}
            </p>

            <p className="text-muted-foreground text-sm font-medium mb-1">
              Email
            </p>
            <p className="text-lg text-foreground mb-6">{userStats.email}</p>

            <p className="text-muted-foreground text-sm font-medium mb-1">
              Member Since
            </p>
            <p className="text-lg text-foreground">
              {new Date(userStats.joinDate).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-2">
                Badge
              </p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-6"
              >
                <span className="text-2xl">⭐</span>
                <span className="font-bold text-yellow-600">
                  {userStats.badge} Member
                </span>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors self-start"
            >
              Edit Profile
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {[
          {
            label: "Total Problems Solved",
            value: userStats.totalProblemsSolved,
            icon: "✓",
            color: "from-blue-500/10 to-blue-400/5 border-blue-500/20",
          },
          {
            label: "Via TRYAGAINLATER",
            value: userStats.problemsSolvedViaApp,
            icon: "🎯",
            color: "from-purple-500/10 to-purple-400/5 border-purple-500/20",
          },
          {
            label: "Current Streak",
            value: `${userStats.currentStreak} days`,
            icon: "🔥",
            color: "from-orange-500/10 to-orange-400/5 border-orange-500/20",
          },
          {
            label: "Longest Streak",
            value: `${userStats.longestStreak} days`,
            icon: "🏆",
            color: "from-yellow-500/10 to-yellow-400/5 border-yellow-500/20",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + index * 0.1 }}
            className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 border`}
          >
            <div className="flex items-start justify-between mb-4">
              <p className="text-muted-foreground text-sm font-medium">
                {stat.label}
              </p>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Platform Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Platform Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platformStats.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + index * 0.1 }}
              className="bg-background border-2 border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              {/* Platform Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{platform.icon}</span>
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
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground text-sm">
                    Total Solved
                  </span>
                  <span className="font-bold text-foreground text-lg">
                    {platform.totalSolved}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground text-sm">Via App</span>
                  <span className="font-bold text-primary">
                    {platform.revisionsSolved}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">
                    Last Active
                  </span>
                  <span className="text-sm text-foreground">
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
                  <span className="text-xs font-bold text-foreground">
                    {Math.round(
                      (platform.revisionsSolved / platform.totalSolved) * 100,
                    )}
                    %
                  </span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(platform.revisionsSolved / platform.totalSolved) * 100}%`,
                    }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-12 bg-secondary/30 border border-border rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {prevSolvedQuestion.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + index * 0.1 }}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div>
                <p className="font-medium text-foreground">{activity.action}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.platform}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

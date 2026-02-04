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
}

const platforms: PlatformConfig[] = [
  {
    name: "Codeforces",
    id: "codeforces",
    icon: "⚡",
    color: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    name: "CodeChef",
    id: "codechef",
    icon: "👨‍🍳",
    color: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    name: "LeetCode",
    id: "leetcode",
    icon: "💻",
    color: "bg-amber-50",
    borderColor: "border-amber-200",
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
      </div>
    );
  }

  const allConfigured = configuredPlatforms.length === 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            Welcome Back!
          </h1>
          <p className="text-lg text-gray-600">
            Keep your DSA skills sharp with daily revision problems
          </p>
        </motion.div>

        {/* Status Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl border-2 border-teal-100 p-6 sm:p-8 mb-12 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Setup Status</h2>
            <div className="flex gap-2">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`w-3 h-3 rounded-full ${
                    configuredPlatforms.includes(platform.id)
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600">
            {allConfigured
              ? "✓ All platforms connected! You can start revising now."
              : `${configuredPlatforms.length} of 3 platforms configured`}
          </p>
        </motion.div>

        {/* Platform Configuration Cards */}
        {!allConfigured && (
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Connect Your Platforms
            </h2>
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
                    className={`rounded-xl border-2 p-6 transition-colors ${
                      isConfigured
                        ? `${platform.color} ${platform.borderColor} border-opacity-50`
                        : `${platform.color} ${platform.borderColor}`
                    }`}
                  >
                    <div className="text-4xl mb-3">{platform.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {platform.name}
                    </h3>
                    {isConfigured ? (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm font-medium text-green-700">
                          Connected
                        </span>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">
                        Click to add your username
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}

        {/* Quick Actions */}
        {allConfigured && (
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl border-2 border-teal-200 p-8 cursor-pointer group"
              >
                <Link href="/dashboard/problem" className="block">
                  <div className="text-5xl mb-4">📚</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    Problem of the Day
                  </h3>
                  <p className="text-gray-600">
                    Solve a random DSA problem from your platforms
                  </p>
                </Link>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 p-8 cursor-pointer group"
              >
                <Link href="/dashboard/profile" className="block">
                  <div className="text-5xl mb-4">👤</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    Your Profile
                  </h3>
                  <p className="text-gray-600">
                    Track your progress and statistics
                  </p>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Setup Redirect */}
        {!allConfigured && (
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <Link href="/dashboard/setup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Complete Setup →
              </motion.button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

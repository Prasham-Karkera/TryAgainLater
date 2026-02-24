"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PlatformData {
  id: string;
  username: string;
  isSet: boolean;
}

interface Platforms {
  codeforces: PlatformData;
  codechef: PlatformData;
  leetcode: PlatformData;
}

export default function SetupPage() {
  const [platforms, setPlatforms] = useState<Platforms>({
    codeforces: { id: "codeforces", username: "", isSet: false },
    codechef: { id: "codechef", username: "", isSet: false },
    leetcode: { id: "leetcode", username: "", isSet: false },
  });

  const [isMounted, setIsMounted] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedPlatforms = localStorage.getItem("platformIds");
    if (savedPlatforms) {
      try {
        const parsed = JSON.parse(savedPlatforms);
        setPlatforms((prev) => ({
          ...prev,
          ...parsed,
        }));
      } catch (error) {
        console.log("[v0] Error parsing saved platforms:", error);
      }
    }
  }, []);

  const handleInputChange = (platform: keyof Platforms, value: string) => {
    setPlatforms((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        username: value,
      },
    }));
  };

  const handleSave = (platform: keyof Platforms) => {
    const updatedPlatforms = {
      ...platforms,
      [platform]: {
        ...platforms[platform],
        isSet: true,
      },
    };
    setPlatforms(updatedPlatforms);
    localStorage.setItem("platformIds", JSON.stringify(updatedPlatforms));
  };

  const handleEdit = (platform: keyof Platforms) => {
    setPlatforms((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        isSet: false,
      },
    }));
  };

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  const platformInfo = [
    {
      key: "codeforces" as const,
      name: "Codeforces",
      icon: "⚡",
      color: "from-blue-500 to-cyan-400",
      description: "Connect your Codeforces handle",
    },
    {
      key: "codechef" as const,
      name: "CodeChef",
      icon: "🍳",
      color: "from-yellow-500 to-orange-400",
      description: "Connect your CodeChef handle",
    },
    {
      key: "leetcode" as const,
      name: "LeetCode",
      icon: "💻",
      color: "from-yellow-400 to-red-500",
      description: "Connect your LeetCode handle",
    },
  ];

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Setup Your Platforms
        </h1>
        <p className="text-muted-foreground text-lg">
          Connect your competitive programming accounts to get personalized
          daily problems
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {platformInfo.map((platform, index) => {
          const isSet = platforms[platform.key].isSet;
          const username = platforms[platform.key].username;

          return (
            <motion.div
              key={platform.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`p-6 rounded-2xl border-2 transition-all ${
                isSet
                  ? "border-primary/30 bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-border bg-background hover:border-primary/50"
              }`}
            >
              {/* Platform Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`text-4xl`}>{platform.icon}</div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {platform.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {platform.description}
                  </p>
                </div>
              </div>

              {/* Input Section */}
              <div className="space-y-4">
                {!isSet ? (
                  <>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) =>
                        handleInputChange(platform.key, e.target.value)
                      }
                      disabled={isSet}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSave(platform.key)}
                      disabled={!username.trim()}
                      className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Save
                    </motion.button>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-3 rounded-lg bg-primary/5 border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-1">
                        Connected as
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {username}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleEdit(platform.key)}
                      className="w-full px-4 py-3 bg-secondary text-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
                    >
                      Change
                    </motion.button>
                  </>
                )}
              </div>

              {/* Status Indicator */}
              {isSet && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/30"
                >
                  <span className="text-green-600 text-lg">✓</span>
                  <span className="text-sm font-medium text-green-600">
                    Connected
                  </span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-12 p-6 bg-secondary/30 rounded-2xl border border-border"
      >
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="text-xl">ℹ️</span> How it works
        </h3>
        <ul className="space-y-2 text-muted-foreground text-sm">
          <li className="flex gap-2">
            <span>→</span>
            <span>Enter your username/handle for each platform</span>
          </li>
          <li className="flex gap-2">
            <span>→</span>
            <span>We'll fetch your previously solved problems</span>
          </li>
          <li className="flex gap-2">
            <span>→</span>
            <span>Receive a random one daily to keep your skills sharp</span>
          </li>
          <li className="flex gap-2">
            <span>→</span>
            <span>Track your progress and maintain consistency</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

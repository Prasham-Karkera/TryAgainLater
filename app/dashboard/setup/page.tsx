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
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin" />
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-b-primary/30 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
          </div>
          <p className="text-sm text-muted-foreground animate-pulse">Loading setup...</p>
        </div>
      </div>
    );
  }

  const platformInfo = [
    {
      key: "codeforces" as const,
      name: "Codeforces",
      icon: "⚡",
      color: "from-blue-500 to-cyan-400",
      description: "Connect your Codeforces handle",
      gradient: "from-blue-500/10 to-cyan-500/5",
      border: "border-blue-500/20",
      iconBg: "bg-blue-500/10 dark:bg-blue-500/15",
      accentColor: "blue",
    },
    {
      key: "codechef" as const,
      name: "CodeChef",
      icon: "🍳",
      color: "from-yellow-500 to-orange-400",
      description: "Connect your CodeChef handle",
      gradient: "from-orange-500/10 to-amber-500/5",
      border: "border-orange-500/20",
      iconBg: "bg-orange-500/10 dark:bg-orange-500/15",
      accentColor: "orange",
    },
    {
      key: "leetcode" as const,
      name: "LeetCode",
      icon: "💻",
      color: "from-yellow-400 to-red-500",
      description: "Connect your LeetCode handle",
      gradient: "from-amber-500/10 to-yellow-500/5",
      border: "border-amber-500/20",
      iconBg: "bg-amber-500/10 dark:bg-amber-500/15",
      accentColor: "amber",
    },
  ];

  const connectedCount = Object.values(platforms).filter(p => p.isSet).length;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 30, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 -left-32 w-80 h-80 bg-chart-4/5 dark:bg-chart-4/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-2.5 h-2.5 rounded-full bg-accent shadow-lg shadow-accent/50"
            />
            <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
              Configuration
            </span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">
            Setup Your Platforms
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Connect your competitive programming accounts to get personalized
            daily problems
          </p>

          {/* Progress indicator */}
          <div className="mt-5 max-w-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Setup Progress</span>
              <span className="text-xs font-bold text-foreground">{connectedCount}/3 connected</span>
            </div>
            <div className="h-1.5 bg-secondary/50 dark:bg-secondary/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(connectedCount / 3) * 100}%` }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-chart-2 rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformInfo.map((platform, index) => {
            const isSet = platforms[platform.key].isSet;
            const username = platforms[platform.key].username;

            return (
              <motion.div
                key={platform.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative p-6 rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isSet
                    ? `${platform.border} bg-card/50 dark:bg-card/30 backdrop-blur-sm shadow-lg`
                    : `border-border/50 bg-card/30 dark:bg-card/20 backdrop-blur-sm hover:border-border`
                }`}
              >
                {/* Top accent line */}
                {isSet && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${platform.color}`}
                  />
                )}

                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} ${isSet ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Platform Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${platform.iconBg} flex items-center justify-center`}>
                      <span className="text-3xl">{platform.icon}</span>
                    </div>
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
                  <div className="space-y-3">
                    {!isSet ? (
                      <>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) =>
                              handleInputChange(platform.key, e.target.value)
                            }
                            disabled={isSet}
                            className="w-full px-4 py-3.5 rounded-xl border border-border/60 bg-background/50 dark:bg-background/30 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed backdrop-blur-sm"
                          />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSave(platform.key)}
                          disabled={!username.trim()}
                          className="w-full px-4 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="relative z-10">Save</span>
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-3.5 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20">
                          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">
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
                          className="w-full px-4 py-3.5 bg-secondary/50 dark:bg-secondary/30 text-foreground rounded-xl font-semibold hover:bg-secondary/70 dark:hover:bg-secondary/50 transition-all backdrop-blur-sm border border-border/30"
                        >
                          Change
                        </motion.button>
                      </>
                    )}
                  </div>

                  {/* Status Indicator */}
                  {isSet && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-green-500/10 dark:bg-green-500/15 rounded-xl border border-green-500/20"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        Connected
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 relative p-8 bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-2xl border border-border/60 overflow-hidden"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-chart-2/50 to-transparent" />

          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-chart-2/10 flex items-center justify-center">
              <span className="text-lg">ℹ️</span>
            </div>
            <h3 className="font-bold text-lg text-foreground">How it works</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { step: "01", text: "Enter your username/handle for each platform", icon: "✏️" },
              { step: "02", text: "We'll fetch your previously solved problems", icon: "📥" },
              { step: "03", text: "Receive a random one daily to keep your skills sharp", icon: "🎯" },
              { step: "04", text: "Track your progress and maintain consistency", icon: "📈" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/20 dark:hover:bg-secondary/10 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <span className="text-xs font-bold text-primary">{item.step}</span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground leading-relaxed">{item.text}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

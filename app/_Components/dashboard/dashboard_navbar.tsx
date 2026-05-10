"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function DashboardNavbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border h-16"
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.4 }}
            className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
          >
            <span className="text-primary-foreground font-bold text-sm">T</span>
          </motion.div>
          <span className="font-bold text-lg text-foreground tracking-tight hidden sm:inline">
            TRYAGAINLATER
          </span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-lg hover:bg-secondary/80 transition-colors"
            aria-label="Notifications"
          >
            🔔
          </motion.button>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors"
          >
            S
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}

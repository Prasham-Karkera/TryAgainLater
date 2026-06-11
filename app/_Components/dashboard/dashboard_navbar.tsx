"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { signOut } from "next-auth/react";

type DashboardNavbarProps = {
  userName?: string | null;
};

export function DashboardNavbar({ userName }: DashboardNavbarProps) {
  const initial = userName?.trim().charAt(0).toUpperCase() || "S";

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/70 dark:bg-background/80 backdrop-blur-xl border-b border-border/50 h-16"
    >
      {/* Subtle bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.4 }}
            className="w-9 h-9 bg-gradient-to-br from-primary to-chart-2 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300"
          >
            <span className="text-primary-foreground font-bold text-sm">T</span>
          </motion.div>
          <div className="hidden sm:block">
            <span className="font-bold text-lg text-foreground tracking-tight">
              TRYAGAINLATER
            </span>
            <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-chart-2 transition-all duration-300 rounded-full" />
          </div>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {userName && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden sm:flex flex-col items-end mr-1"
            >
              <span className="text-sm font-semibold text-foreground">
                {userName}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Online
              </span>
            </motion.div>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="w-10 h-10 bg-secondary/50 dark:bg-secondary/30 rounded-xl flex items-center justify-center text-lg hover:bg-secondary/70 dark:hover:bg-secondary/50 transition-all border border-border/30 backdrop-blur-sm"
            aria-label="Logout"
          >
            <span className="text-muted-foreground hover:text-foreground transition-colors">↩</span>
          </motion.button>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 bg-gradient-to-br from-primary to-chart-2 rounded-xl flex items-center justify-center font-bold text-primary-foreground cursor-pointer shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow duration-300"
          >
            {initial}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}

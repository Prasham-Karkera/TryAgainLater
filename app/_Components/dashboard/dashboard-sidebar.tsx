"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { name: "Setup Platforms", href: "/dashboard/setup", icon: "⚙️" },
    { name: "Problem of the Day", href: "/dashboard/problem", icon: "📝" },
    { name: "Profile", href: "/dashboard/profile", icon: "👤" },
  ];

  const isActive = (href: string) => pathname === href;

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/signin" });
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 hover:bg-primary/90 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle sidebar"
      >
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-lg"
        >
          {isOpen ? "✕" : "☰"}
        </motion.span>
      </motion.button>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="md:hidden fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -280,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed md:static md:translate-x-0 left-0 top-0 z-30 w-72 h-screen md:h-[calc(100vh-64px)] bg-background/80 dark:bg-background/90 backdrop-blur-xl border-r border-border/50 mt-16 md:mt-0 overflow-y-auto"
      >
        <div className="flex flex-col h-full p-6">
          {/* Sidebar Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center">
                <span className="text-sm">📊</span>
              </div>
              <div>
                <h2 className="font-bold text-lg text-foreground tracking-tight">Dashboard</h2>
                <p className="text-xs text-muted-foreground">Navigation</p>
              </div>
            </div>
            <div className="mt-4 h-px bg-gradient-to-r from-border/50 via-border to-border/50" />
          </div>

          <nav className="flex flex-col gap-1.5 flex-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden group ${
                    isActive(item.href)
                      ? "bg-primary/10 dark:bg-primary/15 text-primary font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40 dark:hover:bg-secondary/20"
                  }`}
                >
                  {/* Active background gradient */}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="sidebarActiveGradient"
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  <span className={`text-xl relative z-10 ${isActive(item.href) ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-200`}>
                    {item.icon}
                  </span>
                  <span className="relative z-10">{item.name}</span>

                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r-full shadow-lg shadow-primary/30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}

                  {/* Hover arrow indicator */}
                  <motion.span
                    className={`ml-auto text-xs relative z-10 transition-all duration-200 ${
                      isActive(item.href) ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-50'
                    }`}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-6 mt-auto"
          >
            <div className="h-px bg-gradient-to-r from-border/50 via-border to-border/50 mb-6" />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full px-4 py-3 bg-destructive/10 dark:bg-destructive/15 text-destructive-foreground rounded-xl hover:bg-destructive/20 dark:hover:bg-destructive/25 transition-all font-medium flex items-center justify-center gap-2 border border-destructive/10 group"
            >
              <motion.span
                className="group-hover:-translate-x-0.5 transition-transform duration-200"
              >
                ↩
              </motion.span>
              Logout
            </motion.button>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}

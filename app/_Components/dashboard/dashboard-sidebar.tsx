"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <>
      {/* Mobile Menu Toggle */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle sidebar"
      >
        {isOpen ? "✕" : "☰"}
      </motion.button>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="md:hidden fixed inset-0 bg-black/30 z-30"
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
        className="fixed md:static md:translate-x-0 left-0 top-0 z-30 w-72 h-screen md:h-[calc(100vh-64px)] bg-background border-r border-border mt-16 md:mt-0 overflow-y-auto"
      >
        <div className="flex flex-col h-full p-6">
          <h2 className="font-bold text-lg mb-8 text-foreground">Dashboard</h2>

          <nav className="flex flex-col gap-2 flex-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
                    isActive(item.href)
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>

                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-6 border-t border-border mt-auto"
          >
            <button className="w-full px-4 py-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium">
              Logout
            </button>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}

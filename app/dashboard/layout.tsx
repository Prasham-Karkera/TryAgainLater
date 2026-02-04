import type React from "react";
import { DashboardNavbar } from "../_Components/dashboard/dashboard_navbar";
import { DashboardSidebar } from "../_Components/dashboard/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <div className="flex pt-16">
        <DashboardSidebar />
        <main className="flex-1 md:ml-0 overflow-hidden">
          <div className="p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

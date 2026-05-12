import { auth } from "@/auth";
import { redirect } from "next/navigation";
import type React from "react";
import { DashboardNavbar } from "../_Components/dashboard/dashboard_navbar";
import { DashboardSidebar } from "../_Components/dashboard/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar userName={session.user?.name} />
      <div className="flex pt-16">
        <DashboardSidebar />
        <main className="flex-1 md:ml-0 overflow-hidden">
          <div className="p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

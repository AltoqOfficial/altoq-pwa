"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/organisms/Header";
import { Sidebar } from "../Sidebar";
import { DashboardHeader } from "../DashboardHeader";
import { useTheme } from "@/contexts";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  return (
    <>
      <Header position="static" />
      <div
        className={cn(
          "flex min-h-screen transition-colors duration-300",
          resolvedTheme === "dark" ? "bg-[#202020]" : "bg-[#FEFEFE]"
        )}
      >
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
          {/* Mobile Header */}
          <DashboardHeader onMenuClick={openSidebar} />

          {/* Page Content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </>
  );
}

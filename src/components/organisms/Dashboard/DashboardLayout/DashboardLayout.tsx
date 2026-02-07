"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/organisms/Header";
import { Sidebar } from "../Sidebar";
import { useTheme } from "@/contexts";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  const toggleSidebar = useCallback(
    () => setIsSidebarOpen((prev) => !prev),
    []
  );
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  return (
    <>
      <Header position="static" onSidebarToggle={toggleSidebar} />
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
          {/* Page Content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import LowStockBanner from "./low-stock-banner";
import { company } from "@/app/config/company";

export default function DashboardShell({
  children,
  alerts,
}: {
  children: React.ReactNode;
  alerts: string[];
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Low stock warning banner */}
        <LowStockBanner alerts={alerts} />

        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 bg-card border-b border-border lg:hidden">
          <div className="flex items-center justify-between h-14 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <span className="text-sm font-bold leading-tight">
              {company.legalName}
            </span>
            <div className="w-10" />
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import { Menu, Info } from "lucide-react";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-full overflow-hidden lg:ml-0">
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center px-4 lg:px-6 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="ml-2 lg:ml-0">
            <p className="text-sm text-muted-foreground">Dashboard</p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6" data-lenis-prevent>
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-xs text-amber-700 dark:text-amber-300">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              This dashboard is a frontend demo — no backend is connected yet, so all
              courses, progress, names, and scores shown here are sample data.
            </span>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

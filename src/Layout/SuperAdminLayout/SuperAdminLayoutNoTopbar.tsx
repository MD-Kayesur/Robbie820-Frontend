import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, Zap } from "lucide-react";
import SuperAdminSidebar from "./SuperAdminSidebar";

const SuperAdminLayoutNoTopbar = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      <SuperAdminSidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header only */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-500">
              <Zap className="h-5 w-5 fill-white text-white" />
            </div>
            <span className="text-[15px] font-semibold text-slate-900">
              SuperAdmin
            </span>
          </div>

          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayoutNoTopbar;
